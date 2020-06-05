var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  collectionName: String,
  reviewCount: Number,
  reviewAverage: Number
});

let products = mongoose.model('products', productSchema);

// connection options to remove warnings
let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

mongoose.connect('mongodb://localhost:27017/abibas_products', options);

function findOne(id, callback) {
  products.aggregate([
    {
      $lookup: {
        from: "shoeColors",
        localField: "id",
        foreignField: "product_id",
        as: "colors"
      }
    },
    {
      $unwind: "$colors"
    },
    {
      $lookup: {
        from: "colorImages",
        localField: "colors.id",
        foreignField: "color_id",
        as: "colors.images"
      }
    },
    {
      $lookup: {
        from: "shoeQuantity",
        localField: "colors.id",
        foreignField: "color_id",
        as: "colors.quantity"
      }
    },
    {
      $match: {
        $and: [{"id" : Number(id)}]
      }
    },
    {
      $group: {
        _id: "$id",
        name: { $first: "$name" },
        collectionName: { $first: "$collectionName" },
        reviewCount: { $first: "$reviewCount" },
        reviewAverage: { $first: "$reviewAverage" },
        colors: { $push: "$colors" }
      }
    }
  ], callback);
}

exports.findOne = findOne;
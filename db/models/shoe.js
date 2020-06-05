var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

var productSchema = mongoose.Schema({
  name: String,
  collectionName: String,
  reviewCount: Number,
  reviewAverage: Number
});
productSchema.plugin(AutoIncrement, {inc_field: 'id'});

let products = mongoose.model('products', productSchema);

var colorImagesSchema = mongoose.Schema({
  color_id: Number,
  img1: String,
  img2: String,
  img3: String,
  img4: String,
  img5: String,
  img6: String,
  img7: String,
  img8: String
});
colorImagesSchema.plugin(AutoIncrement, {inc_field: 'id'});

let colorImages = mongoose.model('colorImages', colorImagesSchema);

var colorSchema = mongoose.Schema({
  product_id: Number,
  colorName: String,
  listPrice: Number,
  salePrice: Number
});
colorSchema.plugin(AutoIncrement, {inc_field: 'id'});

let colors = mongoose.model('shoeColors', colorSchema);

var inventorySchema = mongoose.Schema({
  product_id: Number,
  color_id: Number,
  size: Number,
  quantity: Number
})
inventorySchema.plugin(AutoIncrement, {inc_field: 'id'});

let shoeQuantity = mongoose.model('shoeQuantity', inventorySchema);

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

function getNextSequenceValue(sequenceName) {
  var sequenceDocument = counters.findOneAndUpdate({
     query:{_id: sequenceName },
     update: {$inc:{sequence_value:1}},
     new: true
  });
  return sequenceDocument.sequence_value;
}

function insert(data, callback) {
  let productDoc = {};
  productDoc.name = data.name;
  productDoc.collectionName = data.collectionName;

}

exports.findOne = findOne;
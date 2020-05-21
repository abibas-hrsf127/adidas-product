var mongoose = require('mongoose');

var schema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  collectionName: String,
  reviewCount: Number,
  reviewAverage: Number,
  colors: [
      {
          id: {
            type: Number,
            unique: true
          },
          name: String,
          listPrice: Number,
          salePrice: Number,
          inventory: [
              {
                  shoeSize: {
                    type: String,
                    unique: true
                  },
                  quantity: Number
              }
          ],
          images: [String]
      }
  ]
});
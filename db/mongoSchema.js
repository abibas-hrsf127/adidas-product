var mongoose = require('mongoose');

var inventorySchema = mongoose.Schema({
  shoeSize: {
    type: String,
    unique: true
  },
  quantity: Number
})

var colorImagesSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  }
  imageUrl: String
})

var colorSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  colorName: String,
  listPrice: Number,
  salePrice: Number,
  shoeSize: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'inventorySchema'
  }],
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'colorImagesSchema'
  }]
})

var productSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  productName: String,
  collectionName: String,
  reviewCount: Number,
  reviewAverage: Number,
  colors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'colorSchema'
  }]
});
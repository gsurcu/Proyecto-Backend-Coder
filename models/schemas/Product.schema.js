const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  id: mongoose.ObjectId,
  timeStamp: { type: Number, required: true },
  title: { type: String, required: true },
  decription: { type: String, required: true },
  code: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 }
})

module.exports = ProductSchema
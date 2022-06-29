const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  timeStamp: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String },
  imgUrl: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
})

module.exports = ProductSchema
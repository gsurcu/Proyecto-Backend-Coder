const mongoose = require('mongoose');

const Schema = mongoose.Schema
const CarritoSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cart: [{ 
    prod_id: { type: Schema.Types.ObjectId, ref: "productos" },
    title: { type: String },
    imgUrl: { type: String },
    price: { type: Number },
    cant: {
      type: Number,
      min: 1,
    },
  }],
  send: { type: Boolean, required: true }
})

module.exports = CarritoSchema;
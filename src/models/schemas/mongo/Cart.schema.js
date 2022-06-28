const mongoose = require('mongoose');

const Schema = mongoose.Schema
const CartSchema = new Schema({
  email: { type: Schema.Types.ObjectId, ref: "User", required: true },
  timeStamp: { type: Date },
  cart: [{ 
    prod_id: { type: Schema.Types.ObjectId, ref: "productos" },
    title: { type: String },
    cant: {
      type: Number,
      min: 1,
    },
  }],
  address: { type: String, required: true }
})

module.exports = CartSchema;
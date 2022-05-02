const mongoose = require('mongoose');

const Schema = mongoose.Schema
const CarritoSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  carrito: [{ 
    prod_id: { type: Schema.Types.ObjectId, ref: "productos" },
    cant: {
      type: Number,
      min: 1,
    }
  }],
})

module.exports = CarritoSchema;
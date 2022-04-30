const mongoose = require('mongoose');

const Schema = mongoose.Schema
const CarritoSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  carritos: [{ 
    prod_id: { type: Schema.Types.ObjectId, ref: "productos", required: true },
    cant: {
      type: Number,
      min: 1,
    }
  }],
})

module.exports = CarritoSchema;
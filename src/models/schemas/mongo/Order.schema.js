const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const OrederSchema = new Schema({
  items: { type: String },
  number: { type: String, required: true },
  status: {type: String, default: "generada"},
  email: { type: String },
  timestamp: {type: Date },
})

module.exports = OrederSchema;
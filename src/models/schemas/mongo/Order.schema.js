const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const OrederSchema = new Schema({
  type: { type: String },
  status: {type: String, default: "generada"},
  email: { type: String },
  timestamp: {type: Date },
  number: { type: String, required: true },
})

module.exports = OrederSchema;
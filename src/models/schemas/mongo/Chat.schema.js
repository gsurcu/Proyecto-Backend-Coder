const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ChatSchema = new Schema({
  email: { type: String },
  type: { type: String },
  timestamp: {type: Date},
  text: {type: String},
})

module.exports = ChatSchema;
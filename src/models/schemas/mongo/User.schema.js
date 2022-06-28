const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthdate: { type: String },
  age: { 
    type: Number, 
    min: [18, 'Age is below minimun required'],
    max: [150, 'Age exceeds maximum value allowed'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      "Invalid email",
    ],
  },
  password: { type: String },
  telephone: { type: String },
  image: { type: String },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  accounts: [{ type: Schema.Types.ObjectId, ref: "Account", required: true }],
});

module.exports = UserSchema;

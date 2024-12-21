// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  condition: { type: String, required: true },
  activity_level: { type: String, required: true },
  phone_number: { type: String, required: true, unique: true },
  meals: { type: [String], required: true },
  prescriptions: { type: [String] }
});

const User = mongoose.model('User', userSchema);
module.exports = User;



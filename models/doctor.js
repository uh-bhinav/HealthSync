// models/doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  license_number: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  phone_number: { type: String, required: true, unique: true },
  credentials: { type: String, required: true }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;

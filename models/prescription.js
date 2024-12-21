// models/prescription.js
const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    required: true,
    ref: 'User'
  },
  medications: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      frequency: { type: String, required: true }, // e.g., 'daily', 'twice a day', etc.
    }
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;


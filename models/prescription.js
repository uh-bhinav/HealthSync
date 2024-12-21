const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicines: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      times_per_day: { type: Number, required: true },
    },
  ],
  uploaded_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Prescription', prescriptionSchema);

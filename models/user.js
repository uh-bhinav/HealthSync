const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  user_type: { type: String, enum: ['patient', 'doctor'], required: true },
  phone_number: { type: String, required: true },
  health_data: { type: Object },
  prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }],
  meal_schedule: { type: Object },
});

module.exports = mongoose.model('User', userSchema);


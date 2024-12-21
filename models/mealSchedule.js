// models/mealSchedule.js
const mongoose = require('mongoose');

const mealScheduleSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    required: true,
    ref: 'User'
  },
  morning: {
    type: String, // Time for breakfast
    required: true,
  },
  afternoon: {
    type: String, // Time for lunch
    required: true,
  },
  evening: {
    type: String, // Time for dinner
    required: true,
  },
  special_instructions: {
    type: String, // Any specific instructions for meals
    default: "",
  }
});

const MealSchedule = mongoose.model('MealSchedule', mealScheduleSchema);

module.exports = MealSchedule;


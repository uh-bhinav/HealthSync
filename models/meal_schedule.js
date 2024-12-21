const mongoose = require('mongoose');

const mealScheduleSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meal_times: {
    morning: { type: String, required: true },
    afternoon: { type: String, required: true },
    night: { type: String, required: true },
  },
});

module.exports = mongoose.model('MealSchedule', mealScheduleSchema);

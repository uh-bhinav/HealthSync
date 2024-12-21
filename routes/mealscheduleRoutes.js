// routes/mealScheduleRoutes.js
const express = require('express');
const router = express.Router();
const MealSchedule = require('../models/mealSchedule');
const User = require('../models/user');

// Add a new meal schedule
router.post('/add', async (req, res) => {
  const { user_id, morning, afternoon, evening, special_instructions } = req.body;

  try {
    // Check if user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new meal schedule
    const newMealSchedule = new MealSchedule({
      user_id,
      morning,
      afternoon,
      evening,
      special_instructions,
    });

    await newMealSchedule.save();
    res.status(201).json({ message: 'Meal schedule added successfully', mealSchedule: newMealSchedule });
  } catch (error) {
    res.status(500).json({ message: 'Error adding meal schedule', error });
  }
});

module.exports = router;

const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

const express = require('express');
const User = require('models/user.js');
const Prescription = require('models/prescription.js');
const MealSchedule = require('models/meal_schedule.js');

const router = express.Router();

// Add new user (Patient or Doctor)
router.post('/add-user', async (req, res) => {
  const { user_id, user_type, phone_number, health_data } = req.body;

  try {
    const newUser = new User({ user_id, user_type, phone_number, health_data });
    await newUser.save();
    res.status(200).json({ message: 'User added successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add user', message: err.message });
  }
});

// Add prescription for a user
router.post('/add-prescription', async (req, res) => {
    const { user_id, medicines } = req.body;
  
    try {
      const newPrescription = new Prescription({ user_id, medicines });
      await newPrescription.save();
  
      // Optionally, link the prescription to the user
      await User.findByIdAndUpdate(user_id, { $push: { prescriptions: newPrescription._id } });
  
      res.status(200).json({ message: 'Prescription added successfully', prescription: newPrescription });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add prescription', message: err.message });
    }
  });

  // Add meal schedule for a user
router.post('/add-meal-schedule', async (req, res) => {
    const { user_id, meal_times } = req.body;
  
    try {
      const newMealSchedule = new MealSchedule({ user_id, meal_times });
      await newMealSchedule.save();
  
      // Optionally, link the meal schedule to the user
      await User.findByIdAndUpdate(user_id, { $set: { meal_schedule: newMealSchedule._id } });
  
      res.status(200).json({ message: 'Meal schedule added successfully', meal_schedule: newMealSchedule });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add meal schedule', message: err.message });
    }
  });

  
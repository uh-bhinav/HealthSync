const mongoose = require('mongoose');
require('dotenv').config();


const uri = process.env.MONGO_URI; // Access the MongoDB URI from environment variables

if (!uri) {
  console.error("MongoDB URI is not defined in the .env file!");
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const express = require('express');
const User = require('./models/user');
const Prescription = require('./models/prescription');
const MealSchedule = require('./models/meal_schedule');

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

  
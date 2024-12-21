// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create User (Register)
router.post('/register', async (req, res) => {
  const { user_id, name, age, condition, activity_level, phone_number } = req.body;

  try {
    const newUser = new User({ user_id, name, age, condition, activity_level, phone_number, meals: [] });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(400).send('Error registering user');
  }
});

// Get User by ID
router.get('/:user_id', async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send('Error retrieving user');
  }
});

// Update User meals
router.put('/:user_id/meals', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { user_id: req.params.user_id },
      { $set: { meals: req.body.meals } },
      { new: true }
    );
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send('Error updating meals');
  }
});

module.exports = router;

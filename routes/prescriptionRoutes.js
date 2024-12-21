// routes/prescriptionRoutes.js
const express = require('express');
const router = express.Router();
const Prescription = require('../models/prescription');
const User = require('../models/user'); // To reference the user

// Add a new prescription
router.post('/add', async (req, res) => {
  const { user_id, medications, date } = req.body;

  try {
    // Check if user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new prescription
    const newPrescription = new Prescription({
      user_id,
      medications,
      date
    });

    await newPrescription.save();
    res.status(201).json({ message: 'Prescription added successfully', prescription: newPrescription });
  } catch (error) {
    res.status(500).json({ message: 'Error adding prescription', error });
  }
});

module.exports = router;

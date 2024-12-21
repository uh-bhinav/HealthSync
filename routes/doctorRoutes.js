// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');

// Register Doctor
router.post('/register', async (req, res) => {
  const { license_number, name, specialization, phone_number, credentials } = req.body;

  try {
    const newDoctor = new Doctor({ license_number, name, specialization, phone_number, credentials });
    await newDoctor.save();
    res.status(201).send('Doctor registered successfully');
  } catch (err) {
    res.status(400).send('Error registering doctor');
  }
});

// Get Doctor by License Number
router.get('/:license_number', async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ license_number: req.params.license_number });
    if (doctor) {
      res.status(200).json(doctor);
    } else {
      res.status(404).send('Doctor not found');
    }
  } catch (err) {
    res.status(500).send('Error retrieving doctor');
  }
});

module.exports = router;

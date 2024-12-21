// app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./db');  // Import the db.js which connects to MongoDB
const userRoutes = require('./routes/userRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const mealScheduleRoutes = require('./routes/mealscheduleRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

dotenv.config();  // Load environment variables from .env file

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use routes for user, prescription, and meal schedule management
app.use('/users', userRoutes);          // Routes for user operations
app.use('/prescriptions', prescriptionRoutes); // Routes for prescriptions
app.use('/meals', mealScheduleRoutes);  // Routes for meal schedules
app.use('/doctors', doctorRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('HealthSync API is running!');
});

// Error handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler for any uncaught errors
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Set up the server to listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





  
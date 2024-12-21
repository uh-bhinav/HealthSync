// db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();  // Load environment variables from .env

// MongoDB URI from environment variables
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("MongoDB URI is not defined in the .env file!");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

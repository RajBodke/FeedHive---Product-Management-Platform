// Import required packages
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const feedbackRoutes = require('./routes/feedbackRoutes');
app.use('/api/feedback', feedbackRoutes);

// Basic GET route
app.get('/', (req, res) => {
  res.json({ message: 'FeedHive backend is live' });
});

const connectDB = require('./config/db');

// Set port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}); 
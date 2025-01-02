// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk'); // For colored console messages

// Create an Express app
const app = express();

// Define a port
const PORT = 3000;

// MongoDB connection string (replace with your connection string)
const MONGO_URI = 'mongodb://localhost:27017/your-database-name';

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(chalk.green('Connected to MongoDB successfully.'));
  })
  .catch((err) => {
    console.error(chalk.red('Error connecting to MongoDB:', err));
  });

// Define a basic route
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Server Status</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f4f4f4;
    }
    .message {
      color: green;
      font-size: 24px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="message">Live Start</div>
</body>
</html>`);
});

// Start the server
app.listen(PORT, () => {
  console.log(chalk.green('Live Start'));
  console.log(`Server is running on http://localhost:${PORT}`);
});

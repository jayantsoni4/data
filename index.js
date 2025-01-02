// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Initialize the app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files for CSS

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/formDataDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model for the data
const formDataSchema = new mongoose.Schema({
  name: String,
  age: Number,
  location: String,
});

const FormData = mongoose.model("FormData", formDataSchema);

// Serve the form
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Submit Data</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f9;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .form-container {
          background: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
          text-align: center;
        }
        label {
          display: block;
          margin: 10px 0 5px;
          color: #555;
        }
        input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          width: 100%;
          padding: 10px;
          background-color: #007BFF;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="form-container">
        <h1>Submit Your Data</h1>
        <form action="/submit" method="POST">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label for="age">Age:</label>
          <input type="number" id="age" name="age" required />

          <label for="location">Location:</label>
          <input type="text" id="location" name="location" required />

          <button type="submit">Submit</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// Handle form submission
app.post("/submit", async (req, res) => {
  try {
    const { name, age, location } = req.body;
    const formData = new FormData({ name, age, location });
    await formData.save();
    res.send(`<h1 style="text-align: center; color: green;">Data saved successfully!</h1>`);
  } catch (error) {
    res.status(500).send(`<h1 style="text-align: center; color: red;">Error saving data!</h1>`);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

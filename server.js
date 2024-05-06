// Importing dependencies
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Loading the environmental variables

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parsing the JSON request bodies
app.use(express.static('public')); // Serves static files from the public directory

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Defining mongoose schema for user
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Creating a mongoose model for user
const User = mongoose.model('User', userSchema);

// Route for user sign-up
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checks if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Responding with success message
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for user sign-in
app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Finding user by email
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Checking if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Sign-in successful, return token
    res.status(200).json({ message: 'Sign-in successful', token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for user logout
app.post('/api/logout', (req, res) => {
  // Clear authentication token from local storage or cookies
  // Example for local storage
  localStorage.removeItem('authToken');

  // Responding with a success message
  res.status(200).json({ message: 'Logout successful' });
});



// Defining a route handler for the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Defining a route handler for the sign-in page
app.get('/signin', (req, res) => {
  res.sendFile(__dirname + '/public/signin.html');
});

// Defining a route handler for the sign-up page
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

// Route for user logout
app.get('/api/logout', (req, res) => {
  // Performing logout actions.
  // Then redirect the user to the index page
  res.redirect('/');
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

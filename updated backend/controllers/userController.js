const bcrypt = require("bcrypt");
const User = require("../models/User");

// @desc   Get all users
// @route  GET /api/users
const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// @desc   Create a user
// @route  POST /api/users
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword 
    });

    res.status(201).json({ 
      id: user._id,
      name: user.name,
      email: user.email 
      // ⚠️ Don’t send back the password hash!
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};


const logUserIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Success — return user info (without password)
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


// Get user by email
const getUserByEmail = async (req, res) => {
  console.log("Received request to get user by email:", req.params); // Log the request parameters

  const { email } = req.params;

  try {
    console.log("Fetching user with email:", email); // Log the email being searched

    const user = await User.findOne({ email }); // Query the database for the user by email

    console.log("Fetched user:", user); // Log the fetched user

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Return the user data
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { 
  getUsers, 
  createUser, 
  getUserByEmail, 
  logUserIn 
};

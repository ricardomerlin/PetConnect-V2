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
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.status(201).json(user);
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

module.exports = { getUsers, createUser, getUserByEmail };
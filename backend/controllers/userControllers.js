const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const validator = require("validator")

// POST /register/users
const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    // validation
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (!email || !password) {
      return res.status(400).json({ message: "All fields must be filled" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email not valid" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password not strong enough" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save to database
    await user.save();

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(201).json({
      success: true,
      data: userWithoutPassword,
      message: "User created successfully",
    });
  } catch (error) {
    // Validation error = missing required fields etc.
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      error: "Server error. Please try again.",
      message: error.message,
    });
  }
};

// POST /login/users
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Log in expires automatically in 1 hour
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      message: "Login successful",
      token: token,
      userId: user.id,
      email: user.email,
      name: user.firstName + " " + user.lastName,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error. Please try again.",
      message: error.message,
    });
  }
};

module.exports = { registerUser, loginUser };
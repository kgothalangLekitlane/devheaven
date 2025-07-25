const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = (req, res) => {
    (async () => {
      const { firstName, lastName, email, username, password } = req.body;
      const profileImage = req.file ? req.file.filename : null;
      if (!firstName || !lastName || !email || !username || !password) {
        return res.status(400).json({ message: "Missing required fields." });
      }
      // Check if user exists
      const existing = await User.findOne({ $or: [{ email }, { username }] });
      if (existing) {
        return res.status(409).json({ message: "User already exists." });
      }
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
        profileImage
      });
      await user.save();
      res.status(201).json({ message: "User registered", user: { firstName, lastName, email, username, profileImage } });
    })().catch(err => {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );

    // Return user data (without password) and token
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
      skills: user.skills,
      location: user.location,
      experience: user.experience
    };

    res.json({
      token,
      user: userData
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};

module.exports = { registerUser, loginUser };

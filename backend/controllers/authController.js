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

const loginUser = (req, res) => {
    const token = jwt.sign({ id: "user_id" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
};

module.exports = { registerUser, loginUser };
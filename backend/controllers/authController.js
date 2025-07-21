const jwt = require("jsonwebtoken");

const registerUser = (req, res) => {
    res.status(201).json({ message: "User registered" });
};

const loginUser = (req, res) => {
    const token = jwt.sign({ id: "user_id" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
};

module.exports = { registerUser, loginUser };
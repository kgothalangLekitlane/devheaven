const User = require("../models/User")

// Search candidates by skill, location, or experience
const searchCandidates = async (req, res) => {
  try {
    const { skill, location, experience } = req.query
    let query = {}
    if (skill) query.skills = { $regex: skill, $options: "i" }
    if (location) query.location = { $regex: location, $options: "i" }
    if (experience) query.experience = { $gte: Number(experience) }
    const candidates = await User.find(query)
    res.json({ candidates })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password").sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    console.error("Get users error:", error)
    res.status(500).json({ error: "Failed to fetch users" })
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password")
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    res.json(user)
  } catch (error) {
    console.error("Get user by ID error:", error)
    res.status(500).json({ error: "Failed to fetch user" })
  }
}

module.exports = { getUsers, getUserById, searchCandidates };

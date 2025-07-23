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

module.exports.searchCandidates = searchCandidates
const getUsers = (req, res) => {
    res.json([{ id: 1, name: "User A" }, { id: 2, name: "User B" }]);
};

module.exports = { getUsers };
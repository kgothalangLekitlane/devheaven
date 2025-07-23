const Recruiter = require("../models/Recruiter")
const Job = require("../models/Job")

// Create recruiter profile
const createRecruiter = async (req, res) => {
  try {
    const { name, email, company } = req.body
    const recruiter = new Recruiter({ name, email, company })
    await recruiter.save()
    res.status(201).json({ recruiter })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Post a job
const postJob = async (req, res) => {
  try {
    const { title, description, recruiterId } = req.body
    const job = new Job({ title, description, recruiter: recruiterId })
    await job.save()
    await Recruiter.findByIdAndUpdate(recruiterId, { $push: { jobs: job._id } })
    res.status(201).json({ job })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("recruiter", "name company")
    res.json({ jobs })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = { createRecruiter, postJob, getJobs }
const getRecruiters = (req, res) => {
    res.json([{ id: 1, name: "Recruiter A" }, { id: 2, name: "Recruiter B" }]);
};

module.exports = { getRecruiters };
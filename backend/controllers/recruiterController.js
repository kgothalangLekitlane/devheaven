const mongoose = require("mongoose")
const Recruiter = require("../models/Recruiter")
const Job = require("../models/Job")

// Create recruiter profile
const createRecruiter = async (req, res) => {
  try {
    const { name, email, company } = req.body

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" })
    }

    const recruiter = new Recruiter({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      company: company ? String(company).trim() : undefined
    })

    await recruiter.save()
    res.status(201).json({ recruiter })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Recruiter with this email already exists" })
    }
    res.status(400).json({ message: err.message })
  }
}

// Post a job
const postJob = async (req, res) => {
  try {
    const { title, description, recruiterId } = req.body

    if (!title || !description || !recruiterId) {
      return res.status(400).json({ message: "Title, description, and recruiterId are required" })
    }

    if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
      return res.status(400).json({ message: "Invalid recruiterId" })
    }

    const recruiter = await Recruiter.findById(recruiterId)
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" })
    }

    const job = new Job({ title, description, recruiter: recruiterId })
    await job.save()

    recruiter.jobs.push(job._id)
    await recruiter.save()

    await job.populate("recruiter", "name company")

    res.status(201).json({ job })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("recruiter", "name company").sort({ createdAt: -1 })
    res.json({ jobs })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find().sort({ createdAt: -1 })
    res.json({ recruiters })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = { getRecruiters, createRecruiter, postJob, getJobs }

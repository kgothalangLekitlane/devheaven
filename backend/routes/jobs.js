const express = require("express")
const mongoose = require("mongoose")
const Job = require("../models/Job")
const Application = require("../models/Application")
const ApplicationEvent = require("../models/ApplicationEvent")
const SavedJob = require("../models/SavedJob")
const Notification = require("../models/Notification")
const Recruiter = require("../models/Recruiter")
const authenticate = require("../middleware/authMiddleware")

const router = express.Router()
const validId = (id) => mongoose.Types.ObjectId.isValid(id)
const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

router.get("/", async (req, res) => {
  try {
    const { q, location, type, remote, skill, status = "open", page = 1, limit = 20 } = req.query
    const filter = {}
    const text = String(q || "").trim()
    if (text) {
      const pattern = new RegExp(escapeRegex(text), "i")
      filter.$or = [{ title: pattern }, { description: pattern }, { company: pattern }, { skills: pattern }]
    }
    if (location) filter.location = new RegExp(escapeRegex(String(location).trim()), "i")
    if (type) filter.type = String(type)
    if (remote === "true") filter.remote = true
    if (skill) filter.skills = { $regex: escapeRegex(String(skill).trim()), $options: "i" }
    if (status !== "all") filter.status = String(status)
    const safeLimit = Math.min(Math.max(Number.parseInt(limit, 10) || 20, 1), 50)
    const safePage = Math.max(Number.parseInt(page, 10) || 1, 1)
    const [jobs, total] = await Promise.all([
      Job.find(filter).populate("recruiter", "name company").sort({ createdAt: -1 }).skip((safePage - 1) * safeLimit).limit(safeLimit).lean(),
      Job.countDocuments(filter),
    ])
    res.json({ jobs, pagination: { page: safePage, limit: safeLimit, total, pages: Math.ceil(total / safeLimit) } })
  } catch (err) { res.status(500).json({ message: "Failed to fetch jobs" }) }
})

router.get("/saved", authenticate, async (req, res) => {
  try {
    const saved = await SavedJob.find({ user: req.user.id }).populate({ path: "job", populate: { path: "recruiter", select: "name company" } }).sort({ createdAt: -1 }).lean()
    res.json({ jobs: saved.map((item) => item.job).filter(Boolean) })
  } catch (err) { res.status(500).json({ message: "Failed to fetch saved jobs" }) }
})

router.get("/recommended", authenticate, async (req, res) => {
  try {
    const User = require("../models/User")
    const user = await User.findById(req.user.id).select("skills location experience").lean()
    const skills = Array.isArray(user?.skills) ? user.skills.filter(Boolean).slice(0, 20) : []
    const clauses = []
    if (skills.length) clauses.push({ skills: { $in: skills.map((s) => new RegExp(`^${escapeRegex(s)}$`, "i")) } })
    if (user?.location) clauses.push({ location: new RegExp(escapeRegex(user.location), "i") })
    const filter = { status: "open", ...(clauses.length ? { $or: clauses } : {}) }
    const jobs = await Job.find(filter).populate("recruiter", "name company").sort({ createdAt: -1 }).limit(20).lean()
    res.json({ jobs })
  } catch (err) { res.status(500).json({ message: "Failed to fetch recommended jobs" }) }
})

router.get("/applications/me", authenticate, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id }).populate({ path: "job", populate: { path: "recruiter", select: "name company" } }).sort({ updatedAt: -1 }).lean()
    const counts = applications.reduce((acc, item) => { acc.total += 1; acc[item.status] = (acc[item.status] || 0) + 1; return acc }, { total: 0, submitted: 0, reviewing: 0, shortlisted: 0, rejected: 0, accepted: 0, withdrawn: 0 })
    res.json({ applications, stats: counts })
  } catch (err) { res.status(500).json({ message: "Failed to fetch applications" }) }
})

router.get("/applications/:id", authenticate, async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid application id" })
    const application = await Application.findOne({ _id: req.params.id, applicant: req.user.id }).populate({ path: "job", populate: { path: "recruiter", select: "name company" } })
    if (!application) return res.status(404).json({ message: "Application not found" })
    const events = await ApplicationEvent.find({ application: application._id }).sort({ createdAt: 1 }).lean()
    res.json({ application, events })
  } catch (err) { res.status(500).json({ message: "Failed to fetch application" }) }
})

router.post("/applications/:id/withdraw", authenticate, async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid application id" })
    const application = await Application.findOne({ _id: req.params.id, applicant: req.user.id })
    if (!application) return res.status(404).json({ message: "Application not found" })
    if (["rejected", "accepted", "withdrawn"].includes(application.status)) return res.status(409).json({ message: "This application can no longer be withdrawn" })
    application.status = "withdrawn"
    await application.save()
    await ApplicationEvent.create({ application: application._id, status: "withdrawn", note: "Application withdrawn by candidate" })
    res.json({ application })
  } catch (err) { res.status(400).json({ message: err.message }) }
})

router.get("/:jobId", async (req, res) => {
  try {
    if (!validId(req.params.jobId)) return res.status(400).json({ message: "Invalid job id" })
    const job = await Job.findById(req.params.jobId).populate("recruiter", "name company email").lean()
    if (!job) return res.status(404).json({ message: "Job not found" })
    res.json({ job })
  } catch (err) { res.status(500).json({ message: "Failed to fetch job" }) }
})

router.post("/:jobId/save", authenticate, async (req, res) => {
  try {
    if (!validId(req.params.jobId)) return res.status(400).json({ message: "Invalid job id" })
    const job = await Job.findById(req.params.jobId)
    if (!job) return res.status(404).json({ message: "Job not found" })
    const existing = await SavedJob.findOne({ job: job._id, user: req.user.id })
    if (existing) { await existing.deleteOne(); return res.json({ saved: false }) }
    await SavedJob.create({ job: job._id, user: req.user.id })
    res.status(201).json({ saved: true })
  } catch (err) { res.status(400).json({ message: err.code === 11000 ? "Job already saved" : "Failed to save job" }) }
})

router.post("/:jobId/apply", authenticate, async (req, res) => {
  try {
    if (!validId(req.params.jobId)) return res.status(400).json({ message: "Invalid job id" })
    const { coverLetter = "", resumeUrl = "" } = req.body || {}
    const job = await Job.findById(req.params.jobId).populate("recruiter", "name company owner")
    if (!job) return res.status(404).json({ message: "Job not found" })
    if (job.status !== "open") return res.status(409).json({ message: "This job is no longer accepting applications" })
    const application = await Application.create({ job: job._id, applicant: req.user.id, coverLetter: String(coverLetter).trim().slice(0, 10000), resumeUrl: String(resumeUrl).trim().slice(0, 1000) })
    await ApplicationEvent.create({ application: application._id, status: "submitted" })
    await job.updateOne({ $addToSet: { applicants: req.user.id } })
    if (job.recruiter?.owner && String(job.recruiter.owner) !== String(req.user.id)) {
      await Notification.create({ recipient: job.recruiter.owner, sender: req.user.id, type: "job_application", text: `A new application was submitted for ${job.title}.`, link: `/recruiter-dashboard?job=${job._id}` })
    }
    await application.populate([{ path: "job", populate: { path: "recruiter", select: "name company" } }, { path: "applicant", select: "firstName lastName username profileImage" }])
    res.status(201).json({ application })
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: "You have already applied for this job" })
    res.status(400).json({ message: err.message })
  }
})

module.exports = router

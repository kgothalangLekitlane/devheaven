const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const { getRecruiters, createRecruiter, postJob, getJobs } = require("../controllers/recruiterController")
const Recruiter = require("../models/Recruiter")
const Job = require("../models/Job")
const Application = require("../models/Application")
const ApplicationEvent = require("../models/ApplicationEvent")
const Notification = require("../models/Notification")
const authenticate = require("../middleware/authMiddleware")

const validId = (id) => mongoose.Types.ObjectId.isValid(id)
const recruiterForUser = (userId, recruiterId) => Recruiter.findOne({ _id: recruiterId, owner: userId })
const ownedJob = (userId, jobId) => Job.findById(jobId).populate("recruiter", "name company owner")

router.get("/", getRecruiters)
router.post("/register", authenticate, createRecruiter)
router.post("/jobs", authenticate, postJob)
router.get("/jobs", getJobs)

router.get("/dashboard", authenticate, async (req, res) => {
  try {
    const recruiters = await Recruiter.find({ owner: req.user.id }).select("name email company jobs createdAt").lean()
    const recruiterIds = recruiters.map((r) => r._id)
    const jobs = await Job.find({ recruiter: { $in: recruiterIds } }).sort({ createdAt: -1 }).lean()
    const jobIds = jobs.map((j) => j._id)
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("applicant", "firstName lastName username profileImage skills location experience bio")
      .populate("job", "title company location type remote status")
      .sort({ updatedAt: -1 })
      .limit(500)
      .lean()
    const stats = applications.reduce((acc, item) => {
      acc.total += 1
      acc[item.status] = (acc[item.status] || 0) + 1
      return acc
    }, { total: 0, submitted: 0, reviewing: 0, shortlisted: 0, rejected: 0, accepted: 0, withdrawn: 0 })
    res.json({ recruiters, jobs, applications, stats })
  } catch (err) {
    res.status(500).json({ message: "Failed to load recruiter dashboard" })
  }
})

router.get("/jobs/:jobId/applications", authenticate, async (req, res) => {
  try {
    if (!validId(req.params.jobId)) return res.status(400).json({ message: "Invalid job id" })
    const job = await ownedJob(req.user.id, req.params.jobId)
    if (!job) return res.status(404).json({ message: "Job not found" })
    if (!job.recruiter || String(job.recruiter.owner) !== String(req.user.id)) return res.status(403).json({ message: "You do not own this job" })
    const applications = await Application.find({ job: job._id })
      .populate("applicant", "firstName lastName username profileImage skills location experience bio socialLinks")
      .sort({ updatedAt: -1 }).lean()
    res.json({ job, applications })
  } catch (err) { res.status(500).json({ message: "Failed to fetch applicants" }) }
})

router.patch("/jobs/:jobId/status", authenticate, async (req, res) => {
  try {
    if (!validId(req.params.jobId)) return res.status(400).json({ message: "Invalid job id" })
    const { status } = req.body || {}
    if (!["open", "closed"].includes(status)) return res.status(400).json({ message: "Invalid job status" })
    const job = await ownedJob(req.user.id, req.params.jobId)
    if (!job) return res.status(404).json({ message: "Job not found" })
    if (!job.recruiter || String(job.recruiter.owner) !== String(req.user.id)) return res.status(403).json({ message: "You do not own this job" })
    const previousStatus = job.status
    job.status = status
    await job.save()
    res.json({ job, previousStatus })
  } catch (err) { res.status(400).json({ message: err.message }) }
})

router.patch("/jobs/:jobId", authenticate, async (req, res) => {
  try {
    if (!validId(req.params.jobId)) return res.status(400).json({ message: "Invalid job id" })
    const job = await ownedJob(req.user.id, req.params.jobId)
    if (!job) return res.status(404).json({ message: "Job not found" })
    if (!job.recruiter || String(job.recruiter.owner) !== String(req.user.id)) return res.status(403).json({ message: "You do not own this job" })
    const allowed = ["title", "description", "location", "type", "remote", "skills", "salaryMin", "salaryMax"]
    const updates = {}
    for (const key of allowed) if (req.body[key] !== undefined) updates[key] = req.body[key]
    if (updates.title !== undefined) updates.title = String(updates.title).trim().slice(0, 160)
    if (updates.description !== undefined) updates.description = String(updates.description).trim().slice(0, 10000)
    if (updates.location !== undefined) updates.location = String(updates.location).trim().slice(0, 160)
    if (updates.skills !== undefined) updates.skills = Array.isArray(updates.skills) ? updates.skills.map((s) => String(s).trim()).filter(Boolean).slice(0, 30) : String(updates.skills).split(",").map((s) => s.trim()).filter(Boolean).slice(0, 30)
    if (updates.remote !== undefined) updates.remote = updates.remote === true || updates.remote === "true"
    for (const key of ["salaryMin", "salaryMax"]) if (updates[key] !== undefined && updates[key] !== "") updates[key] = Number(updates[key])
    const min = updates.salaryMin === "" ? undefined : (updates.salaryMin ?? job.salaryMin)
    const max = updates.salaryMax === "" ? undefined : (updates.salaryMax ?? job.salaryMax)
    if ((min != null && (!Number.isFinite(min) || min < 0)) || (max != null && (!Number.isFinite(max) || max < 0)) || (min != null && max != null && min > max)) return res.status(400).json({ message: "Invalid salary range" })
    Object.assign(job, updates)
    await job.save()
    res.json({ job })
  } catch (err) { res.status(400).json({ message: err.message }) }
})

router.delete("/jobs/:jobId", authenticate, async (req, res) => {
  try {
    if (!validId(req.params.jobId)) return res.status(400).json({ message: "Invalid job id" })
    const job = await ownedJob(req.user.id, req.params.jobId)
    if (!job) return res.status(404).json({ message: "Job not found" })
    if (!job.recruiter || String(job.recruiter.owner) !== String(req.user.id)) return res.status(403).json({ message: "You do not own this job" })
    const recruiterId = job.recruiter._id
    await Promise.all([
      Application.deleteMany({ job: job._id }),
      ApplicationEvent.deleteMany({ application: { $in: await Application.find({ job: job._id }).distinct("_id") } }),
      job.deleteOne(),
      Recruiter.updateOne({ _id: recruiterId }, { $pull: { jobs: job._id } }),
    ])
    res.json({ message: "Job deleted" })
  } catch (err) { res.status(500).json({ message: "Failed to delete job" }) }
})

router.patch("/applications/:id/status", authenticate, async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid application id" })
    const { status, note = "" } = req.body || {}
    const allowed = ["submitted", "reviewing", "shortlisted", "rejected", "accepted"]
    if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid application status" })
    const application = await Application.findById(req.params.id).populate("job", "title recruiter")
    if (!application) return res.status(404).json({ message: "Application not found" })
    const recruiter = await recruiterForUser(req.user.id, application.job.recruiter)
    if (!recruiter) return res.status(403).json({ message: "You do not own this job" })
    if (application.status === "withdrawn") return res.status(409).json({ message: "A withdrawn application cannot be changed" })
    const previous = application.status
    application.status = status
    await application.save()
    await ApplicationEvent.create({ application: application._id, status, note: String(note).trim().slice(0, 1000) })
    await Notification.create({ recipient: application.applicant, sender: req.user.id, type: "application_status", text: `Your application for ${application.job.title} is now ${status}.`, link: `/applications/${application._id}` })
    res.json({ application, previousStatus: previous })
  } catch (err) { res.status(400).json({ message: err.message }) }
})

module.exports = router

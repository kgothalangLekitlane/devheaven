const mongoose = require("mongoose")

const recruiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  createdAt: { type: Date, default: Date.now }
})

const Recruiter = mongoose.model("Recruiter", recruiterSchema)

module.exports = Recruiter

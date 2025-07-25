const mongoose = require("mongoose")

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: [{ type: String }],
  category: { type: String },
  createdAt: { type: Date, default: Date.now }
})

const Resource = mongoose.model("Resource", resourceSchema)

module.exports = Resource

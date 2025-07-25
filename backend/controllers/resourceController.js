const Resource = require("../models/Resource")

const getResources = async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate("author", "firstName lastName username")
      .sort({ createdAt: -1 })
    res.json(resources)
  } catch (error) {
    console.error("Get resources error:", error)
    res.status(500).json({ error: "Failed to fetch resources" })
  }
}

const addResource = async (req, res) => {
  try {
    const { title, description, link, tags, category } = req.body
    const userId = req.user ? req.user.id : null

    if (!title || !description || !link) {
      return res.status(400).json({ error: "Title, description, and link are required" })
    }

    const resource = new Resource({
      title,
      description,
      link,
      author: userId,
      tags: tags || [],
      category
    })

    await resource.save()
    await resource.populate("author", "firstName lastName username")

    res.status(201).json({
      message: "Resource added",
      resource
    })
  } catch (error) {
    console.error("Add resource error:", error)
    res.status(500).json({ error: "Failed to add resource" })
  }
}

module.exports = { getResources, addResource }

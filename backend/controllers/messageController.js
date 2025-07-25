const Message = require("../models/Message")
const User = require("../models/User")

const getMessages = async (req, res) => {
  try {
    // Get all conversations for the current user
    const userId = req.user.id
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }]
    })
    .populate("senderId", "firstName lastName username")
    .populate("receiverId", "firstName lastName username")
    .sort({ createdAt: -1 })

    res.json(messages)
  } catch (error) {
    console.error("Get messages error:", error)
    res.status(500).json({ error: "Failed to fetch messages" })
  }
}

const getMessagesWithUser = async (req, res) => {
  try {
    const userId = req.user.id
    const otherUserId = req.params.userId

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId }
      ]
    })
    .populate("senderId", "firstName lastName username")
    .populate("receiverId", "firstName lastName username")
    .sort({ createdAt: 1 })

    res.json(messages)
  } catch (error) {
    console.error("Get messages with user error:", error)
    res.status(500).json({ error: "Failed to fetch conversation" })
  }
}

const postMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body
    const senderId = req.user.id

    if (!receiverId || !text) {
      return res.status(400).json({ error: "Receiver ID and text are required" })
    }

    // Check if receiver exists
    const receiver = await User.findById(receiverId)
    if (!receiver) {
      return res.status(404).json({ error: "Receiver not found" })
    }

    const message = new Message({
      senderId,
      receiverId,
      text
    })

    await message.save()
    await message.populate("senderId", "firstName lastName username")
    await message.populate("receiverId", "firstName lastName username")

    res.status(201).json({
      message: "Message sent",
      chat: message
    })
  } catch (error) {
    console.error("Post message error:", error)
    res.status(500).json({ error: "Failed to send message" })
  }
}

module.exports = { getMessages, getMessagesWithUser, postMessage }

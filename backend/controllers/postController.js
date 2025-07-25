const Post = require("../models/Post")
const User = require("../models/User")

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "firstName lastName username")
      .sort({ createdAt: -1 })
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" })
  }
}

const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body
    const userId = req.user.id

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" })
    }

    const post = new Post({
      title,
      content,
      author: userId,
      tags: tags || []
    })

    await post.save()
    await post.populate("author", "firstName lastName username")

    res.status(201).json({
      message: "Post created",
      post
    })
  } catch (error) {
    console.error("Create post error:", error)
    res.status(500).json({ error: "Failed to create post" })
  }
}

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "firstName lastName username")
      .populate("comments.user", "firstName lastName username")
    
    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    res.json(post)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" })
  }
}

const likePost = async (req, res) => {
  try {
    const postId = req.params.id
    const userId = req.user.id

    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    const hasLiked = post.likes.includes(userId)
    
    if (hasLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId)
    } else {
      post.likes.push(userId)
    }

    await post.save()
    res.json({ message: hasLiked ? "Post unliked" : "Post liked", likes: post.likes.length })
  } catch (error) {
    res.status(500).json({ error: "Failed to like post" })
  }
}

const addComment = async (req, res) => {
  try {
    const postId = req.params.id
    const userId = req.user.id
    const { text } = req.body

    if (!text) {
      return res.status(400).json({ error: "Comment text is required" })
    }

    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    post.comments.push({
      user: userId,
      text
    })

    await post.save()
    await post.populate("comments.user", "firstName lastName username")

    res.status(201).json({
      message: "Comment added",
      comment: post.comments[post.comments.length - 1]
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment" })
  }
}

module.exports = {
  getPosts,
  createPost,
  getPost,
  likePost,
  addComment
}

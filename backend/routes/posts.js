const express = require("express")
const router = express.Router()
const { getPosts, createPost, getPost, likePost, addComment } = require("../controllers/postController")
const authenticate = require("../middleware/authMiddleware")

router.get("/", getPosts)
router.post("/", authenticate, createPost)
router.get("/:id", getPost)
router.post("/:id/like", authenticate, likePost)
router.post("/:id/comments", authenticate, addComment)

module.exports = router

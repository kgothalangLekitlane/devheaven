const express = require("express");
const router = express.Router();
const { getMessages, getMessagesWithUser, postMessage } = require("../controllers/messageController");
const authenticate = require("../middleware/authMiddleware");

router.get("/", authenticate, getMessages);
router.get("/:userId", authenticate, getMessagesWithUser);
router.post("/", authenticate, postMessage);

module.exports = router;

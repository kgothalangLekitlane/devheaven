const express = require("express");
const router = express.Router();
const { getUsers, getUserById, searchCandidates } = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");

router.get("/", authenticate, getUsers);
router.get("/search", authenticate, searchCandidates);
router.get("/:id", getUserById);

module.exports = router;

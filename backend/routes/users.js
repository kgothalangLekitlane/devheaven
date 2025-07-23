const express = require("express");
const router = express.Router();
const { getUsers, searchCandidates } = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");

router.get("/", authenticate, getUsers);
router.get("/search", authenticate, searchCandidates);

module.exports = router;
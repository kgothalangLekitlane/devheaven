const express = require("express");
const router = express.Router();
const { getResources, addResource } = require("../controllers/resourceController");
const authenticate = require("../middleware/authMiddleware");

router.get("/", getResources);
router.post("/", authenticate, addResource);

module.exports = router;

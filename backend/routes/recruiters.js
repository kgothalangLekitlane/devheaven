const express = require("express");
const router = express.Router();
const { getRecruiters } = require("../controllers/recruiterController");

router.get("/", getRecruiters);

module.exports = router;
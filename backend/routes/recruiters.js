const express = require("express");
const router = express.Router();
const { getRecruiters, createRecruiter, postJob, getJobs } = require("../controllers/recruiterController");

router.get("/", getRecruiters);
router.post("/register", createRecruiter);
router.post("/jobs", postJob);
router.get("/jobs", getJobs);

module.exports = router;
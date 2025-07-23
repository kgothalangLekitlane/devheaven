const express = require('express');
const router = express.Router();


const { getUsers } = require('../controllers/userController');
const { getMessages, postMessage } = require('../controllers/messageController');
const { getRecruiters } = require('../controllers/recruiterController');
const { getResources } = require('../controllers/resourceController');
const { registerUser, loginUser } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

// Auth routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// Users (protected)
router.get('/users', authenticate, getUsers);

// Messages
router.get('/messages', getMessages);
router.post('/messages', postMessage);

// Recruiters
router.get('/recruiters', getRecruiters);

// Resources
router.get('/resources', getResources);

module.exports = router;

const express = require('express');
const router = express.Router();

const { getUsers, getUserById, searchCandidates } = require('../controllers/userController');
const { getMessages, getMessagesWithUser, postMessage } = require('../controllers/messageController');
const { getRecruiters, createRecruiter, postJob, getJobs } = require('../controllers/recruiterController');
const { getResources, addResource } = require('../controllers/resourceController');
const { getPosts, createPost } = require('../controllers/postController');
const { registerUser, loginUser } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

// Auth routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// Users
router.get('/users', authenticate, getUsers);
router.get('/users/search', authenticate, searchCandidates);
router.get('/users/:id', getUserById);

// Posts
router.get('/posts', getPosts);
router.post('/posts', authenticate, createPost);

// Messages
router.get('/messages', authenticate, getMessages);
router.get('/messages/:userId', authenticate, getMessagesWithUser);
router.post('/messages', authenticate, postMessage);

// Recruiters & Jobs
router.get('/recruiters', getRecruiters);
router.post('/recruiters', authenticate, createRecruiter);
router.get('/recruiters/jobs', getJobs);
router.post('/recruiters/jobs', authenticate, postJob);

// Resources
router.get('/resources', getResources);
router.post('/resources', authenticate, addResource);

module.exports = router;

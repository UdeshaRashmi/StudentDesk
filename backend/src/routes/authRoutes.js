const express = require('express');
const router = express.Router();
// IMPORTANT: Check this path! It must point to where your controller actually is.
const { registerUser, loginUser, getMe, demoLogin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// The names here MUST match the module.exports in the controller
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/demo', demoLogin);
router.get('/me', protect, getMe);

module.exports = router;
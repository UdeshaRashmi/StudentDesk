const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
// Note: Create and read routes are public; update/delete require auth
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentStats
} = require('../controllers/studentController');

// Routes are public to allow CRUD without login

// Student routes
router.route('/')
  .get(getStudents)
  .post(createStudent);

router.route('/:id')
  .get(getStudent)
  .put(protect, updateStudent)
  .delete(protect, deleteStudent);

// Stats route
router.get('/stats/overview', getStudentStats);

module.exports = router;
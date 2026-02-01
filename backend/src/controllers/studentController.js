const Student = require('../models/Student');
const { validateStudentInput } = require('../utils/validators');

// @desc    Get all students
// @route   GET /api/students
// @access  Private
exports.getStudents = async (req, res) => {
  try {
    // Filter by logged in user (students they created) when authenticated
    const filter = {};
    if (req.user && req.user.id) filter.createdBy = req.user.id;
    
    // Optional: Search by name or email
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Optional: Filter by course
    if (req.query.course) {
      filter.course = req.query.course;
    }
    
    // Optional: Filter by status
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Sorting
    const sort = {};
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1; // Default: newest first
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const students = await Student.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Student.countDocuments(filter);

    res.json({
      success: true,
      count: students.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private
exports.getStudent = async (req, res) => {
  try {
    // If authenticated, restrict to user's students; otherwise allow any
    const query = { _id: req.params.id };
    if (req.user && req.user.id) query.createdBy = req.user.id;

    const student = await Student.findOne(query);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create student
// @route   POST /api/students
// @access  Private
exports.createStudent = async (req, res) => {
  try {
    // Validate input
    const { errors, isValid } = validateStudentInput(req.body);
    
    if (!isValid) {
      return res.status(400).json({
        success: false,
        errors
      });
    }

    // Check if student with email already exists (scoped by user when authenticated)
    const existingFilter = { email: req.body.email };
    if (req.user && req.user.id) existingFilter.createdBy = req.user.id;

    const existingStudent = await Student.findOne(existingFilter);

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student already exists with this email'
      });
    }

    // Create student (attach createdBy only when authenticated)
    const createPayload = { ...req.body };
    if (req.user && req.user.id) createPayload.createdBy = req.user.id;

    const student = await Student.create(createPayload);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Student already exists with this email'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private
exports.updateStudent = async (req, res) => {
  try {
    // Validate input
    const { errors, isValid } = validateStudentInput(req.body);
    
    if (!isValid) {
      return res.status(400).json({
        success: false,
        errors
      });
    }

    // Find student (restrict by createdBy when authenticated)
    // Find student by id first
    let student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // If the student has an owner, ensure the requester matches that owner
    if (student.createdBy) {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
      }
      if (student.createdBy.toString() !== req.user.id.toString()) {
        return res.status(403).json({ success: false, message: 'Forbidden: you do not own this student' });
      }
    }

    // Check if email is being changed and if it already exists
    if (req.body.email !== student.email) {
      const existingFilter = { email: req.body.email };
      if (req.user && req.user.id) existingFilter.createdBy = req.user.id;

      const existingStudent = await Student.findOne(existingFilter);

      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: 'Another student already exists with this email'
        });
      }
    }

    // Update student
    student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Student already exists with this email'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private
exports.deleteStudent = async (req, res) => {
  try {
    // Find student by id
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    // If owned, ensure requester is owner
    if (student.createdBy) {
      if (!req.user || !req.user.id) return res.status(401).json({ success: false, message: 'Not authorized' });
      if (student.createdBy.toString() !== req.user.id.toString()) return res.status(403).json({ success: false, message: 'Forbidden: you do not own this student' });
    }

    await student.deleteOne();

    res.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get student statistics
// @route   GET /api/students/stats/overview
// @access  Private
exports.getStudentStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get total students
    const totalStudents = await Student.countDocuments({ createdBy: userId });

    // Get students by course
    const studentsByCourse = await Student.aggregate([
      { $match: { createdBy: userId } },
      { $group: { _id: '$course', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get students by status
    const studentsByStatus = await Student.aggregate([
      { $match: { createdBy: userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Get average age
    const ageStats = await Student.aggregate([
      { $match: { createdBy: userId } },
      { $group: { _id: null, avgAge: { $avg: '$age' } } }
    ]);

    // Get recent students (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentStudents = await Student.countDocuments({
      createdBy: userId,
      createdAt: { $gte: sevenDaysAgo }
    });

    res.json({
      success: true,
      data: {
        total: totalStudents,
        byCourse: studentsByCourse,
        byStatus: studentsByStatus,
        averageAge: ageStats[0]?.avgAge || 0,
        recentAdditions: recentStudents
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    enum: [
      'Computer Science',
      'Business Administration',
      'Engineering',
      'Medicine',
      'Arts & Humanities',
      'Mathematics',
      'Physics',
      'Other'
    ],
    default: 'Other'
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [16, 'Age must be at least 16'],
    max: [60, 'Age cannot exceed 60']
  },
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^[0-9]{10}$/.test(v);
      },
      message: 'Please provide a valid 10-digit phone number'
    }
  },
  address: {
    type: String,
    maxlength: [200, 'Address cannot exceed 200 characters']
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated'],
    default: 'active'
  },
  gpa: {
    type: Number,
    min: [0, 'GPA cannot be less than 0'],
    max: [4.0, 'GPA cannot exceed 4.0'],
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
}, {
  timestamps: true
});

// Index for better query performance
studentSchema.index({ email: 1 });
studentSchema.index({ course: 1 });
studentSchema.index({ status: 1 });
studentSchema.index({ createdBy: 1 });

// Virtual for student ID (format: SD-0001)
studentSchema.virtual('studentId').get(function() {
  return `SD-${this._id.toString().slice(-4).toUpperCase()}`;
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
const validator = require('validator');

const allowedCourses = [
  'Computer Science',
  'Business Administration',
  'Engineering',
  'Medicine',
  'Arts & Humanities',
  'Mathematics',
  'Physics',
  'Other'
];

function validateStudentInput(data) {
  const errors = {};

  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const course = (data.course || '').trim();
  const age = data.age;

  if (!name) errors.name = 'Student name is required';
  if (!email) errors.email = 'Email is required';
  else if (!validator.isEmail(email)) errors.email = 'Please provide a valid email';
  if (!course) errors.course = 'Course is required';
  else if (!allowedCourses.includes(course)) errors.course = 'Invalid course selected';
  if (age === undefined || age === null || age === '') errors.age = 'Age is required';
  else if (!validator.isInt(String(age), { min: 16, max: 60 })) errors.age = 'Age must be between 16 and 60';

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

function validateRegisterInput(data) {
  const errors = {};
  const email = (data.email || '').trim();
  const password = data.password || '';

  if (!email) errors.email = 'Email is required';
  else if (!validator.isEmail(email)) errors.email = 'Please provide a valid email';
  if (!password) errors.password = 'Password is required';
  else if (String(password).length < 6) errors.password = 'Password must be at least 6 characters';

  return { errors, isValid: Object.keys(errors).length === 0 };
}

function validateLoginInput(data) {
  const errors = {};
  const email = (data.email || '').trim();
  const password = data.password || '';

  if (!email) errors.email = 'Email is required';
  if (!password) errors.password = 'Password is required';

  return { errors, isValid: Object.keys(errors).length === 0 };
}

module.exports = {
  validateStudentInput,
  validateRegisterInput,
  validateLoginInput
};

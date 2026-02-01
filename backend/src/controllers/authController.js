const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper to create JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your_secret_key', {
        expiresIn: '30d',
    });
};

// @desc    Register new user
const registerUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const normalizedEmail = email.toLowerCase().trim();

        const userExists = await User.findOne({ email: normalizedEmail });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = await User.create({
            firstName,
            lastName,
            email: normalizedEmail,
            password, // Hashing happens in User Model
        });

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            token: generateToken(user._id),
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Authenticate a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({ email: normalizedEmail });

        if (user && (await user.comparePassword(password))) {
            res.json({
                success: true,
                message: 'Login successful',
                token: generateToken(user._id),
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user profile
const getMe = async (req, res) => {
    res.status(200).json({ success: true, user: req.user });
};

// MAKE SURE THESE NAMES MATCH THE ROUTES IMPORT
module.exports = {
    registerUser,
    loginUser,
    getMe
};

// Demo login helper (creates demo user if not exists)
const demoLogin = async (req, res) => {
    try {
        const demoEmail = process.env.DEMO_EMAIL || 'demo@studentsdesk.com';
        const demoPassword = process.env.DEMO_PASSWORD || 'Demo123!';

        let user = await User.findOne({ email: demoEmail });
        if (!user) {
            user = await User.create({ email: demoEmail, password: demoPassword });
        }

        res.json({
            success: true,
            message: 'Demo login successful',
            token: generateToken(user._id),
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// attach to exports
module.exports.demoLogin = demoLogin;
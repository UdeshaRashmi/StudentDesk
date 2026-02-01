const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Load routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const errorHandler = require('./middleware/errorHandler');

const createApp = () => {
  const app = express();

  app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // Handle preflight
  app.options('*', cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  // Simple request logger
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/students', studentRoutes);

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'StudentsDesk API is running', timestamp: new Date().toISOString() });
  });

  // Error handler
  app.use(errorHandler);

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
  });

  return app;
};

module.exports = createApp();

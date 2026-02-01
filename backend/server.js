const dotenv = require('dotenv');
const connectDB = require('./src/config/database');
const app = require('./src/app');

// Load environment variables
dotenv.config();

const seedDefaultAdmin = async () => {
  try {
    const User = require('./src/models/User');
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@studentsdesk.com';
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin123!';

    const exists = await User.findOne({ email: adminEmail });
    if (!exists) {
      await User.create({ email: adminEmail, password: adminPassword });
      console.log(`✅ Default admin created: ${adminEmail}`);
    } else {
      console.log(`ℹ️ Default admin exists: ${adminEmail}`);
    }
  } catch (err) {
    console.error('Error seeding default admin:', err.message);
  }
};

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedDefaultAdmin();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`API Base: http://localhost:${PORT}/api/auth`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
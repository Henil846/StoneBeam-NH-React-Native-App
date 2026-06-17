const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const { errorHandler, notFound } = require('./src/middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// --------------- Middleware ---------------
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// --------------- Routes ---------------
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/projects', require('./src/routes/projects'));
app.use('/api/orders', require('./src/routes/orders'));
app.use('/api/attendance', require('./src/routes/attendance'));
app.use('/api/catalogue', require('./src/routes/catalogue'));
app.use('/api/feed', require('./src/routes/feed'));
app.use('/api/work-status', require('./src/routes/workStatus'));
app.use('/api/upload', require('./src/routes/upload'));
app.use('/api/banners', require('./src/routes/banners'));
app.use('/api/support', require('./src/routes/support'));
app.use('/api/search', require('./src/routes/search'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --------------- Error Handling ---------------
app.use(notFound);
app.use(errorHandler);

// --------------- Start Server ---------------
// Only listen when running locally (Vercel sets the VERCEL env var automatically)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 StoneBeam-NH API running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });
}

module.exports = app;

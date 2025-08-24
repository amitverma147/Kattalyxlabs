import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import userRoutes from './routes/users.js';
import schoolRoutes from './routes/schools.js';
import speakerRoutes from './routes/speakers.js';
import feedbackRoutes from './routes/feedback.js';
import eventRequestRoutes from './routes/eventRequests.js';
import speakerRequestRoutes from './routes/speakerRequests.js';
import adminRoutes from './routes/admin.js';

// Import middleware
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edu-event-platform')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/schools', authenticateToken, schoolRoutes);
app.use('/api/speakers', authenticateToken, speakerRoutes);
app.use('/api/feedback', authenticateToken, feedbackRoutes);
app.use('/api/event-requests', authenticateToken, eventRequestRoutes);
app.use('/api/speaker-requests', authenticateToken, speakerRequestRoutes);
app.use('/api/admin', authenticateToken, adminRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

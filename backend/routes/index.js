const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./users');
const workoutRoutes = require('./workouts');
const analyticsRoutes = require('./analytics');
const planRoutes = require('./plans');
const communityRoutes = require('./community');
const coachRoutes = require('./coach');

// Base API route
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'FitPulse API is running',
    endpoints: {
      auth: ['/api/auth/register', '/api/auth/login', '/api/auth/logout', '/api/auth/me'],
      user: ['/api/user/profile', '/api/user/stats'],
      workouts: ['/api/workouts'],
      analytics: ['/api/analytics/weekly', '/api/analytics/monthly'],
      plans: ['/api/plans/active', '/api/plans/generate'],
      community: ['/api/community/leaderboard', '/api/community/challenges'],
      coach: ['/api/coach/clients', '/api/coach/assign-plan'],
    },
  });
});

// Register all modular routes
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/workouts', workoutRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/plans', planRoutes);
router.use('/community', communityRoutes);
router.use('/coach', coachRoutes);

module.exports = router;

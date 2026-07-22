const Workout = require('../models/Workout');
const WorkoutStats = require('../models/WorkoutStats');
const Badge = require('../models/Gamification');
const { Leaderboard } = require('../models/Community');


// POST /workouts
const createWorkout = async (req, res) => {
  try {
    const { type, title, duration, caloriesBurned, notes, date, exercises } = req.body;
    const workout = await Workout.create({
      userId: req.user.id, type, title, duration, caloriesBurned, notes,
      date: date ? new Date(date) : new Date(), exercises: exercises || [],
    });

    // Also log stats if we have device-like metrics
    await WorkoutStats.create({
      userId: req.user.id,
      workoutDate: workout.date,
      duration: duration || 0,
      calories: caloriesBurned || 0,
      distance: req.body.distance || 0,
      volume: req.body.volume || 0,
      cadence: req.body.cadence || 0,
      heartRate: req.body.heartRate || 0,
    });

    // Gamification
    const workoutCount = await Workout.countDocuments({ userId: req.user.id });
    if (workoutCount === 1) {
      await Badge.create({ userId: req.user.id, name: 'First Blood', description: 'Logged first workout!', iconUrl: '🔥' });
    } else if (workoutCount === 10) {
      await Badge.create({ userId: req.user.id, name: 'Consistency', description: 'Logged 10 workouts!', iconUrl: '⭐' });
    }

    // Leaderboard Points (Global simple approach: upsert user in global leaderboard group, or just find all leaderboards they are in and increment)
    // The ER Diagram implies leaderboard per group. Let's update all leaderboards the user is part of.
    await Leaderboard.updateMany(
      { userId: req.user.id },
      { $inc: { points: 10 } }
    );

    res.status(201).json({ workout, message: 'Workout logged!' });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Create failed' }); }
};

// GET /workouts
const getWorkouts = async (req, res) => {
  try {
    const { limit = 20, offset = 0, type, from, to } = req.query;
    const filter = { userId: req.user.id };
    if (type) filter.type = type;
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }
    const [workouts, total] = await Promise.all([
      Workout.find(filter).sort({ date: -1 }).skip(parseInt(offset)).limit(parseInt(limit)),
      Workout.countDocuments(filter),
    ]);
    res.json({ workouts, total });
  } catch (err) { res.status(500).json({ error: 'Fetch failed' }); }
};

// GET /workouts/:id
const getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.id, userId: req.user.id });
    if (!workout) return res.status(404).json({ error: 'Not found' });
    res.json({ workout });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

// PUT /workouts/:id
const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: req.body }, { new: true }
    );
    if (!workout) return res.status(404).json({ error: 'Not found' });
    res.json({ workout });
  } catch (err) { res.status(500).json({ error: 'Update failed' }); }
};

// DELETE /workouts/:id
const deleteWorkout = async (req, res) => {
  try {
    const result = await Workout.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!result) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: 'Delete failed' }); }
};

module.exports = { createWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout };

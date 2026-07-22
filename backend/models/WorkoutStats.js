const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
  workoutDate: { type: Date, default: Date.now },
  duration: Number,
  calories: Number,
  distance: Number,
  volume: Number,
  cadence: Number,
  heartRate: Number,
  heartRateZone: { type: String, enum: ['rest', 'fat_burn', 'cardio', 'peak'] },
}, { timestamps: true });

statsSchema.index({ userId: 1, workoutDate: -1 });

module.exports = mongoose.model('WorkoutStats', statsSchema);

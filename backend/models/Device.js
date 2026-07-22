const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deviceName: { type: String },
  deviceType: { type: String, enum: ['apple_health', 'google_fit', 'fitbit', 'garmin', 'manual'] },
  lastSync: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Device', deviceSchema);

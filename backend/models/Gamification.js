const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  description: String,
  iconUrl: String,
  awardedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Badge', badgeSchema);

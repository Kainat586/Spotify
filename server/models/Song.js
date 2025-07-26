const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  imagePath: String,  // ✅ matches what you're saving
  audioPath: String,  // ✅ matches what you're saving
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Song', songSchema);

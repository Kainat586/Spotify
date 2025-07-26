const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose'); // if using MongoDB
const songRoutes = require('./routes/songs');

// ✅ CORS comes first
app.use(cors());

// ✅ Other middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Then register routes
app.use('/api/songs', songRoutes);

// Optional: Dummy data
const songs = [
  {
    title: 'Let Me Love You',
    artist: 'DJ Snake',
    imagePath: 'uploads/images/letmeloveyou.jpg',
    audioPath: 'uploads/audio/letmeloveyou.mp3',
  },
];

// Optional GET route
app.get('/api/songs', (req, res) => {
  res.json(songs);
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

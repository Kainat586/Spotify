const express = require('express');
const multer = require('multer');
const path = require('path');
const Song = require('../models/Song');
const router = express.Router();

// Define storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'audio') {
      cb(null, 'uploads/audio');
    } else if (file.fieldname === 'image') {
      cb(null, 'uploads/images');
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Upload route
router.post('/upload', upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, artist } = req.body;
    const audioFile = req.files['audio'][0];
    const imageFile = req.files['image'][0];

    if (!audioFile || !imageFile) {
      return res.status(400).json({ error: 'Missing files' });
    }

    const newSong = new Song({
      title,
      artist,
      imagePath: `uploads/images/${imageFile.filename}`,
      audioPath: `uploads/audio/${audioFile.filename}`
    });

    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (error) {
    console.error('Error uploading song:', error);
    res.status(500).json({ error: 'Failed to upload song' });
  }
});

// Get songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    console.log('Songs retrieved from DB:', songs);
    res.json(songs);
  } catch (error) {
    console.error('Error retrieving songs:', error);
    res.status(500).json({ error: 'Failed to retrieve songs' });
  }
});

module.exports = router;

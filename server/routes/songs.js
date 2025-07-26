const express = require('express');
const multer = require('multer');
const path = require('path');
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

let songs = []; // (In-memory; replace with DB if needed)

// Upload route
router.post('/upload', upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), (req, res) => {
  const { title, artist } = req.body;
  const audioFile = req.files['audio'][0];
  const imageFile = req.files['image'][0];

  if (!audioFile || !imageFile) {
    return res.status(400).json({ error: 'Missing files' });
  }

  const newSong = {
    title,
    artist,
    imagePath: `uploads/images/${imageFile.filename}`,
    audioPath: `uploads/audio/${audioFile.filename}`
  };

  songs.push(newSong);
  res.status(201).json(newSong);
});

// Get songs
router.get('/', (req, res) => {
  res.json(songs);
});

module.exports = router;

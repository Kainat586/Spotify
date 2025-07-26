// backend/routes/playlists.js
const express = require('express');
const router = express.Router();

let playlists = [];

router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const newPlaylist = { id: Date.now(), name, songs: [] };
  playlists.push(newPlaylist);
  res.status(201).json(newPlaylist);
});

router.get('/', (req, res) => {
  res.json(playlists);
});

module.exports = router;

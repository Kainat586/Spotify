// src/components/MusicPlayer.js
import React, { useState } from 'react';
import './MusicPlayer.css';

const MusicPlayer = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!song) return null;

  return (
    <div className="music-player">
      <div className="now-playing">
        <img
          src={`http://localhost:5000/${song.imagePath}`}
          alt={song.title}
          onError={(e) => (e.target.src = '/images/default.jpg')}
          width="40"
        />
        <div>
          <strong>{song.title}</strong>
          <p>{song.artist}</p>
        </div>
      </div>

      <div className="controls">
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? '⏸ Pause' : '▶️ Play'}
        </button>

        {/* autoplay audio only when user clicks Play */}
        {isPlaying && (
          <audio src={`http://localhost:5000/${song.audioPath}`} autoPlay controls />
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;

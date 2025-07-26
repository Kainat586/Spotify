// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import UploadModal from '../components/UploadModal';
import MusicPlayer from '../components/MusicPlayer';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/songs")
      .then(res => setSongs(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleUploadSuccess = () => {
    setShowModal(false);
    axios.get("http://localhost:5000/api/songs")
      .then(res => setSongs(res.data));
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Navbar onUploadClick={() => setShowModal(true)} />

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-button" onClick={() => setShowModal(false)}>✖</span>
              <h2 className="modal-title">🎵 Upload a New Song</h2>
              <UploadModal onUploadSuccess={handleUploadSuccess} />
            </div>
          </div>
        )}


        <h2>All Songs</h2>
        <div className="songs-container">
          {songs.map((song, index) => (
            <div
              key={index}
              className="song-card"
              onClick={() => setCurrentSong(song)}
            >
              <img
                src={`http://localhost:5000/${song.imagePath}`}
                alt={song.title}
              />
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
              <audio controls>
                <source
                  src={`http://localhost:5000/${song.audioPath}`}
                  type="audio/mpeg"
                />
              </audio>
            </div>
          ))}
        </div>

        <MusicPlayer song={currentSong} />
      </div>
    </div>
  );
};

export default Home;

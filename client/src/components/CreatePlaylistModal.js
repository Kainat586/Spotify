// src/components/CreatePlaylistModal.js
import React, { useState } from 'react';
import axios from 'axios';
import './CreatePlaylistModal.css';

const CreatePlaylistModal = ({ onClose, onSuccess }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert('Please enter a playlist name');

    try {
      await axios.post('http://localhost:5000/api/playlists', { name });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to create playlist');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>✖</span>
        <h2>Create New Playlist</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Playlist Name"
            required
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;

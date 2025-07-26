// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>🎵 MusicVibe</h2>
      <ul>
        <li>🏠 Home</li>
        <li>🔍 Search</li>
        <li>❤️ Favorites</li>
        <li>⚙️ Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;

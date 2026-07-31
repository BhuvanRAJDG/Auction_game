import React, { useState, useEffect } from 'react';
import { FOOTBALL_CLUBS } from '../data/teamsData';
import { RoomSync } from '../utils/roomSync';
import { Zap, Globe, Lock, Users, ArrowRight, Shield, Flame } from 'lucide-react';
import { isConfigured } from '../utils/firebase';

export default function HomeDashboard({
  userName,
  setUserName,
  selectedClub,
  setSelectedClub,
  onCreateRoom,
  onJoinRoom
}) {
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [activeTab, setActiveTab] = useState('NEW_GAME'); // 'NEW_GAME' | 'BROWSE_ROOMS'
  const [publicRooms, setPublicRooms] = useState([]);

  useEffect(() => {
    const unsubscribe = RoomSync.getPublicRooms((rooms) => {
      setPublicRooms(rooms);
    });
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const generateRandomRoomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!selectedClub) {
      alert('Please select a club');
      return;
    }

    const newCode = generateRandomRoomCode();
    onCreateRoom(newCode, isPublic);
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!roomCodeInput.trim()) {
      alert('Please enter a Room Code');
      return;
    }
    onJoinRoom(roomCodeInput.toUpperCase());
  };

  return (
    <div className="home-dashboard">
      
      {/* Hero Header */}
      <div className="hero-header">
        <div className="badge-pill">
          <Flame size={14} color="#f59e0b" />
          <span>Football Auction 2026 Ready</span>
        </div>

        <h1 className="hero-title">
          Play Football Auction <br />
          <span className="accent-text">with Friends</span>
        </h1>

        <div className="hero-pills-row">
          <span className="pill-item yellow-pill">🔥 2026 Official List • 250 players</span>
          {isConfigured ? (
            <span className="pill-item green-pill">🌐 Online Mode (Connected to Firebase)</span>
          ) : (
            <span className="pill-item red-pill">🔌 Offline Mode (Local Sync Only)</span>
          )}
        </div>
      </div>

      {/* Main Action Container */}
      <div className="home-card-container">
        
        {/* Navigation Tabs */}
        <div className="home-tabs">
          <button
            className={`tab-link ${activeTab === 'NEW_GAME' ? 'active' : ''}`}
            onClick={() => setActiveTab('NEW_GAME')}
          >
            <Zap size={16} />
            <span>New Game</span>
          </button>

          <button
            className={`tab-link ${activeTab === 'BROWSE_ROOMS' ? 'active' : ''}`}
            onClick={() => setActiveTab('BROWSE_ROOMS')}
          >
            <Globe size={16} />
            <span>Browse Rooms ({publicRooms.length})</span>
          </button>
        </div>

        {/* Tab 1: Create or Join Room */}
        {activeTab === 'NEW_GAME' && (
          <div className="tab-content">
            
            {/* Create Room Form */}
            <form onSubmit={handleCreateSubmit} className="create-room-form">
              
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your name..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Choose Your Club</label>
                <select
                  className="form-input select-input"
                  value={selectedClub ? selectedClub.id : ''}
                  onChange={(e) => {
                    const club = FOOTBALL_CLUBS.find(c => c.id === e.target.value);
                    if (club) setSelectedClub(club);
                  }}
                  required
                >
                  <option value="" disabled>Select a club...</option>
                  {FOOTBALL_CLUBS.map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.badge} {club.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Public vs Private Room Selector */}
              <div className="room-privacy-grid">
                <button
                  type="button"
                  className={`privacy-btn ${isPublic ? 'active' : ''}`}
                  onClick={() => setIsPublic(true)}
                >
                  <div className="privacy-header">
                    <Globe size={16} />
                    <strong>Public</strong>
                  </div>
                  <span className="desc">Anyone can find & join</span>
                </button>

                <button
                  type="button"
                  className={`privacy-btn ${!isPublic ? 'active' : ''}`}
                  onClick={() => setIsPublic(false)}
                >
                  <div className="privacy-header">
                    <Lock size={16} />
                    <strong>Private</strong>
                  </div>
                  <span className="desc">Only people you invite</span>
                </button>
              </div>

              <button type="submit" className="btn btn-orange btn-lg btn-block">
                <Zap size={18} />
                <span>Create Room</span>
              </button>
            </form>

            <div className="divider-line">
              <span>OR JOIN AN EXISTING ROOM</span>
            </div>

            {/* Join Room Form */}
            <form onSubmit={handleJoinSubmit} className="join-room-inline">
              <input
                type="text"
                className="form-input uppercase-input"
                placeholder="Enter Room Code (e.g. AXG8YD)"
                value={roomCodeInput}
                onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                maxLength={8}
                required
              />
              <button type="submit" className="btn btn-secondary btn-lg">
                <span>Join Room</span>
                <ArrowRight size={16} />
              </button>
            </form>

          </div>
        )}

        {/* Tab 2: Browse Live Public Rooms */}
        {activeTab === 'BROWSE_ROOMS' && (
          <div className="tab-content">
            <h3 className="section-title">Live Public Auction Rooms</h3>

            {publicRooms.length === 0 ? (
              <div className="no-rooms-box">
                <p>No active public rooms found right now. Create a room above to get started!</p>
              </div>
            ) : (
              <div className="public-rooms-list">
                {publicRooms.map((room) => (
                  <div key={room.roomCode} className="public-room-card">
                    <div className="room-info">
                      <strong className="code">Room {room.roomCode}</strong>
                      <span className="host">Host: {room.hostName}</span>
                    </div>

                    <div className="room-meta">
                      <span className="players-count"><Users size={14} /> {room.playerCount} Players</span>
                      <span className={`status-badge ${room.status}`}>
                        {room.status === 'IN_PROGRESS' ? '🔴 Live Auction' : '🟢 Waiting in Lobby'}
                      </span>
                    </div>

                    <button
                      className="btn btn-orange btn-sm"
                      onClick={() => onJoinRoom(room.roomCode)}
                    >
                      Join Room
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}

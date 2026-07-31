import React, { useState } from 'react';
import { FOOTBALL_CLUBS } from '../data/teamsData';
import { Shield, User, Check, Play } from 'lucide-react';

export default function LobbyModal({
  isOpen,
  onClose,
  roomCode,
  setRoomCode,
  userName,
  setUserName,
  selectedClub,
  setSelectedClub,
  onJoinRoom
}) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      alert('Please enter your Manager Name');
      return;
    }
    onJoinRoom();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card join-modal">
        
        <div className="modal-header">
          <h3>JOIN AUCTION ROOM</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            
            <div className="form-group">
              <label><Shield size={16} /> Room Code</label>
              <input
                type="text"
                className="form-control"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="RPW5U9"
                maxLength={8}
                required
              />
            </div>

            <div className="form-group">
              <label><User size={16} /> Your Manager Name</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Alex"
                required
              />
            </div>

            <div className="form-group">
              <label><Shield size={16} /> Choose Your Club</label>
              <div className="clubs-grid-simple">
                {FOOTBALL_CLUBS.map((club) => {
                  const isSelected = selectedClub.id === club.id;
                  return (
                    <div
                      key={club.id}
                      className={`club-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedClub(club)}
                    >
                      <span className="badge">{club.badge}</span>
                      <span className="name">{club.shortName}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="modal-footer">
            <button type="submit" className="btn btn-primary btn-block">
              <Play size={16} />
              <span>Enter Room Arena</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

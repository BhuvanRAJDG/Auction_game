import React, { useState } from 'react';
import { FOOTBALL_CLUBS } from '../data/teamsData';
import { Copy, Check, Share2, Play, Users, MessageSquare, Settings, Send } from 'lucide-react';

export default function RoomLobby({
  roomCode,
  isHost,
  myUserId,
  userName,
  selectedClub,
  setSelectedClub,
  managers,
  chatMessages,
  onSendMessage,
  onStartAuction,
  onChangeClub
}) {
  const [activeTab, setActiveTab] = useState('CHAT'); // 'PLAYERS' | 'CHAT' | 'SETTINGS'
  const [chatInput, setChatInput] = useState('');
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/?room=${roomCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onSendMessage(chatInput.trim());
    setChatInput('');
  };

  const handleClubSelect = (e) => {
    const club = FOOTBALL_CLUBS.find(c => c.id === e.target.value);
    if (club) {
      setSelectedClub(club);
      onChangeClub(club);
    }
  };

  return (
    <div className="room-lobby-container">
      
      {/* Top Header Bar */}
      <div className="lobby-top-bar">
        <div className="room-code-title">
          <span>Room:</span>
          <strong className="code">{roomCode}</strong>
        </div>

        {/* Start Auction Button (Host Only) */}
        {isHost ? (
          <button
            className="btn btn-orange btn-glow"
            onClick={onStartAuction}
          >
            <Play size={16} fill="currentColor" />
            <span>Start Auction</span>
          </button>
        ) : (
          <div className="waiting-host-badge">
            <span className="pulse-dot" />
            <span>Waiting for Host to start...</span>
          </div>
        )}
      </div>

      <div className="lobby-main-body">
        
        {/* Box 1: Invite Friends */}
        <div className="lobby-card invite-card">
          <div className="card-header">
            <Share2 size={16} className="icon-orange" />
            <h3>Invite Friends</h3>
          </div>

          <div className="invite-link-row">
            <input
              type="text"
              readOnly
              className="share-url-input"
              value={shareUrl}
            />
            <button className="btn btn-icon-square" onClick={handleCopyLink} title="Copy link">
              {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
            </button>
            <button className="btn btn-orange btn-share" onClick={handleCopyLink}>
              <Share2 size={14} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Box 2: Select Your Club */}
        <div className="lobby-card club-select-card">
          <div className="card-header">
            <Users size={16} className="icon-orange" />
            <h3>Select Your Club</h3>
            {selectedClub && (
              <span className="current-club-badge">
                {selectedClub.badge} {selectedClub.name}
              </span>
            )}
          </div>

          <select
            className="club-dropdown-input"
            value={selectedClub ? selectedClub.id : ''}
            onChange={handleClubSelect}
          >
            {FOOTBALL_CLUBS.map((club) => (
              <option key={club.id} value={club.id}>
                {club.name} {selectedClub?.id === club.id ? '(You)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Box 3: Tabbed Container (Players / Chat / Settings) */}
        <div className="lobby-card chat-players-card">
          
          <div className="lobby-tabs-header">
            <button
              className={`lobby-tab ${activeTab === 'PLAYERS' ? 'active' : ''}`}
              onClick={() => setActiveTab('PLAYERS')}
            >
              <Users size={14} />
              <span>Players</span>
              <span className="count-pill">{managers.length}/8</span>
            </button>

            <button
              className={`lobby-tab ${activeTab === 'CHAT' ? 'active' : ''}`}
              onClick={() => setActiveTab('CHAT')}
            >
              <MessageSquare size={14} />
              <span>Chat</span>
            </button>

            <button
              className={`lobby-tab ${activeTab === 'SETTINGS' ? 'active' : ''}`}
              onClick={() => setActiveTab('SETTINGS')}
            >
              <Settings size={14} />
              <span>Settings</span>
            </button>
          </div>

          <div className="lobby-tab-body">
            
            {/* Players List */}
            {activeTab === 'PLAYERS' && (
              <div className="players-lobby-list">
                {managers.map((mgr) => {
                  const isMe = mgr.id === myUserId;
                  return (
                    <div key={mgr.id} className={`player-lobby-row ${isMe ? 'me' : ''}`}>
                      <div className="player-left">
                        <span className="club-badge-icon">{mgr.badge || '⚽'}</span>
                        <div className="player-meta">
                          <strong className="player-name">
                            {mgr.userName} {isMe ? '(You)' : ''}
                          </strong>
                          <span className="club-name">{mgr.teamName}</span>
                        </div>
                      </div>
                      {mgr.id === managers[0]?.id && (
                        <span className="host-tag">👑 HOST</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Live Chat */}
            {activeTab === 'CHAT' && (
              <div className="chat-container">
                <div className="chat-messages-box">
                  {chatMessages.length === 0 ? (
                    <div className="chat-empty">
                      <span>No messages yet. Say hello to joined managers!</span>
                    </div>
                  ) : (
                    chatMessages.map((msg, idx) => (
                      <div key={idx} className={`chat-msg ${msg.isSystem ? 'system-msg' : ''}`}>
                        {!msg.isSystem && (
                          <span className="sender">{msg.sender}:</span>
                        )}
                        <span className="text">{msg.text}</span>
                        <span className="time">{msg.time}</span>
                      </div>
                    ))
                  )}
                </div>

                <form className="chat-input-form" onSubmit={handleChatSubmit}>
                  <input
                    type="text"
                    className="chat-text-input"
                    placeholder="Say something..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <button type="submit" className="chat-send-btn">
                    <Send size={14} />
                  </button>
                </form>
              </div>
            )}

            {/* Room Settings */}
            {activeTab === 'SETTINGS' && (
              <div className="settings-lobby-box">
                <div className="setting-row">
                  <span>Starting Transfer Budget</span>
                  <strong>£100M</strong>
                </div>
                <div className="setting-row">
                  <span>Max Squad Size</span>
                  <strong>11 Players</strong>
                </div>
                <div className="setting-row">
                  <span>Auction Player Deck</span>
                  <strong>150 Legends & Stars</strong>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

import React from 'react';
import { Pause, Play, Zap, Home } from 'lucide-react';

export default function Navbar({
  roomCode,
  managerCount = 0,
  isHost = false,
  isPaused = false,
  onTogglePause,
  onEndAuction,
  onOpenSim,
  onGoHome,
}) {
  if (!roomCode) return null;

  return (
    <nav className="game-top-navbar">
      <div className="top-nav-container">
        {/* Left */}
        <div className="top-left-group">
          <div className="room-code-tag">
            Room: <span className="code">{roomCode}</span>
          </div>
          <div className="online-count-badge">
            <span className="green-dot" />
            {managerCount} online
          </div>
        </div>

        {/* Right */}
        <div className="top-right-group">
          {isHost && (
            <>
              <button
                id="pause-resume-btn"
                className={`nav-action-btn pause-btn${isPaused ? ' paused' : ''}`}
                onClick={onTogglePause}
              >
                {isPaused ? <Play size={14} /> : <Pause size={14} />}
                {isPaused ? 'Resume' : 'Pause'}
              </button>

              <button
                id="end-auction-btn"
                className="nav-action-btn end-btn"
                onClick={onEndAuction}
              >
                🔨 Sell Now
              </button>
            </>
          )}

          {onOpenSim && (
            <button
              id="sim-btn"
              className="nav-action-btn sim-btn"
              onClick={onOpenSim}
            >
              <Zap size={14} />
              Simulate
            </button>
          )}

          <button
            id="go-home-btn"
            className="nav-action-btn icon-only-btn"
            onClick={onGoHome}
            title="Leave Room"
          >
            <Home size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}

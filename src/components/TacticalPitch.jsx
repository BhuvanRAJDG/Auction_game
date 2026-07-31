import React from 'react';
import { Shield, User } from 'lucide-react';

export default function TacticalPitch({ userTeam, squad, budget }) {
  const avgRating = squad.length > 0
    ? Math.round(squad.reduce((sum, p) => sum + p.rating, 0) / squad.length)
    : 0;

  return (
    <div className="squad-view-container">
      
      <div className="squad-header">
        <div className="team-info">
          <span className="badge-lg">{userTeam?.badge}</span>
          <div>
            <h2>{userTeam?.name} Squad Roster</h2>
            <p>{squad.length} Players Signed • £{budget}M Remaining Purse</p>
          </div>
        </div>

        <div className="ovr-card">
          <span className="lbl">SQUAD OVR</span>
          <strong className="val">{avgRating || '--'}</strong>
        </div>
      </div>

      {squad.length === 0 ? (
        <div className="empty-squad-box">
          <p>No players signed yet. Place bids in the auction arena to build your squad!</p>
        </div>
      ) : (
        <div className="squad-players-grid">
          {squad.map((player, idx) => (
            <div key={idx} className="signed-player-card">
              <div className="card-left">
                <span className="pos-badge">{player.pos}</span>
                <span className="rating-badge">{player.rating}</span>
              </div>
              <div className="card-right">
                <h4 className="name">{player.name}</h4>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

export default function PlayerCatalog({
  availablePlayers,
  currentLot,
  isHost,
  onNominatePlayer
}) {
  const [search, setSearch] = useState('');
  const [posFilter, setPosFilter] = useState('ALL');

  const filtered = availablePlayers.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    let matchesPos = true;
    if (posFilter === 'GK') matchesPos = p.pos === 'GK';
    else if (posFilter === 'DEF') matchesPos = p.pos.includes('CB') || p.pos.includes('LB') || p.pos.includes('RB');
    else if (posFilter === 'MID') matchesPos = p.pos.includes('CM') || p.pos.includes('CAM') || p.pos.includes('CDM');
    else if (posFilter === 'FWD') matchesPos = p.pos.includes('ST') || p.pos.includes('CF') || p.pos.includes('LW') || p.pos.includes('RW');

    return matchesSearch && matchesPos;
  });

  return (
    <div className="catalog-view-container">
      
      <div className="catalog-header-clean">
        <h3>PLAYER AUCTION DECK ({availablePlayers.length} AVAILABLE)</h3>
        
        <div className="catalog-controls">
          <div className="search-input">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search Totti, Del Piero, Zlatan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="pos-pills">
            {['ALL', 'GK', 'DEF', 'MID', 'FWD'].map((pos) => (
              <button
                key={pos}
                className={`pill ${posFilter === pos ? 'active' : ''}`}
                onClick={() => setPosFilter(pos)}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="simple-catalog-grid">
        {filtered.map((player) => {
          const isLive = currentLot && currentLot.id === player.id;
          return (
            <div key={player.id} className={`simple-player-card ${isLive ? 'live' : ''}`}>
              <div className="card-top">
                <span className="rating">{player.rating}</span>
                <span className="pos">{player.pos}</span>
              </div>
              <h4 className="name">{player.name}</h4>

              {isHost && (
                <button
                  className="btn btn-sm btn-secondary btn-block"
                  disabled={isLive}
                  onClick={() => onNominatePlayer(player)}
                >
                  {isLive ? 'CURRENT LOT' : 'PUT ON BLOCK'}
                </button>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

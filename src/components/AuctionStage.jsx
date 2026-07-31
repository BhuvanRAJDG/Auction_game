import React, { useState } from 'react';
import { AlignJustify, Send, Activity, Users, Settings, Hammer } from 'lucide-react';

const BID_INCREMENTS = [
  { label: '+£1M', amount: 1 },
  { label: '+£2M', amount: 2 },
  { label: '+£5M', amount: 5 },
  { label: '+£10M', amount: 10 },
  { label: '+£20M', amount: 20 },
];

export default function AuctionStage({
  currentLot,
  currentBid,
  highestBidder,
  timerSeconds,
  isPaused,
  userTeam,
  userBudget,
  userSquad = [],
  activityLogs = [],
  chatMessages = [],
  myUserId,
  managers = [],
  onPlaceBid,
  onSendMessage,
  onNominateNext,
}) {
  const [activeTab, setActiveTab] = useState('ACTIVITY');
  const [expandedManagerId, setExpandedManagerId] = useState(myUserId);
  const [bidIncrement, setBidIncrement] = useState(1);
  const [showIncrMenu, setShowIncrMenu] = useState(false);
  const [chatInput, setChatInput] = useState('');

  const maxTimer = 30;
  const progressPct = timerSeconds != null ? (timerSeconds / maxTimer) * 100 : 100;
  const isDanger = timerSeconds != null && timerSeconds <= 5;
  const nextBid = currentBid + bidIncrement;
  const canBid = !isPaused && !isHighestBidder && userBudget >= nextBid && currentLot;

  const handleBid = () => { if (canBid) onPlaceBid(nextBid); };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      onSendMessage(chatInput.trim());
      setChatInput('');
    }
  };

  if (!currentLot) {
    return (
      <div className="auction-stage-screen">
        <div className="arena-empty-box">
          <Hammer size={42} color="#f59e0b" />
          <h2 style={{ fontSize: '1.8rem' }}>All Players Sold!</h2>
          <p style={{ color: 'var(--text-muted)' }}>The auction has concluded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auction-stage-screen">

      {/* ─── LOT CARD (matches screenshot top card) ─── */}
      <div className="lot-bidding-card">
        {/* Progress bar at top */}
        <div className="card-top-progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Player info row + Timer */}
        <div className="card-content-grid">
          {/* Left: position badge, star rating, player name */}
          <div className="player-meta-left">
            <div className="badges-row">
              <span className="pos-badge-tag">{currentLot.position}</span>
              <span className="rating-star-tag">⭐{currentLot.rating}</span>
            </div>
            <div className="player-main-name">{currentLot.name}</div>
          </div>

          {/* Right: BASE price + Timer box */}
          <div className="price-timer-right">
            <div className="price-box">
              <span className="price-label">CURRENT BID</span>
              <div className="price-val">£{currentBid}M</div>
              {highestBidder && (
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {highestBidder.teamName}
                </div>
              )}
            </div>

            {/* Square amber/red timer */}
            <div className={`square-timer-box${isDanger ? ' danger' : ''}`}>
              <span className="timer-number">{timerSeconds ?? '—'}</span>
              <span className="timer-lbl">SEC</span>
            </div>
          </div>
        </div>

        {/* BID action row */}
        <div className="bidding-action-row">
          {/* Purse */}
          <div className="purse-indicator">
            💰 <span className="green-txt">£{userBudget}M</span>
          </div>

          {/* Big green BID button */}
          <button
            id="main-bid-btn"
            className={`giant-green-bid-btn${isHighestBidder ? ' is-highest' : ''}`}
            onClick={handleBid}
            disabled={!canBid}
          >
            {isPaused ? '⏸ PAUSED' : isHighestBidder ? `✓ HIGHEST — £${currentBid}M` : `BID £${nextBid}M`}
          </button>

          {/* Increment picker */}
          <div className="increment-menu-wrapper">
            <button
              className="icon-square-btn"
              onClick={() => setShowIncrMenu(v => !v)}
              title="Change bid increment"
            >
              <AlignJustify size={18} />
            </button>

            {showIncrMenu && (
              <div className="increment-dropdown">
                {BID_INCREMENTS.map(opt => (
                  <button
                    key={opt.amount}
                    className="inc-option-btn"
                    onClick={() => {
                      setBidIncrement(opt.amount);
                      setShowIncrMenu(false);
                    }}
                  >
                    {opt.label} {opt.amount === bidIncrement ? '✓' : ''}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── PROMO BANNER (optional, matches screenshot purple strip) ─── */}
      <div className="promo-banner-card">
        <span className="banner-icon">🏆</span>
        <div className="banner-text">
          <span className="live-badge">LIVE</span>
          <span style={{ fontWeight: 700 }}>Football Legends Auction</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Lot #{(currentLot?.id || 0) - 100} of 150
          </span>
        </div>
      </div>

      {/* ─── TABS: Activity | Squad | Community | Settings ─── */}
      <div className="activity-tabs-card">
        <div className="tabs-header-bar">
          <button
            className={`tab-item${activeTab === 'ACTIVITY' ? ' active' : ''}`}
            onClick={() => setActiveTab('ACTIVITY')}
          >
            <Activity size={14} />
            Activity
            <span className="count-badge">{activityLogs.length}</span>
          </button>

          <button
            className={`tab-item${activeTab === 'SQUAD' ? ' active' : ''}`}
            onClick={() => setActiveTab('SQUAD')}
          >
            <Users size={14} />
            My Squad
            <span className="count-badge">{userSquad.length}</span>
          </button>

          <button
            className={`tab-item${activeTab === 'COMMUNITY' ? ' active' : ''}`}
            onClick={() => setActiveTab('COMMUNITY')}
          >
            💬
            Chat
            <span className="count-badge">{chatMessages.length}</span>
          </button>

          <button
            className={`tab-item${activeTab === 'SETTINGS' ? ' active' : ''}`}
            onClick={() => setActiveTab('SETTINGS')}
          >
            <Settings size={14} />
            Info
          </button>
        </div>

        <div className="tabs-content-body">

          {/* ACTIVITY TAB */}
          {activeTab === 'ACTIVITY' && (
            <div className="activity-tab-content">
              <div className="logs-stream-box" id="logs-stream">
                {activityLogs.length === 0 ? (
                  <span className="empty-logs">Auction activity will appear here…</span>
                ) : (
                  [...activityLogs].reverse().map((log, i) => {
                    const icons = { START: '🚀', BID: '💰', SOLD: '🔨', JOIN: '👋', CLUB: '🛡️' };
                    return (
                      <div key={i} className={`log-row ${log.type}`}>
                        <span className="icon">{icons[log.type] || '•'}</span>
                        <span>{log.text}</span>
                        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--text-muted)', flexShrink: 0 }}>{log.time}</span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Chat input at bottom of activity feed */}
              <form className="chat-input-bar" onSubmit={handleSendChat}>
                <button type="button" className="gif-btn">GIF</button>
                <input
                  className="send-msg-input"
                  placeholder="Say something…"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                />
                <button type="submit" className="send-btn-plane">
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}

          {/* SQUAD TAB */}
          {activeTab === 'SQUAD' && (
            <div className="squad-tab-content" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {managers.map(m => {
                const isMe = m.id === myUserId;
                const isExpanded = expandedManagerId === m.id;
                const squadCount = m.squad ? m.squad.length : 0;
                
                // Group squad by position categories (FORWARD, MIDFIELDER, DEFENDER, GOALKEEPER)
                const getPositionCategory = (pos) => {
                  if (!pos) return 'OTHER';
                  const p = pos.toUpperCase();
                  if (p.includes('ST') || p.includes('CF') || p.includes('LW') || p.includes('RW')) return 'FORWARD';
                  if (p.includes('CM') || p.includes('CAM') || p.includes('CDM') || p.includes('LM') || p.includes('RM')) return 'MIDFIELDER';
                  if (p.includes('CB') || p.includes('LB') || p.includes('RB') || p.includes('RWB') || p.includes('LWB')) return 'DEFENDER';
                  if (p.includes('GK')) return 'GOALKEEPER';
                  return 'OTHER';
                };

                const groupedSquad = {};
                if (m.squad) {
                  m.squad.forEach(p => {
                    const cat = getPositionCategory(p.position);
                    if (!groupedSquad[cat]) groupedSquad[cat] = [];
                    groupedSquad[cat].push(p);
                  });
                }

                // Spent budget (starting budget is 1000)
                const spent = 1000 - m.budget;

                return (
                  <div 
                    key={m.id} 
                    className={`manager-squad-accordion-card ${isExpanded ? 'expanded' : ''}`} 
                    style={{ 
                      border: '1px solid #333', 
                      borderRadius: '8px', 
                      padding: '12px', 
                      background: '#111',
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    <div 
                      onClick={() => setExpandedManagerId(isExpanded ? null : m.id)}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }}></span>
                        <span style={{ fontWeight: 800 }}>{m.userName}</span>
                        {isMe && <span style={{ background: '#555', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>YOU</span>}
                      </div>
                      <span style={{ fontSize: '0.9rem', color: '#888' }}>{squadCount} players</span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '4px' }}>
                      <span>{m.badge || '🛡️'} {m.teamName || 'Unknown Team'}</span>
                    </div>

                    {isExpanded && (
                      <div style={{ marginTop: '12px', borderTop: '1px solid #222', paddingTop: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.85rem' }}>
                          <span style={{ color: '#aaa' }}>Purse: <strong style={{ color: '#4CAF50' }}>£{m.budget}M</strong></span>
                          <span style={{ color: '#aaa' }}>Spent: <strong style={{ color: '#FF9800' }}>£{spent}M</strong></span>
                        </div>

                        <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px', color: '#4CAF50' }}>Bought ({squadCount})</div>

                        {squadCount === 0 ? (
                          <p style={{ fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>No players signed yet.</p>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {Object.keys(groupedSquad).map(cat => (
                              <div key={cat}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888', marginBottom: '4px' }}>{cat} ({groupedSquad[cat].length})</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  {groupedSquad[cat].map(p => (
                                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1c1c1c', padding: '6px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>⭐{p.rating}</span>
                                        <span>{p.name}</span>
                                      </div>
                                      <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>£{p.boughtPrice || p.basePrice || 0}M</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* COMMUNITY CHAT TAB */}
          {activeTab === 'COMMUNITY' && (
            <div className="activity-tab-content">
              <div className="logs-stream-box">
                {chatMessages.length === 0 ? (
                  <span className="empty-logs">No chat messages yet…</span>
                ) : (
                  chatMessages.map((msg, i) => (
                    <div key={i} className={`chat-msg${msg.isSystem ? ' system-msg' : ''}`}>
                      {!msg.isSystem && <span className="sender">{msg.sender}</span>}
                      <span>{msg.text}</span>
                      <span className="time">{msg.time}</span>
                    </div>
                  ))
                )}
              </div>

              <form className="chat-input-bar" onSubmit={handleSendChat}>
                <button type="button" className="gif-btn">GIF</button>
                <input
                  className="send-msg-input"
                  placeholder="Type message…"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                />
                <button type="submit" className="send-btn-plane">
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}

          {/* INFO / SETTINGS TAB */}
          {activeTab === 'SETTINGS' && (
            <div className="settings-tab-content">
              <div className="setting-info-row">
                <span>Current Player</span>
                <span style={{ fontWeight: 800 }}>{currentLot.name}</span>
              </div>
              <div className="setting-info-row">
                <span>Position</span>
                <span>{currentLot.position}</span>
              </div>
              <div className="setting-info-row">
                <span>Rating</span>
                <span style={{ color: 'var(--accent-gold)', fontWeight: 800 }}>{currentLot.rating}</span>
              </div>
              <div className="setting-info-row">
                <span>Current Bid</span>
                <span style={{ color: 'var(--accent-green)' }}>£{currentBid}M</span>
              </div>
              <div className="setting-info-row">
                <span>Highest Bidder</span>
                <span>{highestBidder?.teamName || '—'}</span>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

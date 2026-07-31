import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, Play, Shield, Award, Flame } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

export default function TournamentSimulator({
  isOpen,
  onClose,
  userClub,
  userSquad,
  allManagers
}) {
  const [stage, setStage] = useState('LOBBY'); // 'LOBBY' | 'SIMULATING' | 'RESULTS'
  const [matchLogs, setMatchLogs] = useState([]);
  const [tournamentResults, setTournamentResults] = useState(null);

  if (!isOpen) return null;

  const handleStartTournament = () => {
    setStage('SIMULATING');
    setMatchLogs([]);

    audioSystem.playCheer();

    // Prepare manager squads and total power scores
    const teams = allManagers.map(mgr => {
      const isUser = mgr.id === 'user';
      const squad = isUser ? userSquad : mgr.squad || [];
      const avgOvr = squad.length > 0 ? Math.round(squad.reduce((s, p) => s + p.rating, 0) / squad.length) : 85;
      return {
        id: mgr.id,
        name: mgr.name,
        badge: mgr.badge,
        squad,
        powerScore: avgOvr + squad.length * 2
      };
    });

    // Simulate Semi-Finals
    const sem1 = simulateMatch(teams[0], teams[1]);
    const sem2 = simulateMatch(teams[2], teams[3]);

    const winner1 = sem1.scoreA > sem1.scoreB ? sem1.teamA : sem1.teamB;
    const winner2 = sem2.scoreA > sem2.scoreB ? sem2.teamA : sem2.teamB;

    const finalMatch = simulateMatch(winner1, winner2);
    const champion = finalMatch.scoreA > finalMatch.scoreB ? finalMatch.teamA : finalMatch.teamB;

    setTimeout(() => {
      setTournamentResults({
        sem1,
        sem2,
        finalMatch,
        champion
      });
      setStage('RESULTS');

      // Trigger Confetti!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card tournament-modal">
        
        <div className="modal-header">
          <div className="modal-title-group">
            <Trophy size={28} color="#f59e0b" />
            <div>
              <h2>LEGEND CUP CHAMPIONSHIP</h2>
              <p>Simulate matches between drafted auction squads</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          
          {stage === 'LOBBY' && (
            <div className="tournament-lobby">
              <div className="trophy-hero-box">
                <Trophy size={64} className="gold-glow-icon" />
                <h3>Ready to Kickoff the Legend Cup?</h3>
                <p>Compare squad ratings, evaluate tactical chemistry, and crown the ultimate auction champion!</p>
              </div>

              <div className="squad-power-ranking">
                <h4>SQUAD POWER RANKINGS</h4>
                <div className="power-ranking-list">
                  {allManagers.map((mgr) => {
                    const isUser = mgr.id === 'user';
                    const squad = isUser ? userSquad : mgr.squad || [];
                    const avgOvr = squad.length > 0 ? Math.round(squad.reduce((s, p) => s + p.rating, 0) / squad.length) : 85;

                    return (
                      <div key={mgr.id} className="power-row">
                        <span className="badge">{mgr.badge}</span>
                        <span className="name">{mgr.name}</span>
                        <span className="squad-count">{squad.length} Players</span>
                        <span className="ovr-rating">{avgOvr} OVR</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {stage === 'SIMULATING' && (
            <div className="simulating-box">
              <Sparkles size={48} className="spin-icon gold-text" />
              <h3>Simulating High-Stakes Matches...</h3>
              <p>Pelé, Zidane & Cruyff are clashing on the pitch!</p>
            </div>
          )}

          {stage === 'RESULTS' && tournamentResults && (
            <div className="tournament-results">
              
              {/* Champion Celebration Banner */}
              <div className="champion-banner">
                <Trophy size={48} color="#f59e0b" />
                <div>
                  <span className="champ-label">LEGEND CUP CHAMPION</span>
                  <h3 className="champ-name">{tournamentResults.champion.badge} {tournamentResults.champion.name}</h3>
                </div>
              </div>

              {/* Match Fixture Cards */}
              <div className="fixtures-grid">
                
                <div className="fixture-card">
                  <h4>SEMI FINAL 1</h4>
                  <div className="match-score">
                    <span>{tournamentResults.sem1.teamA.badge} {tournamentResults.sem1.teamA.name}</span>
                    <strong className="score">{tournamentResults.sem1.scoreA} - {tournamentResults.sem1.scoreB}</strong>
                    <span>{tournamentResults.sem1.teamB.badge} {tournamentResults.sem1.teamB.name}</span>
                  </div>
                  <div className="scorers-list">
                    {tournamentResults.sem1.scorers.map((s, i) => (
                      <span key={i}>⚽ {s}</span>
                    ))}
                  </div>
                </div>

                <div className="fixture-card">
                  <h4>SEMI FINAL 2</h4>
                  <div className="match-score">
                    <span>{tournamentResults.sem2.teamA.badge} {tournamentResults.sem2.teamA.name}</span>
                    <strong className="score">{tournamentResults.sem2.scoreA} - {tournamentResults.sem2.scoreB}</strong>
                    <span>{tournamentResults.sem2.teamB.badge} {tournamentResults.sem2.teamB.name}</span>
                  </div>
                  <div className="scorers-list">
                    {tournamentResults.sem2.scorers.map((s, i) => (
                      <span key={i}>⚽ {s}</span>
                    ))}
                  </div>
                </div>

                <div className="fixture-card final-fixture">
                  <h4>GRAND FINAL</h4>
                  <div className="match-score">
                    <span>{tournamentResults.finalMatch.teamA.badge} {tournamentResults.finalMatch.teamA.name}</span>
                    <strong className="score gold-text">{tournamentResults.finalMatch.scoreA} - {tournamentResults.finalMatch.scoreB}</strong>
                    <span>{tournamentResults.finalMatch.teamB.badge} {tournamentResults.finalMatch.teamB.name}</span>
                  </div>
                  <div className="scorers-list">
                    {tournamentResults.finalMatch.scorers.map((s, i) => (
                      <span key={i}>⚽ {s}</span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="modal-footer">
          {stage === 'LOBBY' && (
            <button className="btn btn-primary btn-glow btn-block" onClick={handleStartTournament}>
              <Play size={18} />
              <span>Simulate Legend Cup</span>
            </button>
          )}

          {stage === 'RESULTS' && (
            <button className="btn btn-secondary btn-block" onClick={onClose}>
              Close & Return to Arena
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

function simulateMatch(teamA, teamB) {
  const diff = teamA.powerScore - teamB.powerScore;
  let baseA = 1 + Math.floor(Math.random() * 3);
  let baseB = Math.floor(Math.random() * 3);

  if (diff > 5) baseA += 1;
  else if (diff < -5) baseB += 1;

  if (baseA === baseB) {
    if (Math.random() > 0.5) baseA += 1;
    else baseB += 1;
  }

  const scorers = [];
  const pickScorer = (team) => {
    if (team.squad && team.squad.length > 0) {
      const p = team.squad[Math.floor(Math.random() * team.squad.length)];
      return `${p.name} (${Math.floor(Math.random() * 80 + 10)}')`;
    }
    return `Legend Star (${Math.floor(Math.random() * 80 + 10)}')`;
  };

  for (let i = 0; i < baseA; i++) scorers.push(`${teamA.name}: ${pickScorer(teamA)}`);
  for (let i = 0; i < baseB; i++) scorers.push(`${teamB.name}: ${pickScorer(teamB)}`);

  return {
    teamA,
    teamB,
    scoreA: baseA,
    scoreB: baseB,
    scorers
  };
}

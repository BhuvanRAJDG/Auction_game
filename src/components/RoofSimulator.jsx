import React, { useState } from 'react';
import { Home, Layers, Compass, BatteryCharging, ShieldAlert, Sparkles, CheckCircle2, Sliders } from 'lucide-react';

export default function RoofSimulator({ onOpenQuoteModalWithData }) {
  const [roofType, setRoofType] = useState('Tile');
  const [orientation, setOrientation] = useState('South');
  const [panelCount, setPanelCount] = useState(16);
  const [includeBattery, setIncludeBattery] = useState(true);

  // Roof types mapping
  const roofStyles = {
    Tile: { name: 'Spanish / Concrete Tile', color: '#B45309', pattern: 'repeat(6, 1fr)', factor: 1.0 },
    Metal: { name: 'Standing Seam Metal', color: '#334155', pattern: 'repeat(6, 1fr)', factor: 1.05 },
    Flat: { name: 'Commercial Flat TPO', color: '#475569', pattern: 'repeat(6, 1fr)', factor: 0.98 },
    Shingle: { name: 'Architectural Asphalt', color: '#1E293B', pattern: 'repeat(6, 1fr)', factor: 1.0 }
  };

  const orientationFactors = {
    South: { label: 'South (Optimal)', efficiency: 100 },
    West: { label: 'West (Evening Peak)', efficiency: 88 },
    East: { label: 'East (Morning Sun)', efficiency: 84 },
    North: { label: 'North (Sub-optimal)', efficiency: 62 }
  };

  const panelWatts = 450; // High-efficiency N-Type panel
  const totalCapacityKw = Math.round(((panelCount * panelWatts) / 1000) * 10) / 10;
  const efficiencyScore = Math.round(orientationFactors[orientation].efficiency * roofStyles[roofType].factor);
  const estAnnualKwh = Math.round(totalCapacityKw * 1450 * (efficiencyScore / 100));

  return (
    <section id="simulator" style={{ padding: '5rem 1.5rem', background: 'rgba(255, 255, 255, 0.015)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
          <div className="badge badge-eco" style={{ marginBottom: '0.75rem' }}>
            <Home size={14} /> Interactive Rooftop Configurator
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            Design Your <span className="gradient-text-eco">Custom Rooftop Array</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Simulate your rooftop layout, select your roof material, adjust orientation, and add energy storage to see real-time performance output.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Controls Panel */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sliders size={20} style={{ color: 'var(--accent-eco)' }} />
              Array Configuration
            </h3>

            {/* 1. Roof Material Type */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                1. Select Roof Material
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {Object.keys(roofStyles).map((typeKey) => (
                  <button
                    key={typeKey}
                    onClick={() => setRoofType(typeKey)}
                    style={{
                      padding: '0.65rem',
                      background: roofType === typeKey ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-dark)',
                      border: roofType === typeKey ? '1px solid var(--accent-eco)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      color: roofType === typeKey ? 'var(--accent-eco)' : 'var(--text-main)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {roofStyles[typeKey].name}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Orientation */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                2. Roof Orientation & Sun Exposure
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {Object.keys(orientationFactors).map((dirKey) => (
                  <button
                    key={dirKey}
                    onClick={() => setOrientation(dirKey)}
                    style={{
                      padding: '0.65rem',
                      background: orientation === dirKey ? 'rgba(255, 153, 0, 0.15)' : 'var(--bg-dark)',
                      border: orientation === dirKey ? '1px solid var(--primary-solar)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      color: orientation === dirKey ? 'var(--primary-solar)' : 'var(--text-main)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {orientationFactors[dirKey].label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Panel Count Slider */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  3. Total Solar Panels ({panelWatts}W TOPCon)
                </label>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-solar)' }}>
                  {panelCount} Panels ({totalCapacityKw} kW)
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="36"
                step="2"
                value={panelCount}
                onChange={(e) => setPanelCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary-solar)', cursor: 'pointer' }}
              />
            </div>

            {/* 4. Battery Storage Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              background: 'var(--bg-dark)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <BatteryCharging size={22} style={{ color: 'var(--accent-cyan)' }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Add Tesla Powerwall Storage</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>13.5 kWh Smart Battery Backup</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={includeBattery}
                onChange={(e) => setIncludeBattery(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
              />
            </div>

          </div>

          {/* Roof Visualizer Display Area */}
          <div className="glass-panel" style={{ padding: '2rem', background: 'linear-gradient(160deg, var(--bg-card) 0%, #0F172A 100%)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>ROOFTOP PREVIEW</span>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{roofStyles[roofType].name}</h4>
              </div>
              <div className="badge badge-eco" style={{ fontSize: '0.85rem' }}>
                {efficiencyScore}% Sun Absorption Score
              </div>
            </div>

            {/* Animated Roof Perspective Container */}
            <div style={{
              background: roofStyles[roofType].color,
              borderRadius: 'var(--radius-md)',
              padding: '2rem 1.5rem',
              position: 'relative',
              boxShadow: 'inset 0 0 50px rgba(0,0,0,0.6)',
              border: '2px solid rgba(255,255,255,0.1)',
              marginBottom: '1.5rem',
              minHeight: '230px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              
              {/* Roof Ridge Line graphic */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: 'rgba(255,255,255,0.2)'
              }} />

              {/* Dynamic Panels Array Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(42px, 1fr))',
                gap: '8px',
                maxHeight: '200px',
                overflow: 'hidden'
              }}>
                {Array.from({ length: panelCount }).map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      height: '38px',
                      background: 'linear-gradient(135deg, #0284C7 0%, #0F172A 100%)',
                      border: '1px solid #38BDF8',
                      borderRadius: '3px',
                      boxShadow: '0 0 8px rgba(56, 189, 248, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div style={{ width: '4px', height: '4px', background: '#38BDF8', borderRadius: '50%' }} />
                  </div>
                ))}
              </div>

              {/* Battery Badge graphic overlay */}
              {includeBattery && (
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid var(--accent-cyan)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  color: 'var(--accent-cyan)',
                  fontWeight: 700
                }}>
                  <BatteryCharging size={14} /> Tesla Powerwall Connected
                </div>
              )}
            </div>

            {/* Live Spec Performance Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--bg-dark)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>System Capacity</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-solar)' }}>{totalCapacityKw} kW</div>
              </div>
              <div style={{ background: 'var(--bg-dark)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Est. Annual Output</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-eco)' }}>{estAnnualKwh.toLocaleString()} kWh</div>
              </div>
              <div style={{ background: 'var(--bg-dark)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Roof Area Needed</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{panelCount * 18} sq.ft</div>
              </div>
            </div>

            {/* Launch Quote Button */}
            <button 
              onClick={() => onOpenQuoteModalWithData({ roofType, panelCount, systemSizeKw: totalCapacityKw, includeBattery })} 
              className="btn-eco" 
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Sparkles size={18} /> Request Custom Engineering Proposal
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { LIVE_HOURLY_ENERGY_DATA } from '../../data/initialData';
import { Sun, BatteryCharging, Zap, ShieldCheck, TreePine, ArrowUpRight, Wrench, CheckCircle, Flame } from 'lucide-react';

export default function CustomerPortal() {
  const [selectedHourIndex, setSelectedHourIndex] = useState(3); // 12:00 PM default
  const [serviceRequested, setServiceRequested] = useState(false);

  const currentPoint = LIVE_HOURLY_ENERGY_DATA[selectedHourIndex];

  return (
    <div>
      
      {/* Real-time Metric Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        
        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--primary-solar)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Solar Generation</span>
            <Sun size={20} style={{ color: 'var(--primary-solar)' }} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-solar)' }}>
            {currentPoint.solarGen} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>kW</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-eco)', marginTop: '0.25rem' }}>
            ↑ 12% above daily target
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-cyan)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Home Power Usage</span>
            <Zap size={20} style={{ color: 'var(--accent-cyan)' }} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
            {currentPoint.consumption} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>kW</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            HVAC & Appliances active
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #10B981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tesla Battery Status</span>
            <BatteryCharging size={20} style={{ color: '#10B981' }} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10B981' }}>
            {currentPoint.batteryCharge}% <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Charged</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '0.25rem' }}>
            Full backup power active
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #F59E0B' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Net Grid Feed-In</span>
            <ArrowUpRight size={20} style={{ color: '#F59E0B' }} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F59E0B' }}>
            +{currentPoint.gridExport} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>kW</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-eco)', marginTop: '0.25rem' }}>
            Earning $0.14/kWh grid credit
          </div>
        </div>

      </div>

      {/* Hourly Energy Flow SVG Graph */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Hourly Solar Generation Curve</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Click on any hour node to inspect power allocation metrics</p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: '12px', height: '12px', background: 'var(--primary-solar)', borderRadius: '2px' }} />
              <span>Solar Production (kW)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: '12px', height: '12px', background: 'var(--accent-cyan)', borderRadius: '2px' }} />
              <span>Home Consumption (kW)</span>
            </div>
          </div>
        </div>

        {/* Bar Graph Simulation */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '200px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
          {LIVE_HOURLY_ENERGY_DATA.map((item, idx) => {
            const isSelected = selectedHourIndex === idx;
            const solarHeight = (item.solarGen / 10) * 180;
            const consHeight = (item.consumption / 10) * 180;

            return (
              <div
                key={item.hour}
                onClick={() => setSelectedHourIndex(idx)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: 'var(--radius-sm)',
                  background: isSelected ? 'rgba(255, 153, 0, 0.12)' : 'transparent',
                  transition: 'var(--transition-fast)'
                }}
              >
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '4px', height: '180px', alignItems: 'flex-end' }}>
                  {/* Solar bar */}
                  <div
                    style={{
                      width: '45%',
                      height: `${Math.max(8, solarHeight)}px`,
                      background: isSelected ? 'var(--primary-solar)' : 'rgba(255, 153, 0, 0.65)',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.3s ease'
                    }}
                  />
                  {/* Consumption bar */}
                  <div
                    style={{
                      width: '45%',
                      height: `${Math.max(8, consHeight)}px`,
                      background: isSelected ? 'var(--accent-cyan)' : 'rgba(6, 182, 212, 0.5)',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.3s ease'
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', marginTop: '0.5rem', fontWeight: isSelected ? 700 : 400, color: isSelected ? 'var(--primary-solar)' : 'var(--text-muted)' }}>
                  {item.hour}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Col Info: Telemetry & Impact */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* System Telemetry */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} style={{ color: 'var(--accent-eco)' }} />
            System Health & Telemetry
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Solar Inverter</span>
              <span style={{ color: 'var(--accent-eco)', fontWeight: 700 }}>● Online (SolarEdge 10kW)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Panel Efficiency Rating</span>
              <span style={{ fontWeight: 700 }}>99.2% Nominal Output</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Grid Synchronization</span>
              <span style={{ fontWeight: 700 }}>60.0 Hz Locked</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Warranty Coverage</span>
              <span style={{ color: 'var(--primary-solar)', fontWeight: 700 }}>24 Years Remaining</span>
            </div>
          </div>

          {!serviceRequested ? (
            <button
              onClick={() => setServiceRequested(true)}
              className="btn-secondary"
              style={{ width: '100%', marginTop: '1.25rem', justifyContent: 'center', fontSize: '0.85rem' }}
            >
              <Wrench size={16} /> Request Annual Panel Cleaning
            </button>
          ) : (
            <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-eco)', fontSize: '0.85rem', textAlign: 'center', fontWeight: 600 }}>
              ✓ Maintenance cleaning requested for August 2026.
            </div>
          )}
        </div>

        {/* Environmental Impact Counter */}
        <div className="glass-panel" style={{ padding: '1.75rem', background: 'linear-gradient(145deg, var(--bg-card) 0%, rgba(16, 185, 129, 0.08) 100%)' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TreePine size={20} style={{ color: 'var(--accent-eco)' }} />
            Lifetime Carbon Offsets
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Metric Tons CO2 Offset</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-eco)' }}>18.4 Tons</div>
            </div>
            <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tree Equivalent</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-solar)' }}>460 Trees</div>
            </div>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Your 10.8 kW array has generated <strong>21,400 kWh</strong> of zero-carbon solar energy since grid interconnect.
          </div>
        </div>

      </div>

    </div>
  );
}

import React from 'react';
import { DollarSign, TrendingUp, Zap, PieChart, Users, Award } from 'lucide-react';

export default function AdminAnalytics() {
  return (
    <div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Business Performance & Capacity Analytics</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Quarterly installed MW capacity, proposal conversion rates, and revenue pipeline</p>
      </div>

      {/* Metric Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gross Pipeline Value</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-solar)', marginTop: '0.2rem' }}>
            $187,600
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-eco)', marginTop: '0.35rem' }}>
            ↑ 24% vs previous quarter
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Installed Capacity (Q3 2026)</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-eco)', marginTop: '0.2rem' }}>
            1.42 MW
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-eco)', marginTop: '0.35rem' }}>
            142 Residential & Commercial arrays
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Proposal Conversion Rate</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>
            64.2%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Industry avg: 42%
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Battery Storage Attach Rate</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F59E0B', marginTop: '0.2rem' }}>
            78.5%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#F59E0B', marginTop: '0.35rem' }}>
            Tesla Powerwall & Enphase
          </div>
        </div>

      </div>

      {/* Visual Revenue Breakdown */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>System Tier Installation Distribution</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
              <span>Residential Pro + Tesla Storage (10.8 kW)</span>
              <span style={{ fontWeight: 700, color: 'var(--primary-solar)' }}>58% (82 Installations)</span>
            </div>
            <div style={{ width: '100%', height: '12px', background: 'var(--bg-dark)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: '58%', height: '100%', background: 'var(--primary-solar)' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
              <span>Residential Starter (5.4 kW)</span>
              <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>27% (38 Installations)</span>
            </div>
            <div style={{ width: '100%', height: '12px', background: 'var(--bg-dark)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: '27%', height: '100%', background: 'var(--accent-cyan)' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
              <span>Commercial Max Grid (50+ kW)</span>
              <span style={{ fontWeight: 700, color: 'var(--accent-eco)' }}>15% (22 Installations)</span>
            </div>
            <div style={{ width: '100%', height: '12px', background: 'var(--bg-dark)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: '15%', height: '100%', background: 'var(--accent-eco)' }} />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

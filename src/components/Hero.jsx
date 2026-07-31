import React from 'react';
import { ArrowRight, Calculator, ShieldCheck, Sun, Zap, TrendingDown, Sparkles } from 'lucide-react';

export default function Hero({ onOpenQuoteModal, onScrollToCalc }) {
  return (
    <section style={{
      position: 'relative',
      padding: '4rem 1.5rem 6rem 1.5rem',
      overflow: 'hidden'
    }}>
      {/* Background Solar Glow Effect */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '650px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(255, 153, 0, 0.22) 0%, rgba(245, 158, 11, 0.08) 50%, rgba(0, 0, 0, 0) 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Hero Left Content */}
          <div>
            <div className="badge badge-solar pulse-solar" style={{ marginBottom: '1.25rem' }}>
              <Sparkles size={14} /> Next-Gen Solar Technology 2026
            </div>
            
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '1.25rem'
            }}>
              Power Your Future With <br />
              <span className="gradient-text-solar">Zero Electric Bills</span>
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              marginBottom: '2rem',
              maxWidth: '580px',
              lineHeight: 1.6
            }}>
              Switch to premium rooftop solar & intelligent battery storage. Lower your monthly utility costs by up to 95% while earning net-metering cash credits with 25-year performance guarantee.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <button onClick={onOpenQuoteModal} className="btn-primary" style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}>
                <Zap size={18} />
                Get Instant Quote & ROI
                <ArrowRight size={18} />
              </button>
              
              <button onClick={onScrollToCalc} className="btn-secondary" style={{ fontSize: '1rem', padding: '0.85rem 1.75rem' }}>
                <Calculator size={18} style={{ color: 'var(--primary-solar)' }} />
                Solar Savings Calculator
              </button>
            </div>

            {/* Trust Badges */}
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={20} style={{ color: 'var(--accent-eco)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  25-Year Performance Warranty
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingDown size={20} style={{ color: 'var(--primary-solar)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  30% Federal Solar Credit Eligible
                </span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Interactive Card */}
          <div className="glass-panel float-slow" style={{
            padding: '1.75rem',
            position: 'relative',
            background: 'linear-gradient(145deg, rgba(18, 24, 38, 0.85) 0%, rgba(26, 36, 56, 0.9) 100%)',
            border: '1px solid var(--border-active)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
          }}>
            {/* Header pill */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-eco)' }}>
                  LIVE ROOFTOP SIMULATION
                </span>
              </div>
              <span className="badge badge-solar">10.8 kW System</span>
            </div>

            {/* Visual Solar Array Grid Graphic */}
            <div style={{
              background: '#0B0F19',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rooftop Panel Layout (24 Units)</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary-solar)', fontWeight: 700 }}>Peak Sun 98% Efficiency</span>
              </div>
              
              {/* Solar Cells Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '6px'
              }}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} style={{
                    height: '28px',
                    borderRadius: '3px',
                    background: i % 5 === 0 
                      ? 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)' 
                      : 'linear-gradient(135deg, #FF9900 0%, #D97706 100%)',
                    boxShadow: i % 5 === 0 ? 'none' : '0 0 8px rgba(255, 153, 0, 0.4)',
                    opacity: i % 5 === 0 ? 0.4 : 0.9,
                    border: '1px solid rgba(255,255,255,0.1)'
                  }} />
                ))}
              </div>
            </div>

            {/* Live Metrics Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current Generation</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-solar)' }}>
                  8.4 <span style={{ fontSize: '0.85rem' }}>kW/h</span>
                </div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Monthly Savings</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-eco)' }}>
                  $315 <span style={{ fontSize: '0.85rem' }}>/mo</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Stats Ticker */}
        <div className="glass-panel" style={{
          marginTop: '4rem',
          padding: '1.5rem 2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-solar)' }}>42.8 MW+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Clean Power Installed</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-eco)' }}>12,400+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Homes & Businesses Powered</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>95.4%</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Average Electric Bill Savings</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>4.9 ★★★★★</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Customer Rating (1,800+ Reviews)</div>
          </div>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { SOLAR_PACKAGES } from '../data/initialData';
import { Check, ShieldCheck, Zap, Star, ArrowRight } from 'lucide-react';

export default function Packages({ onSelectPackage }) {
  return (
    <section id="packages" style={{ padding: '5rem 1.5rem' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-solar" style={{ marginBottom: '0.75rem' }}>
            <Zap size={14} /> Turnkey Solar Energy Systems
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            Choose Your <span className="gradient-text-solar">Solar Energy Package</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            All systems include professional engineering, city permitting, 25-year panel performance warranties, and 24/7 mobile monitoring.
          </p>
        </div>

        {/* Tier Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
          {SOLAR_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="glass-card"
              style={{
                padding: '2.25rem 1.75rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderColor: pkg.popular ? 'var(--primary-solar)' : 'var(--border-subtle)',
                background: pkg.popular ? 'linear-gradient(170deg, var(--bg-card) 0%, rgba(255, 153, 0, 0.08) 100%)' : 'var(--bg-card)',
                boxShadow: pkg.popular ? '0 10px 40px rgba(255, 153, 0, 0.2)' : 'none'
              }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #FF9900 0%, #F59E0B 100%)',
                  color: '#000',
                  padding: '0.3rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  boxShadow: '0 4px 15px rgba(255, 153, 0, 0.4)'
                }}>
                  <Star size={14} style={{ fill: '#000' }} /> MOST POPULAR FOR HOMES
                </div>
              )}

              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.3rem' }}>{pkg.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{pkg.idealFor}</p>

                {/* Price Display */}
                <div style={{ padding: '1.25rem', background: 'var(--bg-dark)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary-solar)' }}>{pkg.afterIncentives}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>{pkg.price}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-eco)', fontWeight: 700, marginTop: '0.25rem' }}>
                    After 30% Federal ITC Tax Savings
                  </div>
                </div>

                {/* System Specs List */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.88rem' }}>
                    <Check size={18} style={{ color: 'var(--primary-solar)', flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>System Capacity:</strong> {pkg.capacity} ({pkg.outputPerYear}/yr)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.88rem' }}>
                    <Check size={18} style={{ color: 'var(--primary-solar)', flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Solar Panels:</strong> {pkg.specs.panels}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.88rem' }}>
                    <Check size={18} style={{ color: 'var(--primary-solar)', flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Inverter System:</strong> {pkg.specs.inverter}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.88rem' }}>
                    <Check size={18} style={{ color: 'var(--accent-eco)', flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Battery Storage:</strong> {pkg.specs.battery}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.88rem' }}>
                    <Check size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Warranty Protection:</strong> {pkg.specs.warranty}</span>
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPackage(pkg)}
                className={pkg.popular ? "btn-primary" : "btn-secondary"}
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}
              >
                Select {pkg.name}
                <ArrowRight size={16} />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

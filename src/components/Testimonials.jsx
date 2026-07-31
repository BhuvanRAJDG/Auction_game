import React from 'react';
import { TESTIMONIALS } from '../data/initialData';
import { Star, Quote, ArrowDownRight, Award } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '5rem 1.5rem', background: 'rgba(255, 153, 0, 0.015)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-solar" style={{ marginBottom: '0.75rem' }}>
            <Award size={14} /> Verified Solar Transformations
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            Real Homes. <span className="gradient-text-solar">Real Utility Bill Savings.</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            See how our homeowners and business clients eliminated high monthly utility charges.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Rating Stars */}
                <div style={{ display: 'flex', gap: '3px', color: '#F59E0B', marginBottom: '1rem' }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} style={{ fill: '#F59E0B' }} />
                  ))}
                </div>

                <p style={{ fontStyle: 'italic', color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  "{t.quote}"
                </p>
              </div>

              <div>
                {/* Before vs After Bill Box */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--bg-dark)',
                  padding: '0.85rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '1.25rem'
                }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PREVIOUS BILL</span>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#EF4444', textDecoration: 'line-through' }}>
                      {t.beforeBill}
                    </div>
                  </div>

                  <ArrowDownRight size={22} style={{ color: 'var(--accent-eco)' }} />

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>AFTER HELIORAY</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-eco)' }}>
                      {t.afterBill}
                    </div>
                  </div>
                </div>

                {/* Profile Header */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.role} • {t.location}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

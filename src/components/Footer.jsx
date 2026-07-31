import React from 'react';
import { SunMedium, ShieldCheck, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export default function Footer({ setActiveView }) {
  return (
    <footer style={{
      background: '#060911',
      borderTop: '1px solid var(--border-subtle)',
      padding: '4rem 1.5rem 2rem 1.5rem',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF9900 0%, #F59E0B 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000'
              }}>
                <SunMedium size={20} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                HELIORAY<span style={{ color: 'var(--primary-solar)' }}>.SOLAR</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Pioneering tier-1 rooftop solar energy solutions, intelligent battery backup storage, and commercial solar microgrids.
            </p>
            <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={14} /> (800) 555-SOLAR</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={14} /> contact@helioray.solar</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={14} /> 500 Energy Way, Austin TX</div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Solutions</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <li><a href="#calculator" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Solar ROI Sizing Tool</a></li>
              <li><a href="#simulator" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Visual Rooftop Designer</a></li>
              <li><a href="#packages" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Residential Solar (5-12 kW)</a></li>
              <li><a href="#packages" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Commercial Solar (50+ kW)</a></li>
              <li><a href="#packages" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Tesla Powerwall Battery</a></li>
            </ul>
          </div>

          {/* Col 3: Portal & Support */}
          <div>
            <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Portals</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <li>
                <button 
                  onClick={() => setActiveView('dashboard')}
                  style={{ background: 'none', border: 'none', color: 'var(--primary-solar)', cursor: 'pointer', padding: 0, fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  Customer Energy Portal <ExternalLink size={12} />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveView('dashboard')}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-eco)', cursor: 'pointer', padding: 0, fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  Installer Operations CRM <ExternalLink size={12} />
                </button>
              </li>
              <li><span style={{ color: 'var(--text-muted)' }}>Warranty Registration</span></li>
              <li><span style={{ color: 'var(--text-muted)' }}>Net Metering Guide 2026</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.5rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>© 2026 HelioRay Clean Energy Inc. All Rights Reserved. NABCEP Certified Installers.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>License #CSL-984211</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

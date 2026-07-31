import React, { useState } from 'react';
import { Search, Filter, Plus, ChevronRight, Phone, Mail, MapPin, DollarSign, Calendar, CheckCircle } from 'lucide-react';

export default function AdminLeads({ leads, setLeads }) {
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

  const statuses = ['New Lead', 'Site Survey', 'Proposal Sent', 'Contract Signed', 'Installed'];

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(search.toLowerCase()) ||
    lead.email.toLowerCase().includes(search.toLowerCase()) ||
    lead.address.toLowerCase().includes(search.toLowerCase())
  );

  const moveStatus = (leadId, direction) => {
    setLeads(prev => prev.map(item => {
      if (item.id !== leadId) return item;
      const idx = statuses.indexOf(item.status);
      const newIdx = Math.max(0, Math.min(statuses.length - 1, idx + direction));
      return { ...item, status: statuses[newIdx] };
    }));
  };

  return (
    <div>
      
      {/* Top Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, maxWidth: '450px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search leads by name, email, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '2.75rem' }}
            />
          </div>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredLeads.length} Total Solar Leads</strong> in Pipeline
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, minmax(240px, 1fr))',
        gap: '1rem',
        overflowX: 'auto',
        paddingBottom: '1rem'
      }}>
        {statuses.map((colStatus) => {
          const colLeads = filteredLeads.filter(l => l.status === colStatus);

          return (
            <div key={colStatus} style={{
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '450px'
            }}>
              
              {/* Column Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{colStatus}</span>
                <span className="badge badge-solar" style={{ fontSize: '0.7rem' }}>{colLeads.length}</span>
              </div>

              {/* Lead Cards List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
                {colLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="glass-panel"
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      border: '1px solid var(--border-subtle)',
                      transition: 'var(--transition-fast)',
                      background: 'var(--bg-dark)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--primary-solar)', fontWeight: 700 }}>{lead.id}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-eco)' }}>{lead.estValue}</span>
                    </div>

                    <h5 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.2rem' }}>{lead.name}</h5>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>{lead.address}</div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                      <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>{lead.systemSize}</span>
                      
                      {/* Controls to move status */}
                      <div style={{ display: 'flex', gap: '0.3rem' }} onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => moveStatus(lead.id, -1)}
                          disabled={colStatus === statuses[0]}
                          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)', borderRadius: '3px', padding: '2px 6px', cursor: 'pointer' }}
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => moveStatus(lead.id, 1)}
                          disabled={colStatus === statuses[statuses.length - 1]}
                          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--primary-solar)', borderRadius: '3px', padding: '2px 6px', cursor: 'pointer' }}
                        >
                          ›
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* Lead Modal Inspector */}
      {selectedLead && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '2rem', border: '1px solid var(--primary-solar)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <span className="badge badge-solar">{selectedLead.id}</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '0.2rem' }}>{selectedLead.name}</h3>
              </div>
              <button onClick={() => setSelectedLead(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} /> {selectedLead.email}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16} /> {selectedLead.phone}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {selectedLead.address}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><DollarSign size={16} /> Monthly Bill: ${selectedLead.bill}/mo</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> Lead Date: {selectedLead.date}</div>
            </div>

            <button onClick={() => setSelectedLead(null)} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Close Lead Profile
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

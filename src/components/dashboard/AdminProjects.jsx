import React, { useState } from 'react';
import { INITIAL_PROJECTS } from '../../data/initialData';
import { HardHat, CheckSquare, Square, Calendar, UserCheck, CheckCircle2 } from 'lucide-react';

export default function AdminProjects() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  const toggleChecklist = (projectId, stepIndex) => {
    setProjects(prev => prev.map(prj => {
      if (prj.id !== projectId) return prj;
      const updatedChecklist = prj.checklist.map((item, idx) => 
        idx === stepIndex ? { ...item, completed: !item.completed } : item
      );
      const completedCount = updatedChecklist.filter(c => c.completed).length;
      const newPercent = Math.round((completedCount / updatedChecklist.length) * 100);
      return { ...prj, checklist: updatedChecklist, progressPercent: newPercent };
    }));
  };

  return (
    <div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Active Rooftop Installations Tracker</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Track real-time engineering milestones, permits, and crew dispatch status</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {projects.map((prj) => (
          <div key={prj.id} className="glass-card" style={{ padding: '1.75rem' }}>
            
            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge badge-cyan">{prj.id}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--primary-solar)', fontWeight: 700 }}>{prj.capacity}</span>
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '0.25rem' }}>{prj.customer}</h4>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Est. Grid PTO Date</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-eco)' }}>{prj.estimatedCompletion}</div>
              </div>
            </div>

            {/* Stage & Progress Bar */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Current Stage: <strong>{prj.stage}</strong></span>
                <span style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>{prj.progressPercent}% Complete</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'var(--bg-dark)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${prj.progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #06B6D4 0%, #10B981 100%)', transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* Installation Milestone Checklist */}
            <div style={{ background: 'var(--bg-dark)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                INSTALLATION MILESTONE CHECKLIST
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {prj.checklist.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleChecklist(prj.id, idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      color: item.completed ? 'var(--text-main)' : 'var(--text-dim)'
                    }}
                  >
                    {item.completed ? (
                      <CheckCircle2 size={16} style={{ color: 'var(--accent-eco)', flexShrink: 0 }} />
                    ) : (
                      <Square size={16} style={{ color: 'var(--border-subtle)', flexShrink: 0 }} />
                    )}
                    <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                      {item.step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

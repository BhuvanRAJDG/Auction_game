import React from 'react';
import { UserCheck, Building2, Activity, PieChart, Kanban, HardHat, ShieldCheck, Sun } from 'lucide-react';

export default function DashboardHeader({ dashboardMode, setDashboardMode, activeTab, setActiveTab }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      
      {/* Top Banner / Portal Switcher */}
      <div className="glass-panel" style={{
        padding: '1.25rem 2rem',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-sm)',
            background: dashboardMode === 'customer' 
              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' 
              : 'linear-gradient(135deg, #FF9900 0%, #F59E0B 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFF',
            fontWeight: 800
          }}>
            {dashboardMode === 'customer' ? <UserCheck size={24} /> : <Building2 size={24} />}
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              {dashboardMode === 'customer' ? 'Customer Energy Portal' : 'Business Operations & CRM'}
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {dashboardMode === 'customer' 
                ? 'System ID: HELIO-98214 • San Jose, CA (10.8 kW + Tesla Powerwall)'
                : 'HelioRay Enterprise Installer Portal • Austin HQ Regional Workspace'}
            </div>
          </div>
        </div>

        {/* Dashboard Mode Selector Buttons */}
        <div style={{ display: 'flex', background: 'var(--bg-dark)', padding: '0.35rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => {
              setDashboardMode('customer');
              setActiveTab('live');
            }}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: dashboardMode === 'customer' ? 'var(--accent-eco)' : 'transparent',
              color: dashboardMode === 'customer' ? '#FFF' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'var(--transition-fast)'
            }}
          >
            <UserCheck size={16} /> Homeowner View
          </button>

          <button
            onClick={() => {
              setDashboardMode('admin');
              setActiveTab('leads');
            }}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: dashboardMode === 'admin' ? 'var(--primary-solar)' : 'transparent',
              color: dashboardMode === 'admin' ? '#000' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'var(--transition-fast)'
            }}
          >
            <Building2 size={16} /> Installer CRM
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
        
        {dashboardMode === 'customer' ? (
          <>
            <button
              onClick={() => setActiveTab('live')}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: activeTab === 'live' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                color: activeTab === 'live' ? 'var(--accent-eco)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Activity size={18} /> Live Generation & Energy Flow
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveTab('leads')}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: activeTab === 'leads' ? 'rgba(255, 153, 0, 0.15)' : 'transparent',
                color: activeTab === 'leads' ? 'var(--primary-solar)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Kanban size={18} /> Quote Lead Pipeline
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: activeTab === 'projects' ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                color: activeTab === 'projects' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <HardHat size={18} /> Active Installations
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: activeTab === 'analytics' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                color: activeTab === 'analytics' ? 'var(--accent-eco)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <PieChart size={18} /> Revenue & Capacity Metrics
            </button>
          </>
        )}

      </div>

    </div>
  );
}

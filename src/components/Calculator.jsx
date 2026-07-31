import React, { useState } from 'react';
import { DollarSign, Zap, TreePine, Sun, Award, TrendingUp, ChevronRight, Check } from 'lucide-react';

export default function Calculator({ onOpenQuoteModalWithData }) {
  const [monthlyBill, setMonthlyBill] = useState(250);
  const [sunHours, setSunHours] = useState(4.8); // Peak sun hours/day
  const [includeIncentives, setIncludeIncentives] = useState(true);

  // Calculations based on industry standard formulas
  const annualElectricitySpend = monthlyBill * 12;
  const estimatedKwhNeeded = (annualElectricitySpend / 0.18); // ~$0.18 per kWh avg rate
  const systemSizeKw = Math.max(3.5, Math.min(45, Math.round((estimatedKwhNeeded / (sunHours * 365)) * 10) / 10));
  
  const estimatedCostGross = Math.round(systemSizeKw * 1800); // ~$1,800/kW installed
  const taxCredit = includeIncentives ? Math.round(estimatedCostGross * 0.30) : 0;
  const netCost = estimatedCostGross - taxCredit;

  const newMonthlyBill = 18; // Grid connection fee
  const monthlySavings = Math.max(0, monthlyBill - newMonthlyBill);
  const annualSavings = monthlySavings * 12;
  const paybackYears = Math.round((netCost / annualSavings) * 10) / 10;
  const net25YearSavings = Math.round((annualSavings * 25 * 1.03) - netCost); // assuming 3% utility rate inflation
  const treesPlantedEquivalent = Math.round(systemSizeKw * 48);

  const handleLaunchQuote = () => {
    onOpenQuoteModalWithData({
      monthlyBill,
      systemSizeKw,
      estimatedSavings: net25YearSavings
    });
  };

  return (
    <section id="calculator" style={{ padding: '5rem 1.5rem', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-solar" style={{ marginBottom: '0.75rem' }}>
            <Zap size={14} /> Instant Solar Sizer & Financial ROI
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            How Much Can You <span className="gradient-text-solar">Save With Solar?</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Adjust your average monthly electricity bill below to calculate your recommended solar array size, 25-year return on investment, and payback period.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Left: Input Controls Card */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sun style={{ color: 'var(--primary-solar)' }} size={22} />
              Input Solar Parameters
            </h3>

            {/* Slider 1: Monthly Electricity Bill */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  Average Monthly Utility Bill
                </label>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-solar)' }}>
                  ${monthlyBill} / mo
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="900"
                step="10"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--primary-solar)',
                  height: '8px',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>
                <span>$60/mo</span>
                <span>$450/mo</span>
                <span>$900+/mo</span>
              </div>
            </div>

            {/* Selector 2: Sun Hours Exposure */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600, marginBottom: '0.65rem' }}>
                Regional Sun Exposure Level
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { label: 'High Sun', hours: 5.4, desc: 'AZ, CA, TX, NV' },
                  { label: 'Moderate', hours: 4.8, desc: 'CO, FL, GA, NC' },
                  { label: 'Moderate-Low', hours: 4.0, desc: 'NY, WA, IL, MA' }
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setSunHours(opt.hours)}
                    style={{
                      padding: '0.75rem 0.5rem',
                      background: sunHours === opt.hours ? 'rgba(255, 153, 0, 0.15)' : 'var(--bg-dark)',
                      border: sunHours === opt.hours ? '1px solid var(--primary-solar)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      color: sunHours === opt.hours ? 'var(--primary-solar)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textAlign: 'center',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <div>{opt.label}</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.8, fontWeight: 400 }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Checkbox: Federal Tax Credit */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.75rem'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-eco)' }}>
                  Include 30% Clean Energy Tax Credit
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Reduces gross system cost by 30% at tax filing
                </div>
              </div>
              <input
                type="checkbox"
                checked={includeIncentives}
                onChange={(e) => setIncludeIncentives(e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: 'var(--accent-eco)', cursor: 'pointer' }}
              />
            </div>

            {/* Next Action Button */}
            <button onClick={handleLaunchQuote} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Claim Custom Solar Sizing Quote
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Right: Detailed Output Dashboard */}
          <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--border-active)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', uppercase: 'true', letterSpacing: '0.05em' }}>RECOMMENDED SYSTEM</span>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-solar)' }}>
                  {systemSizeKw} <span style={{ fontSize: '1rem', fontWeight: 600 }}>kW Array</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ESTIMATED PAYBACK</span>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-eco)' }}>
                  {paybackYears} <span style={{ fontSize: '1rem', fontWeight: 600 }}>Years</span>
                </div>
              </div>
            </div>

            {/* Financial Breakdown Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              
              <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>New Monthly Electric Bill</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                  ${newMonthlyBill} <span style={{ fontSize: '0.75rem', color: 'var(--accent-eco)' }}>(-93%)</span>
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Net Cost After 30% Incentive</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                  ${netCost.toLocaleString()}
                </div>
              </div>

            </div>

            {/* 25-Year Big ROI Highlight Box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 153, 0, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
              border: '1px solid var(--primary-solar)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-solar)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Estimated 25-Year Cumulative Net Savings
              </div>
              <div style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0' }}>
                ${net25YearSavings.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Accounts for average annual 3.2% electric utility price increases
              </div>
            </div>

            {/* Ecological Impact Counter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ background: '#10B981', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                <TreePine size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-eco)' }}>
                  Equivalent Environmental Impact
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Equal to planting <strong>{treesPlantedEquivalent} trees</strong> or avoiding {Math.round(systemSizeKw * 2.8)} tons of CO2 annually!
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { X, CheckCircle2, Zap, ArrowRight, ArrowLeft, Home, Building2, Battery, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuoteWizard({ isOpen, onClose, initialData, onSubmitQuote }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: 'Single Family Home',
    roofType: initialData?.roofType || 'Tile',
    bill: initialData?.monthlyBill || 280,
    utilityCompany: 'Pacific Gas & Electric (PG&E)',
    goals: ['Zero Net Electric Bill', 'Battery Backup Storage'],
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const toggleGoal = (goalStr) => {
    setFormData(prev => {
      const exists = prev.goals.includes(goalStr);
      return {
        ...prev,
        goals: exists ? prev.goals.filter(g => g !== goalStr) : [...prev.goals, goalStr]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    const newLead = {
      id: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name || 'Valued Solar Lead',
      email: formData.email,
      phone: formData.phone,
      address: formData.address || 'Submitted Online Location',
      bill: formData.bill,
      roofType: formData.roofType,
      status: 'New Lead',
      systemSize: initialData?.systemSizeKw ? `${initialData.systemSizeKw} kW` : `${Math.round(formData.bill / 25)} kW`,
      date: new Date().toISOString().split('T')[0],
      estValue: `$${Math.round((formData.bill / 20) * 1800).toLocaleString()}`
    };

    onSubmitQuote(newLead);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '620px',
        padding: '2.5rem',
        position: 'relative',
        border: '1px solid var(--primary-solar)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
      }}>
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={24} />
        </button>

        {!submitted ? (
          <div>
            {/* Step Progress Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div>
                <span className="badge badge-solar">Step {step} of 3</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.25rem' }}>
                  {step === 1 && 'Property & Roof Details'}
                  {step === 2 && 'Utility Bill & Energy Goals'}
                  {step === 3 && 'Contact Info & Instant Sizing'}
                </h3>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    style={{
                      width: '24px',
                      height: '6px',
                      borderRadius: '3px',
                      background: s <= step ? 'var(--primary-solar)' : 'rgba(255,255,255,0.1)'
                    }}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              
              {/* STEP 1 */}
              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label>Property Type</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      {['Single Family Home', 'Multi-Family', 'Commercial Building', 'Agricultural Farm'].map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => handleChange('propertyType', t)}
                          style={{
                            padding: '0.85rem',
                            background: formData.propertyType === t ? 'rgba(255, 153, 0, 0.15)' : 'var(--bg-dark)',
                            border: formData.propertyType === t ? '1px solid var(--primary-solar)' : '1px solid var(--border-subtle)',
                            color: formData.propertyType === t ? 'var(--primary-solar)' : 'var(--text-main)',
                            borderRadius: 'var(--radius-sm)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '0.85rem'
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label>Roof Material Type</label>
                    <select
                      value={formData.roofType}
                      onChange={(e) => handleChange('roofType', e.target.value)}
                    >
                      <option value="Tile">Spanish Concrete Tile</option>
                      <option value="Metal">Standing Seam Metal</option>
                      <option value="Flat">Commercial Flat TPO</option>
                      <option value="Asphalt Shingle">Architectural Asphalt Shingle</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                  >
                    Continue to Utility Details <ArrowRight size={18} />
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <label>Average Monthly Utility Bill</label>
                      <span style={{ fontWeight: 800, color: 'var(--primary-solar)' }}>${formData.bill} / mo</span>
                    </div>
                    <input
                      type="range"
                      min="70"
                      max="1200"
                      step="10"
                      value={formData.bill}
                      onChange={(e) => handleChange('bill', Number(e.target.value))}
                      style={{ accentColor: 'var(--primary-solar)' }}
                    />
                  </div>

                  <div>
                    <label>Utility Power Provider</label>
                    <input
                      type="text"
                      placeholder="e.g. PG&E, SCE, Duke Energy, APS, Oncor..."
                      value={formData.utilityCompany}
                      onChange={(e) => handleChange('utilityCompany', e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Key System Goals</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      {['Zero Net Electric Bill', 'Battery Backup Storage', 'EV Fast Charger', 'Low Upfront Payment'].map((g) => (
                        <button
                          type="button"
                          key={g}
                          onClick={() => toggleGoal(g)}
                          style={{
                            padding: '0.65rem',
                            background: formData.goals.includes(g) ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-dark)',
                            border: formData.goals.includes(g) ? '1px solid var(--accent-eco)' : '1px solid var(--border-subtle)',
                            color: formData.goals.includes(g) ? 'var(--accent-eco)' : 'var(--text-muted)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                        >
                          {formData.goals.includes(g) ? '✓ ' : '+ '}{g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <button type="button" onClick={() => setStep(1)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                      <ArrowLeft size={18} /> Back
                    </button>
                    <button type="button" onClick={() => setStep(3)} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                      Continue to Contact Info <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label>Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="(555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label>Property Address</label>
                    <input
                      type="text"
                      placeholder="123 Solar Way, City, State ZIP"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="button" onClick={() => setStep(2)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                      <ArrowLeft size={18} /> Back
                    </button>
                    <button type="submit" className="btn-eco" style={{ flex: 2, justifyContent: 'center' }}>
                      <Zap size={18} /> Generate Instant Proposal
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        ) : (
          /* SUBMITTED CONFIRMATION */
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ width: '70px', height: '70px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-eco)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <CheckCircle2 size={42} />
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Proposal Generated!
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Thank you, <strong>{formData.name || 'Valued Customer'}</strong>! Your preliminary rooftop solar proposal has been generated and dispatched to our engineering desk.
            </p>
            
            <div style={{ background: 'var(--bg-dark)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary-solar)', fontWeight: 700 }}>SYNCHRONIZED TO INSTALLER DASHBOARD</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Your lead ID is logged into the Operations CRM. Click <strong>"Launch Dashboard"</strong> in the top menu to view it live in the Admin Kanban Pipeline!
              </div>
            </div>

            <button onClick={resetAndClose} className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
              Done / Return to Site
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

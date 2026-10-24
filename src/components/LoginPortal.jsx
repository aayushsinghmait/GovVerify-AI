import React, { useState } from 'react';
import { ShieldCheck, Building2, Lock, KeyRound, AlertTriangle, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export function LoginPortal({ onLoginSuccess, activeBgTheme = 'INDIA', onToggleTheme }) {
  const [selectedPortal, setSelectedPortal] = useState('ADMIN'); // 'ADMIN' or 'MINISTRY'
  const [ministryRole, setMinistryRole] = useState('ADMIN'); // 'ADMIN' or 'STAFF'
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    ministryCode: 'UIDAI'
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (selectedPortal === 'ADMIN') {
      if (!credentials.username || !credentials.password) {
        setErrorMessage('Kripya Admin Username aur Password enter karein.');
        return;
      }
      onLoginSuccess({
        role: 'ADMIN',
        subRole: 'CENTRAL_SUPER_ADMIN',
        username: credentials.username || 'admin.central',
        name: 'Authorized Central Platform Admin',
        badge: 'SUPER_ADMIN',
        permissions: ['MANAGE_PLATFORM', 'VERIFY_APPLICATIONS', 'ADD_ADMIN', 'ADD_MINISTRY', 'CONFIGURE_RULES']
      });
    } else {
      if (!credentials.username || !credentials.password) {
        setErrorMessage('Kripya Ministry Officer Username aur Password enter karein.');
        return;
      }
      onLoginSuccess({
        role: 'MINISTRY',
        subRole: ministryRole,
        ministryCode: credentials.ministryCode,
        name: `${credentials.ministryCode} ${ministryRole === 'ADMIN' ? 'Ministry Admin' : 'Staff Officer'}`,
        badge: ministryRole === 'ADMIN' ? 'MINISTRY_ADMIN' : 'MINISTRY_STAFF',
        permissions: ministryRole === 'ADMIN' 
          ? ['CREATE_AND_SETTLE_DATABASE', 'UPLOAD_APPLICATION', 'ADD_STAFF', 'ADD_ADMIN'] 
          : ['SEE_DATABASE', 'UPLOAD_APPLICATION']
      });
    }
  };

  const handleQuickDemo = (role, ministry = 'UIDAI', subRole = 'ADMIN') => {
    if (role === 'ADMIN') {
      onLoginSuccess({
        role: 'ADMIN',
        subRole: 'CENTRAL_SUPER_ADMIN',
        username: 'super.admin@gov.in',
        name: 'Dr. A. Verma (Central Platform Admin)',
        badge: 'SUPER_ADMIN',
        permissions: ['MANAGE_PLATFORM', 'VERIFY_APPLICATIONS', 'ADD_ADMIN', 'ADD_MINISTRY', 'CONFIGURE_RULES']
      });
    } else {
      onLoginSuccess({
        role: 'MINISTRY',
        subRole: subRole,
        ministryCode: ministry,
        username: `${subRole.toLowerCase()}@${ministry.toLowerCase()}.gov.in`,
        name: `${ministry} ${subRole === 'ADMIN' ? 'Admin' : 'Staff Officer'}`,
        badge: subRole === 'ADMIN' ? 'MINISTRY_ADMIN' : 'MINISTRY_STAFF',
        permissions: subRole === 'ADMIN'
          ? ['CREATE_AND_SETTLE_DATABASE', 'UPLOAD_APPLICATION', 'ADD_STAFF', 'ADD_ADMIN']
          : ['SEE_DATABASE', 'UPLOAD_APPLICATION']
      });
    }
  };

  return (
    <div className={activeBgTheme === 'AICTE' ? 'ministry-theme-bg' : ''} style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box'
    }}>
      {/* 1. National Tricolor Strip */}
      <div className="gov-tricolor-strip"></div>

      {/* 2. Official Top Government Bar */}
      <div className="gov-official-header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span><strong>भारत सरकार</strong> | Government of India</span>
          <span style={{ opacity: 0.6 }}>•</span>
          <span><strong>अखिल भारतीय तकनीकी शिक्षा परिषद</strong> | AICTE</span>
          <span style={{ opacity: 0.6 }}>•</span>
          <span style={{ color: 'var(--gov-amber)' }}>Sovereign AI Verification Gateway</span>
        </div>

        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'var(--gov-white)',
              padding: '0.15rem 0.65rem',
              borderRadius: '4px',
              fontSize: '0.72rem',
              cursor: 'pointer'
            }}
          >
            🏛️ Toggle: {activeBgTheme === 'INDIA' ? 'Gov of India Backdrop' : 'AICTE Backdrop'}
          </button>
        )}
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1rem'
      }}>
        <div style={{
          maxWidth: '540px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Header Emblem */}
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '12px',
              background: 'var(--gov-navy)',
              border: '2px solid var(--gov-white)',
              boxShadow: '0 4px 15px rgba(18, 59, 93, 0.25)',
              marginBottom: '0.85rem'
            }}>
              <ShieldCheck size={36} color="var(--gov-white)" />
            </div>

            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '0.25rem' }}>
              GovVerify <span style={{ color: 'var(--gov-teal)' }}>AI</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600 }}>
              National Regulatory Compliance & Cross-Ministry Verification Gateway
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginTop: '0.6rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '4px',
              background: 'var(--gov-white)',
              border: '1px solid var(--gov-crimson)',
              fontSize: '0.75rem',
              color: 'var(--gov-crimson)',
              fontWeight: 700
            }}>
              <Lock size={12} />
              Restricted Government Access • 256-Bit Cryptographic Ledger
            </div>
          </div>

          {/* Card Box */}
          <div className="glass-panel" style={{ padding: '2rem', border: '2px solid var(--gov-navy)', background: 'var(--gov-white)' }}>
            {/* Dual Portal Switch */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
              background: 'var(--gov-ice)',
              padding: '0.35rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.5rem',
              border: '1px solid var(--border-subtle)'
            }}>
              <button
                type="button"
                onClick={() => setSelectedPortal('ADMIN')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem',
                  borderRadius: '4px',
                  border: 'none',
                  background: selectedPortal === 'ADMIN' ? 'var(--gov-navy)' : 'transparent',
                  color: selectedPortal === 'ADMIN' ? 'var(--gov-white)' : 'var(--gov-navy)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <UserCheck size={18} />
                Admin Portal
              </button>

              <button
                type="button"
                onClick={() => setSelectedPortal('MINISTRY')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem',
                  borderRadius: '4px',
                  border: 'none',
                  background: selectedPortal === 'MINISTRY' ? 'var(--gov-teal)' : 'transparent',
                  color: selectedPortal === 'MINISTRY' ? 'var(--gov-white)' : 'var(--gov-navy)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Building2 size={18} />
                Ministry Portal
              </button>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--gov-navy)', marginBottom: '0.2rem' }}>
                {selectedPortal === 'ADMIN' ? 'Central Platform Admin Authentication' : 'Authorized Ministry Client Login'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {selectedPortal === 'ADMIN' 
                  ? 'Batch verification management, schema reconciliation, and regulatory audit.' 
                  : 'Manage reference datasets (Excel upload), staff access, and schema compliance.'}
              </p>
            </div>

            {errorMessage && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--gov-white)',
                border: '1.5px solid var(--gov-crimson)',
                color: 'var(--gov-crimson)',
                fontSize: '0.82rem',
                fontWeight: 600,
                marginBottom: '1.25rem'
              }}>
                <AlertTriangle size={18} />
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {selectedPortal === 'MINISTRY' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Select Registered Ministry Tenant</label>
                    <select
                      className="form-select"
                      value={credentials.ministryCode}
                      onChange={(e) => setCredentials({ ...credentials, ministryCode: e.target.value })}
                    >
                      <option value="UIDAI">UIDAI - National Biometric Aadhaar Registry</option>
                      <option value="CBDT">CBDT - Direct Tax PAN & ITR Database</option>
                      <option value="MoE">MoE - Ministry of Education / NAD</option>
                      <option value="MCA">MCA - Ministry of Corporate Affairs</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Ministry Role & Clearance Level</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '0.5rem' }}>
                      <div
                        onClick={() => setMinistryRole('ADMIN')}
                        style={{
                          padding: '0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          border: `2px solid ${ministryRole === 'ADMIN' ? 'var(--gov-navy)' : 'var(--border-subtle)'}`,
                          background: ministryRole === 'ADMIN' ? 'var(--gov-ice)' : 'var(--gov-white)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.82rem', color: 'var(--gov-navy)' }}>
                          <ShieldCheck size={16} color="var(--gov-navy)" />
                          Ministry Admin
                        </div>
                        <ul style={{ marginTop: '0.35rem', paddingLeft: '1.1rem', fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                          <li>Create & settle database</li>
                          <li>Upload application</li>
                        </ul>
                      </div>

                      <div
                        onClick={() => setMinistryRole('STAFF')}
                        style={{
                          padding: '0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          border: `2px solid ${ministryRole === 'STAFF' ? 'var(--gov-teal)' : 'var(--border-subtle)'}`,
                          background: ministryRole === 'STAFF' ? 'rgba(15, 118, 110, 0.08)' : 'var(--gov-white)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.82rem', color: 'var(--gov-teal)' }}>
                          <UserCheck size={16} color="var(--gov-teal)" />
                          Ministry Staff
                        </div>
                        <ul style={{ marginTop: '0.35rem', paddingLeft: '1.1rem', fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                          <li>See database (read-only)</li>
                          <li>Upload application</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="form-group">
                <label className="form-label">Government Email or Authorized ID</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={selectedPortal === 'ADMIN' ? 'e.g. admin.central@gov.in' : `e.g. ${ministryRole.toLowerCase()}@${credentials.ministryCode.toLowerCase()}.gov.in`}
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Security Access PIN / Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••••••"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className={selectedPortal === 'ADMIN' ? 'btn-primary' : 'btn-teal'}
                style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem' }}
              >
                <KeyRound size={18} />
                Authenticate & Enter {selectedPortal === 'ADMIN' ? 'Central Admin Portal' : `${credentials.ministryCode} Portal`}
              </button>
            </form>

            {/* Quick Demo Access Bar */}
            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-subtle)'
            }}>
              <p style={{ fontSize: '0.72rem', color: 'var(--gov-navy)', fontWeight: 700, marginBottom: '0.65rem', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Instant Demonstration Access (Presets)
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={() => handleQuickDemo('ADMIN')}
                >
                  <UserCheck size={14} color="var(--gov-navy)" />
                  Central Admin
                </button>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={() => handleQuickDemo('MINISTRY', 'UIDAI', 'ADMIN')}
                >
                  <ShieldCheck size={14} color="var(--gov-teal)" />
                  UIDAI Admin (Full DB)
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={() => handleQuickDemo('MINISTRY', 'UIDAI', 'STAFF')}
                >
                  <UserCheck size={14} color="var(--gov-teal)" />
                  UIDAI Staff (Read DB)
                </button>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={() => handleQuickDemo('MINISTRY', 'CBDT', 'ADMIN')}
                >
                  <Building2 size={14} color="var(--gov-amber)" />
                  CBDT Tax Admin
                </button>
              </div>
            </div>
          </div>

          {/* Security Disclaimers */}
          <div style={{
            marginTop: '1rem',
            textAlign: 'center',
            fontSize: '0.72rem',
            color: 'var(--gov-navy)',
            fontWeight: 600
          }}>
            Protected under IT Act 2000 & Digital Personal Data Protection (DPDP) Act 2023. Unauthorized access is prohibited.
          </div>
        </div>
      </div>
    </div>
  );
}

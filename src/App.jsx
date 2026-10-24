import React, { useState } from 'react';
import { 
  ShieldCheck, Building2, UserCheck, LogOut, ArrowRightLeft, 
  Sparkles, CheckCircle2, AlertTriangle, Layers
} from 'lucide-react';
import { 
  INITIAL_MINISTRIES, 
  INITIAL_MINISTRY_DATABASES, 
  INITIAL_NAMED_DATASETS,
  INITIAL_APPLICATIONS, 
  INITIAL_COMPLIANCE_RULES, 
  INITIAL_AUDIT_LOGS,
  INITIAL_DATASET_REGISTRY
} from './data/mockData';
import { LoginPortal } from './components/LoginPortal';
import { AdminPortal } from './components/AdminPortal';
import { MinistryPortal } from './components/MinistryPortal';

export function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(null); // null when logged out, or { role, username, name, badge, ministryCode, subRole }

  // Global Shared State across Portals
  const [ministries, setMinistries] = useState(INITIAL_MINISTRIES);
  const [databases, setDatabases] = useState(INITIAL_MINISTRY_DATABASES);
  const [namedDatasets, setNamedDatasets] = useState(INITIAL_NAMED_DATASETS);
  const [datasetRegistry, setDatasetRegistry] = useState(INITIAL_DATASET_REGISTRY);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [complianceRules, setComplianceRules] = useState(INITIAL_COMPLIANCE_RULES);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  // Audit Logger callback
  const logAudit = (logEntry) => {
    const newLog = {
      id: `AUDIT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: logEntry.actor || currentUser?.name || 'Authorized Officer',
      portal: logEntry.portal || (currentUser?.role === 'ADMIN' ? 'Admin Portal' : 'Ministry Portal'),
      action: logEntry.action || 'GENERIC_OP',
      details: logEntry.details || '',
      severity: logEntry.severity || 'INFO'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Named Datasets updater (allows multiple independent datasets per ministry)
  const handleNamedDatasetUpdate = (ministryCode, updatedDatasets) => {
    setNamedDatasets(prev => ({
      ...prev,
      [ministryCode]: updatedDatasets
    }));

    // Consolidate all records across this ministry's datasets for the central AI engine
    const flatRecords = updatedDatasets.flatMap(ds => ds.records || []);

    setDatabases(prev => ({
      ...prev,
      [ministryCode]: flatRecords
    }));

    // Update ministry records count & sync timestamp
    setMinistries(prev => prev.map(m => {
      if (m.code === ministryCode) {
        return {
          ...m,
          recordsCount: flatRecords.length,
          lastSync: new Date().toISOString().replace('T', ' ').slice(0, 19)
        };
      }
      return m;
    }));
  };

  // Database updater (fallback when flat array is updated directly)
  const handleDatabaseUpdate = (ministryCode, updatedRecords) => {
    setDatabases(prev => ({
      ...prev,
      [ministryCode]: updatedRecords
    }));

    // Update ministry records count
    setMinistries(prev => prev.map(m => {
      if (m.code === ministryCode) {
        return {
          ...m,
          recordsCount: updatedRecords.length,
          lastSync: new Date().toISOString().replace('T', ' ').slice(0, 19)
        };
      }
      return m;
    }));
  };

  // Switch between portals on the fly for demonstration
  const handleSwitchPortal = () => {
    if (currentUser?.role === 'ADMIN') {
      setCurrentUser({
        role: 'MINISTRY',
        ministryCode: 'UIDAI',
        username: 'officer@uidai.gov.in',
        name: 'UIDAI Nodal Officer',
        badge: 'MINISTRY_ADMIN'
      });
      logAudit({
        actor: 'UIDAI Nodal Officer',
        portal: 'Ministry Portal (UIDAI)',
        action: 'PORTAL_SWITCH',
        details: 'Navigated to UIDAI Ministry Portal.',
        severity: 'INFO'
      });
    } else {
      setCurrentUser({
        role: 'ADMIN',
        username: 'super.admin@gov.in',
        name: 'Dr. A. Verma (Central Platform Admin)',
        badge: 'SUPER_ADMIN'
      });
      logAudit({
        actor: 'SuperAdmin (ADM-01)',
        portal: 'Admin Portal',
        action: 'PORTAL_SWITCH',
        details: 'Navigated to Central Admin Portal.',
        severity: 'INFO'
      });
    }
  };

  const handleLogout = () => {
    logAudit({
      actor: currentUser?.name || 'Officer',
      portal: currentUser?.role === 'ADMIN' ? 'Admin Portal' : 'Ministry Portal',
      action: 'USER_LOGOUT',
      details: `User signed out from ${currentUser?.role} portal session.`,
      severity: 'INFO'
    });
    setCurrentUser(null);
  };

  // Background Theme: 'INDIA' (uses /assets/gov-bg-india.png) or 'AICTE' (uses /assets/gov-bg-aicte.png)
  const [activeBgTheme, setActiveBgTheme] = useState('INDIA');

  // If user is not logged in, show Page 1 Login Portal
  if (!currentUser) {
    return (
      <LoginPortal
        activeBgTheme={activeBgTheme}
        onToggleTheme={() => setActiveBgTheme(prev => prev === 'INDIA' ? 'AICTE' : 'INDIA')}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          logAudit({
            actor: user.name,
            portal: user.role === 'ADMIN' ? 'Admin Portal' : `Ministry Portal (${user.ministryCode})`,
            action: 'USER_AUTHENTICATED',
            details: `Successful authenticated login as ${user.badge} via direct access gateway.`,
            severity: 'SUCCESS'
          });
        }}
      />
    );
  }

  return (
    <div className={activeBgTheme === 'AICTE' ? 'ministry-theme-bg' : ''} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      {/* 1. National Tricolor Strip */}
      <div className="gov-tricolor-strip"></div>

      {/* 2. Official Top Government Bar */}
      <div className="gov-official-header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span><strong>भारत सरकार</strong> | Government of India</span>
          <span style={{ opacity: 0.6 }}>•</span>
          <span><strong>अखिल भारतीय तकनीकी शिक्षा परिषद</strong> | All India Council for Technical Education</span>
          <span style={{ opacity: 0.6 }}>•</span>
          <span style={{ color: 'var(--gov-amber)' }}>Digital India GovTech Platform</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setActiveBgTheme(prev => prev === 'INDIA' ? 'AICTE' : 'INDIA')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'var(--gov-white)',
              padding: '0.15rem 0.65rem',
              borderRadius: '4px',
              fontSize: '0.72rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
            title="Toggle between AICTE and Government of India Official Backdrops"
          >
            🏛️ Theme: <strong>{activeBgTheme === 'INDIA' ? 'Gov of India Backdrop' : 'AICTE Backdrop'}</strong>
          </button>
          <span style={{ opacity: 0.5 }}>|</span>
          <span>Portal Session: <span style={{ color: '#5eead4', fontWeight: 600 }}>SECURE 256-BIT</span></span>
        </div>
      </div>

      {/* 3. Universal Gov Navigation Bar */}
      <header className="gov-navbar">
        <div className="brand-section">
          <div className="gov-emblem-badge">
            <ShieldCheck size={28} />
          </div>
          <div className="brand-text">
            <h1>
              GovVerify <span style={{ color: 'var(--gov-teal)' }}>AI</span>
              <span className="brand-tag">SIH26261</span>
            </h1>
            <div className="brand-sub">
              Autonomous Cross-Ministry Document & Regulatory Verification Platform
            </div>
          </div>
        </div>

        <div className="nav-controls">
          {/* Active Portal Badge */}
          <div className="portal-indicator">
            {currentUser.role === 'ADMIN' ? (
              <>
                <UserCheck size={16} color="var(--gov-navy)" />
                <span>Central Admin Portal</span>
              </>
            ) : (
              <>
                <Building2 size={16} color="var(--gov-teal)" />
                <span>Ministry Client: <strong>{currentUser.ministryCode}</strong></span>
              </>
            )}
          </div>

          {/* Quick Portal Switcher button */}
          <button
            className="btn-secondary btn-sm"
            onClick={handleSwitchPortal}
            title="Switch between Admin Portal and Ministry Portal directly"
          >
            <ArrowRightLeft size={14} />
            Switch to {currentUser.role === 'ADMIN' ? 'Ministry Portal' : 'Admin Portal'}
          </button>

          {/* User Profile Info & Logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gov-navy)' }}>{currentUser.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{currentUser.badge}</div>
            </div>

            <button
              className="btn-danger btn-sm"
              onClick={handleLogout}
              title="End Secure Government Session"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Portal Content Router */}
      <main className="app-container" style={{ flex: 1, width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
        {currentUser.role === 'ADMIN' ? (
          <AdminPortal
            applications={applications}
            ministries={ministries}
            databases={databases}
            datasetRegistry={datasetRegistry}
            complianceRules={complianceRules}
            auditLogs={auditLogs}
            onApplicationsUpdate={setApplications}
            onMinistriesUpdate={setMinistries}
            onDatasetRegistryUpdate={setDatasetRegistry}
            onRulesUpdate={setComplianceRules}
            onLogAudit={logAudit}
          />
        ) : (
          <MinistryPortal
            currentMinistryCode={currentUser.ministryCode || 'UIDAI'}
            currentUser={currentUser}
            ministries={ministries}
            databases={databases}
            namedDatasets={namedDatasets}
            applications={applications}
            onApplicationsUpdate={setApplications}
            onDatabaseUpdate={handleDatabaseUpdate}
            onNamedDatasetUpdate={handleNamedDatasetUpdate}
            onApplicationUpload={(newApps) => {
              setApplications(prev => [...newApps, ...prev]);
            }}
            onLogAudit={logAudit}
          />
        )}
      </main>

      {/* Global Status Footer */}
      <footer style={{
        padding: '1rem 2rem',
        borderTop: '2px solid var(--gov-navy)',
        background: 'var(--gov-navy)',
        color: 'var(--gov-white)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.78rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#5eead4', fontWeight: 600 }}>
            <span className="pulse-indicator"></span>
            GovVerify AI Engine: Online & Sovereign
          </span>
          <span>•</span>
          <span>Active Ministries: <strong>{ministries.length}</strong></span>
          <span>•</span>
          <span>Compliance Rules: <strong>{complianceRules.length} Configured</strong></span>
        </div>

        <div style={{ opacity: 0.9 }}>
          Smart India Hackathon 2026 (SIH26261) • National Portal Standards Compliant (NIC / MeitY / AICTE)
        </div>
      </footer>
    </div>
  );
}

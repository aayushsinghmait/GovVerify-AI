import React, { useState } from 'react';
import { 
  ShieldAlert, AlertOctagon, UserX, FileWarning, Search, 
  Filter, Eye, CheckCircle2, XCircle, ArrowUpRight, Download, 
  ExternalLink, Layers, Fingerprint, Lock, ShieldCheck
} from 'lucide-react';
import { maskAadhaar, maskPAN } from '../utils/aiEngine';
import { exportToExcel } from '../utils/excelHelper';

export function FraudIntelligenceView({ applications = [], databases = {}, onFreezeApplication }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Synthesize realistic cross-ministry fraud signals
  const fraudIncidents = [
    {
      id: 'INC-2026-081',
      applicationId: 'APP-2026-903',
      applicantName: 'Vikram Singh',
      threatType: 'SYNTHETIC_AADHAAR_COLLISION',
      severity: 'CRITICAL',
      detectedDate: '2026-10-23 13:46:12',
      aadhaarNo: '9988-7766-5544',
      panNo: 'XYZPS9876K',
      description: 'Submitted Aadhaar number has zero matching biometric ledger entries in UIDAI registry. Linked PAN is registered to an unrelated individual in CBDT core.',
      conflictingMinistries: ['UIDAI', 'CBDT'],
      riskScore: 94,
      status: 'UNDER_ACTIVE_INVESTIGATION',
      evidenceVector: {
        submittedName: 'Vikram Singh',
        uidaiMatch: 'NO_RECORD_FOUND',
        cbdtRegisteredName: 'Smt. Kamla Devi',
        panAadhaarLinkStatus: 'MISMATCH_CRITICAL'
      }
    },
    {
      id: 'INC-2026-082',
      applicationId: 'APP-2026-902',
      applicantName: 'Ananya Ray',
      threatType: 'PHONETIC_IDENTITY_SPOOF',
      severity: 'HIGH',
      detectedDate: '2026-10-23 11:33:04',
      aadhaarNo: '2345-6789-0123',
      panNo: 'BKAPR4321Q',
      description: 'Phonetic distance flag: Submitted name "Ananya Ray" differs from official UIDAI & CBDT legal spelling "Ananya Roy" (Jaro-Winkler distance 87%).',
      conflictingMinistries: ['UIDAI', 'MoE'],
      riskScore: 68,
      status: 'VERIFICATION_HOLD',
      evidenceVector: {
        submittedName: 'Ananya Ray',
        uidaiMatch: 'Ananya Roy (87.2% Match)',
        cbdtRegisteredName: 'Ananya Roy',
        panAadhaarLinkStatus: 'VALID_UNDER_VARIATION'
      }
    },
    {
      id: 'INC-2026-083',
      applicationId: 'APP-2026-904',
      applicantName: 'Priya Sharma',
      threatType: 'INCOME_DISCREPANCY_AND_DIRECTOR_CONFLICT',
      severity: 'HIGH',
      detectedDate: '2026-10-23 15:21:40',
      aadhaarNo: '5544-3322-1100',
      panNo: 'PQRSS6543M',
      description: 'Applicant claimed gross income ₹8,00,000 for low-income subsidy, but CBDT audit ledger indicates gross receipts ₹25L-50L. Automatic expansion detected active Directorship in Apex Horizon Capital LLP.',
      conflictingMinistries: ['CBDT', 'MCA'],
      riskScore: 82,
      status: 'STATUTORY_INQUIRY_ISSUED',
      evidenceVector: {
        submittedName: 'Priya Sharma',
        claimedIncome: '₹8,00,000 (Subsidy Tier)',
        cbdtIncomeSlab: '₹25,00,000 - ₹50,00,000 [AUDIT_FLAGGED]',
        mcaDirectorship: 'DIN01234567 • Apex Horizon Capital LLP'
      }
    }
  ];

  const filteredIncidents = fraudIncidents.filter(inc => {
    const matchesSearch = 
      inc.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.threatType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity = filterSeverity === 'ALL' || inc.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const handleExportFraudReport = () => {
    const rows = filteredIncidents.map(inc => ({
      Incident_ID: inc.id,
      Application_ID: inc.applicationId,
      Applicant_Name: inc.applicantName,
      Threat_Classification: inc.threatType,
      Severity: inc.severity,
      Risk_Score: inc.riskScore,
      Ministries_Involved: inc.conflictingMinistries.join(', '),
      Status: inc.status,
      Description: inc.description
    }));
    exportToExcel(rows, 'GovVerify_Fraud_Intelligence_Dossier.xlsx', 'ThreatDossier');
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.2rem 0.75rem',
            borderRadius: '20px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            fontSize: '0.75rem',
            color: '#f87171',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}>
            <ShieldAlert size={14} />
            Page 4 • Forensics & Anti-Impersonation Intelligence
          </div>
          <h1 style={{ fontSize: '1.85rem' }}>Cross-Ministry Fraud & Synthetic Identity Hub</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Automated detection of identity ghosting, phonetic permutation evasions, duplicate Aadhaar collisions, and income falsification.
          </p>
        </div>

        <button className="btn-secondary" onClick={handleExportFraudReport}>
          <Download size={16} />
          Export Intelligence Dossier (.xlsx)
        </button>
      </div>

      {/* Threat Metrics Overview */}
      <div className="metrics-grid" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel metric-card">
          <div className="metric-info">
            <h3>Active Fraud Vectors</h3>
            <div className="value" style={{ color: '#f87171' }}>{fraudIncidents.length}</div>
            <span className="badge badge-fail" style={{ marginTop: '0.5rem' }}>Automated Quarantine</span>
          </div>
          <div className="metric-icon-box" style={{ borderColor: 'var(--danger-border)', background: 'var(--danger-bg)' }}>
            <AlertOctagon size={24} color="#f87171" />
          </div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-info">
            <h3>Synthetic Identity Collisions</h3>
            <div className="value" style={{ color: '#fbbf24' }}>1</div>
            <span className="badge badge-review" style={{ marginTop: '0.5rem' }}>Unregistered UIDAI Token</span>
          </div>
          <div className="metric-icon-box" style={{ borderColor: 'var(--warning-border)', background: 'var(--warning-bg)' }}>
            <Fingerprint size={24} color="#fbbf24" />
          </div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-info">
            <h3>Phonetic Spoofing Attempts</h3>
            <div className="value" style={{ color: 'var(--accent)' }}>1</div>
            <span className="badge badge-neutral" style={{ marginTop: '0.5rem' }}>Levenshtein &gt;= 80% Flag</span>
          </div>
          <div className="metric-icon-box" style={{ borderColor: 'rgba(56, 189, 248, 0.3)', background: 'rgba(56, 189, 248, 0.1)' }}>
            <UserX size={24} color="var(--accent)" />
          </div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-info">
            <h3>Prevented Fiscal Leakage</h3>
            <div className="value" style={{ color: '#34d399' }}>₹24.5L</div>
            <span className="badge badge-pass" style={{ marginTop: '0.5rem' }}>Subsidies Protected</span>
          </div>
          <div className="metric-icon-box" style={{ borderColor: 'var(--success-border)', background: 'var(--success-bg)' }}>
            <ShieldCheck size={24} color="#34d399" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search by Applicant, Application ID, Threat Vector, or Ministry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="var(--text-muted)" />
          <select
            className="form-select"
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            style={{ width: '160px' }}
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical Threats</option>
            <option value="HIGH">High Severity</option>
            <option value="MEDIUM">Medium / Informational</option>
          </select>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="glass-panel" style={{ overflow: 'hidden', marginBottom: '2rem' }}>
        <div className="table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Threat ID</th>
                <th>Target Application</th>
                <th>Applicant Name</th>
                <th>Aadhaar / PAN</th>
                <th>Threat Classification</th>
                <th>Conflicting Registries</th>
                <th>Risk Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map(inc => (
                <tr key={inc.id} style={{
                  background: selectedIncident?.id === inc.id ? 'rgba(99, 102, 241, 0.08)' : 'transparent'
                }}>
                  <td>
                    <span className="mono" style={{ fontWeight: 700, color: '#f87171' }}>
                      {inc.id}
                    </span>
                  </td>
                  <td><span className="mono" style={{ fontWeight: 600 }}>{inc.applicationId}</span></td>
                  <td><strong>{inc.applicantName}</strong></td>
                  <td>
                    <div style={{ fontSize: '0.78rem' }}>
                      <div>{maskAadhaar(inc.aadhaarNo)}</div>
                      <div className="mono" style={{ color: 'var(--text-muted)' }}>{maskPAN(inc.panNo)}</div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-fail" style={{ fontSize: '0.7rem' }}>
                      {inc.threatType.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      {inc.conflictingMinistries.map(m => (
                        <span key={m} className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>{m}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <div style={{
                        width: '38px',
                        height: '6px',
                        borderRadius: '3px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${inc.riskScore}%`,
                          height: '100%',
                          background: inc.riskScore > 80 ? '#ef4444' : '#f59e0b'
                        }}></div>
                      </div>
                      <strong style={{ color: inc.riskScore > 80 ? '#f87171' : '#fbbf24', fontSize: '0.85rem' }}>
                        {inc.riskScore}/100
                      </strong>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-review" style={{ fontSize: '0.7rem' }}>
                      {inc.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-secondary btn-sm"
                      onClick={() => setSelectedIncident(inc)}
                    >
                      <Eye size={13} />
                      Inspect Forensic Trace
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Forensic Inspection Modal / Side Drawer */}
      {selectedIncident && (
        <div className="modal-overlay" onClick={() => setSelectedIncident(null)}>
          <div className="modal-content" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge badge-fail" style={{ marginBottom: '0.4rem' }}>
                  Forensic Intelligence Dossier • {selectedIncident.id}
                </span>
                <h2 style={{ fontSize: '1.35rem' }}>{selectedIncident.threatType.replace(/_/g, ' ')}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Target Application: {selectedIncident.applicationId} • Applicant: {selectedIncident.applicantName}
                </p>
              </div>

              <button className="btn-secondary btn-sm" onClick={() => setSelectedIncident(null)}>
                Close
              </button>
            </div>

            {/* Incident Summary Card */}
            <div style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid var(--danger-border)',
              marginBottom: '1.5rem'
            }}>
              <strong style={{ color: '#fff', fontSize: '0.9rem' }}>Forensic Anomaly Finding:</strong>
              <p style={{ fontSize: '0.85rem', color: '#fca5a5', marginTop: '0.35rem', lineHeight: '1.5' }}>
                {selectedIncident.description}
              </p>
            </div>

            {/* Evidence Vector Comparison */}
            <h3 style={{ fontSize: '0.98rem', marginBottom: '0.75rem' }}>Cross-Registry Evidence Comparison:</h3>
            <div className="table-container" style={{ marginBottom: '1.5rem' }}>
              <table className="gov-table" style={{ fontSize: '0.82rem' }}>
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Submitted / Discovered Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(selectedIncident.evidenceVector).map(([key, val]) => (
                    <tr key={key}>
                      <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                        {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                      </td>
                      <td><span className="mono">{String(val)}</span></td>
                      <td>
                        {String(val).includes('NO_RECORD') || String(val).includes('MISMATCH') || String(val).includes('AUDIT_FLAGGED') ? (
                          <span className="badge badge-fail">ALERT</span>
                        ) : (
                          <span className="badge badge-pass">DISCOVERED</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Authorized Action Controls */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <button 
                className="btn-danger"
                onClick={() => {
                  alert(`Application ${selectedIncident.applicationId} has been placed on Statutory Vigilance Freeze. Cross-ministry alert broadcasted.`);
                  setSelectedIncident(null);
                }}
              >
                <Lock size={14} />
                Enforce Statutory Freeze
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  alert(`Summons & clarification notice dispatched to ${selectedIncident.applicantName}.`);
                  setSelectedIncident(null);
                }}
              >
                Issue Clarification Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

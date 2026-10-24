import React, { useState } from 'react';
import { History, ShieldCheck, Search, Filter, Download, UserCheck, Cpu, Database, AlertCircle, CheckCircle2 } from 'lucide-react';
import { exportToExcel } from '../utils/excelHelper';

export function AuditHistoryView({ logs = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.portal.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity = filterSeverity === 'ALL' || log.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const handleExportLogs = () => {
    exportToExcel(filteredLogs, 'GovVerify_Page17_AuditHistory_Ledger.xlsx', 'AuditTrail');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Header section */}
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
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            fontSize: '0.75rem',
            color: 'var(--primary-light)',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}>
            <ShieldCheck size={14} />
            Cryptographically Sealed Activity Ledger
          </div>
          <h1 style={{ fontSize: '1.75rem' }}>System Audit History & Traceability</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Complete tamper-evident log of application uploads, AI dataset queries, findings resolutions, and authorized decisions.
          </p>
        </div>

        <button className="btn-secondary" onClick={handleExportLogs}>
          <Download size={16} />
          Export Audit Trail (Excel)
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
          <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search by Actor, Action, Application ID, or Ministry..."
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
            <option value="INFO">Info</option>
            <option value="SUCCESS">Success</option>
            <option value="WARNING">Warning</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div className="table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Timestamp (ISO)</th>
                <th>Actor & Credential</th>
                <th>Portal / System</th>
                <th>Action Category</th>
                <th>Operational Details</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No audit log records match the current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  let actorIcon = <UserCheck size={14} color="#818cf8" />;
                  if (log.actor.includes('AI') || log.portal.includes('AI')) {
                    actorIcon = <Cpu size={14} color="#38bdf8" />;
                  } else if (log.portal.includes('Ministry')) {
                    actorIcon = <Database size={14} color="#34d399" />;
                  }

                  return (
                    <tr key={log.id}>
                      <td className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                        {log.timestamp}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {actorIcon}
                          <strong>{log.actor}</strong>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-neutral">{log.portal}</span>
                      </td>
                      <td>
                        <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--primary-light)', fontWeight: 600 }}>
                          {log.action}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-primary)', maxWidth: '400px' }}>
                        {log.details}
                      </td>
                      <td>
                        {log.severity === 'SUCCESS' && <span className="badge badge-success">SUCCESS</span>}
                        {log.severity === 'INFO' && <span className="badge badge-info">INFO</span>}
                        {log.severity === 'WARNING' && <span className="badge badge-warning">WARNING</span>}
                        {log.severity === 'CRITICAL' && <span className="badge badge-critical">CRITICAL</span>}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

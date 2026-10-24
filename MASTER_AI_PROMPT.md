# SMART INDIA HACKATHON (SIH) - TOPIC 5: AI-POWERED REGULATORY COMPLIANCE & CROSS-MINISTRY DOCUMENT VERIFICATION PLATFORM

---

## 1. DUAL PORTAL ACCESS ARCHITECTURE (Matching Official Flow)

```
                       [ 1st Page: Secure Login ]
                                   │
                 ┌─────────────────┴─────────────────┐
                 ▼                                   ▼
        [ Admin Portal Entry ]             [ Ministry Portal Entry ]
        - Central Oversight                Authorized Ministry Tenants (UIDAI, CBDT, MoE, MCA)
        - Send Application (Excel)                   │
        - Dynamic Multi-DB AI Engine                 ├─────────────────────────┐
        - Page 3: Live Telemetry                     ▼                         ▼
        - Page 4: Fraud Intelligence            [ Admin ]                  [ Staff ]
        - Page 5: Compliance Rule Studio   • Multi-Dataset Manager    • See database (Read-only)
        - Page 16: Verification Report     • Create Named Datasets    • Upload application (Any Schema)
        - Immutable Audit Log              • Save/Upload Excel/DS     • Export Excel copies
        - Add Admin & Add Ministry         • Custom Application Form  • View Ingested Applications
                                           • No-Format Excel Ingestion
```

---

## 2. PART 1: MASTER AI SYSTEM PROMPT (For Central Verification Engine)

```markdown
You are "GovVerify AI" — an enterprise-grade, deterministic, and security-hardened Autonomous Regulatory Compliance and Cross-Ministry Document Verification Engine built for authorized government reviewers.

### CORE OBJECTIVES
1. Validate incoming submitted applications for schema completeness, format integrity, and document authenticity.
2. Maintain and query a Central Dataset Registry across authorized Ministry registries (UIDAI/Aadhaar, CBDT/PAN, MoE/NAD Academic Records, MCA/DIN, etc.) WITHOUT relying on manually hardcoded lists.
3. Generate a formal Dynamic Verification Plan before executing any checks, detailing fields to validate, candidate datasets selected with rationales, applicable statutory rules, and access control permissions.
4. Execute deterministic multi-entity cross-checks, phonetic matching, and duplicate/tamper scans without hallucinating imaginary regulations or treating missing data as definitive fraud.
5. Support Automatic Check Expansion (e.g., elevated income triggers corporate directorship conflict scans).
6. Produce a consolidated, evidence-based verification report (Page 16) with full source attribution, freshness timestamps, adapter tags, and reviewer sign-off actions.

---

### ROLE & BOUNDARIES
- STRICT COMPLIANCE: Evaluate only against rules and dataset schemas explicitly registered by authorized administrators.
- NEVER HALLUCINATE: If a document cannot be matched or a ministry dataset is offline/missing, mark status as "NO_MATCHING_RECORD", "SOURCE_UNAVAILABLE", or "MANUAL_REVIEW_REQUIRED". Never invent registry records or fake compliance regulations.
- DATA SECURITY: Handle PII with masking protocols (e.g., Aadhaar: `XXXX-XXXX-1234`, PAN: `ABCDE****F`).

---

### 9-PILLAR ADVANCED ENGINE SPECIFICATION

#### 1. Central Dataset Registry
- Maintains metadata: Dataset name, owning ministry, available fields, purpose, sensitivity (PUBLIC, RESTRICTED, CONFIDENTIAL), supported search keys, and active data-sharing agreements.
- Automatically registered upon valid Excel/CSV uploads in the Ministry Portal.

#### 2. AI-Based Dynamic Dataset Selection
- Analyzes submitted application fields (e.g., Aadhaar, PAN, Roll No, Income) and queries the Central Registry dynamically.
- No hardcoded lists. Selection rationale is transparently recorded.

#### 3. Dynamic Verification Planning
- Generates a pre-execution verification plan containing:
  * Fields to validate (with statutory priority: CRITICAL, HIGH, MEDIUM).
  * Selected datasets and technical rationale.
  * Applicable legal compliance rules.
  * Data-sharing agreement permission check.
  * Skipped/infeasible checks and legal justifications.

#### 4. Central Cross-Database Query Engine
- Normalizes search keys (cleans whitespace, casing, formats).
- Phonetic matching using Levenshtein/Jaro-Winkler distance >= 80%.
- Evaluates: exact values, reasonable variations, missing records, conflicts, and stale data.
- Missing data is marked as "NO_MATCHING_RECORD", not assumed fraud.

#### 5. Evidence and Results Schema
Each verification finding records:
- `applicationId`: Application under check
- `field`: Field verified
- `verificationType`: Statutory classification
- `sourceDatasetId` & `owningMinistry`: Exact source attribution
- `submittedValue` vs `referenceValue`: Masked for privacy
- `matchConfidence`: 0 - 100%
- `status`: [PASSED | MISMATCH_DETECTED | MISSING_INFORMATION | NO_MATCHING_RECORD | SOURCE_UNAVAILABLE | EXTERNAL_VERIFICATION_PENDING | MANUAL_REVIEW_REQUIRED]
- `sourceFreshness`: Timestamp of reference partition
- `adapterType`: `GOV_SECURE_API_ADAPTER` | `DIGILOCKER_NAD_ADAPTER` | `MINISTRY_UPLOADED_LEDGER`
- `requiredReviewerAction`: Recommended human action

#### 6. Automatic Check Expansion
- Detects secondary triggers (e.g., High declared income >= ₹10L in commercial grants triggers MCA Director Scan).
- Proposes expansion checks with authorization checks before execution.

#### 7. Ministry & Admin Access Controls
- Enforces DPDP Act 2023 principles and cross-ministry data-sharing agreements.
- If sharing agreement is inactive, the check is skipped and clearly logged.

#### 8. Truthful Government API Integration
- Uses official APIs when configured or transparent mock adapters. Never fabricates an API response.

#### 9. Human Review & Audit Trail
- AI findings are advisory. Reviewers record final authorized decisions (Approve, Reject, Clarify).
- Every event is permanently committed to Page 17 Audit Ledger.
```

---

## 3. PART 2: WEB APPLICATION BLUEPRINT

### Page 1: Login Portal (Unified Split-Screen / Tabbed UI)
- Toggle: `[Admin Portal]` vs `[Ministry Portal]`.
- Under Ministry Portal:
  - Role Selector:
    * **Ministry Admin**: Permissions to *Create & settle database* (via Excel upload or manual entry) and *Upload application*.
    * **Ministry Staff**: Permissions to *See database* (read-only view) and *Upload application*.
- Direct login without public sign-up.

### Page 2: Admin Dashboard
- Metrics: Total Applications, Verified, Needs Review, Flagged Impersonation.
- Quick Queue Table with direct `[AI Plan]` preview and `[Page 16 Report]` access.
- Actions: "Add Another Admin" and "Add Ministry".

### Central Dataset Registry (Feature 1 Tab)
- Catalog of authorized federated datasets (UIDAI, CBDT, MoE, MCA).
- Displays schema columns, data sensitivity, supported search keys, and sharing agreement status.

### Page 3: Live AI Verification Telemetry & Pipeline Operations
- Real-time query throughput, P99 latency KPI cards, and cache hit rate.
- End-to-End Pipeline Execution Topology diagram (6 deterministic stages with timing).
- Federated Ministry API Adapter health board (UIDAI, CBDT, MoE, MCA — uptime, protocol, TPS).
- Live Query Streaming Bus: microsecond-resolution event trace log with auto-scroll.
- Pause / Resume stream control.

### Page 4: Cross-Ministry Fraud & Synthetic Identity Intelligence Hub
- Threat metric cards: Active fraud vectors, Synthetic Aadhaar collisions, Phonetic spoofing, Prevented fiscal leakage.
- Incidents table with risk score bar, threat classification badges, and conflicting ministry tags.
- Forensic Inspection Dossier modal: full evidence vector comparison table per incident.
- Enforce Statutory Freeze and Issue Clarification Notice authorized actions.
- Export Intelligence Dossier to Excel.

### Page 5: Statutory Compliance Rule Studio & Simulation Sandbox
- Interactive Policy Simulation Sandbox: select any applicant and run deterministic rule evaluation.
- Simulation output table with verdict (Pass/Fail/Needs Review/N/A) and justification per rule.
- Active Statutory Compliance Registry table with strictness and statute reference.
- Create Statutory Rule modal: code, name, statute reference, description, category, strictness.

### Page 16: Consolidated Verification Report
- Application summary and identity card.
- Multi-Entity Field Reconciliation Table conforming to Feature 5 evidence standards (status, confidence, source freshness, adapter type, next action).
- Regulatory compliance evaluations (Pass, Fail, Needs Review, N/A, Unable to Verify).
- Anomaly and tampering alerts.
- Final reviewer decision commit (Approve, Reject, Escalate).
- PDF download & Excel export.

### Immutable Audit History
- Cryptographically sealed, tamper-evident log capturing:
  * Who uploaded the application.
  * Who updated or imported reference datasets.
  * Which datasets the AI discovered and queried.
  * Who resolved findings and committed final decisions.
  * Full search, filter by severity, and Excel export.

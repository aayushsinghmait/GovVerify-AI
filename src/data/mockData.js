// Mock Initial Datasets for Cross-Ministry Verification

export const INITIAL_MINISTRIES = [
  {
    id: 'min-uidai',
    code: 'UIDAI',
    name: 'Unique Identification Authority of India (MeitY)',
    category: 'Identity & Biometrics',
    icon: 'ShieldCheck',
    adminEmail: 'admin@uidai.gov.in',
    status: 'ACTIVE',
    recordsCount: 4,
    lastSync: '2026-10-23 18:30:00'
  },
  {
    id: 'min-cbdt',
    code: 'CBDT',
    name: 'Central Board of Direct Taxes (Ministry of Finance)',
    category: 'Taxation & Financial Integrity',
    icon: 'CreditCard',
    adminEmail: 'compliance@incometax.gov.in',
    status: 'ACTIVE',
    recordsCount: 4,
    lastSync: '2026-10-23 17:15:00'
  },
  {
    id: 'min-moe',
    code: 'MoE',
    name: 'Ministry of Education (NAD / DigiLocker Registry)',
    category: 'Educational Credentials',
    icon: 'GraduationCap',
    adminEmail: 'verify@nad.gov.in',
    status: 'ACTIVE',
    recordsCount: 3,
    lastSync: '2026-10-23 16:45:00'
  },
  {
    id: 'min-mca',
    code: 'MCA',
    name: 'Ministry of Corporate Affairs',
    category: 'Corporate Registry & DIN',
    icon: 'Briefcase',
    adminEmail: 'registrar@mca.gov.in',
    status: 'ACTIVE',
    recordsCount: 2,
    lastSync: '2026-10-23 14:00:00'
  }
];

export const INITIAL_DATASET_REGISTRY = [
  {
    datasetId: 'DS-UIDAI-AADHAAR',
    name: 'National Aadhaar Demographic & Biometric Registry',
    owningMinistry: 'Unique Identification Authority of India (MeitY)',
    ministryCode: 'UIDAI',
    category: 'IDENTITY',
    sensitivity: 'RESTRICTED',
    purpose: 'Statutory citizen identity and demographic verification under Aadhaar Act 2016.',
    supportedSearchKeys: ['aadhaar_no'],
    sharingAgreementActive: true,
    permittedUseCases: ['IDENTITY_VERIFICATION', 'CITIZEN_GRANT_VALIDATION', 'BENEFICIARY_AUTHENTICATION'],
    availableFields: [
      { field: 'aadhaar_no', type: 'STRING', description: '12-digit UID token' },
      { field: 'full_name', type: 'STRING', description: 'Legal name in official records' },
      { field: 'dob', type: 'DATE', description: 'Date of birth (YYYY-MM-DD)' },
      { field: 'gender', type: 'STRING', description: 'Gender identity' },
      { field: 'father_name', type: 'STRING', description: 'Father / Guardian legal name' },
      { field: 'state', type: 'STRING', description: 'Registered domicile state' },
      { field: 'pin_code', type: 'STRING', description: 'Postal area PIN code' },
      { field: 'biometric_status', type: 'ENUM', description: 'Biometric capture verification status' }
    ],
    adapterType: 'GOV_SECURE_API_ADAPTER',
    lastUpdated: '2026-10-23 18:30:00'
  },
  {
    datasetId: 'DS-CBDT-PAN-ITR',
    name: 'Direct Tax PAN Linkage & Annual Return Ledger',
    owningMinistry: 'Central Board of Direct Taxes (Ministry of Finance)',
    ministryCode: 'CBDT',
    category: 'TAXATION',
    sensitivity: 'CONFIDENTIAL',
    purpose: 'Income validation, tax compliance and PAN-Aadhaar linkage check under Section 139AA.',
    supportedSearchKeys: ['pan_no', 'aadhaar_no'],
    sharingAgreementActive: true,
    permittedUseCases: ['INCOME_ELIGIBILITY', 'TAX_FRAUD_PREVENTION', 'FINANCIAL_COMPLIANCE'],
    availableFields: [
      { field: 'pan_no', type: 'STRING', description: 'Permanent Account Number (10 chars)' },
      { field: 'full_name', type: 'STRING', description: 'Assessee legal name' },
      { field: 'dob', type: 'DATE', description: 'Assessee birth date' },
      { field: 'aadhaar_linked', type: 'STRING', description: 'Linked Aadhaar number in CBDT core' },
      { field: 'income_slab', type: 'STRING', description: 'Assessed gross annual income tier' },
      { field: 'itr_status', type: 'ENUM', description: 'ITR filing and audit status' }
    ],
    adapterType: 'GOV_SECURE_API_ADAPTER',
    lastUpdated: '2026-10-23 17:15:00'
  },
  {
    datasetId: 'DS-MOE-NAD',
    name: 'National Academic Depository (NAD / DigiLocker)',
    owningMinistry: 'Ministry of Education (MoE)',
    ministryCode: 'MoE',
    category: 'EDUCATION',
    sensitivity: 'PUBLIC_RESTRICTED',
    purpose: 'Verification of recognized university degrees and diplomas for scholarship schemes.',
    supportedSearchKeys: ['roll_no'],
    sharingAgreementActive: true,
    permittedUseCases: ['ACADEMIC_ELIGIBILITY', 'SCHOLARSHIP_VALIDATION'],
    availableFields: [
      { field: 'roll_no', type: 'STRING', description: 'University examination enrollment/roll number' },
      { field: 'degree', type: 'STRING', description: 'Awarded academic qualification' },
      { field: 'university', type: 'STRING', description: 'Issuing university/board' },
      { field: 'student_name', type: 'STRING', description: 'Student name on degree scroll' },
      { field: 'passing_year', type: 'STRING', description: 'Year of graduation' },
      { field: 'cgpa', type: 'STRING', description: 'Cumulative grade points' }
    ],
    adapterType: 'DIGILOCKER_NAD_ADAPTER',
    lastUpdated: '2026-10-23 16:45:00'
  },
  {
    datasetId: 'DS-MCA-DIN',
    name: 'MCA Corporate Director & Entity Master',
    owningMinistry: 'Ministry of Corporate Affairs (MCA)',
    ministryCode: 'MCA',
    category: 'CORPORATE',
    sensitivity: 'PUBLIC',
    purpose: 'Cross-verification of commercial interests, DIN numbers, and active directorships.',
    supportedSearchKeys: ['din_no', 'pan_no'],
    sharingAgreementActive: true,
    permittedUseCases: ['COMMERCIAL_CONFLICT_CHECK', 'STARTUP_SUBSIDY_VALIDATION'],
    availableFields: [
      { field: 'din_no', type: 'STRING', description: 'Director Identification Number (8 digits)' },
      { field: 'director_name', type: 'STRING', description: 'Registered director name' },
      { field: 'company_name', type: 'STRING', description: 'Incorporated company or LLP' },
      { field: 'status', type: 'ENUM', description: 'Director active standing' }
    ],
    adapterType: 'MCA21_PORTAL_ADAPTER',
    lastUpdated: '2026-10-23 14:00:00'
  }
];

export const INITIAL_MINISTRY_DATABASES = {
  UIDAI: [
    {
      aadhaar_no: '9876-5432-1098',
      full_name: 'Rajesh Kumar Sharma',
      dob: '1995-04-12',
      gender: 'Male',
      father_name: 'Harish Chandra Sharma',
      state: 'Uttar Pradesh',
      pin_code: '201301',
      biometric_status: 'VERIFIED',
      status: 'ACTIVE'
    },
    {
      aadhaar_no: '2345-6789-0123',
      full_name: 'Ananya Roy',
      dob: '1998-11-20',
      gender: 'Female',
      father_name: 'Subhash Roy',
      state: 'West Bengal',
      pin_code: '700019',
      biometric_status: 'VERIFIED',
      status: 'ACTIVE'
    },
    {
      aadhaar_no: '9988-7766-5544',
      full_name: 'Ramesh Meena',
      dob: '1991-08-15',
      gender: 'Male',
      father_name: 'Kailash Meena',
      state: 'Rajasthan',
      pin_code: '302001',
      biometric_status: 'VERIFIED',
      status: 'ACTIVE'
    },
    {
      aadhaar_no: '5544-3322-1100',
      full_name: 'Priya Sharma',
      dob: '1996-02-14',
      gender: 'Female',
      father_name: 'Mahesh Sharma',
      state: 'Delhi',
      pin_code: '110001',
      biometric_status: 'VERIFIED',
      status: 'ACTIVE'
    }
  ],
  CBDT: [
    {
      pan_no: 'ABCDE1234F',
      full_name: 'Rajesh Kumar Sharma',
      dob: '1995-04-12',
      aadhaar_linked: '9876-5432-1098',
      income_slab: '10L - 15L',
      itr_status: 'FILED_FY25',
      status: 'VALID'
    },
    {
      pan_no: 'BKAPR4321Q',
      full_name: 'Ananya Roy',
      dob: '1998-11-20',
      aadhaar_linked: '2345-6789-0123',
      income_slab: '5L - 7L',
      itr_status: 'FILED_FY25',
      status: 'VALID'
    },
    {
      pan_no: 'XYZPS9876K',
      full_name: 'Vikram Singh',
      dob: '1993-06-10',
      aadhaar_linked: '4455-6677-8899',
      income_slab: '3L - 5L',
      itr_status: 'PENDING',
      status: 'VALID'
    },
    {
      pan_no: 'PQRSS6543M',
      full_name: 'Priya Sharma',
      dob: '1996-02-14',
      aadhaar_linked: '5544-3322-1100',
      income_slab: '25L - 50L',
      itr_status: 'AUDIT_FLAGGED',
      status: 'UNDER_INVESTIGATION'
    }
  ],
  MoE: [
    {
      roll_no: '2016-BTECH-098',
      degree: 'B.Tech Computer Science',
      university: 'Delhi Technological University',
      student_name: 'Rajesh Kumar Sharma',
      passing_year: '2020',
      cgpa: '8.8',
      status: 'AUTHENTIC'
    },
    {
      roll_no: '2019-BCOM-441',
      degree: 'B.Com Honours',
      university: 'Calcutta University',
      student_name: 'Ananya Roy',
      passing_year: '2022',
      cgpa: '7.9',
      status: 'AUTHENTIC'
    },
    {
      roll_no: '2015-BSC-112',
      degree: 'B.Sc Physics',
      university: 'Rajasthan University',
      student_name: 'Vikram Singh',
      passing_year: '2018',
      cgpa: '6.4',
      status: 'AUTHENTIC'
    }
  ],
  MCA: [
    {
      din_no: 'DIN09876543',
      director_name: 'Rajesh Kumar Sharma',
      company_name: 'Sharma Tech Innovations Pvt Ltd',
      status: 'ACTIVE_DIRECTOR'
    },
    {
      din_no: 'DIN01234567',
      director_name: 'Priya Sharma',
      company_name: 'Apex Horizon Capital LLP',
      status: 'ACTIVE_DIRECTOR'
    }
  ]
};

export const INITIAL_NAMED_DATASETS = {
  UIDAI: [
    {
      id: 'DS-UIDAI-001',
      name: 'Aadhaar Core Registry 2026',
      uploadedAt: '2026-10-23 18:30:00',
      source: 'Aadhaar_National_Master.xlsx',
      description: 'Master biometric and demographic citizen identity records.',
      columns: ['aadhaar_no', 'full_name', 'dob', 'gender', 'father_name', 'state', 'pin_code'],
      records: [
        {
          aadhaar_no: '9876-5432-1098',
          full_name: 'Rajesh Kumar Sharma',
          dob: '1995-04-12',
          gender: 'Male',
          father_name: 'Harish Chandra Sharma',
          state: 'Uttar Pradesh',
          pin_code: '201301',
          biometric_status: 'VERIFIED',
          status: 'ACTIVE'
        },
        {
          aadhaar_no: '2345-6789-0123',
          full_name: 'Ananya Roy',
          dob: '1998-11-20',
          gender: 'Female',
          father_name: 'Subhash Roy',
          state: 'West Bengal',
          pin_code: '700019',
          biometric_status: 'VERIFIED',
          status: 'ACTIVE'
        },
        {
          aadhaar_no: '9988-7766-5544',
          full_name: 'Ramesh Meena',
          dob: '1991-08-15',
          gender: 'Male',
          father_name: 'Kailash Meena',
          state: 'Rajasthan',
          pin_code: '302001',
          biometric_status: 'VERIFIED',
          status: 'ACTIVE'
        },
        {
          aadhaar_no: '5544-3322-1100',
          full_name: 'Priya Sharma',
          dob: '1996-02-14',
          gender: 'Female',
          father_name: 'Mahesh Sharma',
          state: 'Delhi',
          pin_code: '110001',
          biometric_status: 'VERIFIED',
          status: 'ACTIVE'
        }
      ]
    }
  ],
  CBDT: [
    {
      id: 'DS-CBDT-001',
      name: 'PAN-ITR Ledger FY2025-26',
      uploadedAt: '2026-10-23 17:15:00',
      source: 'CBDT_ITR_Returns_2026.xlsx',
      description: 'Assessed direct tax filings, income brackets, and Aadhaar links.',
      columns: ['pan_no', 'full_name', 'dob', 'aadhaar_linked', 'income_slab', 'itr_status'],
      records: [
        {
          pan_no: 'ABCDE1234F',
          full_name: 'Rajesh Kumar Sharma',
          dob: '1995-04-12',
          aadhaar_linked: '9876-5432-1098',
          income_slab: '10L - 15L',
          itr_status: 'FILED_FY25',
          status: 'VALID'
        },
        {
          pan_no: 'BKAPR4321Q',
          full_name: 'Ananya Roy',
          dob: '1998-11-20',
          aadhaar_linked: '2345-6789-0123',
          income_slab: '5L - 7L',
          itr_status: 'FILED_FY25',
          status: 'VALID'
        },
        {
          pan_no: 'XYZPS9876K',
          full_name: 'Vikram Singh',
          dob: '1993-06-10',
          aadhaar_linked: '4455-6677-8899',
          income_slab: '3L - 5L',
          itr_status: 'PENDING',
          status: 'VALID'
        },
        {
          pan_no: 'PQRSS6543M',
          full_name: 'Priya Sharma',
          dob: '1996-02-14',
          aadhaar_linked: '5544-3322-1100',
          income_slab: '25L - 50L',
          itr_status: 'AUDIT_FLAGGED',
          status: 'UNDER_INVESTIGATION'
        }
      ]
    }
  ],
  MoE: [
    {
      id: 'DS-MOE-001',
      name: 'NAD Academic Depository 2026',
      uploadedAt: '2026-10-23 16:45:00',
      source: 'MoE_NAD_DigiLocker_Batch.xlsx',
      description: 'University degrees, passing credentials, and grade transcripts.',
      columns: ['roll_no', 'student_name', 'degree', 'university', 'passing_year', 'cgpa'],
      records: [
        {
          roll_no: '2016-BTECH-098',
          degree: 'B.Tech Computer Science',
          university: 'Delhi Technological University',
          student_name: 'Rajesh Kumar Sharma',
          passing_year: '2020',
          cgpa: '8.8',
          status: 'AUTHENTIC'
        },
        {
          roll_no: '2019-BCOM-441',
          degree: 'B.Com Honours',
          university: 'Calcutta University',
          student_name: 'Ananya Roy',
          passing_year: '2022',
          cgpa: '7.9',
          status: 'AUTHENTIC'
        },
        {
          roll_no: '2015-BSC-112',
          degree: 'B.Sc Physics',
          university: 'Rajasthan University',
          student_name: 'Vikram Singh',
          passing_year: '2018',
          cgpa: '6.4',
          status: 'AUTHENTIC'
        }
      ]
    }
  ],
  MCA: [
    {
      id: 'DS-MCA-001',
      name: 'MCA21 Director Registry 2026',
      uploadedAt: '2026-10-23 14:00:00',
      source: 'MCA21_Corporate_Registry.xlsx',
      description: 'Active DIN holders and incorporated corporate entities.',
      columns: ['din_no', 'director_name', 'company_name'],
      records: [
        {
          din_no: 'DIN09876543',
          director_name: 'Rajesh Kumar Sharma',
          company_name: 'Sharma Tech Innovations Pvt Ltd',
          status: 'ACTIVE_DIRECTOR'
        },
        {
          din_no: 'DIN01234567',
          director_name: 'Priya Sharma',
          company_name: 'Apex Horizon Capital LLP',
          status: 'ACTIVE_DIRECTOR'
        }
      ]
    }
  ]
};

export const INITIAL_APPLICATIONS = [
  {
    id: 'APP-2026-901',
    scheme_name: 'National Innovation Startup Subsidy Grant',
    applicant_name: 'Rajesh Kumar Sharma',
    dob: '1995-04-12',
    gender: 'Male',
    father_name: 'Harish Chandra Sharma',
    aadhaar_no: '9876-5432-1098',
    pan_no: 'ABCDE1234F',
    education_roll: '2016-BTECH-098',
    claimed_income: '12,50,000',
    state: 'Uttar Pradesh',
    pin_code: '201301',
    status: 'VERIFIED',
    ai_verdict: 'PASS',
    confidence_score: 98,
    submitted_at: '2026-10-23 10:14:00'
  },
  {
    id: 'APP-2026-902',
    scheme_name: 'Women Tech Entrepreneur Fellowship',
    applicant_name: 'Ananya Ray',
    dob: '1998-11-20',
    gender: 'Female',
    father_name: 'Subhash Roy',
    aadhaar_no: '2345-6789-0123',
    pan_no: 'BKAPR4321Q',
    education_roll: '2019-BCOM-441',
    claimed_income: '6,20,000',
    state: 'West Bengal',
    pin_code: '700019',
    status: 'NEEDS_REVIEW',
    ai_verdict: 'NEEDS_REVIEW',
    confidence_score: 87,
    submitted_at: '2026-10-23 11:32:00'
  },
  {
    id: 'APP-2026-903',
    scheme_name: 'National Solar Equipment Manufacturing Grant',
    applicant_name: 'Vikram Singh',
    dob: '1993-06-10',
    gender: 'Male',
    father_name: 'Baldev Singh',
    aadhaar_no: '9988-7766-5544',
    pan_no: 'XYZPS9876K',
    education_roll: '2015-BSC-112',
    claimed_income: '4,00,000',
    state: 'Rajasthan',
    pin_code: '302001',
    status: 'FLAGGED',
    ai_verdict: 'FAIL',
    confidence_score: 34,
    submitted_at: '2026-10-23 13:45:00'
  },
  {
    id: 'APP-2026-904',
    scheme_name: 'High-Tech Export Credit Incentive',
    applicant_name: 'Priya Sharma',
    dob: '1996-02-14',
    gender: 'Female',
    father_name: 'Mahesh Sharma',
    aadhaar_no: '5544-3322-1100',
    pan_no: 'PQRSS6543M',
    education_roll: '',
    claimed_income: '8,00,000',
    state: 'Delhi',
    pin_code: '110001',
    status: 'NEEDS_REVIEW',
    ai_verdict: 'NEEDS_REVIEW',
    confidence_score: 65,
    submitted_at: '2026-10-23 15:20:00'
  }
];

export const INITIAL_COMPLIANCE_RULES = [
  {
    id: 'RULE-01',
    code: 'SEC_AADHAAR_MATCH',
    name: 'Aadhaar Identity & Biometric Integrity',
    description: 'Applicant Aadhaar number must exist in UIDAI database and applicant name must match within phonetic threshold (>=88%).',
    category: 'IDENTITY',
    strictness: 'HIGH',
    defaultStatus: 'Pass'
  },
  {
    id: 'RULE-02',
    code: 'FIN_PAN_LINKAGE',
    name: 'PAN-Aadhaar Tax Compliance Linkage',
    description: 'Submitted PAN must be officially linked with submitted Aadhaar in CBDT records.',
    category: 'TAXATION',
    strictness: 'CRITICAL',
    defaultStatus: 'Pass'
  },
  {
    id: 'RULE-03',
    code: 'INC_BRACKET_VERIFY',
    name: 'Income Slab Eligibility Check',
    description: 'Claimed annual income in application must not exceed eligible scheme bracket without audit clearance.',
    category: 'ELIGIBILITY',
    strictness: 'MEDIUM',
    defaultStatus: 'Pass'
  },
  {
    id: 'RULE-04',
    code: 'EDU_CRED_AUTHENTICITY',
    name: 'Academic Degree NAD Cross-Verification',
    description: 'If educational degree is claimed, university roll number must be authentic in DigiLocker/MoE registry.',
    category: 'ACADEMIC',
    strictness: 'MEDIUM',
    defaultStatus: 'Pass'
  },
  {
    id: 'RULE-05',
    code: 'GEO_JURISDICTION_SANITY',
    name: 'Postal Pin Code & State Alignment',
    description: 'Pin code must correspond to applicant declared State without spatial conflict.',
    category: 'GEOGRAPHY',
    strictness: 'LOW',
    defaultStatus: 'Pass'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'AUDIT-8901',
    timestamp: '2026-10-23 10:14:22',
    actor: 'SuperAdmin (ADM-01)',
    portal: 'Admin Portal',
    action: 'APPLICATION_BATCH_UPLOAD',
    details: 'Uploaded batch Excel [Batch_Q3_Startups.xlsx] containing 4 applications.',
    severity: 'INFO'
  },
  {
    id: 'AUDIT-8902',
    timestamp: '2026-10-23 10:15:05',
    actor: 'GovVerify AI Engine v2.4',
    portal: 'Automated AI Engine',
    action: 'AI_CROSS_VERIFY_EXEC',
    details: 'Cross-queried 4 datasets: UIDAI, CBDT, MoE, MCA. Generated 1 Pass, 2 Review, 1 Fail.',
    severity: 'SUCCESS'
  },
  {
    id: 'AUDIT-8903',
    timestamp: '2026-10-23 11:45:10',
    actor: 'UIDAI_Officer (STF-102)',
    portal: 'Ministry Portal (UIDAI)',
    action: 'DATABASE_IMPORT_EXCEL',
    details: 'Imported updated Aadhaar ledger batch [UIDAI_Oct_NorthZone.xlsx] (500 records).',
    severity: 'WARNING'
  },
  {
    id: 'AUDIT-8904',
    timestamp: '2026-10-23 14:10:33',
    actor: 'Reviewer (ADM-04)',
    portal: 'Admin Portal',
    action: 'REPORT_EXPORTED_PDF',
    details: 'Downloaded official Verification Certificate for APP-2026-901.',
    severity: 'INFO'
  },
  {
    id: 'AUDIT-8905',
    timestamp: '2026-10-23 15:40:12',
    actor: 'SuperAdmin (ADM-01)',
    portal: 'Admin Portal',
    action: 'CRITICAL_DISCREPANCY_FLAG',
    details: 'Flagged Application APP-2026-903 (Vikram Singh) for Identity Impersonation (Aadhaar assigned to Ramesh Meena).',
    severity: 'CRITICAL'
  }
];

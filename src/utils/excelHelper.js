import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

/**
 * Parse an uploaded Excel or CSV file into JSON array
 * @param {File} file 
 * @returns {Promise<Array>}
 */
export function parseExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        resolve(json);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Export data array to an Excel (.xlsx) file
 * @param {Array} data 
 * @param {string} fileName 
 * @param {string} sheetName 
 */
export function exportToExcel(data, fileName = 'Export.xlsx', sheetName = 'Data') {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
}

/**
 * Download sample template for Application Submissions
 */
export function downloadApplicationTemplate() {
  const sampleData = [
    {
      Application_ID: 'APP-2026-905',
      Applicant_Name: 'Suresh Patel',
      Date_of_Birth: '1994-07-25',
      Gender: 'Male',
      Father_Name: 'Ramesh Patel',
      Aadhaar_No: '9876-5432-1098',
      PAN_No: 'ABCDE1234F',
      Education_Roll: '2016-BTECH-098',
      Claimed_Income: '9,50,000',
      State: 'Uttar Pradesh',
      Pin_Code: '201301'
    },
    {
      Application_ID: 'APP-2026-906',
      Applicant_Name: 'Neha Verma',
      Date_of_Birth: '1999-03-18',
      Gender: 'Female',
      Father_Name: 'Ashok Verma',
      Aadhaar_No: '2345-6789-0123',
      PAN_No: 'BKAPR4321Q',
      Education_Roll: '2019-BCOM-441',
      Claimed_Income: '5,00,000',
      State: 'West Bengal',
      Pin_Code: '700019'
    }
  ];
  exportToExcel(sampleData, 'GovVerify_Applications_Batch_Template.xlsx', 'Applications');
}

/**
 * Download sample template for Ministry Reference Dataset Upload
 */
export function downloadMinistryDatasetTemplate(ministryCode = 'UIDAI') {
  let sampleData = [];
  if (ministryCode === 'UIDAI') {
    sampleData = [
      {
        aadhaar_no: '1122-3344-5566',
        full_name: 'Amitabh Sen',
        dob: '1992-05-10',
        gender: 'Male',
        father_name: 'Bimal Sen',
        state: 'Assam',
        pin_code: '781001',
        biometric_status: 'VERIFIED',
        status: 'ACTIVE'
      }
    ];
  } else if (ministryCode === 'CBDT') {
    sampleData = [
      {
        pan_no: 'XYZAB9988C',
        full_name: 'Amitabh Sen',
        dob: '1992-05-10',
        aadhaar_linked: '1122-3344-5566',
        income_slab: '8L - 10L',
        itr_status: 'FILED_FY25',
        status: 'VALID'
      }
    ];
  } else {
    sampleData = [
      {
        record_id: 'REC-001',
        entity_name: 'Sample Entity',
        reference_id: 'REF-9988',
        issue_date: '2025-01-01',
        status: 'VALID'
      }
    ];
  }
  exportToExcel(sampleData, `${ministryCode}_Reference_Dataset_Template.xlsx`, 'RegistryData');
}

/**
 * Download blank Excel template with custom user-defined columns
 * @param {Array<string>} columns 
 * @param {string} datasetName 
 */
export function downloadCustomDatasetTemplate(columns = ['Name', 'House_No', 'Counthouse'], datasetName = 'CustomDataset') {
  const sampleRow = {};
  columns.forEach(col => {
    sampleRow[col] = '';
  });
  const cleanName = datasetName.replace(/[^a-zA-Z0-9_-]/g, '_');
  exportToExcel([sampleRow], `${cleanName}_Template.xlsx`, 'DatasetTemplate');
}

/**
 * Generate official Page 16 PDF Verification Certificate
 */
export function generateVerificationPDF(report, application) {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(15, 23, 42); // Dark slate
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('GOVERNMENT OF INDIA - REGULATORY VERIFICATION PLATFORM', 15, 18);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Smart India Hackathon 2026 - Problem SIH26261 Consolidated Audit Report', 15, 26);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 15, 33);

  // Status Badge
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`APPLICATION VERIFICATION REPORT: #${report.applicationId}`, 15, 52);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Applicant Name: ${report.applicantName}`, 15, 62);
  doc.text(`Scheme Name: ${application?.scheme_name || 'Central Grant Scheme'}`, 15, 70);
  doc.text(`State / Region: ${application?.state || 'N/A'} (Pin: ${application?.pin_code || 'N/A'})`, 15, 78);
  
  // Score Box
  doc.setFillColor(241, 245, 249);
  doc.rect(135, 45, 60, 38, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text('OVERALL VERDICT', 140, 55);

  if (report.overallVerdict === 'PASS') {
    doc.setTextColor(16, 185, 129); // Green
    doc.setFontSize(18);
    doc.text('PASS', 140, 68);
  } else if (report.overallVerdict === 'FAIL') {
    doc.setTextColor(239, 68, 68); // Red
    doc.setFontSize(18);
    doc.text('FAIL', 140, 68);
  } else {
    doc.setTextColor(245, 158, 11); // Amber
    doc.setFontSize(18);
    doc.text('NEEDS REVIEW', 140, 68);
  }

  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(`AI Confidence: ${report.confidenceScore}%`, 140, 78);

  // Field Reconciliations
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('1. Cross-Ministry Data Reconciliation', 15, 96);

  let y = 106;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Field', 15, y);
  doc.text('Source', 55, y);
  doc.text('Submitted Value', 80, y);
  doc.text('Verified Registry Value', 125, y);
  doc.text('Status', 175, y);
  y += 3;
  doc.line(15, y, 195, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  (report.fieldComparisons || []).forEach(f => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.text(f.field.slice(0, 20), 15, y);
    doc.text(f.sourceMinistry || 'Registry', 55, y);
    doc.text(String(f.submittedValue || '').slice(0, 20), 80, y);
    doc.text(String(f.verifiedValue || '').slice(0, 24), 125, y);
    doc.text(f.matchStatus, 175, y);
    y += 7;
  });

  // Compliance Rules
  y += 5;
  if (y > 240) { doc.addPage(); y = 20; }
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Configured Regulatory Compliance Rules', 15, y);
  y += 8;

  (report.complianceRules || []).forEach(r => {
    if (y > 260) { doc.addPage(); y = 20; }
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`[${r.status}] ${r.name}`, 15, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Evidence: ${r.evidence}`, 20, y);
    doc.setTextColor(15, 23, 42);
    y += 7;
  });

  // Reviewer Recommendation
  y += 5;
  if (y > 250) { doc.addPage(); y = 20; }
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('3. Authorized Reviewer Recommendation:', 15, y);
  y += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Recommended Action: ${report.reviewerRecommendation?.action || 'PENDING'}`, 15, y);
  y += 5;
  doc.text(`Justification: ${report.reviewerRecommendation?.justification || 'N/A'}`, 15, y);

  // Digital Sign line
  y += 18;
  if (y > 270) { doc.addPage(); y = 30; }
  doc.setLineDash([2, 2], 0);
  doc.line(130, y, 195, y);
  doc.setLineDash([], 0);
  doc.setFontSize(8);
  doc.text('Authorized Government Reviewer Signature', 130, y + 5);

  doc.save(`Verification_Report_${report.applicationId}.pdf`);
}

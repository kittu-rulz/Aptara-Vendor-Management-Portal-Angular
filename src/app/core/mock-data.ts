import { signal } from '@angular/core';

// ---- Reports (Analytics & Reports) — all matched to app.js exactly ----

export interface InvoiceReportRow {
  client: string;
  revsys: string;
  project: string;
  budget: string;
  invNo: string;
  invDate: string;
  status: string;
}

export const invoiceReportData: InvoiceReportRow[] = [
  { client: 'Aura Inc', revsys: 'opn00016', project: 'Translation', budget: '650,000 INR', invNo: 'INV-2026-081', invDate: '21/07/2026', status: 'Invoice Approved' },
  { client: 'Core Info LLP', revsys: 'opn00133', project: 'Translate Web Pages', budget: '70,000 INR', invNo: 'INV-2026-084', invDate: '05/08/2026', status: 'Invoice Approved' },
  { client: 'ABZ Corp', revsys: 'opn00183', project: 'Voice Over in English for 10 modules', budget: '700,000 INR', invNo: 'INV-2026-089', invDate: '13/08/2026', status: 'Invoice Approved' },
  { client: 'PQN Inc', revsys: 'opn01019', project: 'Translation of 2 modules', budget: '500,000 INR', invNo: 'INV-2026-092', invDate: '19/08/2026', status: 'Invoice Approved' }
];

export interface ProjectReportRow extends InvoiceReportRow {
  vendor: string;
}

export const projectReportData: ProjectReportRow[] = [
  { client: 'Aura Inc', revsys: 'opn00016', project: 'Translation', vendor: 'SNT Ltd', budget: '650,000 INR', invNo: 'INV-2026-081', invDate: '21/07/2026', status: 'Invoice Approved' },
  { client: 'Core Info LLP', revsys: 'opn00133', project: 'Translate Web Pages', vendor: 'SNT Ltd', budget: '70,000 INR', invNo: 'INV-2026-084', invDate: '05/08/2026', status: 'Invoice Approved' },
  { client: 'ABZ Corp', revsys: 'opn00183', project: 'Voice Over in English for 10 modules', vendor: 'SNT Ltd', budget: '700,000 INR', invNo: 'INV-2026-089', invDate: '13/08/2026', status: 'Invoice Approved' }
];

export interface VendorReportRow {
  customer: string;
  vendor: string;
  code: string;
  invNo: string;
  status: string;
}

export const vendorReportData: VendorReportRow[] = [
  { customer: 'Aura Inc', vendor: 'SNT Ltd', code: '2233', invNo: 'INV-2026-081', status: 'Invoice Approved' },
  { customer: 'Core Info LLP', vendor: 'SNT Ltd', code: '2233', invNo: 'INV-2026-084', status: 'Invoice Approved' },
  { customer: 'ABZ Corp', vendor: 'SNT Ltd', code: '2233', invNo: 'INV-2026-089', status: 'Invoice Approved' },
  { customer: 'PQN Inc', vendor: 'SNT Ltd', code: '2233', invNo: 'INV-2026-092', status: 'Invoice Approved' }
];

export interface StaffingReportRow {
  client: string;
  revsys: string;
  project: string;
  vendor: string;
  budget: string;
  invNo: string;
  invDate: string;
}

export const staffingReportData: StaffingReportRow[] = [
  { client: 'Aura Inc', revsys: 'opn00016', project: 'Translation', vendor: 'SNT Ltd', budget: '650,000 INR', invNo: 'INV-2026-081', invDate: '21/07/2026' },
  { client: 'ABZ Corp', revsys: 'opn00183', project: 'Voice Over in English for 10 modules', vendor: 'SNT Ltd', budget: '700,000 INR', invNo: 'INV-2026-089', invDate: '13/08/2026' }
];

// ---- Masters & Config — all matched to app.js exactly ----

export interface MasterRow {
  [key: string]: string | boolean;
}

export const natureOfServicesData = signal<MasterRow[]>([
  { name: 'eLearning', active: true },
  { name: 'Technology', active: true },
  { name: 'Mobile', active: true },
  { name: 'Translation', active: true },
  { name: 'Audio/Video', active: true },
  { name: 'Publishing', active: true },
  { name: 'Animation', active: true },
  { name: 'Staffing', active: true },
  { name: 'NSP', active: true }
]);

export const serviceExecutedData = signal<MasterRow[]>([
  { service: 'Alfresco', requestType: 'Development', active: true },
  { service: 'Android', requestType: 'Development', active: true },
  { service: 'Apps', requestType: 'Development', active: true },
  { service: 'CSS3/Boot Strap/CSS2', requestType: 'Development', active: true },
  { service: 'Drupal', requestType: 'Development', active: true },
  { service: 'HTML5', requestType: 'Development', active: true },
  { service: 'iOS', requestType: 'Development', active: true },
  { service: 'Java', requestType: 'Development', active: true },
  { service: 'Javascript/jQuery/Angular/Node', requestType: 'Development', active: true },
  { service: 'Joomla', requestType: 'Development', active: true },
  { service: 'LMS Administration', requestType: 'Development', active: true },
  { service: 'MongoDB', requestType: 'Development', active: true },
  { service: 'PHP', requestType: 'Development', active: true },
  { service: 'Python', requestType: 'Development', active: true }
]);

export const orgTypeData = signal<MasterRow[]>([
  { type: 'Proprietary', active: true },
  { type: 'Private Limited Company', active: true },
  { type: 'Public Limited Company', active: true },
  { type: 'Limited Liability Partnership (LLP)', active: true },
  { type: 'One-Person Company', active: true },
  { type: 'Partnership Firm', active: true }
]);

export const gstData = signal<MasterRow[]>([
  { type: 'IGST', active: true },
  { type: 'CGST/ SGST', active: true },
  { type: 'Tax Exempted', active: true },
  { type: 'Not Registered with GST', active: true }
]);

export const outsourceStatusData = signal<MasterRow[]>([
  { status: 'Invoice Approved', active: true },
  { status: 'Invoice Rejected', active: true },
  { status: 'Invoice Pending for Approval', active: true },
  { status: 'Invoice Pending from DM', active: true },
  { status: 'Invoice Pending from PM', active: true },
  { status: 'No Invoice Pending for Approval', active: true },
  { status: 'Submitted', active: true },
  { status: 'Work In Progress', active: true },
  { status: 'Enquiry Sent', active: true },
  { status: 'Awarded', active: true },
  { status: 'Outsourcing Completed', active: true },
  { status: 'Cancel Project', active: true }
]);

export interface ConfigRow {
  key: string;
  val: string;
}

export const configData = signal<ConfigRow[]>([{ key: 'IsInvoiceLive', val: 'True' }]);

export const entityData = signal<MasterRow[]>([
  { name: 'Aptara New Media Pvt Ltd.', code: '23001', sbu: '700', loc: 'Pune', active: true },
  { name: 'Techbooks International Pvt Ltd', code: '22000', sbu: '700', loc: 'Pune', active: true },
  { name: 'Aptara Technology Pvt Ltd.', code: '22001', sbu: '700', loc: 'Pune', active: true },
  { name: 'Aptara Learning Pvt. Ltd.', code: '25001', sbu: '700', loc: 'Pune', active: true },
  { name: 'Aptara Inc', code: '11000', sbu: '700', loc: 'Pune', active: true }
]);

export const marketSegmentData = signal<MasterRow[]>([
  { segment: 'E Learning', code: '3101', active: true },
  { segment: 'Content IT', code: '3102', active: true }
]);

export const currencyData = signal<MasterRow[]>([
  { curr: 'USD', amount: '85', year: '2025', month: 'April', desc: 'Exchange Rate', active: true },
  { curr: 'USD', amount: '90', year: '2026', month: 'August', desc: 'Exchange Rate', active: true },
  { curr: 'INR', amount: '1', year: '-', month: '-', desc: 'Base INR', active: true }
]);

export interface AuditEntry {
  attr: string;
  oldVal: string;
  newVal: string;
  user: string;
  date: string;
  comment: string;
}

/** Matches the 4 audit rows in the original prototype's app.js exactly. */
export const auditHistoryData: AuditEntry[] = [
  { attr: 'Project Outsource Status', oldVal: 'Awarded', newVal: 'Outsourcing Completed', user: 'Pushpraj ENT Vendor', date: '08-09-2026 09:13 PM', comment: 'Modified' },
  { attr: 'Projected Start Date', oldVal: '', newVal: '08-17-2026', user: 'Pushpraj ENT Vendor', date: '08-09-2026 09:12 PM', comment: 'Added' },
  { attr: 'Projected End Date', oldVal: '', newVal: '09-30-2026', user: 'Pushpraj ENT Vendor', date: '08-09-2026 09:12 PM', comment: 'Added' },
  { attr: 'Final Budget', oldVal: '15000.00', newVal: '650000', user: 'Pushpraj ENT Vendor', date: '08-09-2026 09:12 PM', comment: 'Modified' }
];

/** Matches the original prototype's outsourceRequestsData exactly (app.js
 * line ~83) — id/client/project/status/vendor/awarded/rawAmount. Two of
 * the four rows previously had fabricated project names and invented
 * "serviceType"/"amount" fields with no source in the original, found
 * while auditing this table's columns against the real markup (Actions |
 * Award Status | RevSys ID | Client Name | Project Name | Status | Vendor
 * Name — not the Request ID/Project Name/Service Type/Vendor/Amount/Status
 * this component previously rendered). `status` is stored as the raw
 * 'Completed' value and displayed as "Outsourcing Completed", exactly
 * matching the original's inline display transform. */
/** Extended against the real production app's "Outsource Request" /
 * "Outsource Completed" pages — a request that's still being sourced shows
 * the simpler create-style form, but every row in this mock dataset is
 * already Awarded + Completed (matching the original), so in practice
 * every existing row renders as the fuller "Outsource Completed" page.
 * Field values for opn00016 are the real app's actual data (confirmed via
 * screenshot); the other three rows reuse the same entity/company/SBU
 * defaults since no reference screenshot exists for them specifically. */
export interface OutsourceRequest {
  id: string;
  client: string;
  project: string;
  status: string;
  vendor: string;
  awarded: boolean;
  rawAmount: number;
  active: boolean;
  outsourceBudget: number;
  outsourceCurrency: string;
  awardedBudget: number;
  awardedCurrency: string;
  expectedStart: string;
  expectedEnd: string;
  vendorProjectedStart: string;
  vendorProjectedEnd: string;
  entity: string;
  companyCode: string;
  sbu: string;
  marketSegment: string;
  marketSegmentCode: string;
  pmUser: string;
  dmUser: string;
  pmApprovalSecured: boolean;
  opsHeadApprovalSecured: boolean;
  requestType: string;
  requestTypeDetail: string;
  instructionForVendors: string;
  aptaraComments: string;
}

const DEFAULT_ENTITY = { entity: 'Aptara New Media Pvt Ltd.', companyCode: '23001', sbu: '700', marketSegment: 'E Learning', marketSegmentCode: '3101' };

export const outsourceRequestsData = signal<OutsourceRequest[]>([
  {
    id: 'opn00016', client: 'Aura Inc', project: 'Translation', status: 'Completed', vendor: 'SNT Ltd', awarded: true, rawAmount: 650000, active: true,
    outsourceBudget: 15000, outsourceCurrency: 'USD', awardedBudget: 650000, awardedCurrency: 'INR',
    expectedStart: '17/08/2026', expectedEnd: '25/09/2026', vendorProjectedStart: '17/08/2026', vendorProjectedEnd: '30/09/2026',
    ...DEFAULT_ENTITY, pmUser: 'Hemant Project Manager', dmUser: 'Darshan Delivery Manager', pmApprovalSecured: true, opsHeadApprovalSecured: false,
    requestType: 'Translation', requestTypeDetail: 'Language: Korean, Japanese, Thai\nVolume: 8000 words\nDialect: Korean, Japanese, Thai\nAny Specific Instruction: -\nPreferred Vendor: -',
    instructionForVendors: 'Translate attached document in Korean, Japanese, Thai', aptaraComments: ''
  },
  {
    id: 'opn00133', client: 'Core Info LLP', project: 'Translate Web Pages', status: 'Completed', vendor: 'SNT Ltd', awarded: true, rawAmount: 70000, active: true,
    outsourceBudget: 2000, outsourceCurrency: 'USD', awardedBudget: 70000, awardedCurrency: 'INR',
    expectedStart: '05/08/2026', expectedEnd: '01/10/2026', vendorProjectedStart: '05/08/2026', vendorProjectedEnd: '01/10/2026',
    ...DEFAULT_ENTITY, pmUser: 'Hemant Project Manager', dmUser: 'Darshan Delivery Manager', pmApprovalSecured: true, opsHeadApprovalSecured: false,
    requestType: 'Translation', requestTypeDetail: 'Language: Spanish\nVolume: 3000 words\nDialect: Spanish (EU)\nAny Specific Instruction: -\nPreferred Vendor: -',
    instructionForVendors: 'Translate web page content into Spanish', aptaraComments: ''
  },
  {
    id: 'opn00183', client: 'ABZ Corp', project: 'Voice Over in English for 10 modules', status: 'Completed', vendor: 'SNT Ltd', awarded: true, rawAmount: 700000, active: true,
    outsourceBudget: 18000, outsourceCurrency: 'USD', awardedBudget: 700000, awardedCurrency: 'INR',
    expectedStart: '27/07/2026', expectedEnd: '31/08/2026', vendorProjectedStart: '27/07/2026', vendorProjectedEnd: '31/08/2026',
    ...DEFAULT_ENTITY, pmUser: 'Hemant Project Manager', dmUser: 'Darshan Delivery Manager', pmApprovalSecured: true, opsHeadApprovalSecured: false,
    requestType: 'Voice Over', requestTypeDetail: 'Language: English\nVolume: 10 modules\nDialect: English (US)\nAny Specific Instruction: -\nPreferred Vendor: -',
    instructionForVendors: 'Record voice over for 10 e-learning modules', aptaraComments: ''
  },
  {
    id: 'opn01019', client: 'PQN Inc', project: 'Translation of 2 modules', status: 'Completed', vendor: 'SNT Ltd', awarded: true, rawAmount: 500000, active: true,
    outsourceBudget: 13000, outsourceCurrency: 'USD', awardedBudget: 500000, awardedCurrency: 'INR',
    expectedStart: '01/08/2026', expectedEnd: '15/09/2026', vendorProjectedStart: '01/08/2026', vendorProjectedEnd: '15/09/2026',
    ...DEFAULT_ENTITY, pmUser: 'Hemant Project Manager', dmUser: 'Darshan Delivery Manager', pmApprovalSecured: true, opsHeadApprovalSecured: false,
    requestType: 'Translation', requestTypeDetail: 'Language: French\nVolume: 2 modules\nDialect: French (EU)\nAny Specific Instruction: -\nPreferred Vendor: -',
    instructionForVendors: 'Translate 2 e-learning modules into French', aptaraComments: ''
  }
]);

/** Real per-record change history for opn00016 (the only request with a
 * captured reference screenshot) — every other request shows empty
 * ("No records found"), matching the default state for an unmodified
 * record elsewhere in the real app. */
export const outsourceRequestHistory: Record<string, AuditEntry[]> = {
  opn00016: [
    { attr: 'Project Outsource Status', oldVal: 'Awarded', newVal: 'Outsourcing Completed', user: 'Pushpraj ENT Vendor', date: '08-09-2026 09:13:00 PM', comment: 'Modified' },
    { attr: 'Projected Start Date', oldVal: '', newVal: '08-17-2026', user: 'Pushpraj ENT Vendor', date: '08-09-2026 09:12:00 PM', comment: 'Added' },
    { attr: 'Projected End Date', oldVal: '', newVal: '09-30-2026', user: 'Pushpraj ENT Vendor', date: '08-09-2026 09:12:00 PM', comment: 'Added' },
    { attr: 'Project Outsource Status', oldVal: 'Enquiry Sent', newVal: 'Awarded', user: 'Pushpraj ENT Vendor', date: '08-09-2026 09:12:00 PM', comment: 'Modified' },
    { attr: 'Final Currency', oldVal: 'USD', newVal: 'INR', user: 'Pushpraj ENT Vendor', date: '08-09-2026 09:12:00 PM', comment: 'Modified' },
    { attr: 'Final Budget', oldVal: '15000.00', newVal: '650000', user: 'Pushpraj ENT Vendor', date: '08-09-2026 09:12:00 PM', comment: 'Modified' },
    { attr: 'PM Approval Secured', oldVal: 'false', newVal: 'true', user: 'Pushpraj ENT Vendor', date: '08-09-2026 09:12:00 PM', comment: 'Modified' },
    { attr: 'PM User', oldVal: '', newVal: 'Hemant Project Manager', user: 'Pushpraj ENT Vendor', date: '08-09-2026 09:11:00 PM', comment: 'Modified' },
    { attr: 'DM User', oldVal: '', newVal: 'Darshan Delivery Manager', user: 'Pushpraj ENT Vendor', date: '08-09-2026 09:11:00 PM', comment: 'Modified' },
    { attr: 'Project Outsource Status', oldVal: 'Submitted', newVal: 'Work In Progress', user: 'Pushpraj ENT Vendor', date: '08-09-2026 09:09:00 PM', comment: 'Modified' },
    { attr: 'Enquiry Send', oldVal: 'false', newVal: 'true', user: 'Pushpraj ENT Vendor', date: '08-09-2026 09:09:00 PM', comment: 'Modified' },
    { attr: 'PM Uploaded Files', oldVal: '', newVal: 'Band 6 Skills Definitions (1).pptx, Full file w Career Ladders and Skills.pptx', user: 'Hemant Project Manager', date: '08-09-2026 09:08:00 PM', comment: 'Added' }
  ]
};

export function displayStatus(status: string): string {
  return status === 'Completed' ? 'Outsourcing Completed' : status;
}

export interface Invoice {
  project: string;
  status: string;
  total: string;
  invoiced: string;
  remaining: string;
  start: string;
  end: string;
  rawTotal: number;
  active: boolean;
  /** Whether this project already has a submitted invoice on file — drives
   * whether the Approve action and Past Invoices grid apply. */
  hasSubmission: boolean;
  pmUser?: string;
  dmUser?: string;
}

/** Status/PM/DM values corrected against the real production app's Invoice
 * Details List — its Status column reads "No Invoice Pending for Approval"
 * (or blank, for a project with no submission yet) for these same four
 * rows, not the "Paid & Closed"/"Pending PM Approval"/"In Review" values
 * the static prototype used. All other fields (amounts, dates) confirmed
 * to match the real app exactly. */
export const invoicesData = signal<Invoice[]>([
  { project: 'Translation of 2 modules', status: 'No Invoice Pending for Approval', total: '500,000 INR', invoiced: '500,000 INR', remaining: '0 INR', start: '08/01/2026', end: '09/15/2026', rawTotal: 500000, active: true, hasSubmission: true, pmUser: 'Hemant Project Manager', dmUser: 'Darshan Delivery Manager' },
  { project: 'Voice Over in English for 10 modules', status: 'No Invoice Pending for Approval', total: '700,000 INR', invoiced: '700,000 INR', remaining: '0 INR', start: '07/27/2026', end: '08/31/2026', rawTotal: 700000, active: true, hasSubmission: true, pmUser: 'Hemant Project Manager', dmUser: 'Darshan Delivery Manager' },
  { project: 'Translate Web Pages', status: 'No Invoice Pending for Approval', total: '70,000 INR', invoiced: '63,950 INR', remaining: '6,050 INR', start: '10/01/2026', end: '02/01/2027', rawTotal: 70000, active: true, hasSubmission: true, pmUser: 'Hemant Project Manager', dmUser: 'Darshan Delivery Manager' },
  { project: 'Translation', status: '', total: '650,000 INR', invoiced: '0 INR', remaining: '650,000 INR', start: '08/17/2026', end: '09/25/2026', rawTotal: 650000, active: true, hasSubmission: false }
]);

/** Extended against the real production app's 5-tab "Vendor Registration
 * Form" — only the Company Info tab has a captured reference screenshot,
 * so those fields carry the real SNT Ltd values exactly; the other four
 * tabs (Bank & GST Details, Key Contact, Services, Aptara Document
 * Uploads) are reasonably constructed from their tab names and the data
 * already known to exist (contact person, services, organization type). */
export interface Vendor {
  code: string;
  name: string;
  city: string;
  contact: string;
  email: string;
  services: string;
  organization: string;
  vendorStatus: string;
  status: string;
  country: string;
  gstNumber: string;
  pinCode: string;
  establishmentDate: string;
  companyPan: string;
  companyCertifications: string;
  headOfficeAddress: string;
  addressLine2: string;
  companyPhone: string;
  companyFax: string;
  companyWebsite: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
  accountHolderName: string;
  contactDesignation: string;
  contactPhone: string;
  alternatePhone: string;
}

/** Matches the single vendor record in the original prototype's app.js —
 * kept faithful rather than padded out with invented rows. */
export const vendorsData = signal<Vendor[]>([
  {
    code: '2233',
    name: 'SNT Ltd',
    city: 'Pune',
    contact: 'Charlotte Kujur',
    email: 'charlotte.kujur@aptaracorp.com',
    services: 'Translation, Audio/Video',
    organization: 'Private Limited Company',
    vendorStatus: 'Approved',
    status: 'Active',
    country: 'India',
    gstNumber: '27ADFG78654D',
    pinCode: '411014',
    establishmentDate: '01/04/2025',
    companyPan: 'ADFG78654D',
    companyCertifications: '',
    headOfficeAddress: 'Trade Star, 4th Floor, Ganesh Nagar, Wadgaonsheri',
    addressLine2: 'pune - 411014',
    companyPhone: '8880776910',
    companyFax: '',
    companyWebsite: 'SNTLtd.com',
    bankName: 'HDFC Bank',
    accountNumber: 'XXXXXXXX4521',
    ifscCode: 'HDFC0001234',
    branchName: 'Wadgaonsheri, Pune',
    accountHolderName: 'SNT Ltd',
    contactDesignation: 'Vendor Relationship Manager',
    contactPhone: '8880776910',
    alternatePhone: ''
  }
]);

/** Real per-record change history for SNT Ltd (the one vendor with a
 * captured reference screenshot). */
export const vendorHistoryData: AuditEntry[] = [
  { attr: 'VendorCode', oldVal: '0', newVal: '2233', user: 'Pushpraj ENT Vendor', date: '07-21-2026 01:15:00 AM', comment: 'Modified' },
  { attr: 'Company Email ID', oldVal: 'charlotte.kujur@gmail.com', newVal: 'charlotte.kujur@aptaracorp.com', user: 'Pushpraj ENT Vendor', date: '07-21-2026 01:14:00 AM', comment: 'Modified' },
  { attr: 'Head Office Address 1', oldVal: 'Trade Star, 4th Floor, Wadgaonsheri', newVal: 'Trade Star, 4th Floor, Ganesh Nagar, Wadgaonsheri', user: 'Charlotte Kujur', date: '07-21-2026 12:13:00 AM', comment: 'Modified' },
  { attr: 'Record', oldVal: '', newVal: '', user: 'Pushpraj ENT Vendor', date: '07-21-2026 12:10:32 AM', comment: 'Approved' },
  { attr: 'Record', oldVal: '', newVal: 'Created', user: '', date: '07-21-2026 12:09:19 AM', comment: 'Created' }
];

export interface AppUser {
  first: string;
  last: string;
  email: string;
  phone: string;
  role: string;
  vendor: string;
  status: string;
}

/** Matches the 5 users in the original prototype's app.js exactly. */
export const usersData = signal<AppUser[]>([
  { first: 'Abhijit', last: 'Patil', email: 'Abhijit.Patil@aptaracorp.com', phone: '8789564520', role: 'ENT Vendor Team', vendor: '', status: 'Active' },
  { first: 'Charlotte', last: 'Kujur', email: 'charlotte.kujur@aptaracorp.com', phone: '8880776910', role: 'Vendor', vendor: 'SNT Ltd', status: 'Active' },
  { first: 'Darshan', last: 'Delivery Manager', email: 'Darshan.Tare@aptaracorp.com', phone: '9019861434', role: 'Internal User', vendor: '', status: 'Active' },
  { first: 'Hemant', last: 'Project Manager', email: 'Hemant.Moharir@aptaracorp.com', phone: '7507188192', role: 'Internal User', vendor: '', status: 'Active' },
  { first: 'Pushpraj', last: 'ENT Vendor', email: 'Pushpraj.Jagadale@aptaracorp.com', phone: '9900998899', role: 'ENT Vendor Team', vendor: '', status: 'Active' }
]);

export type TagSeverity = 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast';

/** Maps a status string to our semantic badge severity — mirrors getBadgeClass()
 * in the original prototype's app.js. See PRIMENG_THEME_TOKENS.md Section 2 for
 * the taxonomy this is built from and the "in-progress" gap it fills. */
/** Covers every status value in outsourceStatusData (the master list — see
 * masters/outsource-status), not just the ones that happened to appear in
 * the small mock datasets. Values that fell through to the generic "info"
 * default (Invoice Rejected, Invoice Pending from DM/PM, No Invoice
 * Pending for Approval, Submitted) were a real gap found while auditing
 * the Invoice Status filter for completeness — they'd have rendered as
 * neutral blue instead of their actual semantic meaning the moment they
 * became selectable. */
export function statusSeverity(status: string): { severity: TagSeverity; styleClass?: string } {
  switch (status) {
    case 'Completed':
    case 'Outsourcing Completed':
    case 'Paid & Closed':
    case 'Invoice Approved':
    case 'Approved':
    case 'Active':
    case 'No Invoice Pending for Approval':
      return { severity: 'success' };
    case 'Awarded':
    case 'Work In Progress':
      return { severity: 'contrast', styleClass: 'p-tag-in-progress' };
    case 'In Review':
    case 'Pending PM Approval':
    case 'Invoice Pending for Approval':
    case 'Invoice Pending from DM':
    case 'Invoice Pending from PM':
    case 'Enquiry Sent':
    case 'Submitted':
      return { severity: 'warning' };
    case 'Rejected':
    case 'Invoice Rejected':
    case 'Cancel Project':
      return { severity: 'danger' };
    case 'Disabled':
    case 'Inactive':
      return { severity: 'secondary' };
    default:
      return { severity: 'info' };
  }
}

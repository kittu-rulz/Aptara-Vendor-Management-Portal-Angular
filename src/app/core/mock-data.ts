export interface OutsourceRequest {
  id: string;
  projectName: string;
  serviceType: string;
  vendor: string;
  amount: string;
  rawAmount: number;
  status: string;
}

export const outsourceRequestsData: OutsourceRequest[] = [
  { id: 'opn00016', projectName: 'Translation', serviceType: 'Translation', vendor: 'SNT Ltd', amount: '650,000 INR', rawAmount: 650000, status: 'Outsourcing Completed' },
  { id: 'opn00133', projectName: 'Translate Web Pages', serviceType: 'Translation', vendor: 'SNT Ltd', amount: '70,000 INR', rawAmount: 70000, status: 'Outsourcing Completed' },
  { id: 'opn00183', projectName: 'Audio/Video Localization', serviceType: 'Audio/Video', vendor: 'SNT Ltd', amount: '1,200,000 INR', rawAmount: 1200000, status: 'Work In Progress' },
  { id: 'opn00201', projectName: 'French EU Translation', serviceType: 'Translation', vendor: 'SNT Ltd', amount: '200,000 INR', rawAmount: 200000, status: 'In Review' }
];

export interface Invoice {
  project: string;
  status: string;
  total: string;
  invoiced: string;
  remaining: string;
  start: string;
  end: string;
  rawTotal: number;
}

/** Matches the 4 invoices in the original prototype's app.js exactly. */
export const invoicesData: Invoice[] = [
  { project: 'Translation of 2 modules', status: 'Paid & Closed', total: '500,000 INR', invoiced: '500,000 INR', remaining: '0 INR', start: '08/01/2026', end: '09/15/2026', rawTotal: 500000 },
  { project: 'Voice Over in English for 10 modules', status: 'Paid & Closed', total: '700,000 INR', invoiced: '700,000 INR', remaining: '0 INR', start: '07/27/2026', end: '08/31/2026', rawTotal: 700000 },
  { project: 'Translate Web Pages', status: 'Pending PM Approval', total: '70,000 INR', invoiced: '63,950 INR', remaining: '6,050 INR', start: '10/01/2026', end: '02/01/2027', rawTotal: 70000 },
  { project: 'Translation', status: 'In Review', total: '650,000 INR', invoiced: '0 INR', remaining: '650,000 INR', start: '08/17/2026', end: '09/25/2026', rawTotal: 650000 }
];

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
}

/** Matches the single vendor record in the original prototype's app.js —
 * kept faithful rather than padded out with invented rows. */
export const vendorsData: Vendor[] = [
  {
    code: '2233',
    name: 'SNT Ltd',
    city: 'Pune',
    contact: 'Charlotte Kujur',
    email: 'charlotte.kujur@aptaracorp.com',
    services: 'Translation, Audio/Video',
    organization: 'Private Limited Company',
    vendorStatus: 'Approved',
    status: 'Active'
  }
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
export const usersData: AppUser[] = [
  { first: 'Abhijit', last: 'Patil', email: 'Abhijit.Patil@aptaracorp.com', phone: '8789564520', role: 'ENT Vendor Team', vendor: '', status: 'Active' },
  { first: 'Charlotte', last: 'Kujur', email: 'charlotte.kujur@aptaracorp.com', phone: '8880776910', role: 'Vendor', vendor: 'SNT Ltd', status: 'Active' },
  { first: 'Darshan', last: 'Delivery Manager', email: 'Darshan.Tare@aptaracorp.com', phone: '9019861434', role: 'Internal User', vendor: '', status: 'Active' },
  { first: 'Hemant', last: 'Project Manager', email: 'Hemant.Moharir@aptaracorp.com', phone: '7507188192', role: 'Internal User', vendor: '', status: 'Active' },
  { first: 'Pushpraj', last: 'ENT Vendor', email: 'Pushpraj.Jagadale@aptaracorp.com', phone: '9900998899', role: 'ENT Vendor Team', vendor: '', status: 'Active' }
];

export type TagSeverity = 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast';

/** Maps a status string to our semantic badge severity — mirrors getBadgeClass()
 * in the original prototype's app.js. See PRIMENG_THEME_TOKENS.md Section 2 for
 * the taxonomy this is built from and the "in-progress" gap it fills. */
export function statusSeverity(status: string): { severity: TagSeverity; styleClass?: string } {
  switch (status) {
    case 'Completed':
    case 'Outsourcing Completed':
    case 'Paid & Closed':
    case 'Invoice Approved':
    case 'Approved':
    case 'Active':
      return { severity: 'success' };
    case 'Awarded':
    case 'Work In Progress':
      return { severity: 'contrast', styleClass: 'p-tag-in-progress' };
    case 'In Review':
    case 'Pending PM Approval':
    case 'Invoice Pending for Approval':
    case 'Enquiry Sent':
      return { severity: 'warning' };
    case 'Rejected':
    case 'Cancel Project':
      return { severity: 'danger' };
    case 'Disabled':
    case 'Inactive':
      return { severity: 'secondary' };
    default:
      return { severity: 'info' };
  }
}

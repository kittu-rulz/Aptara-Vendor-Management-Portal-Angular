import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VendorsComponent } from './pages/vendors/vendors.component';
import { UsersComponent } from './pages/users/users.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { AuditComponent } from './pages/audit/audit.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { MasterPageComponent } from './pages/master-page/master-page.component';
import { MasterFormPageComponent } from './pages/master-form-page/master-form-page.component';
import { MasterHistoryPageComponent } from './pages/master-history-page/master-history-page.component';
import { OutsourceRequestFormComponent } from './pages/outsource-request-form/outsource-request-form.component';
import { OutsourceRequestHistoryComponent } from './pages/outsource-request-history/outsource-request-history.component';
import { VendorRegistrationFormComponent } from './pages/vendor-registration-form/vendor-registration-form.component';
import { VendorHistoryComponent } from './pages/vendor-history/vendor-history.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserHistoryComponent } from './pages/user-history/user-history.component';
import { InvoiceDetailPageComponent } from './pages/invoice-detail-page/invoice-detail-page.component';
import { InvoiceHistoryComponent } from './pages/invoice-history/invoice-history.component';
import { ConfigComponent } from './pages/config/config.component';
import {
  invoiceReportData,
  projectReportData,
  vendorReportData,
  staffingReportData,
  natureOfServicesData,
  serviceExecutedData,
  orgTypeData,
  gstData,
  outsourceStatusData,
  entityData,
  marketSegmentData,
  currencyData
} from './core/mock-data';

const crumb = (label: string) => `Vendor Portal › ${label}`;
const projectNames = ['Translation', 'Translate Web Pages', 'Voice Over in English for 10 modules', 'Translation of 2 modules'];
const vendorNames = ['SNT Ltd'];
const marketSegments = marketSegmentData().map((m) => m['segment'] as string);

// The "Invoice Status" filter previously listed only "Invoice Approved" —
// the one value that happened to appear in the small mock dataset — rather
// than the full set of statuses the field can actually take. Derived here
// from the Outsource Status master (the single source of truth for status
// values in this app — see masters/outsource-status), scoped to the
// invoice-specific subset since that master also contains general
// project-workflow statuses (Work In Progress, Awarded, etc.) that don't
// belong in a field specifically labeled "Invoice Status".
const invoiceStatuses = outsourceStatusData()
  .map((s) => s['status'] as string)
  .filter((s) => s.includes('Invoice'));

export const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Sign In' } },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'outsource-requests', pathMatch: 'full' },
      {
        path: 'outsource-requests',
        component: DashboardComponent,
        data: { title: 'Outsource Requests', breadcrumb: crumb('Outsource Requests') }
      },
      {
        path: 'outsource-requests/add',
        component: OutsourceRequestFormComponent,
        data: { title: 'Outsource Request', breadcrumb: crumb('Outsource Requests'), mode: 'add' }
      },
      {
        path: 'outsource-requests/:index/view',
        component: OutsourceRequestFormComponent,
        data: { title: 'Outsource Request', breadcrumb: crumb('Outsource Requests'), mode: 'view' }
      },
      {
        path: 'outsource-requests/:index/complete',
        component: OutsourceRequestFormComponent,
        data: { title: 'Outsource Completed', breadcrumb: crumb('Outsource Requests'), mode: 'complete' }
      },
      {
        path: 'outsource-requests/:index/history',
        component: OutsourceRequestHistoryComponent,
        data: { title: 'Outsource Request History', breadcrumb: crumb('Outsource Requests') }
      },
      {
        path: 'manage-vendors',
        component: VendorsComponent,
        data: { title: 'Manage Vendors', breadcrumb: crumb('Manage Vendors') }
      },
      {
        path: 'manage-vendors/add',
        component: VendorRegistrationFormComponent,
        data: { title: 'Vendor Registration Form', breadcrumb: crumb('Manage Vendors'), mode: 'add' }
      },
      {
        path: 'manage-vendors/:index/edit',
        component: VendorRegistrationFormComponent,
        data: { title: 'Vendor Registration Form', breadcrumb: crumb('Manage Vendors'), mode: 'edit' }
      },
      {
        path: 'manage-vendors/:index/view',
        component: VendorRegistrationFormComponent,
        data: { title: 'Vendor Registration Form', breadcrumb: crumb('Manage Vendors'), mode: 'view' }
      },
      {
        path: 'manage-vendors/:index/history',
        component: VendorHistoryComponent,
        data: { title: 'Vendor History', breadcrumb: crumb('Manage Vendors') }
      },
      {
        path: 'manage-users',
        component: UsersComponent,
        data: { title: 'Manage Users', breadcrumb: crumb('Manage Users') }
      },
      {
        path: 'manage-users/add',
        component: UserFormComponent,
        data: { title: 'Add User', breadcrumb: crumb('Manage Users'), mode: 'add' }
      },
      {
        path: 'manage-users/:index/edit',
        component: UserFormComponent,
        data: { title: 'Edit User', breadcrumb: crumb('Manage Users'), mode: 'edit' }
      },
      {
        path: 'manage-users/:index/view',
        component: UserFormComponent,
        data: { title: 'View User', breadcrumb: crumb('Manage Users'), mode: 'view' }
      },
      {
        path: 'manage-users/:index/history',
        component: UserHistoryComponent,
        data: { title: 'User History', breadcrumb: crumb('Manage Users') }
      },
      {
        path: 'invoice-details',
        component: InvoicesComponent,
        data: { title: 'Invoice Details', breadcrumb: crumb('Invoice Details') }
      },
      {
        path: 'invoice-details/:index/submit',
        component: InvoiceDetailPageComponent,
        data: { title: 'Invoice Details', breadcrumb: crumb('Invoice Details'), mode: 'add' }
      },
      {
        path: 'invoice-details/:index/view',
        component: InvoiceDetailPageComponent,
        data: { title: 'Invoice Details', breadcrumb: crumb('Invoice Details'), mode: 'view' }
      },
      {
        path: 'invoice-details/:index/approve',
        component: InvoiceDetailPageComponent,
        data: { title: 'Invoice Details', breadcrumb: crumb('Invoice Details'), mode: 'approve' }
      },
      {
        path: 'invoice-details/:index/history',
        component: InvoiceHistoryComponent,
        data: { title: 'Invoice Details History', breadcrumb: crumb('Invoice Details') }
      },
      {
        path: 'audit-history',
        component: AuditComponent,
        data: { title: 'Audit Trail', breadcrumb: crumb('Audit Trail') }
      },
      {
        path: 'reports/invoice',
        component: ReportPageComponent,
        data: {
          title: 'Invoice Report',
          breadcrumb: crumb('Analytics & Reports › Invoice Report'),
          heading: 'Invoice Report',
          icon: 'pi pi-file',
          rows: invoiceReportData,
          columns: [
            { key: 'client', label: 'Client Name' },
            { key: 'revsys', label: 'RevSys ID' },
            { key: 'project', label: 'Project Name' },
            { key: 'budget', label: 'Budget' },
            { key: 'invNo', label: 'Invoice No' },
            { key: 'invDate', label: 'Invoice Date' },
            { key: 'status', label: 'Invoice Status', isStatus: true }
          ],
          filters: [
            { label: 'Start Date', type: 'date', field: 'invDate', range: 'start' },
            { label: 'End Date', type: 'date', field: 'invDate', range: 'end' },
            { label: 'Project Name', type: 'select', options: projectNames, field: 'project' },
            { label: 'Vendor Name', type: 'select', options: vendorNames },
            { label: 'Invoice Status', type: 'multiselect', options: invoiceStatuses, field: 'status' }
          ]
        }
      },
      {
        path: 'reports/project',
        component: ReportPageComponent,
        data: {
          title: 'Project Report',
          breadcrumb: crumb('Analytics & Reports › Project Report'),
          heading: 'Project Report',
          icon: 'pi pi-sitemap',
          rows: projectReportData,
          columns: [
            { key: 'client', label: 'Client Name' },
            { key: 'revsys', label: 'RevSys ID' },
            { key: 'project', label: 'Project Name' },
            { key: 'vendor', label: 'Selected Vendor Name' },
            { key: 'budget', label: 'Project Budget' },
            { key: 'invNo', label: 'Invoice No' },
            { key: 'invDate', label: 'Invoice Date' }
          ],
          filters: [
            { label: 'Start Date', type: 'date', field: 'invDate', range: 'start' },
            { label: 'End Date', type: 'date', field: 'invDate', range: 'end' },
            { label: 'Project Name', type: 'select', options: projectNames, field: 'project' },
            { label: 'Vendor Name', type: 'select', options: vendorNames, field: 'vendor' },
            { label: 'Invoice Status', type: 'multiselect', options: invoiceStatuses, field: 'status' }
          ]
        }
      },
      {
        path: 'reports/vendor',
        component: ReportPageComponent,
        data: {
          title: 'Vendor Report',
          breadcrumb: crumb('Analytics & Reports › Vendor Report'),
          heading: 'Vendor Report',
          icon: 'pi pi-building-columns',
          rows: vendorReportData,
          columns: [
            { key: 'customer', label: 'Customer Name' },
            { key: 'vendor', label: 'Vendor Name' },
            { key: 'code', label: 'Vendor Code' },
            { key: 'invNo', label: 'InvoiceNo' },
            { key: 'status', label: 'Invoice Status', isStatus: true }
          ],
          filters: [
            { label: 'Start Date', type: 'date' },
            { label: 'End Date', type: 'date' },
            { label: 'Vendor Name', type: 'select', options: vendorNames, field: 'vendor' },
            { label: 'Market Segment', type: 'select', options: marketSegments },
            { label: 'Invoice Status', type: 'multiselect', options: invoiceStatuses, field: 'status' }
          ]
        }
      },
      {
        path: 'reports/staffing',
        component: ReportPageComponent,
        data: {
          title: 'Staffing Report',
          breadcrumb: crumb('Analytics & Reports › Staffing Report'),
          heading: 'Staffing Report',
          icon: 'pi pi-user',
          rows: staffingReportData,
          columns: [
            { key: 'client', label: 'Client Name' },
            { key: 'revsys', label: 'RevSys ID' },
            { key: 'project', label: 'Project Name' },
            { key: 'vendor', label: 'Selected Vendor Name' },
            { key: 'budget', label: 'Project Budget' },
            { key: 'invNo', label: 'Invoice No' },
            { key: 'invDate', label: 'Invoice Date' }
          ],
          filters: [
            { label: 'Start Date', type: 'date', field: 'invDate', range: 'start' },
            { label: 'End Date', type: 'date', field: 'invDate', range: 'end' },
            { label: 'Project Name', type: 'select', options: projectNames, field: 'project' },
            { label: 'Vendor Name', type: 'select', options: vendorNames, field: 'vendor' }
          ]
        }
      },
      {
        path: 'masters/nature-of-service',
        component: MasterPageComponent,
        data: {
          title: 'Nature Of Service',
          breadcrumb: crumb('Masters & Config › Nature Of Service'),
          rows: natureOfServicesData,
          columns: [{ key: 'name', label: 'Nature of Service Provided' }],
          addLabel: 'Nature Of Service',
          countLabel: 'All',
          masterType: 'nature-of-service'
        }
      },
      {
        path: 'masters/service-executed',
        component: MasterPageComponent,
        data: {
          title: 'Service Executed',
          breadcrumb: crumb('Masters & Config › Service Executed'),
          rows: serviceExecutedData,
          columns: [
            { key: 'service', label: 'Service Name' },
            { key: 'requestType', label: 'Request Type' }
          ],
          addLabel: 'Service Executed',
          countLabel: 'All',
          masterType: 'service-executed'
        }
      },
      {
        path: 'masters/organization-type',
        component: MasterPageComponent,
        data: {
          title: 'Organization Type',
          breadcrumb: crumb('Masters & Config › Organization Type'),
          rows: orgTypeData,
          columns: [{ key: 'type', label: 'Type of Organization' }],
          addLabel: 'Type of Organization',
          countLabel: 'All',
          masterType: 'organization-type'
        }
      },
      {
        path: 'masters/gst-eligibility',
        component: MasterPageComponent,
        data: {
          title: 'GST Eligibility',
          breadcrumb: crumb('Masters & Config › GST Eligibility'),
          rows: gstData,
          columns: [{ key: 'type', label: 'GST Eligibility' }],
          addLabel: 'GST Eligibility',
          countLabel: 'All',
          masterType: 'gst-eligibility'
        }
      },
      {
        path: 'masters/outsource-status',
        component: MasterPageComponent,
        data: {
          title: 'Outsource Status',
          breadcrumb: crumb('Masters & Config › Outsource Status'),
          rows: outsourceStatusData,
          columns: [{ key: 'status', label: 'Project Outsource Status' }],
          addLabel: 'Outsource Status',
          countLabel: 'All',
          masterType: 'outsource-status'
        }
      },
      {
        path: 'masters/configuration',
        component: ConfigComponent,
        data: { title: 'Configuration Setting', breadcrumb: crumb('Masters & Config › Configuration Setting') }
      },
      {
        path: 'masters/entity',
        component: MasterPageComponent,
        data: {
          title: 'Entity Master',
          breadcrumb: crumb('Masters & Config › Entity Master'),
          rows: entityData,
          columns: [
            { key: 'name', label: 'Company Name' },
            { key: 'code', label: 'Company Code' },
            { key: 'sbu', label: 'SBU' },
            { key: 'loc', label: 'Location' }
          ],
          addLabel: 'Entity',
          countLabel: 'All Entities',
          masterType: 'entity'
        }
      },
      {
        path: 'masters/market-segment',
        component: MasterPageComponent,
        data: {
          title: 'Market Segment',
          breadcrumb: crumb('Masters & Config › Market Segment'),
          rows: marketSegmentData,
          columns: [
            { key: 'segment', label: 'Market Segment' },
            { key: 'code', label: 'Segment Code' }
          ],
          addLabel: 'Market Segment',
          countLabel: 'All Segments',
          masterType: 'market-segment'
        }
      },
      {
        path: 'masters/currency',
        component: MasterPageComponent,
        data: {
          title: 'Currency Master',
          breadcrumb: crumb('Masters & Config › Currency Master'),
          rows: currencyData,
          columns: [
            { key: 'curr', label: 'Currency' },
            { key: 'amount', label: 'Currency Amount' },
            { key: 'year', label: 'Year' },
            { key: 'month', label: 'Month' },
            { key: 'desc', label: 'Description' }
          ],
          addLabel: 'Currency',
          countLabel: 'All Currencies',
          masterType: 'currency',
          activeLabel: 'IsActive'
        }
      },
      {
        path: 'masters/:masterType/add',
        component: MasterFormPageComponent,
        data: { title: 'Master Data', breadcrumb: crumb('Masters & Config'), mode: 'add' }
      },
      {
        path: 'masters/:masterType/:index/edit',
        component: MasterFormPageComponent,
        data: { title: 'Master Data', breadcrumb: crumb('Masters & Config'), mode: 'edit' }
      },
      {
        path: 'masters/:masterType/:index/view',
        component: MasterFormPageComponent,
        data: { title: 'Master Data', breadcrumb: crumb('Masters & Config'), mode: 'view' }
      },
      {
        path: 'masters/:masterType/:index/history',
        component: MasterHistoryPageComponent,
        data: { title: 'Master Data History', breadcrumb: crumb('Masters & Config') }
      }
    ]
  }
];

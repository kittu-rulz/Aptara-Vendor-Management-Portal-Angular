import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VendorsComponent } from './pages/vendors/vendors.component';
import { UsersComponent } from './pages/users/users.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { AuditComponent } from './pages/audit/audit.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { MasterPageComponent } from './pages/master-page/master-page.component';
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

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', redirectTo: 'outsource-requests', pathMatch: 'full' },
      {
        path: 'outsource-requests',
        component: DashboardComponent,
        data: { title: 'Outsource Requests', breadcrumb: crumb('Outsource Requests') }
      },
      {
        path: 'manage-vendors',
        component: VendorsComponent,
        data: { title: 'Manage Vendors', breadcrumb: crumb('Manage Vendors') }
      },
      {
        path: 'manage-users',
        component: UsersComponent,
        data: { title: 'Manage Users', breadcrumb: crumb('Manage Users') }
      },
      {
        path: 'invoice-details',
        component: InvoicesComponent,
        data: { title: 'Invoice Details', breadcrumb: crumb('Invoice Details') }
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
            { label: 'Start Date', type: 'date' },
            { label: 'End Date', type: 'date' },
            { label: 'Project Name', type: 'select', options: projectNames },
            { label: 'Vendor Name', type: 'select', options: vendorNames },
            { label: 'Invoice Status', type: 'select', options: ['Invoice Approved'] }
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
            { key: 'vendor', label: 'Selected Vendor' },
            { key: 'budget', label: 'Project Budget' },
            { key: 'invNo', label: 'Invoice No' },
            { key: 'invDate', label: 'Invoice Date' },
            { key: 'status', label: 'Invoice Status', isStatus: true }
          ],
          filters: [
            { label: 'Start Date', type: 'date' },
            { label: 'End Date', type: 'date' },
            { label: 'Project Name', type: 'select', options: projectNames },
            { label: 'Vendor Name', type: 'select', options: vendorNames },
            { label: 'Invoice Status', type: 'select', options: ['Invoice Approved'] }
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
            { key: 'invNo', label: 'Invoice No' },
            { key: 'status', label: 'Invoice Status', isStatus: true }
          ],
          filters: [
            { label: 'Start Date', type: 'date' },
            { label: 'End Date', type: 'date' },
            { label: 'Vendor Name', type: 'select', options: vendorNames },
            { label: 'Market Segment', type: 'select', options: ['E Learning', 'Content IT'] },
            { label: 'Invoice Status', type: 'select', options: ['Invoice Approved'] }
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
            { label: 'Start Date', type: 'date' },
            { label: 'End Date', type: 'date' },
            { label: 'Project Name', type: 'select', options: projectNames },
            { label: 'Vendor Name', type: 'select', options: vendorNames }
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
          countLabel: 'All'
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
          countLabel: 'All'
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
          countLabel: 'All'
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
          countLabel: 'All'
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
          countLabel: 'All'
        }
      },
      {
        path: 'masters/configuration',
        component: ConfigComponent,
        data: { title: 'Configuration', breadcrumb: crumb('Masters & Config › Configuration') }
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
          countLabel: 'All Entities'
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
          countLabel: 'All Segments'
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
          countLabel: 'All Currencies'
        }
      }
    ]
  }
];

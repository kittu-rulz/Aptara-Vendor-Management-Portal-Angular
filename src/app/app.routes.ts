import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VendorsComponent } from './pages/vendors/vendors.component';
import { UsersComponent } from './pages/users/users.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { AuditComponent } from './pages/audit/audit.component';
import { PlaceholderComponent } from './pages/placeholder/placeholder.component';

const crumb = (label: string) => `Vendor Portal › ${label}`;

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
        component: PlaceholderComponent,
        data: { title: 'Invoice Report', breadcrumb: crumb('Analytics & Reports › Invoice Report') }
      },
      {
        path: 'reports/project',
        component: PlaceholderComponent,
        data: { title: 'Project Report', breadcrumb: crumb('Analytics & Reports › Project Report') }
      },
      {
        path: 'reports/vendor',
        component: PlaceholderComponent,
        data: { title: 'Vendor Report', breadcrumb: crumb('Analytics & Reports › Vendor Report') }
      },
      {
        path: 'reports/staffing',
        component: PlaceholderComponent,
        data: { title: 'Staffing Report', breadcrumb: crumb('Analytics & Reports › Staffing Report') }
      },
      {
        path: 'masters/nature-of-service',
        component: PlaceholderComponent,
        data: { title: 'Nature Of Service', breadcrumb: crumb('Masters & Config › Nature Of Service') }
      },
      {
        path: 'masters/service-executed',
        component: PlaceholderComponent,
        data: { title: 'Service Executed', breadcrumb: crumb('Masters & Config › Service Executed') }
      },
      {
        path: 'masters/organization-type',
        component: PlaceholderComponent,
        data: { title: 'Organization Type', breadcrumb: crumb('Masters & Config › Organization Type') }
      },
      {
        path: 'masters/gst-eligibility',
        component: PlaceholderComponent,
        data: { title: 'GST Eligibility', breadcrumb: crumb('Masters & Config › GST Eligibility') }
      },
      {
        path: 'masters/outsource-status',
        component: PlaceholderComponent,
        data: { title: 'Outsource Status', breadcrumb: crumb('Masters & Config › Outsource Status') }
      },
      {
        path: 'masters/configuration',
        component: PlaceholderComponent,
        data: { title: 'Configuration', breadcrumb: crumb('Masters & Config › Configuration') }
      },
      {
        path: 'masters/entity',
        component: PlaceholderComponent,
        data: { title: 'Entity Master', breadcrumb: crumb('Masters & Config › Entity Master') }
      },
      {
        path: 'masters/market-segment',
        component: PlaceholderComponent,
        data: { title: 'Market Segment', breadcrumb: crumb('Masters & Config › Market Segment') }
      },
      {
        path: 'masters/currency',
        component: PlaceholderComponent,
        data: { title: 'Currency Master', breadcrumb: crumb('Masters & Config › Currency Master') }
      }
    ]
  }
];

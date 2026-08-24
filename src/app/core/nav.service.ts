import { Injectable, signal } from '@angular/core';

export interface NavChild {
  label: string;
  route: string;
  icon: string;
}

export interface NavGroup {
  label: string;
  route?: string;
  icon: string;
  badge?: string;
  alert?: boolean;
  children?: NavChild[];
}

@Injectable({ providedIn: 'root' })
export class NavService {
  sidebarCollapsed = signal(false);
  darkTheme = signal(false);

  readonly mainModules: NavGroup[] = [
    { label: 'Outsource Requests', route: '/outsource-requests', icon: 'pi pi-folder-open', badge: '4' },
    { label: 'Manage Vendors', route: '/manage-vendors', icon: 'pi pi-building' },
    { label: 'Manage Users', route: '/manage-users', icon: 'pi pi-users' },
    { label: 'Invoice Details', route: '/invoice-details', icon: 'pi pi-file' }
  ];

  readonly analytics: NavGroup = {
    label: 'Analytics & Reports',
    icon: 'pi pi-chart-bar',
    children: [
      { label: 'Invoice Report', route: '/reports/invoice', icon: 'pi pi-file-check' },
      { label: 'Project Report', route: '/reports/project', icon: 'pi pi-sitemap' },
      { label: 'Vendor Report', route: '/reports/vendor', icon: 'pi pi-building-columns' },
      { label: 'Staffing Report', route: '/reports/staffing', icon: 'pi pi-user' }
    ]
  };

  readonly masters: NavGroup = {
    label: 'Masters & Config',
    icon: 'pi pi-sliders-h',
    children: [
      { label: 'Nature Of Service', route: '/masters/nature-of-service', icon: 'pi pi-layer-group' },
      { label: 'Service Executed', route: '/masters/service-executed', icon: 'pi pi-code' },
      { label: 'Organization Type', route: '/masters/organization-type', icon: 'pi pi-building' },
      { label: 'GST Eligibility', route: '/masters/gst-eligibility', icon: 'pi pi-receipt' },
      { label: 'Outsource Status', route: '/masters/outsource-status', icon: 'pi pi-check-circle' },
      { label: 'Configuration', route: '/masters/configuration', icon: 'pi pi-cog' },
      { label: 'Entity Master', route: '/masters/entity', icon: 'pi pi-building-columns' },
      { label: 'Market Segment', route: '/masters/market-segment', icon: 'pi pi-chart-pie' },
      { label: 'Currency Master', route: '/masters/currency', icon: 'pi pi-dollar' }
    ]
  };

  readonly auditTrail: NavGroup = { label: 'Audit Trail', route: '/audit-history', icon: 'pi pi-history' };

  toggleSidebar() {
    this.sidebarCollapsed.update((v) => !v);
  }

  toggleTheme() {
    const next = !this.darkTheme();
    this.darkTheme.set(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  }
}

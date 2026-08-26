import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { outsourceRequestsData, statusSeverity, displayStatus, OutsourceRequest, vendorsData, invoicesData } from '../../core/mock-data';

interface KpiCard {
  label: string;
  value: string;
  trend: string;
  icon: string;
  accent: 'blue' | 'purple' | 'emerald' | 'amber';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TableModule, TagModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private messages = inject(MessageService);

  requestsSignal = outsourceRequestsData;
  statusSeverity = statusSeverity;
  displayStatus = displayStatus;

  includeDisabled = signal(false);

  greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  columnFilters = signal<Record<'id' | 'client' | 'project' | 'status' | 'vendor', string>>({
    id: '',
    client: '',
    project: '',
    status: '',
    vendor: ''
  });

  sortField = signal<'id' | 'client' | 'project' | 'status' | 'vendor' | null>(null);
  sortAsc = signal(true);

  filteredRequests = computed(() => {
    const list = this.requestsSignal();
    const activeOnly = this.includeDisabled() ? list : list.filter((r) => r.active);
    const filters = this.columnFilters();
    const filtered = activeOnly.filter((r) =>
      (r.id ?? '').toLowerCase().includes(filters.id.toLowerCase()) &&
      (r.client ?? '').toLowerCase().includes(filters.client.toLowerCase()) &&
      (r.project ?? '').toLowerCase().includes(filters.project.toLowerCase()) &&
      this.displayStatus(r.status).toLowerCase().includes(filters.status.toLowerCase()) &&
      (r.vendor ?? '').toLowerCase().includes(filters.vendor.toLowerCase())
    );

    const field = this.sortField();
    if (!field) return filtered;
    const asc = this.sortAsc() ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = field === 'status' ? this.displayStatus(a.status) : String(a[field] ?? '');
      const bv = field === 'status' ? this.displayStatus(b.status) : String(b[field] ?? '');
      return av.localeCompare(bv) * asc;
    });
  });

  toggleIncludeDisabled(value: boolean) {
    this.includeDisabled.set(value);
  }

  setColumnFilter(field: 'id' | 'client' | 'project' | 'status' | 'vendor', value: string) {
    this.columnFilters.update((f) => ({ ...f, [field]: value }));
  }

  toggleSort(field: 'id' | 'client' | 'project' | 'status' | 'vendor') {
    if (this.sortField() === field) {
      this.sortAsc.update((v) => !v);
    } else {
      this.sortField.set(field);
      this.sortAsc.set(true);
    }
  }

  kpis = computed<KpiCard[]>(() => {
    const requests = this.requestsSignal();
    const totalBudget = requests.reduce((acc, r) => acc + (r.rawAmount || 0), 0);
    const activeVendors = vendorsData().filter((v) => v.status === 'Active').length;
    return [
      { label: 'Outsource Requests', value: String(requests.length), trend: '100% Sourced & Active', icon: 'pi pi-folder-open', accent: 'blue' },
      { label: 'Awarded Budget', value: '₹' + totalBudget.toLocaleString('en-IN'), trend: `Across ${requests.length} active projects`, icon: 'pi pi-dollar', accent: 'purple' },
      { label: 'Approved Vendors', value: String(activeVendors), trend: 'SNT Ltd · Empanelled', icon: 'pi pi-building', accent: 'emerald' },
      { label: 'Invoice Projects', value: String(invoicesData().length), trend: 'All Clear · 0 Pending', icon: 'pi pi-file', accent: 'amber' }
    ];
  });

  indexOf(row: OutsourceRequest): number {
    return this.requestsSignal().indexOf(row);
  }

  toggleActive(req: OutsourceRequest) {
    const next = !req.active;
    this.requestsSignal.update((list) => list.map((r) => (r === req ? { ...r, active: next } : r)));
    this.messages.add({
      severity: next ? 'success' : 'warn',
      summary: next ? 'Request Enabled' : 'Request Disabled',
      detail: `Request ${req.id} is now ${next ? 'active' : 'disabled'}.`
    });
  }

  exportExcel() {
    this.messages.add({ severity: 'success', summary: 'Report Exported', detail: 'Report exported to Excel (.csv).' });
  }
}

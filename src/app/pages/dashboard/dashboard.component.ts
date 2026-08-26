import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, RouterLink, TableModule, TagModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private messages = inject(MessageService);

  requestsSignal = outsourceRequestsData;
  statusSeverity = statusSeverity;
  displayStatus = displayStatus;

  includeDisabled = signal(false);

  filteredRequests = computed(() => {
    const list = this.requestsSignal();
    if (this.includeDisabled()) return list;
    return list.filter((r) => r.active);
  });

  toggleIncludeDisabled(value: boolean) {
    this.includeDisabled.set(value);
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

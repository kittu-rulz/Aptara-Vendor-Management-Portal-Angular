import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { outsourceRequestsData, statusSeverity, displayStatus, OutsourceRequest, auditHistoryData, vendorsData, invoicesData } from '../../core/mock-data';
import { EntityDialogComponent, EntityField } from '../../shared/entity-dialog/entity-dialog.component';
import { HistoryDialogComponent } from '../../shared/history-dialog/history-dialog.component';

interface KpiCard {
  label: string;
  value: string;
  trend: string;
  icon: string;
  accent: 'blue' | 'purple' | 'emerald' | 'amber';
}

const VIEW_FIELDS: EntityField[] = [
  { key: 'id', label: 'RevSys ID', type: 'text' },
  { key: 'client', label: 'Client Name', type: 'text' },
  { key: 'project', label: 'Project Name', type: 'text' },
  { key: 'vendor', label: 'Vendor Name', type: 'text' },
  { key: 'rawAmount', label: 'Budget (INR)', type: 'number' }
];

const ADD_FIELDS: EntityField[] = [
  { key: 'client', label: 'Client Name', type: 'text' },
  { key: 'project', label: 'Project Name', type: 'text' },
  { key: 'vendor', label: 'Vendor Name', type: 'text' },
  { key: 'rawAmount', label: 'Budget (INR)', type: 'number' },
  { key: 'awarded', label: 'Awarded to Vendor', type: 'checkbox' }
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule, EntityDialogComponent, HistoryDialogComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private messages = inject(MessageService);

  requestsSignal = outsourceRequestsData;
  statusSeverity = statusSeverity;
  displayStatus = displayStatus;

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

  dialogVisible = false;
  dialogReadonly = false;
  dialogTitle = '';
  dialogFields: EntityField[] = VIEW_FIELDS;
  dialogModel: Partial<OutsourceRequest> = {};

  historyVisible = false;
  historyTitle = '';
  historySubtitle = '';
  historyEntries = auditHistoryData;

  openView(req: OutsourceRequest) {
    this.dialogReadonly = true;
    this.dialogTitle = `Outsource Request: ${req.id}`;
    this.dialogFields = VIEW_FIELDS;
    this.dialogModel = { ...req };
    this.dialogVisible = true;
  }

  openAdd() {
    this.dialogReadonly = false;
    this.dialogTitle = 'New Outsource Request';
    this.dialogFields = ADD_FIELDS;
    this.dialogModel = { vendor: 'SNT Ltd', rawAmount: 0, awarded: false };
    this.dialogVisible = true;
  }

  onSave(draft: Record<string, any>) {
    const id = 'opn' + String(Math.floor(10000 + Math.random() * 89999));
    const newRequest: OutsourceRequest = {
      id,
      client: draft['client'] ?? '',
      project: draft['project'] ?? '',
      vendor: draft['vendor'] ?? '',
      rawAmount: Number(draft['rawAmount']) || 0,
      awarded: Boolean(draft['awarded']),
      status: 'Completed'
    };
    this.requestsSignal.update((list) => [...list, newRequest]);
    this.messages.add({ severity: 'success', summary: 'Outsource Request Created', detail: `Request ${id} added to the portfolio.` });
  }

  openHistory(req: OutsourceRequest) {
    this.historyTitle = `Audit History: ${req.id}`;
    this.historySubtitle = `${req.client} • ${req.project}`;
    this.historyVisible = true;
  }

  disableRequest(req: OutsourceRequest) {
    this.requestsSignal.update((list) => list.filter((r) => r !== req));
    this.messages.add({ severity: 'warn', summary: 'Request Disabled', detail: `Request ${req.id} disabled from view.` });
  }
}

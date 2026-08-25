import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { invoicesData, statusSeverity, Invoice, auditHistoryData } from '../../core/mock-data';
import { EntityDialogComponent, EntityField } from '../../shared/entity-dialog/entity-dialog.component';
import { HistoryDialogComponent } from '../../shared/history-dialog/history-dialog.component';

type InvoiceFilter = 'all' | 'Paid & Closed' | 'Pending PM Approval';

const VIEW_FIELDS: EntityField[] = [
  { key: 'project', label: 'Project Name', type: 'text' },
  { key: 'status', label: 'Status', type: 'text' },
  { key: 'total', label: 'OutSourcing Amount', type: 'text' },
  { key: 'invoiced', label: 'Invoiced Till Date', type: 'text' },
  { key: 'remaining', label: 'Remaining Amount', type: 'text' },
  { key: 'start', label: 'Project Start Date', type: 'text' },
  { key: 'end', label: 'Project End Date', type: 'text' }
];

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule, EntityDialogComponent, HistoryDialogComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent {
  private messages = inject(MessageService);

  allInvoicesSignal = invoicesData;
  statusSeverity = statusSeverity;

  activeFilter = signal<InvoiceFilter>('all');

  filteredInvoices = computed(() => {
    const filter = this.activeFilter();
    const list = this.allInvoicesSignal();
    if (filter === 'all') return list;
    return list.filter((i) => i.status === filter);
  });

  setFilter(filter: InvoiceFilter) {
    this.activeFilter.set(filter);
  }

  dialogVisible = false;
  dialogTitle = 'Invoice Details';
  dialogFields = VIEW_FIELDS;
  dialogModel: Partial<Invoice> = {};

  historyVisible = false;
  historyTitle = '';
  historySubtitle = '';
  historyEntries = auditHistoryData;

  openView(inv: Invoice) {
    this.dialogModel = { ...inv };
    this.dialogVisible = true;
  }

  submitInvoice() {
    this.messages.add({ severity: 'success', summary: 'Invoice Submitted', detail: 'Invoice submitted for approval.' });
  }

  openHistory(inv: Invoice) {
    this.historyTitle = 'Invoice Details History';
    this.historySubtitle = inv.project;
    this.historyVisible = true;
  }

  approveInvoice(inv: Invoice) {
    this.allInvoicesSignal.update((list) => list.map((i) => (i === inv ? { ...i, status: 'Paid & Closed' } : i)));
    this.messages.add({ severity: 'success', summary: 'Invoice Approved', detail: 'Invoice approved and forwarded for disbursement.' });
  }

  exportExcel() {
    this.messages.add({ severity: 'success', summary: 'Report Exported', detail: 'Report exported to Excel (.csv).' });
  }
}

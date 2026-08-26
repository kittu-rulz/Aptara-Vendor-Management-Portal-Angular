import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { invoicesData, statusSeverity, Invoice, auditHistoryData } from '../../core/mock-data';
import { HistoryDialogComponent } from '../../shared/history-dialog/history-dialog.component';

type InvoiceFilter = 'all' | 'Paid & Closed' | 'Pending PM Approval';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule, DialogModule, HistoryDialogComponent],
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

  detailVisible = false;
  viewingInvoice: Invoice | null = null;

  historyVisible = false;
  historyTitle = '';
  historySubtitle = '';
  historyEntries = auditHistoryData;

  /** Submit Invoice, View Details, and Approve/Reject all open the same
   * "Invoice Details" modal in the original — matching that exactly rather
   * than the three separate behaviors this used to have (a toast-only
   * submit, a dialog with an invented field set, and a direct one-click
   * approve with no confirmation step). */
  openInvoiceDetail(inv: Invoice) {
    this.viewingInvoice = inv;
    this.detailVisible = true;
  }

  approveInvoice() {
    const inv = this.viewingInvoice;
    if (!inv) return;
    this.allInvoicesSignal.update((list) => list.map((i) => (i === inv ? { ...i, status: 'Paid & Closed' } : i)));
    this.detailVisible = false;
    this.messages.add({ severity: 'success', summary: 'Invoice Approved', detail: 'Invoice approved and forwarded for disbursement.' });
  }

  openHistory(inv: Invoice) {
    this.historyTitle = 'Invoice Details History';
    this.historySubtitle = inv.project;
    this.historyVisible = true;
  }

  exportExcel() {
    this.messages.add({ severity: 'success', summary: 'Report Exported', detail: 'Report exported to Excel (.csv).' });
  }
}

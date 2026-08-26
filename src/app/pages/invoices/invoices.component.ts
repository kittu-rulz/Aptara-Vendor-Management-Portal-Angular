import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { invoicesData, statusSeverity, Invoice, auditHistoryData } from '../../core/mock-data';
import { HistoryDialogComponent } from '../../shared/history-dialog/history-dialog.component';

const PAST_INVOICES = [
  {
    num: 1,
    date: '21/07/2026',
    desc: 'Translation completed for French EU and Spanish EU',
    amount: '200,000',
    currency: '',
    status: 'Invoice Approved',
    pmUser: 'Hemant Project Manager',
    dmUser: 'Darshan Delivery Manager',
    approvedBy: 'Darshan Delivery Manager'
  },
  {
    num: 13,
    date: '13/08/2026',
    desc: 'Translation completed',
    amount: '300,000',
    currency: '90 USD 2026 - August',
    status: 'Invoice Approved',
    pmUser: 'Hemant Project Manager',
    dmUser: 'Darshan Delivery Manager',
    approvedBy: 'Darshan Delivery Manager'
  }
];

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
  pastInvoices = PAST_INVOICES;

  includeDisabled = signal(false);

  filteredInvoices = computed(() => {
    const list = this.allInvoicesSignal();
    if (this.includeDisabled()) return list;
    return list.filter((i) => i.active);
  });

  toggleIncludeDisabled(value: boolean) {
    this.includeDisabled.set(value);
  }

  detailVisible = false;
  viewingInvoice: Invoice | null = null;

  historyVisible = false;
  historyTitle = '';
  historySubtitle = '';
  historyEntries = auditHistoryData;

  openInvoiceDetail(inv: Invoice) {
    this.viewingInvoice = inv;
    this.detailVisible = true;
  }

  approveInvoice() {
    const inv = this.viewingInvoice;
    if (!inv) return;
    this.allInvoicesSignal.update((list) => list.map((i) => (i === inv ? { ...i, status: 'No Invoice Pending for Approval', hasSubmission: true } : i)));
    this.detailVisible = false;
    this.messages.add({ severity: 'success', summary: 'Invoice Approved', detail: 'Invoice approved and forwarded for disbursement.' });
  }

  openHistory(inv: Invoice) {
    this.historyTitle = 'Invoice Details History';
    this.historySubtitle = inv.project;
    this.historyVisible = true;
  }

  toggleActive(inv: Invoice) {
    const next = !inv.active;
    this.allInvoicesSignal.update((list) => list.map((i) => (i === inv ? { ...i, active: next } : i)));
    this.messages.add({
      severity: next ? 'success' : 'warn',
      summary: next ? 'Enabled' : 'Disabled',
      detail: `${inv.project} is now ${next ? 'active' : 'disabled'}.`
    });
  }

  exportExcel() {
    this.messages.add({ severity: 'success', summary: 'Report Exported', detail: 'Report exported to Excel (.csv).' });
  }
}

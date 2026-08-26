import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { invoicesData, statusSeverity, Invoice } from '../../core/mock-data';

/** Real-app-accurate "Invoice Details List" — routes to the dedicated
 * Invoice Details page (add/view/approve) and Invoice Details History page
 * instead of the old p-dialog modals. Icon order matches the real list
 * exactly: plus(new submission) | trash(disable) | eye(view) |
 * clock(history) | check-circle(approve, only when a submission exists). */
@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, RouterLink, TableModule, TagModule, ButtonModule],
  templateUrl: './invoices.component.html'
})
export class InvoicesComponent {
  private messages = inject(MessageService);

  allInvoicesSignal = invoicesData;
  statusSeverity = statusSeverity;

  includeDisabled = signal(false);

  filteredInvoices = computed(() => {
    const list = this.allInvoicesSignal();
    if (this.includeDisabled()) return list;
    return list.filter((i) => i.active);
  });

  toggleIncludeDisabled(value: boolean) {
    this.includeDisabled.set(value);
  }

  indexOf(row: Invoice): number {
    return this.allInvoicesSignal().indexOf(row);
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

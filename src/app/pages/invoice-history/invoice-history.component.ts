import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { invoicesData, invoiceHistoryData, AuditEntry } from '../../core/mock-data';
import { HistoryTableComponent } from '../../shared/history-table/history-table.component';

/** Real-app-accurate "Invoice Details History" full page, seeded with the
 * "Translation of 2 modules" project's actual captured per-InvoiceDetailID
 * audit trail; every other project correctly shows empty, matching the
 * real app's default for a project whose invoice history wasn't
 * individually captured. */
@Component({
  selector: 'app-invoice-history',
  standalone: true,
  imports: [CommonModule, HistoryTableComponent],
  templateUrl: './invoice-history.component.html'
})
export class InvoiceHistoryComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messages = inject(MessageService);

  private index = Number(this.route.snapshot.paramMap.get('index'));
  private invoice = invoicesData()[this.index];

  entries: AuditEntry[] = this.invoice ? invoiceHistoryData[this.invoice.project] ?? [] : [];

  get subtitle(): string {
    return this.invoice ? this.invoice.project : '';
  }

  exportExcel() {
    this.messages.add({ severity: 'success', summary: 'Report Exported', detail: 'Report exported to Excel (.csv).' });
  }

  back() {
    this.router.navigate(['/invoice-details']);
  }
}

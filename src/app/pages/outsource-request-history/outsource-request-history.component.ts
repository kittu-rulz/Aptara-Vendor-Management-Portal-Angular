import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { outsourceRequestsData, outsourceRequestHistory, AuditEntry } from '../../core/mock-data';
import { HistoryTableComponent } from '../../shared/history-table/history-table.component';

/** Real-app-accurate "Outsource Request History" full page — replaces the
 * shared 4-row fake modal previously reused for every entity. Populated
 * with the real per-field change log for opn00016 (the one request with a
 * captured reference screenshot); every other request correctly shows
 * empty, matching the real app's default state for a record whose fields
 * haven't individually changed since creation. */
@Component({
  selector: 'app-outsource-request-history',
  standalone: true,
  imports: [CommonModule, HistoryTableComponent],
  templateUrl: './outsource-request-history.component.html'
})
export class OutsourceRequestHistoryComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messages = inject(MessageService);

  private index = Number(this.route.snapshot.paramMap.get('index'));
  private request = outsourceRequestsData()[this.index];

  entries: AuditEntry[] = outsourceRequestHistory[this.request?.id] ?? [];

  get title(): string {
    return `Outsource Request History`;
  }

  get subtitle(): string {
    return this.request ? `${this.request.id} • ${this.request.client} • ${this.request.project}` : '';
  }

  exportExcel() {
    this.messages.add({ severity: 'success', summary: 'Report Exported', detail: 'Report exported to Excel (.csv).' });
  }

  back() {
    this.router.navigate(['/outsource-requests']);
  }
}

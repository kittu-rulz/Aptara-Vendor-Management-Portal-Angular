import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MASTER_TYPES } from '../../core/master-registry';
import { AuditEntry, currencyHistoryData } from '../../core/mock-data';
import { HistoryTableComponent } from '../../shared/history-table/history-table.component';

/** Real-app-accurate per-record history page ("Nature Of Service History",
 * "Entity Master History", etc.) — a genuine full page with Export/Back,
 * not the shared 4-row modal this used to reuse everywhere. Masters have
 * no seeded change history in the real app until a record is actually
 * edited, so every row is empty by default EXCEPT the one row with a
 * captured real audit trail (Currency Master's USD/85/2025/April row). */
@Component({
  selector: 'app-master-history-page',
  standalone: true,
  imports: [CommonModule, HistoryTableComponent],
  templateUrl: './master-history-page.component.html'
})
export class MasterHistoryPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messages = inject(MessageService);

  masterType = this.route.snapshot.paramMap.get('masterType')!;
  config = MASTER_TYPES[this.masterType];
  private index = Number(this.route.snapshot.paramMap.get('index'));

  entries: AuditEntry[] = this.masterType === 'currency' && this.index === 0 ? currencyHistoryData : [];

  get title(): string {
    return `${this.config.breadcrumbLabel} History`;
  }

  exportExcel() {
    this.messages.add({ severity: 'success', summary: 'Report Exported', detail: 'Report exported to Excel (.csv).' });
  }

  back() {
    this.router.navigate(['/masters', this.masterType]);
  }
}

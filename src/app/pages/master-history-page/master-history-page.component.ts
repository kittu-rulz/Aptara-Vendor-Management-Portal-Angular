import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MASTER_TYPES } from '../../core/master-registry';
import { AuditEntry } from '../../core/mock-data';
import { HistoryTableComponent } from '../../shared/history-table/history-table.component';

/** Real-app-accurate per-record history page ("Nature Of Service History",
 * "Entity Master History", etc.) — a genuine full page with Export/Back,
 * not the shared 4-row modal this used to reuse everywhere. Masters have
 * no seeded change history in the real app until a record is actually
 * edited, so this correctly renders empty ("No records found") by default —
 * matching every Masters History screenshot captured. */
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

  /** No backend, so per-record history is always empty for masters —
   * matches the real app's own default state for unmodified records. */
  entries: AuditEntry[] = [];

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

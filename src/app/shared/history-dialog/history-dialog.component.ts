import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AuditEntry } from '../../core/mock-data';

/** Shared "History" modal used by every row-action History icon (Dashboard,
 * Vendors, Users, Invoices) — same shape as the standalone Audit Trail page,
 * retitled per entity, mirroring how the original prototype reused one
 * history modal shell across every table with a contextual title/subtitle. */
@Component({
  selector: 'app-history-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, TableModule, ButtonModule],
  templateUrl: './history-dialog.component.html',
  styleUrl: './history-dialog.component.css'
})
export class HistoryDialogComponent {
  @Input() visible = false;
  @Input() title = 'History';
  @Input() subtitle = '';
  @Input() entries: AuditEntry[] = [];

  @Output() visibleChange = new EventEmitter<boolean>();

  onVisibleChange(value: boolean) {
    this.visible = value;
    this.visibleChange.emit(value);
  }

  close() {
    this.onVisibleChange(false);
  }
}

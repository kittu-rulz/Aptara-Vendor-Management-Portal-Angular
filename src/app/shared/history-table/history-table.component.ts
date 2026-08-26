import { Component, EventEmitter, Input, OnInit, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AuditEntry } from '../../core/mock-data';

export type HistoryField = 'attr' | 'oldVal' | 'newVal' | 'user' | 'date' | 'comment';

/** Shared "History" table used by every real-app-accurate history page
 * (Masters, Outsource Requests, Vendors, Users, Invoices) — matches the
 * confirmed real-app pattern: sortable columns, a per-column filter row,
 * and a paginator, all captured directly on the Outsource Request History
 * and Invoice Details History screens. */
@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule],
  templateUrl: './history-table.component.html'
})
export class HistoryTableComponent implements OnInit {
  @Input() title = 'History';
  @Input() subtitle = '';
  @Input() entries: AuditEntry[] = [];
  /** Masters History pages label the last column "Action" instead of
   * "Comment" — a real inconsistency confirmed against live screenshots of
   * both, everywhere else uses "Comment". */
  @Input() lastColumnLabel = 'Comment';
  /** Masters History pages load with "Changed On" already sorted (confirmed
   * on 2 separate live captures); Outsource/Vendor/User/Invoice History
   * pages load unsorted — confirmed NOT to have this on Invoice History. */
  @Input() defaultSortField: HistoryField | null = null;
  @Output() back = new EventEmitter<void>();
  @Output() exportExcel = new EventEmitter<void>();

  ngOnInit() {
    if (this.defaultSortField) {
      this.sortField.set(this.defaultSortField);
      /** Real screenshots show most-recent-first ordering under the
       * default "Changed On" sort, so default to descending. */
      this.sortAsc.set(false);
    }
  }

  columnFilters = signal<Record<HistoryField, string>>({
    attr: '',
    oldVal: '',
    newVal: '',
    user: '',
    date: '',
    comment: ''
  });

  sortField = signal<HistoryField | null>(null);
  sortAsc = signal(true);

  filteredEntries = computed(() => {
    const filters = this.columnFilters();
    const filtered = this.entries.filter(
      (e) =>
        (e.attr ?? '').toLowerCase().includes(filters.attr.toLowerCase()) &&
        (e.oldVal ?? '').toLowerCase().includes(filters.oldVal.toLowerCase()) &&
        (e.newVal ?? '').toLowerCase().includes(filters.newVal.toLowerCase()) &&
        (e.user ?? '').toLowerCase().includes(filters.user.toLowerCase()) &&
        (e.date ?? '').toLowerCase().includes(filters.date.toLowerCase()) &&
        (e.comment ?? '').toLowerCase().includes(filters.comment.toLowerCase())
    );

    const field = this.sortField();
    if (!field) return filtered;
    const asc = this.sortAsc() ? 1 : -1;
    return [...filtered].sort((a, b) => String(a[field] ?? '').localeCompare(String(b[field] ?? '')) * asc);
  });

  setColumnFilter(field: HistoryField, value: string) {
    this.columnFilters.update((f) => ({ ...f, [field]: value }));
  }

  toggleSort(field: HistoryField) {
    if (this.sortField() === field) {
      this.sortAsc.update((v) => !v);
    } else {
      this.sortField.set(field);
      this.sortAsc.set(true);
    }
  }
}

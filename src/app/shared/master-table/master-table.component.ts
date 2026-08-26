import { Component, Input, WritableSignal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { MasterRow } from '../../core/mock-data';

export interface MasterColumn {
  key: string;
  label: string;
}

/** Generic list table shared by all 8 row-based Masters pages. Add/Edit/View
 * navigate to the routed MasterFormPageComponent and History to
 * MasterHistoryPageComponent (matching the real app, where every one of
 * these is its own page — see master-registry.ts), rather than opening a
 * dialog. Toolbar/filter/sort mechanics match the real app exactly: an
 * "Include Disable" checkbox (not filter chips), a sortable+text-filterable
 * header per business column, and a sortable "Active" column filtered by a
 * Yes/No Select dropdown. */
@Component({
  selector: 'app-master-table',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TableModule, TagModule, ButtonModule],
  templateUrl: './master-table.component.html',
  styleUrl: './master-table.component.css'
})
export class MasterTableComponent {
  @Input() rows!: WritableSignal<MasterRow[]>;
  @Input() columns: MasterColumn[] = [];
  @Input() addLabel = 'Item';
  @Input() countLabel = 'All';
  @Input() masterType!: string;
  /** Currency Master uniquely labels this column "IsActive" instead of
   * "Active" — confirmed against a live screenshot; every other master
   * uses "Active". */
  @Input() activeLabel = 'Active';

  private messages = inject(MessageService);

  exportExcel() {
    this.messages.add({ severity: 'success', summary: 'Report Exported', detail: 'Report exported to Excel (.csv).' });
  }

  includeDisabled = signal(false);
  columnFilters = signal<Record<string, string>>({});
  activeFilterValue = signal('');
  sortField = signal<string | null>(null);
  sortAsc = signal(true);

  toggleIncludeDisabled(value: boolean) {
    this.includeDisabled.set(value);
  }

  setColumnFilter(key: string, value: string) {
    this.columnFilters.update((f) => ({ ...f, [key]: value }));
  }

  setActiveFilter(value: string) {
    this.activeFilterValue.set(value);
  }

  toggleSort(key: string) {
    if (this.sortField() === key) {
      this.sortAsc.update((v) => !v);
    } else {
      this.sortField.set(key);
      this.sortAsc.set(true);
    }
  }

  filteredRows = computed(() => {
    const list = this.includeDisabled() ? this.rows() : this.rows().filter((r) => r['active'] !== false);
    const filters = this.columnFilters();
    const activeFilterValue = this.activeFilterValue();
    let filtered = list.filter((r) =>
      this.columns.every((col) => String(r[col.key] ?? '').toLowerCase().includes((filters[col.key] ?? '').toLowerCase()))
    );
    if (activeFilterValue) {
      const wantActive = activeFilterValue === 'Yes';
      filtered = filtered.filter((r) => Boolean(r['active']) === wantActive);
    }

    const field = this.sortField();
    if (!field) return filtered;
    const asc = this.sortAsc() ? 1 : -1;
    return [...filtered].sort((a, b) => {
      if (field === 'active') return (Number(a['active']) - Number(b['active'])) * asc;
      return String(a[field] ?? '').localeCompare(String(b[field] ?? '')) * asc;
    });
  });

  /** Row identity for routing is the row's position in the underlying
   * signal array — there's no backend id, and array order is stable for
   * the lifetime of the session. */
  indexOf(row: MasterRow): number {
    return this.rows().indexOf(row);
  }

  toggleActive(row: MasterRow) {
    const nextActive = !row['active'];
    this.rows.update((list) => list.map((r) => (r === row ? { ...r, active: nextActive } : r)));
    this.messages.add({
      severity: nextActive ? 'success' : 'warn',
      summary: nextActive ? 'Enabled' : 'Disabled',
      detail: `${row[this.columns[0]?.key] ?? 'Record'} is now ${nextActive ? 'active' : 'disabled'}.`
    });
  }
}

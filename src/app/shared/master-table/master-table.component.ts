import { Component, Input, WritableSignal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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

type ActiveFilter = 'all' | 'Active' | 'Disabled';

/** Generic list table shared by all 8 row-based Masters pages. Add/Edit/View
 * navigate to the routed MasterFormPageComponent and History to
 * MasterHistoryPageComponent (matching the real app, where every one of
 * these is its own page — see master-registry.ts), rather than opening a
 * dialog. */
@Component({
  selector: 'app-master-table',
  standalone: true,
  imports: [CommonModule, RouterLink, TableModule, TagModule, ButtonModule],
  templateUrl: './master-table.component.html',
  styleUrl: './master-table.component.css'
})
export class MasterTableComponent {
  @Input() rows!: WritableSignal<MasterRow[]>;
  @Input() columns: MasterColumn[] = [];
  @Input() addLabel = 'Item';
  @Input() countLabel = 'All';
  @Input() masterType!: string;

  private messages = inject(MessageService);

  exportExcel() {
    this.messages.add({ severity: 'success', summary: 'Report Exported', detail: 'Report exported to Excel (.csv).' });
  }

  activeFilter = signal<ActiveFilter>('all');

  filteredRows = computed(() => {
    const filter = this.activeFilter();
    const list = this.rows();
    if (filter === 'all') return list;
    const wantActive = filter === 'Active';
    return list.filter((r) => Boolean(r['active']) === wantActive);
  });

  setFilter(filter: ActiveFilter) {
    this.activeFilter.set(filter);
  }

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

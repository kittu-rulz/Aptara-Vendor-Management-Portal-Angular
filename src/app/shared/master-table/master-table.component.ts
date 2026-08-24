import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MasterRow } from '../../core/mock-data';

export interface MasterColumn {
  key: string;
  label: string;
}

type ActiveFilter = 'all' | 'Active' | 'Disabled';

/** Generic list table shared by all 9 Masters & Config pages — they only
 * differ by which columns they show and what the "Add" button is labeled,
 * so one configurable component replaces 9 near-identical ones. */
@Component({
  selector: 'app-master-table',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  templateUrl: './master-table.component.html',
  styleUrl: './master-table.component.css'
})
export class MasterTableComponent {
  @Input() rows: MasterRow[] = [];
  @Input() columns: MasterColumn[] = [];
  @Input() addLabel = 'Item';
  @Input() countLabel = 'All';

  activeFilter = signal<ActiveFilter>('all');

  filteredRows = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.rows;
    const wantActive = filter === 'Active';
    return this.rows.filter((r) => Boolean(r['active']) === wantActive);
  });

  setFilter(filter: ActiveFilter) {
    this.activeFilter.set(filter);
  }
}

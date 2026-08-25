import { Component, Input, OnInit, WritableSignal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { MasterRow } from '../../core/mock-data';
import { EntityDialogComponent, EntityField } from '../entity-dialog/entity-dialog.component';

export interface MasterColumn {
  key: string;
  label: string;
}

type ActiveFilter = 'all' | 'Active' | 'Disabled';

/** Generic list table shared by all 8 row-based Masters pages — they only
 * differ by which columns they show and what the "Add" button is labeled,
 * so one configurable component replaces 8 near-identical ones. Also owns
 * the Edit/Add/Disable interactivity: the original prototype's masters all
 * follow the same pattern (edit-master modal, add-master in the same modal
 * with blank fields, a Disable toggle) so it's wired here once. */
@Component({
  selector: 'app-master-table',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule, EntityDialogComponent],
  templateUrl: './master-table.component.html',
  styleUrl: './master-table.component.css'
})
export class MasterTableComponent implements OnInit {
  @Input() rows!: WritableSignal<MasterRow[]>;
  @Input() columns: MasterColumn[] = [];
  @Input() addLabel = 'Item';
  @Input() countLabel = 'All';

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

  dialogVisible = false;
  dialogTitle = '';
  dialogModel: MasterRow = {};
  dialogFields: EntityField[] = [];
  private editingRow: MasterRow | null = null;

  ngOnInit() {
    // Computed once from the (static, route-provided) columns input rather
    // than as a template-bound getter — a getter re-allocates a brand-new
    // array and brand-new field objects on every change-detection check,
    // which defeats *ngFor's default identity-based tracking and can spiral
    // into a render loop (each check destroys/recreates the dialog's field
    // DOM, which can retrigger PrimeNG's internal dialog observers, which
    // triggers another check). This was the root cause of the dialog
    // appearing to hang when opened.
    this.dialogFields = this.columns.map((c) => ({ key: c.key, label: c.label, type: 'text' }));
  }

  setFilter(filter: ActiveFilter) {
    this.activeFilter.set(filter);
  }

  openEdit(row: MasterRow) {
    this.editingRow = row;
    this.dialogTitle = `Edit: ${row[this.columns[0]?.key] ?? ''}`;
    this.dialogModel = { ...row };
    this.dialogVisible = true;
  }

  openAdd() {
    this.editingRow = null;
    this.dialogTitle = `Add ${this.addLabel}`;
    const blank: MasterRow = { active: true };
    for (const col of this.columns) blank[col.key] = '';
    this.dialogModel = blank;
    this.dialogVisible = true;
  }

  onSave(draft: Record<string, any>) {
    if (this.editingRow) {
      this.rows.update((list) => list.map((r) => (r === this.editingRow ? { ...r, ...draft } : r)));
      this.messages.add({ severity: 'success', summary: 'Master Data Saved', detail: 'Configuration parameters updated in master table.' });
    } else {
      this.rows.update((list) => [...list, { active: true, ...draft } as MasterRow]);
      this.messages.add({ severity: 'success', summary: `${this.addLabel} Added`, detail: `New ${this.addLabel.toLowerCase()} record created.` });
    }
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

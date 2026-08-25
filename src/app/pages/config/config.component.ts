import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { configData, ConfigRow } from '../../core/mock-data';
import { EntityDialogComponent, EntityField } from '../../shared/entity-dialog/entity-dialog.component';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [TableModule, ButtonModule, EntityDialogComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {
  private messages = inject(MessageService);

  rows = configData;

  dialogVisible = false;
  dialogTitle = '';
  dialogModel: ConfigRow = { key: '', val: '' };
  dialogFields: EntityField[] = [{ key: 'val', label: 'Setting Value', type: 'text' }];
  private editingRow: ConfigRow | null = null;

  openEdit(row: ConfigRow) {
    this.editingRow = row;
    this.dialogTitle = `Edit: ${row.key}`;
    this.dialogModel = { ...row };
    this.dialogVisible = true;
  }

  onSave(draft: Record<string, any>) {
    if (!this.editingRow) return;
    this.rows.update((list) => list.map((r) => (r === this.editingRow ? { ...r, val: draft['val'] } : r)));
    this.messages.add({ severity: 'success', summary: 'Master Data Saved', detail: 'Configuration parameters updated in master table.' });
  }

  exportExcel() {
    this.messages.add({ severity: 'success', summary: 'Report Exported', detail: 'Report exported to Excel (.csv).' });
  }
}

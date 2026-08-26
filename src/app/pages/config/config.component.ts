import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { configData, ConfigRow } from '../../core/mock-data';

/** Configuration Setting is the one master in the real app that isn't a
 * routed Add/Edit/View page or a modal — it's edited inline in the row
 * (pencil -> the Value cell becomes a True/False dropdown with a
 * checkmark/X to confirm or cancel). */
@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, DropdownModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {
  private messages = inject(MessageService);

  rows = configData;
  boolOptions = ['True', 'False'];

  editingKey: string | null = null;
  draftValue = '';

  isEditing(row: ConfigRow): boolean {
    return this.editingKey === row.key;
  }

  startEdit(row: ConfigRow) {
    this.editingKey = row.key;
    this.draftValue = row.val;
  }

  confirmEdit(row: ConfigRow) {
    this.rows.update((list) => list.map((r) => (r === row ? { ...r, val: this.draftValue } : r)));
    this.messages.add({ severity: 'success', summary: 'Master Data Saved', detail: 'Configuration parameters updated in master table.' });
    this.editingKey = null;
  }

  cancelEdit() {
    this.editingKey = null;
  }
}

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

export interface EntityField {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'checkbox' | 'select';
  options?: string[];
}

/** Generic view/edit/add form dialog shared across every page with row
 * actions — Vendors, Users, Masters, Config, and the Outsource Requests
 * table. Each page just describes its own field list; this renders the
 * PrimeNG form and hands back the edited draft on Save. */
@Component({
  selector: 'app-entity-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule, InputTextModule, CheckboxModule, DropdownModule, ButtonModule],
  templateUrl: './entity-dialog.component.html',
  styleUrl: './entity-dialog.component.css'
})
export class EntityDialogComponent implements OnChanges {
  @Input() visible = false;
  @Input() title = '';
  @Input() fields: EntityField[] = [];
  @Input() model: Record<string, any> = {};
  @Input() readonly = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<Record<string, any>>();

  draft: Record<string, any> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && this.visible) {
      this.draft = { ...this.model };
    }
  }

  onVisibleChange(value: boolean) {
    this.visible = value;
    this.visibleChange.emit(value);
  }

  close() {
    this.onVisibleChange(false);
  }

  onSave() {
    this.save.emit(this.draft);
    this.close();
  }

  trackByKey(_index: number, field: EntityField) {
    return field.key;
  }
}

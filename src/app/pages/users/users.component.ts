import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { usersData, AppUser, auditHistoryData } from '../../core/mock-data';
import { EntityDialogComponent, EntityField } from '../../shared/entity-dialog/entity-dialog.component';
import { HistoryDialogComponent } from '../../shared/history-dialog/history-dialog.component';

type UserFilter = 'all' | 'Internal User' | 'Vendor' | 'ENT Vendor Team';

const EDIT_FIELDS: EntityField[] = [
  { key: 'first', label: 'First Name', type: 'text' },
  { key: 'last', label: 'Last Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'phone', label: 'Contact', type: 'text' }
];

const ADD_FIELDS: EntityField[] = [
  ...EDIT_FIELDS,
  { key: 'role', label: 'User Type', type: 'select', options: ['Internal User', 'Vendor', 'ENT Vendor Team'] },
  { key: 'vendor', label: 'Vendor', type: 'text' }
];

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule, EntityDialogComponent, HistoryDialogComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  private messages = inject(MessageService);

  allUsersSignal = usersData;

  activeFilter = signal<UserFilter>('all');

  filteredUsers = computed(() => {
    const filter = this.activeFilter();
    const list = this.allUsersSignal();
    if (filter === 'all') return list;
    return list.filter((u) => u.role === filter);
  });

  get allUsers() {
    return this.allUsersSignal();
  }

  setFilter(filter: UserFilter) {
    this.activeFilter.set(filter);
  }

  dialogVisible = false;
  dialogTitle = '';
  dialogFields: EntityField[] = EDIT_FIELDS;
  dialogModel: Partial<AppUser> = {};
  private editingRow: AppUser | null = null;

  historyVisible = false;
  historyTitle = '';
  historySubtitle = '';
  historyEntries = auditHistoryData;

  openEdit(u: AppUser) {
    this.editingRow = u;
    this.dialogTitle = `Edit User: ${u.first} ${u.last}`;
    this.dialogFields = EDIT_FIELDS;
    this.dialogModel = { ...u };
    this.dialogVisible = true;
  }

  openAdd() {
    this.editingRow = null;
    this.dialogTitle = 'Add System User';
    this.dialogFields = ADD_FIELDS;
    this.dialogModel = { role: 'Internal User', vendor: '', status: 'Active' };
    this.dialogVisible = true;
  }

  onSave(draft: Record<string, any>) {
    if (this.editingRow) {
      const row = this.editingRow;
      this.allUsersSignal.update((list) => list.map((u) => (u === row ? { ...u, ...draft } : u)));
      this.messages.add({ severity: 'success', summary: 'User Saved', detail: 'User credentials and permissions updated.' });
    } else {
      this.allUsersSignal.update((list) => [...list, { status: 'Active', ...draft } as AppUser]);
      this.messages.add({ severity: 'success', summary: 'User Added', detail: 'New system user created.' });
    }
  }

  toggleStatus(u: AppUser) {
    const next = u.status === 'Active' ? 'Inactive' : 'Active';
    this.allUsersSignal.update((list) => list.map((row) => (row === u ? { ...row, status: next } : row)));
    this.messages.add({
      severity: next === 'Active' ? 'success' : 'warn',
      summary: next === 'Active' ? 'User Enabled' : 'User Disabled',
      detail: `${u.first} ${u.last} is now ${next === 'Active' ? 'active' : 'disabled'}.`
    });
  }

  openHistory(u: AppUser) {
    this.historyTitle = `User History: ${u.first} ${u.last}`;
    this.historySubtitle = u.email;
    this.historyVisible = true;
  }

  exportExcel() {
    this.messages.add({ severity: 'success', summary: 'Report Exported', detail: 'Report exported to Excel (.csv).' });
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { usersData, AppUser } from '../../core/mock-data';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink, TableModule, TagModule, ButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  private messages = inject(MessageService);

  allUsersSignal = usersData;

  includeDisabled = signal(false);

  filteredUsers = computed(() => {
    const list = this.allUsersSignal();
    if (this.includeDisabled()) return list;
    return list.filter((u) => u.status === 'Active');
  });

  get allUsers() {
    return this.allUsersSignal();
  }

  toggleIncludeDisabled(value: boolean) {
    this.includeDisabled.set(value);
  }

  indexOf(row: AppUser): number {
    return this.allUsersSignal().indexOf(row);
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

  exportExcel() {
    this.messages.add({ severity: 'success', summary: 'Report Exported', detail: 'Report exported to Excel (.csv).' });
  }
}

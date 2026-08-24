import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { usersData, AppUser } from '../../core/mock-data';

type UserFilter = 'all' | 'Internal User' | 'Vendor' | 'ENT Vendor Team';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  allUsers: AppUser[] = usersData;

  activeFilter = signal<UserFilter>('all');

  filteredUsers = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.allUsers;
    return this.allUsers.filter((u) => u.role === filter);
  });

  setFilter(filter: UserFilter) {
    this.activeFilter.set(filter);
  }
}

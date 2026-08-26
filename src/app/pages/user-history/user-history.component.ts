import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { usersData, userHistoryData, AuditEntry } from '../../core/mock-data';
import { HistoryTableComponent } from '../../shared/history-table/history-table.component';

/** Real-app-accurate "User History" full page, seeded with John Doe's
 * actual captured "Record: Created" entry; every other user correctly
 * shows empty, matching the real app's default for a record whose
 * individual fields haven't changed since creation. */
@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [CommonModule, HistoryTableComponent],
  templateUrl: './user-history.component.html'
})
export class UserHistoryComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messages = inject(MessageService);

  private index = Number(this.route.snapshot.paramMap.get('index'));
  private user = usersData()[this.index];

  entries: AuditEntry[] = this.user ? (userHistoryData[this.user.email] ?? []) : [];

  get subtitle(): string {
    return this.user ? `${this.user.first} ${this.user.last} • ${this.user.email}` : '';
  }

  exportExcel() {
    this.messages.add({ severity: 'success', summary: 'Report Exported', detail: 'Report exported to Excel (.csv).' });
  }

  back() {
    this.router.navigate(['/manage-users']);
  }
}

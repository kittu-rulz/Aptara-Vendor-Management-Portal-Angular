import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { usersData, AppUser, TASK_PERMISSIONS, vendorsData } from '../../core/mock-data';

type FormMode = 'add' | 'edit' | 'view';

const USER_TYPES = ['Internal User', 'Vendor', 'ENT Vendor Team'];

/** Real-app-accurate replacement for the old 4-field user dialog: matches
 * the production app's "Add User" page, including its full Task
 * Permissions checklist (27 real items, confirmed via screenshot). */
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, DropdownModule, ButtonModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messages = inject(MessageService);

  mode: FormMode = (this.route.snapshot.data['mode'] as FormMode) ?? 'add';
  private index = this.route.snapshot.paramMap.has('index') ? Number(this.route.snapshot.paramMap.get('index')) : null;

  userTypes = USER_TYPES;
  vendorNames = vendorsData().map((v) => v.name);
  allPermissions = TASK_PERMISSIONS;

  draft: AppUser = this.mode === 'add' ? this.blankUser() : { ...usersData()[this.index!] };
  selectedPermissions: Set<string> = new Set(this.draft.permissions);

  get readonly(): boolean {
    return this.mode === 'view';
  }

  get title(): string {
    if (this.mode === 'add') return 'Add User';
    if (this.mode === 'view') return 'View User';
    return 'Edit User';
  }

  private blankUser(): AppUser {
    return { first: '', last: '', email: '', phone: '', role: 'Internal User', vendor: '', status: 'Active', permissions: [] };
  }

  isChecked(permission: string): boolean {
    return this.selectedPermissions.has(permission);
  }

  togglePermission(permission: string, checked: boolean) {
    if (checked) this.selectedPermissions.add(permission);
    else this.selectedPermissions.delete(permission);
  }

  get allSelected(): boolean {
    return this.selectedPermissions.size === this.allPermissions.length;
  }

  toggleAll(checked: boolean) {
    this.selectedPermissions = checked ? new Set(this.allPermissions) : new Set();
  }

  save() {
    this.draft.permissions = Array.from(this.selectedPermissions);
    if (this.mode === 'add') {
      usersData.update((list) => [...list, { ...this.draft }]);
      this.messages.add({ severity: 'success', summary: 'User Added', detail: 'New system user created.' });
    } else {
      const idx = this.index!;
      usersData.update((list) => list.map((u, i) => (i === idx ? { ...this.draft } : u)));
      this.messages.add({ severity: 'success', summary: 'User Saved', detail: 'User credentials and permissions updated.' });
    }
    this.cancel();
  }

  cancel() {
    this.router.navigate(['/manage-users']);
  }
}

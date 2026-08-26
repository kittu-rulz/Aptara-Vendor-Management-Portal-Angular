import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { vendorsData, statusSeverity, Vendor, auditHistoryData } from '../../core/mock-data';
import { EntityDialogComponent, EntityField } from '../../shared/entity-dialog/entity-dialog.component';
import { HistoryDialogComponent } from '../../shared/history-dialog/history-dialog.component';

type VendorFilter = 'all' | 'Active' | 'Approved';

const EDIT_FIELDS: EntityField[] = [
  { key: 'name', label: 'Name of Company', type: 'text' },
  { key: 'city', label: 'City', type: 'text' },
  { key: 'contact', label: 'Contact Person', type: 'text' },
  { key: 'email', label: 'Email ID', type: 'text' },
  { key: 'services', label: 'Nature of Service', type: 'text' }
];

const ADD_FIELDS: EntityField[] = [
  ...EDIT_FIELDS,
  { key: 'organization', label: 'Type of Organization', type: 'text' },
  { key: 'vendorStatus', label: 'Vendor Status', type: 'select', options: ['Approved', 'Pending', 'Rejected'] },
  { key: 'status', label: 'Record Status', type: 'select', options: ['Active', 'Inactive'] }
];

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule, EntityDialogComponent, HistoryDialogComponent],
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.css'
})
export class VendorsComponent {
  private messages = inject(MessageService);

  allVendorsSignal = vendorsData;
  statusSeverity = statusSeverity;

  activeFilter = signal<VendorFilter>('all');

  filteredVendors = computed(() => {
    const filter = this.activeFilter();
    const list = this.allVendorsSignal();
    if (filter === 'all') return list;
    return list.filter((v) => v.status === filter || v.vendorStatus === filter);
  });

  get allVendors() {
    return this.allVendorsSignal();
  }

  setFilter(filter: VendorFilter) {
    this.activeFilter.set(filter);
  }

  dialogVisible = false;
  dialogReadonly = false;
  dialogTitle = '';
  dialogFields: EntityField[] = EDIT_FIELDS;
  dialogModel: Partial<Vendor> = {};
  private editingRow: Vendor | null = null;

  historyVisible = false;
  historyTitle = '';
  historySubtitle = '';
  historyEntries = auditHistoryData;

  openView(v: Vendor) {
    this.editingRow = v;
    this.dialogReadonly = true;
    this.dialogTitle = `Vendor Profile: ${v.name}`;
    this.dialogFields = EDIT_FIELDS;
    this.dialogModel = { ...v };
    this.dialogVisible = true;
  }

  openEdit(v: Vendor) {
    this.editingRow = v;
    this.dialogReadonly = false;
    this.dialogTitle = `Edit Vendor: ${v.name}`;
    this.dialogFields = EDIT_FIELDS;
    this.dialogModel = { ...v };
    this.dialogVisible = true;
  }

  openAdd() {
    this.editingRow = null;
    this.dialogReadonly = false;
    this.dialogTitle = 'Add Vendor';
    this.dialogFields = ADD_FIELDS;
    this.dialogModel = { organization: '', vendorStatus: 'Approved', status: 'Active', code: String(1000 + this.allVendors.length) };
    this.dialogVisible = true;
  }

  onSave(draft: Record<string, any>) {
    if (this.editingRow) {
      const row = this.editingRow;
      this.allVendorsSignal.update((list) => list.map((v) => (v === row ? { ...v, ...draft } : v)));
      this.messages.add({ severity: 'success', summary: 'Vendor Updated', detail: 'Vendor record saved successfully.' });
    } else {
      this.allVendorsSignal.update((list) => [...list, draft as Vendor]);
      this.messages.add({ severity: 'success', summary: 'Vendor Added', detail: 'New vendor record created.' });
    }
  }

  openHistory(v: Vendor) {
    this.historyTitle = `Vendor History: ${v.name}`;
    this.historySubtitle = `Vendor Code ${v.code}`;
    this.historyVisible = true;
  }

  toggleStatus(v: Vendor) {
    const next = v.status === 'Active' ? 'Inactive' : 'Active';
    this.allVendorsSignal.update((list) => list.map((row) => (row === v ? { ...row, status: next } : row)));
    this.messages.add({
      severity: next === 'Active' ? 'success' : 'warn',
      summary: next === 'Active' ? 'Vendor Enabled' : 'Vendor Disabled',
      detail: `${v.name} is now ${next === 'Active' ? 'active' : 'disabled'}.`
    });
  }

  sendRegistrationLink() {
    this.messages.add({ severity: 'success', summary: 'Invitation Sent', detail: 'Vendor onboarding link sent via corporate email.' });
  }

  exportExcel() {
    this.messages.add({ severity: 'success', summary: 'Report Exported', detail: 'Report exported to Excel (.csv).' });
  }
}

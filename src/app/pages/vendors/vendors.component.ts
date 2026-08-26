import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { vendorsData, statusSeverity, Vendor } from '../../core/mock-data';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [CommonModule, RouterLink, TableModule, TagModule, ButtonModule],
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.css'
})
export class VendorsComponent {
  private messages = inject(MessageService);

  allVendorsSignal = vendorsData;
  statusSeverity = statusSeverity;

  includeDisabled = signal(false);
  includeRejected = signal(false);

  filteredVendors = computed(() => {
    const list = this.allVendorsSignal();
    return list.filter((v) => {
      if (!this.includeDisabled() && v.status !== 'Active') return false;
      if (!this.includeRejected() && v.vendorStatus === 'Rejected') return false;
      return true;
    });
  });

  get allVendors() {
    return this.allVendorsSignal();
  }

  toggleIncludeDisabled(value: boolean) {
    this.includeDisabled.set(value);
  }

  toggleIncludeRejected(value: boolean) {
    this.includeRejected.set(value);
  }

  indexOf(row: Vendor): number {
    return this.allVendorsSignal().indexOf(row);
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

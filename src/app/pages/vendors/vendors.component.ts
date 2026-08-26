import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { vendorsData, statusSeverity, Vendor } from '../../core/mock-data';

type VendorFilter = 'all' | 'Active' | 'Approved';

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

import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { vendorsData, statusSeverity, Vendor } from '../../core/mock-data';

type VendorFilter = 'all' | 'Active' | 'Approved';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.css'
})
export class VendorsComponent {
  allVendors: Vendor[] = vendorsData;
  statusSeverity = statusSeverity;

  activeFilter = signal<VendorFilter>('all');

  filteredVendors = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.allVendors;
    return this.allVendors.filter((v) => v.status === filter || v.vendorStatus === filter);
  });

  setFilter(filter: VendorFilter) {
    this.activeFilter.set(filter);
  }
}

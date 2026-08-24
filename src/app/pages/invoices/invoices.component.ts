import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { invoicesData, statusSeverity, Invoice } from '../../core/mock-data';

type InvoiceFilter = 'all' | 'Paid & Closed' | 'Pending PM Approval';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent {
  allInvoices: Invoice[] = invoicesData;
  statusSeverity = statusSeverity;

  activeFilter = signal<InvoiceFilter>('all');

  filteredInvoices = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.allInvoices;
    return this.allInvoices.filter((i) => i.status === filter);
  });

  setFilter(filter: InvoiceFilter) {
    this.activeFilter.set(filter);
  }
}

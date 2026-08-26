import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { vendorsData, vendorHistoryData, AuditEntry } from '../../core/mock-data';
import { HistoryTableComponent } from '../../shared/history-table/history-table.component';

/** Real-app-accurate "Vendor History" full page, seeded with SNT Ltd's
 * actual captured change log — every other vendor (there is only one in
 * this mock dataset) would show empty by the same convention used
 * elsewhere. */
@Component({
  selector: 'app-vendor-history',
  standalone: true,
  imports: [CommonModule, HistoryTableComponent],
  templateUrl: './vendor-history.component.html'
})
export class VendorHistoryComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messages = inject(MessageService);

  private index = Number(this.route.snapshot.paramMap.get('index'));
  private vendor = vendorsData()[this.index];

  entries: AuditEntry[] = this.vendor ? vendorHistoryData : [];

  get subtitle(): string {
    return this.vendor ? `Vendor Code ${this.vendor.code}` : '';
  }

  exportExcel() {
    this.messages.add({ severity: 'success', summary: 'Report Exported', detail: 'Report exported to Excel (.csv).' });
  }

  back() {
    this.router.navigate(['/manage-vendors']);
  }
}

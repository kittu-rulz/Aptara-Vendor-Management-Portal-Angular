import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { statusSeverity } from '../../core/mock-data';

export interface ReportColumn {
  key: string;
  label: string;
  isStatus?: boolean;
}

export interface ReportFilter {
  label: string;
  type: 'date' | 'select';
  options?: string[];
}

/** Generic report table shared by all 4 Analytics & Reports pages — the
 * filter bar is visual-only (matching the original prototype, where these
 * selects didn't live-filter without a Search click on a tiny mock
 * dataset); each report only differs by its columns/filters/data. */
@Component({
  selector: 'app-report-page',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  templateUrl: './report-page.component.html',
  styleUrl: './report-page.component.css'
})
export class ReportPageComponent {
  private route = inject(ActivatedRoute);
  private data = this.route.snapshot.data;

  icon: string = this.data['icon'] ?? 'pi pi-file';
  heading: string = this.data['heading'] ?? 'Report';
  filters: ReportFilter[] = this.data['filters'] ?? [];
  columns: ReportColumn[] = this.data['columns'] ?? [];
  rows: any[] = this.data['rows'] ?? [];

  statusSeverity = statusSeverity;
}

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
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
  /** Row key this filter matches against. Omitted when the report's rows
   * carry no matching field (e.g. Market Segment on Vendor Report) — those
   * inputs stay visual-only since there's nothing to filter against. */
  field?: string;
  /** For paired date-range filters (Start Date/End Date) sharing one field. */
  range?: 'start' | 'end';
}

function parseDdMmYyyy(value: string): Date | null {
  const parts = value.split('/');
  if (parts.length !== 3) return null;
  const [d, m, y] = parts.map(Number);
  return new Date(y, m - 1, d);
}

/** Generic report table shared by all 4 Analytics & Reports pages. Search
 * is click-to-apply (matching the real app: filters don't live-filter as
 * you type/select — you set them, then click Search). Each ReportFilter
 * that declares a `field` is wired to the matching row key; filters with
 * no `field` (no matching data in the mock rows) stay visual-only. */
@Component({
  selector: 'app-report-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, TagModule, ButtonModule],
  templateUrl: './report-page.component.html',
  styleUrl: './report-page.component.css'
})
export class ReportPageComponent {
  private route = inject(ActivatedRoute);
  private messages = inject(MessageService);
  private data = this.route.snapshot.data;

  icon: string = this.data['icon'] ?? 'pi pi-file';
  heading: string = this.data['heading'] ?? 'Report';
  filters: ReportFilter[] = this.data['filters'] ?? [];
  columns: ReportColumn[] = this.data['columns'] ?? [];
  rows: any[] = this.data['rows'] ?? [];

  statusSeverity = statusSeverity;

  filterValues: string[] = this.filters.map(() => '');
  displayRows = signal<any[]>(this.rows);

  setFilterValue(index: number, value: string) {
    this.filterValues[index] = value;
  }

  search() {
    const startIdx = this.filters.findIndex((f) => f.range === 'start');
    const endIdx = this.filters.findIndex((f) => f.range === 'end');
    const startDate = startIdx >= 0 && this.filterValues[startIdx] ? new Date(this.filterValues[startIdx]) : null;
    const endDate = endIdx >= 0 && this.filterValues[endIdx] ? new Date(this.filterValues[endIdx]) : null;
    const dateField = this.filters[startIdx >= 0 ? startIdx : endIdx]?.field;

    const filtered = this.rows.filter((row) => {
      if (dateField && (startDate || endDate)) {
        const rowDate = parseDdMmYyyy(row[dateField]);
        if (rowDate) {
          if (startDate && rowDate < startDate) return false;
          if (endDate && rowDate > endDate) return false;
        }
      }
      return this.filters.every((f, i) => {
        if (f.type !== 'select' || !f.field) return true;
        const value = this.filterValues[i];
        if (!value) return true;
        return row[f.field] === value;
      });
    });

    this.displayRows.set(filtered);
    this.messages.add({
      severity: 'success',
      summary: 'Report Filtered',
      detail: `${filtered.length} of ${this.rows.length} record${this.rows.length === 1 ? '' : 's'} match.`
    });
  }
}

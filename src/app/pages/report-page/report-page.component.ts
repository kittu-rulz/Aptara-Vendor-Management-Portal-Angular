import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessageService } from 'primeng/api';
import { statusSeverity } from '../../core/mock-data';

export interface ReportColumn {
  key: string;
  label: string;
  isStatus?: boolean;
}

export interface ReportFilter {
  label: string;
  type: 'date' | 'select' | 'multiselect';
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

/** Generic report table shared by all 4 Analytics & Reports pages, matching
 * the real app's confirmed structure exactly: a filter card (grid of
 * fields, Search/Export bottom-right) above a separate results table card
 * that starts EMPTY ("No records found") until Search is clicked — it does
 * not show all rows by default. The results table itself is independently
 * sortable/filterable/paginated (25 rows/page), same as every other real
 * list in this app. */
@Component({
  selector: 'app-report-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, TagModule, ButtonModule, DropdownModule, MultiSelectModule],
  templateUrl: './report-page.component.html'
})
export class ReportPageComponent {
  private route = inject(ActivatedRoute);
  private messages = inject(MessageService);
  private data = this.route.snapshot.data;

  heading: string = this.data['heading'] ?? 'Report';
  filters: ReportFilter[] = this.data['filters'] ?? [];
  columns: ReportColumn[] = this.data['columns'] ?? [];
  rows: any[] = this.data['rows'] ?? [];

  statusSeverity = statusSeverity;

  /** Matches the real app's default state: Invoice Status filters start
   * pre-selected with "Invoice Approved" (visible as a chip token on every
   * captured Reports screenshot, before any user interaction). */
  filterValues: (string | string[])[] = this.filters.map((f) => (f.type === 'multiselect' ? ['Invoice Approved'] : ''));

  /** Empty by default — the real app never shows all rows on page load,
   * only after Search is explicitly clicked. */
  hasSearched = signal(false);
  searchedRows = signal<any[]>([]);

  columnFilters = signal<Record<string, string>>({});
  sortField = signal<string | null>(null);
  sortAsc = signal(true);

  displayRows = computed(() => {
    const filters = this.columnFilters();
    let list = this.searchedRows().filter((row) =>
      this.columns.every((col) => String(row[col.key] ?? '').toLowerCase().includes((filters[col.key] ?? '').toLowerCase()))
    );

    const field = this.sortField();
    if (field) {
      const asc = this.sortAsc() ? 1 : -1;
      list = [...list].sort((a, b) => String(a[field] ?? '').localeCompare(String(b[field] ?? '')) * asc);
    }
    return list;
  });

  setFilterValue(index: number, value: string | string[]) {
    this.filterValues[index] = value;
  }

  setColumnFilter(key: string, value: string) {
    this.columnFilters.update((f) => ({ ...f, [key]: value }));
  }

  toggleSort(key: string) {
    if (this.sortField() === key) {
      this.sortAsc.update((v) => !v);
    } else {
      this.sortField.set(key);
      this.sortAsc.set(true);
    }
  }

  search() {
    const startIdx = this.filters.findIndex((f) => f.range === 'start');
    const endIdx = this.filters.findIndex((f) => f.range === 'end');
    const startVal = startIdx >= 0 ? (this.filterValues[startIdx] as string) : '';
    const endVal = endIdx >= 0 ? (this.filterValues[endIdx] as string) : '';
    const startDate = startVal ? new Date(startVal) : null;
    const endDate = endVal ? new Date(endVal) : null;
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
        if (!f.field) return true;
        const value = this.filterValues[i];
        if (f.type === 'multiselect') {
          const selected = value as string[];
          if (!selected || selected.length === 0) return true;
          return selected.includes(row[f.field]);
        }
        if (f.type !== 'select') return true;
        if (!value) return true;
        return row[f.field] === value;
      });
    });

    this.hasSearched.set(true);
    this.searchedRows.set(filtered);
    this.messages.add({
      severity: 'success',
      summary: 'Report Filtered',
      detail: `${filtered.length} of ${this.rows.length} record${this.rows.length === 1 ? '' : 's'} match.`
    });
  }

  exportExcel() {
    this.messages.add({ severity: 'success', summary: 'Report Exported', detail: 'Report exported to Excel (.csv).' });
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { invoicesData, invoicePastData, PastInvoiceRow } from '../../core/mock-data';

type FormMode = 'add' | 'view';
type PastInvoiceField = 'num' | 'date' | 'desc' | 'amount' | 'currency' | 'status' | 'pmUser' | 'dmUser' | 'approvedBy';

const PM_USERS = ['Hemant Project Manager'];
const DM_USERS = ['Darshan Delivery Manager'];
const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];

/** Real-app-accurate replacement for the old p-dialog "Invoice Details"
 * modal: a dedicated routed page matching the real "Invoice Details" page
 * exactly (see screengrabs/_audit-notes.md items 11/12/14) — Project
 * Details are always read-only (pulled from the underlying outsource
 * request, not vendor-editable here), while PM/DM Approval User + Currency
 * are the fields actually submitted. A live screenshot specifically
 * captured to find the app's "approve/reject" UI showed no such buttons —
 * just this same page with Submit enabled (green) once PM/DM/Currency are
 * set, so the plus icon (new submission) and the check-circle icon
 * (approve an existing submission) both route here in 'add' mode; there is
 * no distinct read-only "approve" state or separate Reject action. */
@Component({
  selector: 'app-invoice-detail-page',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, TableModule, TagModule],
  templateUrl: './invoice-detail-page.component.html'
})
export class InvoiceDetailPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messages = inject(MessageService);

  mode: FormMode = (this.route.snapshot.data['mode'] as FormMode) ?? 'view';
  private index = Number(this.route.snapshot.paramMap.get('index'));

  pmUsers = PM_USERS;
  dmUsers = DM_USERS;
  currencies = CURRENCIES;

  invoice = invoicesData()[this.index];

  pmUser = this.invoice?.pmUser ?? '';
  dmUser = this.invoice?.dmUser ?? '';
  pmNotApplicable = false;
  dmNotApplicable = false;
  currency = '';

  pastInvoices: PastInvoiceRow[] = this.invoice ? invoicePastData[this.invoice.project] ?? [] : [];

  get isAdd(): boolean {
    return this.mode === 'add';
  }

  /** Matches the confirmed real-app difference between the unsent-invoice
   * form (no PM/DM fields shown) and the already-submitted one: in 'add'
   * mode these fields ARE the submission mechanism, so they always show;
   * in 'view' they only render once there's something to display. */
  get showApprovalFields(): boolean {
    return this.isAdd || this.invoice?.hasSubmission === true;
  }

  get approvalReadonly(): boolean {
    return this.mode !== 'add';
  }

  get canSubmit(): boolean {
    if (this.mode !== 'add') return false;
    const pmOk = this.pmNotApplicable || !!this.pmUser;
    const dmOk = this.dmNotApplicable || !!this.dmUser;
    return pmOk && dmOk && !!this.currency;
  }

  columnFilters = signal<Record<PastInvoiceField, string>>({
    num: '', date: '', desc: '', amount: '', currency: '', status: '', pmUser: '', dmUser: '', approvedBy: ''
  });
  sortField = signal<PastInvoiceField | null>(null);
  sortAsc = signal(true);

  filteredPastInvoices = computed(() => {
    const filters = this.columnFilters();
    const filtered = this.pastInvoices.filter((r) =>
      String(r.num).includes(filters.num) &&
      r.date.toLowerCase().includes(filters.date.toLowerCase()) &&
      r.desc.toLowerCase().includes(filters.desc.toLowerCase()) &&
      r.amount.toLowerCase().includes(filters.amount.toLowerCase()) &&
      r.currency.toLowerCase().includes(filters.currency.toLowerCase()) &&
      r.status.toLowerCase().includes(filters.status.toLowerCase()) &&
      r.pmUser.toLowerCase().includes(filters.pmUser.toLowerCase()) &&
      r.dmUser.toLowerCase().includes(filters.dmUser.toLowerCase()) &&
      r.approvedBy.toLowerCase().includes(filters.approvedBy.toLowerCase())
    );
    const field = this.sortField();
    if (!field) return filtered;
    const asc = this.sortAsc() ? 1 : -1;
    return [...filtered].sort((a, b) => String(a[field]).localeCompare(String(b[field]), undefined, { numeric: true }) * asc);
  });

  setColumnFilter(field: PastInvoiceField, value: string) {
    this.columnFilters.update((f) => ({ ...f, [field]: value }));
  }

  toggleSort(field: PastInvoiceField) {
    if (this.sortField() === field) {
      this.sortAsc.update((v) => !v);
    } else {
      this.sortField.set(field);
      this.sortAsc.set(true);
    }
  }

  submit() {
    if (!this.invoice || !this.canSubmit) return;
    const wasAlreadySubmitted = this.invoice.hasSubmission;
    invoicesData.update((list) =>
      list.map((i) =>
        i === this.invoice
          ? { ...i, hasSubmission: true, status: 'No Invoice Pending for Approval', pmUser: this.pmNotApplicable ? undefined : this.pmUser, dmUser: this.dmNotApplicable ? undefined : this.dmUser }
          : i
      )
    );
    this.messages.add({
      severity: 'success',
      summary: wasAlreadySubmitted ? 'Invoice Approved' : 'Invoice Submitted',
      detail: wasAlreadySubmitted
        ? `${this.invoice.project} invoice approved and forwarded for disbursement.`
        : `${this.invoice.project} invoice submitted for approval.`
    });
    this.cancel();
  }

  cancel() {
    this.router.navigate(['/invoice-details']);
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { outsourceRequestsData, OutsourceRequest, displayStatus, statusSeverity, entityData, marketSegmentData } from '../../core/mock-data';

type FormMode = 'add' | 'view';

const CURRENCIES = ['USD', 'INR', 'EUR', 'GBP'];
const PM_USERS = ['Hemant Project Manager'];
const DM_USERS = ['Darshan Delivery Manager'];
const STAGED_FILES = ['Band 6 Skills Definitions (1).pptx', 'Full file w Career Ladders and Skills.pptx'];

/** Real-app-accurate replacement for the old 5-field dialog: matches the
 * production app's "Outsource Request" create page and "Outsource
 * Completed" view/edit page — see screengrabs/_audit-notes.md. Since every
 * seeded request is already Awarded + Completed, Edit/View always render
 * the fuller "Outsource Completed" layout; only a brand-new request uses
 * the simpler create layout. */
@Component({
  selector: 'app-outsource-request-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, TableModule, TagModule],
  templateUrl: './outsource-request-form.component.html'
})
export class OutsourceRequestFormComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messages = inject(MessageService);

  mode: FormMode = (this.route.snapshot.data['mode'] as FormMode) ?? 'add';
  private index = this.route.snapshot.paramMap.has('index') ? Number(this.route.snapshot.paramMap.get('index')) : null;

  currencies = CURRENCIES;
  pmUsers = PM_USERS;
  dmUsers = DM_USERS;
  entities = entityData().map((e) => e['name'] as string);
  marketSegments = marketSegmentData().map((m) => m['segment'] as string);
  stagedFiles = STAGED_FILES;
  displayStatus = displayStatus;
  statusSeverity = statusSeverity;

  draft: OutsourceRequest =
    this.mode === 'add'
      ? this.blankRequest()
      : { ...outsourceRequestsData()[this.index!] };

  get isCompleted(): boolean {
    return this.mode !== 'add';
  }

  get title(): string {
    return this.isCompleted ? 'Outsource Completed' : 'Outsource Request';
  }

  /** The real app's "Outsource Completed" page only ever shows a Cancel
   * button (no Update/Submit) — once a request is awarded and completed
   * it's effectively a read-only record there, so every field is disabled
   * whenever isCompleted, regardless of the specific mode. */
  get readonly(): boolean {
    return this.isCompleted;
  }

  private blankRequest(): OutsourceRequest {
    return {
      id: '',
      client: '',
      project: '',
      status: 'Submitted',
      vendor: 'SNT Ltd',
      awarded: false,
      rawAmount: 0,
      active: true,
      outsourceBudget: 0,
      outsourceCurrency: 'USD',
      awardedBudget: 0,
      awardedCurrency: 'INR',
      expectedStart: '',
      expectedEnd: '',
      vendorProjectedStart: '',
      vendorProjectedEnd: '',
      entity: this.entities[0] ?? '',
      companyCode: '',
      sbu: '',
      marketSegment: this.marketSegments[0] ?? '',
      marketSegmentCode: '',
      pmUser: '',
      dmUser: '',
      pmApprovalSecured: false,
      opsHeadApprovalSecured: false,
      requestType: 'Translation',
      requestTypeDetail: '',
      instructionForVendors: '',
      aptaraComments: ''
    };
  }

  remaining(text: string): number {
    return 4000 - (text?.length ?? 0);
  }

  sendEnquiry() {
    this.messages.add({ severity: 'success', summary: 'Enquiry Sent', detail: 'Outsource enquiry sent to selected vendors.' });
  }

  save() {
    const id = 'opn' + String(Math.floor(10000 + Math.random() * 89999));
    const newRequest: OutsourceRequest = { ...this.draft, id, rawAmount: this.draft.awardedBudget || this.draft.outsourceBudget };
    outsourceRequestsData.update((list) => [...list, newRequest]);
    this.messages.add({ severity: 'success', summary: 'Outsource Request Created', detail: `Request ${id} added to the portfolio.` });
    this.cancel();
  }

  cancel() {
    this.router.navigate(['/outsource-requests']);
  }
}

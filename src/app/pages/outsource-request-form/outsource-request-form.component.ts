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
import { outsourceRequestsData, OutsourceRequest, displayStatus, statusSeverity, entityData, marketSegmentData, natureOfServicesData } from '../../core/mock-data';

type FormMode = 'add' | 'view' | 'complete';

const CURRENCIES = ['USD', 'INR', 'EUR', 'GBP'];
const PM_USERS = ['Hemant Project Manager'];
const DM_USERS = ['Darshan Delivery Manager'];
const STAGED_FILES = ['Band 6 Skills Definitions (1).pptx', 'Full file w Career Ladders and Skills.pptx'];

/** Real-app-accurate replacement for the old 5-field dialog: matches both
 * the production app's "Outsource Request" page (add AND view — confirmed
 * live that View renders the simpler create-style layout even for an
 * already-awarded record) and its separate "Outsource Completed" page,
 * reached only via the list's distinct trophy/Award icon. */
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
  requestTypeOptions = natureOfServicesData().map((n) => n['name'] as string);
  stagedFiles = STAGED_FILES;
  displayStatus = displayStatus;
  statusSeverity = statusSeverity;

  draft: OutsourceRequest =
    this.mode === 'add'
      ? this.blankRequest()
      : { ...outsourceRequestsData()[this.index!] };

  /** "View" (eye icon) and "Outsourcing Complete" (trophy icon) are two
   * separate real-app actions/pages, not one merged page — confirmed by a
   * live-app screenshot showing the same already-awarded record's View
   * page rendering the simpler "Outsource Request" layout (no PM/DM
   * approval, no Awarded Vendor section) while the trophy icon opens the
   * fuller "Outsource Completed" layout. Only 'complete' mode renders the
   * fuller layout. */
  get isCompleted(): boolean {
    return this.mode === 'complete';
  }

  get title(): string {
    return this.isCompleted ? 'Outsource Completed' : 'Outsource Request';
  }

  /** Both 'view' and 'complete' are read-only — only 'add' allows editing. */
  get readonly(): boolean {
    return this.mode !== 'add';
  }

  /** A genuinely blank new request has no Awarded Budget section at all
   * (confirmed on the real blank Add form — that field only exists once a
   * vendor has actually been awarded) and no Request Type pre-selected. */
  get isNewRequest(): boolean {
    return this.mode === 'add';
  }

  selectRequestType(type: string) {
    this.draft.requestType = this.draft.requestType === type ? '' : type;
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
      outsourceCurrency: '',
      awardedBudget: 0,
      awardedCurrency: '',
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
      requestType: '',
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

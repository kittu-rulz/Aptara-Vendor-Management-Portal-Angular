import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { MessageService } from 'primeng/api';
import { vendorsData, Vendor, natureOfServicesData, orgTypeData, gstData, serviceExecutedData } from '../../core/mock-data';

type FormMode = 'add' | 'edit' | 'view';

const COUNTRIES = ['India', 'United States', 'United Kingdom', 'Singapore'];
const ACCOUNT_TYPES = ['Current', 'Savings'];

/** Real-app-accurate replacement for the old 5-field vendor dialog: matches
 * the production app's 5-tab "Vendor Registration Form" (Company Info /
 * Bank & GST Details / Key Contact / Services / Aptara Document Uploads),
 * confirmed field-for-field against live screenshots of all 5 tabs in
 * Add/Edit/View. */
@Component({
  selector: 'app-vendor-registration-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, DropdownModule, MultiSelectModule, ButtonModule, TabViewModule],
  templateUrl: './vendor-registration-form.component.html'
})
export class VendorRegistrationFormComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messages = inject(MessageService);

  mode: FormMode = (this.route.snapshot.data['mode'] as FormMode) ?? 'add';
  private index = this.route.snapshot.paramMap.has('index') ? Number(this.route.snapshot.paramMap.get('index')) : null;

  countries = COUNTRIES;
  accountTypes = ACCOUNT_TYPES;
  organizationTypes = orgTypeData().map((o) => o['type'] as string);
  gstOptions = gstData().map((g) => g['type'] as string);
  natureOfServiceOptions = natureOfServicesData().map((n) => n['name'] as string);
  allServiceRows = serviceExecutedData();

  draft: Vendor = this.mode === 'add' ? this.blankVendor() : { ...vendorsData()[this.index!] };

  serviceSearch = signal('');
  selectedServiceNames = signal<Set<string>>(new Set());

  get readonly(): boolean {
    return this.mode === 'view';
  }

  /** The real app reuses "Vendor Registration Form" as the title for both
   * a new registration and editing the existing vendor (confirmed via the
   * captured screenshot, where an existing vendor's data was shown under
   * that same title) — so there's no separate "Edit Vendor" title here. */
  get title(): string {
    return 'Vendor Registration Form';
  }

  filteredServiceRows = computed(() => {
    const q = this.serviceSearch().toLowerCase();
    if (!q) return this.allServiceRows;
    return this.allServiceRows.filter((r) => String(r['service']).toLowerCase().includes(q));
  });

  selectedServiceCount = computed(() => this.selectedServiceNames().size);

  private blankVendor(): Vendor {
    return {
      code: '',
      name: '',
      city: '',
      contact: '',
      email: '',
      services: '',
      organization: this.organizationTypes[0] ?? '',
      vendorStatus: 'Pending',
      status: 'Active',
      country: 'India',
      gstNumber: '',
      pinCode: '',
      establishmentDate: '',
      companyPan: '',
      companyCertifications: '',
      headOfficeAddress: '',
      addressLine2: '',
      companyPhone: '',
      companyFax: '',
      companyWebsite: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      branchName: '',
      payeeName: '',
      accountType: '',
      msme: false,
      gstEligibilityList: [],
      serviceCategories: [],
      kcFirst: '',
      kcLast: '',
      kcDesignation: '',
      kcDirectNo: '',
      kcCell: '',
      kcEmail: '',
      escSameAsAbove: false,
      esc1First: '',
      esc1Last: '',
      esc1Designation: '',
      esc1DirectNo: '',
      esc1Cell: '',
      esc1Email: '',
      esc2First: '',
      esc2Last: '',
      esc2Designation: '',
      esc2DirectNo: '',
      esc2Cell: '',
      esc2Email: '',
      aptaraComments: '',
      selectedServiceNames: []
    };
  }

  private syncServicesFromDraft() {
    this.selectedServiceNames.set(new Set(this.draft.selectedServiceNames ?? []));
  }

  toggleServiceRow(name: string, checked: boolean) {
    this.selectedServiceNames.update((set) => {
      const next = new Set(set);
      if (checked) next.add(name);
      else next.delete(name);
      return next;
    });
  }

  isServiceRowSelected(name: string): boolean {
    return this.selectedServiceNames().has(name);
  }

  toggleEscalationSameAsAbove(checked: boolean) {
    this.draft.escSameAsAbove = checked;
    if (checked) {
      this.draft.esc1First = this.draft.kcFirst;
      this.draft.esc1Last = this.draft.kcLast;
      this.draft.esc1Designation = this.draft.kcDesignation;
      this.draft.esc1DirectNo = this.draft.kcDirectNo;
      this.draft.esc1Cell = this.draft.kcCell;
      this.draft.esc1Email = this.draft.kcEmail;
    }
  }

  save() {
    this.draft.selectedServiceNames = Array.from(this.selectedServiceNames());
    this.draft.services = this.draft.serviceCategories.join(', ');
    this.draft.contact = `${this.draft.kcFirst} ${this.draft.kcLast}`.trim();
    this.draft.email = this.draft.kcEmail;
    if (this.mode === 'add') {
      const code = String(1000 + vendorsData().length + Math.floor(Math.random() * 100));
      vendorsData.update((list) => [...list, { ...this.draft, code }]);
      this.messages.add({ severity: 'success', summary: 'Vendor Registered', detail: 'New vendor record created.' });
    } else {
      const idx = this.index!;
      vendorsData.update((list) => list.map((v, i) => (i === idx ? { ...this.draft } : v)));
      this.messages.add({ severity: 'success', summary: 'Vendor Updated', detail: 'Vendor record saved successfully.' });
    }
    this.cancel();
  }

  reset() {
    this.draft = this.mode === 'add' ? this.blankVendor() : { ...vendorsData()[this.index!] };
    this.syncServicesFromDraft();
  }

  cancel() {
    this.router.navigate(['/manage-vendors']);
  }

  constructor() {
    this.syncServicesFromDraft();
  }
}

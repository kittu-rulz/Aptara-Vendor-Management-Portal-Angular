import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { MessageService } from 'primeng/api';
import { vendorsData, Vendor, natureOfServicesData, orgTypeData } from '../../core/mock-data';

type FormMode = 'add' | 'edit' | 'view';

const COUNTRIES = ['India', 'United States', 'United Kingdom', 'Singapore'];

/** Real-app-accurate replacement for the old 5-field vendor dialog: matches
 * the production app's 5-tab "Vendor Registration Form" (Company Info /
 * Bank & GST Details / Key Contact / Services / Aptara Document Uploads).
 * Only Company Info has a captured reference screenshot — the other four
 * tabs are reasonably constructed from their names and the vendor data
 * already known to exist. */
@Component({
  selector: 'app-vendor-registration-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, TabViewModule],
  templateUrl: './vendor-registration-form.component.html'
})
export class VendorRegistrationFormComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messages = inject(MessageService);

  mode: FormMode = (this.route.snapshot.data['mode'] as FormMode) ?? 'add';
  private index = this.route.snapshot.paramMap.has('index') ? Number(this.route.snapshot.paramMap.get('index')) : null;

  countries = COUNTRIES;
  organizationTypes = orgTypeData().map((o) => o['type'] as string);
  natureOfServiceOptions = natureOfServicesData().map((n) => n['name'] as string);

  draft: Vendor = this.mode === 'add' ? this.blankVendor() : { ...vendorsData()[this.index!] };

  selectedServices: Set<string> = new Set((this.draft.services || '').split(',').map((s) => s.trim()).filter(Boolean));

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
      accountHolderName: '',
      contactDesignation: '',
      contactPhone: '',
      alternatePhone: ''
    };
  }

  toggleService(service: string, checked: boolean) {
    if (checked) this.selectedServices.add(service);
    else this.selectedServices.delete(service);
  }

  isServiceSelected(service: string): boolean {
    return this.selectedServices.has(service);
  }

  save() {
    this.draft.services = Array.from(this.selectedServices).join(', ');
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
    this.selectedServices = new Set((this.draft.services || '').split(',').map((s) => s.trim()).filter(Boolean));
  }

  cancel() {
    this.router.navigate(['/manage-vendors']);
  }
}

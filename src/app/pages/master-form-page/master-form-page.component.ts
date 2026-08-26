import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { MASTER_TYPES } from '../../core/master-registry';

type FormMode = 'add' | 'edit' | 'view';

/** Real-app-accurate replacement for the old EntityDialogComponent-based
 * masters editing: the real app opens a dedicated page for Add/Edit/View
 * ("Edit Nature of Service Master", etc.) instead of a modal. One
 * component serves every master type via the :masterType route param and
 * the MASTER_TYPES registry. */
@Component({
  selector: 'app-master-form-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, InputTextModule, DropdownModule, ButtonModule],
  templateUrl: './master-form-page.component.html'
})
export class MasterFormPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messages = inject(MessageService);

  masterType = this.route.snapshot.paramMap.get('masterType')!;
  config = MASTER_TYPES[this.masterType];
  mode: FormMode = (this.route.snapshot.data['mode'] as FormMode) ?? 'add';
  private index = this.route.snapshot.paramMap.has('index') ? Number(this.route.snapshot.paramMap.get('index')) : null;

  draft: Record<string, any> =
    this.mode === 'add'
      ? { active: true, ...Object.fromEntries(this.config.fields.map((f) => [f.key, ''])) }
      : { ...this.config.rows()[this.index!] };

  get title(): string {
    if (this.mode === 'add') return `Add ${this.config.singularLabel}`;
    if (this.mode === 'view') return `View ${this.config.singularLabel}`;
    return `Edit ${this.config.singularLabel}`;
  }

  save() {
    if (this.mode === 'add') {
      this.config.rows.update((list) => [...list, { active: true, ...this.draft }]);
      this.messages.add({ severity: 'success', summary: `${this.config.addLabel} Added`, detail: `New ${this.config.addLabel.toLowerCase()} record created.` });
    } else {
      const idx = this.index!;
      this.config.rows.update((list) => list.map((r, i) => (i === idx ? { ...r, ...this.draft } : r)));
      this.messages.add({ severity: 'success', summary: 'Master Data Saved', detail: 'Configuration parameters updated in master table.' });
    }
    this.cancel();
  }

  cancel() {
    this.router.navigate(['/masters', this.masterType]);
  }
}

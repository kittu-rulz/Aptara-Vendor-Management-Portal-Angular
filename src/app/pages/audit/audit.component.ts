import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { auditHistoryData, AuditEntry } from '../../core/mock-data';

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [TableModule, TagModule],
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.css'
})
export class AuditComponent {
  entries: AuditEntry[] = auditHistoryData;
}

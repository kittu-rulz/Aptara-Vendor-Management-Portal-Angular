import { Component, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterTableComponent, MasterColumn } from '../../shared/master-table/master-table.component';
import { MasterRow } from '../../core/mock-data';

@Component({
  selector: 'app-master-page',
  standalone: true,
  imports: [MasterTableComponent],
  templateUrl: './master-page.component.html',
  styleUrl: './master-page.component.css'
})
export class MasterPageComponent {
  private route = inject(ActivatedRoute);
  private data = this.route.snapshot.data;

  rows: WritableSignal<MasterRow[]> = this.data['rows'] ?? signal([]);
  columns: MasterColumn[] = this.data['columns'] ?? [];
  addLabel: string = this.data['addLabel'] ?? 'Item';
  countLabel: string = this.data['countLabel'] ?? 'All';
}

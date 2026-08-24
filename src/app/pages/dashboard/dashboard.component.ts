import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { outsourceRequestsData, statusSeverity, OutsourceRequest } from '../../core/mock-data';

interface KpiCard {
  label: string;
  value: string;
  trend: string;
  icon: string;
  accent: 'blue' | 'purple' | 'emerald' | 'amber';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  requests: OutsourceRequest[] = outsourceRequestsData;
  statusSeverity = statusSeverity;

  kpis: KpiCard[] = [
    { label: 'Outsource Requests', value: '4', trend: '100% Sourced & Active', icon: 'pi pi-folder-open', accent: 'blue' },
    { label: 'Awarded Budget', value: '₹1,920,000', trend: 'Across 4 active projects', icon: 'pi pi-dollar', accent: 'purple' },
    { label: 'Approved Vendors', value: '1', trend: 'SNT Ltd · Empanelled', icon: 'pi pi-building', accent: 'emerald' },
    { label: 'Invoice Projects', value: '4', trend: 'All Clear · 0 Pending', icon: 'pi pi-file', accent: 'amber' }
  ];
}

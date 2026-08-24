import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { configData, ConfigRow } from '../../core/mock-data';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {
  rows: ConfigRow[] = configData;
}

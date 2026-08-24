import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavService } from '../../core/nav.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  nav = inject(NavService);

  @Input() title = '';
  @Input() breadcrumb = '';
}

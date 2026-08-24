import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavService } from '../../core/nav.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  nav = inject(NavService);

  openGroup: string | null = null;

  toggleGroup(label: string) {
    this.openGroup = this.openGroup === label ? null : label;
  }
}

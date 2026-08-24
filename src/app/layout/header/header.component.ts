import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavService } from '../../core/nav.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  nav = inject(NavService);
  private auth = inject(AuthService);
  private router = inject(Router);

  @Input() title = '';
  @Input() breadcrumb = '';

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}

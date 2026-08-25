import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastModule } from 'primeng/toast';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { NavService } from '../../core/nav.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent, ToastModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
})
export class ShellComponent {
  nav = inject(NavService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  routeData = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => {
        let r = this.route;
        while (r.firstChild) r = r.firstChild;
        return r.snapshot.data as { title?: string; breadcrumb?: string };
      }),
      startWith({ title: 'Outsource Requests', breadcrumb: 'Vendor Portal › Outsource Requests' })
    ),
    { initialValue: { title: 'Outsource Requests', breadcrumb: 'Vendor Portal › Outsource Requests' } }
  );
}

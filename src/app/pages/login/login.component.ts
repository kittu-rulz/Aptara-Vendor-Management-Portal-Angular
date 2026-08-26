import { Component, ElementRef, ViewChild, ViewEncapsulation, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { NavService } from '../../core/nav.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  // Angular's default emulated encapsulation rewrites `[data-theme="dark"]
  // .login-overlay` into `[data-theme="dark"][_ngcontent-xyz] .login-overlay
  // [_ngcontent-xyz]` — appending the scoping attribute to BOTH parts of the
  // selector, including [data-theme="dark"], which lives on <html> and can
  // never carry that attribute. That makes every dark-mode rule in this
  // stylesheet permanently unmatchable (confirmed: dark mode set correctly
  // on <html>, but every .login-* dark override stayed inert). This CSS was
  // never scoped in the original static prototype either (one global
  // stylesheet), and every class here is uniquely prefixed (login-*,
  // forgot-*, beam-ring), so disabling encapsulation is the correct fix,
  // not a workaround.
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private auth = inject(AuthService);
  nav = inject(NavService);

  @ViewChild('stage') stageRef!: ElementRef<HTMLDivElement>;

  // Sign-in form
  email = '';
  password = '';
  rememberMe = true;
  passwordVisible = signal(false);
  loginInProgress = signal(false);

  /** Forgot Password is routable (`/forgot-password`) so it's a real,
   * linkable/refreshable screen matching the original app's separate
   * page — but the flip-card transition itself is preserved exactly:
   * navigating there via the "Forgot Password?" link just updates the URL
   * (Location.go, not a router navigation) so this same component instance
   * keeps animating instead of being destroyed and recreated. Landing here
   * directly via that URL (refresh/deep link) starts already flipped, with
   * no animation to play. */
  flipped = signal(this.route.snapshot.data['forgot'] === true);
  isFlipping = signal(false);

  // Forgot-password form
  forgotEmail = '';
  forgotSubmitting = signal(false);
  forgotSuccess = signal(false);

  // 3D tilt
  tiltTransform = signal('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  private tiltFrame?: number;

  onStageMouseMove(e: MouseEvent) {
    if (this.tiltFrame) cancelAnimationFrame(this.tiltFrame);
    this.tiltFrame = requestAnimationFrame(() => {
      const rect = this.stageRef.nativeElement.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const rotateY = ((mouseX / rect.width) - 0.5) * 8;
      const rotateX = -((mouseY / rect.height) - 0.5) * 8;
      this.tiltTransform.set(
        `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`
      );
    });
  }

  onStageMouseLeave() {
    if (this.tiltFrame) cancelAnimationFrame(this.tiltFrame);
    this.tiltTransform.set('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  }

  togglePasswordVisibility() {
    this.passwordVisible.update((v) => !v);
  }

  // Matches .login-flip-wrapper's `transition: transform 0.8s` in the CSS.
  // Originally this hid the decorative shell via the flip-wrapper's own
  // (transitionrun)/(transitionend) events (a direct port of the static
  // prototype's .login-card-shell.is-flipping fix), but those events
  // turned out not to fire reliably through Angular's zone/change-detection
  // cycle in testing here — confirmed by the *identical* CSS mechanism
  // working correctly in the plain-HTML/JS original in this same browser
  // environment, with real fractional opacity samples during the fade.
  // A timer matched to the known transition duration sidesteps the
  // question of why those events don't fire, rather than depending on them.
  private static readonly FLIP_DURATION_MS = 800;
  private flipFadeTimer?: ReturnType<typeof setTimeout>;

  private setFlipped(value: boolean) {
    this.flipped.set(value);
    this.isFlipping.set(true);
    if (this.flipFadeTimer) clearTimeout(this.flipFadeTimer);
    this.flipFadeTimer = setTimeout(() => this.isFlipping.set(false), LoginComponent.FLIP_DURATION_MS);
  }

  goToForgotPassword(e: Event) {
    e.preventDefault();
    this.forgotEmail = '';
    this.forgotSuccess.set(false);
    this.forgotSubmitting.set(false);
    this.setFlipped(true);
    this.location.go('/forgot-password');
  }

  backToSignIn(e?: Event) {
    e?.preventDefault();
    this.setFlipped(false);
    this.location.go('/login');
  }

  performLogin(e: Event) {
    e.preventDefault();
    if (this.loginInProgress()) return;
    this.loginInProgress.set(true);

    setTimeout(() => {
      this.loginInProgress.set(false);
      this.auth.login();
      this.router.navigateByUrl('/outsource-requests');
    }, 500);
  }

  submitForgotPassword(e: Event) {
    e.preventDefault();
    if (!this.forgotEmail.trim()) return;
    this.forgotSubmitting.set(true);

    setTimeout(() => {
      this.forgotSubmitting.set(false);
      this.forgotSuccess.set(true);
      setTimeout(() => this.backToSignIn(), 2500);
    }, 900);
  }
}

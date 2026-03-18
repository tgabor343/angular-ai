import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { AuthService } from '../auth/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Toolbar, Button],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout implements OnInit {
  protected readonly username = signal('');

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const decoded = jwtDecode<{ username?: string; sub?: string }>(token);
        this.username.set(decoded.username || decoded.sub || 'User');
      } catch (error) {
        console.error('Error decoding token:', error);
        this.username.set('User');
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

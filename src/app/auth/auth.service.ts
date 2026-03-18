import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly loggedIn = signal(!!localStorage.getItem('auth-token'));

  readonly isLoggedIn = computed(() => this.loggedIn());

  login(): void {
    this.loggedIn.set(true);
  }

  logout(): void {
    localStorage.removeItem('auth-token');
    this.loggedIn.set(false);
  }
}

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AuthenticationService } from '../api/api/authentication.service';
import { LoginRequest } from '../api/model/loginRequest';
import { LoginResponse } from '../api/model/loginResponse';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  protected readonly error = signal('');
  protected readonly isLoading = signal(false);

  onSubmit(): void {
    this.error.set('');
    if (this.loginForm.invalid) {
      this.error.set('Please enter username and password.');
      return;
    }
    this.isLoading.set(true);
    const { username, password } = this.loginForm.value;
    const loginRequest: LoginRequest = { username: username ?? '', password: password ?? '' };
    this.authenticationService.login(loginRequest).subscribe({
      next: (response: LoginResponse) => {
        this.isLoading.set(false);
        if (response.success) {
          const token = response.token;
          if (token) {
            localStorage.setItem('auth-token', token);
            this.auth.login();
          }
          this.router.navigate(['/list']);
        } else {
          this.error.set(response.message || 'Login failed');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set('Login failed');
      }
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  onSubmit(): void {
    this.error = '';
    if (!this.username.trim() || !this.password.trim()) {
      this.error = 'Please enter username and password.';
      return;
    }
    const loginRequest: LoginRequest = {
      username: this.username,
      password: this.password
    };
    this.authenticationService.login(loginRequest).subscribe({
      next: (response: LoginResponse) => {
        if (response.success) {
          // Assuming the token is in the response as 'token'
          const token = response.token;
          if (token) {
            localStorage.setItem('auth-token', token);
            this.auth.login();
          }
          this.router.navigate(['/list']);
        } else {
          this.error = response.message || 'Login failed';
        }
      },
      error: (err) => {
        this.error = 'Login failed';
      }
    });
  }
}

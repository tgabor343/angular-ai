import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../auth/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  username: string = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('auth-token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.username = decoded.sub;
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

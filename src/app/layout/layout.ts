import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { AuthService } from '../auth/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Toolbar, Button],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit {
  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.username = decoded.username || decoded.sub || 'User';
      } catch (error) {
        console.error('Error decoding token:', error);
        this.username = 'User';
      }
    }
  }

  logout() {
    this.authService.logout();
  }
}

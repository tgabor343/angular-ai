import { Component } from '@angular/core';
import { Layout } from './layout/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}

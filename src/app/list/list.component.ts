import { ChangeDetectionStrategy, Component, OnInit, signal, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { TableModule } from 'primeng/table';
import { AuthService } from '../auth/auth.service';
import { ItemsService } from '../api/api/items.service';
import { ItemResponse } from '../api/model/itemResponse';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly itemsService = inject(ItemsService);

  protected readonly items = signal<ItemResponse[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly error = signal<string | null>(null);
  username: string = '';

  ngOnInit(): void {
    const token = localStorage.getItem('auth-token');
    if (token) {
      const decoded = jwtDecode<{ sub?: string }>(token);
      this.username = decoded.sub || '';
    }
    this.loadItems();
  }

  private loadItems(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.itemsService.list().subscribe({
      next: (data) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading items:', err);
        this.error.set('Failed to load items');
        this.isLoading.set(false);
      }
    });
  }
}

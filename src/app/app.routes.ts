import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { Layout } from './layout/layout';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [{ path: 'list', component: ListComponent }]
  }
];

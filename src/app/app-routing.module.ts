import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  redirectLoggedInTo,
  redirectUnauthorizedTo,
  AuthGuard,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['.']);

const routes: Routes = [
  {
    path: '',
    title: 'Kanban',
    loadChildren: () =>
      import('./kanban/kanban.module').then((m) => m.KanbanModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'auth',
    title: 'Authnetication',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToItems },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

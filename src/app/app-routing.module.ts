import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './shared/pages/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./messages/messages.module').then(
        (module) => module.MessagesModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then(
        (module) => module.UsersModule
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

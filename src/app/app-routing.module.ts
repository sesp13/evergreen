import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './shared/pages/home/home.component';

const routes: Routes = [
  {
    path: 'messages',
    loadChildren: () =>
      import('./messages/messages.module').then(
        (module) => module.MessagesModule
      ),
  },
  // {
  //   path: 'users',
  //   loadChildren: () =>
  //     import('./users/users.module').then(
  //       (module) => module.UsersModule
  //     ),
  // },
  // {
  //   path: 'send',
  //   loadChildren: () =>
  //     import('./send/send.module').then(
  //       (module) => module.SendModule
  //     ),
  // },
  {
    path: '**',
    redirectTo: 'messages',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

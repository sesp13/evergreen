import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendComponent } from './pages/send/send.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SendComponent,
      },
      {
        path: '',
        redirectTo: '/',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendRoutingModule } from './send-routing.module';
import { SendComponent } from './pages/send/send.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SendComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SendRoutingModule
  ]
})
export class SendModule { }

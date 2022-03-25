import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select'

import { SendRoutingModule } from './send-routing.module';
import { SendComponent } from './pages/send/send.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './pages/list/list.component';


@NgModule({
  declarations: [
    SendComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    SendRoutingModule
  ]
})
export class SendModule { }

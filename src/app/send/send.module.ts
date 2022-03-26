import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';

import { SendRoutingModule } from './send-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SendComponent } from './pages/send/send.component';
import { ListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [SendComponent, ListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    SendRoutingModule,
    SharedModule,
  ],
})
export class SendModule {}

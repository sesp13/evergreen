import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MessagesRoutingModule } from './messages-routing.module';

import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [CommonModule, ReactiveFormsModule, MessagesRoutingModule, SharedModule],
})
export class MessagesModule {}

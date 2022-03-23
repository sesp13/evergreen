import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MessagesRoutingModule } from './messages-routing.module';

import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';

@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [CommonModule, ReactiveFormsModule, MessagesRoutingModule],
})
export class MessagesModule {}

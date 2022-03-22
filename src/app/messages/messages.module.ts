import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';

import { ListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, MessagesRoutingModule],
})
export class MessagesModule {}

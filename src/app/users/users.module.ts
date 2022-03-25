import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { UsersRoutingModule } from './users.routing.module';

@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}

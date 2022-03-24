import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HeaderComponent, HomeComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, HomeComponent],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [HeaderComponent, HomeComponent, ConfirmationModalComponent],
  imports: [CommonModule, RouterModule],
  exports: [ConfirmationModalComponent, HeaderComponent, HomeComponent, ],
})
export class SharedModule {}

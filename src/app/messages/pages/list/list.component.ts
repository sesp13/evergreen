import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { MessageTemplate } from '../../../global/interfaces/messageTemplate.interface';

import { TemplateService } from '../../../global/services/template.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @ViewChild('deletionModal') deletionModal: ConfirmationModalComponent;
  messagesLst: MessageTemplate[] = [];
  deleteId?: string;

  constructor(
    private templateService: TemplateService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.templateService.getTemplates().subscribe((lst: MessageTemplate[]) => {
      this.messagesLst = lst;
    });
  }

  confirmDeletion(id: string): void {
    this.deleteId = id;
    this.deletionModal.open();
  }

  deleteMessage(): void {
    this.templateService.deleteTemplate(this.deleteId).subscribe((result) => {
      this.toastr.success('Plantilla eliminada correctamente');
      this.getMessages();
    });
  }
}

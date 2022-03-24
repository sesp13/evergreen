import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { Message } from '../../interfaces/message.interface';
import { User } from '../../interfaces/user.interface';

import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @ViewChild('deletionModal') deletionModal: ConfirmationModalComponent;
  messagesLst: Message[] = [];
  deleteId?: string;

  constructor(
    private messageService: MessageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.getMessages().subscribe((lst: Message[]) => {
      this.messagesLst = lst;
    });
  }

  getUsers(userLst: User[]): string {
    let result = '';
    userLst?.forEach((user: User) => {
      result += `${user.cc}/${user.name} `;
    });
    return result;
  }

  confirmDeletion(id: string): void {
    this.deleteId = id;
    this.deletionModal.open();
  }

  deleteMessage(): void {
    this.messageService.deleteMessage(this.deleteId).subscribe((result) => {
      this.toastr.success('Mensaje eliminado correctamente');
      this.getMessages();
    });
  }
}

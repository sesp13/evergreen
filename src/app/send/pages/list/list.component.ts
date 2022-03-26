import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'src/app/global/interfaces/message.interface';
import { User } from 'src/app/global/interfaces/user.interface';
import { SendService } from 'src/app/global/services/send.service';
import { UserService } from 'src/app/global/services/user.service';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @ViewChild('deletionModal') deletionModal: ConfirmationModalComponent;
  messagesLst: Message[] = [];
  deleteId: string;

  constructor(
    private sendService: SendService,
    private toastr: ToastrService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.sendService.getMessages().subscribe((result: Message[]) => {
      this.messagesLst = result;
      this.setUsers();
    });
  }

  setUsers(): void {
    this.messagesLst.forEach((message: Message) => {
      // Sender
      this.userService.getUserById(message?.sender).subscribe((user: User) => {
        message.senderObject = user;
      });
      // Receivers
      this.userService
        .getUsersByIds(message.receivers)
        .subscribe((result: User[]) => {
          message.receiversObjects = result;
        });
    });
  }

  confirmDeletion(id: string): void {
    this.deleteId = id;
    this.deletionModal.open();
  }

  deleteMessage(): void {
    this.sendService.deleteMessage(this.deleteId).subscribe((result) => {
      this.toastr.success('Mensaje eliminado correctamente');
      this.getMessages();
    });
  }

  sendMessage(id: string) {
    this.sendService.sendMessage(id).subscribe((result) => {
      this.toastr.success('El mensaje fue enviado correctamente');
      this.getMessages();
    });
  }
}

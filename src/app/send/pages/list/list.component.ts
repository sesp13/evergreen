import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/global/interfaces/message.interface';
import { User } from 'src/app/global/interfaces/user.interface';
import { SendService } from 'src/app/global/services/send.service';
import { UserService } from 'src/app/global/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  messagesLst: Message[] = [];

  constructor(
    private sendService: SendService,
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
      this.userService.getUserById(message?.id).subscribe((user: User) => {
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
}

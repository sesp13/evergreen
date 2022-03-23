import { Component, OnInit } from '@angular/core';
import { Message } from '../../interfaces/message.interface';
import { User } from '../../interfaces/user.interface';

import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  messagesLst: Message[] = [];

  constructor(private messageService: MessageService) {}

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
}

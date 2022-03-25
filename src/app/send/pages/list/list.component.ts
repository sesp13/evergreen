import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/global/interfaces/message.interface';
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

      this.userService
        .getUsersByIds(this.messagesLst[0].receivers)
        .subscribe((result) => {
          console.log(result);
        });
    });
  }
}

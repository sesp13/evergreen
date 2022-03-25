import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Message } from 'src/app/global/interfaces/message.interface';
import { MessageService } from 'src/app/global/services/message.service';
import { SendService } from 'src/app/global/services/send.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css'],
})
export class SendComponent implements OnInit {
  templateLst: Message[] = [];
  selectedTemplate?: Message;
  useCustomTemplate: boolean = false;

  form: FormGroup = this.fb.group({
    template: ['', [Validators.required]],
  });

  constructor(
    private sendService: SendService,
    private messagesService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getTemplates();
  }

  getTemplates(): void {
    this.messagesService.getMessages().subscribe((messages: Message[]) => {
      this.templateLst = messages;
    });
  }

  setTemplate(): void {
    const value = this.form.get('template')?.value;
    if (value == '') {
      this.useCustomTemplate = true;
      this.selectedTemplate = undefined;
    } else {
      this.useCustomTemplate = false;
      this.selectedTemplate = value;
    }
  }
}

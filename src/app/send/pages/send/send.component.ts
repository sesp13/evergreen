import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  AbstractControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'src/app/global/interfaces/message.interface';
import { MessageTemplate } from 'src/app/global/interfaces/messageTemplate.interface';
import { User } from 'src/app/global/interfaces/user.interface';
import { TemplateService } from 'src/app/global/services/template.service';
import { SendService } from 'src/app/global/services/send.service';
import { UserService } from 'src/app/global/services/user.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css'],
})
export class SendComponent implements OnInit {
  templateLst: MessageTemplate[] = [];
  sendersLst: User[] = [];
  receiversLst: User[] = [];
  selectedTemplate?: MessageTemplate;

  form: FormGroup = this.fb.group({
    template: ['', [Validators.required]],
    subject: [{ value: '', disabled: true }, [Validators.required]],
    content: [{ value: '', disabled: true }, [Validators.required]],
    sender: ['', [Validators.required]],
    receivers: ['', [Validators.required]],
  });
  subjectControl?: AbstractControl = this.form.get('subject');
  contentControl?: AbstractControl = this.form.get('content');

  constructor(
    private sendService: SendService,
    private templateService: TemplateService,
    private usersService: UserService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getTemplates();
    this.getSenderUsers();
    this.getReceiverUsers();
  }

  getTemplates(): void {
    this.templateService
      .getTemplates()
      .subscribe((messages: MessageTemplate[]) => {
        this.templateLst = messages;
      });
  }

  getSenderUsers(): void {
    this.usersService.getSenderUsers().subscribe((users: User[]) => {
      this.sendersLst = users;
    });
  }

  getReceiverUsers(): void {
    this.usersService.getReceiverUsers().subscribe((users: User[]) => {
      this.receiversLst = users;
    });
  }

  setTemplate(): void {
    const value: string | number = this.form.get('template')?.value;
    this.resetTemplateFields();
    if (value == '') {
      return;
    } else if (value == 'custom') {
      this.disableTemplateFields(false);
    } else {
      // Set content
      this.selectedTemplate = this.templateLst[value];
      this.subjectControl.setValue(this.selectedTemplate.subject);
      this.contentControl.setValue(this.selectedTemplate.content);
    }
  }

  resetTemplateFields(): void {
    this.subjectControl.setValue('');
    this.contentControl.setValue('');
    this.selectedTemplate = undefined;
    this.disableTemplateFields(true);
  }

  disableTemplateFields(disable: boolean) {
    if (disable) {
      this.subjectControl.disable();
      this.contentControl.disable();
    } else {
      this.subjectControl.enable();
      this.contentControl.enable();
    }
  }

  send() {
    const message: Message = {};
    const value = this.form.value;
    // Set Message Value
    message.subject = this.subjectControl.value;
    message.content = this.contentControl.value;
    message.sender = value.sender;
    message.receivers = value.receivers;
  }
}

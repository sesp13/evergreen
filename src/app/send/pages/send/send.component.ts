import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MessageTemplate } from 'src/app/global/interfaces/message.interface';
import { User } from 'src/app/global/interfaces/user.interface';
import { MessageService } from 'src/app/global/services/message.service';
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

  constructor(
    private sendService: SendService,
    private messagesService: MessageService,
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
    this.messagesService
      .getMessages()
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
      this.form.get('subject').setValue(this.selectedTemplate.subject);
      this.form.get('content').setValue(this.selectedTemplate.content);
    }
  }

  resetTemplateFields(): void {
    this.form.get('subject').setValue('');
    this.form.get('content').setValue('');
    this.selectedTemplate = undefined;
    this.disableTemplateFields(true);
  }

  disableTemplateFields(disable: boolean) {
    if (disable) {
      this.form.get('subject').disable();
      this.form.get('content').disable();
    } else {
      this.form.get('subject').enable();
      this.form.get('content').enable();
    }
  }

  send() {
    this.toastr.success('Mensaje enviado!');
  }
}

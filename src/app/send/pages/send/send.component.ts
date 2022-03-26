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
import { Router } from '@angular/router';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css'],
})
export class SendComponent implements OnInit {
  templateLst: MessageTemplate[] = [];
  sendersLst: User[] = [];
  receiversLst: User[] = [];

  form: FormGroup = this.fb.group({
    template: [''],
    subject: [{ value: '', disabled: true }, [Validators.required]],
    content: [{ value: '', disabled: true }, [Validators.required]],
    customize: [false],
    sender: ['', [Validators.required]],
    receivers: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });

  subjectControl?: AbstractControl = this.form.get('subject');
  contentControl?: AbstractControl = this.form.get('content');
  templateField?: AbstractControl = this.form.get('template');
  customizeControl?: AbstractControl = this.form.get('customize');

  get formValid(): boolean {
    return (
      this.form.valid &&
      this.subjectControl.value != '' &&
      this.contentControl.value != ''
    );
  }

  constructor(
    private sendService: SendService,
    private templateService: TemplateService,
    private usersService: UserService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
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
    const value: string | number = this.templateField.value;
    this.resetTemplateFields();
    if (value == '') {
      return;
    } else {
      // Set content
      const selectedTemplate = this.templateLst[value];
      this.subjectControl.setValue(selectedTemplate.subject);
      this.contentControl.setValue(selectedTemplate.content);
    }
  }

  resetTemplateFields(): void {
    this.subjectControl.setValue('');
    this.contentControl.setValue('');
    if (!this.customizeControl.value) this.disableTemplateFields(true);
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
    message.status = value.status;

    // Set request type
    const type =
      message.status == 'sent'
        ? 'send'
        : message.status == 'draft'
        ? 'draft'
        : '';

    // Create message
    this.sendService
      .createMessage(message, type)
      .subscribe((result: Message) => {
        this.toastr.success('Mensaje creado correctamente');
        this.router.navigate(['/send/list']);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from '../../interfaces/message.interface';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  form: FormGroup = this.fb.group({
    content: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    from: [],
    to: [],
  });

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  send() {
    this.messageService
      .saveMessage(this.form.value as Message)
      .subscribe((result) => {
        console.log(result);
      });
  }
}

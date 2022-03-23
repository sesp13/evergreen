import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../../interfaces/message.interface';
import { MessageService } from '../../services/message.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  title: string = '';
  submitTitle: string = '';

  form: FormGroup = this.fb.group({
    content: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    from: [],
    to: [],
    id: [],
  });

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.title = `Editar mensaje`;
      this.submitTitle = 'Editar';
      this.route.params
      .pipe(
        switchMap(({ id }) => this.messageService.getMessageById(id ?? ''))
        )
        .subscribe((message: Message) => {
          this.form.setValue({
            subject: message?.subject ?? '',
            content: message?.content ?? '',
            from: message?.from ?? [],
            to: message?.to ?? [],
            id: message?.id ?? '',
          });
        });
    } else {
      this.title = 'Crear Mensaje';
      this.submitTitle = 'Guardar';
    }
  }

  send() {
    if (this.form.get('id')?.value) {
      // Edit
      this.messageService
        .updateMessage(this.form.value as Message)
        .subscribe((result) => {
          console.log(result);
        });
    } else {
      // Save
      this.messageService
        .saveMessage(this.form.value as Message)
        .subscribe((result: Message) => {
          this.router.navigate(['/messages/edit', result?.id]);
        });
    }
  }
}

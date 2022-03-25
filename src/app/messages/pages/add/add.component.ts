import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../../../interfaces/message.interface';
import { MessageService } from '../../services/message.service';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  title: string = '';
  submitTitle: string = '';
  successMessage: string = '';

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
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.setUpLabels(true);
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
      this.setUpLabels(false);
    }
  }

  setUpLabels(edit: boolean): void {
    if (edit) {
      this.title = `Editar mensaje`;
      this.submitTitle = 'Editar';
      this.successMessage = 'Mensaje editado correctamente!';
    } else {
      this.title = 'Crear Mensaje';
      this.submitTitle = 'Guardar';
      this.successMessage = 'Mensaje creado correctamente!';
    }
  }

  send() {
    if (this.form.get('id')?.value) {
      // Edit
      this.messageService
        .updateMessage(this.form.value as Message)
        .subscribe((result: Message) => {
          this.toastr.success(this.successMessage);
        });
    } else {
      // Save
      this.messageService
        .saveMessage(this.form.value as Message)
        .subscribe((result: Message) => {
          this.toastr.success(this.successMessage);
          this.router.navigate(['/messages/edit', result?.id]);
        });
    }
  }
}

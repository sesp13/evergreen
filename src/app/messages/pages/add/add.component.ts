import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageTemplate } from '../../../global/interfaces/messageTemplate.interface';
import { TemplateService } from '../../../global/services/template.service';
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
    name: ['', [Validators.required]],
  });

  constructor(
    private templateService: TemplateService,
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
          switchMap(({ id }) => this.templateService.getTemplateById(id ?? ''))
        )
        .subscribe((message: MessageTemplate) => {
          this.form.setValue({
            subject: message?.subject ?? '',
            content: message?.content ?? '',
            name: message?.name ?? '',
          });
        });
    } else {
      this.setUpLabels(false);
    }
  }

  setUpLabels(edit: boolean): void {
    if (edit) {
      this.title = `Editar plantilla`;
      this.submitTitle = 'Editar';
      this.successMessage = 'Plantilla editada correctamente!';
    } else {
      this.title = 'Crear plantilla';
      this.submitTitle = 'Guardar';
      this.successMessage = 'Plantilla creada correctamente!';
    }
  }

  send() {
    if (this.form.get('id')?.value) {
      // Edit
      this.templateService
        .updateTemplate(this.form.value as MessageTemplate)
        .subscribe((result: MessageTemplate) => {
          this.toastr.success(this.successMessage);
        });
    } else {
      // Save
      this.templateService
        .saveTemplate(this.form.value as MessageTemplate)
        .subscribe((result: MessageTemplate) => {
          this.toastr.success(this.successMessage);
          this.router.navigate(['/messages/edit', result?.id]);
        });
    }
  }
}

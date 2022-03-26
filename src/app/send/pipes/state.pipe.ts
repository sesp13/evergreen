import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'state',
})
export class StatePipe implements PipeTransform {
  transform(value: string): string {
    if (value == 'sent') {
      return 'Enviado';
    } else if (value == 'draft') {
      return 'Borrador';
    } else {
      return '';
    }
  }
}

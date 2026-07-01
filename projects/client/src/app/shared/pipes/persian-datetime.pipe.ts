import { Pipe, PipeTransform } from '@angular/core';
import { toPersianDate } from '../utilities/date-time';

@Pipe({
  name: 'persianDatetime',
  standalone: true
})
export class PersianDatetimePipe implements PipeTransform {

  transform(value: string | Date, format: string = 'jYYYY/jMM/jDD HH:mm:ss'): any {
    if (!value) {
      return '';
    }
    return toPersianDate(value, format);
  }

}

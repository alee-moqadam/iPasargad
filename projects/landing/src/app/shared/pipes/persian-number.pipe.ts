import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianNumber',
  standalone: true
})
export class PersianNumberPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value == null || value == undefined) return '';
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return value.toString().replace(/[0-9]/g, (digit) => persianDigits[+digit]);
  }

}

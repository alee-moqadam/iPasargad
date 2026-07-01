import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskNumber',
})
export class MaskNumberPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe){}
  
  transform(value: string | number, isMasked: boolean): string {
    return isMasked ? '*****' : this.decimalPipe.transform(value);
  }
}

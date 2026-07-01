import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckCustomerStepService {

  constructor() { }
  getCustomerStep() {
    let step = localStorage.getItem('step');
    if (step == '2') return true;
     return false;
  }
}

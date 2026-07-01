import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DividendReportService {

  private filter = new Subject();
  currentFilter = this.filter.asObservable();

  constructor() { }

  setFilter(filter) {
    this.filter.next(filter);
  }
}

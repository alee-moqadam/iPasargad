import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FundInfoService {
  private fundInfo = new BehaviorSubject(null);
  data$ = this.fundInfo.asObservable();
  setFundInfoData(data) {
    this.fundInfo.next(data);
  }

  getFundInfoData(){
    return this.data$
  }
}

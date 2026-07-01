import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllMutualFundsService {
  private mutualFundsInfo = new BehaviorSubject(null);
    mutualFunds$ = this.mutualFundsInfo.asObservable();
    setMutualFundInfo(data) {
      this.mutualFundsInfo.next(data);
    }
  
    getMutualFundInfo(){
      return this.mutualFunds$
    }

  constructor() { }
}

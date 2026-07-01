import { Injectable } from '@angular/core';
import { FundService } from '@client/shared/rest-services/fund/fund.service';

@Injectable({
  providedIn: 'root'
})
export class WebPushService {

  constructor(private fundService: FundService) {

  }

  addPushSubscriber(sub: any) {
    console.log("sub",sub);
    return this.fundService.subscribeWebPush(sub);
  }
}

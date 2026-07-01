import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/client/src/environments/environment';
import { Observable, map } from 'rxjs';
import { CustomerRequestAllocation } from './models/customer-request-allocation.mode';
import { CustomerEvidenceModel } from './models/customer-evidence.model';
import { MutualFundDetailsModel } from './models/mutual-fund-details.model';
import { CustomerRequestCompositionModel } from './models/customer-request-composition.model';
import { AllBankDepositModel } from './models/all-bank-deposit.model';
import { LastMutualFundAssetModel } from './models/last-mutual-fund-asset.model';
import { FundSector } from './models/fund-sector.model';
import { INotification } from './models/notification.model';
import { CommonPaymentModel } from '@client/shared/models';
import { CommonPaymentTypeEnum } from '@client/shared/enums';
import { BestLimitRoot } from '../profile-management/models/nav.model';
import { ProfitOrLossModel } from './models/profit-or-loss.model';

@Injectable({
  providedIn: 'root'
})
export class FundService {
  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getChangeLog() {
    return this.httpClient.get<{ version: string; changes: string[] }[]>('/changelog.json')
  }

  getFundPerformance(fundCode) {
    return this.httpClient
      .get(`${this.apiUrl}/mutualfund/getfundperformance?fundCode=${fundCode}`)
      .pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }
  getLastNav(fundCode) {
    return this.httpClient.post(`${this.apiUrl}/nav/getlastnav`, { entity: fundCode }).pipe(
      map((data: any) => {
        return data.result;
      })
    );
  }
  getMutualFundDetailByCode(fundCode) {
    return this.httpClient.get(`${this.apiUrl}/mutualfund/getfunddetail?fundCode=${fundCode}`).pipe(map((data: any) => { return data.result; }));
  }

  getCustomerRequest() {
    return this.httpClient.get(`${this.apiUrl}/request/getcustomerrequestevents`);
  }

  getRequests(filter) {
    return this.httpClient.post(
      `${this.apiUrl}/request/getcustomerrequests`, filter
    );
  }

  getOnlinePayments(filter) {
    return this.httpClient.post(
      `${this.apiUrl}/payment/getonlinepayments`, filter
    );
  }

  getFlatFundDividendCardexes(filter) {
    return this.httpClient.post(
      `${this.apiUrl}/appliedprofit/getflatfunddividendcardexes`, filter
    );
  }

  getNavList(filterModel) {
    return this.httpClient.post(`${this.apiUrl}/nav/getnavlist`, filterModel).pipe(
      map((data: any) => {
        return data.result;
      })
    );
  }

  getCustomerEvidenceByCode(mutualFundCode) {
    let filter = {
      entity: {
        fundCode: mutualFundCode,
      },
    };
    return this.httpClient
      .post(`${this.apiUrl}/request/getcustomerevidence`, filter)
      .pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }

  getCustomerEvidences(): Observable<CustomerEvidenceModel[]> {
    return this.httpClient.get(`${this.apiUrl}/request/getcustomerevidences`).pipe(map((res: any) => res.result));
  }

  saveCustomer() {
    return this.httpClient.get(`${this.apiUrl}/register/savecustomer`);
  }

  onlinePayment(model) {
    return this.httpClient.post(`${this.apiUrl}/payment/onlinepayment`, model).pipe(
      map((data: any) => {
        return data.result;
      })
    );
  }

  getAllMutualFundsDetail(): Observable<MutualFundDetailsModel[]> {
    return this.httpClient
      .get(`${this.apiUrl}/mutualfund/getallfunddetail`)
      .pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }


  getFundAttachments(fundId) {
    return this.httpClient.get(
      `${this.apiUrl}/mutualfund/getfundattachment?mutualFundId=${fundId}`);
  }

  getFundAttachmentAll(fundIds) {
    return this.httpClient.post(
      `${this.apiUrl}/mutualfund/getfundattachments`,fundIds);
  }

  getNewFundAttachments(fundId) {
    return this.httpClient.get(
      `${this.apiUrl}/mutualfund/getnewfundattachment?mutualFundId=${fundId}`);
  }

  getNewFundAttachmentAll(fundIds) {
    return this.httpClient.post(
      `${this.apiUrl}/mutualfund/getnewfundattachments`,fundIds);
  }

  getCustomerRequestCompositions(filter): Observable<CustomerRequestCompositionModel[]> {
    return this.httpClient
      .post(`${this.apiUrl}/requestdailyposition/getcustomerrequestcomposition`, filter)
      .pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }

  getSingleCustomerRequestCompositions(filter): Observable<CustomerRequestCompositionModel[]> {
    return this.httpClient
      .post(`${this.apiUrl}/requestdailyposition/getsinglecustomerrequestcomposition`, filter)
      .pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }

  getProfitOrLoss(): Observable<ProfitOrLossModel[]> {
    return this.httpClient.post(`${this.apiUrl}/requestdailyposition/getprofitorloss`, null).pipe(map((data: any) => {          
          return data.result;
        })
      );
  }

  getLastEvents() {
    return this.httpClient
      .get(`${this.apiUrl}/request/getlastevents`)
      .pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }


  getCustomerRequestAllocation(filter): Observable<CustomerRequestAllocation[]> {
    return this.httpClient
      .post(
        `${this.apiUrl}/requestdailyposition/getcustomerrequestallocation`,
        filter
      )
      .pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }

  saveRedemptionRequest(body: any) {
    return this.httpClient.post(
      `${this.apiUrl}/redemptionrequest/saveredemptionrequest`,
      body
    );
  }


  getOnlinePaymentRequests(filter): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/payment/getonlinepayments`,
      filter
    )
  }

  getAllPaymentGateWays(fundId?) {
    return this.httpClient.get(`${this.apiUrl}/shared/getallpaymentgateways?fundId=${fundId}`).pipe(
      map((data: any) => {
        return data.result;
      })
    );
  }

  getAllBankDepositByMutualFundId(mutualFundId: number): Observable<AllBankDepositModel[]> {
    return this.httpClient.get<{ result: AllBankDepositModel[] }>(`${this.apiUrl}/shared/getallbankdepositbymutualfundid?mutualFundId=${mutualFundId}`).pipe(
      map(res => {
        return res.result;
      })
    );
  }

  getCustomerTurnover(filter) {
    return this.httpClient
      .post(`${this.apiUrl}/request/getcustomerturnover`, filter)
      .pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }

  getLastMutualFundAssetByCode(mutualFundCode: string): Observable<LastMutualFundAssetModel> {
    return this.httpClient
      .get(`${this.apiUrl}/mutualfund/getlastmutualfundassetbycode?fundCode=${mutualFundCode}`)
      .pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }

  getFundSector(mutualFundCode: string): Observable<FundSector[]> {
    return this.httpClient
      .get(`${this.apiUrl}/mutualfund/getFundSector?fundCode=${mutualFundCode}`)
      .pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }

  saveSubscriptionReceive(params) {

    const formData = new FormData();
    Object.keys(params).forEach(field => {
      formData.append(field, params[field]);

    })

    return this.httpClient.post(`${this.apiUrl}/subscriptionrequest/savesubscriptionreceive`, formData)
  }

  getReceives(filter): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/subscriptionrequest/getreceives`, filter);
  }

  getReceivesAndOnlinePayments(filter): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/subscriptionrequest/getreceivesandonlinepayments`, filter)
      .pipe(
        map((data: any) => {
          return {
            ...data,
            result: data.result?.map(item => this.convertToCommonPayment(item))
          }
        })
      );
  }

  private convertToCommonPayment(item): CommonPaymentModel {
    return {
      amount: item.amount,
      stateTitle: item.stateTitle,
      type: item.isOnlinePayment ? CommonPaymentTypeEnum.Online : CommonPaymentTypeEnum.Receipt,
      date: item.date,
      dateJalali: item.dateJalali,
      bankName: item.bankName,
      mutualFundSymbol: item.mutualFundSymbol,
      accountNumber: item.accountNumber,
      attachmentId: item.attachmentId,
      gatewayTitle: item.gatewayTitle,
      traceNo: item.traceNo || item.trackingNumber || item.referenceNumber,
    };
  }

  getPartyRegisterStatus(): Observable<any> {
    return this.httpClient
      .get<any>(
        `${this.apiUrl}/register/getcurrentpartyregisterstatus`
      )
      .pipe(
        map((data) => {
          return data.result;
        })
      );
  }

  updateCustomer() {
    return this.httpClient
      .get(`${this.apiUrl}/register/updatecustomer`)
      .pipe(map((data: any) => data.result));
  }

  sendPodOtp(mobile) {
    return this.httpClient.get(`${this.apiUrl}/pod/sendotp?phoneNumber=${mobile}`);
  }

  verifyPodOtp(mobile, otp) {
    return this.httpClient.get(`${this.apiUrl}/pod/verifyotp?phoneNumber=${mobile}&otp=${otp}`);
  }

  getNotifications(model) {
    return this.httpClient
      .post<{ result: INotification[] }>(
        `${this.apiUrl}/notifications/getnotifications`, model)
      .pipe(
        map((data) => {
          return data.result;
        })
      );
  }

  // historicalPosition(mutualFundId, endDate, startDate) {
  //   if (startDate) {
  //     return this.httpClient
  //       .get(`${this.apiUrl}/requestdailyposition/gethistoricalpositionbymutualfundid?mutualFundId=${mutualFundId}&startDate=${startDate}&endDate=${endDate}`)
  //       .pipe(
  //         map((data: any) => {
  //           return data.result;
  //         })
  //       );
  //   } else {
  //     return this.httpClient
  //       .get(`${this.apiUrl}/requestdailyposition/gethistoricalpositionbymutualfundid?mutualFundId=${mutualFundId}&endDate=${endDate}`)
  //       .pipe(
  //         map((data: any) => {
  //           return data.result;
  //         })
  //       );
  //   }
  // }

  historicalPosition(mutualFundId, endDate, startDate) {
    let url = '';
    let queryParams = `endDate=${endDate}`;

    if (startDate) {
      queryParams += `&startDate=${startDate}`;
    }

    if (mutualFundId) {
      url = `${this.apiUrl}/requestdailyposition/gethistoricalpositionbymutualfundid`;
      queryParams += `&mutualFundId=${mutualFundId}`;
    } else {
      url = `${this.apiUrl}/requestdailyposition/gethistoricalpositions`;
    }

    return this.httpClient
      .get(`${url}?${queryParams}`)
      .pipe(
        map((data: any) => data.result)
      );
  }

  // checkingforupdatesejamdata() {
  //   return this.httpClient
  //     .get(
  //       `${this.apiUrl}/profilemanagement/checkingforupdatesejamdata`
  //     )
  // }

  getallProvince() {
    return this.httpClient
      .get(
        `${this.apiUrl}/shared/getallprovince`
      ).pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }

  getcitiesbyCodeid(provinceId) {
    return this.httpClient
      .get(
        `${this.apiUrl}/shared/getcitiesbycodeid?codeId=${provinceId}`
      ).pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }

  getallbanknames() {
    return this.httpClient
      .get(
        `${this.apiUrl}/shared/getallbanknames`
      ).pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }

  getAccountType() {
    return this.httpClient
      .get(
        `${this.apiUrl}/shared/getbankaccounttypeenum`
      ).pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }

  saveManualLegalCustomer(model) {
    return this.httpClient
      .post(
        `${this.apiUrl}/register/manualsavelegalcustomer`, model
      )
  }

  getRequestsPdf(filter) {
    return this.httpClient.post(`${this.apiUrl}/requestreport/getcustomerrequestspdf`, filter, { responseType: 'arraybuffer' })
  }

  getTickets() {
    return this.httpClient.get(`${this.apiUrl}/ticket/gettickets`)
  }

  getTicketTypes() {
    return this.httpClient.get(`${this.apiUrl}/ticket/gettickettypes`)
  }

  saveTicket(params) {
    const formData = new FormData();
    Object.keys(params).forEach(field => {
      formData.append(field, params[field]);
    })
    return this.httpClient.post(`${this.apiUrl}/ticket/saveticket`, formData)
  }

  getEvidenceReceiptDatapdf(mutualFundCode) {
    return this.httpClient.get(`${this.apiUrl}/requestreport/getevidencereceiptpdf?mutualFundCode=${mutualFundCode}`, { responseType: 'arraybuffer' })
  }

  checkpartyexistinrayan(fundCode) {
    return this.httpClient.get(`${this.apiUrl}/profilemanagement/checkpartyexistinrayan?fundCode=${fundCode}`)
  }

  sendRayanKYCotpForUpdate(fundCode) {
    return this.httpClient.get(`${this.apiUrl}/profilemanagement/sendkycotp?fundCode=${fundCode}`);
  }

  updatekycdata(otp, fundCode) {
    return this.httpClient.get(`${this.apiUrl}/profilemanagement/updatekycdata?otp=${otp}&fundCode=${fundCode}`)
  }

  checkGiftCardValidity(UniqueId, MutualFundId) {
    return this.httpClient.get(`${this.apiUrl}/giftcard/checkgiftcardbyuniqueid?UniqueId=${UniqueId}&MutualFundId=${MutualFundId}`)

  }

  applyGiftCard(command) {
    return this.httpClient
      .post(`${this.apiUrl}/giftcard/savegiftcardsubscriptionrequest`, command)
  }

  subscribeWebPush(sub) {
    return this.httpClient.post(`${this.apiUrl}/webpushnotification/subscribe`, sub)
  }

  bestLimitByFundId(fundId: number) {
    return this.httpClient.get<BestLimitRoot>(`${this.apiUrl}/nav/getbestlimit?fundId=${fundId}`)
      .pipe(map(data => data.result))
  }

  getSmartReceiptByRequestId(requestId) {
    return this.httpClient
      .get(`${this.apiUrl}/request/getsmartreceiptbyrequestid?requestId=${requestId}`)
      .pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }

  getSmartReceiptByPaymentId(paymentId) {
    return this.httpClient
      .get(`${this.apiUrl}/payment/getsmartreceiptbypaymentid?paymentId=${paymentId}`)
      .pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }

  getAllFundExchangeSettings(){
    return this.httpClient.get(
      `${this.apiUrl}/mutualfund/getallfundexchangesettings`).pipe(
        map((data: any) => {
          return data.result;
        })
      );
  }
}

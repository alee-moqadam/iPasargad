import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonPaymentTypeEnum } from '@client/shared/enums';
import { CommonPaymentModel } from '@client/shared/models';
import { environment } from 'projects/client/src/environments/environment';
import { map, Observable, of, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PodService {
  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getContractDurations() {
    return this.httpClient.get<any>(`${this.apiUrl}/shared/getcontractrangetypeenum`);
  }

  getDirectDebitLimits() {
    return this.httpClient.get<any>(`${this.apiUrl}/shared/getallserviceamounts`);
  }

  sendOtp(isAutoLogin: boolean) {
    return this.httpClient.get<any>(`${this.apiUrl}/pod/sendotp?isAutoLogin=${isAutoLogin}`);
  }

  verifyOtp(otp: string) {
    return this.httpClient.get<any>(`${this.apiUrl}/pod/verifyotp?otp=${otp}`);
  }

  inquiryAccountBalance() {
    return this.httpClient.get<any>(`${this.apiUrl}/pod/inquiryaccountbalance`, { withCredentials: true }).pipe(
      switchMap(res => {
        if (!res?.result) {
          return this.httpClient.get<any>(`${this.apiUrl}/pod/inquiryaccountbalance`, { withCredentials: true });
        }
        return of(res);
      })
    );
  }

  getAccountBalance() {
    return this.httpClient.get<any>(`${this.apiUrl}/pod/getaccountbalance`);
  }

  getDirectDebitContract() {
    return this.httpClient.get<any>(`${this.apiUrl}/pod/getactivedirectdebitcontract`);
  }

  traditionalAccountContract() {
    return this.httpClient.get<any>(`${this.apiUrl}/pod/gettraditionalaccountconnectionrequest`);
  }

  getPodTransferList(filter) {
    return this.httpClient.post<any>(`${this.apiUrl}/pod/transferlist`, filter)
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
    const statusTitleMap = {
      "TRANSFER_DONE": 'موفق',
      "TRANSFER_REJECTED": 'ناموفق',
      "TRANSFER_EXCEPTION_IN_SENDING": 'ناموفق',
      "TRANSFER_EXPIRE": 'ناموفق',
      "TRANSFER_WAIT_FOR_CONFIRM": 'در انتظار',
      "TRANSFER_WAIT_FOR_SENDING": 'در انتظار',
      "TRANSFER_SENT": 'در انتظار',
      default: 'نامشخص'
    };

    return {
      amount: item.amount,
      stateTitle: statusTitleMap[item.status],
      type: CommonPaymentTypeEnum.DirectDebit,
      date: item.transferDate,
      dateJalali: item.transferDateJalali,
    };
  }


  registerCardNumber(cardNumber: string) {
    return this.httpClient.post<any>(`${this.apiUrl}/pod/editactivedirectdebitcontractaccountnumber`, { accountNumber: cardNumber });
  }

  registerDirectDebitContract(request) {
    return this.httpClient.post<any>(`${this.apiUrl}/pod/createactivedirectdebitcontract`, request);
  }
  
  editDirectDebitContract(request) {
    return this.httpClient.post<any>(`${this.apiUrl}/pod/editactivedirectdebitcontract`, request);
  }
  
  getValidScheduledDirectDebits() {
    return this.httpClient.get<any[]>(`${this.apiUrl}/pod/getvalidscheduleddirectdebits`).pipe(
      map((data: any) => {
        return Object.values(
          data.result.reduce((acc, item) => {
            const id = item.mutualFundId;
  
            if (!acc[id]) {
              const { dayOfMonthJalali, ...rest } = item;
              acc[id] = { ...rest, selectedDaysOfMonth: [dayOfMonthJalali] };
            } else {
              acc[id].selectedDaysOfMonth.push(item.dayOfMonthJalali);
            }
  
            return acc;
          }, {} as Record<number, any>)
        );
      })
    );
  }

  createScheduledDirectDebit(request) {
    return this.httpClient.post<any>(`${this.apiUrl}/pod/createscheduleddirectdebit`, request);
  }

  editScheduledDirectDebit(request) {
    return this.httpClient.post<any>(`${this.apiUrl}/pod/editscheduleddirectdebit`, request);
  }

  toggleScheduledDirectDebitActivation(request) {
    return this.httpClient.post<any>(`${this.apiUrl}/pod/changevalidscheduleddirectdebitactivation`, request);
  }

  traditionalaccountconnectionrequest(otp) {
    return this.httpClient.get<any>(`${this.apiUrl}/pod/traditionalaccountconnectionrequest?otp=${otp}`).pipe(
      map((data: any) => {
        return data.result;
      })
    );
  }

}

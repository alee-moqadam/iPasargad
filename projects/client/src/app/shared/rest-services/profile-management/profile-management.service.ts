import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { environment } from 'projects/client/src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { CustomerInfoModel } from '.';

@Injectable({
  providedIn: 'root'
})
export class ProfileManagementService {
  private apiUrl: string = environment.apiUrl;
  customerInfo = signal<CustomerInfoModel>(null)
  constructor(private httpClient: HttpClient) { }

  isUserRegistrationComplete = computed(() => {
    if (!this.customerInfo()) {
      return null;
    }
    return this.customerInfo() && this.customerInfo().registerInfo?.finalStatus==100
  })

  isSejamComplete = computed(() => {
    if (!this.customerInfo()) {
      return null;
    }
    return this.customerInfo() && this.customerInfo().registerInfo?.sejamStatus==6
  })

  updateCustomerInfo(){
    this.getServerCustomerInfo().subscribe()
  }

  updateCustomerInfoProfile(): Observable<CustomerInfoModel> {
    return this.getServerCustomerInfo();
  }

  getCustomerInfo(): Observable<CustomerInfoModel> {
    if(this.customerInfo() && this.customerInfo()?.personalInfo){
      
      return of(this.customerInfo())
    }
    return this.getServerCustomerInfo()
  }

  clean() {
    this.customerInfo.set(null);
  }


  private getServerCustomerInfo(){
    return this.httpClient
    .get(`${this.apiUrl}/profilemanagement/getcustomerinfo`)
    .pipe(
      map((data: any) => {
        this.customerInfo.set(data.result);
        return data.result;
      }),
      catchError(() => {
        //نباید نال باشد که مشخص شود اطلاعات کاربر موجود نیست
        this.customerInfo.set({
          personalInfo: null,
          contactInfo: null,
          bankAccounts: [],
          holders:[],
          registerInfo: null,
          partyServiceInfos: [],
          podSsoInfo: null
        });
        return null;
      })
    );
  }

  reinvestMutualFund(command){
    return this.httpClient.post(`${this.apiUrl}/profilemanagement/changereinvestfund` , command)
  }

  sendLegalCustomerTradingOtp(personNationalId) {
    return this.httpClient.post(`${this.apiUrl}/profilemanagement/sendlegalcustomertradingotp`, { personNationalId: personNationalId }).pipe(
      map((data: any) => {
        return data.result;
      })
    );
  }

  verifyLegalCustomerTradingOtp(body) {
    return this.httpClient.post(`${this.apiUrl}/profilemanagement/verifylegalcustomertradingotp`, body).pipe(
      map((data: any) => {
        return data.result;
      })
    );
  }

  // setBrokerAgentForLegalCustomer(agentNationalId) {
  //   return this.httpClient.post(`${this.apiUrl}/profilemanagement/setbrokeragentforlegalcustomer`, { entity: agentNationalId }).pipe(
  //     map((data: any) => {
  //       return data.result;
  //     })
  //   );
  // }

  getBrokerFinalizeInfo() {
     return this.httpClient.get(`${this.apiUrl}/profilemanagement/getbrokerfinalizeinfo`).pipe(
      map((data: any) => {
        return data.result;
      })
    );
  }
}

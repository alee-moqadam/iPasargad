import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/client/src/environments/environment';
import { ForgetPasswordModel } from './models/forget-password.model';
import { ChangePasswordWithOtp } from './models/change-password-with-otp.model';
import { Observable, map } from 'rxjs';
import { UserSignInHistoryModel } from './models/user-signin-history.model';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private baseUrl: string = environment.identityUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  login(body: any) {
    const headers = new HttpHeaders({
      'WebApp-Version': `${environment.VERSION} (${environment.versionCode})`
    });

    return this.httpClient.post(`${this.baseUrl}/Account/Login`, body, { headers });
  }

  // login(body) {
  //   return this.httpClient.post(`${this.baseUrl}/Account/Login`, body);
  // }

  logout() {
    return this.httpClient.get(`${this.baseUrl}/Account/logout`);
  }

  forgetPassword(params: ForgetPasswordModel) {
    return this.httpClient.post(`${this.baseUrl}/Account/forgetPassword`, params);
  }

  changePasswordWithOtp(params: ChangePasswordWithOtp) {
    return this.httpClient.post(`${this.baseUrl}/Account/changePasswordWithOtp`, params);
  }

  register(body) {
    return this.httpClient.post(`${this.baseUrl}/Register/Register`, body);
  }

  LegalRegister(body) {
    return this.httpClient.post(`${this.baseUrl}/Register/LegalRegister`, body);
  }

  setPassword(body) {
    return this.httpClient.post(`${this.baseUrl}/Register/SetPassword`, body);
  }

  sendRegisterOtp(body) {
    return this.httpClient.post(`${this.baseUrl}/Register/SendRegisterOtp`, body);
  }

  getCaptcha() {
    return this.httpClient.get(`${this.baseUrl}/captcha/getCaptcha`);
  }

  sendSejamOtp(captcha: { value: string, salt: string, hash: string }) {
    return this.httpClient.post(`${this.baseUrl}/Register/SendSejamOtp`, { captcha });
  }

  changePassword(params) {
    return this.httpClient.post(`${this.baseUrl}/Account/ChangePassword`, params);
  }

  saveSejamProfile(model) {
    return this.httpClient.post(`${this.baseUrl}/register/saveSejamProfile`, model);
  }

  getRedemptionOtp() {
    return this.httpClient.get(`${this.baseUrl}/Account/getRedemptionOtp`);
  }

  getSubscriptionOtp() {
    return this.httpClient.get(`${this.baseUrl}/account/getSubscriptionOtp`);
  }

  getUserSignInHistory(): Observable<UserSignInHistoryModel[]> {
    return this.httpClient.get<UserSignInHistoryModel[]>(`${this.baseUrl}/account/getUserSignInHistory`)
      .pipe(
        map((data: any) => data.result)
      );
  }


  getInProfileOtp() {
    return this.httpClient.get(`${this.baseUrl}/Account/GetInProfileOtp`);
  }


  getUserSejamStatus() {
    return this.httpClient.get<number>(`${this.baseUrl}/Register/GetUserSejamStatus`);
  }

  getSimpleSejamStatus() {
    return this.httpClient.get<number>(`${this.baseUrl}/Register/GetSimpleSejamStatus`);
  }


  sendSejamOtpForUpdate(captcha: { value: string, salt: string, hash: string }) {
    return this.httpClient.post(`${this.baseUrl}/Register/SendSejamOtpForUpdate`, { captcha });
  }

  updateSejamProfile(model) {
    return this.httpClient.post(`${this.baseUrl}/Register/UpdateSejamProfile`, model);
  }

  updateUserSetting(setting) {
    return this.httpClient.post(`${this.baseUrl}/Account/UpdateUserSetting`, {
      "setting": JSON.stringify(setting)
    });
  }

  getUserSetting() {
    return this.httpClient.get(`${this.baseUrl}/Account/GetUserSetting`);
  }


  getRegistrationOptions() {
    return this.httpClient.post(`${this.baseUrl}/WebAuthn/GetRegistrationOptions`, {});
  }

  CompleteRegistration(credential) {
    return this.httpClient.post(`${this.baseUrl}/WebAuthn/CompleteRegistration`, credential);
    // return this.httpClient.post(`${this.baseUrl}/WebAuthn/CompleteRegistration`, credential, {
    //   observe: 'body'
    // });
  }

  getAuthenticationOptions() {
    return this.httpClient.post(`${this.baseUrl}/WebAuthn/GetAuthenticationOptions`, {});
  }

  CompleteAuthentication(credential) {
    return this.httpClient.post(`${this.baseUrl}/WebAuthn/CompleteAuthentication`, credential);
  }
}

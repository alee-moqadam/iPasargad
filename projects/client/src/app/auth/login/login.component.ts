import { buffer } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IndexedDBService } from '@client/core/services/indexeddb.service';
import { ToastService } from '@client/core/services/toast.service';
import { PasswordComponent, CaptchaModel, IdentityService, SharedModule, Convert } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterLink,
    PasswordComponent,
    NgxMaskDirective,
    CommonModule,
    FontAwesomeModule,
    SharedModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [provideNgxMask()],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements AfterViewInit {
  formGroup!: UntypedFormGroup;
  generatedCaptchaValue = signal<CaptchaModel>({});
  loginMsg = signal(null);
  submitting = signal(false);
  biometricSubmitting = signal(false);
  isPasswordVisible: boolean = false;
  showLoginByBiometrics = signal(false);

  @ViewChild('password') private password!: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private identityService: IdentityService,
    private toastService: ToastService,
    private indexedDBService: IndexedDBService
  ) {}

  // ngAfterViewChecked(): void {
  //   if (window.PublicKeyCredential) {
  //     this.showLoginByBiometrics.set(true);
  //   } else {
  //     this.showLoginByBiometrics.set(false);
  //   }
  // }

  // ngAfterViewInit(): void {
  //   if (window.PublicKeyCredential) {
  //     PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
  //       .then((available) => {
  //         this.showLoginByBiometrics.set(available);
  //       })
  //       .catch((err) => {
  //         console.log('err', err);
  //         this.showLoginByBiometrics.set(false);
  //       });
  //   } else {
  //     this.showLoginByBiometrics.set(false);
  //   }
  // }

  ngAfterViewInit(): void {
    if (window.PublicKeyCredential) {
      this.checkisUserVerifyingPlatformAuthenticatorAvailable();
    } else {
      this.showLoginByBiometrics.set(false);
    }
  }

  async checkisUserVerifyingPlatformAuthenticatorAvailable() {
    try {
      const capabilities = await (PublicKeyCredential as any).getClientCapabilities();

      if (capabilities.userVerifyingPlatformAuthenticator) {
        this.showLoginByBiometrics.set(true);
      } else {
        this.showLoginByBiometrics.set(false);
      }
    } catch (error) {
      this.showLoginByBiometrics.set(false);
    }
  }

  ngOnInit(): void {
    this.generateNewCaptcha();
    this.formGroup = new UntypedFormGroup({
      loginName: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required]),
      captcha: new UntypedFormControl('', [Validators.required]),
    });
  }

  submit() {
    this.formGroup.controls.loginName.markAsTouched();

    if (this.formGroup.controls.loginName.invalid) {
      throw new Error("nationalId is required!");
    }

    if (this.formGroup.invalid) {
      this.loginMsg.set('لطفاً مقادیر ورودی را مجدد بررسی فرمایید.');
      throw new Error('form invalid!');
    }
    this.submitting.set(true);
    this.identityService.login({
      loginName: Convert.toEnglishNumber(this.formGroup.get('loginName')?.value),
      password: this.formGroup.get('password')?.value,
      captcha: {
        hash: this.generatedCaptchaValue().hashedCaptcha,
        salt: this.generatedCaptchaValue().salt,
        value: Convert.toEnglishNumber(this.formGroup.get('captcha')?.value),
      },
    })
      .subscribe(
        (res: any) => {
          this.submitting.set(false);
          if (!res.result.isSuccess) {
            this.toastService.show(res.result.errorMessage, {
              classname: 'bg-danger text-light',
            });
            throw new Error(res.result.errorMessage);
          }
          localStorage.setItem('sejam-status', res.result.sejamStatus);
          localStorage.setItem('step', res.result.step);
          this.toastService.toasts = [];
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          this.submitting.set(false);
          if (err) {
            this.formGroup.get('captcha').setValue('');
            this.generateNewCaptcha();
            return;
          }
        }
      );
  }

  generateNewCaptcha() {
    this.identityService.getCaptcha()
      .subscribe((result: any) => {
        this.generatedCaptchaValue.set({
          ...result.result,
          captchaByteData: 'data:image/jpg;base64,' + result.result['captchaByteData']
        });
      });
  }

  changePasswordVisibility() {
    switch (this.password.nativeElement.type) {
      case 'password':
        this.password.nativeElement.type = 'text';
        this.isPasswordVisible = true;
        break;
      default:
        this.password.nativeElement.type = 'password';
        this.isPasswordVisible = false;
        break;
    }
  }

  biometricLogin() {
    this.biometricSubmitting.set(true);
    this.indexedDBService.getData('webauthn', 'userCredential')
      .then(storedData => {

        if (!storedData || !storedData.cr) {
          this.biometricSubmitting.set(false);
          this.toastService.show('لطفا ابتدا از بخش تنظیمات اثر انگشت را ثبت نمایید.', {
            classname: 'bg-danger text-light',
          });
          return;
        }

        const crendialId = JSON.parse(storedData.cr);

        this.identityService.getAuthenticationOptions().subscribe((res: any) => {
          const publicKeyOptions: PublicKeyCredentialRequestOptions = {
            challenge: this.base64ToUint8Array(res.result.challenge),
            timeout: res.result.timeout || 60000,
            userVerification: res.result.userVerification || 'preferred',
            rpId: res.result.rpId,
            allowCredentials: [{
              type: "public-key",
              transports: ["internal"],
              id: this.base64ToUint8Array(crendialId),
            }]
          };

          navigator.credentials.get({ publicKey: publicKeyOptions }).then(async (credential: any) => {
            this.biometricSubmitting.set(false);
            const response = credential.response;
            const changedId = this.removeSpecialCharacters(crendialId);
            const payload = {
              authenticatorAttachment: credential.authenticatorAttachment,
              clientExtensionResults: credential.getClientExtensionResults?.() || {},
              id: changedId,
              type: credential.type,
              rawId: this.arrayBufferToBase64(credential.rawId),
              response: {
                clientDataJSON: this.arrayBufferToBase64(response.clientDataJSON),
                authenticatorData: this.arrayBufferToBase64(response.authenticatorData),
                signature: this.arrayBufferToBase64(response.signature),
              }
            };

            this.identityService.CompleteAuthentication(payload).subscribe({
              next:(res: any) => {
                 if (!res.result.isSuccess) {
                this.toastService.show(res.result.errorMessage, {
                  classname: 'bg-danger text-light',
                });
                throw new Error(res.result.errorMessage);
                }

                localStorage.setItem('sejam-status', res.result?.sejamStatus);
                localStorage.setItem('step', res.result?.step);
                this.toastService.toasts = [];
                this.router.navigate(['/dashboard']);
              },
              error:(err) => {
                this.indexedDBService.deleteData('webauthn', 'userCredential')
                  .then(() => {
                    this.toastService.show('خطا در احراز هویت با اثر انگشت. لطفا مجددا ثبت اثر انگشت را انجام دهید.', {
                      classname: 'bg-danger text-light',
                    });
                  })
                  .catch(deleteErr => {
                    console.error('Error deleting credential:', deleteErr);
                  });
              }
            });


          }).catch((err) => {

            this.biometricSubmitting.set(false);
            this.toastService.show('خطا در فرآیند اثر انگشت', {
              classname: 'bg-danger text-light',
            });
          });
        });
      })
      .catch((err) => {

        this.biometricSubmitting.set(false);
        this.toastService.show('لطفا ابتدا از بخش تنظیمات اثر انگشت را ثبت نمایید.', {
          classname: 'bg-danger text-light',
        });
      });
  }

  base64ToUint8Array(base64url: string): Uint8Array {
    let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    try {
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    } catch (e) {
      console.error("Base64 decode error:", e);
      throw new Error("Invalid base64url string");
    }
  }

  removeSpecialCharacters(input: string): string {
    return input.replace(/[^a-zA-Z0-9]/g, '');
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = String.fromCharCode.apply(null, Array.from(bytes));
    return btoa(binary);
  }
}

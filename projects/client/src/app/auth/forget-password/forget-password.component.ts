import { NgClass, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PasswordComponent } from "../../shared/components/password/password.component";
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastService } from '@client/core/services/toast.service';
import { CaptchaModel, IdentityService, ChangePasswordWithOtp, SharedModule, Convert } from '@client/shared';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, FontAwesomeModule, RouterLink, NgIf, PasswordComponent, NgxMaskDirective, NgClass],
  providers: [provideNgxMask()],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgetPasswordComponent implements AfterViewInit, OnDestroy {
  formGroup!: UntypedFormGroup;
  generatedCaptchaValue = signal<CaptchaModel>({});
  errorMessage = signal(null);
  submitting = signal(false);

  step = signal<'step1' | 'step2'>('step1');
  isPasswordVisible: boolean = false;
  mainObj: any = {};
  abortController: AbortController = null

  nationalId
  constructor(private router: Router, private identityService: IdentityService,
    private element: ElementRef, private toast: ToastService) {
    this.nationalId = this.router.getCurrentNavigation()?.extras?.state?.nationalId;
  }


  get isBtnDisabled() {
    if (this.step() === 'step1') {
      return this.formGroup.controls.nationalId.invalid || this.formGroup.controls.captcha.invalid;
    }
    else {
      return this.formGroup.controls.newPassword.invalid || this.formGroup.controls.confirmPassword.invalid || this.formGroup.controls.otp.invalid || this.formGroup.controls.captcha.invalid || this.formGroup.errors?.['passwordMismatch'];
    }
  }

  private passwordMatchValidator: ValidationErrors = (form: FormGroup) => {
    if (form.get('newPassword')?.value !== form.get('confirmPassword')?.value) {
      return { passwordMismatch: true };
    }
    return null;
  };

  ngAfterViewInit(): void {
    this.autoFillOtpFromSMS();
  }

  ngOnInit(): void {
    this.generateNewCaptcha();
    this.formGroup = new UntypedFormGroup({
      nationalId: new UntypedFormControl(this.nationalId, [Validators.required]),
      newPassword: new UntypedFormControl('', [Validators.required]),
      confirmPassword: new UntypedFormControl('', [Validators.required]),
      otp: new UntypedFormControl('', [Validators.required]),
      captcha: new UntypedFormControl('', [Validators.required]),
    }, this.passwordMatchValidator);
  }

  forgetPassword() {

    this.identityService.forgetPassword({
      nationalId: Convert.toEnglishNumber2(this.formGroup.get('nationalId')?.value),
      captcha: {
        hash: this.generatedCaptchaValue().hashedCaptcha,
        salt: this.generatedCaptchaValue().salt,
        value: Convert.toEnglishNumber2(this.formGroup.get('captcha')?.value),
      },
    }).subscribe({
      next: (res: any) => {
        this.submitting.set(false);

        if (res['isSuccess'] === false) {
          this.errorMessage.set(res.result.errorMessage);
          this.generateNewCaptcha();

          throw new Error(res.result.errorMessage);
        }

        this.step.set('step2');
        this.formGroup.get('captcha').setValue('');
        setTimeout(() => {
          const input = this.element.nativeElement.querySelector('#newPassword');
          if (input) {
            input.focus();
          }
        });


        this.generateNewCaptcha();
      },
      error: () => { this.submitting.set(false); }
    })

  }

  submit() {
    this.submitting.set(true);
    if (this.step() === 'step1') {
      this.forgetPassword();
      return;
    }
    if (this.formGroup.get('newPassword')?.errors?.strongPassword == false) {
      this.errorMessage.set('لطفاً رمزعبور پیچیده‌تری انتخاب نمایید.');
      throw new Error('form invalid!');
    }

    if (this.formGroup.invalid || this.formGroup.invalid) {
      this.errorMessage.set('لطفاً مقادیر ورودی را مجدد بررسی فرمایید.');
      throw new Error('form invalid!');
    }





    const requestModel: ChangePasswordWithOtp = {
      ...this.formGroup.getRawValue(),
      captcha: {
        hash: this.generatedCaptchaValue().hashedCaptcha,
        salt: this.generatedCaptchaValue().salt,
        value: Convert.toEnglishNumber2(this.formGroup.get('captcha')?.value),
      },
    }
    this.identityService.changePasswordWithOtp(requestModel)
      .subscribe({
        next: (res: any) => {
          this.submitting.set(false);
          if (!!res && res.result.isSuccess === false) {
            this.errorMessage.set(res.result?.errorMessage);
            throw new Error(res.result?.errorMessage);
          }

          this.toast.show('کلمه عبور با موفقیت تغییر کرد', {
            classname: 'bg-success text-light'
          });

          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.submitting.set(false);
          if (err) {
            this.errorMessage.set(err?.error?.errorMessage);
            this.generateNewCaptcha();
          }
        }

      });
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


  preStep() {
    this.step.set('step1');
    this.errorMessage.set(null)
  }

  autoFillOtpFromSMS() {
    if ('OTPCredential' in window) {
      this.mainObj.isWebOtpSupported = true;
      const input = document.querySelector('input[autocomplete="one-time-code"]');
      if (!input) return;
      this.abortController = new AbortController();
      var reqObj = {
        otp: { transport: ['sms'] },
        signal: this.abortController.signal
      };
      navigator.credentials.get(
        reqObj
      ).then((otp: any) => {
        if (otp) {
          if (otp && otp.code) {
            this.formGroup.get('otp').setValue(otp.code);
          }
        }

      }).catch(err => {
        console.log(err);
      });
    } else {
      this.mainObj.isWebOtpSupported = false;
      console.log('Web OTP API not supported, Please enter manually.');
    }
  }

  ngOnDestroy(): void {
    if (this.abortController) {
      this.abortController.abort("on destroy");
    }
  }

}

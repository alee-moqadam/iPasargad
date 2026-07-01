import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CaptchaModel, IdentityService, SharedModule, Convert } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-quick-register',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink, NgxMaskDirective, NgClass, SharedModule],
  templateUrl: './quick-register.component.html',
  styleUrl: './quick-register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [provideNgxMask()],
})
export class QuickRegisterComponent {
  formGroup!: UntypedFormGroup;
  generatedCaptchaValue = signal<CaptchaModel>({});
  errMsg = signal(null);
  isLegal = signal(false);
  // step: 'step1' | 'step2' = 'step1';
  nationalId
  submitting = signal(false);
  constructor(private router: Router, private identityService: IdentityService) {
    this.nationalId = this.router.getCurrentNavigation()?.extras?.state?.nationalId;
  }

  ngOnInit(): void {
    this.generateNewCaptcha();
    this.formGroup = new UntypedFormGroup({
      nationalId: new UntypedFormControl(this.nationalId, [Validators.required]),
      mobile: new UntypedFormControl('', [Validators.required, Validators.minLength(11)]),
      captcha: new UntypedFormControl('', [Validators.required]),
    });
  }

  submit() {

    this.formGroup.controls.nationalId.markAsTouched();

    if (this.formGroup.controls.nationalId.invalid) {
      throw new Error("nationalId is required!");
    }


    // if (this.step == 'step1') {
    //   this.step = 'step2'
    //   return
    // }
    if (this.formGroup.invalid) {
      this.errMsg.set('لطفاً مقادیر ورودی را مجدد بررسی فرمایید.');
      throw new Error('form invalid!');
    }
    //ثبت حقیقی
    if (!this.isLegal()) {
      this.submitting.set(true);
      this.identityService.register({
        nationalId: Convert.toEnglishNumber(this.formGroup.get('nationalId')?.value),
        mobile: Convert.toEnglishNumber(this.formGroup.get('mobile')?.value),
        code: '',
        captcha: {
          hash: this.generatedCaptchaValue().hashedCaptcha,
          salt: this.generatedCaptchaValue().salt,
          value: Convert.toEnglishNumber(this.formGroup.get('captcha')?.value),
        },
      })
        .subscribe(
          (result: any) => {
            this.submitting.set(false);
            this.router.navigate(['auth/reg/step2'], {
              state: {
                nationalId: this.formGroup.get('nationalId')?.value,
                mobile: this.formGroup.get('mobile')?.value,
                patyType: this.isLegal ? 2 : 1
              }
            });
          },
          (err) => {
            this.submitting.set(false);
            if (err) {
              // this.errMsg.set(err.error.Message);
              this.generateNewCaptcha();
              return;
            }
          }
        );
    } else {
      //ثبت حقوقی
      this.submitting.set(true);
      this.identityService.LegalRegister({
        nationalId: Convert.toEnglishNumber(this.formGroup.get('nationalId')?.value),
        mobile: Convert.toEnglishNumber(this.formGroup.get('mobile')?.value),
        code: '',
        captcha: {
          hash: this.generatedCaptchaValue().hashedCaptcha,
          salt: this.generatedCaptchaValue().salt,
          value: Convert.toEnglishNumber(this.formGroup.get('captcha')?.value),
        },
      })
        .subscribe(
          (result: any) => {
            this.submitting.set(false);
            this.router.navigate(['auth/reg/step2'], { state: { 
              nationalId: this.formGroup.get('nationalId')?.value, 
              mobile: this.formGroup.get('mobile')?.value,
              partyType: this.isLegal ? 2 : 1 } });
          },
          (err) => {
            this.submitting.set(false);
            if (err) {
              // this.errMsg.set(err.error.Message);
              this.generateNewCaptcha();
              return;
            }
          }
        );
    }
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

  setLegal(isLegal) {
    if (isLegal) {
      this.isLegal.set(true)
    } else {
      this.isLegal.set(false)
    }
  }

}

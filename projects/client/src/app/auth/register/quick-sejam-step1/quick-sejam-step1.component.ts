import { ChangeDetectionStrategy, Component, ElementRef, signal, ViewChild, ViewEncapsulation, WritableSignal } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { switchMap } from 'rxjs';
import { AsyncPipe, Location } from '@angular/common';
import { IdentityService, SharedModule, FundService, CaptchaModel, Convert } from '@client/shared';
import { ToastService } from '@client/core/services/toast.service';

@Component({
  selector: 'app-quick-sejam-step1',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink, SharedModule, AsyncPipe],
  templateUrl: './quick-sejam-step1.component.html',
  styleUrl: './quick-sejam-step1.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickSejamStep1Component {
  formGroup!: UntypedFormGroup;
  showCounter: boolean;
  errMsg = signal(null);
  submitting = signal(false);
  generatedCaptchaValue = signal<CaptchaModel>({});
  submitted: boolean = false;
  state = { mobile: '', nationalId: '' };
  partyType = 1;
  step: 'step1' | 'step2' = 'step1';

  constructor(private router: Router, private identityService: IdentityService,
    private fundService: FundService, private toast: ToastService,
    private route: ActivatedRoute,
    location: Location) {
    this.state = location.getState() as any;
    this.route.queryParams.subscribe(params => {
      this.partyType = params['partyType'];
    });
  }

  ngOnInit(): void {
    this.generateNewCaptcha();
    this.formGroup = new UntypedFormGroup({
      otp: new UntypedFormControl('', [Validators.required]),
      captcha: new UntypedFormControl('', [Validators.required])
    });
  }


  submit() {
    this.submitting.set(true);
    if (this.step == 'step1') {

      if (this.formGroup.get('captcha').invalid) {
        this.errMsg.set('لطفاً مقادیر ورودی را مجدد بررسی فرمایید.');
        this.submitting.set(false);
        return;
      }
      const captcha = {
        hash: this.generatedCaptchaValue()?.hashedCaptcha,
        salt: this.generatedCaptchaValue()?.salt,
        value: Convert.toEnglishNumber(this.formGroup.get('captcha')?.value),
      };
      this.identityService.sendSejamOtp(captcha).subscribe(
        (res: any) => {
          this.submitting.set(false);
          this.step = 'step2'
        },
        err => {
          if (this.partyType == 2 && err?.error?.code == -1000) {
            const message ='اطلاعات سجام دریافت نشد. لطفا نسبت به ثبت اطلاعات شرکت در سجام اقدام فرمایید';
            this.toast.show(message,
              { classname: 'bg-danger text-light', delay: 30000 }
            )
            // this.router.navigate(['/auth/reg/legal-step'])
          }
          this.submitting.set(false);
          this.step = 'step1'
          this.generateNewCaptcha()
        }
      );
    } else {

      this.identityService.saveSejamProfile({ otp: this.formGroup.get('otp').value }).pipe(
        switchMap(() => { return this.fundService.saveCustomer() }),
      ).subscribe((customerData: any) => {
        this.submitting.set(false);
        const message = 'اطلاعات سجام شما با موفقیت بروزرسانی شد';
        if (customerData.result.personalInfo.partyType == 2) {
          //مشتری حقوقی
          this.router.navigate(['/auth/reg/step4-legal'])
        } else {
          this.router.navigate(['/auth/reg/step4'])
        }

      }, err => {
        this.step = 'step2'
        this.submitting.set(false);
        // this.generateNewCaptcha()
      })
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

  openPanel() {
    // this.toast.toasts=[]
    // this.router.navigate(['/dashboard'])
    //route cause toast not work- dont understand why
    window.location.href = '/dashboard';
  }

  returnToStep1(){
    this.step = 'step1';
    this.generateNewCaptcha();
    this.formGroup.get('otp')?.setValue('');
    this.formGroup.get('captcha')?.setValue('');
  }

}

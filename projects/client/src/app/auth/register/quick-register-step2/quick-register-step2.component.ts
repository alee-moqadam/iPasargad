import { ChangeDetectionStrategy, Component, ElementRef, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { AsyncPipe, CommonModule, Location } from '@angular/common';
import { IdentityService, SharedModule, PasswordComponent, Convert, FundService, PartyRegisterStatusEnum } from '@client/shared';
import { ToastService } from '@client/core/services/toast.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-quick-register-step2',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink, SharedModule, AsyncPipe, PasswordComponent, NgxMaskDirective, CommonModule],
  providers: [provideNgxMask()],
  templateUrl: './quick-register-step2.component.html',
  styleUrl: './quick-register-step2.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickRegisterStep2Component {
  formGroup!: UntypedFormGroup;
  showCounter: boolean;
  errorMessage = signal(null);
  isOtpSend$ = new BehaviorSubject<boolean>(true);
  resendOTP$ = new BehaviorSubject<boolean>(false);
  counter$: Observable<Date>;
  submitted: boolean = false;
  showCounter$ = new BehaviorSubject(true);
  state = { mobile: '', nationalId: '', partyType: 1 };
  isPasswordVisible: boolean = false;
  isPassword2Visible: boolean = false;
  submitting = signal(false);
  disableOtpButton$ = combineLatest([this.isOtpSend$, this.showCounter$])
    .pipe(map(([isOtpSend, showCounter]) => isOtpSend && showCounter))
  @ViewChild('password') private password!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmNewPass') private confirmNewPass!: ElementRef<HTMLInputElement>;


  constructor(private router: Router, private identityService: IdentityService, location: Location, private toastService: ToastService, private fundService: FundService) {
    this.state = location.getState() as any;

  }

  ngOnInit(): void {
    this.formGroup = new UntypedFormGroup({
      otp: new UntypedFormControl('', [Validators.required]),
      newPassword: new UntypedFormControl('', [Validators.required]),
      confirmPassword: new UntypedFormControl('', [Validators.required]),
    }, this.passwordMatchValidator);
  }

  private passwordMatchValidator: ValidationErrors = (form: FormGroup) => {
    if (form.get('newPassword')?.value !== form.get('confirmPassword')?.value) {
      return { passwordMismatch: true };
    }
    return null;
  };

  sendOtp() {
    const isOtpSend = this.isOtpSend$.getValue();

    if (isOtpSend) {
      this.showCounter$.next(true);
      return;
    }
    this.submitting.set(true);
    this.identityService.sendRegisterOtp({
      nationalId: this.state.nationalId
    })
      .subscribe((res:any) => {
        if (!res.isError) {
          this.submitting.set(false);
          this.resendOTP$.next(true);
          this.isOtpSend$.next(true);

          this.showCounter$.next(true);
        }
      },
        () => {
          this.submitting.set(false);
        })
  }

  submit() {
    if (this.formGroup.invalid) {
      this.errorMessage.set('لطفاً مقادیر ورودی را مجدد بررسی فرمایید.');
      throw new Error('form invalid!');
    }

    if (this.formGroup.get('newPassword')?.errors?.strongPassword == false) {
      this.errorMessage.set('لطفاً رمزعبور پیچیده‌تری انتخاب نمایید.');
      throw new Error('form invalid!');
    }

    this.submitted = true;
    let form = this.formGroup.value;
    form.nationalId = Convert.toEnglishNumber(this.state.nationalId)
    form.otp = Convert.toEnglishNumber(form.otp)
    this.submitting.set(true);
    this.identityService.setPassword(form).pipe(switchMap((res: any) => {
      this.submitting.set(false);
      this.submitted = false;
      localStorage.setItem('ottoken', res.result.token);
      const message = 'ثبت نام در سامانه با موفقیت انجام شد';
      this.toastService.show(message, { classname: 'bg-success text-light', delay: 5000 });
      localStorage.setItem('sejam-status', res.result.sejamStatus);
      localStorage.setItem('step', res.result.step);
      return this.fundService.getPartyRegisterStatus()
    })).subscribe((currentStep) => {
      if (currentStep < PartyRegisterStatusEnum.Completed) {
        if (this.state.partyType == 2) {
          //حقوقی
          this.router.navigate(['auth/reg/step3'], {
            state: {
              nationalId: this.state.nationalId,
              mobile: this.state.mobile
            }, queryParams: { partyType: this.state.partyType }
          });
        } else {
          //حقیقی
          this.router.navigate(['auth/reg/step3'], {
            state:
            {
              nationalId: this.state.nationalId,
              mobile: this.state.mobile,
            }
          });
        }
      } else if (currentStep == PartyRegisterStatusEnum.Completed) {
        this.router.navigate(['/dashboard']);
      }
    },
      (err) => {
        this.submitting.set(false);
        this.submitted = false;

        if (err && err.error) {
          this.f.otp.setValue(null);
          this.f.otp.updateValueAndValidity();
        }
      }
    );

  }

  get f() {
    return this.formGroup.controls;
  }
  get confirmPassword() {
    return this.formGroup.get('confirmNewPass');
  }

  onCounterValueChange(value: { time: string, count: number }) {
    if (value.count <= 0) {
      this.isOtpSend$.next(false);
      this.showCounter$.next(false);
    }
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
  changePassword2Visibility() {
    switch (this.confirmNewPass.nativeElement.type) {
      case 'password':
        this.confirmNewPass.nativeElement.type = 'text';
        this.isPassword2Visible = true;
        break;

      default:
        this.confirmNewPass.nativeElement.type = 'password';
        this.isPassword2Visible = false;
        break;
    }
  }

}

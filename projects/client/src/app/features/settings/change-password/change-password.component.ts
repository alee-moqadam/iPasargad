import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '@client/core/services/toast.service';
import { PasswordComponent, IdentityService, SharedModule } from '@client/shared';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordComponent,
    SharedModule,
    AsyncPipe,
    NgIf,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent {

  form: FormGroup;
  formSubmitted$ = new BehaviorSubject(false);
  isOtpSend$ = new BehaviorSubject(false);
  isFormInvalidForOtpRequest$ = new BehaviorSubject(false);

  constructor(
    private fb: FormBuilder, 
    private identityService: IdentityService,
    private toast: ToastService,
    private router: Router
  ) {

    this.form = this.fb.group({
      otp: new FormControl('', [Validators.required]),
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });

  }

  
  onCounterValueChange(value: { time: string, count: number }) {
    if (value.count <= 0) {
      this.isOtpSend$.next(false);
    }
  }


  get f() {
    return this.form.controls;
  }

  sendOtp() {

    const invalidFormForOtpRequest = (
      this.f.currentPassword.invalid ||
      this.f.newPassword.invalid ||
      this.f.confirmPassword.invalid
    )

    this.isFormInvalidForOtpRequest$.next(invalidFormForOtpRequest);

    if (invalidFormForOtpRequest) {
      return;
    }


    this.identityService.getInProfileOtp().subscribe(
      () => {
        this.toast.show('کد احراز هویت ارسال شد', {
          classname: 'bg-green text-light',
        });

        this.isOtpSend$.next(true);
      },
      err => {
      }
    );

    
  }

  changePassword() {
    this.formSubmitted$.next(true);

    if (this.form.invalid) {
      return;
    }

    this.identityService.changePassword(this.form.value).subscribe(
      () => {
        this.toast.show('کلمه عبور با موفقیت تغییر کرد. لطفا مجددا وارد حساب کاربری خود شوید', {
          classname: 'bg-green text-light',
        });
        this.form.reset();
        this.formSubmitted$.next(false);

        this.identityService.logout().subscribe((x) => {
          localStorage.removeItem('inquiry-api-called');
          this.router.navigate(['/auth/login']);
        });
      },
      err => {
        this.formSubmitted$.next(false);
      }
    )
  }

}

import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastService } from '@client/core/services/toast.service';
import { CaptchaModel, FundService, IdentityService, ProfileManagementService, SharedModule } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-update-directdebit',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink, SharedModule, AsyncPipe, NgxMaskDirective],
  templateUrl: './update-directdebit.component.html',
  providers:[
    provideNgxMask(),
  ],
  styleUrl: './update-directdebit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateDirectDebitComponent {
  formGroup!: FormGroup;
  showCounter: boolean;
  errMsg = signal(null);
  submitting = signal(false);
  generatedCaptchaValue = signal<CaptchaModel>({});
  submitted: boolean = false;
  activeModal = inject(NgbActiveModal);
  podSsoInfo: any;


  state = { mobile: '', nationalId: '' };
  step: 'step1' | 'step2' = 'step1';
  constructor(
    private fundService: FundService,
    private identityService: IdentityService,
    private profileManagementService: ProfileManagementService,
    private toastService: ToastService) {
  }




  ngOnInit(): void {
    this.formGroup = new FormGroup({
      otp: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required])
    });
  }

  submit() {
    this.submitting.set(true);
    if (this.step == 'step1') {

      if (this.formGroup.get('mobile').invalid) {
        this.errMsg.set('لطفاً مقادیر ورودی را مجدد بررسی فرمایید.');
        this.submitting.set(false);
        return;
      }
      this.fundService.sendPodOtp(this.formGroup.get('mobile')?.value).subscribe(
        (res: any) => {
          this.submitting.set(false);
          this.step = 'step2'
        },
        err => {
          this.submitting.set(false);
          this.step = 'step1'
        }
      );
    } else {

      this.fundService.verifyPodOtp(this.formGroup.get('mobile')?.value,this.formGroup.get('otp')?.value).subscribe(() => {
        this.submitting.set(false);
        this.toastService.toasts = []
        this.profileManagementService.getCustomerInfo()
        const message = 'پرداخت مستقیم با موفقیت بروزرسانی شد';
        this.toastService.show(message, { classname: 'bg-success' });
        this.close()
      }, err => {
        this.step = 'step1'
        this.submitting.set(false);
      })
    }
  }

  // insert() {
  //   this.submitting.set(true);
  //   if (this.step == 'step1') {

  //     if (this.formGroup.get('captcha').invalid) {
  //       this.errMsg.set('لطفاً مقادیر ورودی را مجدد بررسی فرمایید.');
  //       this.submitting.set(false);
  //       return;
  //     }
  //     const captcha = {
  //       hash: this.generatedCaptchaValue()?.hashedCaptcha,
  //       salt: this.generatedCaptchaValue()?.salt,
  //       value: Convert.toEnglishNumber(this.formGroup.get('captcha')?.value),
  //     };
  //     this.identityService.sendSejamOtp(captcha).subscribe(
  //       (res: any) => {
  //         this.submitting.set(false);
  //         this.step = 'step2'
  //       },
  //       err => {
  //         this.submitting.set(false);
  //         this.step = 'step1'
  //       }
  //     );
  //   } else {

  //     this.identityService.saveSejamProfile({ otp: this.formGroup.get('otp').value }).pipe(
  //       switchMap(() => { return this.fundService.saveCustomer() }),
  //     ).subscribe(() => {
  //       this.submitting.set(false);
  //       this.profileManagementService.getCustomerInfo()
  //       localStorage.removeItem('step')
  //       this.toastService.toasts = []
  //       const message = 'اطلاعات سجام شما با موفقیت دریافت شد';
  //       this.toastService.show(message, { classname: 'bg-success' });
  //       this.close()

  //     }, err => {
  //       this.step = 'step1'
  //       this.submitting.set(false);
  //     })
  //   }
  // }

  close() {
    this.activeModal.dismiss()
  }

}

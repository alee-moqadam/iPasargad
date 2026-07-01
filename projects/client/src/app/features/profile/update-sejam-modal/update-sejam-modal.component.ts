import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, HostListener, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '@client/core/services/toast.service';
import { CaptchaModel, FundService, IdentityService, CustomerInfoModel, ProfileManagementService, SharedModule, Convert, LayoutService, CheckCustomerStepService } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbTooltip, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-update-sejam-modal',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink, NgbTooltip, SharedModule, NgClass, AsyncPipe, NgbPopover, SharedModule, NgxMaskDirective,NgStyle],
  templateUrl: './update-sejam-modal.component.html',
  styleUrl: './update-sejam-modal.component.scss',
  providers: [provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateSejamModalComponent {
  formGroup!: FormGroup;
  showCounter: boolean;
  errMsg = signal(null);
  submitting = signal(false);
  generatedCaptchaValue = signal<CaptchaModel>({});
  submitted: boolean = false;
  activeModal = inject(NgbActiveModal);
  oldUser = true;
  customerInfo = signal<CustomerInfoModel>(null);
  state = { mobile: '', nationalId: '' };
  step = signal<'step1' | 'step2'>('step1');
  isRayanScenario = false;
  fundCode;

  isPopoverOpen = false;
  isInPopover = false;
  isCheckCustomerStep = false;
  
  fundOptions = [
    {
      id: 'exampleRadios1',
      value: '12365',
      label: 'آی پاسارگاد (شامل صندوق قابل معامله پاسارگاد ، ریتون و تکپاد)'
    },
    {
      id: 'exampleRadios2',
      value: '11168',
      label: 'صندوق هزاره سوم پاد'
    }
  ];

  constructor(
    private fundService: FundService,
    private identityService: IdentityService,
    private router: Router,
    private profileManagementService: ProfileManagementService,
    private toastService: ToastService,
    private layoutService: LayoutService,
    private checkCustomerStepService: CheckCustomerStepService
  ) {
    this.customerInfo = profileManagementService.customerInfo
  }

  updateReason: string = 'pod';

  hasRequiredHolders = computed(() => {
    const customerInfo = this.customerInfo();
    if (!customerInfo?.holders) {
      return false;
    }

    const holders = customerInfo.holders;
    const verifiedRealHolders = holders?.filter(
      (h: any) => h.isHolderVerified && h.isRealPerson
    );

    const hasCeo = holders?.some(h => h.positionType === 'Ceo');
    const hasBrokerAgent = holders?.some((h: any) => h.isBrokerAgent);

    return verifiedRealHolders.length >= 2 && hasCeo && hasBrokerAgent;
  });

  ngOnInit(): void {    
    this.isCheckCustomerStep = this.checkCustomerStepService.getCustomerStep();    
    this.formGroup = new FormGroup({
      otp: new FormControl('', [Validators.required]),
      captcha: new FormControl('', [Validators.required]),
      fundCode: new FormControl( this.fundCode ? this.fundCode : '12365' , [Validators.required])
    });
    this.generateNewCaptcha();
  }

  submit() {    
    if (this.oldUser) {

      // if (this.isRayanScenario) {
      //   this.updateFromRayan()
      // } else {
      //   this.update()
      // }

      if (this.formGroup.get('captcha').invalid && this.step() == 'step1') {
        this.errMsg.set('لطفاً مقادیر ورودی را مجدد بررسی فرمایید.');
        this.submitting.set(false);
        return;
      } else if(this.formGroup.get('otp').invalid && this.step() == 'step2'){
          this.errMsg.set('لطفاً مقادیر ورودی را مجدد بررسی فرمایید.');
        this.submitting.set(false);
        return;
      }

      this.checkHowToUpdate()
    } else {
      this.insert()
    }
  }

  checkHowToUpdate() {
    this.fundCode = this.formGroup.get('fundCode').value;    
    if (this.fundCode && !this.isCheckCustomerStep) {
        if (this.step() == 'step1') {
          this.fundService.checkpartyexistinrayan(this.fundCode).subscribe((res: any) => {
           if (res?.result) {
             this.isRayanScenario = true
             this.updateFromRayan()
           } else {
             this.update()
            //  this.generateNewCaptcha()
           }
         })
        } else if(this.step() == 'step2' && this.isRayanScenario) {
          this.updateFromRayan()
        } else {
          this.update()
          // this.generateNewCaptcha()
        }

    } else {
      this.insert()
      // this.generateNewCaptcha()
    }
  }

  setReason( reason: string) {
    this.updateReason = reason
  }

  update() {
    this.submitting.set(true);
    if (this.step() == 'step1') {

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
      this.identityService.sendSejamOtpForUpdate(captcha).subscribe(
        (res: any) => {
          this.submitting.set(false);
          this.step.set('step2');
          this.errMsg.set(null);

        },
        err => {
          this.submitting.set(false);
          this.step.set('step1');
          this.errMsg.set(null);
          this.generateNewCaptcha();

        }
      );
    } else {
      this.identityService.updateSejamProfile({ otp: this.formGroup.get('otp').value }).pipe(
        switchMap(() => { return this.fundService.updateCustomer() }),
      ).subscribe(() => {
        this.submitting.set(false);
        this.toastService.toasts = []
        this.profileManagementService.updateCustomerInfo()

        const message = 'اطلاعات سجام شما با موفقیت بروزرسانی شد';
        this.toastService.show(message, { classname: 'text-bg-success', delay: 5000 });
        if (this.isMobile) {
          this.router.navigate(['/mobile/user-info']);
        } else {
          this.router.navigate(['/profile']);
        }
        this.close();

      }, err => {
        this.step.set('step2')
        this.submitting.set(false);
        // this.generateNewCaptcha();

      })
    }
  }

  insert() {

    this.submitting.set(true);
    if (this.step() == 'step1') {

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
          this.step.set('step2');
          this.errMsg.set(null);
        },
        err => {
          this.submitting.set(false);
          this.step.set('step1')
          this.generateNewCaptcha();
          this.errMsg.set(null);
          if (this.customerInfo()?.personalInfo?.partyType == 2 && err?.error?.code == -1000) {
            this.router.navigate(['/auth/reg/legal-step'])
          }
        }
      );
    } else {

      this.identityService.saveSejamProfile({ otp: this.formGroup.get('otp').value }).pipe(
        switchMap(() => { return this.fundService.saveCustomer() }),
      ).subscribe(() => {
        this.submitting.set(false);
        this.profileManagementService.updateCustomerInfo()
        localStorage.removeItem('step')
        this.toastService.toasts = []
        const message = 'اطلاعات سجام شما با موفقیت دریافت شد';
        this.toastService.show(message, { classname: 'bg-success' });
        if (this.isMobile) {
          this.router.navigate(['/mobile/user-info']);
        } else {
          this.router.navigate(['/profile']);
        }
        this.close()

      }, err => {
        this.step.set('step1')
        this.submitting.set(false);
        // this.generateNewCaptcha();
        this.errMsg.set(null);
      })
    }
  }

  updateFromRayan() {
    this.submitting.set(true);

    if (this.step() == 'step1') {

      this.fundService.sendRayanKYCotpForUpdate(this.fundCode).subscribe(
        (res: any) => {
          this.step.set('step2');
          this.errMsg.set(null);
          this.submitting.set(false);

        },
        err => {
          this.submitting.set(false);
          this.step.set('step1');
          this.generateNewCaptcha();
          this.errMsg.set('خطا در دریافت اطلاعات سجام کاربر ');
        }
      );
    } else {
      this.fundService.updatekycdata(this.formGroup.get('otp').value, this.fundCode).subscribe(() => {
        this.submitting.set(false);
        this.toastService.toasts = []
        this.profileManagementService.updateCustomerInfo()

        const message = 'اطلاعات سجام شما با موفقیت بروزرسانی شد';
        this.toastService.show(message, { classname: 'bg-success text-white', delay: 5000 });
        if (this.isMobile) {
          this.router.navigate(['/mobile/user-info']);
        } else {
          this.router.navigate(['/profile']);
        }
        this.close();

      }, err => {
        this.step.set('step2')
        // this.generateNewCaptcha();
        this.submitting.set(false);
        // this.generateNewCaptcha();

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
    this.formGroup.patchValue({ captcha: '' })
  }

  close() {
    this.activeModal.dismiss()
  }

  get isMobile(): boolean {
    return this.layoutService.isTabletSizeOrSmaller;
  }

  togglePopover(popover: any) {
    if (this.isPopoverOpen) {
      popover.close();
      this.isPopoverOpen = false;
    } else {
      popover.open();
      this.isPopoverOpen = true;
    }
  }

  onMouseEnter(popover: any) {
    popover.open();
    this.isPopoverOpen = true;
    this.isInPopover = true;
  }

  onMouseLeave(popover: any) {
    setTimeout(() => {
      const popoverEl = document.querySelector('.custom-popover');
      const isHovered = popoverEl?.matches(':hover');
      if (!isHovered) {
        popover.close();
        this.isPopoverOpen = false;
        this.isInPopover = false;
      }
    }, 200);
  }

  returnToStep1(){
    this.step.set('step1');
    this.generateNewCaptcha();
    this.formGroup.get('otp')?.setValue('');
    this.formGroup.get('captcha')?.setValue('');

  }
}







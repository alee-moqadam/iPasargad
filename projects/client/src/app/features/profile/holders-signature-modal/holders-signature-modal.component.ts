import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject, Input, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '@client/core/services/toast.service';
import { CaptchaModel, FundService, IdentityService, CustomerInfoModel, ProfileManagementService, SharedModule, Convert } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbTooltip, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, switchMap } from 'rxjs';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-holders-signature-modal',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink, NgbTooltip, SharedModule, NgClass, AsyncPipe, NgbPopover, SharedModule, NgxMaskDirective, NgSelectModule, FormsModule],
  templateUrl: './holders-signature-modal.component.html',
  styleUrl: './holders-signature-modal.component.scss',
  providers: [provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HoldersSignatureModalComponent {
  formGroup!: FormGroup;
  @Input() customerInfo: any;

  // Add a computed signal that always references the latest customerInfo
  get currentCustomerInfo() {
    return this.profileManagementService.customerInfo();
  }

  errMsg = signal(null);
  submitting = signal(false);
  loadingError = signal(false);
  generatedCaptchaValue = signal<CaptchaModel>({});
  submitted: boolean = false;
  activeModal = inject(NgbActiveModal);
  otpInputs: { [personNationalId: string]: boolean } = {};
  submittingStates: { [personNationalId: string]: boolean } = {};

  selectedPersonId: string;
  isAgentDisabled = signal(false);
  otpSentCount = signal(0);
  ceoOtpSent = signal(false);

  agentList = signal<{ fullName: string, personNationalId: string, type: string }[]>([]);

  isMobile = false;
  isPopoverOpen = false;
  isInPopover = false;
  isOtpSend = false;
  isOtpSend$ = new BehaviorSubject(false);

  holdersPositionTypes = ['Ceo','Chairman','DeputyChairman','Member'];

  constructor(
    private fundService: FundService,
    private identityService: IdentityService,
    private router: Router,
    private profileManagementService: ProfileManagementService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService, private fb: FormBuilder) {
    
    this.customerInfo = profileManagementService.customerInfo;    
  }


  ngOnInit(): void {

    this.loadingError.set(false);

    if (this.isCustomerInfoValid()) {
      this.initializeComponent();
    } else {
      this.loadCustomerInfo();
    }
  }

  private isCustomerInfoValid(): boolean {
    return !!(this.customerInfo() && this.customerInfo()?.holders && Array.isArray(this.customerInfo()?.holders));
  }

  private initializeComponent() {
    if (!this.isCustomerInfoValid()) {
      return;
    }

    this.formGroup = this.fb.group({
      selectedPersonId: new FormControl(null),
    });

    this.initializeOtpFormControls();
    this.updateAgentList();
    this.initializeOtpStatus();
  }

  initializeOtpFormControls() {
    this.customerInfo()?.holders?.forEach(holder => {
      if (holder?.isHolderRegistered && !holder?.isHolderVerified && holder?.holderType === 1 && holder?.personNationalId) {
        this.formGroup.addControl(`otp_${holder.personNationalId}`, new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6)
        ]));
      }
    });
  }

  initializeOtpStatus() {
    const holders = this.customerInfo()?.holders || [];
  
    let sentOtpCount = 0;
    let ceoOtpSent = false;
  
    holders.forEach(holder => {
      if (holder?.isHolderRegistered && holder?.isHolderVerified) {
        sentOtpCount++;
  
        if (holder?.isCEO && holder?.positionType === 'Ceo') {
          ceoOtpSent = true;
        }
      }
    });
  
    this.otpSentCount.set(sentOtpCount > 2 ? 2 : sentOtpCount);
    this.ceoOtpSent.set(ceoOtpSent);
  }

  submit() {
    //
  }

  sendOtp(holder: any): void {

    const personNationalId = holder?.personNationalId;
    if (!personNationalId) return;

    const ceo = this.customerInfo()?.holders?.find(h => h.positionType === 'Ceo' && h.isCEO === true);
    if (ceo && ceo.isHolderRegistered === false) {
      this.toastService.show('مدیر عامل در سامانه ثبت نام نکرده است', { classname: 'bg-danger text-light' });
      return;
    }

    if (this.otpSentCount() >= 2) {
      this.toastService.show('حداکثر 2 کد می‌توان ارسال کرد', { classname: 'bg-danger text-light' });
      return;
    }

    if (!this.isSendOtp(holder)) {      
      const isCEO = holder?.positionType === "Ceo" && holder?.isCEO === true;
      if (this.otpSentCount() === 1) {
        if (!this.ceoOtpSent() && !isCEO) {
          this.toastService.show('برای ارسال کد دوم، باید عضو مدیرعامل انتخاب شود', { classname: 'bg-danger text-light' });
        } else if (this.ceoOtpSent() && !isCEO) {
          this.toastService.show('کد دوم برای اعضای غیر مدیرعامل مجاز نیست', { classname: 'bg-danger text-light' });
        }
      }
      return;
    }

    const controlName = 'otp_' + personNationalId;
    if (!this.formGroup.contains(controlName)) {
      this.formGroup.addControl(controlName, new FormControl('', [Validators.required, Validators.maxLength(6)]));
    }

    this.submittingStates[personNationalId] = true;

    this.profileManagementService.sendLegalCustomerTradingOtp(personNationalId).subscribe({
      next: (res) => {
        this.otpInputs[personNationalId] = true;
        this.submittingStates[personNationalId] = false;
        this.otpSentCount.set(this.otpSentCount() + 1);

        this.isOtpSend$.next(true);

        const isCEO = holder?.positionType === "Ceo" && holder?.isCEO === true;
        if (isCEO) {
          this.ceoOtpSent.set(true);
        }

        this.cdr.detectChanges();        
        this.toastService.show('کد با موفقیت ارسال شد', { classname: 'bg-success text-light' });
      },
      error: (err) => {
        this.submittingStates[personNationalId] = false;
        // console.error('خطا در ارسال کد:', err);
        // this.toastService.show('خطا در ارسال کد', { classname: 'bg-danger text-light' });
      }
    });
  }

  verifyOtp(holder: any): void {

    if (!this.selectedPersonId) {
      this.toastService.show('لطفا نماینده را انتخاب کنید.', { classname: 'bg-danger text-light' });
      return;
    }

    const personNationalId = holder?.personNationalId;
    const otpControl = this.formGroup.get(`otp_${personNationalId}`);

    if (!personNationalId || otpControl?.invalid) return;

    const payload = {
      personNationalId: personNationalId,
      otp: otpControl.value,
      brokerAgentPersonNationalId: this.selectedPersonId
    };

    this.submittingStates[personNationalId] = true;

    this.profileManagementService.verifyLegalCustomerTradingOtp(payload).subscribe({
      next: (response) => {
       
        this.submittingStates[personNationalId] = false;
        this.updateHolderVerificationStatus(personNationalId);        
        this.otpInputs[personNationalId] = false;
        
        const controlName = `otp_${personNationalId}`;
        if (this.formGroup.contains(controlName)) {
          this.formGroup.removeControl(controlName);
        }

        if (this.otpSentCount() !== 0 && !this.isAgentDisabled() && this.selectedPersonId) {
          this.isAgentDisabled.set(true);
        }

        this.cdr.detectChanges();
        this.toastService.show('عملیات با موفقیت انجام شد.', { classname: 'bg-success text-light' });
      },
      error: (err) => {
        this.submittingStates[personNationalId] = false;
        // console.error('خطا در تأیید کد:', err);
        // this.toastService.show('خطا در تایید کد', { classname: 'bg-danger text-light' });
      }
    });
  }

  updateHolderVerificationStatus(personNationalId: string) {
    const currentCustomerInfo = this.customerInfo();
    if (currentCustomerInfo?.holders) {
      const holderIndex = currentCustomerInfo.holders.findIndex(h => h.personNationalId === personNationalId);
      if (holderIndex !== -1) {
        const updatedHolders = [...currentCustomerInfo.holders];
        updatedHolders[holderIndex] = {
          ...updatedHolders[holderIndex],
          isHolderVerified: true
        };
        
        const updatedCustomerInfo = {
          ...currentCustomerInfo,
          holders: updatedHolders
        };
        
        this.profileManagementService.customerInfo.set(updatedCustomerInfo);
        this.customerInfo = this.profileManagementService.customerInfo;
        
        this.updateAgentList();
      }
      
      this.initializeOtpStatus();
    }
  }

  updateAgentList() {
    const array = [];
    
    this.customerInfo()?.holders?.forEach(holder => {
      if (holder.isRealPerson && holder.personNationalId) {
        array.push({
          personNationalId: holder.personNationalId,
          label: `${holder.fullName} - ${holder.personNationalId} - ${this.getPosition(holder.positionType)}`,
          isHolderRegistered: !(!holder?.isHolderRegistered && !holder?.isHolderVerified),
          disabled: (!holder?.isHolderRegistered && !holder?.isHolderVerified),
        });
      }
    });

    this.agentList.set(array);

    const defaultAgent = array.find(e => {
      const holder = this.customerInfo()?.holders?.find(h => h.personNationalId === e.personNationalId);
      return holder?.isBrokerAgent === true;
    });

    if (defaultAgent) {
      this.selectedPersonId = defaultAgent.personNationalId;
      this.isAgentDisabled.set(true);
    }

    const unVerifiedHolders = this.customerInfo()?.holders?.filter(h => 
      h?.isHolderRegistered && !h?.isHolderVerified && h?.isRealPerson
    );
    
    if (!unVerifiedHolders || unVerifiedHolders.length === 0) {
      this.otpSentCount.set(0);
      this.ceoOtpSent.set(false);
    }
  }

  loadCustomerInfo(){
    this.submitting.set(true);
    this.loadingError.set(false);
    
    this.profileManagementService.getCustomerInfo().subscribe({
      next: (customerInfo) => {      
        if (customerInfo && customerInfo.holders) {
          this.profileManagementService.customerInfo.set(customerInfo);
          this.customerInfo = this.profileManagementService.customerInfo;
          this.otpInputs = {};
          
          this.initializeComponent();
          this.reInitializeFormControls();
          this.initializeOtpStatus();
          
          this.submitting.set(false);
          this.cdr.detectChanges();
        } else {
          this.submitting.set(false);
          this.loadingError.set(true);
        }
      },
      error: (err) => {
        this.submitting.set(false);
        this.loadingError.set(true);
      }
    });
  }

  reInitializeFormControls() {
    this.customerInfo()?.holders?.forEach(holder => {
      if (holder?.personNationalId) {
        const controlName = `otp_${holder.personNationalId}`;
        if (this.formGroup.contains(controlName)) {
          this.formGroup.removeControl(controlName);
        }
      }
    });

    this.customerInfo()?.holders?.forEach(holder => {
      if (holder?.isHolderRegistered && !holder?.isHolderVerified && holder?.holderType === 1 && holder?.personNationalId) {
        this.formGroup.addControl(`otp_${holder.personNationalId}`, new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6)
        ]));
      }
    });
  }

  isSubmitting(personNationalId: string): boolean {
    return this.submittingStates[personNationalId] === true;
  }

  isVerified(holder: any): boolean {
    return holder?.isHolderRegistered === true && holder?.isHolderVerified === true;
  }

  isValidCeo(holder: any): boolean {
    return holder?.positionType === 'Ceo'
      && holder?.isCEO === true
      && holder?.isHolderRegistered === true
      && holder?.isHolderVerified === true;
  }

  isSendOtp(holder: any): boolean {

    if (this.otpSentCount() >= 2) return false;
    
    const isCEO = holder?.positionType === "Ceo" && holder?.isCEO === true;

    if (this.otpSentCount() === 0) {
      return true;
    }

    if (this.otpSentCount() === 1) {
      if (this.ceoOtpSent()) {
        return true;
      }
      
      if (!this.ceoOtpSent()) {
        if (isCEO) {
          return true;
        } else {
          return false;
        }
      }
    }

    return false;
  }

  onCounterValueChange(value: { time: string, count: number }) {
    if (value.count <= 0) {
      this.isOtpSend$.next(false);
    }
  }

  getPosition(positionType) {
    
    switch (positionType) {
      case "Ceo":
        return "مدیرعامل"
      case "Chairman":
        return "رئيس هیئت مدیره"
      case "Member":
        return "عضو هیئت مدیره"
      case "DeputyChairman":
        return "نائب رئیس هیئت‌مدیره"
      case "Agent":
        return "نماینده "

      default:
        return "ذينفعان شرکت"
    }
  }

  close() {
    this.activeModal.dismiss()
  }

}







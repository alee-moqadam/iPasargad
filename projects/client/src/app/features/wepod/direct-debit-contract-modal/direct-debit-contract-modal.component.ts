import { AsyncPipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '@client/core/services/toast.service';
import { CustomerInfoModel, getDurationEnumItemByDate, PodDirectDebitContractDurationEnum, PodDirectDebitContractDurationModel, PodDirectDebitLimitModel, PodAccountBalanceModel, PodService, ProfileManagementService, SharedModule } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { BehaviorSubject, combineLatest, finalize, forkJoin, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'direct-debit-contract-modal',
  templateUrl: './direct-debit-contract-modal.component.html',
  styleUrls: ['./direct-debit-contract-modal.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    FontAwesomeModule,
    NgClass,
    NgIf,
    NgFor,
    DecimalPipe,
    NgbNavModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    AsyncPipe,
    NgSelectModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DecimalPipe,
    provideNgxMask(),
  ],
})

export class DirectDebitContractModalComponent implements OnInit {
  userContract: any = {};
  userHasScheduledContract: boolean;
  customerInfo: WritableSignal<CustomerInfoModel>;

  activeModal = inject(NgbActiveModal);
  submittingForm = signal(false);
  submitted = signal(false);
  isLoadingStaticDate = signal(false);
  contractDurations = signal<PodDirectDebitContractDurationModel[]>([]);
  directDebitLimits = signal<PodDirectDebitLimitModel[]>([]);
  sendingOTP = signal(false);
  hasOtpSent$ = new BehaviorSubject<boolean>(true);
  showCounter$ = new BehaviorSubject(false);
  otpSubmitted = signal(false);
  otp = '';
  disableOtpButton$ = combineLatest([this.hasOtpSent$, this.showCounter$])
    .pipe(map(([isOtpSend, showCounter]) => isOtpSend && showCounter));

  selectedContractDurationCode: PodDirectDebitContractDurationEnum;
  selectedDirectDebitLimitId: PodDirectDebitLimitModel;
  cardNumber: string = null;
  directDebitAgreement: boolean = false;

  constructor(private podService: PodService,
    private toastService: ToastService,
    private router: Router,
    private profileManagementService: ProfileManagementService) {
    this.customerInfo = profileManagementService.customerInfo;
  }

  public get isCardNumberValid(): boolean{
    return !this.cardNumber || (!!this.cardNumber &&
            this.cardNumber.toString().length === 16 &&
            this.cardNumber.toString().split('')[0] !=='0');
  }

  ngOnInit(): void {
    this.cardNumber = this.userContract?.accountNumber
    this.loadStaticData();
  }

  private loadStaticData() {
    this.isLoadingStaticDate.set(true);

    forkJoin([
      this.podService.getDirectDebitLimits(),
      this.podService.getContractDurations()
    ])
      .pipe(
        finalize(() => this.isLoadingStaticDate.set(false))
      ).subscribe(([directDebitLimits, contractDurations]) => {
        this.isLoadingStaticDate.set(false);
        this.selectedDirectDebitLimitId = this.userContract?.contractAmount || directDebitLimits?.result?.[0]?.amount;
        this.selectedContractDurationCode = this.userContract ? getDurationEnumItemByDate(this.userContract.validFrom, this.userContract.validUntil).code :  contractDurations?.result?.[0]?.code;
        this.directDebitLimits.set(directDebitLimits?.result);
        this.contractDurations.set(contractDurations?.result);
      })
  }

  registerContract(event) {
    if (this.submittingForm()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  
    this.submitted.set(true);
  
    if (this.otp == '' || !this.directDebitAgreement || !this.isCardNumberValid) {
      return;
    }
  
    this.submittingForm.set(true);
  
    let request = {
      otp: this.otp,
      contractAmount: this.selectedDirectDebitLimitId,
      range: this.selectedContractDurationCode,
      id: this.userContract?.id || null
    };
  
    if (this.userContract) {
      this.podService.editDirectDebitContract(request).pipe(
        switchMap(() => {
          // Only call registerCardNumber if cardNumber is present
            return this.cardNumber ? this.podService.registerCardNumber(this.cardNumber) : of(null);
        })
      ).subscribe({
        next: () => {
          this.activeModal.close({submitted: true, needsToGetInquiry: false});
          this.submittingForm.set(false);
        },
        error: () => {
          this.submittingForm.set(false);
        }
      });
    } else {
      request['accountNumber'] = this.cardNumber;
  
      this.podService.registerDirectDebitContract(request).subscribe({
        next: () => {
          this.activeModal.close({submitted: true, needsToGetInquiry: true});
          this.submittingForm.set(false);
        },
        error: () => {
          this.submittingForm.set(false);
        }
      });
    }
  }
  

  sendOtp() {
    // if (!this.customerPhoneNumber) {
    //   this.toastService.show('خطا در دریافت اطلاعات مشتری. ', {
    //     classname: 'bg-danger text-light',
    //   });
    //   return;
    // }
    this.sendingOTP.set(true);
    this.podService.sendOtp(false)
      .subscribe({
        next: () => {
          this.sendingOTP.set(false);
          this.hasOtpSent$.next(true);
          this.showCounter$.next(true);
        },
        error: () => {
          this.sendingOTP.set(false);

        }
      })
  }

  onCounterValueChange(value: { time: string, count: number }) {
    if (value.count <= 0) {
      this.hasOtpSent$.next(false);
      this.showCounter$.next(false);
    }
  }  

  close() {
    this.activeModal.close({submitted: false, needsToGetInquiry: false});
  }

}

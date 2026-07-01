import { AsyncPipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, input, OnDestroy, OnInit, Output, signal, ViewChild, WritableSignal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { FundListService } from '@client/core/services/fund-list.service';
import { commaSeparate, Convert, CustomerEvidenceModel, CustomerInfoModel, CustomerRequestCompositionModel, FundDetail, FundService, IdentityService, LayoutService, PaymentTypeEnum, PodService, ProfileManagementService, removeComma, RequestTypeEnum, SharedModule } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbModal, NgbNavModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UploadReceiptModalComponent } from '../../upload-receipt-modal/upload-receipt-modal.component';
import { FormsModule, UntypedFormGroup } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { BehaviorSubject, combineLatest, forkJoin, map, Subject, takeUntil } from 'rxjs';
import { ToastService } from '@client/core/services/toast.service';
import { numberToWords } from '@persian-tools/persian-tools';
import { SellConfirmComponent } from '@client/features/fund/buy-sell-fund/sell-confirm/sell-confirm.component';
import { BestLimit } from '@client/shared/rest-services/profile-management/models/nav.model';


@Component({
  selector: 'subscription-fund-content',
  standalone: true,
  templateUrl: './subscription-fund-content.component.html',
  styleUrl: './subscription-fund-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, FontAwesomeModule, NgbTooltip, RouterLink, NgClass, NgIf, NgFor, UploadReceiptModalComponent,
    DecimalPipe, NgbNavModule, NgxMaskDirective, NgxMaskPipe, FormsModule, AsyncPipe, SubscriptionFundContentComponent],
  providers: [
    DecimalPipe,
    provideNgxMask(),
  ],
})
export class SubscriptionFundContentComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() fundCode;
  @Input() fundId;

  private destroy$ = new Subject<void>();

  amount = '';
  isDirectPaymentEnabled = signal(false);
  isDirectReceiptEnabled = signal(false);
  fundDetail = signal<FundDetail>(null);
  customerEvidence = signal<CustomerEvidenceModel>(null);
  activeModal = inject(NgbActiveModal);
  requestComposition = signal<CustomerRequestCompositionModel>(null)
  requestTypeEnum = input(RequestTypeEnum.Investment);
  isConfirmedDebit = signal(false);
  isConfirmedSubscriptionRequest = signal(false);

  loadingData = signal(true);
  isErrorDebit = signal(false);

  sendingOtpPod = signal(false);
  otpDebit = '';
  otpDebitSubmitted = signal(false);
  hasOtpPodSent$ = new BehaviorSubject<boolean>(false);
  showCounterDebit$ = new BehaviorSubject<boolean>(false);
  
  customerInfo: WritableSignal<CustomerInfoModel>;
  
  disableOtpDebitButton$ = combineLatest([
    this.hasOtpPodSent$,
    this.showCounterDebit$
  ]).pipe(
    map(([hasOtpPodSent, showCounterDebit]) => hasOtpPodSent && showCounterDebit)
  );


  @ViewChild('txtValue') private txtValue: ElementRef<HTMLInputElement>;

  private getFundDetail() {
    this.loadingData.set(true);

    let filter = {
      date: new Date(),
    };

    // Subscribe to live updates from FundListService
    this.fundListService.getAllMutualFunds()
      .pipe(takeUntil(this.destroy$))
      .subscribe(funds => {
        const currentFund = funds.find(f => f.mutualFundId === this.fundId);
        if (currentFund) {
          const existingDetail = this.fundDetail();
          if (existingDetail) {
            // Update existing fundDetail with live data
            this.fundDetail.set({
              ...existingDetail,
              ...(currentFund as any).buyPrice && { buyPrice: (currentFund as any).buyPrice },
              ...(currentFund as any).sellPrice && { sellPrice: (currentFund as any).sellPrice },
              ...(currentFund as any).lastUpdated && { lastUpdated: (currentFund as any).lastUpdated }
            } as any);
          } else {
            // Set fundDetail from FundListService data
            this.fundDetail.set(currentFund as any);
            this.setDefaultPaymentGateway();
          }
        }
      });

    // Fetch additional data not available in FundListService
    forkJoin([
      this.fundService.getCustomerEvidenceByCode(this.fundCode),
      this.fundService.getCustomerRequestCompositions(filter),
    ]).subscribe({
      next: ([customerEvidence, requestComposition]) => {
        this.customerEvidence.set(customerEvidence);
        this.requestComposition.set(requestComposition.find(x => x.mutualFundCode == this.fundCode));
        this.loadingData.set(false);
      },
      error: () => {
        this.loadingData.set(false);
      }
    });

    // Fallback: if FundListService doesn't have the fund data yet
    setTimeout(() => {
      if (!this.fundDetail()) {
        this.fundService.getMutualFundDetailByCode(this.fundCode).subscribe({
          next: (mutualFundDetail) => {
            this.fundDetail.set(mutualFundDetail);
            this.setDefaultPaymentGateway();
            this.loadingData.set(false);
          },
          error: () => {
            this.loadingData.set(false);
          }
        });
      }
    }, 1000);
  }

  fundSelectedTab = input(RequestTypeEnum.Investment);

  paymentWaysList = signal([]);
  submittingForm = signal(false);
  submittingDebit = signal(false);
  submitted = signal(false);
  directDebitSubmitted = signal(false);
  otpSubmitted = signal(false);
  estimatedVolume = signal(0);
  estimatedValue = signal(0);
  bestLimit = signal(null);

  volume = '';
  otp = '';
  amountInToman = signal('');
  paymentTypeEnum = PaymentTypeEnum;

  agreement: boolean = false;
  directDebitAgreement: boolean = false;
  // selectedGateway = signal(PaymentTypeEnum.Pasargad);
  selectedGateway = signal(null);
  selectedgateWayMaxPayableAmount = signal(null);
  selectedgateWayMaxPayableAmountDirectDebit = signal(null);
  defaultGatewayCode: number | null = null;
  gatewayMaxPayableAmount: number | null = null;
  redemptionOtpMode = signal(false);
  isOtpSend$ = new BehaviorSubject<boolean>(true);
  sendingOTP = signal(false);
  count = 150;
  receiptForm: UntypedFormGroup;
  showCounter$ = new BehaviorSubject(true);
  disableOtpButton$ = combineLatest([this.isOtpSend$, this.showCounter$])
    .pipe(map(([isOtpSend, showCounter]) => isOtpSend && showCounter));

  // get visiblePaymentWaysCount(): number {
  //   return this.paymentWaysList().filter(
  //     item => !(item.code != this.paymentTypeEnum.Pasargad && +this.amount > 2000000000 && this.fundDetail()?.investType != 2)
  //   ).length;
  // }
    
  constructor(private fundService: FundService, private fundListService: FundListService, private identityService: IdentityService, private ngbModal: NgbModal,
    private toastService: ToastService, private router: Router, private layoutService: LayoutService, private podService: PodService ,private profileManagementService:ProfileManagementService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ngbModal.dismissAll();
      }

    });
    this.customerInfo = profileManagementService.customerInfo;    
  }

  ngAfterViewInit(): void {
    this.focusTxtValue();
  }

  focusTxtValue() {
    setTimeout(() => {
      this.txtValue?.nativeElement.focus();
    }, 200);
  }

  ngOnInit(): void {
    this.getFundDetail();
    this.getPaymentWays();
    this.getBestLimit();
    this.getAllBankDepositByMutualFundId();
  }


  setPaymentGateway(g) {
    this.selectedGateway.set(g.code)
    this.selectedgateWayMaxPayableAmount.set(g.maxPayableAmount)
  }

  setDefaultPaymentGateway() {
    // this.selectedGateway.set(this.fundDetail()?.mutualFundId === 2 ? PaymentTypeEnum.Pasargad : PaymentTypeEnum.Pasargad)
  }

  directDebitSubscriptionRequest(event) {
    if (this.submittingForm() || !this.fundDetail()?.isAllowSubscription || !this.requestComposition()?.subscriptionPermit) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.directDebitSubmitted.set(true);
    this.selectedGateway.set(PaymentTypeEnum.PasargadDirectDebit);
    this.subscriptionRequest(event)
  }


  // subscriptionRequest(event) {
  //   if (this.submittingForm() || !this.fundDetail()?.isAllowSubscription || !this.requestComposition()?.subscriptionPermit || this.paymentWaysList().length === 0 || !this.estimatedVolume()) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     return;
  //   }
  //   this.submitted.set(true);
  //   if (this.amount == '' || !this.agreement ||
  //     (this.selectedGateway() === PaymentTypeEnum.PasargadDirectDebit && !this.directDebitAgreement) ||
  //     this.amount < this.fundDetail()?.performance?.minPrice ||
  //     (this.selectedGateway() != PaymentTypeEnum.PasargadDirectDebit && +this.amount > 9999999999999999)
  //   ) {
  //     return;
  //   }
  //   this.checkSubscriptionStatus()
  // }
  
  confirmSubscriptionRequest(event){    
    if (this.submittingForm() || !this.fundDetail()?.isAllowSubscription || !this.requestComposition()?.subscriptionPermit || this.paymentWaysList().length === 0) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.isConfirmedSubscriptionRequest.set(true);
  }

  subscriptionRequest(event) {

    if (
      this.submittingForm() ||
      !this.fundDetail()?.isAllowSubscription ||
      !this.requestComposition()?.subscriptionPermit ||
      this.paymentWaysList().length === 0
    ) {
      event.preventDefault();
      event.stopPropagation();
      return;
    } 
    this.submitted.set(true);
  
    const amount = +this.amount;
    const investType = this.fundDetail()?.investType;
    const minPrice = this.fundDetail()?.performance?.minPrice;
    const maxGatewayAmount = this.selectedgateWayMaxPayableAmount();
  
    const isGatewayAmountExceeded = maxGatewayAmount != null && amount > maxGatewayAmount;  
    const isInvestType2LimitExceeded = investType == 2 && amount > 9999999999999999;
  
    const isInvalidAmount = !this.amount || amount < minPrice ||
      (
        this.selectedGateway() != PaymentTypeEnum.PasargadDirectDebit &&
        (
          isGatewayAmountExceeded ||
          isInvestType2LimitExceeded
        )
      );
  
    const isInvalidAgreement =
      !this.agreement ||
      (
        this.selectedGateway() === PaymentTypeEnum.PasargadDirectDebit &&
        !this.directDebitAgreement
      );
  
    if (isInvalidAmount || isInvalidAgreement) {
      return;
    } 

    this.checkSubscriptionStatus()
  }

  checkSubscriptionStatus() {
    this.submittingForm.set(true)
    //this.identityService.getSimpleSejamStatus().subscribe(sejamState => {
    this.submittingForm.set(false)
    //اگر سجامی نباشد و در این صندوق واحد نداشته باشد نمیتواند صدور بزند مرسی اه
    // if (sejamState != 6) {
    //   this.toastService.show('برای صدور در صندوق باید سجامی شوید. ', {
    //     classname: 'bg-danger text-light',
    //   })
    //   this.openUpdateSejamModal()
    //   this.close()
    // } else {
    this.openOnlinePayment()
    // اگر اطلاعاتش کامل نباشه نمیتونه صدور بزنه
    // this.fundService.checkingforupdatesejamdata().subscribe((res: any) => {
    //   this.submittingForm.set(false)
    //   if (res.result) {
    //     this.toastService.show('اطلاعات سجام ناقص است. لطفا اطلاعات خود را بروزرسانی کنید. ', {
    //       classname: 'bg-danger text-light',
    //     })
    //     this.openUpdateSejamModal()
    //     this.close()
    //   } else {
    //     this.openOnlinePayment()
    //   }
    // })
    //}
    // }, (err) => {
    //   this.submittingForm.set(false)
    // })
  }

  openOnlinePayment() {
    this.submittingForm.set(true)
    const onlineModel = {
      amount: removeComma(this.amount),
      mutualFundCode: this.fundDetail()?.seoRegisterNumber,
      gateway: this.selectedGateway()
    }
    this.fundService.onlinePayment(onlineModel)
      .subscribe(
        (next) => {
          this.submittingForm.set(false)
          this.sepRedirectToBankGateway(next.gatewayUrl)
          return next;
        },
        (error) => {      
          if (error.error.code == 1630) {
            this.openDirectDebitModal()
          }
          if (error?.error?.code == '100023') {
            this.openUpdateSejamModal()
          }
          if (error?.error?.code == 346) {
            this.openHoldersSignatureModal()
          }
          if (error?.error?.code == 1760) {
            this.sendOtpDebit();
            this.isErrorDebit.set(true);
          }
          
          this.submittingForm.set(false)
        }
      );
  }

  openUpdateSejamModal() {
    if (this.layoutService.isTabletSizeOrSmaller) {
      this.router.navigate(['/mobile/user-info'], { queryParams: { updateSejam: true, fundCode: this.fundCode } });
    } else {
      this.router.navigate(['/profile'], { queryParams: { updateSejam: true, fundCode: this.fundCode } });
    }
  }

  openHoldersSignatureModal() {
    this.router.navigate(['/profile'], { queryParams: { holdersSignature: true} });
  }

  openDirectDebitModal() {
    this.router.navigate(['/wepod'], { queryParams: { updateContract: true } });
  }

  sepRedirectToBankGateway(gatewayUrl: string) {
    window.location.href = gatewayUrl;
  }

  reSendOtp() {
    const isOtpSend = this.isOtpSend$.getValue();

    if (isOtpSend) {
      this.showCounter$.next(true);
      return;
    }
    this.sendingOTP.set(true);
    this.identityService.getRedemptionOtp()
      .subscribe((res: any) => {
        if (!res.isError) {
          this.sendingOTP.set(false);
          this.isOtpSend$.next(true);
          this.showCounter$.next(true);
        }
      }, err => {
        this.sendingOTP.set(false);

      })
  }
  private getPaymentWays() {
    this.fundService.getAllPaymentGateWays(this.fundId).subscribe((list: any[]) => {  
        this.isDirectPaymentEnabled.set(!!list.find(paymentMethod => paymentMethod.code === PaymentTypeEnum.PasargadDirectDebit));
        this.selectedgateWayMaxPayableAmountDirectDebit.set(list.find(e => e.code === PaymentTypeEnum.PasargadDirectDebit)?.maxPayableAmount);
        
        const paymentWays = list.filter(paymentMethod => paymentMethod.code != PaymentTypeEnum.PasargadDirectDebit);  
        this.paymentWaysList.set(paymentWays); 

        const defaultGateway = paymentWays.find(x => x?.isDefault);  
        this.defaultGatewayCode = defaultGateway?.code || paymentWays[0]?.code || null;
  
        this.gatewayMaxPayableAmount = defaultGateway?.maxPayableAmount || paymentWays[0]?.maxPayableAmount || null;
  
        this.selectedGateway.set(this.defaultGatewayCode);  
        this.selectedgateWayMaxPayableAmount.set(this.gatewayMaxPayableAmount);  
      });
  }
  // private getPaymentWays() {
  //   this.fundService.getAllPaymentGateWays(this.fundId).subscribe((list: []) => {
  //     this.isDirectPaymentEnabled.set(!!list.find(((paymentMethod: any) => paymentMethod.code === PaymentTypeEnum.PasargadDirectDebit)))
  //     this.paymentWaysList.set(list.filter(((paymentMethod: any) => paymentMethod.code != PaymentTypeEnum.PasargadDirectDebit)));

  //     let defaultGateway
  //     let defaultGatewayMaxPayableAmount

  //     this.paymentWaysList().find(x => {
  //       defaultGateway  = x?.isDefault?.code;
  //       defaultGatewayMaxPayableAmount  = x?.isDefault?.maxPayableAmount;
  //     })

  //     // const defaultGateway = this.paymentWaysList().find(e => e?.isDefault)?.code;
  //     this.defaultGatewayCode = defaultGateway || this.paymentWaysList()[0]?.code || null;
  //     this.gatewayMaxPayableAmount = defaultGatewayMaxPayableAmount || this.paymentWaysList()[0]?.maxPayableAmount || null;

  //     this.selectedGateway.set(this.defaultGatewayCode);
  //     this.selectedgateWayMaxPayableAmount.set(this.gatewayMaxPayableAmount);

  //   })
  // }
  onVolumeChange() {
    let units = Number(Convert.toEnglishNumber(this.volume));
    let amount = commaSeparate(units * this.fundDetail()?.performance?.lastRedemptionNav);
    this.estimatedValue.set(amount)

  }

  onValueChange() {

    // if(+this.amount > 2000000000 && this.fundDetail()?.investType !=2 && this.selectedGateway() != PaymentTypeEnum.Pasargad){
    //   this.selectedGateway.set(PaymentTypeEnum.Pasargad)
    // }      
    
    let amount = Number(Convert.toEnglishNumber(this.amount))
    let units = commaSeparate(Math.floor(amount / ((this.fundId === 2 || this.fundId === 3) ? this.bestLimit()?.buyPrice : this.fundDetail()?.performance?.lastSubscriptionNav)));
    this.estimatedVolume.set(units)
    const tomanAmount = Math.floor((amount || 0) / 10);
    const n2w = numberToWords(tomanAmount);
    if (!Number.isSafeInteger(tomanAmount)) {
      this.amountInToman.set('');
    } else {
      this.amountInToman.set(n2w.toString());
    }
  }

  onCounterValueChange(value: { time: string, count: number }) {
    if (value.count <= 0) {
      this.isOtpSend$.next(false);
      this.showCounter$.next(false);
    }
  }

  close() {
    this.activeModal.close()
  }

  openConfirmModal(paymentId) {
    const modalRef = this.ngbModal.open(SellConfirmComponent, { modalDialogClass: 'modal-holder modal-dialog-centered', size: 'md', backdrop: 'static' });
    modalRef.componentInstance.fundDetail = this.fundDetail();
    modalRef.componentInstance.paymentId = paymentId
    modalRef.componentInstance.volume = this.volume
  }

  confirmDebit(event) {
    if (this.submittingForm() || !this.fundDetail()?.isAllowSubscription || !this.requestComposition()?.subscriptionPermit || +this.amount > this.selectedgateWayMaxPayableAmountDirectDebit()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.submitted.set(true);
    if (this.amount != '' && this.agreement && this.amount >= this.fundDetail()?.performance?.minPrice) {
      // in case of disabling all gateways
      if (this.paymentWaysList().length == 0) {
        this.paymentWaysList.set([PaymentTypeEnum.PasargadDirectDebit])
      }
      this.isConfirmedDebit.set(true);
    } else {
      this.isConfirmedDebit.set(false);
    };
  }

  onNavChange(e) {
    if (e?.nextId !== 2) {
      this.isConfirmedDebit.set(false);
      if (this.defaultGatewayCode) {
        this.selectedGateway.set(this.defaultGatewayCode);
        this.selectedgateWayMaxPayableAmount.set(this.gatewayMaxPayableAmount);
      }
    }
    this.focusTxtValue();
  }


  getBestLimit() {
    // Get live updates from FundListService
    this.fundListService.getAllMutualFunds()
      .pipe(takeUntil(this.destroy$))
      .subscribe(funds => {
        const currentFund = funds.find(f => f.mutualFundId === this.fundId);
        if (currentFund && (currentFund as any).buyPrice && (currentFund as any).sellPrice) {
          this.bestLimit.set({
            buyPrice: (currentFund as any).buyPrice,
            sellPrice: (currentFund as any).sellPrice
          });
        }
      });

    // Fallback to API call if needed
    setTimeout(() => {
      if (!this.bestLimit()) {
        this.fundService.bestLimitByFundId(this.fundId)
          .subscribe({
            next: (v: BestLimit) => {
              this.bestLimit.set(v);
            }
          });
      }
    }, 1000);
  }

  getAllBankDepositByMutualFundId() {
    this.fundService.getAllBankDepositByMutualFundId(this.fundId)
      .subscribe(list => {
        this.isDirectReceiptEnabled.set(list?.length != 0);
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  sendOtpDebit() {
    if (this.sendingOtpPod() || (this.showCounterDebit$.value && this.hasOtpPodSent$.value)) {
      return;
    }
  
    this.sendingOtpPod.set(true);
    this.podService.sendOtp(false).subscribe({
      next: (res: any) => {
        this.sendingOtpPod.set(false);
        if (!res?.isError) {
          this.hasOtpPodSent$.next(true);
          this.showCounterDebit$.next(true);
        }
      },
      error: () => {
        this.sendingOtpPod.set(false);    
      }
    });
  }
  
  onCounterValueChangeDebit(value: { time: string, count: number }) {
    if (value.count <= 0) {
      this.hasOtpPodSent$.next(false);
      this.showCounterDebit$.next(false);
    }
  }
  
  verifyOtpDebit() {
    this.otpDebitSubmitted.set(true);
  
    if (!this.otpDebit) {
      this.toastService.show('لطفا کد تایید معتبر وارد کنید.', {
        classname: 'bg-warning text-dark',
      });
      return;
    }
  
    this.submittingDebit.set(true);
  
    this.podService.verifyOtp(this.otpDebit).subscribe({
      next: (res: any) => {
        this.submittingDebit.set(false);
        if (!res?.isError) {
          // this.toastService.show('کد تایید با موفقیت تأیید شد.', {
          //   classname: 'bg-success text-light',
          // });
          // this.activeModal.close();
          this.isErrorDebit.set(false);
          // this.directDebitSubscriptionRequest();
        } 
      },
      error: () => {
        this.submittingDebit.set(false);
        this.isErrorDebit.set(true);       
      }
    });
  }
}

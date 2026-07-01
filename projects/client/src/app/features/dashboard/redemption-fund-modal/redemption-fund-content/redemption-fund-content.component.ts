import { AsyncPipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, input, Input, OnDestroy, OnInit, Output, Renderer2, signal, ViewChild } from '@angular/core';
import { FormsModule, UntypedFormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { FundListService } from '@client/core/services/fund-list.service';
import { ToastService } from '@client/core/services/toast.service';
import { SellConfirmComponent } from '@client/features/fund/buy-sell-fund/sell-confirm/sell-confirm.component';
import { commaSeparate, ConfirmModalComponent, Convert, CustomerEvidenceModel, CustomerInfoModel, CustomerRequestCompositionModel, FundDetail, FundService, IdentityService, LayoutService, PaymentTypeEnum, ProfileManagementService, RequestTypeEnum, SharedModule } from '@client/shared';
import { BestLimit } from '@client/shared/rest-services/profile-management/models/nav.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbModal, NgbNavModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { BehaviorSubject, combineLatest, forkJoin, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'redemption-fund-content',
  standalone: true,
  templateUrl: './redemption-fund-content.component.html',
  styleUrl: './redemption-fund-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, FontAwesomeModule, NgClass, NgIf, NgFor, DecimalPipe,
    NgbNavModule, NgxMaskDirective, NgxMaskPipe, FormsModule, AsyncPipe,NgbPopover],

  providers: [
    DecimalPipe,
    provideNgxMask(),
  ],
})
export class RedemptionFundContentComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() fundCode;
  @Input() fundId;
  @ViewChild('txtValue') private txtValue: ElementRef<HTMLInputElement>;

  private destroy$ = new Subject<void>();
  isPopoverOpen = false;
  isInPopover = false;
  isConfirmedRedemption = signal(false);
  
  ngAfterViewInit(): void {
    this.focusTxtValue();
  }

  focusTxtValue() {
    setTimeout(() => {
      this.txtValue?.nativeElement.focus();
    }, 0);
  }


  amount;
  fundDetail = signal<FundDetail>(null);
  customerEvidence = signal<CustomerEvidenceModel>(null);
  requestComposition = signal<CustomerRequestCompositionModel>(null)
  activeModal = inject(NgbActiveModal);

  private getfundDetail() {
    let filter = {
      date: new Date(),
    };

    // subscribe to live updates from FundListService
    this.fundListService.getAllMutualFunds()
      .pipe(takeUntil(this.destroy$))
      .subscribe(funds => {
        const currentFund = funds.find(f => f.mutualFundId === this.fundId);
        if (currentFund) {
          const existingDetail = this.fundDetail();
          if (existingDetail) {
            this.fundDetail.set({
              ...existingDetail,
              ...(currentFund as any).buyPrice && { buyPrice: (currentFund as any).buyPrice },
              ...(currentFund as any).sellPrice && { sellPrice: (currentFund as any).sellPrice },
              ...(currentFund as any).lastUpdated && { lastUpdated: (currentFund as any).lastUpdated }
            } as any);
          } else {
            this.fundDetail.set(currentFund as any);
          }
        }
      });

    // Only fetch additional data that's not in FundListService
    forkJoin([
      this.fundService.getCustomerEvidenceByCode(this.fundCode),
      this.fundService.getCustomerRequestCompositions(filter),
    ]).subscribe(([customerEvidence, requestComposition]) => {
      console.log("v : ", customerEvidence);

      this.customerEvidence.set(customerEvidence);
      this.requestComposition.set(requestComposition.filter(x => x.mutualFundCode == this.fundCode)[0]);
    });

    // If FundListService doesn't have the fund yet, fallback to the original API call
    const currentFunds = this.fundListService.getAllMutualFunds();
    // Check if we need to wait for FundListService to load or use fallback
    setTimeout(() => {
      if (!this.fundDetail()) {
        this.fundService.getMutualFundDetailByCode(this.fundCode).subscribe(mutualFundDetail => {
          this.fundDetail.set(mutualFundDetail);
        });
      }
    }, 1000); // Give FundListService 1 second to load
  }


  fundSelectedTab = input(RequestTypeEnum.Investment);

  paymentWaysList = signal([]);
  submittingForm = signal(false);
  submitted = signal(false);
  otpSubmitted = signal(false);
  estimatedVolume = signal(0);
  estimatedValue = signal(0);

  @Input() modalMode = false;

  volume = '';
  otp = '';

  paymentTypeEnum = PaymentTypeEnum;
  customerInfo = signal<CustomerInfoModel>(null);
  agreement: boolean = false;
  selectedGateway = signal(PaymentTypeEnum.Saman);
  redemptionOtpMode = signal(true);
  isOtpSend$ = new BehaviorSubject<boolean>(true);
  sendingOTP = signal(false);
  count = 150;
  receiptForm: UntypedFormGroup;
  showCounter$ = new BehaviorSubject(true);
  bestLimit = signal(null);

  disableOtpButton$ = combineLatest([this.isOtpSend$, this.showCounter$])
    .pipe(map(([isOtpSend, showCounter]) => isOtpSend && showCounter))

  constructor(private rendrer: Renderer2, private fundService: FundService,
    private fundListService: FundListService,
    private profileManagementService: ProfileManagementService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private identityService: IdentityService, private router: Router, private ngbModal: NgbModal, private layoutService: LayoutService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ngbModal.dismissAll();
      }

    });

  }

  ngOnInit(): void {
    this.getfundDetail();
    this.getBestLimit();
    this.customerInfo = this.profileManagementService.customerInfo
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
  sendRedemptionOtp() {

    this.sendingOTP.set(true);
    this.identityService.getRedemptionOtp()
      .subscribe(res => {

        this.sendingOTP.set(false);
        this.isOtpSend$.next(true);
        this.showCounter$.next(true);
      }, err => {
        this.sendingOTP.set(false);

      })
  }

  openUpdateSejamModal() {
    if (this.layoutService.isTabletSizeOrSmaller) {
      this.router.navigate(['/mobile/user-info'], { queryParams: { updateSejam: true, fundCode: this.fundCode } });
    } else {
      this.router.navigate(['/profile'], { queryParams: { updateSejam: true, fundCode: this.fundCode } });
    }
  }

  checkRedemptionStatus() {
    this.submittingForm.set(true)
    // this.identityService.getSimpleSejamStatus().subscribe(sejamState => {
    this.submittingForm.set(false)
    //اگر سجامی نباشد و در این صندوق واحد نداشته باشد نمیتواند ابطال بزند مرسی اه
    // if (sejamState != 6) {
    //   this.toastService.show('برای ابطال در صندوق باید سجامی شوید. ', {
    //     classname: 'bg-danger text-light',
    //   })
    //   this.openUpdateSejamModal()
    //   this.close()
    // } else {
    this.sendRedemptionOtp()
    // اگر اطلاعاتش کامل نباشه نمیتونه ابطال بزنه
    // this.fundService.checkingforupdatesejamdata().subscribe((res: any) => {
    //   this.submittingForm.set(false)
    //   if (res.result) {
    //     this.toastService.show('اطلاعات سجام ناقص است. لطفا اطلاعات خود را بروزرسانی کنید. ', {
    //       classname: 'bg-danger text-light',
    //     })
    //     this.openUpdateSejamModal()
    //     this.close()

    //   } else {
    //     this.sendRedemptionOtp()
    //   }
    // })
    //   }
    // }, (err) => {
    //   this.submittingForm.set(false)
    // })
  }

  confirmedRedemption(event){    
    if (this.submittingForm() || !this.fundDetail()?.isAllowRedemption|| !this.requestComposition()?.redemptionPermit || !this.estimatedValue()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.isConfirmedRedemption.set(true);
  }

  redemptionRequest(event) {        
    if (this.submittingForm() || !this.fundDetail()?.isAllowRedemption || !this.requestComposition().redemptionPermit || !this.estimatedValue()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // if (this.customerInfo()?.bankAccounts.length) {
    //   this.customerInfo()?.bankAccounts.forEach(bankAccount => {
    //     if (bankAccount.isDefault && (bankAccount.bankId == 15 || bankAccount.bankId == 57)) {
    //       this.showNotification()
    //       this.close();
    //     }
    //   });
    // }

    this.submitted.set(true)
    if (this.volume == '' || !this.agreement || +this.volume > this.customerEvidence()?.voidableVolume) {
      return
    }

    if (!this.redemptionOtpMode()) {
      this.redemptionOtpMode.set(true)
      this.checkRedemptionStatus()


    } else {
      this.otpSubmitted.set(true)
      // if (this.otp == '') {
      //   return
      // }
      this.submittingForm.set(true)
      this.fundService.saveRedemptionRequest({
        entity: {
          redemptionOtp: Convert.toEnglishNumber(this.otp),
          volume: Convert.toEnglishNumber(this.volume),
          mutualFundCode: this.fundDetail()?.seoRegisterNumber
        }
      }).subscribe((res: any) => {
        this.submittingForm.set(false)
        this.close();
        this.openConfirmModal(res.result)
      }, err => {
        if (err?.error?.code == '100023') {
          this.openUpdateSejamModal()
        }
        this.submittingForm.set(false)
      })
    }
  }


  onVolumeChange() {
    let units = Number(Convert.toEnglishNumber(this.volume));
    let amount = commaSeparate(units * ((this.fundId === 2 || this.fundId === 3 || this.fundId === 4) ? this.bestLimit()?.sellPrice : this.fundDetail()?.performance?.lastRedemptionNav));
    this.estimatedValue.set(amount)

  }

  onCounterValueChange(value: { time: string, count: number }) {
    if (value.count <= 0) {
      this.isOtpSend$.next(false);
      this.showCounter$.next(false);
    }
  }

  close() {
    this.activeModal.close();
  }

  openConfirmModal(requestId) {
    const modalRef = this.ngbModal.open(SellConfirmComponent, { modalDialogClass: 'modal-holder modal-dialog-centered', size: 'md', backdrop: 'static' });
    modalRef.componentInstance.fundDetail = this.fundDetail();
    modalRef.componentInstance.requestId = requestId
    modalRef.componentInstance.volume = this.volume
  }

  getBestLimit() {
    // First try to get from FundListService
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

  showNotification() {

    const notification = {
      text: 'به دلیل وجود مشکل در حساب بانکی پیش‌فرض سجام شما، لطفا نسبت به تغییر حساب بانکی پیش‌فرض در سامانه سجام اقدام نموده و سپس از طریق بخش حساب من-اطلاعات کاربری اقدام به بروزرسانی از سجام فرمایید.',
      subject: "امکان ابطال وجود ندارد"
    }

    const modalRef = this.modalService.open(ConfirmModalComponent, { windowClass: 'confirm-modal-dialog' });
    modalRef.componentInstance.message = notification.text;
    modalRef.componentInstance.title = notification.subject;
    modalRef.componentInstance.isMessage = true;
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


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

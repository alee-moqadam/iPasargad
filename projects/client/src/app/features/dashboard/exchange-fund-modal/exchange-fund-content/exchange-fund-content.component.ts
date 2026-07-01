import { AsyncPipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, ElementRef, EventEmitter, inject, input, Input, OnDestroy, OnInit, Output, Renderer2, signal, ViewChild } from '@angular/core';
import { FormsModule, UntypedFormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { FundListService } from '@client/core/services/fund-list.service';
import { ToastService } from '@client/core/services/toast.service';
import { SellConfirmComponent } from '@client/features/fund/buy-sell-fund/sell-confirm/sell-confirm.component';
import { ExchangeConfirmComponent } from '@client/features/fund/exchange-confirm/exchange-confirm.component';
import { commaSeparate, ConfirmModalComponent, Convert, CustomerEvidenceModel, CustomerInfoModel, CustomerRequestCompositionModel, FundAttachment, FundAttachmentTypeEnum, FundDetail, FundService, IdentityService, LayoutService, MutualFundDetailsModel, PaymentTypeEnum, ProfileManagementService, RequestTypeEnum, SharedModule } from '@client/shared';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';
import { ExchangeService } from '@client/shared/rest-services/exchange';
import { BestLimit } from '@client/shared/rest-services/profile-management/models/nav.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbModal, NgbNavModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { environment } from 'projects/client/src/environments/environment';
import { BehaviorSubject, combineLatest, forkJoin, map, Observable, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'exchange-fund-content',
  standalone: true,
  templateUrl: './exchange-fund-content.component.html',
  styleUrl: './exchange-fund-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, FontAwesomeModule, NgClass, NgIf, NgFor, DecimalPipe, FontAwesomeModule,
    NgbNavModule, NgxMaskDirective, NgxMaskPipe, FormsModule, AsyncPipe, NgbPopover, NgSelectModule,SvgViewerComponent],
  providers: [
    DecimalPipe,
    provideNgxMask(),
  ],
})
export class ExchangeFundContentComponent implements OnInit, AfterViewInit, OnDestroy {


  @ViewChild('txtValue') private txtValue: ElementRef<HTMLInputElement>;
  @Input() fundCode;
  @Input() fundId;

  apiUrl: string = environment.apiUrl;
  
  destroy$ = new Subject<void>();
  isShowPermit = signal(false);
  isSubscriptionPermit = true;
  isPopoverOpen = false;
  isInPopover = false;
  reinvestPercent
  isErroMsg = false;
  percent: number = 100;

  activePercent = signal<number>(0);

  fromFundDetail = signal<FundDetail>(null);
  fromBestLimit = signal<BestLimit>(null);

  toFundDetail = signal<FundDetail>(null);
  toBestLimit = signal<BestLimit>(null);

  estimatedValue = signal<number>(0);
  estimatedBuyUnits = signal<number>(0);

  fundDetail = signal<FundDetail>(null);
  customerEvidence = signal<CustomerEvidenceModel>(null);
  requestComposition = signal<CustomerRequestCompositionModel>(null)
  activeModal = inject(NgbActiveModal);

  mutualFundList
  mutualFundListPortfo
  toFundList: any[] = [];

  submittingForm = signal(false);
  submitted = signal(false);
  otpSubmitted = signal(false);
  estimatedVolume = signal(0);
  estimatedVoidableVolume = signal(0);
  customerInfo = signal<CustomerInfoModel>(null);
  agreement: boolean = false;
  isCheckVoidableVolume: boolean = true;
  isCheckVoidableUnit: boolean = false;
  isMinPriceMsg = signal(false);
  exChangeOtpMode = signal(false);
  isOtpSend$ = new BehaviorSubject<boolean>(false);
  sendingOTP = signal(false);
  count = 150;
  receiptForm: UntypedFormGroup;
  showCounter$ = new BehaviorSubject(true);
  bestLimit = signal(null);

  otp = '';
  volume = '';
  toMutualFundId
  fromMutualFundId

  isFromRequestCompositionRedemption = signal(true);
  isToRequestCompositionSubscription = signal(true);

  disableOtpButton$ = combineLatest([this.isOtpSend$, this.showCounter$])
    .pipe(map(([isOtpSend, showCounter]) => isOtpSend && showCounter))

  amount: number = 0;
  estimatedUnits = signal<number>(0);

  activePercentComputed = computed(() => {
    if (this.estimatedVoidableVolume() <= 0) return 0;

    const currentAmount = this.amount || 0;
    const maxAmount = this.estimatedVoidableVolume();
    return Math.round((currentAmount / maxAmount) * 100);
  });

  constructor(private rendrer: Renderer2, private fundService: FundService, private exchangeService: ExchangeService,
    private fundListService: FundListService,
    private profileManagementService: ProfileManagementService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private identityService: IdentityService, private router: Router, private ngbModal: NgbModal, private layoutService: LayoutService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ngbModal.dismissAll();
      }
    });

    // effect(() => {
    //   const computedPercent = this.activePercentComputed();
    //   this.activePercent.set(computedPercent);
    // });
  }

  ngOnInit(): void {
    this.customerInfo = this.profileManagementService.customerInfo;
    // this.getRequestComposition();
    this.getAllMutualFunds();
    this.setToFundListByFromFund(this.fundId)
    this.percentChange(this.reinvestPercent)
  }

  ngAfterViewInit(): void {
    this.focusTxtValue();
  }

  // percentChange(value: number = 0) {
  //   const percent = Number(value) || 0;
  //   this.percent = percent;
  //   this.activePercent.set(percent);

  //   const max = this.customerEvidence()?.voidableVolume;
  //   const calculatedVolume = Math.floor((max * percent) / 100);

  //   this.volume = calculatedVolume.toString();
  //   this.calculateAll();
  // }

  percentChange(value: number = 0) {
    const percent = Math.min(100, Math.max(0, Number(value)));
    this.activePercent.set(percent);

    const maxAmount = this.estimatedVoidableVolume();
    this.amount = Math.round((maxAmount * percent) / 100);
    this.calculateAll();
  }

  focusTxtValue() {
    setTimeout(() => {
      this.txtValue?.nativeElement?.focus();
    }, 0);
  }

  // private getRequestComposition() {
  //   this.fundService.getCustomerRequestCompositions({ date: new Date() })
  //     .subscribe((res: any) => {
  //       this.requestComposition.set(
  //         res.find(x => x.mutualFundCode == this.fundCode)
  //       );

  //       if(!this.requestComposition()?.redemptionPermit){
  //         this.isShowPermit.set(true);
  //         this.cdr.detectChanges();
  //       }
  //     });
  // }

  private getAllMutualFunds() {

    if (this.mutualFundList?.length > 0) return;

    combineLatest([
        this.fundListService.getAllMutualFunds(),
        this.fundService.getCustomerEvidences()
    ])
    .pipe(take(1),takeUntil(this.destroy$))
    .subscribe(([funds, evidences]: [MutualFundDetailsModel[], CustomerEvidenceModel[]]) => {
  
      const merged = funds
        .map(fund => ({
          ...fund,
          customerEvidence: evidences.find(
            e => e.mutualFundCode == String(fund.seoRegisterNumber)
          )
        }))
        .filter(e => e.mutualFundId !== 4 && e.investType == 2)
      this.mutualFundList = merged;
      this.mutualFundListPortfo = merged.filter(e =>e.customerEvidence?.voidableVolume > 0) ?? [];
      this.onFromFundChange(this.fundId);
    });

    // this.fundListService.getAllMutualFunds()
    //   .pipe(take(1), takeUntil(this.destroy$))
    //   .subscribe(funds => {
    //     this.mutualFundList = funds?.filter(e => e.mutualFundId !== 4 && e.investType == 2) ?? [];
    //     this.onFromFundChange(this.fundId);
    //   });
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
          this.exChangeOtpMode.set(true);
          this.sendingOTP.set(false);
          this.isOtpSend$.next(true);
          this.showCounter$.next(true);
        }
      }, err => {
        this.sendingOTP.set(false);

      })
  }

  sendExChangeOtp() {
    this.sendingOTP.set(true);
    this.identityService.getRedemptionOtp()
      .subscribe(res => {
        this.exChangeOtpMode.set(true);
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

  checkExChangeStatus() {
    this.submittingForm.set(true)
    this.submittingForm.set(false)
    this.sendExChangeOtp()
  }

  // onVolumeChange() {

  //   if(!this.customerEvidence()?.voidableVolume){return} 

  //   this.isErroMsg = false;
  //   const units = Number(Convert.toEnglishNumber(this.volume)) || 0;
  //   const max = this.customerEvidence()?.voidableVolume;
  //   if (max > 0) {
  //     const percent = Math.floor((units / max) * 100);
  //     this.percent = percent > 100 ? 100 : percent;
  //     this.activePercent.set(this.percent);
  //   }

  //   this.calculateAll();        
  // }

  onAmountChange(value: string) {
    if (!this.estimatedVoidableVolume()) { return }
    const newAmount = Convert.toEnglishNumber(value) || 0;

    this.amount = Number(newAmount);
    this.calculateAll();

    const maxAmount = this.estimatedVoidableVolume();
    const percent = maxAmount > 0 ? Math.round((Number(newAmount) / maxAmount) * 100) : 0;
    this.activePercent.set(Math.min(100, Math.max(0, percent)));
  }

  // private getUnitPrice(): number {
  //   return [2, 3].includes(this.fromMutualFundId)
  //     ? (this.fromBestLimit()?.sellPrice ?? 0)
  //     : (this.fromFundDetail()?.performance?.lastRedemptionNav ?? 0);
  // }

  // private calculateAll() {
  //   const units = Number(Convert.toEnglishNumber(this.volume)) || 0;
  //   const max = this.customerEvidence()?.voidableVolume;

  //   const sellPrice =
  //     [2, 3].includes(this.fromMutualFundId)
  //       ? this.fromBestLimit()?.sellPrice
  //       : this.fromFundDetail()?.performance?.lastRedemptionNav;

  //   const totalValue = units * (sellPrice || 0);
  //   this.estimatedValue.set(totalValue);
  //   const totalValueVolume = max * (sellPrice || 0);
  //   this.estimatedVoidableVolume.set(totalValueVolume);

  //   const buyPrice =
  //     [2, 3].includes(this.toMutualFundId)
  //       ? this.toBestLimit()?.buyPrice
  //       : this.toFundDetail()?.performance?.lastSubscriptionNav;

  //   if (buyPrice && totalValue) {
  //     const buyUnits = Math.floor(totalValue / buyPrice);
  //     this.estimatedBuyUnits.set(buyUnits);
  //   } else {
  //     this.estimatedBuyUnits.set(0);
  //   }
  // }

  private calculateAll() {


    const amountValue = this.amount || 0;

    const sellPrice = [2, 3].includes(this.fromMutualFundId)
      ? (this.fromBestLimit()?.sellPrice ?? 0)
      : (this.fromFundDetail()?.performance?.lastRedemptionNav ?? 0);

    const units = sellPrice > 0 ? Math.round(amountValue / sellPrice) : 0;
    this.estimatedUnits.set(units);

    this.estimatedValue.set(amountValue);

    const maxUnits = this.customerEvidence()?.voidableVolume ?? 0;
    const maxAmount = maxUnits * sellPrice;

    this.estimatedVoidableVolume.set(maxAmount);

    const buyPrice = [2, 3].includes(this.toMutualFundId)
      ? (this.toBestLimit()?.buyPrice ?? 0)
      : (this.toFundDetail()?.performance?.lastSubscriptionNav ?? 0);

    if (buyPrice > 0 && amountValue > 0) {
      const buyUnits = Math.round(amountValue / buyPrice);
      this.estimatedBuyUnits.set(buyUnits);
    } else {
      this.estimatedBuyUnits.set(0);
    }
  }

  onCounterValueChange(value: { time: string, count: number }) {
    if (value.count <= 0) {
      this.isOtpSend$.next(false);
      this.showCounter$.next(false);
    }
  }

  // getBestLimit(fundId) {
  //   setTimeout(() => {
  //     if (!this.bestLimit()) {
  //       this.fundService.bestLimitByFundId(this.fundId)
  //         .subscribe({
  //           next: (v: BestLimit) => {
  //             this.bestLimit.set(v);
  //           }
  //         });
  //     }
  //   }, 1000);
  // }

  onFromFundChange(fundId: number) {
    
    if (!fundId) {
      // this.customerEvidence?.set(null);
      this.customerEvidence().gageVolume = 0;
      this.customerEvidence().voidableVolume = 0;
      this.customerEvidence().watingRedemptiomVolume = 0;
      this.estimatedVoidableVolume.set(0);
      this.estimatedUnits.set(0);
      this.estimatedBuyUnits.set(0);

      this.activePercent.set(0);
      this.percent = 0;
      this.amount = 0;
      this.isMinPriceMsg.set(false)
      return 
    }

    this.isMinPriceMsg.set(false)
    this.fromMutualFundId = fundId;
    this.toMutualFundId = this.mutualFundList.find(e => e.mutualFundId != fundId).mutualFundId;
    this.activePercent.set(0);
    this.percent = 0;
    this.amount = 0;

    this.loadFromFundData(this.fromMutualFundId);
    this.onToFundChange(this.toMutualFundId)
    // this.setToFundListByFromFund(fundId);
  }

  // private loadFromFundData(fundId: number) {

  //   const fund = this.mutualFundList.find(f => f.mutualFundId === fundId);
  //   this.fromFundDetail.set(fund as any);

  //   this.fundService.bestLimitByFundId(fundId)
  //     .subscribe(v => this.fromBestLimit.set(v));

  //   forkJoin([
  //     this.fundService.getCustomerEvidenceByCode(fund.seoRegisterNumber),
  //     this.fundService.getCustomerRequestCompositions({ date: new Date() })
  //   ]).subscribe(([evidence,composition]) => {
  //     this.customerEvidence.set(evidence);
  //     this.calculateAll();
  //     this.isFromRequestCompositionRedemption.set(
  //       composition.find(x => x.mutualFundCode == fund.seoRegisterNumber)?.redemptionPermit
  //     );
  //   });
  // }

  private loadFromFundData(fundId: number) {
    const fund = this.mutualFundList.find(f => f.mutualFundId === fundId);
    
    forkJoin({
      bestLimit: this.fundService.bestLimitByFundId(fundId),
      evidence: this.fundService.getCustomerEvidenceByCode(fund.seoRegisterNumber),
      composition: this.fundService.getCustomerRequestCompositions({ date: new Date() }),
      exchangeSettings: this.fundService.getAllFundExchangeSettings()
    }).subscribe(({ bestLimit, evidence, composition, exchangeSettings }) => {
      
      let isExchangeSetting = false;
      if (fundId === 2) {
        const setting = exchangeSettings?.find(e => e.fromFundId === 2 && e.toFundId === 3);
        isExchangeSetting = setting ? setting.isAllowed : false;
      } else if (fundId === 3) {
        const setting = exchangeSettings?.find(e => e.fromFundId === 3 && e.toFundId === 2);
        isExchangeSetting = setting ? setting.isAllowed : false;
      }
  
      this.fromFundDetail.set({
        ...fund,
        isExchangeSetting
      } as any);
  
      this.fromBestLimit.set(bestLimit);
      this.customerEvidence.set(evidence);
      this.calculateAll();
      this.isFromRequestCompositionRedemption.set(
        composition.find(x => x.mutualFundCode == fund.seoRegisterNumber)?.redemptionPermit
      );
    });
  }

  // getBadgeClass(item: any) {    
  //    return this.fromFundDetail()?.isAllowRedemption && this.fromFundDetail()?.isExchangeSetting 
  //      ? 'badge-confirm' 
  //      : 'badge-waiting';
  // }

  // getBadgeTitle(item: any) {
  //    return this.fromFundDetail()?.isAllowRedemption && this.fromFundDetail()?.isExchangeSetting 
  //      ? 'فعال' 
  //      : 'موقتا غیر فعال';
  // }

  getBadgeClass(): string {
    if (!this.isFromRequestCompositionRedemption()) {
      return 'badge-danger';
    }
  
    return this.fromFundDetail()?.isAllowRedemption &&
           this.fromFundDetail()?.isExchangeSetting
      ? 'badge-confirm'
      : 'badge-waiting';
  }
  
  getBadgeTitle(): string {
    if (!this.isFromRequestCompositionRedemption()) {
      return 'غیر فعال';
    }
  
    return this.fromFundDetail()?.isAllowRedemption &&
           this.fromFundDetail()?.isExchangeSetting
      ? 'فعال'
      : 'موقتا غیر فعال';
  }

  onRangeChange(value: string) {
    if (!this.estimatedVoidableVolume()) { return }

    const percent = Math.min(100, Math.max(0, Number(value)));
    this.activePercent.set(percent);

    const maxAmount = this.estimatedVoidableVolume();
    const newAmount = Math.round((maxAmount * percent) / 100);
    this.amount = Number(newAmount);

    this.calculateAll();
  }

  onToFundChange(fundId: number) {
    if (!fundId) { return }
    this.toMutualFundId = fundId;
    this.loadToFundData(fundId);
    // this.calculateAll();
  }

  private loadToFundData(fundId: number) {
    const fund = this.mutualFundList.find(f => f.mutualFundId === fundId);
    this.toFundDetail.set(fund as any);

    this.fundService.bestLimitByFundId(fundId)
      .subscribe(v => {
        this.toBestLimit.set(v)
        this.calculateAll();
      });

    this.fundService.getCustomerRequestCompositions({ date: new Date() })
      .subscribe(composition => this.isToRequestCompositionSubscription.set(
        composition.find(x => x.mutualFundCode == fund.seoRegisterNumber)?.subscriptionPermit
      ));
  }

  changeFunds() {

    // if (!this.fromMutualFundId || !this.toMutualFundId) return;

    // const temp = this.fromMutualFundId;
    // this.fromMutualFundId = this.toMutualFundId;
    // this.toMutualFundId = temp;

    // this.loadFromFundData(this.fromMutualFundId);
    // this.loadToFundData(this.toMutualFundId);

    // this.calculateAll();
  }

  exchangeStep() {
    
    if (this.submittingForm() || !this.fromFundDetail()?.isAllowRedemption || !this.fromFundDetail()?.isExchangeSetting || !this.toFundDetail()?.isAllowSubscription || !this.estimatedUnits() || this.amount > this.estimatedVoidableVolume() ||!this.fromMutualFundId || !this.toMutualFundId || !this.agreement) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.amount < (this.toFundDetail()?.performance?.minPrice+10000)) {this.isMinPriceMsg.set(true); return}

    this.exChangeOtpMode.set(true)
    this.checkExChangeStatus()
  }

  setToFundListByFromFund(fromId: number) {

    if (!fromId) {
      this.toFundList = [];
      return
    }

    this.toFundList = this.mutualFundList?.filter(e =>
      e.mutualFundId !== fromId &&
      e.mutualFundId !== 4 &&
      e.investType == 2
    ) ?? [];
  }

  openConfirmModal(requestId) {
    const modalRef = this.ngbModal.open(ExchangeConfirmComponent, { modalDialogClass: 'modal-holder modal-dialog-centered', size: 'md', backdrop: 'static' });
    modalRef.componentInstance.fromFundDetail = this.fromFundDetail();
    modalRef.componentInstance.toFundDetail = this.toFundDetail();
    modalRef.componentInstance.requestId = requestId;
    modalRef.componentInstance.estimatedUnits = this.estimatedUnits();
  }

  exChangeRequest(event) {

    if (this.submittingForm() || !this.fromFundDetail()?.isAllowRedemption || !this.fromFundDetail()?.isExchangeSetting || !this.toFundDetail()?.isAllowSubscription || !this.fromMutualFundId || !this.toMutualFundId || !this.agreement || !this.otp) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.submitted.set(true)
    if (!this.amount || !this.agreement) {
      return
    }

    if (!this.exChangeOtpMode()) {
      this.exChangeOtpMode.set(true)
      this.checkExChangeStatus()

    } else {
      this.otpSubmitted.set(true)
      if (this.otp == '') {
        return
      }
      this.submittingForm.set(true)
      this.exchangeService.saveExChangeRequest({
        entity: {
          volume: +this.estimatedUnits(),
          redemptionOtp: this.otp,
          fundCode: this.mutualFundList.find(e => e.mutualFundId == this.fromMutualFundId).seoRegisterNumber,
          buys: [
            {
              // percent: this.percent,
              percent: 100,
              fundCode: this.mutualFundList.find(e => e.mutualFundId == this.toMutualFundId).seoRegisterNumber
            }
          ]
        }
      }).subscribe((res: any) => {
        this.submittingForm.set(false)
        // if(!res?.isError){
        //   this.toastService.show('عملیات با موفقیت انجام شد.', {
        //     classname: 'bg-green text-light',
        //   });
        // }        
        this.close();
        this.openConfirmModal(res?.result)
      }, err => {
        if (err?.error?.code == '100023') {
          this.openUpdateSejamModal()
        }
        this.submittingForm.set(false)
      })
    }
  }

  // ****************************

  getLogofromFundDetail(mutualFund): FundAttachment {
    return mutualFund?.attachments?.find(a => a.categoryId === FundAttachmentTypeEnum.Logo);
  }

  get isMobile(): boolean {
    return this.layoutService.isTabletSizeOrSmaller;
  }

  changeTitle(value:boolean){
    if(value){return}
    this.isCheckVoidableVolume = !this.isCheckVoidableVolume;
    this.isCheckVoidableUnit = !this.isCheckVoidableUnit;
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

  close() {
    this.activeModal.close();
  }
}

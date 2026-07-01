import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { NgbActiveModal, NgbPopover, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { FundAttachment, FundAttachmentTypeEnum, FundService, MutualFundDetailsModel, CustomerEvidenceModel, CssSkeletonComponent, ProfileManagementService, LayoutService } from '@client/shared';
import { FundListService } from '@client/core/services/fund-list.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { environment } from 'projects/client/src/environments/environment';
import { ExchangeFundContentComponent } from './exchange-fund-content/exchange-fund-content.component';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrokerFinalizeInfoModel } from '@client/shared/rest-services/fund/models/broker-finalize-info';


@Component({
  selector: 'exchange-fund-modal',
  templateUrl: './exchange-fund-modal.component.html',
  styleUrls: ['./exchange-fund-modal.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, NgFor, ExchangeFundContentComponent, CommonModule,SvgViewerComponent,CssSkeletonComponent,NgbPopover,FontAwesomeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeFundModalComponent implements OnInit, OnDestroy {
  allMutualFundsList = signal<MutualFundDetailsModel[]>([]);
  selectedMutualFund = signal<MutualFundDetailsModel | null>(null);
  isMutualFundApplied = signal<boolean>(false);
  activeModal = inject(NgbActiveModal);
  @Input() fundInfo: MutualFundDetailsModel | null = null;
  customerEvidences = signal<CustomerEvidenceModel[]>([]);
  attachmentTypes = FundAttachmentTypeEnum;
  isPortfolio = true;
  apiUrl: string = environment.apiUrl;
  isLoading = signal(true);
  arrayLength = signal([...Array(2)]);
  isPopoverOpen = false;
  isInPopover = false;
  brokerFinalizeObj :BrokerFinalizeInfoModel;
  isbrokerFinalizeMoreThanFiveDays = signal<boolean>(true);
  
  private destroy$ = new Subject<void>();

  constructor(
    private fundListService: FundListService,
    private fundService: FundService,
    private profilemanagement: ProfileManagementService,
    private layoutService: LayoutService 
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading.set(true);
    combineLatest([
      this.fundListService.getAllMutualFunds(),
      this.fundService.getCustomerEvidences(),
      this.profilemanagement.getBrokerFinalizeInfo(),
      this.fundService.getAllFundExchangeSettings()
    ])
    .pipe(takeUntil(this.destroy$))
    .subscribe(([funds, evidences, brokerFinalizeInfo,allFundExchangeSettings]: [MutualFundDetailsModel[], CustomerEvidenceModel[],BrokerFinalizeInfoModel,any]) => {      
      this.customerEvidences.set(evidences);
      this.brokerFinalizeObj = brokerFinalizeInfo;
      if(brokerFinalizeInfo?.dateJalai && brokerFinalizeInfo?.finalizeStatus == 2){
        this.isbrokerFinalizeMoreThanFiveDays.set(this.isCheckFiveDays(brokerFinalizeInfo.brokerFinalizeDate));
      }
      // const merged = funds
      //   .map(fund => ({
      //     ...fund,
      //     customerEvidence: evidences.find(
      //       e => e.mutualFundCode == String(fund.seoRegisterNumber)
      //     ),
      //     brokerfinalizeinfo: brokerFinalizeInfo,
      //     allFundExchangeSettings: allFundExchangeSettings.filter(e => e.fromFundId === String(fund.mutualFundId)),
      //   }))
      //   .filter(fund =>
      //     fund.mutualFundId === 2 || fund.mutualFundId === 3
      //   );
      const merged = funds
      .map(fund => {
        const customerEvidence = evidences.find(
          e => e.mutualFundCode == String(fund.seoRegisterNumber)
        );
        
        let isExchangeSetting = null;
        if (fund.mutualFundId === 2) {
          const setting = allFundExchangeSettings.find(
            e => e.fromFundId === 2 && e.toFundId === 3
          );
          isExchangeSetting = setting ? setting.isAllowed : null;
        } else if (fund.mutualFundId === 3) {
          const setting = allFundExchangeSettings.find(
            e => e.fromFundId === 3 && e.toFundId === 2
          );
          isExchangeSetting = setting ? setting.isAllowed : null;
        }
    
        return {
          ...fund,
          customerEvidence,
          brokerfinalizeinfo: brokerFinalizeInfo,
          isExchangeSetting
        };
      })
      .filter(fund => fund.mutualFundId === 2 || fund.mutualFundId === 3);
      
      const array = merged.filter(e =>e.customerEvidence.voidableVolume > 0);
  
      if(array.length == 0){
        this.allMutualFundsList.set(merged); 
        this.isPortfolio = false;
      }else{
        this.allMutualFundsList.set(merged.filter(e =>e.customerEvidence.voidableVolume > 0)); 
        this.isPortfolio = true;
      }

      
      if(this.allMutualFundsList().length == 0){
        this.isPortfolio = false;
      }
      this.isLoading.set(false);
    });
  }

  getBadgeClass(item: any) {
     return item?.isAllowRedemption && item?.isExchangeSetting 
       ? 'badge-confirm' 
       : 'badge-waiting';
  }

  getBadgeTitle(item: any) {
     return item?.isAllowRedemption && item?.isExchangeSetting 
       ? 'فعال' 
       : 'موقتا غیر فعال';
  }
  
  getCurrentStep(): number {
    const status = this.brokerFinalizeObj?.finalizeStatus ?? 0;
    return status + 1;
  }
  
  getStatusText(): string {
    return this.brokerFinalizeObj?.brokerFinalize != false
      ? (this.brokerFinalizeObj?.brokerFinalize &&
         this.brokerFinalizeObj?.finalizeStatus == 2
          ? 'تایید شده'
          : 'در حال بررسی')
      : 'در حال بررسی';
  }
  
  getStepClass(step: number): any {
    const status = this.brokerFinalizeObj?.finalizeStatus ?? 0;
    return {
      done: step <= status + 1,
      active: step === status + 2,
      pending: step > status + 2
    };
  }
  
  getExtraStepClass(): any {
    const status = this.brokerFinalizeObj?.finalizeStatus ?? 0;  
    return {
      'done-extra': status >= 1,
      'pending': status < 1
    };
  }

  isCheckFiveDays(dateStr: string): boolean {
    if (!dateStr) return false;
  
    const inputDate = new Date(dateStr);
    const now = new Date();
  
    const calculatedTime = now.getTime() - inputDate.getTime();
    const days = calculatedTime / (1000 * 60 * 60 * 24);
    
    return days < 5;
  }

  selectMutualFund(mutualFundInfo: MutualFundDetailsModel) {
    this.selectedMutualFund.set(mutualFundInfo);
    this.applyMutualFund();
  }

  applyMutualFund() {
    this.isMutualFundApplied.set(true);
  }

  displayModalHeader(): string {
    if (!this.fundInfo) {
      if (!this.isMutualFundApplied()) {
        return 'درخواست تبدیل صندوق';
      }
      // return 'درخواست برای مبادله صندوق' + ' ' + this.selectedMutualFund()?.symbol;
      return 'درخواست برای تبدیل صندوق';
    }
    return ' درخواست برای تبدیل صندوق' + ' ' + this.fundInfo?.symbol;
  }

  getAttachment(fund: MutualFundDetailsModel, attachmentType: FundAttachmentTypeEnum): FundAttachment | undefined {
    return fund?.attachments?.find(a => a.categoryId === attachmentType);
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

  backToStep(){
    this.selectedMutualFund.set(null);
    this.isMutualFundApplied.set(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  close() {
    this.activeModal.close();
  }

}

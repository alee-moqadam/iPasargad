import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal } from '@angular/core';
import { SubscriptionFundContentComponent } from './subscription-fund-content/subscription-fund-content.component';
import { NgbActiveModal, NgbPopover, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { FundListService } from '@client/core/services/fund-list.service';
import { CssSkeletonComponent, CustomerRequestCompositionModel, FundAttachment, FundAttachmentTypeEnum, FundService, LayoutService, MutualFundDetailsModel, ProfileManagementService } from '@client/shared';
import { combineLatest } from 'rxjs';
import { BrokerFinalizeInfoModel } from '@client/shared/rest-services/fund/models/broker-finalize-info';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';
import { environment } from 'projects/client/src/environments/environment';

@Component({
  selector: 'subscription-fund-modal',
  templateUrl: './subscription-fund-modal.component.html',
  styleUrls: ['./subscription-fund-modal.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, NgFor,NgbTooltip,NgbPopover,FontAwesomeModule,
    SubscriptionFundContentComponent,CssSkeletonComponent,SvgViewerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SubscriptionFundModalComponent implements OnInit {
  allMutualFundsList = signal<MutualFundDetailsModel[]>([]);
  selectedMutualFund = signal<MutualFundDetailsModel | null>(null);
  isMutualFundApplied = signal<boolean>(false);
  activeModal = inject(NgbActiveModal);
  @Input() fundInfo: MutualFundDetailsModel | null = null;
  requestComposition = signal<CustomerRequestCompositionModel[]>([]);
  attachmentTypes = FundAttachmentTypeEnum;
    apiUrl: string = environment.apiUrl;
  
  isLoading = signal(true);
  arrayLength = signal([...Array(4)]);

  isPopoverOpen = false;
  isInPopover = false;

  constructor(
    private fundListService: FundListService,
    private fundService: FundService,
    private profilemanagement: ProfileManagementService,
    private layoutService: LayoutService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading.set(true);
    combineLatest([
      this.fundListService.getAllMutualFunds(),
      this.fundService.getCustomerRequestCompositions({ date: new Date() }),
      this.profilemanagement.getBrokerFinalizeInfo()
    ]).subscribe(([funds, compositions,brokerfinalizeinfo]: [MutualFundDetailsModel[], CustomerRequestCompositionModel[] ,BrokerFinalizeInfoModel]) => {

      this.requestComposition.set(compositions);
      const merged = funds.map(fund => ({
        ...fund,
        requestComposition: compositions.find(c => c.mutualFundId === fund.mutualFundId),
        brokerfinalizeinfo: brokerfinalizeinfo,
      }));
      this.allMutualFundsList.set(merged);      
      this.isLoading.set(false);
    });
  }
  selectMutualFund(mutualFundInfo) {
    this.selectedMutualFund.set(mutualFundInfo);
    if (!mutualFundInfo?.isAllowSubscription || !mutualFundInfo?.requestComposition?.subscriptionPermit) return;
    this.applyMutualFund();
  }

  applyMutualFund() {
    this.isMutualFundApplied.set(true);
  }
  close() {
    this.activeModal.close();
  }

  displayModalHeader(): string {
    if (!this.fundInfo) {
      if (!this.isMutualFundApplied()) {
        return ' انتخاب صندوق';
      }
      return ' درخواست برای صدور صندوق' + ' ' + this.selectedMutualFund()?.symbol;
    }
    return ' درخواست برای صدور صندوق' + ' ' + this.fundInfo?.symbol;
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
}

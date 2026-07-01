import { DecimalPipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbAccordionModule, NgbCollapseModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, of, Subject, take, takeUntil, filter } from 'rxjs';
import { AssetChartComponent } from '../dashboard/asset-chart/asset-chart.component';
import { CompositionChartComponent } from "./composition-chart/composition-chart.component";
import { HistoricalNAVComponent } from "./historical-nav/historical-nav.component";
import { IndustryChartComponent } from './industry-chart/industry-chart.component';
import { SubscriptionFundModalComponent } from '../dashboard/subscription-fund-modal/subscription-fund-modal.component';
import { RedemptionFundModalComponent } from '../dashboard/redemption-fund-modal/redemption-fund-modal.component';
import { FundService, FundInfoService, CheckCustomerStepService, LayoutService } from '@client/shared';
import { FundListService } from '@client/core/services/fund-list.service';
import { ToastService } from '@client/core/services/toast.service';

@Component({
  selector: 'app-fund',
  standalone: true,
  imports: [
    HistoricalNAVComponent, CompositionChartComponent, AssetChartComponent,
    IndustryChartComponent, FontAwesomeModule, NgClass, NgIf, DecimalPipe,
    NgbCollapseModule, NgbAccordionModule, RouterOutlet, RouterLink, RouterLinkActive
  ],
  templateUrl: './fund.component.html',
  styleUrl: './fund.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FundComponent implements OnInit, OnDestroy {
  headerHeigh = 70;
  fundCode;
  fundDetail = signal({});
  fund_nav_detail = signal({});
  fund_performance = signal({});
  customerEvidence = signal({});
  fundComposition = signal({} as any);
  isCollapsed = false;
  fundInfo = signal(null);

  private destroy$ = new Subject<void>();
  private baseData: any;
  private attachmentsLoading = false;
  private compositionsByCode: Record<number, any> = {};

  constructor(
    private fundService: FundService,
    private route: ActivatedRoute,
    private ngbModal: NgbModal,
    private fundInfoService: FundInfoService,
    private checkCustomerStepService: CheckCustomerStepService,
    private router: Router,
    private fundListService: FundListService,
    private layoutService: LayoutService,
    private toastService: ToastService
  ) {
    this.fundCode = this.route.snapshot.paramMap.get('fundCode');
  }

  ngOnInit(): void {
    this.fundService.getCustomerRequestCompositions({ date: new Date() })
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(list => {
        this.compositionsByCode = (list || []).reduce((acc, c) => {
          acc[c.mutualFundCode] = c;
          return acc;
        }, {} as Record<number, any>);
      });

    this.fundListService.getAllMutualFunds()
      .pipe(
        filter(funds => Array.isArray(funds) && funds.length > 0),
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(allFunds => {
        const mutualFundDetail = allFunds.find(fund => fund.seoRegisterNumber === this.fundCode) || null;
        this.getFundDetail(mutualFundDetail);
      });
  }

  private getFundDetail(mutualFundDetail: any) {
    if (!mutualFundDetail) return;

    const sameFund = this.baseData?.mutualFundDetail?.mutualFundId === mutualFundDetail.mutualFundId;
    const baseHasAttachments = !!this.baseData?.mutualFundDetail?.attachments?.length;
    const incomingHasAttachments = !!mutualFundDetail.attachments?.length;

    if (sameFund) {
      if (!baseHasAttachments && !incomingHasAttachments) this.fetchAttachments(mutualFundDetail.mutualFundId);
      return;
    }

    forkJoin([
      of(mutualFundDetail),
      this.fundService.getLastNav(this.fundCode),
      this.fundService.getFundPerformance(this.fundCode),
      this.fundService.getCustomerEvidenceByCode(this.fundCode),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([fundBase, lastNav, fundPerformance, customerEvidence]) => {
          const composition = this.compositionsByCode[+this.fundCode];
          this.baseData = {
            mutualFundDetail: fundBase, 
            lastNav,
            fundPerformance,
            customerEvidence,
            fundComposition: composition,
            fundCode: this.fundCode
          };
          this.publishFundInfo();
          if (!incomingHasAttachments) this.fetchAttachments(fundBase.mutualFundId);
          if (fundBase?.investType == 2) this.subscribeToBestLimit(fundBase.mutualFundId);
        }
      });
  }

  private fetchAttachments(mutualFundId: number) {
    if (this.attachmentsLoading) return;
    this.attachmentsLoading = true;
    this.fundService.getNewFundAttachments(mutualFundId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          const attachments = res?.result ?? [];
          if (this.baseData?.mutualFundDetail?.mutualFundId === mutualFundId) {
            this.baseData = {
              ...this.baseData,
              mutualFundDetail: { ...this.baseData.mutualFundDetail, attachments }
            };
            this.publishFundInfo();
          }
        },
        complete: () => { this.attachmentsLoading = false; },
        error: () => { this.attachmentsLoading = false; }
      });
  }

  private publishFundInfo() {
    if (!this.baseData) return;
    this.fundInfo.set(this.baseData.mutualFundDetail);
    this.fundComposition.set(this.baseData.fundComposition || {});
    this.fundInfoService.setFundInfoData(this.baseData);
  }

  private subscribeToBestLimit(mutualFundId: number) {
    this.fundService.bestLimitByFundId(mutualFundId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(limit => {
        if (!this.baseData) return;
        const mutualFundDetail = {
          ...this.baseData.mutualFundDetail,
          buyPrice: limit?.buyPrice,
          sellPrice: limit?.sellPrice
        };
        this.baseData = { ...this.baseData, mutualFundDetail };
        this.publishFundInfo();
      });
  }

  openSubscriptionModal() {
    if (this.checkCustomerStepService.getCustomerStep()) {
      this.router.navigateByUrl('/').then(() => {
        if (this.layoutService.isTabletSizeOrSmaller) {
          this.router.navigate(['/mobile/user-info'], { queryParams: { updateSejam: true, fundCode: this.fundCode } });
        } else {
          this.router.navigate(['/profile'], { queryParams: { updateSejam: true, fundCode: this.fundCode } });
        }
      });
    } else {
      if (!this.fundComposition()?.subscriptionPermit || !this.fundInfo()?.isAllowSubscription) {
        this.toastService.show('در حال حاضر صندوق غیر فعال می‌باشد', { classname: 'bg-danger text-light' })
      } else {
        const modalRef = this.ngbModal.open(SubscriptionFundModalComponent, { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', backdrop: 'static' });
        modalRef.componentInstance.fundInfo = this.fundInfo();
      }
    }
  }

  openRedemptionModal() {
    if (this.checkCustomerStepService.getCustomerStep()) {
      this.router.navigateByUrl('/').then(() => {
        if (this.layoutService.isTabletSizeOrSmaller) {
          this.router.navigate(['/mobile/user-info'], { queryParams: { updateSejam: true, fundCode: this.fundCode } });
        } else {
          this.router.navigate(['/profile'], { queryParams: { updateSejam: true, fundCode: this.fundCode } });
        }
      });
    } else {
      if (!this.fundComposition()?.redemptionPermit || !this.fundInfo()?.isAllowRedemption) {
        this.toastService.show('در حال حاضر صندوق غیر فعال می‌باشد', { classname: 'bg-danger text-light' })
      } else {
        const modalRef = this.ngbModal.open(RedemptionFundModalComponent, { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', backdrop: 'static' });
        modalRef.componentInstance.fundInfo = this.fundInfo();
      }
    }
  }

  ngOnDestroy(): void {
    this.fundInfoService.setFundInfoData(null);
    this.destroy$.next();
    this.destroy$.complete();
  }
}

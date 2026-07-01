import { NgClass, NgIf, DecimalPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { AssetChartComponent } from '@client/features/dashboard/asset-chart/asset-chart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCollapseModule, NgbAccordionModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompositionChartComponent } from '../composition-chart/composition-chart.component';
import { HistoricalNAVComponent } from '../historical-nav/historical-nav.component';
import { IndustryChartComponent } from '../industry-chart/industry-chart.component';
import { FundInfoService, FundService, MaskNumberDirective, MaskNumberPipe, toPersianDate, ProfileManagementService, CheckCustomerStepService, FundAttachment, FundAttachmentTypeEnum } from '@client/shared';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from "highcharts";
import { PortfolioAssetChartComponent } from '@client/features/portfolio/asset-chart/portfolio-asset-chart.component';
import { AssetPortfolioChartComponent } from '@client/features/portfolio/asset-portfolio-chart/asset-portfolio-chart.component';
import { ReinvestPercentModalComponent } from '@client/shared/components/reinvest-percent-modal/reinvest-percent-modal.component';
import { Subject, takeUntil } from 'rxjs';
import { FundListService } from '@client/core/services/fund-list.service';
import { GlobalEventService } from '@client/core/services/global-event.service';
import { environment } from 'projects/client/src/environments/environment';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';
@Component({
  selector: 'app-user-funds',
  standalone: true,
  imports: [HistoricalNAVComponent, CompositionChartComponent, AssetChartComponent, RouterLink,
    IndustryChartComponent, FontAwesomeModule, NgClass, NgIf, DecimalPipe, NgbCollapseModule, NgbAccordionModule, CommonModule, MaskNumberDirective,
    HighchartsChartModule,
    PortfolioAssetChartComponent,
    AssetPortfolioChartComponent,
    SvgViewerComponent
  ],
  templateUrl: './user-funds.component.html',
  styleUrl: './user-funds.component.scss',
  providers: [DecimalPipe, MaskNumberPipe],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class UserFundsComponent implements OnInit, OnDestroy {
  apiUrl: string = environment.apiUrl;
  fundInfo = signal({});
  fundCode;
  bestLimit = signal<any>(null);
  // waitingRequests = signal([]);
  series;
  chartOptions;
  dateList;
  assetList;
  remainList;
  divisionList;
  subscriptionVolumeList;
  redemptionVolumeList;
  AdivisionList;
  AsubscriptionAmountList;
  AredemptionAmountList;
  fromFirstBuy = false;
  highcharts = Highcharts;
  isDestroy = signal(false);
  isCollapsed = false;
  private destroy$ = new Subject<void>();

  toDate = {
    year: Number(toPersianDate(new Date()).split('/')[0]),
    month: Number(toPersianDate(new Date()).split('/')[1]),
    day: Number(toPersianDate(new Date()).split('/')[2])
  };

  constructor(
    private fundInfoService: FundInfoService,
    private route: ActivatedRoute,
    private fundService: FundService,
    private fundListService: FundListService,
    private cdr:ChangeDetectorRef,
    private ngbModal: NgbModal,
    public checkCustomerStepService : CheckCustomerStepService,
    private globalEventService: GlobalEventService
  ) {
    this.fundCode = this.route.snapshot.paramMap.get('fundCode');
  }

  ngOnInit(): void {
    this.fundInfoService.getFundInfoData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data && data.mutualFundDetail) {
          this.fundInfo.set(data);
          this.subscribeToBestLimitUpdates(data.mutualFundDetail.mutualFundId);
        }
      })

    this.globalEventService.onReceiptConfirmationClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.refreshFundInfo();
      });
  }

  subscribeToBestLimitUpdates(fundId: number) {
    // Subscribe to live updates from FundListService
    this.fundListService.getAllMutualFunds()
      .pipe(takeUntil(this.destroy$))
      .subscribe(funds => {
        const currentFund = funds.find(f => f.mutualFundId === fundId);
        if (currentFund && (currentFund as any).buyPrice && (currentFund as any).sellPrice) {
          this.bestLimit.set({
            buyPrice: (currentFund as any).buyPrice,
            sellPrice: (currentFund as any).sellPrice,
            lastUpdated: (currentFund as any).lastUpdated
          });
          this.cdr.markForCheck();
        }
      });

    // Fallback: Get initial bestLimit if not available from FundListService
    setTimeout(() => {
      if (!this.bestLimit()) {
        this.fundService.bestLimitByFundId(fundId)
          .subscribe({
            next: (v: any) => {
              this.bestLimit.set(v);
              this.cdr.markForCheck();
            }
          });
      }
    }, 1000);
  }

  openReinvestPercentModal(mutualFundDetail,$event) {
    $event.preventDefault()
    const modalRef = this.ngbModal.open(ReinvestPercentModalComponent,
      { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', backdrop: 'static' });
    modalRef.componentInstance.mutualFundId = mutualFundDetail?.mutualFundDetail?.mutualFundId;
    modalRef.componentInstance.reinvestPercent = mutualFundDetail?.customerEvidence?.reinvest;
    modalRef.result.then((result:{activePercent : number , action : number}) => {
      if(result?.action !== 2){        
        this.fundInfo.update((mutualFundDetail: any) => {
          mutualFundDetail.customerEvidence.reinvest = result?.activePercent
          return mutualFundDetail
        })
      }else return;
      this.cdr.detectChanges()
    })
  }

  getLogo(): FundAttachment {
    return (this.fundInfo() as any)?.mutualFundDetail?.attachments?.find(a => a.categoryId === FundAttachmentTypeEnum.Logo);
  }

  private refreshFundInfo(): void {
    this.fundInfoService.getFundInfoData()
      .subscribe((data) => {
        if (data) {
          this.fundInfo.set(data);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

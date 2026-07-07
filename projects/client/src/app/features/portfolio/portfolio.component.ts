import { CommonModule, DecimalPipe } from '@angular/common';
import { RequestTypeEnum, FundService, MaskingNumberService, MaskNumberDirective, MaskNumberPipe, CustomerRequestAllocation, ProfileManagementService, NgbDateToStringGregorian, toPersianDate, ExportService, CheckCustomerStepService, FundAttachmentTypeEnum, FundAttachment, LayoutService } from '@client/shared';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCalendar, NgbCarouselModule, NgbModal, NgbPopover, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import More from 'highcharts/highcharts-more';
import Tree from 'highcharts/modules/treemap';
import { filter, Subject, takeUntil, tap, combineLatest, map } from 'rxjs';
import { SubscriptionFundModalComponent } from '../dashboard/subscription-fund-modal/subscription-fund-modal.component';
import { FundItemComponent } from '../fund/fund-list/fund-item/fund-item.component';
import { PortfolioAssetChartComponent } from './asset-chart/portfolio-asset-chart.component';
import { Router, RouterLink } from '@angular/router';
import { ConsultingGuideComponent } from '../dashboard/consulting-guide/consulting-guide.component';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { DatasetComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { LineChart, PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import moment from 'jalali-moment';
import { FormsModule } from '@angular/forms';
import { RedemptionFundModalComponent } from '../dashboard/redemption-fund-modal/redemption-fund-modal.component';
import { ToastService } from '@client/core/services/toast.service';
import { PortfolioDetailModalComponent } from './portfolio-detail-modal/portfolio-detail-modal.component';
import { ReinvestPercentModalComponent } from '@client/shared/components/reinvest-percent-modal/reinvest-percent-modal.component';
import { UserSettingsService } from '@client/core/services/user-settings.service';
import { SettingKeys } from '@client/shared/models/user-settings.model';
import { FundListService } from '@client/core/services/fund-list.service';
import { GlobalEventService } from '@client/core/services/global-event.service';
import { environment } from 'projects/client/src/environments/environment';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';
import { ProfitOrLossModel } from '@client/shared/rest-services/fund/models/profit-or-loss.model';


echarts.use([TitleComponent, TooltipComponent, GridComponent, DatasetComponent, PieChart, CanvasRenderer, LegendComponent, LineChart])

More(Highcharts);
Tree(Highcharts);
@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink, FundItemComponent,NgbPopover,SvgViewerComponent,
    HighchartsChartModule, MaskNumberDirective, PortfolioAssetChartComponent, ConsultingGuideComponent, NgxEchartsDirective, FormsModule, NgbCarouselModule ,NgbTooltip],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe, MaskNumberPipe, provideEchartsCore({ echarts })]
})
export class PortfolioComponent implements OnInit, OnDestroy {
  readonly useMockViewData = true; // UI preview only. Turn off before production handoff.

  // UI preview mock data only. Do not use for production logic.
  readonly mockPortfolioHoldings = [
    {
      mutualFundId: 1,
      seoRegisterNumber: 11168,
      symbol: 'هزاره سوم',
      title: 'صندوق درآمد ثابت صدور و ابطالی هزاره سوم پاد',
      fundTypeTitle: 'درآمد ثابت - صدور و ابطالی',
      fundType: 2,
      investType: 1,
      fixedIncomeFundType: 1,
      reinvest: 1,
      isAllowSubscription: true,
      isAllowRedemption: true,
      performance: { yearlyPercent: 27.8, lastUpdateDateJalali: '۱۴۰۵/۰۴/۱۶' },
      customerRequestCompositions: {
        mutualFundId: 1,
        mutualFundCode: 11168,
        symbol: 'هزاره سوم',
        fundType: 2,
        fundTypeTitle: 'درآمد ثابت',
        netValue: 245000000,
        remainVolume: 240,
        percent: 44,
        subscriptionPermit: true,
        redemptionPermit: true,
        reinvest: 30,
        profitOrLoss: 8600000,
        profitOrLossPercent: 3.62
      },
      customerEvidences: {
        mutualFundCode: 11168,
        reinvest: 30,
        watingSubscriptionAmount: 12000000,
        watingRedemptiomVolume: 0
      }
    },
    {
      mutualFundId: 2,
      seoRegisterNumber: 11355,
      symbol: 'پاسارگاد',
      title: 'صندوق درآمد ثابت قابل معامله پاسارگاد',
      fundTypeTitle: 'درآمد ثابت - قابل معامله',
      fundType: 2,
      investType: 2,
      isAllowSubscription: true,
      isAllowRedemption: true,
      performance: { effectiveYearlyPercent: 27.1, lastUpdateDateJalali: '۱۴۰۵/۰۴/۱۶' },
      customerRequestCompositions: {
        mutualFundId: 2,
        mutualFundCode: 11355,
        symbol: 'پاسارگاد',
        fundType: 2,
        fundTypeTitle: 'درآمد ثابت',
        netValue: 128500000,
        remainVolume: 126,
        percent: 23,
        subscriptionPermit: true,
        redemptionPermit: true,
        profitOrLoss: 2100000,
        profitOrLossPercent: 1.66
      },
      customerEvidences: {
        mutualFundCode: 11355,
        watingSubscriptionAmount: 0,
        watingRedemptiomVolume: 14
      }
    },
    {
      mutualFundId: 3,
      seoRegisterNumber: 11421,
      symbol: 'ریتون',
      title: 'صندوق طلای قابل معامله چندکالایی پاسارگاد',
      fundTypeTitle: 'طلا - قابل معامله',
      fundType: 5,
      investType: 2,
      isAllowSubscription: true,
      isAllowRedemption: true,
      performance: { yearlyPercent: 34.2, lastUpdateDateJalali: '۱۴۰۵/۰۴/۱۶' },
      customerRequestCompositions: {
        mutualFundId: 3,
        mutualFundCode: 11421,
        symbol: 'ریتون',
        fundType: 5,
        fundTypeTitle: 'طلا',
        netValue: 103000000,
        remainVolume: 52,
        percent: 18,
        subscriptionPermit: true,
        redemptionPermit: true,
        profitOrLoss: -1450000,
        profitOrLossPercent: -1.39
      },
      customerEvidences: {
        mutualFundCode: 11421,
        watingSubscriptionAmount: 8000000,
        watingRedemptiomVolume: 0
      }
    },
    {
      mutualFundId: 4,
      seoRegisterNumber: 11509,
      symbol: 'تکپاد',
      title: 'صندوق سهامی قابل معامله ارزش پرداز آریان',
      fundTypeTitle: 'سهامی - قابل معامله',
      fundType: 1,
      investType: 2,
      isAllowSubscription: true,
      isAllowRedemption: true,
      performance: { yearlyPercent: 41.7, lastUpdateDateJalali: '۱۴۰۵/۰۴/۱۶' },
      customerRequestCompositions: {
        mutualFundId: 4,
        mutualFundCode: 11509,
        symbol: 'تکپاد',
        fundType: 1,
        fundTypeTitle: 'سهامی',
        netValue: 84500000,
        remainVolume: 39,
        percent: 15,
        subscriptionPermit: true,
        redemptionPermit: true,
        profitOrLoss: 5600000,
        profitOrLossPercent: 7.1
      },
      customerEvidences: {
        mutualFundCode: 11509,
        watingSubscriptionAmount: 0,
        watingRedemptiomVolume: 0
      }
    }
  ];

  apiUrl: string = environment.apiUrl;
  Math = Math;
  showChart = signal(false)
  isMasked = computed(() => {
    const _mask = this.maskingService.getMaskedState();
    return _mask
  });
  requestTypeEnum = RequestTypeEnum;
  totalNetValue = signal<number>(null);
  portfolioData = signal(null);
  waitingRequests = signal(null);
  requestAllocation = signal<CustomerRequestAllocation[]>([])
  customerEvidences = signal(null);
  loading = signal(false);
  disablePdfBtn = signal(false);
  dividend = signal(0);
  customerRequestCompositions = [];
  reinvest = false;
  Highcharts: typeof Highcharts = Highcharts;
  threeYearsAgo = null
  nextWeek = null;
  chartOptions: any;
  chartColors: [
    '#9E48C8',
    '#3dc3e8',
    '#2dd9db',
    '#1feeaf',
    '#0ff3a0',
    '#00e887',
    '#23e274'
  ]
  fixedIncomeNetValue = computed(() => {
    const customerRequestCompositions = this.getDisplayCompositions();
    return customerRequestCompositions
      .filter(c => c?.fundType !== 5 && c?.fundType !== 1)
      .reduce((acc, current) => acc + (current.netValue || 0), 0);
  });
  goldNetValue = computed(() => {
    const customerRequestCompositions = this.getDisplayCompositions();
    return customerRequestCompositions
      .filter(c => c?.fundType === 5)
      .reduce((acc, current) => acc + (current.netValue || 0), 0);
  });
  stockNetValue = computed(() => {
    const customerRequestCompositions = this.getDisplayCompositions();
    return customerRequestCompositions
      .filter(c => c?.fundType === 1)
      .reduce((acc, current) => acc + (current.netValue || 0), 0);
  });
  treeMapChartOption = computed(() => {
    const _self = this;
    this.customerRequestCompositions = this.getDisplayCompositions();
    const allFunds = this.getDisplayHoldings();
    return {
      plotOptions: {
        series: {
          // dataLabels: {
          //   overflow: 'allow',
          //   align: 'center',
          //   className: 'text-center',
          //   useHTML: true,
          //   formatter: function () {
          //     const { point } = this as any;
          //     const textColor = point.textColor || '#fff';
          //     return `\n            <div class="text-center" style="color:${textColor}">\n              <div>${point.name}</div>\n              <div>${+point['percent'].toFixed(2)}%</div>\n            </div>\n          `;
          //   }
          // }

          dataLabels: {
            allowOverlap: true,
            crop: false,
            overflow: 'allow',
            useHTML: true,
            formatter: function () {
              const point = this.point as any;
              const textColor = point.textColor || '#fff';
          
              // const percent = `${point.y}%`;
              const percent = `${point.percent.toFixed(1)}%`;
          
              const width = point.shapeArgs?.width || 0;
          
              if (width < 25) {
                return `
                  <div style="color:${textColor}; font-size:10px; text-align:center">
                    ${percent}
                  </div>
                `;
              }
          
              // اسم کوتاه‌شده + درصد
              if (width < 50) {
                const shortName =
                  point.name.length > 2
                    ?  '...' + point.name.slice(0, 2)
                    : point.name;
          
                return `
                  <div style="color:${textColor}; font-size:10px; line-height:1.1; text-align:center">
                    <div>${shortName}</div>
                    <div>${percent}</div>
                  </div>
                `;
              }
          
              // اسم کامل + درصد
              return `
                <div style="color:${textColor}; font-size:11px; line-height:1.2; text-align:center">
                  <div>${point.name}</div>
                  <div>${percent}</div>
                </div>
              `;
            }
          }
        }
      },
      chart: {
        margin: 0,
        style: { fontFamily: _self.fontFamily(), padding: '0px' },
        type: 'treemap',
        backgroundColor: 'transparent',
        height: '200px',
      },
      title: { text: '' },
      tooltip: {
        useHTML: true,
        formatter: function () {
          const { point } = this as any;
          const isMasked = _self.maskingService.getMaskedState();
          return `\n            <div class="text-center text-dark">\n              <div>${point.name}</div>\n              <div>${+point['percent'].toFixed(2)}%</div>\n              <div>${_self.maskNumberPipe.transform(point.x, isMasked)}</div>\n            </div>\n          `;
        }
      },
      series: [
        {
          type: 'treemap',
          data: _self.customerRequestCompositions.map(d => {
            const fundId = d.mutualFundId || allFunds.find(f => f.seoRegisterNumber === d.mutualFundCode)?.mutualFundId;
            const color = _self.getFundColor(fundId);
            return {
              color,
              value: d.netValue,
              name: d.symbol,
              x: d.netValue,
              percent: d.percent,
              textColor: '#ffffff'
            };
          }),
        },
      ],
    }
  });
  ngUnsubscribe$ = new Subject;
  fontFamily = signal('');

  highcharts = Highcharts;
  hasReinvest = signal(false);
  math = Math;

  isPopoverOpen = false;
  isInPopover = false;

  private fundColorMap: Record<number, string> = { 1: '#82c763', 2: '#1661fa', 3: '#f6aa1c', 4: '#6633CC'  };
  private compositionsByCode: Record<number, any> = {};

  private getFundColor(id: number): string {
    return this.fundColorMap[id] || '#ccccc';
  }

  getDisplayHoldings(): any[] {
    const holdings = this.portfolioData()?.allMutualFundDetail || [];
    if (holdings.length) {
      return holdings;
    }

    return this.useMockViewData ? this.mockPortfolioHoldings : [];
  }

  getDisplayCompositions(): any[] {
    const compositions = this.portfolioData()?.customerRequestCompositions || [];
    if (compositions.length) {
      return compositions;
    }

    return this.useMockViewData ? this.mockPortfolioHoldings.map(fund => fund.customerRequestCompositions) : [];
  }

  getDisplayTotalNetValue(): number {
    const realCompositions = this.portfolioData()?.customerRequestCompositions || [];
    if (realCompositions.length) {
      return Number(this.totalNetValue() ?? realCompositions.reduce((sum, item) => sum + Number(item?.netValue || 0), 0));
    }

    return this.getDisplayCompositions().reduce((sum, item) => sum + Number(item?.netValue || 0), 0);
  }

  getActiveHoldingCount(): number {
    return this.getDisplayHoldings().filter(item => Number(this.getHoldingComposition(item)?.netValue || 0) > 0).length;
  }

  getHoldingComposition(mutualFund: any): any {
    return mutualFund?.customerRequestCompositions
      || this.getDisplayCompositions().find(item => item?.mutualFundCode === mutualFund?.seoRegisterNumber)
      || {};
  }

  getHoldingEvidence(mutualFund: any): any {
    return mutualFund?.customerEvidences
      || (this.portfolioData()?.customerEvidences || []).find(item => item?.mutualFundCode === mutualFund?.seoRegisterNumber)
      || {};
  }

  getHoldingShare(mutualFund: any): number {
    const composition = this.getHoldingComposition(mutualFund);
    const total = this.getDisplayTotalNetValue();
    return Number(composition?.percent ?? (total ? (Number(composition?.netValue || 0) / total) * 100 : 0));
  }

  getHoldingProfitOrLoss(mutualFund: any): any {
    const composition = this.getHoldingComposition(mutualFund);
    return {
      amount: Number(composition?.profitOrLoss || 0),
      percent: Number(composition?.profitOrLossPercent || 0)
    };
  }

  hasProfitOrLoss(mutualFund: any): boolean {
    const profitOrLoss = this.getHoldingProfitOrLoss(mutualFund);
    return profitOrLoss.amount !== 0 || profitOrLoss.percent !== 0;
  }

  getAllocationSummary(): { label: string; value: number; color: string }[] {
    return [
      { label: 'درآمد ثابت', value: this.fixedIncomeNetValue(), color: '#1661fa' },
      { label: 'طلا', value: this.goldNetValue(), color: '#f6aa1c' },
      { label: 'سهامی', value: this.stockNetValue(), color: '#6633CC' }
    ].filter(item => item.value > 0 || this.useMockViewData);
  }

  getAllocationShare(value: number): number {
    const total = this.getDisplayTotalNetValue();
    return total ? Math.round((Number(value || 0) / total) * 100) : 0;
  }

  hasPendingSubscription(mutualFund: any): boolean {
    return Number(this.getHoldingEvidence(mutualFund)?.watingSubscriptionAmount || 0) > 0;
  }

  hasPendingRedemption(mutualFund: any): boolean {
    return Number(this.getHoldingEvidence(mutualFund)?.watingRedemptiomVolume || 0) > 0;
  }

  constructor(private fundService: FundService, private fundListService: FundListService, private userSettingsService: UserSettingsService, private decimalPipe: DecimalPipe, private ngbModal: NgbModal,
    private maskingService: MaskingNumberService, private maskNumberPipe: MaskNumberPipe,
    private layoutService: LayoutService,
    private toastService: ToastService,
    private router: Router,
    private exportService: ExportService,
    private calendar: NgbCalendar,
    private cdr: ChangeDetectorRef,
    public checkCustomerStepService: CheckCustomerStepService,
    private globalEventService: GlobalEventService
  ) {
    this.threeYearsAgo = NgbDateToStringGregorian(calendar.getPrev(calendar.getToday(), 'y', 3));
    this.nextWeek = NgbDateToStringGregorian(calendar.getNext(calendar.getToday(), 'd', 7));

    effect(() => {
      this.treeMapChartOption();
      this.loading.set(false);
    }, {
      allowSignalWrites: true
    })
  }

  ngOnInit(): void {
    this.userSettingsService.get<boolean>(SettingKeys.FaNum).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((value: any) => {
      if (value.faNum) {
        this.fontFamily.set(value.faNum ? 'PeydaWebFaNum' : 'PeydaWeb');
      }
    });

    this.getPortfolioData();
    this.getLastEvents();
    this.getFlatFundDividendCardexes();

    this.globalEventService.onReceiptConfirmationClosed()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.refreshPortfolioData();
      });
  }

  private getLastEvents() {
    this.fundService.getLastEvents().subscribe((result) => {
      this.waitingRequests.set(result)
    });
  }

  private getCustomerRequestCompositions() {


    let filter = {
      date: new Date(),
    };

    return this.fundService.getCustomerRequestCompositions(filter).pipe(
      tap((compositions: any[]) => {
        this.totalNetValue.set(0);
        const totalNetValue = compositions.reduce((total, current) => {
          return (total += current.netValue);
        }, 0);
        this.totalNetValue.set(totalNetValue);
      })
    );
  }

  getFlatFundDividendCardexes() {
    this.fundService.getFlatFundDividendCardexes(this.getFlatFundDividendCardexesModel()).subscribe((res: any) => {
      const total = res.result.reduce((total, current) => {
        return (total += current.profit);
      }, 0);
      this.dividend.set(total);
    })
  }

  private getFlatFundDividendCardexesModel() {
    return {
      reportFilter: { dateFilter: { startDate: this.threeYearsAgo, endDate: this.nextWeek }, phrase: '', mutualFundCode: '11168', requestTransactionType: 1, requestTransactionState: 1 },
      optionalFilter: { take: 15, skip: 0, page: 1, value: '', sort: [{ field: '', dir: '' }] },
      branchId: 0
    }
  };

  private getAllMutualFundDetail() {

    return this.fundListService.getAllMutualFunds().pipe(
      filter(funds => funds && funds.length > 0),
    );
    
    // return this.fundListService.getAllMutualFunds().pipe(
    //   filter((funds): funds is any[] => Array.isArray(funds) && funds.length > 0),  
    //   map(funds =>
    //     [...funds].sort((a, b) => {
    //       const pA =
    //         this.getImage(a)?.priority ?? 999;
  
    //       const pB =
    //         this.getImage(b)?.priority ?? 999;
  
    //       return pA - pB;
    //     })
    //   )
    // );
  }

  private getCustomerEvidences() {
    return this.fundService.getCustomerEvidences();
  }

  private getCustomerRequestAllocation() {
    let filter = {
      date: new Date(),
    };
    return this.fundService.getCustomerRequestAllocation(filter);
  }

  private getProfitOrLoss() {    
    return this.fundService.getProfitOrLoss();
  }

  private getPortfolioData() {
    this.loading.set(true);

    combineLatest([
      this.getCustomerRequestCompositions(),
      this.getCustomerEvidences(),
      this.getAllMutualFundDetail(),
      this.getCustomerRequestAllocation(),
      this.getProfitOrLoss()
    ])
      .subscribe(([customerRequestCompositions, customerEvidences, allMutualFundDetail, requestAllocation, profitOrLoss]) => {
        this.compositionsByCode = (customerRequestCompositions || []).reduce((acc, c) => {
          acc[c.mutualFundCode] = c;
          return acc;
        }, {} as Record<number, any>);
        allMutualFundDetail = customerRequestCompositions.map(customerRequestCompositions => ({
          ...allMutualFundDetail.find(c => c.seoRegisterNumber === customerRequestCompositions.mutualFundCode),
          customerRequestCompositions,
          customerEvidences: customerEvidences.filter((item) => item.mutualFundCode === customerRequestCompositions?.mutualFundCode)[0],
        }));
        
        // allMutualFundDetail = allMutualFundDetail.map(fund => {
        //   const composition = customerRequestCompositions.find(
        //     c => c.mutualFundCode === fund.seoRegisterNumber
        //   );
        
        //   return {
        //     ...fund,
        //     customerRequestCompositions: composition,
        //     customerEvidences: customerEvidences.find(
        //       e => e.mutualFundCode === fund.seoRegisterNumber
        //     ),
        //   };
        // });

        const profitOrLossMap = profitOrLoss.reduce((acc, item) => {
          acc[item.isin] = item;
          return acc;
        }, {} as Record<string, ProfitOrLossModel>);

        customerRequestCompositions = customerRequestCompositions.map(item => ({
          ...item,
          ...profitOrLossMap[item.isin]
        }));
                
        this.portfolioData.set({ customerRequestCompositions, customerEvidences, allMutualFundDetail });
        this.requestAllocation.set(requestAllocation);
        this.drawRequestAllocationChart(customerRequestCompositions);
      });

  }

  private refreshPortfolioData() {
    this.getCustomerEvidences().subscribe((customerEvidences) => {
      const currentData = this.portfolioData();
      if (currentData) {
        const updatedMutualFundDetail = currentData.allMutualFundDetail.map(fund => ({
          ...fund,
          customerEvidences: customerEvidences.filter((item) => item.mutualFundCode === fund.customerRequestCompositions?.mutualFundCode)[0],
        }));

        this.portfolioData.set({
          ...currentData,
          customerEvidences,
          allMutualFundDetail: updatedMutualFundDetail
        });
      }
    });
  }

  public showFoundModal(fundType): void {
    const modalRef = this.ngbModal.open(SubscriptionFundModalComponent, { modalDialogClass: 'modal-holder modal-dialog-centered', size: 'md', backdrop: 'static' });
    modalRef.componentInstance.requestTypeEnum = fundType;
  }

  toggleMask() {
    this.maskingService.toggleMasking();
  }

  drawRequestAllocationChart(requestAllocation: CustomerRequestAllocation[]) {
    const _data = requestAllocation.map(ra => ({
      name: ra?.fundTypeTitle,
      value: ra?.netValue,
      mutualFundId: ra?.mutualFundId,
    }));

    const seriesData = _data.map(item => ({
      ...item,
      itemStyle: { color: this.getFundColor(item.mutualFundId) }
    }));

    this.chartOptions = {
      tooltip: {
        show: false
      },
      legend: {
        show: false
      },
      series: [
        {
          type: 'pie',
          radius: ['80%', '83%'],
          silent: true,
          label: { show: false },
          data: [
            {
              value: 1,
              itemStyle: {
                color: 'rgba(255, 255, 255, 0)',
                borderColor: '#737D87',
                borderWidth: 1
              }
            }
          ]
        },
        {
          name: 'ترکیب سرمایه گذاری',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 5,
          },
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          data: seriesData,
          emphasis: {
            scale: false,
            label: {
              show: false,
            },
          },
        }
      ]
    } as EChartsOption;
  }

  private openFundModalIfPermitted(mutualFund: any, action: 'subscription' | 'redemption') {
    const mutualFundCode = mutualFund?.seoRegisterNumber;
    const composition = this.compositionsByCode[mutualFundCode]
      || (this.portfolioData()?.customerRequestCompositions || []).find(c => c.mutualFundCode === mutualFundCode);

    const permitted = action === 'subscription'
      ? (composition?.subscriptionPermit && mutualFund?.isAllowSubscription)
      : (composition?.redemptionPermit && mutualFund?.isAllowRedemption);

    if (!permitted) {
      this.toastService.show('در حال حاضر صندوق غیر فعال می‌باشد', { classname: 'bg-danger text-light' });
      return;
    }

    const component = action === 'subscription' ? SubscriptionFundModalComponent : RedemptionFundModalComponent;
    const modalRef = this.ngbModal.open(component, { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', backdrop: 'static' });
    modalRef.componentInstance.fundInfo = mutualFund;
  }

  convertToJalali(date: string) {
    return moment(date, 'YYYY-MM-DDTHH:mm:ss').locale('fa').format('dddd، jD jMMMM');
  }

  openSubscriptionModal(mutualFund) {
    const mutualFundCode = mutualFund.seoRegisterNumber;

    if (this.checkCustomerStepService.getCustomerStep()) {
      this.router.navigateByUrl('/').then(() => {
        if (this.layoutService.isTabletSizeOrSmaller) {
          this.router.navigate(['/mobile/user-info'], { queryParams: { updateSejam: true, fundCode: mutualFundCode } });
        } else {
          this.router.navigate(['/profile'], { queryParams: { updateSejam: true, fundCode: mutualFundCode } });
        }
      });
    } else {
      this.openFundModalIfPermitted(mutualFund, 'subscription');
    }
  }

  openRedemptionModal(mutualFund) {
    const mutualFundCode = mutualFund.seoRegisterNumber;
    if (this.checkCustomerStepService.getCustomerStep()) {
      this.router.navigateByUrl('/').then(() => {
        if (this.layoutService.isTabletSizeOrSmaller) {
          this.router.navigate(['/mobile/user-info'], { queryParams: { updateSejam: true, fundCode: mutualFundCode } });
        } else {
          this.router.navigate(['/profile'], { queryParams: { updateSejam: true, fundCode: mutualFundCode } });
        }
      });
    } else {
      this.openFundModalIfPermitted(mutualFund, 'redemption');
    }
  }

  openPortfolioDetailModal(mutualFundDetail) {
    const modalRef = this.ngbModal.open(PortfolioDetailModalComponent, {
      modalDialogClass: 'modal-holder  modal-dialog-centered custom-modal-width',
      size: 'md', backdrop: true,

    });

    modalRef.componentInstance.id = mutualFundDetail?.mutualFundId;
    modalRef.componentInstance.portfolioData = this.portfolioData;
  }

  evidenceReceipt(mutualFundCode) {
    this.disablePdfBtn.set(true)
    this.fundService
      .getEvidenceReceiptDatapdf(mutualFundCode).subscribe((res: ArrayBuffer) => {
        const faTitle = `گواهی صندوق-${toPersianDate(new Date())}`;
        this.exportService.pdf(res, faTitle);
      }, null,
        () => {//on complete
          this.disablePdfBtn.set(false)
        })
  }

  openReinvestPercentModal(mutualFundDetail, $event, isRequestCompositions = false) {    
    $event.preventDefault()
    const modalRef = this.ngbModal.open(ReinvestPercentModalComponent,
      { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', backdrop: 'static' });
    modalRef.componentInstance.mutualFundId = mutualFundDetail?.mutualFundId;
    modalRef.componentInstance.reinvestPercent = isRequestCompositions ? mutualFundDetail?.reinvest : mutualFundDetail?.customerEvidences?.reinvest;
    modalRef.result.then((result: { activePercent: number, action: number }) => {
      if (result?.action !== 2) {
          // mutualFundDetail.reinvest = result?.activePercent;
          // mutualFundDetail.customerEvidences.reinvest = result?.activePercent;
          this.getPortfolioData();
      } else return;
      this.cdr.detectChanges()
    })

  }

  getLogo(mutualFund): FundAttachment {
    return mutualFund?.attachments?.find(a => a.categoryId === FundAttachmentTypeEnum.Logo);
  }

  getImage(fund): FundAttachment {
    return fund?.attachments?.find(a => a.categoryId === FundAttachmentTypeEnum.HorizontalBanner);
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

  getCarouselList(list: any[] | null | undefined): any[] {
    if (!Array.isArray(list)) {
      return [];
    }
  
    return [...list].sort((a, b) => {
      const pA =
        this.getImage(a)?.priority ?? 999;
  
      const pB =
        this.getImage(b)?.priority ?? 999;
  
      return pA - pB;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}

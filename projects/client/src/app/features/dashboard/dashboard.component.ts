import { CommonModule, DecimalPipe, Location, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FundListService } from '@client/core/services/fund-list.service';
import { MaskNumberDirective, RequestTypeEnum, FundService, CustomerRequestAllocation, MaskingNumberService, MaskNumberPipe, toGregorian, toPersianDate, CheckCustomerStepService, commaSeparate, FundAttachment, FundAttachmentTypeEnum, LayoutService } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCarouselModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import Variablepie from "highcharts/modules/variable-pie";
import { forkJoin, Subject, take, takeUntil } from 'rxjs';
import { FundAdvComponent } from '../fund/fund-adv/fund-adv.component';
import { AssetChartComponent } from './asset-chart/asset-chart.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { RedemptionFundModalComponent } from './redemption-fund-modal/redemption-fund-modal.component';
import { SubscriptionFundModalComponent } from './subscription-fund-modal/subscription-fund-modal.component';
import { RotatingCarouselComponent } from './rotating-carousel/rotating-carousel.component';
import { InvestmentOpportunitiesComponent } from './investment-opportunities/investment-opportunities.component';
import { OtherServicesComponent } from './other-services/other-services.component';
import { UsrCompositionChartComponent } from './usr-composition-chart/usr-composition-chart.component';
import { FormsModule } from '@angular/forms';
import { ConsultingGuideComponent } from "./consulting-guide/consulting-guide.component";
import * as echarts from 'echarts/core';
import { DatasetComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { LineChart, PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { AssetPortfolioChartComponent } from '../portfolio/asset-portfolio-chart/asset-portfolio-chart.component';
import { UserSettingsService } from '@client/core/services/user-settings.service';
import { SettingKeys } from '@client/shared/models/user-settings.model';
import { MutualFundCarouselComponent } from '@client/shared/components/mutual-fund-carousel/mutual-fund-carousel.component';
import { GlobalEventService } from '@client/core/services/global-event.service';
import { ExchangeFundModalComponent } from './exchange-fund-modal/exchange-fund-modal.component';
import { environment } from 'projects/client/src/environments/environment';


echarts.use([TitleComponent, TooltipComponent, GridComponent, DatasetComponent, PieChart, CanvasRenderer, LegendComponent, LineChart]);
Variablepie(Highcharts);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FontAwesomeModule, HighchartsChartModule, RotatingCarouselComponent, NgFor, MaskNumberDirective,
    UsrCompositionChartComponent, FormsModule, ConsultingGuideComponent,
    RecentActivityComponent, AssetChartComponent, DecimalPipe, RouterLink, FundAdvComponent,
    InvestmentOpportunitiesComponent, OtherServicesComponent, ConsultingGuideComponent, NgxEchartsDirective, CommonModule, AssetPortfolioChartComponent ,
    NgbCarouselModule , MutualFundCarouselComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DecimalPipe, MaskNumberPipe, provideEchartsCore({ echarts })]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
  apiUrl: string = environment.apiUrl;
  assetChkbox = true
  allMutualFundDetail = signal([])
  requestComposition = signal([])
  requestAllocation = signal<CustomerRequestAllocation[]>([])
  totalNetValue = signal(null)
  showChart = signal(false)
  waitingRequests = signal([]);
  historicData=signal([]);
  fromDate = {
    year: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 12))).split('/')[0]),
    month: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 12))).split('/')[1]),
    day: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 12))).split('/')[2])
  };
  toDate = {
    year: Number(toPersianDate(new Date()).split('/')[0]),
    month: Number(toPersianDate(new Date()).split('/')[1]),
    day: Number(toPersianDate(new Date()).split('/')[2])
  };
  fromFirstBuy = true;
  ngUnsubscribe$ = new Subject;
  fontFamily = signal('');
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any;
  chartInstance: any;
  assetChartOption: any;
  attachmentTypes = FundAttachmentTypeEnum;

  showInstagramBanner = false;

  fundList: any[] = [];
  bannerAttachments: any[] = [];

  constructor(private fundService: FundService,  private userSettingsService: UserSettingsService, private fundListService: FundListService, private ngbModal: NgbModal, private decimalPipe: DecimalPipe, location: Location, private maskingService: MaskingNumberService, private maskNumberPipe: MaskNumberPipe,
    private checkCustomerStepService : CheckCustomerStepService , private router: Router,
    private globalEventService: GlobalEventService, private layoutService: LayoutService
  ) {
    const state = location.getState() as any;
    if (state && state.mutualFundCode) {
      const mutualFundCode = state?.mutualFundCode;
      const amount = state?.amount;
      this.showFundModalForRetry(mutualFundCode, amount);
    }

  }


  ngOnInit(): void {
    this.userSettingsService.get<boolean>(SettingKeys.FaNum).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((value: any) => {
      if (value.faNum) {
        this.fontFamily.set(value.faNum ? 'PeydaWebFaNum' : 'PeydaWeb');
      }
    });

    this.getFundDetail();

    // this.fundListService.getAllMutualFunds().subscribe(fundList => {
    //   this.allMutualFundDetail.set(fundList);
    // });

    // this.fundListService.getAllMutualFunds().subscribe(fundList => {

    //   const sortedList = [...fundList].sort((a, b) => {
    //     const pA = this.getAttachment(
    //       a,
    //       FundAttachmentTypeEnum.HorizontalBanner
    //     )?.priority ?? 999;
    
    //     const pB = this.getAttachment(
    //       b,
    //       FundAttachmentTypeEnum.HorizontalBanner
    //     )?.priority ?? 999;
    
    //     return pA - pB;
    //   });    
      
    //   this.allMutualFundDetail.set(sortedList);
      
    //   if(sortedList?.length > 0){        
    //     this.showInstagramBanner = true;
    //   }

    // });

    this.getFunds();

    setTimeout(() => {      
      this.getAttachments();
    }, 800);

    this.getHistoricalData();

    this.globalEventService.onReceiptConfirmationClosed()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.refreshWaitingRequests();
      });
  }

  private getFundDetail() {
    let filter = {
      date: new Date(),
    };
    forkJoin([
      this.fundService.getCustomerRequestCompositions(filter),
      this.fundService.getCustomerRequestAllocation(filter),
      this.fundService.getLastEvents()
    ])
      .subscribe(([requestComposition, requestAllocation, waitingRequests]) => {
        this.waitingRequests.set(waitingRequests)        
        this.requestComposition.set(requestComposition);
        // if (!requestAllocation.length) {
        //   requestAllocation.push({
        //     fundTypeTitle: 'هزاره سوم پاد',
        //     netValue: 0,
        //     remainVolume: 0,
        //     fundType: 1,
        //     partyId: 0,
        //     percent: 0
        //   })
        // }
        this.requestAllocation.set(requestAllocation);
        this.drawRequestAllocationChart(requestAllocation);
        this.calculateTotalNetValue(requestComposition)
      })
  }


  getFunds() {
    this.fundListService.getAllMutualFunds()      
    .subscribe(fundList => {
        this.fundList = fundList;
        this.updateList();
      });
  }

  getAttachments() {
    this.fundService.getNewFundAttachments(0)
      .subscribe((res: any) => {
        this.bannerAttachments = res?.result ?? [];
        this.updateList();
      });
  }
  
  updateList() {
    if (!this.fundList.length && !this.bannerAttachments.length) return;
  
    const bannerItem = {
      title: '',
      enTitle: '',
      seoRegisterNumber: '',
      fundType: 0,
      mutualFundId: 0,
      attachments: this.bannerAttachments
    };
  
    const updatedFundList = [...this.fundList, bannerItem as any];
  
    const sortedList = updatedFundList.sort((a, b) => {
      const pA =
        this.getAttachment(a, FundAttachmentTypeEnum.HorizontalBanner)?.priority ?? 999;
  
      const pB =
        this.getAttachment(b, FundAttachmentTypeEnum.HorizontalBanner)?.priority ?? 999;
  
      return pA - pB;
    });
      
    this.allMutualFundDetail.set(sortedList);

    this.showInstagramBanner = sortedList.length > 0;
  }

  private refreshWaitingRequests() {
    this.fundService.getLastEvents().subscribe((waitingRequests) => {
      this.waitingRequests.set(waitingRequests);
    });
  }

  // Chart load event
  onChartLoad(): void {
    this.chartInstance = Highcharts.charts.find((chart) => {
      const chartId = (chart?.options.chart as any)?.custome?.chartId;
      return 'asset-composition-chart' === chartId
    });

    // Add a click event to the chart
    this.chartInstance.container.addEventListener('click', this.onChartClick);
  }

  onChartClick = (event: MouseEvent) => {
    if (this.chartInstance) {
      this.chartInstance.update(
        {
          tooltip: {
            enabled: true,
          },
        },
        false
      );
      this.chartInstance.tooltip.refresh(this.chartInstance.series[0].points[0]);
    }
  };


  drawRequestAllocationChart(requestAllocation: CustomerRequestAllocation[]) {
    const _self = this;
    const _data = requestAllocation.map(ra => ({
      name: ra.fundTypeTitle,
      value: ra.netValue,
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
          color: _data.map((e:any) => {            
            switch (e?.name) {
              case "درآمد ثابت":
                return '#B5E79F'
              case "طلا":
                return '#f6aa1c'  
              case "سهامی":
                return '#6633CC'           
              default:
                return '#cccccc'
            }
          }),
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
          data: [
            ..._data
          ],
          emphasis: {
            scale: false,
            label: {

              show: true,
              fontSize: 10.4,
              fontWeight: 'regular',
              fontFamily: _self.fontFamily(),
              color: '#fff',
              position: 'inside',
            },


          },
        }
      ]
    } as EChartsOption;
  }

  calculateTotalNetValue(compositions) {
    let totalNetValue = 0
    compositions.forEach((d) => {
      totalNetValue += d.netValue;
    });
    this.totalNetValue.set(totalNetValue)
  }

  showFundModalForRetry(mutualFundCode, amount) {
    const modalRef = this.ngbModal.open(SubscriptionFundModalComponent, { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', backdrop: 'static' });
    modalRef.componentInstance.requestTypeEnum = RequestTypeEnum.Investment;
    modalRef.componentInstance.amount = amount
  }

  openSubscriptionModal() {
    if(this.checkCustomerStepService.getCustomerStep()) {
      this.router.navigateByUrl('/').then(() => {
        this.router.navigate(['/profile'],{queryParams:{updateSejam:true}});
      });
    }else{
      
      this.ngbModal.open(SubscriptionFundModalComponent, { modalDialogClass: 'modal-holder modal-dialog-centered', size: 'md', 
        backdrop: this.layoutService.isTabletSizeOrSmaller ? 'static' : true});
    }

  }

  openRedemptionModal() {
    if(this.checkCustomerStepService.getCustomerStep()) {
      this.router.navigateByUrl('/').then(() => {
        this.router.navigate(['/profile'],{queryParams:{updateSejam:true}});
      });
    }else{
      this.ngbModal.open(RedemptionFundModalComponent, { modalDialogClass: 'modal-holder modal-dialog-centered', size: 'md', 
        backdrop: this.layoutService.isTabletSizeOrSmaller ? 'static' : true });
    }
  }
  
  openExchangeModal() {
    if(this.checkCustomerStepService.getCustomerStep()) {
      this.router.navigateByUrl('/').then(() => {
        this.router.navigate(['/profile'],{queryParams:{updateSejam:true}});
      });
    }else{
      this.ngbModal.open(ExchangeFundModalComponent, { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', 
        backdrop: this.layoutService.isTabletSizeOrSmaller ? 'static' : true });
    }
  }

  getHistoricalData() {
    let fromDate = toGregorian(`${this.fromDate.year}/${this.fromDate.month}/${this.fromDate.day}`);
    let toDate = toGregorian(`${this.toDate.year}/${this.toDate.month}/${this.toDate.day}`);

    this.fundService.historicalPosition(null, toDate, this.fromFirstBuy ? null : fromDate)
      .subscribe(res => {
        this.historicData.set(res);
        let yAxisData = res.map(item => item.asset).reverse();
        let xAxisData = res.map(item => item.dateJalali).reverse();
        this.makeLineChart(xAxisData, yAxisData);
      })
  }

  makeLineChart(xAxisData, yAxisData) {
    const _self = this;
    this.assetChartOption = {
      tooltip: {
        trigger: 'axis',
        textStyle: {
          fontFamily: _self.fontFamily(),
          fontSize: 14,
        },
      formatter: function (params: any) {
        let content = `<div style="font-size: 12px; text-align: right; padding: 5px;font-weight:700">${params[0].axisValueLabel}</div>`;
        params.forEach((param: any) => {
          if (param.data !== null && param.data !== undefined) {
            content += `
              <div style="font-size: 12px; padding: 2px;font-weight:700">
                <span style="display:inline-block;margin-left:5px;border-radius:10px;width:10px;height:10px;background-color: ${param.color};"></span>
                ${param.seriesName} : ${commaSeparate(param.data)} ریال
              </div>`;
          }
        });
        return content;
       },
      },
      grid: {
        top: '20%',
        left: '10%',
        right: '10%',
        bottom: '25%',
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        boundaryGap: false,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#6F52D4',
          padding: [10, 0, 0, 0],

        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => {
            if (value >= 1_000_000) {
              return `${Math.round(value / 1_000_000)}M`;
            } else if (value >= 1_000) {
              return `${Math.round(value / 1_000)}K`;
            }
            return Math.round(value).toString();
          },

        },
        name: 'ریال',
        nameLocation: 'end',
        nameTextStyle: {
          color: '6F52D4',
          fontSize: 11,
          fontWeight:'bold',
          fontFamily:_self.fontFamily(),
          align: 'left',
          verticalAlign: 'top',
          padding: [5, 0, 0, 8],
        },
        nameGap: 30,
        position:'right',
        min:Math.round(Math.min(...yAxisData))

      },
      series: [
        {
          name: 'دارایی',
          type: 'line',
          smooth: true,
          data: yAxisData,
          lineStyle: {
            color: '#6633CC',
          },
          symbol:'none'
        },
      ],

    } as EChartsOption;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  getAttachment(fund, type:FundAttachmentTypeEnum): FundAttachment {
    return fund?.attachments?.find(a => a.categoryId === type);
  }

  getPageLink(fund: any) {
    if(fund.mutualFundId == 0) {
      window.open('https://ble.ir/pasargadcapital', '_blank', 'noopener,noreferrer');
    } else {
      this.router.navigate(['/fund', fund.seoRegisterNumber, 'fund-detail', fund.seoRegisterNumber]);
    }
  }
}  

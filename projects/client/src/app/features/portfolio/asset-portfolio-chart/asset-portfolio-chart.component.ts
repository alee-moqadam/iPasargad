
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { FundService, toGregorian, toPersianDate, commaSeparate, SettingKeys } from '@client/shared';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import AnnotationsModule from "highcharts/modules/annotations";
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { DatasetComponent, GridComponent, LegendComponent, MarkPointComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { LineChart, PieChart, ScatterChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { Subject, takeUntil } from 'rxjs';
import { UserSettingsService } from '@client/core/services/user-settings.service';

AnnotationsModule(Highcharts);
echarts.use([TitleComponent, TooltipComponent, GridComponent, DatasetComponent, PieChart, CanvasRenderer, LegendComponent, LineChart, ScatterChart, MarkPointComponent])

@Component({
  selector: 'app-asset-portfolio-chart',
  standalone: true,
  templateUrl: './asset-portfolio-chart.component.html',
  styleUrl: './asset-portfolio-chart.component.scss',
  imports: [HighchartsChartModule, NgClass, NgIf, NgxEchartsDirective, CommonModule],

  providers: [
    provideEchartsCore({ echarts })
  ]
})
export class AssetPortfolioChartComponent implements OnInit, OnDestroy {
  @Input() mutualFundId
  @Input() mutualFundCode
  @Input() mutualFundType
  @Input() isDashboard = false;
  dateType = 'month'
  ngUnsubscribe$ = new Subject;
  fontFamily = signal('PeydaWeb');

  Highcharts = Highcharts;

  date;
  fromDate = {
    year: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 1))).split('/')[0]),
    month: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 1))).split('/')[1]),
    day: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 1))).split('/')[2])
  };
  toDate = {
    year: Number(toPersianDate(new Date()).split('/')[0]),
    month: Number(toPersianDate(new Date()).split('/')[1]),
    day: Number(toPersianDate(new Date()).split('/')[2])
  };
  series;
  chartOptions = signal(null);
  dateList;
  assetList;
  remainList;
  divisionList;
  subscriptionVolumeList;
  redemptionVolumeList;
  aDivisionList;
  aSubscriptionAmountList;
  aRedemptionAmountList;
  fromFirstBuy = true;

  constructor(private fundService: FundService, private userSettingsService: UserSettingsService) { }

  ngOnInit(): void {
    const fromDate = toGregorian(`${this.fromDate.year}/${this.fromDate.month}/${this.fromDate.day}`);
    const toDate = toGregorian(`${this.toDate.year}/${this.toDate.month}/${this.toDate.day}`);
    this.getAssetPositionsList(fromDate, toDate);
    this.userSettingsService.get<boolean>(SettingKeys.FaNum).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((value: any) => {
      if (value.faNum) {
        this.fontFamily.set(value.faNum ? 'PeydaWebFaNum' : 'PeydaWeb');
      }
    });


    Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    })
    this.fromFirstBuy = this.isDashboard ? true : false
  }

  setDate(type) {

    this.dateType = type;
    this.fromFirstBuy = false
    let fromDate = toGregorian(`${this.fromDate.year}/${this.fromDate.month}/${this.fromDate.day}`);
    let toDate = toGregorian(`${this.toDate.year}/${this.toDate.month}/${this.toDate.day}`);
    switch (type) {
      case 'week':
        this.fromDate = {
          year: Number(toPersianDate(new Date(new Date().setDate(new Date().getDate() - 7))).split('/')[0]),
          month: Number(toPersianDate(new Date(new Date().setDate(new Date().getDate() - 7))).split('/')[1]),
          day: Number(toPersianDate(new Date(new Date().setDate(new Date().getDate() - 7))).split('/')[2])
        };
        break;
      case 'month':
        this.fromDate = {
          year: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 1))).split('/')[0]),
          month: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 1))).split('/')[1]),
          day: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 1))).split('/')[2])
        };
        break;
      case '3month':
        this.fromDate = {
          year: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 3))).split('/')[0]),
          month: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 3))).split('/')[1]),
          day: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 3))).split('/')[2])
        };
        break;
      case '1year':
        this.fromDate = {
          year: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 12))).split('/')[0]),
          month: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 12))).split('/')[1]),
          day: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 12))).split('/')[2])
        };
        break;
      case 'all':
        this.fromFirstBuy = true
        break;
      default:
        break;
    }
    fromDate = toGregorian(`${this.fromDate.year}/${this.fromDate.month}/${this.fromDate.day}`);

    this.getAssetPositionsList(fromDate, toDate)
  }

  getAssetPositionsList(fromDate: any, toDate: any) {
    const _self = this;
    this.fundService.historicalPosition(this.mutualFundId,toDate, this.isDashboard ? null : fromDate).subscribe(data => {
      if (data && data.length > 0) {
        data.reverse();
        let maxValue = 0;
        let minValue = 0;
        let flipFlop = 1;
        this.dateList = [];
        this.assetList = [];
        this.remainList = [];
        this.divisionList = [];
        this.subscriptionVolumeList = [];
        this.redemptionVolumeList = [];
        const divisionPoints = [];
        const subscriptionPoints = [];
        const redemptionPoints = [];

        data.forEach((item, index) => {
          this.dateList.push(item.dateJalali);
          this.assetList.push(item.asset);
          maxValue = Math.max(maxValue, item.asset);
          minValue = Math.min(minValue, item.asset)
          this.divisionList.push(item.profit || null);
          this.subscriptionVolumeList.push(item.subscriptionVolume || null);
          this.redemptionVolumeList.push(item.redemptionVolume || null);
          this.remainList.push(item.remain);

          if (item.profit) {
            divisionPoints.push({
              coord: [index, item.asset],
              value: 'سود',
              itemStyle: { color: 'var(--dtx-warning)' },
            });
          }
          if (item.subscriptionVolume) {
            subscriptionPoints.push({
              coord: [index, item.asset],
              value: item.subscriptionVolume,
              itemStyle: { color: '#008c97' },
            });
          }
          if (item.redemptionVolume) {
            redemptionPoints.push({
              coord: [index, item.asset],
              value: item.redemptionVolume,
              itemStyle: { color: 'red' },
            });
          }
        });
        this.chartOptions.set(
          {
            grid: {
              top: 60,
              bottom: 48,
              right: _self.fontFamily() === "PeydaWebFaNum" ? this.isDashboard ? 80 : 60 : this.isDashboard ? 60 : 40,
              containLabel: false,
            },
            tooltip: {
              trigger: 'axis',
              backgroundColor: '#fff',
              borderColor: '#ccc',
              borderWidth: 1,
              textStyle: {
                fontFamily: _self.fontFamily(),
                fontSize: 14,
              },
              formatter: function (params: any) {
                let content = `<div style="font-size: 12px; text-align: right; padding: 5px;font-weight:700; font-family: ${_self.fontFamily()}">${params[0].axisValueLabel}</div>`;
                params.forEach((param: any) => {
                  if (param.data !== null && param.data !== undefined) {
                    content += `
                      <div class="align-items-center d-flex justify-content-end ${_self.fontFamily() === 'PeydaWebFaNum' ? 'flex-row-reverse': ''}" style="font-size: 12px; padding: 2px; text-align: right; font-family: ${_self.fontFamily()}">
                        <span>
                          ${param.seriesName} : <span class="fw-bold">${commaSeparate(param.data)} ${[0, 1].includes(param.seriesIndex) ? '</span> ریال' : '</span> عدد'}
                        </span>
                        <span style="display:inline-block;margin-left:5px;border-radius:10px;width:10px;height:10px;background-color: ${param.color};"></span>
                      </div>`;
                  }
                });
                return content;
              },
              position: 'top'
            },

            xAxis: {
              type: 'category',
              data: this.dateList,
              boundaryGap: false,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                textStyle: {
                  fontFamily: _self.fontFamily(),
                },
                color: '#6F52D4',
                padding: [10, 0, 0, 0],

              },
            },
            yAxis: {
              type: 'value',
              position: 'right',
              splitNumber: 3,
              axisLabel: {
                textStyle: {
                  fontFamily: _self.fontFamily(),
                },
                formatter: (value: number) => {
                  const isFaNum = _self.fontFamily() === "PeydaWebFaNum";
                  if (value >= 1_000_000) {
                    return `${Math.round(value / 1_000_000)} ${isFaNum ? 'میلیون' : 'M'}`;
                  } else if (value >= 1_000) {
                    return `${Math.round(value / 1_000)} ${isFaNum ? 'هزار' : 'K'}`;
                  }
                  return Math.round(value).toString();
                },

              },
              name: 'ریال',
              nameLocation: 'end',
              nameTextStyle: {
                color: '6F52D4',
                fontSize: 11,
                fontWeight: 'bold',
                fontFamily: _self.fontFamily(),
                align: 'left',
                verticalAlign: 'bottom',
                padding: [5, 0, 0, 8],
              },
              nameGap: 30,
              min: (Math.min(...this.assetList) === 0) ? 0 : (Math.min(...this.assetList) / 2)
            },
            series: [
              {
                name: 'ارزش دارایی',
                type: 'line',
                data: this.assetList,

                smooth: true,
                color: '#6633CC',
                symbol: '',
                symbolSize: 1,
                lineStyle: {
                  width: 3,
                },
                label: {
                  show: true,
                  offset: [0, 0],
                  formatter: (params) => {
                    const { dataIndex } = params;
                    const division = commaSeparate(this.divisionList[dataIndex]);
                    const subscription = commaSeparate(this.subscriptionVolumeList[dataIndex]);
                    const redemption = commaSeparate(this.redemptionVolumeList[dataIndex]);

                    if (!division && !subscription && !redemption) {
                      return '';
                    }

                    let tooltipContent = '';
                    if (division)
                      tooltipContent += `{triangle| }  \n`;
                    if (subscription)
                      tooltipContent += `{greenSquare| }  \n`;
                    if (redemption)
                      tooltipContent += `{redSquare| }`;

                    return tooltipContent;
                  },
                  rich: {

                    triangle: {
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#ffc107',
                      align: 'left',
                      verticalAlign: 'middle',

                    },
                    greenSquare: {
                      width: 10,
                      height: 10,
                      backgroundColor: '#12b549',
                      borderRadius: 5,
                      align: 'left',
                    },
                    redSquare: {
                      width: 10,
                      height: 10,
                      backgroundColor: '#ef5350',
                      borderRadius: 5,
                      align: 'left',
                    },
                  },

                }
              },
              {
                name: 'تقسیم سود',
                type: 'line',
                data: this.divisionList,
                showSymbol: false,
                lineStyle: { opacity: 0 },
                color: '#ffc107',

              },
              {
                name: 'واریز',
                type: 'line',
                data: this.subscriptionVolumeList,
                showSymbol: false,
                lineStyle: { opacity: 0 },
                color: '#12b549'

              },
              {
                name: 'برداشت',
                type: 'line',
                data: this.redemptionVolumeList,
                showSymbol: false,
                lineStyle: { opacity: 0 },
                color: '#ef5350'

              },
            ],

          } as EChartsOption);




        // Set ECharts option
        // this.echartsInstance.setOption(chartOption);
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}

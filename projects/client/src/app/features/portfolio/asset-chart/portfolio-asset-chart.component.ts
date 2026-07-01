import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { UserSettingsService } from '@client/core/services/user-settings.service';
import { FundService, toGregorian, toPersianDate, numberSuffix, commaSeparate } from '@client/shared';
import { SettingKeys } from '@client/shared/models/user-settings.model';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import AnnotationsModule from "highcharts/modules/annotations";
import { Subject, takeUntil } from 'rxjs';
AnnotationsModule(Highcharts);

@Component({
  selector: 'app-portfolio-asset-chart',
  templateUrl: './portfolio-asset-chart.component.html',
  styleUrls: ['./portfolio-asset-chart.component.scss'],
  standalone: true,
  imports: [HighchartsChartModule, NgClass, NgIf],
})
export class PortfolioAssetChartComponent implements OnInit, OnDestroy {
  @Input() mutualFundId
  @Input() mutualFundCode
  @Input() mutualFundType
  dateType = '3month'
  ngUnsubscribe$ = new Subject;
  fontFamily = signal('');

  Highcharts = Highcharts;

  date;
  fromDate = {
    year: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 3))).split('/')[0]),
    month: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 3))).split('/')[1]),
    day: Number(toPersianDate(new Date(new Date().setMonth(new Date().getMonth() - 3))).split('/')[2])
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
  assetPositionList = signal([]);
  constructor(private fundService: FundService, private userSettingsService: UserSettingsService) {


  }

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
    this.fundService.historicalPosition(this.mutualFundId, toDate, this.fromFirstBuy ? null : fromDate).subscribe(data => {
      this.assetPositionList.set(data);
      let maxValue = 0
      if (data && data.length > 0) {
        data.reverse();
        let iCounter = 0
        let flipFlop = 1;
        this.dateList = [];
        this.assetList = [];
        this.remainList = [];
        this.divisionList = [];
        this.subscriptionVolumeList = [];
        this.redemptionVolumeList = [];
        this.aDivisionList = [];
        this.aSubscriptionAmountList = [];
        this.aRedemptionAmountList = [];


        data.map(item => {

          this.dateList.push(item.dateJalali);
          this.assetList.push(item.asset);
          maxValue = maxValue > item.asset ? maxValue : item.asset
          item.profit ? this.divisionList.push(item.profit) : this.divisionList.push(false);
          item.subscriptionVolume ? this.subscriptionVolumeList.push(item.subscriptionVolume) : this.subscriptionVolumeList.push(false);
          item.redemptionVolume ? this.redemptionVolumeList.push(item.redemptionVolume) : this.redemptionVolumeList.push(false);


          if (item.profit || item.subscriptionVolume || item.redemptionVolume) {
            flipFlop = (-1) * flipFlop;
            item.profit && this.aDivisionList.push(
              {
                point: {
                  xAxis: 0,
                  yAxis: 0,
                  x: iCounter,
                  y: item.asset
                },
                formatter: function () {
                  return `<div style='background-color: var(--dtx-warning); box-shadow: 0 0 3px #00545a; color: #990000; border: solid 1px #ffffff; border-radius: 4px; margin-right:-2px' class='ltr p-1'>سود</div>`
                },

                useHTML: true
              });
            item.subscriptionAmount && this.aSubscriptionAmountList.push(
              {
                point: {
                  xAxis: 0,
                  yAxis: 0,
                  x: iCounter,
                  y: item.asset
                },
                formatter: function () {
                  return `<div style='background-color:#008c97; box-shadow: 0 0 3px #00545a; border-radius: 4px; margin-bottom:-px; margin-right:-2px; border: solid 1px #00545a' class='rtl d-flex p-1'><span class="mx-1">واحد</span><span>${commaSeparate(item.subscriptionVolume)}</span></div>`
                },
                useHTML: true

              });

            item.redemptionAmount ? this.aRedemptionAmountList.push(
              {
                point: {
                  xAxis: 0,
                  yAxis: 0,
                  x: iCounter,
                  y: item.asset
                },
                formatter: function () {
                  return `<div style='background-color: red; box-shadow: 0 0 3px #cc0000; border-radius: 4px; margin-bottom:-px; margin-right:-2px; border: solid 1px #cc0000' class='rtl d-flex p-1'><span class="mx-1">واحد</span><span>` + commaSeparate(item.redemptionVolume) + `</span></div>`
                },
                useHTML: true
              }) : null;
          }
          this.remainList.push(item.remain);
          iCounter++;
        });

        const gColor = '#fdb813'

        this.chartOptions.set({
          chart: {
            backgroundColor: 'transparent',
            style: { fontFamily: _self.fontFamily() },
            height: '300px',
          },
          states: { hover: { enabled: false } },
          title: { text: '' },
          xAxis: {
            categories: this.dateList,
            crosshair: true,
            labels: { enabled: false }
          },
          yAxis: {
            gridLineColor: '#aeafad',
            innerHeight: '50%',
            endOnTick: false,
            startOnTick: false,
            opposite: true,
            max: maxValue * 1.7,

            title: { text: '' },
            labels: {
              enabled: true,
              style: { color: '#aeafad' },
              formatter: function () {
                return `${numberSuffix(parseFloat(this.value.toFixed(2)))}`;
              },
              useHTML: true
            }
          },
          tooltip: {
            borderWidth: 0,
            shadow: 'none',
            padding: 0,
            shared: true,
            crosshairs: false,
            formatter: function () {
              const template = this.points.map(point =>
                `<div style="color: ${point.series.color}; direction: ${'ltr'}">${point.series.name}: ${commaSeparate(parseFloat(point.y.toFixed(2)))}</div>`).join('');
              return `<div style="border-radius:4px; z-index:5; box-shadow: 0 0 4px #000000aa; border: solid 1px #ffffff; padding: 5px; background-color: white" class='text-right'>
                        <div>${this.points[0].x}</div>
                        ${template}
                      </div>`;
            },
            useHTML: true
          },
          annotations: [{

            labelOptions: {
              padding: 0,
              margin: 0,
              allowOverlap: true,
              backgroundColor: 'transparent',
              borderColor: '#008c97',
              style: { color: 'rgb(255,255,255)' },
              overflow: "justify"
            },
            labels: this.aSubscriptionAmountList
          },
          {

            labelOptions: {
              padding: 0,
              margin: 0,
              allowOverlap: true,
              backgroundColor: 'transparent',
              borderColor: 'red',
              style: { color: 'rgb(255,255,255)' },
              overflow: "justify"
            },
            labels: this.aRedemptionAmountList
          },
          {

            labelOptions: {
              padding: 0,
              margin: 0,
              allowOverlap: true,
              backgroundColor: 'transparent',
              borderColor: 'var(--dtx-warning)',
              style: { color: 'rgb(255,255,255)' },
              overflow: "justify"
            },
            labels: this.aDivisionList
          }],
          // plotOptions: {
          //   line: {
          //     marker: {
          //       enabled: false
          //     }
          //   }
          // },
          series: [
            {
              type: 'area',
              name: 'ارزش دارایی',
              data: this.assetList,
              fillColor: {
                linearGradient: {
                  x1: 0,
                  x2: 0,
                  y1: 0,
                  y2: 1
                },
                stops: [
                  [0, gColor],
                  [0.8, 'rgba(255,255,255,.25)']
                ]
              },
              color: gColor,
              marker: {
                enabled: false
              }
            },
            {
              type: 'spline',
              name: 'تقسیم سود',
              data: this.divisionList,
              color: 'var(--dtx-warning)',
              marker: {
                radius: 6,
                symbol: 'triangle'
              },
              showInLegend: this.mutualFundType == 2,
            }, {
              type: 'spline',
              name: 'واریز ',
              data: this.subscriptionVolumeList,
              color: 'var(--dtx-success)',
              marker: {
                radius: 6,
                symbol: 'circle'
              }
            }, {
              type: 'spline',
              name: 'برداشت',
              data: this.redemptionVolumeList,
              color: 'var(--dtx-danger)',
              marker: {
                radius: 6,
                symbol: 'square'
              }
            },
            {
              type: 'area',
              name: 'تعداد دارایی',
              data: this.remainList,
              marker: {
                enabled: false
              },
              showInLegend: false,
            }
          ]
        });
      }

    })


  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}



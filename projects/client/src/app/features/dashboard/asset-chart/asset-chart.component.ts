import { CommonModule, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, effect, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FundListService } from '@client/core/services/fund-list.service';
import { UserSettingsService } from '@client/core/services/user-settings.service';
import { FundService, toGregorian } from '@client/shared';
import { SettingKeys } from '@client/shared/models/user-settings.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';
import HC_stock from 'highcharts/modules/stock';
import moment from 'jalali-moment';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
HC_stock(Highcharts);

Highcharts.setOptions({
  lang: {
    rangeSelectorZoom: ''
  }
})

@Component({
  selector: 'app-asset-chart',
  templateUrl: './asset-chart.component.html',
  styleUrls: ['./asset-chart.component.scss'],
  standalone: true,
  imports: [CommonModule, DecimalPipe, NgbNavModule, FaIconComponent, RouterLink],
  providers: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetChartComponent implements OnInit, OnDestroy {
  Highcharts = Highcharts;
  masterChartOptions: Highcharts.Options = null;
  detailChartOptions: Highcharts.Options = null;
  loading$ = new BehaviorSubject(false);
  detailChart = ''
  data;
  dateInChart
  chatList = signal<any>([])
  
  filter = {
    reportFilter: {
      dateFilter: {
        startDate: toGregorian(new Date(new Date().setFullYear(new Date().getFullYear() - 13)), "YYYY-MM-DD"),
        endDate: toGregorian(new Date(), "YYYY-MM-DD"),
      },
      phrase: "",
      mutualFundId: 0,
      mutualFundCode: 0
    },
    optionalFilter: {
      take: 180,
      skip: 0,
      page: 0,
      value: "",
      sort: [
        {
          field: "",
          dir: ""
        }
      ]
    },
    branchId: 0
  }
  ngUnsubscribe$ = new Subject;
  fontFamily = signal('');

  fundDetail = input.required<{ seoRegisterNumber: number }>()
  thefundDetail = signal({})


  constructor(private fundService: FundService, private userSettingsService: UserSettingsService, private decimalPipe: DecimalPipe,
    private fundListService: FundListService
  ) {

    effect(() => {
      const detail = this.fundDetail();
      if (!detail || !detail.seoRegisterNumber) {
        return;
      }
      this.getNavList();
    });

  }

  ngOnInit(): void {
    this.userSettingsService.get<boolean>(SettingKeys.FaNum).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((value: any) => {
      if (value.faNum) {
        this.fontFamily.set(value.faNum ? 'PeydaWebFaNum' : 'PeydaWeb');
      }
    });
    this.fundListService.getAllMutualFunds().subscribe(fundList => {
      const matchedFund = fundList.find(x => x.seoRegisterNumber == this.fundDetail().seoRegisterNumber);
      if (matchedFund) {
        this.thefundDetail.set(matchedFund);
      }
    });
  }

  getNavList() {

    this.filter.reportFilter.mutualFundCode = this.fundDetail().seoRegisterNumber

    let dateList = [];
    this.fundService.getNavList(this.filter).subscribe((navList: any[]) => {
      this.chatList.set(navList)
      const navListMapped = navList.reduce((total, current) => {

        total.subscriptionNav.unshift([new Date(current.date).getTime(), current.subscriptionNAV, current.dateJalali]);
        total.redemptionNAV.unshift([new Date(current.date).getTime(), current.redemptionNAV, current.dateJalali]);
        total.staticalNAV.unshift([new Date(current.date).getTime(), current.staticalNAV, current.dateJalali]);
        total.netAssetValue.unshift([new Date(current.date).getTime(), current.netAssetValue, current.dateJalali]);
        total.date.unshift(current.dateJalali)


        return total;
      }, { subscriptionNav: [], redemptionNAV: [], staticalNAV: [], netAssetValue: [], date: [] });

      this.data = navListMapped;

      const fundUnitValues = [
        {
          name: "صدور",
          data: navListMapped.subscriptionNav,
          threshold: null,
        },
        {
          name: "ابطال",
          data: navListMapped.redemptionNAV,
          threshold: null,
        }
      ];

      const netAssetValues = [
        {
          name: "",
          data: navListMapped.netAssetValue,
          threshold: null,
        }
      ]

      // this.data.push(

      //   // {
      //   //   name: "آماری",
      //   //   data: navListMapped.staticalNAV,
      //   //   threshold: null,
      //   // }
      // )

      this.drawChart('fundUnitValuesChart', fundUnitValues, navListMapped.date);
      this.drawChart('netAssetValuesChart', netAssetValues, navListMapped.date, false, '#12b549');
    })
  }

  onTabChange(id: number) {
    if (id === 1 && this.chatList()?.length > 0) {
      this.drawChart('netAssetValuesChart', [
        { name: '', data: this.data?.netAssetValue || [], threshold: null }
      ], [], false, '#12b549');
    }
    if (id === 2 && this.chatList()?.length > 0) {
      this.drawChart('fundUnitValuesChart', [
        { name: 'صدور', data: this.data?.subscriptionNav || [], threshold: null },
        { name: 'ابطال', data: this.data?.redemptionNAV || [], threshold: null }
      ], []);
    }
  }

  drawChart(container, series, dateList, showLegend = true, lineColor = '') {

    const _self = this;
    const containerElement = document.getElementById(container);
    if (!containerElement) {
      setTimeout(() => this.drawChart(container, series, dateList, showLegend, lineColor), 0);
      return;
    }
    const option: Highcharts.Options = {
      chart: {
        type: 'area',
        style: {
          fontFamily: _self.fontFamily()
        },

      },
      title: {
        text: ''
      },
      subtitle: {
        text: 'ریال',
        align: 'left',
        y: 0
      },
      legend: {
        enabled: showLegend,
        borderWidth: 0,
        layout: "horizontal",
        align: "center",
        verticalAlign: "bottom",
      },
      xAxis: {
        categories: dateList,
        reversed: false,
        tickInterval: 24 * 3600 * 1000 * 28, //shows data for a month
        labels: {
          formatter: function () {
            return moment(this.value).locale('fa').format("jMMMM jYYYY");
          },
        },
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          useHTML: true,
          formatter: function (value) {
            const val = +value.value
            const isFaNum = _self.fontFamily() === "PeydaWebFaNum"
            let formattedValue = ''

            if (container == 'fundUnitValuesChart') {
              formattedValue = `${Math.round(val / 1_000)}${isFaNum ? '<span>هزار</span>' : '<span>K</span>'}`;
            }
            else {

              if (val >= 1_000_000_000_000) {
                formattedValue = `${Math.round(val / 1_000_000_000_000)}${isFaNum ? '<span>هزار میلیارد</span>' : '<span>T</span>'}`;
              } else if (val >= 1_000_000_000) {
                formattedValue = `${Math.round(val / 1_000_000_000)}${isFaNum ? '<span>میلیارد</span>' : '<span>B</span>'}`;
              } else if (val >= 1_000_000) {
                formattedValue = `${Math.round(val / 1_000_000)}${isFaNum ? '<span>میلیون</span>' : '<span>M</span>'}`;
              } else if (val >= 1_000) {
                formattedValue = `${Math.round(val / 1_000)}${isFaNum ? '<span>هزار</span>' : '<span>K</span>'}`;
              } else {
                formattedValue = Math.round(val).toString();
              }
            }
            return `<div class="d-flex gap-1 ${isFaNum ? 'flex-row-reverse' : ''}">${formattedValue}</div>`
          },
        },
      },

      tooltip: {
        backgroundColor: 'white',
        borderRadius: 9,
        borderWidth: 0,
        shadow: false,
        enabled: true,
        useHTML: true,
        split: false,
        followPointer: true,
        shared: true,
        headerFormat: '<table dir="rtl" class="table text-white mb-0 bg-transparent text-end" >',
        footerFormat: '</table>',
        pointFormatter: function () {

          let header = ''
          if (this.series.name == 'صدور') {
            header = '<tr class="border-0 "><td class="border-0">' + moment(this.x).locale('fa').format("DD/MM/YYYY") + '</td><td class="border-0">تاریخ </td></tr>'
          }
          return (
            header + '<tr class=" border-0" style="padding:2px;direction:rtl">' +
            '<td class="border-0" style="padding:2px 5px;">' +
            _self.decimalPipe.transform(this.y) + ' ریال ' +
            "</td>" +
            '<td class="border-0 " style="padding:2px 5px;color:' +
            this.color +
            '">' +
            this.series.name +
            "</td>" +
            "</tr>"

          );
        },
      },
      plotOptions: {
        series: {
          borderColor: 'red',
          borderWidth: 5,
        },
        area: {
          fillOpacity: 0.5,
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#12b549'],
              [1, '#ffffff']
            ]
          },
          lineColor: lineColor,
          marker: {
            lineColor: '#4C4C4C',
            enabled: false,
            symbol: 'circle',
            fillColor: '#4C4C4C',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      },
      credits: {
        enabled: false
      },
      series: series
    };



    Highcharts.chart(containerElement, option);

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

}

import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { UserSettingsService } from '@client/core/services/user-settings.service';
import { FundService, toGregorian } from '@client/shared';
import { SettingKeys } from '@client/shared/models/user-settings.model';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
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
  selector: 'app-historical-nav',
  templateUrl: './historical-nav.component.html',
  styleUrls: ['./historical-nav.component.scss'],
  standalone: true,
  imports: [HighchartsChartModule],
  providers: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoricalNAVComponent implements OnInit, OnDestroy {
  Highcharts = Highcharts;
  masterChartOptions: Highcharts.Options = null;
  detailChartOptions: Highcharts.Options = null;
  loading$ = new BehaviorSubject(false);
  detailChart = ''
  data;
  dateInChart
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

  @ViewChild('container') container: ElementRef;
  _fundDetail
  @Input() set fundDetail(value) {
    if (value) {
      this._fundDetail = value
      this.getData()
    }
  }
  get fundDetail() {
    return this._fundDetail
  }

  constructor(private fundService: FundService, private userSettingsService: UserSettingsService, private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    this.userSettingsService.get<boolean>(SettingKeys.FaNum).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((value: any) => {
      if (value.faNum) {
        this.fontFamily.set(value.faNum ? 'PeydaWebFaNum' : 'PeydaWeb');
      }
    });
}

  getData() {

    this.filter.reportFilter.mutualFundCode = this.fundDetail.seoRegisterNumber

    let dateList = [];
    this.fundService.getNavList(this.filter).subscribe((navList: any[]) => {
      this.data = [];


      const navListMapped = navList.reduce((total, current) => {

        total.subscriptionNav.unshift([new Date(current.date).getTime(), current.subscriptionNAV, current.dateJalali]);
        total.redemptionNAV.unshift([new Date(current.date).getTime(), current.redemptionNAV, current.dateJalali]);
        total.staticalNAV.unshift([new Date(current.date).getTime(), current.staticalNAV, current.dateJalali]);
        dateList.push(current.dateJalali);
        return total;
      }, { subscriptionNav: [], redemptionNAV: [], staticalNAV: [] });

      this.data.push(
        {
          name: "صدور",
          data: navListMapped.subscriptionNav,
          threshold: null,
        },
        {
          name: "ابطال",
          data: navListMapped.redemptionNAV,
          threshold: null,
        },

        {
          name: "آماری",
          data: navListMapped.staticalNAV,
          threshold: null,
        }
      )

      this.drawChart(this.data, dateList);
    })
  }

  drawChart(series, dateList) {

    const _self = this;
    const option: Highcharts.Options = {
      chart: {
        type: 'area',
        style: {
          fontFamily: _self.fontFamily(),
        },

      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      legend: {
        enabled: true,
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
        headerFormat: '<table dir="rtl" class="table text-white mb-0 bg-transparent" >',
        footerFormat: '</table>',
        pointFormatter: function () {

          let header = ''
          if (this.series.name == 'صدور') {
            header = '<tr class="border-0 "><td class="border-0">' + moment(this.x).locale('fa').format("DD/MM/YYYY") + '</td><td class="border-0">تاریخ </td></tr>'
          }
          return (
            header + '<tr class=" border-0" style="padding:2px;">' +
            '<td class=" border-0" style="padding:2px 5px; ">' +
            _self.decimalPipe.transform(this.y) +
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
        area: {
          fillOpacity: 0.5,
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#FAAF16'],
              [1, '#ffffff']
            ]
          },
        }
      },
      credits: {
        enabled: false
      },
      series: series
    };



    Highcharts.chart('historical-nav-container', option);

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

}

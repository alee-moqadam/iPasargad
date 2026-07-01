import { DatePipe, DecimalPipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';
import { PersianDatetimePipe, FundService } from '@client/shared';
import { RequestsReportService } from './requests-report.service';
import { finalize, map } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subject, takeUntil } from 'rxjs';
import * as echarts from 'echarts/core';
import { DatasetComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { ExcelExportService } from '@client/shared/services/excel-export.service';
import { CssSkeletonComponent } from '@client/shared/components/css-skeleton/css-skeleton.component';
import { ExportService } from '@client/shared/services/export.service';
import { toPersianDate } from '@client/shared/utilities/date-time';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UserSettingsService } from '@client/core/services/user-settings.service';
import { SettingKeys } from '@client/shared/models/user-settings.model';

echarts.use([TitleComponent, TooltipComponent, GridComponent, DatasetComponent, CanvasRenderer, LegendComponent, BarChart]);

@Component({
  selector: 'app-requests-report',
  standalone: true,
  imports: [DecimalPipe, PersianDatetimePipe, NgIf, DatePipe, FontAwesomeModule, NgClass, NgxEchartsDirective, CssSkeletonComponent, NgbTooltip],
  templateUrl: './requests-report.component.html',
  styleUrl: './requests-report.component.scss',
  providers: [DecimalPipe, provideEchartsCore({ echarts }), ExcelExportService],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class RequestsReportComponent implements OnDestroy {

  requestList = signal([])
  aggregationValues = signal(null)
  chartOption: any;
  chartData: any[] = [];
  isLoading = signal(true);
  arrayLength = signal([...Array(3)])
  filterReq;
  ngUnsubscribe$ = new Subject;
  fontFamily = signal('PeydaWeb');
  showMoreStates: { [key: number]: boolean } = {};

  constructor(
    private fundService: FundService,
    private requestsReportService: RequestsReportService,
    private exportService: ExportService,
    private excelExportService: ExcelExportService,
    private userSettingsService: UserSettingsService
  ) { }

  ngOnInit(): void {
    this.requestsReportService.currentFilter.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(filter => {
      if (filter) {
        this.getRequestsReport(filter);
        this.filterReq = filter;
      }
    });

    this.userSettingsService.get<boolean>(SettingKeys.FaNum).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((value: any) => {
      if (value.faNum) {
        this.fontFamily.set(value.faNum ? 'PeydaWebFaNum' : 'PeydaWeb');
      }
    })
  }

  showMore(index: number) {
    this.showMoreStates[index] = !this.showMoreStates[index];
  }

  private getRequestsReport(filter) {

    this.fundService
      .getRequests(filter)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        map((data: any) => {
          if (data && data.result) {
            data.result.forEach((r) => {
              r.createdJalali = r.createdJalali.slice(0, 10)
            })
          }

          return data
        }))
      .subscribe((result: any) => {
        if (result.result) {
          this.requestList.set(result.result);
          this.aggregationValues.set({ totalAggrigatedValue1: result.totalAggrigatedValue1, totalAggrigatedValue2: result.totalAggrigatedValue2 })
          if (this.chartData.length <= 0) {
            this.makeGraphData(result.result);
          }
        } else {
          this.isLoading.set(false)
        }

      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  makeGraphData(data: any[]) {
    this.chartData = data
      .filter((item: any) => item.state === 8)
      .slice(0, 9)
      .map((item: any) => ({
        money: item.transactionType === 2 ? item.amount : -Math.abs(item.confirmedAmount),
        date: item.dateJalali? (item.dateJalali.split(' ')[0]?.split('/')[1] + '/' + item.dateJalali.split(' ')[0]?.split('/')[2]) : ''
      }))
      .reverse();
    this.makeReportChart();

  }


  makeReportChart() {
    const _self = this;
    let xValueAxis = this.chartData.map(item => item.date);
    let yValueAxis = this.chartData.map(item => item.money);
    this.chartOption = {
      grid: {
        right: _self.fontFamily() === "PeydaWebFaNum" ? 60 : 45,
        left: '0',
        bottom: '10%',
        top: '15%'
      },
      xAxis: {
        type: 'category',
        data: xValueAxis,
        axisLabel: {
          fontFamily: _self.fontFamily(),
          fontSize: 13.6,
          color: '#6F52D4',
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
            } else if (value <= -1_000_000) {
              return `(${Math.round(value * -1 / 1_000_000)} ${isFaNum ? 'میلیون' : 'M'})`;
            } else if (value <= -1_000) {
              return `(${Math.round(value * -1 / 1_000)} ${isFaNum ? 'هزار' : 'K'})`;
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
        nameGap: 20,
      },
      series: [
        {
          type: 'bar',
          data: yValueAxis.map(value => ({
            value,
            itemStyle: {
              color: value > 0 ? '#12b549' : '#ef5350',
            },
          })),
          barWidth: '30%',
        },
      ],
      tooltip: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        textStyle: {
          fontFamily: _self.fontFamily(),
          fontSize: 14,
        },
        trigger: 'axis',
        formatter: function (params) {
          return `<span style ='display:flex;align-items:center;flex-direction:column;padding : 5px; font-family: '${_self.fontFamily()}'>
          <bdi class="d-flex justify-content-start" dir="ltr">
           <span class="px-1">ریال</span>
           <span class="fw-bold ${params[0]?.data?.value <0 ? 'text-danger' : 'text-success'}">${params[0]?.data?.value <0 ? '(' : ''}${Math.abs(params[0]?.data?.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${params[0]?.data?.value <0 ? ')' : ''}</span>
          </bdi>
          <span style='margin-top : 8px; font-family: '${_self.fontFamily()}'>${params[0]?.axisValueLabel}</span>
          </span>`;
        },

      },
    } as EChartsOption;

  }

  exportToExcel() {
    const columnMapping: { [key: string]: string } = {
      mutualFundSymbol: 'نام صندوق',
      emissionDateJalali: 'تاریخ تایید گواهی',
      transactionTypeTitle: 'نوع درخواست',
      volume: 'تعداد واحد',
      amount: 'مبلغ',
      ticketNumber: 'شماره پیگیری',
    };
    this.excelExportService.exportToExcel(this.requestList(), columnMapping, 'درخواست ها');
  }

  exportToPdf() {
    this.fundService
      .getRequestsPdf(this.filterReq).subscribe((res: ArrayBuffer) => {
        const faTitle = `لیست درخواست‌ها-${toPersianDate(new Date())}`;
        this.exportService.pdf(res, faTitle);
      })
  }
}

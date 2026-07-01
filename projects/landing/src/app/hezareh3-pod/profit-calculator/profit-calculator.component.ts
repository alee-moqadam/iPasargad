import {
  CommonModule,
  DOCUMENT,
  isPlatformBrowser,
  NgTemplateOutlet
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  inject
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as echarts from 'echarts';
import { commaSeparate } from '../../shared/utilities';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profit-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent, NgTemplateOutlet],
  templateUrl: './profit-calculator.component.html',
  styleUrl: './profit-calculator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfitCalculatorComponent implements OnInit, OnDestroy {
  private readonly httpClient = inject(HttpClient);

  formattedValue = '';
  isShowChart$ = new BehaviorSubject<boolean>(false);
  defaultBaseAmount = 100_000_000;

  private isBrowser: boolean;
  private myChart: echarts.ECharts | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngbModal: NgbModal,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // this.profitCalculation();
  }

  openModal(content: TemplateRef<any>) {
    this.profitCalculation();
    this.ngbModal.open(content, {
      modalDialogClass: 'chart-modal modal-holder modal-dialog modal-dialog-centered',
      backdrop: true,
    });
    // queueMicrotask(() => this.triggerChartRender());
  }

  private triggerChartRender(): void {
    const baseAmount = this.getBaseAmount();
    this.httpClient.post<any>(
      'https://clientapi.ipasargad.ir/api/calculator/getcalculatedinvestmentdata',
      { baseAmount, mutualFundId: 1 }
    ).subscribe({
      next: (response) => {
        this.isShowChart$.next(true);
        queueMicrotask(() => {
          const chartEl = this.document.getElementById('myChart');
          if (chartEl) {
            this.setupChart(response.result[0].profitPlans, baseAmount);
          }
        });
      },
      error: () => this.isShowChart$.next(false),
    });
  }

  ngOnDestroy(): void {
    this.myChart?.dispose();
  }

  formatNumber(value: string): void {
    let cleanedValue = value.replace(/[^0-9]/g, '');
    if (!cleanedValue || cleanedValue === '0') {
      this.formattedValue = '';
      return;
    }
    if (cleanedValue.startsWith('0')) {
      cleanedValue = cleanedValue.replace(/^0+/, '');
      if (!cleanedValue) {
        this.formattedValue = '';
        return;
      }
    }
    const num = parseInt(cleanedValue, 10);
    if (isNaN(num) || num < 0) {
      this.formattedValue = '';
      return;
    }
    this.formattedValue = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value.replace(/[^0-9]/g, '');
    const cleaned = input.replace(/^0+/, '') || '';
    this.formattedValue = cleaned ? parseInt(cleaned, 10).toLocaleString('en-US') : '';
  }

  restrictPaste(event: ClipboardEvent): void {
    const text = event.clipboardData?.getData('text') || '';
    const digitsOnly = text.replace(/\D/g, '');
    if (digitsOnly.startsWith('0') || digitsOnly === '0' || text !== digitsOnly) {
      event.preventDefault();
    }
  }

  restrictToNumbers(event: KeyboardEvent): void {
    const key = event.key;
    const input = event.target as HTMLInputElement;
    const selectionStart = input.selectionStart ?? 0;
    const currentValue = input.value.replace(/[^0-9]/g, '');

    if (key === '0' && (!currentValue || selectionStart === 0)) {
      event.preventDefault();
      return;
    }

    const allowed = ['Backspace', 'Tab', 'Enter', 'Delete'];
    const ctrlKeys = ['a', 'c', 'v', 'x', 'z'];
    if (allowed.includes(key) || (event.ctrlKey && ctrlKeys.includes(key.toLowerCase()))) return;

    if (!/^[0-9]$/.test(key)) {
      event.preventDefault();
    }
  }

  private getBaseAmount(): number {
    return this.formattedValue
      ? parseInt(this.formattedValue.replace(/,/g, ''), 10)
      : this.defaultBaseAmount;
  }

  profitCalculation(): void {
    this.isShowChart$.next(false);
    const baseAmount = this.getBaseAmount();
    this.httpClient.post<any>(
      'https://clientapi.ipasargad.ir/api/calculator/getcalculatedinvestmentdata',
      { baseAmount, mutualFundId: 1 }
    ).subscribe({
      next: (response) => {
        this.isShowChart$.next(true);
        // setTimeout(() => this.setupChart(response.result[0].profitPlans?.filter((e => !e.title.includes('موثر'))), baseAmount), 1);
        setTimeout(() => this.setupChart(response.result[0].profitPlans, baseAmount), 1);
      },
      error: () => this.isShowChart$.next(false),
    });
  }

  // private setupChart(data: any[], baseAmount: number): void {
  //   if (!this.isBrowser) return;

  //   const xAxisLabels = ['شروع', ...data.map(item => item.title)];
  //   const yAxisData = [{ value: baseAmount }, ...data.map(item => ({
  //     value: item.totalAmount,
  //     rawData: item,
  //   }))];

  //   const chartDom = this.document.getElementById('myChart');
  //   if (!chartDom) return;

  //   // Clean previous chart
  //   if (this.myChart) {
  //     this.myChart.dispose();
  //   }

  //   const options: echarts.EChartsOption = {
  //     title: {
  //       text: 'میزان سود شما در گذر زمان',
  //       left: 'center',
  //       top: 10,
  //       textStyle: {
  //         color: '#01040980',
  //         fontFamily: 'IRANSansX',
  //         fontSize: 16,
  //         fontWeight: 'bold',
  //       },
  //     },
  //     backgroundColor: 'transparent',
  //     grid: {
  //       top: 50,
  //       bottom: 50,
  //       left: 50,
  //       right: 50,
  //       containLabel: false,
  //     },
  //     tooltip: {
  //       trigger: 'axis',
  //       backgroundColor: '#fff',
  //       borderColor: '#6633cc',
  //       borderWidth: 1,
  //       textStyle: { fontFamily: 'IRANSansX', fontSize: 14 },
  //       position: 'top',
  //       formatter: (params: any) => {
  //         const param = params[0];
  //         if (!param?.data?.rawData) return '';
  //         return `
  //           <div style="font-size: 10px; text-align: right; font-family: 'IRANSansX'">${param.axisValueLabel}</div>
  //           <div style="font-size: 10px; text-align: right; font-family: 'IRANSansX'">
  //             <div>${param.seriesName}</div>
  //             <div class="fw-bold">${commaSeparate(param.value)} تومان</div>
  //           </div>
  //           <div class="align-items-center d-flex justify-content-end flex-row-reverse" style="font-size: 10px; text-align: right; font-family: 'IRANSansX'">
  //             <span>درصد سود : <span class="fw-bold">${commaSeparate(param.data.rawData.profitPercent)}</span> %</span>
  //           </div>
  //         `;
  //       },
  //     },
  //     xAxis: {
  //       type: 'category',
  //       data: xAxisLabels,
  //       boundaryGap: false,
  //       axisLine: { show: false, lineStyle: { color: '#fff' } },
  //       axisTick: { show: false },
  //       axisLabel: {
  //         color: '#6633cc',
  //         padding: [10, 0, 0, 0],
  //         fontFamily: 'IRANSansX',
  //       },
  //     },
  //     yAxis: {
  //       splitNumber: 3,
  //       min: baseAmount,
  //       axisLabel: { show: false },
  //       splitLine: {
  //         show: true,
  //         lineStyle: { type: 'dashed', color: '#E0E0E066', width: 1 },
  //       },
  //     },
  //     series: [
  //       {
  //         name: 'ارزش دارایی پس از سوددهی',
  //         type: 'line',
  //         data: yAxisData,
  //         smooth: false,
  //         color: '#9BBDFF',
  //         symbol: '',
  //         symbolSize: 10,
  //         lineStyle: { width: 3 },
  //         areaStyle: {
  //           color: {
  //             type: 'linear',
  //             x: 0,
  //             y: 0,
  //             x2: 1,
  //             y2: 0,
  //             colorStops: [
  //               { offset: 0, color: '#FF8D98ff' },
  //               { offset: 0.9, color: '#0055FF66' },
  //               { offset: 1, color: 'transparent' },
  //             ],
  //           },
  //         },
  //         label: {
  //           show: true,
  //           formatter: (params) => `{a|${commaSeparate(params.value)}}`,
  //           rich: {
  //             a: {
  //               fontFamily: 'IRANSansX',
  //               fontWeight: 'bold',
  //               color: '#6633cc',
  //             },
  //           },
  //         },
  //         labelLayout: { hideOverlap: true },
  //       },
  //     ],
  //   };

  //   this.myChart = echarts.init(chartDom);
  //   this.myChart.setOption(options);
  // }

  private setupChart(data: any[], baseAmount: number): void {
    if (!this.isBrowser) return;

    const normalData = data.filter(item => !item.title.includes('موثر'));
    const effectiveData = data.filter(item => item.title.includes('موثر'));

    const xAxisLabels = ['شروع', ...normalData.map(item => item.title)];

    const normalSeriesData = [
      { value: baseAmount },
      ...normalData.map(item => ({
        value: item.totalAmount,
        rawData: item,
      }))
    ];

    const effectiveSeriesData = [
      { value: baseAmount },
      ...effectiveData.map(item => ({
        value: item.totalAmount,
        rawData: item,
      }))
    ];

    const chartDom = this.document.getElementById('myChart');
    if (!chartDom) return;

    if (this.myChart) {
      this.myChart.dispose();
    }

    const options: echarts.EChartsOption = {
      title: {
        text: 'میزان سود شما در گذر زمان',
        left: 'center',
        top: 10,
        textStyle: {
          color: '#01040980',
          fontFamily: 'IRANSansX',
          fontSize: 16,
          fontWeight: 'bold',
        },
      },
      backgroundColor: 'transparent',
      grid: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
        containLabel: false,
      },
      tooltip: {
        trigger: 'axis',
        
        backgroundColor: '#353535',
        borderColor: '#000000',
        borderWidth: 1,
        textStyle: { fontFamily: 'IRANSansX', fontSize: 14,color:'#fff' },
        position: 'top',
        formatter: (params: any) => {
          return params.map((param: any) => {
            if (!param?.data?.rawData) return '';

            return `
            <div style="font-size: 10px; text-align: right; font-family: 'IRANSansX'">${param.seriesName}</div>
            <div style="font-size: 10px; text-align: right; font-family: 'IRANSansX'">
              <div class="fw-bold">${commaSeparate(param.value)} تومان</div>
            </div>
            <div class="align-items-center d-flex justify-content-end flex-row-reverse" style="font-size: 10px; text-align: right; font-family: 'IRANSansX'">
              <span>درصد سود :
                <span class="fw-bold">
                  ${commaSeparate(param.data.rawData.profitPercent)}
                </span> %
              </span>
            </div>
          `;
          }).join('<hr style="margin:5px 0;">');
        },
      },
      xAxis: {
        type: 'category',
        data: xAxisLabels,
        boundaryGap: false,
        axisLine: { show: false, lineStyle: { color: '#fff' } },
        axisTick: { show: false },
        axisLabel: {
          color: '#6633cc',
          padding: [10, 0, 0, 0],
          fontFamily: 'IRANSansX',
        },
      },
      yAxis: {
        splitNumber: 3,
        min: baseAmount,
        axisLabel: { show: false },
        splitLine: {
          show: true,
          lineStyle: { type: 'dashed', color: '#E0E0E066', width: 1 },
        },
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 75,
        selectedMode: true,
        icon: 'rect',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          // color: '#6633cc',
          fontFamily: 'IRANSansX',
          fontSize: 10,
        }
      },
      series: [
        {
          name: 'با تقسیم سود',
          type: 'line',
          data: normalSeriesData,
          smooth: true,
          color: '#3dc55e',
          symbol: '',
          symbolSize: 8,
          lineStyle: { width: 3 },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#84cf79' },
                { offset: 1, color: '#84cf7900' },
                // { offset: 1, color: 'transparent' },
              ],
            },
          },
          label: {
            show: true,
            position: 'bottom',
            distance: 5,
            backgroundColor: '#ffff',
            borderColor: '#ddd',
            borderWidth: 1,
            borderRadius: 5,
            padding: [5, 5, 2, 5],
            // shadowBlur: 5,
            // shadowColor: 'rgba(0,0,0,0.15)',
            // rotate: 45,
            // offset: [0, 20],
            // align: 'left',
            // verticalAlign: 'top',
            // overflow: 'truncate',
            formatter: (params) => {
              if ([0,2,3].includes(params.dataIndex)) {
                return '';
              }

              return `{a|${commaSeparate(params.value)}}`;
            },
            rich: {
              a: {
                fontFamily: 'IRANSansX',
                fontWeight: 'bold',
                fontSize: 11,
                color: '#3b3b3b',
                // color: '#3dc55e',
              },
            },
          },
          labelLayout: { hideOverlap: true },
        },
        {
          name: 'با سرمایه‌گذاری مجدد',
          type: 'line',
          data: effectiveSeriesData,
          smooth: false,
          color: '#adfe6a',
          symbol: '',
          symbolSize: 8,
          lineStyle: { width: 3 },
          // areaStyle: {
          //   color: {
          //     type: 'linear',
          //     x: 0,
          //     y: 0,
          //     x2: 1,
          //     y2: 0,
          //     colorStops: [
          //       { offset: 0, color: '#FF8D98ff' },
          //       { offset: 0.9, color: '#0055FF66' },
          //       { offset: 1, color: 'transparent' },
          //     ],
          //   },
          // },
          label: {
            show: true,
            position: 'top',
            distance: 5,
            backgroundColor: '#ffff',
            borderColor: '#ddd',
            // borderWidth: 1,
            // borderRadius: 5,
            padding: [5, 5, 2, 5],
            // formatter: (params) => `{a|${commaSeparate(params.value)}}`,
            formatter: (params) => {
              if (params.dataIndex === 2 || params.dataIndex === 3) {
                return '';
              }

              return `{a|${commaSeparate(params.value)}}`;
            },
            rich: {
              a: {
                fontFamily: 'IRANSansX',
                fontWeight: 'bold',
                fontSize: 11,
                color: '#6633cc',
                // textShadowColor: 'rgba(0, 0, 0, 0.34)',
                // textShadowBlur: 5,
                // textShadowOffsetX: 1,
                // textShadowOffsetY: 0
              },
            },
          },
          labelLayout: { hideOverlap: true },
        },
      ],
    };

    this.myChart = echarts.init(chartDom);
    this.myChart.setOption(options);
  }
}

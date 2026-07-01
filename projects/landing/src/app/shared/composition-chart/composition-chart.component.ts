import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import * as echarts from 'echarts/core';
import { DatasetComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { BehaviorSubject } from 'rxjs';
echarts.use([TitleComponent, TooltipComponent, GridComponent, DatasetComponent, PieChart, CanvasRenderer, LegendComponent]);

@Component({
  selector: 'app-composition-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './composition-chart.component.html',
  styleUrl: './composition-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideEchartsCore({ echarts })],
})
export class CompositionChartComponent implements OnInit {
  @Input() lastMutualFund;
  chartOptions;
  colors = [
    '#66B0A1',
    '#F76D6A',
    '#5DA7C0',
    '#FFD54F',
    '#9B59B6',
    '#F06292',
    '#D27D4A',
    '#A4B0B9'
  ]
  isShowChart$ = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;
  myChart2;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  ngOnInit(): void {
    this.drawChart(this.lastMutualFund);

  }
  private drawChart(data: any[]) {
    if (this.isBrowser) {
      this.isShowChart$.next(true);
      setTimeout(() => {
        const chartDom = document.getElementById('myChart2');
        this.myChart2 = echarts.init(chartDom);
        this.chartOptions =
          {
            // tooltip: {
            //   trigger: 'item'
            // },
            // legend: {
            //   top: '5%',
            //   left: 'center'
            // },
            // series: [
            //   {
            //     name: 'Access From',
            //     type: 'pie',
            //     radius: ['40%', '70%'],
            //     avoidLabelOverlap: false,
            //     padAngle: 5,
            //     itemStyle: {
            //       borderRadius: 10,
            //     },
            //     label: {
            //       show: false,
            //       position: 'center'
            //     },
            //     emphasis: {
            //       label: {
            //         show: true,
            //         fontSize: 40,
            //         fontWeight: 'bold'
            //       }
            //     },
            //     labelLine: {
            //       show: false
            //     },
            //     data: [
            //       { value: 1048, name: 'Search Engine' },
            //       { value: 735, name: 'Direct' },
            //       { value: 580, name: 'Email' },
            //       { value: 484, name: 'Union Ads' },
            //       { value: 300, name: 'Video Ads' }
            //     ]
            //   }
            // ]
            tooltip: {
              show: false
            },
            legend: {
              show: false
            },
            series: [
              {
                type: 'pie',
                radius: ['80%'],
                silent: true,
                label: { show: false },
                data: [
                  {
                    value: 1,
                    itemStyle: {
                      color: 'rgba(255, 255, 255, 0)',
                      borderColor: '#cdd7e1',
                      borderWidth: 1
                    }
                  }
                ]
              },
              {
                color: this.colors,
                minAngle: 3,
                name: 'ترکیب دارایی صندوق',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                padAngle: 5,
                itemStyle: {
                  borderRadius: 8,
                },

                labelLine: {
                  show: false
                },
                data: data.map(item => item.value),
                emphasis: {
                  scale: false,
                  label: {
                    show: false,
                  },


                },
              },

            ]
          } as EChartsOption;
        this.myChart2.setOption(this.chartOptions);
        this.cdr.detectChanges();
      }, 1);

    }

  }


}

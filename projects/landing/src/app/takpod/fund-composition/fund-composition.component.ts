import { isPlatformBrowser, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { DatasetComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([TitleComponent, TooltipComponent, GridComponent, DatasetComponent, PieChart, CanvasRenderer, LegendComponent]);

@Component({
  selector: 'app-fund-composition',
  standalone: true,
  imports: [NgxEchartsDirective, NgIf, NgStyle],
  templateUrl: './fund-composition.component.html',
  styleUrl: './fund-composition.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideEchartsCore({ echarts })],
})
export class FundCompositionComponent {
  isBrowser: boolean;
  chartOptions: EChartsOption;
  colors = ['#ffd54f', '#6886fc','#9b59b6', '#5da7c0', '#f76d6a'];

  constructor(private cdr: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }


  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.drawChart([
      {
        name: 'سپرده بانکی',
        value: 3.91,
        color: '#f76d6a'
      },
      {
        name: 'پنج سهم با بیشترین وزن',
        value: 22.16,
        color: '#5da7c0'
      },
      {
        name: 'سایر سهام',
        value: 69.33,
        color: '#9b59b6'
      },        
      {
        name: 'گواهی سپرده طلا',
        value: 4.03,
        color: '#6886fc'
      },
      {
        name: 'سایر دارایی‌ها',
        value: 0.57,
        color: '#ffd54f'
      },
      ]);
    } else {
      //
    }
  }


  private drawChart(data: any[]) {
    this.chartOptions =
      {
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
    this.cdr.detectChanges();

  }



}

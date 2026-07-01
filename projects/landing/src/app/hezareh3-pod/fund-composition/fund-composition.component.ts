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
  colors = ['#4F76C9', '#6EC2C2', '#57BF5C', '#E54CB6', '#76818A'];

  constructor(private cdr: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }


  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.drawChart( [{
        name: 'سهام',
        value: 8.9,
        color: '#4F76C9'
      }, {
        name: 'اوراق مشارکت',
        value: 43.92,
        color: '#6EC2C2'

      }, {
        name: 'سپرده بانکی',
        value: 42.11,
        color: '#57BF5C'

      }, {
        name: 'پنج سهم برتر',
        value: 3.57,
        color: '#E54CB6'

      }, {
        name: 'سایر دارایی',
        value: 1.5,
        color: '#76818A'
      }]);
    } else {
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

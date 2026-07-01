import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import * as echarts from 'echarts/core';
import { DatasetComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
echarts.use([TitleComponent, TooltipComponent, GridComponent, DatasetComponent, PieChart, CanvasRenderer, LegendComponent]);
@Component({
  selector: 'app-industry-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './industry-chart.component.html',
  styleUrl: './industry-chart.component.scss',
  providers: [provideEchartsCore({ echarts })],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndustryChartComponent implements OnInit {
  chartOptions = null;
  @Input() sectors;

  /**
   *
   */
  constructor(private cdr: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.drawChart(this.sectors);
  }
  private drawChart(data) {
    const _data = data.map(ra => ({
      value: ra.percent
    }));
    let _colors = data.map(ra => ra.color)
    this.chartOptions =
      {
        color: _colors,
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
                  borderColor: '#cdd7e1',
                  borderWidth: 1
                }
              }
            ]
          },
          {
            minAngle: 3,
            name: 'ترکیب صنایع صندوق',
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
            data: _data,
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

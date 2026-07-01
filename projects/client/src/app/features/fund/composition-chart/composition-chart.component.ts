import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, signal } from '@angular/core';
import * as echarts from 'echarts/core';
import { DatasetComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
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
    '#3a3f42ff', 
    '#0734fa93', 
    '#ff000086', 
    '#6af7e0ad', 
  ]
  constructor(private cdr: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.drawChart(this.lastMutualFund);      
    }, 10);
  }

  private drawChart(data:any[]) {
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
            color:this.colors,
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
            data: data.filter(e => e?.value > 0).map(item => ({
               value: item.value,
               itemStyle: { color: item.color }
            })),
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

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, input, OnDestroy, OnInit, signal } from '@angular/core';
import { MaskNumberDirective, MaskNumberPipe, CustomerRequestCompositionModel, MaskingNumberService } from '@client/shared';
import * as echarts from 'echarts/core';
import { DatasetComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { SettingKeys } from '@client/shared/models/user-settings.model';
import { Subject, takeUntil } from 'rxjs';
import { UserSettingsService } from '@client/core/services/user-settings.service';
echarts.use([TitleComponent, TooltipComponent, GridComponent, DatasetComponent, PieChart, CanvasRenderer, LegendComponent]);
@Component({
  selector: 'app-usr-composition-chart',
  standalone: true,
  imports: [MaskNumberDirective, NgxEchartsDirective],
  templateUrl: './usr-composition-chart.component.html',
  styleUrl: './usr-composition-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideEchartsCore({ echarts })
  ]
})
export class UsrCompositionChartComponent implements OnInit, OnDestroy {
  CustomerComposition = input<CustomerRequestCompositionModel[]>()

  chartOptions: any;
  showChart = signal(false)
  ngUnsubscribe$ = new Subject;
  fontFamily = signal('');

  constructor(private maskingService: MaskingNumberService,  private userSettingsService: UserSettingsService, private maskNumberPipe: MaskNumberPipe , private cdr : ChangeDetectorRef) { }

  ngOnInit(): void {
    if(this.CustomerComposition().length > 0){
      this.drawRequestAllocationChart(this.CustomerComposition());
      this.cdr.detectChanges();
    }
    this.userSettingsService.get<boolean>(SettingKeys.FaNum).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((value: any) => {
      if (value.faNum) {
        this.fontFamily.set(value.faNum ? 'PeydaWebFaNum' : 'PeydaWeb');
      }
    });
  }

  drawRequestAllocationChart(requestComposition: CustomerRequestCompositionModel[]) {
    const _self = this;
    const _data = requestComposition.map(ra => ({
      name: ra.mutualFundSymbol,
      value: ra.netValue,
      mutualFundCode: ra.mutualFundCode
    }));
    this.chartOptions = {
      tooltip: {
        show: false
      },
      legend: {
        show: false
      },
      series: [
        // Outer border ring
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
                borderColor: '#737D87',
                borderWidth: 1
              }
            }
          ]
        },
        {
          name: 'ترکیب صندوق‌ها',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          // color:'#57BF5C',
          color: _data.map((e:any) => {            
            switch (e?.mutualFundCode) {
              case "11168":
                return '#57BF5C'
              case "12365":
                return '#1661fa'
              case "12462":
                return '#f6aa1c'
              case "12227":
                return '#6633CC'
              default:
                return '#cccccc'
            }
          }),
          padAngle: 5,
          itemStyle: {
            borderRadius: 5
          },
          label: {
            show: false,
            position: 'center'
          },
          data: [
            ..._data
          ],
          emphasis: {
            scale:false,
            label: {
              show: true,
              fontSize: 10.4,
              fontWeight: 'regular',
              fontFamily: _self.fontFamily(),
              color: '#fff',
              position: 'inside',  
            },            
          },        
        }
      ],

    } as EChartsOption;


    this.showChart.set(true)
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

}

import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';
import { FundService, PersianDatetimePipe, ExcelExportService, CssSkeletonComponent } from '@client/shared';
import { DecimalPipe } from '@angular/common';
import { DividendReportService } from './dividend-report.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-dividend-report',
  standalone: true,
  imports: [DecimalPipe, PersianDatetimePipe,FontAwesomeModule , CssSkeletonComponent],
  templateUrl: './dividend-report.component.html',
  styleUrl: './dividend-report.component.scss',
  providers: [ExcelExportService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DividendReportComponent implements OnDestroy {

  requestList = signal([])
  $destory = new Subject();
  isLoading = signal(true);
  arrayLength = signal([...Array(3)]);
  aggregationValues = signal(null)

  constructor(private fundService: FundService, private dividendReportService: DividendReportService,
    private excelExportService: ExcelExportService
  ) { }

  ngOnInit(): void {
    this.dividendReportService.currentFilter.pipe(takeUntil(this.$destory)).subscribe(filter => {
      if (filter) {
        this.getDividendReport(filter)
      }
    });
  }

  private getDividendReport(filter) {
    this.fundService
      .getFlatFundDividendCardexes(filter)
      .pipe(
        finalize(()=>this.isLoading.set(false))
      )
      .subscribe((res: any) => {
        if(res){
          this.requestList.set(res.result);
          this.aggregationValues.set({totalAggrigatedValue1:res.totalAggrigatedValue1, totalAggrigatedValue4:res.totalAggrigatedValue4, })
        }else{
          this.isLoading.set(false)
        }
      });
  }

  exportToExcel(){
    const columnMapping: { [key: string]: string } = {
      dateJalali: 'تاریخ',
      mutualFundSymbol: 'صندوق',
      profitUnit:'تعداد واحد',
      profit: 'مبلغ واریزی',
    };
    this.excelExportService.exportToExcel(this.requestList(),columnMapping, 'تقسیم سودها');
  }

  ngOnDestroy(): void {
    this.$destory.next(0);
    this.$destory.complete();
  }
}

import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';
import { FundService, PersianDatetimePipe, ExcelExportService, CssSkeletonComponent } from '@client/shared';
import { DecimalPipe, NgClass } from '@angular/common';
import { AccountingReportService } from './accounting-report.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-accounting-report',
  standalone: true,
  imports: [DecimalPipe, PersianDatetimePipe,FontAwesomeModule , CssSkeletonComponent , NgClass],
  templateUrl: './accounting-report.component.html',
  styleUrl: './accounting-report.component.scss',
  providers: [ExcelExportService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingReportComponent implements OnDestroy{

  requestList = signal([])
  $destroy = new Subject();
  isLoading = signal(true);
  arrayLength = signal([...Array(3)])
  showMoreStates: { [key: number]: boolean } = {};

  constructor(private fundService: FundService, private accountingReportService: AccountingReportService,
    private excelExportService: ExcelExportService
  ) { }

  ngOnInit(): void {
    this.accountingReportService.currentFilter.pipe(takeUntil(this.$destroy)).subscribe(filter => {
      if (filter) {
        this.getTurnoverReport(filter)
      }
    });
  }

  private getTurnoverReport(filter) {
    this.fundService
      .getCustomerTurnover(filter)
      .pipe(
        finalize(()=>this.isLoading.set(false))
      )
      .subscribe((res: any) => {
        this.requestList.set(res);
      });
  }

  showMore(index: number, e: HTMLElement) {
    this.showMoreStates[index] = !this.showMoreStates[index];
    // e.classList.toggle('mobile-truncate');
  }

  exportToExcel(){
    const columnMapping: { [key: string]: string } = {
      voucherDateJalali:'تاریخ',
      description: 'توضیح سند',
      debit: 'بدهکار',
      credit: 'بستانکار',
      balance: 'مانده',
    };
    this.excelExportService.exportToExcel(this.requestList(),columnMapping, 'گردش حساب');
  }

  ngOnDestroy(): void {
    this.$destroy.next(0);
    this.$destroy.complete();
  }
}

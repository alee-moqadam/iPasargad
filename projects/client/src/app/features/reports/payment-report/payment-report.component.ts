import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';
import { FundService, PersianDatetimePipe, ExcelExportService, CssSkeletonComponent, PodService, CommonPaymentTypeEnum } from '@client/shared';
import { DecimalPipe, NgIf } from '@angular/common';
import { PaymentReportService } from './payment-report.service';
import { finalize, forkJoin, Subject, takeUntil } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-report',
  standalone: true,
  imports: [DecimalPipe, PersianDatetimePipe, FontAwesomeModule, NgIf, NgbTooltip, CssSkeletonComponent],
  templateUrl: './payment-report.component.html',
  styleUrl: './payment-report.component.scss',
  providers: [ExcelExportService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentReportComponent implements OnDestroy {

  requestList = signal([]);
  destroy$ = new Subject();
  isLoading = signal(true);
  arrayLength = signal([...Array(3)]);
  aggregationValues = signal(null);
  commonPaymentTypeEnum = CommonPaymentTypeEnum;

  showMoreStates: { [key: number]: boolean } = {};

  constructor(
    private fundService: FundService,
    private podService: PodService,
    private paymentReportService: PaymentReportService,
    private excelExportService: ExcelExportService,private router: Router,
  ) { };

  ngOnInit(): void {
    this.paymentReportService.currentFilter.pipe(takeUntil(this.destroy$)).subscribe((filter) => {
      if (filter) {
        this.getData(filter)
      }
    });
  }

  private getData(filter) {

    this.isLoading.set(true);
    forkJoin([
      this.fundService.getReceivesAndOnlinePayments(filter.transfersFilter),
      // this.podService.getPodTransferList(filter.podTransfersFilter)
    ])
      .pipe(
        finalize(() => this.isLoading.set(false))
      ).subscribe(([transactions]) => {
        this.aggregationValues.set({ totalAggrigatedValue1: transactions.totalAggrigatedValue1 })
        let sortType = filter.transfersFilter.optionalFilter.sort[0].dir
        let sortField = filter.transfersFilter.optionalFilter.sort[0].field

        let fullList = [...transactions.result];

        switch (true) {
          case sortType == 'desc' && sortField == 'date':
            fullList = fullList.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any))
            break;
          case sortType == 'asc' && sortField == 'date':
            fullList = fullList.sort((a, b) => (new Date(a.date) as any) - (new Date(b.date) as any))
            break;
          case sortType == 'asc' && sortField == 'amount':
            fullList = fullList.sort((a, b) => (a.amount - b.amount))
            break;
          case sortType == 'desc' && sortField == 'amount':
            fullList = fullList.sort((a, b) => (b.amount - a.amount))
            break;
          default:
            fullList = fullList.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any))
            break;
        }
        if(filter.transfersFilter.reportFilter.state != -1) {
          const stateTitles = filter.transfersFilter.reportFilter.state == 2 ? ['ناموفق', 'رد شده'] : ['موفق']
          fullList = fullList.filter(item => stateTitles.includes(item.stateTitle))
        }
        this.requestList.set(fullList)

      })
  }

  showMore(index: number) {
    this.showMoreStates[index] = !this.showMoreStates[index];
  }

  getRequestUiDetails(request) {

    const stateIconMap = {
      "موفق": 'circle-check',
      "رد شده": 'circle-xmark',
      "ناموفق": 'circle-xmark',
      "در حال بررسی": 'stopwatch',
      "در انتظار": 'stopwatch',
      "نامشخص": 'stopwatch',
      default: 'stopwatch'
    };

    const stateBgClassMap = {
      "موفق": 'bg-success-200',
      "رد شده": 'bg-danger-200',
      "ناموفق": 'bg-danger-200',
      "در حال بررسی": 'bg-primary-200',
      "در انتظار": 'bg-primary-200',
      "نامشخص": 'bg-primary-200',
      default: 'bg-primary-200'
    };
    const stateTextClassMap = {
      "موفق": 'text-success',
      "رد شده": 'text-danger',
      "ناموفق": 'text-danger',
      "در حال بررسی": 'text-primary',
      "در انتظار": 'bg-primary-200',
      "نامشخص": 'bg-primary-200',
      default: 'text-primary'
    };

    return {
      reqTypeIcon: request.type === CommonPaymentTypeEnum.Receipt
        ? 'money-bill-wave'
        : request.type === CommonPaymentTypeEnum.Online
          ? 'desktop'
          : 'credit-card',
      reqTypeTitle: request.type === CommonPaymentTypeEnum.Receipt
        ? 'فیش واریزی'
        : request.type === CommonPaymentTypeEnum.Online
          ? 'درگاه بانکی'
          : 'پرداخت مستقیم',
      reqStatusIcon: stateIconMap[request.stateTitle] || stateIconMap.default,
      reqStatusBgClass: stateBgClassMap[request.stateTitle] || stateBgClassMap.default,
      reqStatusTextClass: stateTextClassMap[request.stateTitle] || stateTextClassMap.default,
    };
  }

  exportToExcel() {
    const columnMapping: { [key: string]: string } = {
      mutualFundSymbol: 'نام صندوق',
      amount: 'مبلغ',
      dateJalali: 'تاریخ',
      traceNo: 'کد پیگیری',
      gatewayTitle: 'نوع واریز',
      accountNumber: 'شماره حساب مقصد فیش',
      bankName: 'نام بانک',
    };
    this.excelExportService.exportToExcel(this.requestList(), columnMapping, 'واریزها');
  }


  ngOnDestroy(): void {
    this.destroy$.next(0);
    this.destroy$.complete();
  }
}

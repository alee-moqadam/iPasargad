import { CommonModule, DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RequestTypeEnum, PersianDatetimePipe, FundService, NgbDateToStringGregorian } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCalendar, NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import _ from 'lodash';
import { Subject, map, takeUntil } from 'rxjs';
import { SubscriptionFundModalComponent } from '../subscription-fund-modal/subscription-fund-modal.component';
import { GlobalEventService } from '@client/core/services/global-event.service';

@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule, NgbNavModule, RouterLink, PersianDatetimePipe, DecimalPipe, NgTemplateOutlet ,CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentActivityComponent implements OnInit, OnDestroy {
  requestTypeEnum = RequestTypeEnum;
  recentActivity = signal([]);
  onlinePayments = signal([]);
  flatFundDividendCardexes = signal([]);
  lastDate;
  threeYearsAgo = null
  nextWeek = null;

  constructor(private fundService: FundService, private ngbModal: NgbModal, private calendar: NgbCalendar, private globalEventService: GlobalEventService) {
    this.threeYearsAgo = NgbDateToStringGregorian(calendar.getPrev(calendar.getToday(), 'y', 3));
    this.nextWeek = NgbDateToStringGregorian(calendar.getNext(calendar.getToday(), 'd', 7));
  }

  private destroy$ = new Subject<void>();
  private getCustomerRequestModel() {
    return {
      reportFilter: { startDate: this.threeYearsAgo, endDate: this.nextWeek, phrase: '', mutualFundCode: null, requestTransactionType: -1, requestTransactionState: -1 },
      optionalFilter: { take: 15, skip: 0, page: 1, value: '', sort: [{ field: 'id', dir: 'desc' }] },
      branchId: 0
    }
  };
  private getOnlinePaymentsModel() {
    return {
      reportFilter: { dateFilter: { startDate: this.threeYearsAgo, endDate: this.nextWeek }, phrase: '', nationalId: '', mutualFundCode: null, mutualFundId: 0, bankDepositId: 0, banKNameId: 0, gateway: 0, state: 0 },
      optionalFilter: { take: 15, skip: 0, page: 1, value: '', sort: [{ field: '', dir: '' }] },
      branchId: 0
    }
  };
  private getFlatFundDividendCardexesModel() {
    return {
      reportFilter: { dateFilter: { startDate: this.threeYearsAgo, endDate: this.nextWeek }, phrase: '', mutualFundCode: '11168', requestTransactionType: 1, requestTransactionState: 1 },
      optionalFilter: { take: 15, skip: 0, page: 1, value: '', sort: [{ field: '', dir: '' }] },
      branchId: 0
    }
  };

  ngOnInit(): void {
    this.fetchData(this.fundService.getRequests.bind(this.fundService), this.getCustomerRequestModel(), this.recentActivity);
    this.fetchData(this.fundService.getOnlinePayments.bind(this.fundService), this.getOnlinePaymentsModel(), this.onlinePayments);
    this.fetchData(this.fundService.getFlatFundDividendCardexes.bind(this.fundService), this.getFlatFundDividendCardexesModel(), this.flatFundDividendCardexes);

    this.globalEventService.onReceiptConfirmationClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.refreshData();
      });
  }

  private fetchData(serviceMethod, model, stateSignal): void {
    serviceMethod(model)
      .pipe(
        map((data: any) => {
          if (!data || !data.result || !Array.isArray(data.result)) return [];
          const grouped = _(data['result']).filter(x => x.date).groupBy(x => x.date.split('T')[0]).value();
          const result = Object.entries(grouped).map(([date, data]) => ({ date, data }));
          return result;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result: any[]) => {
        stateSignal.set(result);
      });
  }

  public showFoundModal(requestType): void {
    const modalRef = this.ngbModal.open(SubscriptionFundModalComponent, { modalDialogClass: 'modal-holder modal-dialog-centered', size: 'md', backdrop: 'static' });
    modalRef.componentInstance.requestTypeEnum = requestType;
  }

  private refreshData(): void {
    // Refresh all data when receipt is confirmed
    this.fetchData(this.fundService.getRequests.bind(this.fundService), this.getCustomerRequestModel(), this.recentActivity);
    this.fetchData(this.fundService.getOnlinePayments.bind(this.fundService), this.getOnlinePaymentsModel(), this.onlinePayments);
    this.fetchData(this.fundService.getFlatFundDividendCardexes.bind(this.fundService), this.getFlatFundDividendCardexesModel(), this.flatFundDividendCardexes);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

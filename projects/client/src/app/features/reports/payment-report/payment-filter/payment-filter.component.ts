import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaymentReportService } from '../payment-report.service';
import { FundAttachment, FundAttachmentTypeEnum, NgbDatePersianDateToGregorian, NgbDatepickerI18nPersian } from '@client/shared';
import { environment } from 'projects/client/src/environments/environment';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';

@Component({
  selector: 'app-payment-filter',
  standalone: true,
  imports: [NgSelectModule, NgbDatepickerModule, ReactiveFormsModule, NgFor, NgIf, FontAwesomeModule, FormsModule,SvgViewerComponent],
  templateUrl: './payment-filter.component.html',
  styleUrl: './payment-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian },
  ],
})
export class PaymentFilterComponent {
  apiUrl: string = environment.apiUrl;
  mutualFundList = []
  formGroup: UntypedFormGroup;
  today: NgbDateStruct;
  threeYearsAgo: NgbDateStruct;
  loading: boolean = false;
  page: number = 1;
  first: number = 0;
  row: number = 1000;
  sortType = 'desc';
  sortFiled = 'date';

  filter = {
    transfersFilter: {
      reportFilter: {
        dateFilter: {
          startDate: '0',
          endDate: '0',
        },
        phrase: '',
        nationalId: '',
        mutualFundId: '',
        bankDepositId: 0,
        banKNameId: 0,
        gateway: 0,
        state: -1,
      },
      optionalFilter: {
        take: this.row,
        skip: 0,
        page: 0,
        value: '',
        sort: [
          {
            field: '',
            dir: '',
          },
        ],
      },
      branchId: 0
    },
    podTransfersFilter : {
      amount: {
        fromAmount: null,
        toAmount: null
      },
      date: {
        startDate: '',
        endDate: ''
      },
      paymentReferenceNumber: undefined,
      offset: 0,
      pageSize: 10000
    }
  };



  constructor(private paymentReportService: PaymentReportService, private calendar: NgbCalendar) {
    this.today = this.calendar.getToday();
    this.threeYearsAgo = calendar.getPrev(calendar.getToday(), 'y', 3);
  }

  ngOnInit(): void {
    this.formGroup = new UntypedFormGroup({
      startDate: new UntypedFormControl(this.threeYearsAgo, [Validators.required]),
      endDate: new UntypedFormControl(this.today, [Validators.required]),
      mutualFundId: new UntypedFormControl(null, []),
      depositNumber: new UntypedFormControl(null, []),
      state: new UntypedFormControl('همه'),
      amount: new UntypedFormControl(null, []),
      receiptNumber: new UntypedFormControl(null, []),
    });
    this.search()
  }

  search() {
    let startDate = this.formGroup.get('startDate').value;
    let endDate = this.formGroup.get('endDate').value;
    this.page = 1;
    this.filter.transfersFilter.optionalFilter.page = this.page;
    this.filter.transfersFilter.optionalFilter.take = this.row;
    this.filter.transfersFilter.optionalFilter.sort[0].dir = this.sortType;
    this.filter.transfersFilter.optionalFilter.sort[0].field = this.sortFiled;
    this.filter.transfersFilter.reportFilter.dateFilter.startDate = '' + NgbDatePersianDateToGregorian(startDate)
    this.filter.transfersFilter.reportFilter.dateFilter.endDate = '' + NgbDatePersianDateToGregorian(endDate)
    this.filter.podTransfersFilter.date.startDate = '' + NgbDatePersianDateToGregorian(startDate)
    this.filter.podTransfersFilter.date.endDate = '' + NgbDatePersianDateToGregorian(endDate)
    this.filter.transfersFilter.reportFilter.mutualFundId = this.formGroup.get('mutualFundId').value
    if(this.formGroup.get('state').value != "همه")
      this.filter.transfersFilter.reportFilter.state = this.formGroup.get('state').value

    this.paymentReportService.setFilter(this.filter)
  }

  getLogo(mutualFund): FundAttachment {
    return mutualFund?.attachments?.find(a => a.categoryId === FundAttachmentTypeEnum.Logo);
  }

}

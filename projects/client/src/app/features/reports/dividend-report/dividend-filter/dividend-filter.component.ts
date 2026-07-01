import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FundAttachment, FundAttachmentTypeEnum, NgbDatePersianDateToGregorian, NgbDatepickerI18nPersian } from '@client/shared';
import { DividendReportService } from '../dividend-report.service';
import { environment } from 'projects/client/src/environments/environment';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';

@Component({
  selector: 'app-dividend-filter',
  standalone: true,
  imports: [NgSelectModule, NgbDatepickerModule, ReactiveFormsModule, NgFor, NgIf, FontAwesomeModule,SvgViewerComponent],
  templateUrl: './dividend-filter.component.html',
  styleUrl: './dividend-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian },
  ],
})
export class DividendFilterComponent {
  _mutualFundList = []
  set mutualFundList(val) {
    if (val) {
      //فقط تقسیم سودیا 
      this._mutualFundList = val.filter(x => x.fixedIncomeFundType == 1)
      if (this.formGroup) {
        this.formGroup.patchValue({ mutualFundCode: this._mutualFundList[0].seoRegisterNumber })
      }
    }
  }
  get mutualFundList() {
    return this._mutualFundList
  }
  apiUrl: string = environment.apiUrl;
  formGroup: UntypedFormGroup;
  today: NgbDateStruct;
  threeYearsAgo: NgbDateStruct;
  loading: boolean = false;
  page: number = 1;
  first: number = 0;
  row: number = 1000;

  filter = {
    reportFilter: {
      dateFilter: {
        startDate: '0',
        endDate: '0',
      },
      phrase: '',
      nationalId: '',
      mutualFundCode: '',
      mutualFundId: 0,
      partyId: 0,
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
  };


  constructor(private dividendReportService: DividendReportService, private calendar: NgbCalendar) {
    this.today = this.calendar.getToday();
    this.threeYearsAgo = calendar.getPrev(calendar.getToday(), 'y', 3);
  }

  ngOnInit(): void {
    this.formGroup = new UntypedFormGroup({
      startDate: new UntypedFormControl(this.threeYearsAgo, [Validators.required]),
      endDate: new UntypedFormControl(this.today, [Validators.required]),
      mutualFundCode: new UntypedFormControl('11168', [Validators.required]),
      phrase: new UntypedFormControl(null, []),
      nationalId: new UntypedFormControl(null, []),
      mutualFundId: new UntypedFormControl(null, []),
      partyId: new UntypedFormControl(null, []),
      reinvest: new UntypedFormControl(null, []),

    });
    this.search()
  }

  search() {
    let startDate = this.formGroup.get('startDate').value;
    let endDate = this.formGroup.get('endDate').value;
    this.page = 1;
    this.filter.optionalFilter.page = this.page;
    this.filter.optionalFilter.take = this.row;
    this.filter.reportFilter.dateFilter.startDate = '' + NgbDatePersianDateToGregorian(startDate)
    this.filter.reportFilter.dateFilter.endDate = '' + NgbDatePersianDateToGregorian(endDate)
    this.filter.reportFilter.mutualFundCode = this.formGroup.get('mutualFundCode').value
    this.filter.reportFilter.phrase = this.formGroup.get('phrase').value ?? ""
    this.filter.reportFilter.nationalId = this.formGroup.get('nationalId').value ?? ""
    this.filter.reportFilter.mutualFundId = this.formGroup.get('mutualFundId').value ?? 0
    this.filter.reportFilter.partyId = this.formGroup.get('partyId').value ?? 0
    // this.filter.reportFilter.reinvest = this.formGroup.get('reinvest').value ?? 0

    this.dividendReportService.setFilter(this.filter)
  }

  getLogo(mutualFund): FundAttachment {
    return mutualFund?.attachments?.find(a => a.categoryId === FundAttachmentTypeEnum.Logo);
  }
}

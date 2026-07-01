import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Renderer2, TemplateRef, WritableSignal, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n, NgbDatepickerModule, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsReportService } from '../requests-report.service';
import { FundAttachment, FundAttachmentTypeEnum, NgbDatePersianDateToGregorian, NgbDatepickerI18nPersian } from '@client/shared';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Filter, TransactionState, TransactionType } from './transactions.model';
import { environment } from 'projects/client/src/environments/environment';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';

@Component({
  selector: 'app-requests-filter',
  standalone: true,
  imports: [NgSelectModule, NgbDatepickerModule, ReactiveFormsModule, NgFor, NgIf, FontAwesomeModule, FormsModule, NgTemplateOutlet,SvgViewerComponent],
  templateUrl: './requests-filter.component.html',
  styleUrl: './requests-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian },
  ],
})
export class RequestsFilterComponent implements OnInit {
  apiUrl: string = environment.apiUrl;
  isShortScreen = false;
  isExtraShortScreen = false;
  private resizeListener: () => void;

  transactionType = TransactionType;
  transactionState = TransactionState;
  filter = Filter;

  mutualFundList = [];
  formGroup: UntypedFormGroup;
  nextWeek: NgbDateStruct;
  threeYearsAgo: NgbDateStruct;
  loading: boolean = false;
  page: number = 1;
  first: number = 0;
  row: number = 1000;
  sortType = 'desc';
  sortFiled = 'date';
  closeResult: WritableSignal<any> = signal(null);

  constructor(
    private requestsReportService: RequestsReportService,
    private calendar: NgbCalendar,
    private ngbModal: NgbModal,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    this.threeYearsAgo = calendar.getPrev(calendar.getToday(), 'y', 3);
    this.nextWeek = calendar.getNext(calendar.getToday(), 'd', 7);
  }

  ngOnInit(): void {
    this.resizeListener = this.renderer.listen('window', 'resize', () => this.checkScreenHeight());
    this.formGroup = new UntypedFormGroup({
      startDate: new UntypedFormControl(this.threeYearsAgo, [Validators.required]),
      endDate: new UntypedFormControl(this.nextWeek, [Validators.required]),
      mutualFundCode: new UntypedFormControl(null, []),
      transactionType: new UntypedFormControl(null, []),
      transactionNumber: new UntypedFormControl(null, []),
      volume: new UntypedFormControl(null, []),
      transactionState: new UntypedFormControl(null, []),
    });
    this.search();
    this.checkScreenHeight();
  }

  search() {
    let startDate = this.formGroup.get('startDate').value;
    let endDate = this.formGroup.get('endDate').value;
    this.page = 1;
    this.filter.optionalFilter.page = this.page;
    this.filter.optionalFilter.take = this.row;
    this.filter.optionalFilter.sort[0].dir = this.sortType;
    this.filter.optionalFilter.sort[0].field = this.sortFiled;
    this.filter.reportFilter.startDate = '' + NgbDatePersianDateToGregorian(startDate);
    this.filter.reportFilter.endDate = '' + NgbDatePersianDateToGregorian(endDate);
    this.filter.reportFilter.mutualFundCode = this.formGroup.get('mutualFundCode').value;
    this.filter.reportFilter.requestTransactionType = this.formGroup.get('transactionType')?.value
      ? this.formGroup.get('transactionType')?.value : -1;
    this.filter.reportFilter.requestTransactionState = this.formGroup.get('transactionState')?.value
      ? this.formGroup.get('transactionState')?.value : -1;
    this.filter.reportFilter.id = this.formGroup.get('transactionNumber')?.value
      ? this.formGroup.get('transactionNumber')?.value : null;

    this.requestsReportService.setFilter(this.filter);
  }

  openModal(content: TemplateRef<any>) {
    this.ngbModal.open(content, { modalDialogClass: 'filter-modal modal-holder modal-dialog-centered', backdrop: 'static' });
  }

  applyChanges(modalFormValues: any) {
    this.formGroup.patchValue({
      volume: modalFormValues.volume,
      transactionNumber: modalFormValues.transactionNumber,
      transactionType: modalFormValues.transactionType,
      startDate: modalFormValues.startDate,
      endDate: modalFormValues.endDate,
      mutualFundCode: modalFormValues.mutualFundCode,
    });
    this.search();
  }
  
  ngOnDestroy(): void {
    if (this.resizeListener) {
      this.resizeListener();
    }
  }

  private checkScreenHeight(): void {
    this.isShortScreen = window.innerHeight < 945;
    this.isExtraShortScreen = window.innerHeight < 690;
    this.cdr.detectChanges()
  }

  getLogo(mutualFund): FundAttachment {
      return mutualFund?.attachments?.find(a => a.categoryId === FundAttachmentTypeEnum.Logo);
    }
}

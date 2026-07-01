import { AsyncPipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, WritableSignal, inject, signal, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FundListService } from '@client/core/services/fund-list.service';
import { ToastService } from '@client/core/services/toast.service';
import {
  Convert, CustomerInfoModel,
  FundAttachment,
  FundAttachmentTypeEnum,
  PodDirectDebitContractDurationModel, PodDirectDebitLimitModel, PodScheduledDirectDebitContractModel,
  PodService, ProfileManagementService, SharedModule
} from '@client/shared';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { numberToWords } from '@persian-tools/persian-tools';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { environment } from 'projects/client/src/environments/environment';
import { BehaviorSubject, Subject, combineLatest, map, takeUntil } from 'rxjs';

@Component({
  selector: 'scheduled-direct-debit-modal',
  templateUrl: './scheduled-direct-debit-modal.component.html',
  styleUrls: ['./scheduled-direct-debit-modal.component.scss'],
  standalone: true,
  imports: [
    SharedModule, FontAwesomeModule, NgClass, NgIf, NgFor, DecimalPipe, NgbNavModule,
    NgxMaskDirective, NgxMaskPipe, FormsModule, AsyncPipe, NgSelectModule,SvgViewerComponent
  ],
  providers: [DecimalPipe, provideNgxMask()],
})
export class ScheduledDirectDebitModalComponent implements OnInit, OnDestroy {
  apiUrl: string = environment.apiUrl
  activeContracts: PodScheduledDirectDebitContractModel[] = [];
  selectedContract?: PodScheduledDirectDebitContractModel;
  customerInfo: WritableSignal<CustomerInfoModel>;
  mutualFundList = [];
  days = Array.from({ length: 29 }, (_, i) => i + 1);
  selectedDaysOfMonth = signal<number[]>([]);
  submittingForm = signal(false);
  submitted = signal(false);
  contractDurations = signal<PodDirectDebitContractDurationModel[]>([]);
  directDebitLimits = signal<PodDirectDebitLimitModel[]>([]);
  sendingOTP = signal(false);
  hasOtpSent$ = new BehaviorSubject<boolean>(true);
  showCounter$ = new BehaviorSubject(false);
  otpSubmitted = signal(false);
  readyToRender = signal(false);
  isSelectedContract = false;
  selectAllChecked = false;
  customerPhoneNumber = '';
  otp = '';
  amount: number | null;
  amountInWord = signal('');
  selectedFund: any;
  agreement = false;
  private destroy$ = new Subject<void>();
  private activeModal = inject(NgbActiveModal);
  minPrice = signal(1050000);

  disableOtpButton$ = combineLatest([this.hasOtpSent$, this.showCounter$]).pipe(
    map(([isOtpSend, showCounter]) => isOtpSend && showCounter)
  );

  constructor(
    private podService: PodService,
    private fundListService: FundListService,
    private toastService: ToastService,
    private profileManagementService: ProfileManagementService,
  ) {
    this.customerInfo = profileManagementService.customerInfo;
  }

  ngOnInit(): void {
    this.loadCustomerInfo();
    this.loadMutualFunds();
  }

  private loadCustomerInfo(): void {
    this.profileManagementService.getCustomerInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe(customerInfo => {
        this.customerPhoneNumber = customerInfo?.contactInfo?.mobile ?? '';
      });
  }

  private loadMutualFunds(): void {
    this.fundListService.getAllMutualFunds()
      .pipe(takeUntil(this.destroy$))
      .subscribe(fundList => {

        this.mutualFundList = fundList.filter(f => f.seoRegisterNumber == 11168)
        this.selectedFund = this.findMatchingFund(fundList);
        this.selectedContract = this.activeContracts.find(contract =>
          contract.mutualFundId === this.selectedFund?.mutualFundId
        );
        
        if(this.selectedContract && !this.isSelectedContract){
          this.updateDetails();
          this.isSelectedContract = true;
        }
        this.readyToRender.set(true);
      });
  }

  private findMatchingFund(fundList: any[]): any {
    return this.selectedContract?.mutualFundId
      ? fundList.find(fund => fund.mutualFundId === this.selectedContract?.mutualFundId)
      : fundList?.[0];
  }

  private updateDetails(): void {    
    this.amount = this.selectedContract?.amount ?? null;
    const amountInWords = this.amount ? numberToWords(this.amount ?? 0) : '';
    this.amountInWord.set(amountInWords as string);
    if(this.selectedContract?.selectedDaysOfMonth){
      this.selectedDaysOfMonth.set(this.selectedContract?.selectedDaysOfMonth);
    }
  }

  registerScheduledDirectDebit(): void {
    this.submitted.set(true);
    if (!this.validateForm() || this.submittingForm()) {
      return;
    }

    this.submittingForm.set(true);
    const request = this.createRequestPayload();
    const requestObservable = this.selectedContract
      ? this.podService.editScheduledDirectDebit(request)
      : this.podService.createScheduledDirectDebit(request);

    requestObservable.pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.submittingForm.set(false);
        const msg = this.selectedContract
          ? 'سرمایه‌گذاری خودکار با موفقیت ویرایش شد'
          : 'سرمایه‌گذاری خودکار با موفقیت ثبت شد'
        if (!res.isError) {
          this.toastService.show(msg, { classname: 'bg-success text-white' });
          this.activeModal.close(true);
        }
      },
      error: () => this.submittingForm.set(false),
    });
  }

  private validateForm(): boolean {
    return Boolean(
      this.otp &&
      this.agreement &&
      this.selectedFund &&
      this.selectedDaysOfMonth().length &&
      this.amount && this.amount! >= this.minPrice()
    );
  }

  private createRequestPayload() {
    return {
      otp: this.otp,
      amount: this.amount,
      mutualFundId: this.selectedFund.mutualFundId,
      dayOfMonthJalaliList: this.selectedDaysOfMonth(),
      id: this.selectedContract?.id ?? undefined
    };
  }

  onSelectedFundChanged(fund: any): void {
    this.selectedFund = fund;
    this.selectedContract = this.activeContracts.find(contract => contract.mutualFundId === fund.mutualFundId);
    this.updateDetails();
  }

  sendOtp(): void {
    if (!this.customerPhoneNumber) {
      this.toastService.show('خطا در دریافت اطلاعات مشتری.', { classname: 'bg-danger text-light' });
      return;
    }

    this.sendingOTP.set(true);
    this.podService.sendOtp(false)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (!res.isError) {
            this.sendingOTP.set(false);
            this.hasOtpSent$.next(true);
            this.showCounter$.next(true);
          }
        },
        error: () => this.sendingOTP.set(false),
      });
  }

  onCounterValueChange(value: { count: number }): void {
    if (value.count <= 0) {
      this.hasOtpSent$.next(false);
      this.showCounter$.next(false);
    }
  }

  close(): void {
    this.activeModal.close(false);
  }

  onAmountChanged(): void {
    const amount = Number(Convert.toEnglishNumber(this.amount));
    const tomanAmount = Math.floor(amount / 10);
    this.amountInWord.set(numberToWords(tomanAmount) as string);
  }

  // toggleSelectedDay(day: number): void {
  //   this.selectedDaysOfMonth.update(days => {
  //     const current = days ?? [];
  //     return current.includes(day)
  //       ? current.filter(d => d !== day)
  //       : [...current, day];
  //   });
  // }

  toggleSelectedDay(day: number): void {
    this.selectedDaysOfMonth.update(days => {
      const current = days ?? [];
      let updatedDays;
  
      if (current.includes(day)) {
        updatedDays = current.filter(d => d !== day);
      } else {
        updatedDays = [...current, day];
      }
  
      const allDays = [...Array.from({ length: 29 }, (_, i) => i + 1), 31];
      const allSelected = allDays.every(d => updatedDays.includes(d));
      this.selectAllChecked = allSelected;
  
      return updatedDays;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getLogo(mutualFund): FundAttachment {
      return mutualFund?.attachments?.find(a => a.categoryId === FundAttachmentTypeEnum.Logo);
  }

  toggleSelectAllDays(checked: boolean): void {
    this.selectAllChecked = checked;
    if (checked) {
      const days = Array.from({ length: 29 }, (_, i) => i + 1);
      days.push(31);
      this.selectedDaysOfMonth.set(days);
    } else {
      this.selectedDaysOfMonth.set([]);
    }
  }
}

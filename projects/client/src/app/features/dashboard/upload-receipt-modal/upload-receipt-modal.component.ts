import { CommonModule, DecimalPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild, effect, inject, input, signal } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '@client/core/services/toast.service';
import { PaymentTypeEnum, FundService, AllBankDepositModel, CustomerEvidenceModel, MutualFundDetailsModel, IdentityService, CompressImageService, SharedModule, Convert, commaSeparate, removeComma, CustomerRequestCompositionModel, LayoutService } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbModal, NgbNavModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { numberToWords } from '@persian-tools/persian-tools';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { BehaviorSubject, combineLatest, forkJoin, map, take } from 'rxjs';
import { ConfirmReceiptComponent } from './confirm-receipt/confirm-receipt.component';

@Component({
  selector: 'upload-receipt-modal',
  templateUrl: './upload-receipt-modal.component.html',
  styleUrls: ['./upload-receipt-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, DecimalPipe, NgbNavModule, FormsModule, FontAwesomeModule, NgxMaskDirective, NgxMaskPipe, NgSelectModule, SharedModule, CommonModule,NgbTooltip],
  providers: [DecimalPipe, provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UploadReceiptModalComponent implements OnInit, AfterViewInit {

  fundDetail = input.required<MutualFundDetailsModel>()
  customerEvidence = signal<CustomerEvidenceModel>(null);
  activeModal = inject(NgbActiveModal);
  isConfirmedReceipt = signal(false);
  receiptSubmitted = signal(false);
  receiptConfirmAgreement: boolean = false;
  @Input() fundId;
  @Input() bestLimit;


  @ViewChild('txtValue') private txtValue: ElementRef<HTMLInputElement>;

  get approximateNumberUnits() {
    try {
      return Math.floor(this.amount / this.fundDetail()?.performance?.lastSubscriptionNav);

    } catch (error) {
      return 0;
    }
  }

  imageErrorMessage$ = new BehaviorSubject<{ hasError: boolean, errorMessage: string }>({ hasError: false, errorMessage: '' });
  submittingImage$ = new BehaviorSubject<boolean>(false);
  filesUrl = signal<[string | ArrayBuffer, string | ArrayBuffer]>([null, null]);

  paymentTypeEnum = PaymentTypeEnum;
  allBankDeposits = signal<AllBankDepositModel[]>([]);
  submittingForm = signal(false);
  submitted = signal(false);
  estimatedVolume = signal(0);
  requestComposition = signal<CustomerRequestCompositionModel>(null)
  amount: number = null;
  volume = '';
  otp = '';
  amountInToman = signal('');
  selectedFile: [File | null, File | null] = [null, null];
  agreement: boolean = false;
  selectedBankId: number;
  // otpMode = signal(false);
  isOtpSend$ = new BehaviorSubject<boolean>(true);
  resendOTP$ = new BehaviorSubject<boolean>(false);
  count = 150;
  receiptForm: FormGroup;
  showCounter$ = new BehaviorSubject(true);
  disableOtpButton$ = combineLatest([this.isOtpSend$, this.showCounter$])
    .pipe(map(([isOtpSend, showCounter]) => isOtpSend && showCounter))

  loadingData = signal(true);

  constructor(
    private toast: ToastService,
    private fundService: FundService,
    private compressImage: CompressImageService,
    private identityService: IdentityService,
    private ngbModal: NgbModal,
    private router: Router,
    private layoutService: LayoutService,

  ) {

    effect(() => {
      const fundDetails = this.fundDetail();
      if (fundDetails) {
        this.getAllBankDepositByMutualFundId();
      }
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.focusTxtValue();
    }, 200);
  }

  focusTxtValue() {
    this.txtValue?.nativeElement.focus();
  }

  onFileSelected(event: any, fileNumber: number) {

    const file = event.target.files.length ? event.target.files[0] : null;
    if (file) {

      const MB = 1024 * 1024;
      const mimeType = file.type;
      let errorMessage = '';
      
      // if (mimeType.match(/image\/*/) == null) {
      //   errorMessage = 'فایل انتخاب شده معتبر نمی‌باشد';
      //   return this.imageErrorMessage$.next({ hasError: true, errorMessage });
      // }

      const allowedTypes = [
        'image/jpeg',   
        'image/jpg',   
        'image/png',  
        'image/webp',       
      ];

      if (!allowedTypes.includes(mimeType)) {
        errorMessage = 'فرمت فایل انتخاب‌ شده معتبر نیست. لطفاً یکی از فرمت‌های مجاز را انتخاب کنید.';
        return this.imageErrorMessage$.next({ hasError: true, errorMessage });
      }

      this.submittingImage$.next(true)
      this.compressImage.compress(file)
        .pipe(take(1))
        .subscribe(compressedImage => {
          //console.log(`Image size after compressed: ${compressedImage.size} bytes.`)
          // now you can do upload the compressed image
          if (compressedImage.size > MB) {
            this.submittingImage$.next(false)
            errorMessage = 'حداکثر حجم مجاز 1 مگابایت می‌باشد.';
            return this.imageErrorMessage$.next({ hasError: true, errorMessage });
          }

          const reader = new FileReader();
          reader.readAsDataURL(compressedImage);
          reader.onload = (event) => {

            const fileContent = reader.result || '';
            this.filesUrl.update(tuple => {
              const newTuple = [...tuple];
              newTuple[fileNumber - 1] = fileContent;
              return newTuple as [string | ArrayBuffer, string | ArrayBuffer];
            });

            this.imageErrorMessage$.next({ hasError: false, errorMessage });
            this.submittingImage$.next(false);

            this.selectedFile[fileNumber - 1] = compressedImage;
          };
        })



    }
    event.target.value = '';

  }

  removeFile(fileNumber: number) {
    this.filesUrl.update(tuple => {
      const newTuple = [...tuple];  // Clone the tuple
      newTuple[fileNumber - 1] = '';  // Clear the corresponding file content
      if (fileNumber === 1) newTuple.reverse();
      return newTuple as [string | ArrayBuffer, string | ArrayBuffer];
    });
    this.selectedFile[fileNumber - 1] = null;
    if (fileNumber === 1) this.selectedFile.reverse();
  }

  ngOnInit(): void {
    this.getFundDetail();
    // this.getPaymentWays();
  }

  private getFundDetail() {
    this.loadingData.set(true);
    let filter = {
      date: new Date(),
    };
    // forkJoin([
    //   this.fundService.getCustomerEvidenceByCode(this.fundDetail().seoRegisterNumber),
    //   this.fundService.getCustomerRequestCompositions(filter),
    // ])
    //   .subscribe(([customerEvidence, requestComposition]) => {
    //     this.customerEvidence.set(customerEvidence);
    //     this.requestComposition.set(requestComposition.filter(x=>x.mutualFundCode==this.fundDetail().seoRegisterNumber)[0])
    //   })

    forkJoin([
      this.fundService.getCustomerEvidenceByCode(this.fundDetail().seoRegisterNumber),
      this.fundService.getCustomerRequestCompositions(filter),
    ]).subscribe({
      next: ([customerEvidence, requestComposition]) => {
        this.customerEvidence.set(customerEvidence);
        this.requestComposition.set(requestComposition.filter(x => x.mutualFundCode == this.fundDetail().seoRegisterNumber)[0])
        this.loadingData.set(false);
      },
      error: () => {
        this.loadingData.set(false);
      }
    });
  }


  reSendOtp() {
    const isOtpSend = this.isOtpSend$.getValue();

    if (isOtpSend) {
      this.showCounter$.next(true);
      return;
    }
    this.sendOtp()
  }

  sendOtp() {
    this.submittingForm.set(true)
    this.identityService.getSubscriptionOtp()
      .subscribe({
        next: res => {
          this.submittingForm.set(false)
          this.resendOTP$.next(true);
          this.isOtpSend$.next(true);
          this.showCounter$.next(true);
        },
        error: err => {
          this.submittingForm.set(false);
        }
      })
  }

  getBankDeposit(selectedBankId) {
    return this.allBankDeposits().filter(x => x.id == selectedBankId)[0]
  }

  confirmReceipt(event) {
    if (this.submittingForm() || !this.fundDetail()?.isAllowSubscription || !this.requestComposition()?.subscriptionPermit || +this.amount > 9999999999999999) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.submitted.set(true);
    if (this.amount == null || !this.agreement || this.fundDetail()?.performance?.minPrice > this.amount || !this.selectedFile[0] || this.selectedBankId == null) {
      this.isConfirmedReceipt.set(false);
      return;
    } else {
      this.isConfirmedReceipt.set(true);
    };
  }

  saveReceipt(event) {
    if (this.submittingForm() || !this.fundDetail()?.isAllowSubscription || !this.requestComposition()?.subscriptionPermit) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.submitted.set(true);
    this.receiptSubmitted.set(true);

    if (this.amount == null || !this.agreement
      || !this.receiptConfirmAgreement
      || this.fundDetail()?.performance?.minPrice > this.amount
      || !this.selectedFile[0]
      || this.selectedBankId == null) {
      return;
    }


    this.submittingForm.set(true);
    this.fundService.saveSubscriptionReceive({
      file: this.selectedFile[0] ?? null,
      file2: this.selectedFile[1] ?? null,
      // otp: this.otp,
      mutualFundId: this.fundDetail()?.mutualFundId,
      amount: Convert.toEnglishNumber(removeComma(this.amount)),
      BankDepositId: this.selectedBankId
    }).subscribe({
      next: (res: any) => {

        if (res.isError !== undefined && res.isError === true) {
          this.toast.show(res.message, {
            classname: 'bg-danger text-light',
          });

          throw new Error(res.message);
        }


        this.activeModal.close(true);
        this.submittingForm.set(false);
        this.openConfirmModal(res)
      },
      error: err => {
        if (err?.error?.code == '100023') {
          this.openUpdateSejamModal()
        }
        this.submittingForm.set(false)
      }
    })
  }

  close() {
    this.activeModal.dismiss('Cross click');
  }

  openUpdateSejamModal() {
    if (this.layoutService.isTabletSizeOrSmaller) {
      this.router.navigate(['/mobile/user-info'], { queryParams: { updateSejam: true, fundCode: this.fundDetail()?.seoRegisterNumber } });
    } else {
      this.router.navigate(['/profile'], { queryParams: { updateSejam: true, fundCode: this.fundDetail()?.seoRegisterNumber } });
    }
  }


  onValueChange() {
    let amount = Number(Convert.toEnglishNumber(this.amount))
    let units = commaSeparate(Math.floor(amount / this.fundDetail()?.performance?.lastSubscriptionNav));
    this.estimatedVolume.set(units)
    const tomanAmount = Math.floor((amount || 0) / 10);
    const n2w = numberToWords(tomanAmount);
    if (!Number.isSafeInteger(tomanAmount)) {
      this.amountInToman.set('');
    } else {
      this.amountInToman.set(n2w.toString());
    }
  }

  private getAllBankDepositByMutualFundId() {
    this.fundService.getAllBankDepositByMutualFundId(this.fundDetail().mutualFundId).subscribe(list => {
      this.allBankDeposits.set(list);
    })
  }

  openConfirmModal(res) {
    const modalRef = this.ngbModal.open(ConfirmReceiptComponent, { modalDialogClass: 'modal-holder modal-dialog-centered', size: 'md', backdrop: 'static' });
    modalRef.componentInstance.fundDetail = this.fundDetail();
    modalRef.componentInstance.amount = this.amount
    modalRef.componentInstance.ticketNumber = res?.result?.ticketNumber
    modalRef.componentInstance.requestId = res?.result?.requestId
    modalRef.componentInstance.receiptId = res?.result?.receiptId
  }

}

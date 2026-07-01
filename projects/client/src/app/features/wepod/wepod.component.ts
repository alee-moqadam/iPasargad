import { CommonModule, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HighchartsChartModule } from 'highcharts-angular';
import { MaskingNumberService, MaskNumberDirective, MaskNumberPipe, PodService, CustomerInfoModel, ProfileManagementService, PodAccountBalanceModel, PodDirectDebitContractModel, getDurationEnumItemByDate, PodScheduledDirectDebitContractModel, getSelectedDaysOfMonthStr, LayoutService, FundAttachment, FundAttachmentTypeEnum } from '@client/shared';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConsultingGuideComponent } from '../dashboard/consulting-guide/consulting-guide.component';
import moment from 'jalali-moment';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { RegisterCardModalComponent } from './register-card-modal/register-card-modal.component';
import { DirectDebitContractModalComponent } from './direct-debit-contract-modal/direct-debit-contract-modal.component';
import { ScheduledDirectDebitModalComponent } from './scheduled-direct-debit-modal/scheduled-direct-debit-modal.component';
import { ToastService } from '@client/core/services/toast.service';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { TraditionalAccountContractModalComponent } from './traditional-account-contract-modal/traditional-account-contract-modal.component';
import { FundListService } from '@client/core/services/fund-list.service';
import { UpdateTokenPodModalComponent } from './update-token-pod-modal/update-token-pod-modal.component';
import { environment } from 'projects/client/src/environments/environment';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';

@Component({
  selector: 'app-wepod',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink,SvgViewerComponent,
    HighchartsChartModule, MaskNumberDirective, ConsultingGuideComponent, FormsModule, NgbTooltip],
  providers: [DecimalPipe, MaskNumberPipe],
  templateUrl: './wepod.component.html',
  styleUrl: './wepod.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WepodComponent implements OnInit {

  @ViewChild('inquiryAccountBalanceTem') inquiryAccountBalanceTem: TemplateRef<HTMLInputElement>;
  apiUrl: string = environment.apiUrl;
  isMasked = computed(() => {
    const _mask = this.maskingService.getMaskedState();
    return _mask
  });
  loading = signal(false);
  customerInfo = signal<CustomerInfoModel>(null);
  accountBalance = signal<PodAccountBalanceModel>(null);
  directDebitContract = signal<PodDirectDebitContractModel>(null);
  traditionalAccountContract = signal<PodDirectDebitContractModel>(null);
  scheduledDirectDebits = signal<PodScheduledDirectDebitContractModel[]>([]);
  customerRequestCompositions = [];
  hasEmptyContract = signal(false);
  hasEmptyTraditionalAccountContract = signal(null);
  isContractLoading = signal(false);
  isNotRegistered = signal(false);
  isDisabled = false;
  mutualFundList$: Observable<any>;
  allMutualFundDetail = signal([]);
  destroy$ = new Subject<void>();
 
  directDebitContractDuration = getDurationEnumItemByDate;
  getSelectedDaysOfMonthStr = getSelectedDaysOfMonthStr;

  public get formattedCardNumber() {
    if (!this.directDebitContract() || !this.directDebitContract().accountNumber || this.directDebitContract().accountNumber.toString().length != 16) return '';
    return this.directDebitContract().accountNumber.toString().replace(/(\d{4})(?=\d)/g, '$1 - ')
  }

  constructor(
    private podService: PodService,
    private maskingService: MaskingNumberService,
    private maskNumberPipe: MaskNumberPipe,
    private ngbModal: NgbModal,
    private profileManagementService: ProfileManagementService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
    private layoutService: LayoutService,
    private fundListService: FundListService
  ) {
    this.mutualFundList$ = this.fundListService.getAllMutualFunds();
  }

  openRegisterCardModal() {
    if (Number(localStorage.getItem('step')) && Number(localStorage.getItem('step')) !== 100) {
      if (this.layoutService.isTabletSizeOrSmaller) {
        this.router.navigate(['/mobile/user-info'], { queryParams: { updateSejam: true } });
      } else {
        this.router.navigate(['/profile'], { queryParams: { updateSejam: true } });
      }
      return
    } else {
      const modalRef = this.ngbModal.open(RegisterCardModalComponent, { modalDialogClass: 'modal-holder  modal-dialog-centered auto-modal-size', size: 'lg', backdrop: 'static' });
      modalRef.result.then((submitted) => {
        if (submitted) {
          this.getDirectDebitContract();
        }
      })
    }
  }

  openScheduledDirectDebitModal(item) {
    const modalRef = this.ngbModal.open(ScheduledDirectDebitModalComponent, { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', backdrop: 'static' });
    modalRef.componentInstance.selectedContract = item;
    modalRef.componentInstance.activeContracts = this.scheduledDirectDebits();
    modalRef.result.then((submitted) => {
      if (submitted) {
        this.getValidScheduledDirectDebit()
      }
    })
  }

  openRegisterDirectDebitContractModal() {
    if (Number(localStorage.getItem('step')) && Number(localStorage.getItem('step')) !== 100) {
      if (this.layoutService.isTabletSizeOrSmaller) {
        this.router.navigate(['/mobile/user-info'], { queryParams: { updateSejam: true } });
      } else {
        this.router.navigate(['/profile'], { queryParams: { updateSejam: true } });
      }
      return
    } else {
      const modalRef = this.ngbModal.open(DirectDebitContractModalComponent, { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', backdrop: 'static' });
      modalRef.componentInstance.userContract = this.directDebitContract();
      modalRef.componentInstance.userHasScheduledContract = !!this.scheduledDirectDebits()?.length;
      modalRef.result.then((res) => {
        if (res?.submitted) {
          this.getDirectDebitContract()
          this.getValidScheduledDirectDebit();
        }
        if (res.needsToGetInquiry) {
          this.inquiryAccountBalance();
        }
      })
    }

  }

  openTraditionalAccountContractModal() {
    if (Number(localStorage.getItem('step')) && Number(localStorage.getItem('step')) !== 100) {
      if (this.layoutService.isTabletSizeOrSmaller) {
        this.router.navigate(['/mobile/user-info'], { queryParams: { updateSejam: true } });
      } else {
        this.router.navigate(['/profile'], { queryParams: { updateSejam: true } });
      }
      return
    } else {
      const modalRef = this.ngbModal.open(TraditionalAccountContractModalComponent, { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', backdrop: 'static' });
      // modalRef.result.then(() => {
      //   this.getTraditionalAccountContract()
      // })
    }
  }

  ngOnInit(): void {
    this.mutualFundList$
      .subscribe((fundList: any) => {
        this.allMutualFundDetail.set(fundList);
      })
    if (localStorage.getItem('inquiry-api-called') === 'true')
      this.getAccountBalance();
    else this.inquiryAccountBalance(true)
    this.getDirectDebitContract();
    this.getValidScheduledDirectDebit();
    this.customerInfo = this.profileManagementService.customerInfo;
    if (Number(localStorage.getItem('step')) && Number(localStorage.getItem('step')) !== 100) {
      this.hasEmptyContract.set(true);
      return;
    } else {
      this.hasEmptyContract.set(false);
    }
  }

  ngAfterViewInit() {
    this.route.queryParamMap.subscribe(params => {
      const shouldUpdateContract = params.get('updateContract');
      if (shouldUpdateContract) {
        this.openRegisterDirectDebitContractModal();
      }
    });
  }

  private getAccountBalance() {
    this.isContractLoading.set(true);
    this.podService.getAccountBalance()
      .pipe(finalize(() => this.isContractLoading.set(false)))
      .subscribe((res) => {
        this.accountBalance.set(res?.result);
      });
  }

  public inquiryAccountBalance(needsToSetLocalStorage = false) {
    this.isDisabled = true;
    this.isContractLoading.set(true);
    this.podService.inquiryAccountBalance()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isContractLoading.set(false))
      )
      // .subscribe((res) => {
      //   this.accountBalance.set(res?.result);
      //   if (needsToSetLocalStorage) {
      //     localStorage.setItem('inquiry-api-called', 'true')
      //   }

      //   this.isDisabled = false;
      // });
      .subscribe(
        (next) => {           
          this.accountBalance.set(next?.result);
          if (needsToSetLocalStorage) {
            localStorage.setItem('inquiry-api-called', 'true')
          }
          this.isDisabled = false;
        },
        (error) => {                     
          if (error?.error?.code == 1760) {
            this.toastService.show(this.inquiryAccountBalanceTem, {
              classname: 'text-black',
              delay: 1000 * 60 * 1,
              type: 'inquiry',
              tag: 'inquiry-balance'
            });
          }
          this.isDisabled = false;
        }
      );      
  }

  openUpdateTokenPod(){
     const modalRef = this.ngbModal.open(UpdateTokenPodModalComponent,
       { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', backdrop: 'static' });
      modalRef.result.then((submitted) => {
        if (submitted) {
          this.toastService.clearByTag('inquiry-balance');
          this.inquiryAccountBalance(true);
        }
      })
  }

  private getDirectDebitContract() {
    this.loading.set(true);

    this.podService.getDirectDebitContract()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((res) => {
        if (res?.result) {
          this.getTraditionalAccountContract()
          // this.getAccountBalance();
          this.directDebitContract.set(res?.result);
          this.hasEmptyContract.set(false);
        } else {
          this.hasEmptyContract.set(true);
        }
      });
  }

  getTraditionalAccountContract() {
    this.loading.set(true);

    this.podService.traditionalAccountContract()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((res) => {
        if (res?.result?.isConnected) {
          this.traditionalAccountContract.set(res?.result);
          this.hasEmptyTraditionalAccountContract.set(false);
        } else {
          this.hasEmptyTraditionalAccountContract.set(true);
        }
      });
  }

  toggleScheduledDirectDebitActivation(itemIndex: number) {
    this.loading.set(true);
    const item = this.scheduledDirectDebits()[itemIndex];
    this.podService.toggleScheduledDirectDebitActivation({ isActive: !item.isActive, mutualFundId: item.mutualFundId }).subscribe((res) => {
      if (res?.result?.isActive) {
        this.toastService.show(`سرمایه‌گذاری خودکار با موفقیت فعال شد`, { classname: 'bg-success text-white' });
      } else if (res?.result?.isActive == false) {
        this.toastService.show(`سرمایه‌گذاری خودکار با موفقیت غیرفعال شد`, { classname: 'bg-success text-white' });
      }
      this.getValidScheduledDirectDebit();
    });
  }

  private getValidScheduledDirectDebit() {
    this.loading.set(true);
    this.podService.getValidScheduledDirectDebits().subscribe((res: any) => {
      this.loading.set(false);
      this.scheduledDirectDebits.set(res?.sort((a, b) => a.mutualFundId - b.mutualFundId));
    });
  }

  toggleMask() {
    this.maskingService.toggleMasking();
  }

  convertToJalali(date: string, format: string = 'dddd، jD jMMMM') {
    return moment(date, 'YYYY-MM-DDTHH:mm:ss').locale('fa').format(format);
  }

  copyToClipboard(value) {
    return value ? this.toastService.copyToClipboard(value) : '';
  }

  openWepod() {
    window.open("https://web.wepod.ir/signup/mobile", '_blank')
  }

  getLogo(fundId): FundAttachment {
    return this.allMutualFundDetail()?.find(a => a.mutualFundId === fundId)?.attachments?.find(a => a.categoryId === FundAttachmentTypeEnum.Logo);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.toastService.clearByTag('inquiry-balance');
  }

}

import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ConsultingGuideComponent } from '../dashboard/consulting-guide/consulting-guide.component';
import { FundService } from '@client/shared/rest-services/fund/fund.service';
import { Router, RouterLink } from '@angular/router';
import { filter, finalize, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastService } from '@client/core/services/toast.service';
import { FormsModule } from '@angular/forms';
import { NgbCalendar, NgbCarouselModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GiftConfirmationModalComponent } from './gift-confirmation-modal/gift-confirmation-modal.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FundListService } from '@client/core/services/fund-list.service';
import { IdentityService } from '@client/shared/rest-services/identity/identity.service';
import { Filter } from '../reports/requests-report/requests-filter/transactions.model';
import { NgbDateToStringGregorian } from '@client/shared/utilities/date-time';
import { Convert, LayoutService } from '@client/shared';
import { MutualFundCarouselComponent } from '@client/shared/components/mutual-fund-carousel/mutual-fund-carousel.component';

@Component({
  selector: 'app-gift-card',
  standalone: true,
  imports: [ConsultingGuideComponent, RouterLink, CommonModule, FormsModule, NgxMaskDirective, NgbCarouselModule, MutualFundCarouselComponent
  ],
  templateUrl: './gift-card.component.html',
  styleUrl: './gift-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNgxMask()],

})
export class GiftCardComponent implements OnInit {
  filter = Filter;
  giftCardValue = signal<any>('');
  isSixteenDigitsEntered = signal(false);
  giftCardCode = signal('');
  hasErrorInCode = signal(false);
  isLoading = signal(false);
  reportLoading = signal(false);

  isApplyBtnLoading = signal(false);
  allMutualFundDetail = signal([]);
  requestList = signal([]);

  constructor(
    private fundService: FundService,
    private toast: ToastService,
    private ngbModal: NgbModal,
    private router: Router,
    private fundListService: FundListService,
    private identityService: IdentityService,
    private toastService: ToastService,
    private calendar: NgbCalendar,
    private layoutService: LayoutService,
  ) {

  }
  ngOnInit(): void {
    const threeYearsAgo = this.calendar.getPrev(this.calendar.getToday(), 'y', 3);
    const nextWeek = this.calendar.getNext(this.calendar.getToday(), 'd', 7);
    this.filter.reportFilter.startDate = '' + NgbDateToStringGregorian(threeYearsAgo);
    this.filter.reportFilter.endDate = '' + NgbDateToStringGregorian(nextWeek);
    this.filter.optionalFilter.page = 1;
    this.filter.optionalFilter.take = 1000;
    this.fundService
      .getRequests(this.filter)
      .pipe(
        finalize(() => this.reportLoading.set(false)),
        map((data: any) => {
          if (data && data.result) {
            return data.result.filter((data: any) => data.settlementType == 5)
          }
          return []
        }))
      .subscribe((result: any) => {
        if (result) {
          this.requestList.set(result);

        }
      });

    this.fundListService.getAllMutualFunds().subscribe(fundList => {
      this.allMutualFundDetail.set(fundList);
    });
  }

  onInput(e: Event) {

    const input = (e.target as HTMLInputElement).value;
    this.giftCardCode.set(input);

    if (input.length === 19) {
      this.isLoading.set(true);
      const englishInput = Convert.toEnglishNumber(input)
      this.checkGiftCardValidity(englishInput);
    }
  }

  private checkGiftCardValidity(input: string) {
    this.fundService.checkGiftCardValidity(input.replace(/-/g, ''), 1)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res: any) => {
          if (res.result) {
            this.giftCardValue.set(res.result)
            this.hasErrorInCode.set(!res.result);
          }
        },
        error: () => {
          this.hasErrorInCode.set(true);
        }
      });
  }




  applyGiftCard() {


    const command = {
      "uniqueId": this.giftCardCode().replace(/-/g, ''),
      "mutualFundId": 1
    }
    if (!this.hasErrorInCode() && this.giftCardCode().length === 19) {
      if (this.isApplyBtnLoading()) {
        return;
      }
      this.isApplyBtnLoading.set(true);
      this.fundService.applyGiftCard(command)
        .pipe(finalize(() => this.isApplyBtnLoading.set(false)))
        .subscribe((res: any) => {
          if (res?.result) {
            const modalRef = this.ngbModal.open(GiftConfirmationModalComponent, { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', backdrop: 'static' });
            modalRef.componentInstance.giftCardInfo = res?.result;
            this.giftCardCode.set('');
          }
        }, (err) => {
          if (err?.error?.code == '100023') {
            this.openUpdateSejamModal()
          }
          console.error("applyGiftCard error", err);
        })
    } else return

  }

  checkSubscriptionStatus() {
    this.isApplyBtnLoading.set(true)
    this.identityService.getSimpleSejamStatus().subscribe(sejamState => {
      this.isApplyBtnLoading.set(false)
      //اگر سجامی نباشد و در این صندوق واحد نداشته باشد نمیتواند صدور بزند مرسی اه
      if (sejamState != 6) {
        this.toastService.show('برای ثبت کارت هدیه در صندوق باید سجامی شوید. ', {
          classname: 'bg-danger text-light',
        })
        this.openUpdateSejamModal()
      } else {
        this.applyGiftCard()
        // اگر اطلاعاتش کامل نباشه نمیتونه صدور بزنه
        // this.fundService.checkingforupdatesejamdata().subscribe((res: any) => {
        //   this.isApplyBtnLoading.set(false)
        //   if (res.result) {
        //     this.toastService.show('اطلاعات سجام ناقص است. لطفا اطلاعات خود را بروزرسانی کنید. ', {
        //       classname: 'bg-danger text-light',
        //     })
        //     this.openUpdateSejamModal()
        //   } else {
        //     this.applyGiftCard()
        //   }
        // })
      }
    }, (err) => {
      this.isApplyBtnLoading.set(false)
    })
  }

  openUpdateSejamModal() {
    if (this.layoutService.isTabletSizeOrSmaller) {
      this.router.navigate(['/mobile/user-info'], { queryParams: { updateSejam: true, fundCode: this.giftCardValue()?.mutualFundCode } });
    } else {
      this.router.navigate(['/profile'], { queryParams: { updateSejam: true, fundCode: this.giftCardValue()?.mutualFundCode } });
    }

  }

}

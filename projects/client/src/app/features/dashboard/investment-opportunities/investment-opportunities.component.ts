import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CheckCustomerStepService, FundAttachment, FundAttachmentTypeEnum, LayoutService, MutualFundDetailsModel, FundService } from '@client/shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionFundModalComponent } from '../subscription-fund-modal/subscription-fund-modal.component';
import { FundListService } from '@client/core/services/fund-list.service';
import { Observable, take } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { ToastService } from '@client/core/services/toast.service';
import { environment } from 'projects/client/src/environments/environment';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';

@Component({
  selector: 'app-investment-opportunities',
  templateUrl: './investment-opportunities.component.html',
  styleUrls: ['./investment-opportunities.component.scss'],
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf,SvgViewerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestmentOpportunitiesComponent implements OnInit {
  apiUrl: string = environment.apiUrl;
  fundInfo = signal(null);
  mutualFundList$: Observable<any>;
  attachmentTypes = FundAttachmentTypeEnum;
  private compositionsByCode: Record<number, any> = {};

  constructor(
    private checkCustomerStepService: CheckCustomerStepService,
    private router: Router,
    private ngbModal: NgbModal,
    private fundListService: FundListService,
    private layoutService: LayoutService,
    private fundService: FundService,
    private toastService: ToastService,
  ) {

  }
  ngOnInit(): void {
    this.mutualFundList$ = this.fundListService.getAllMutualFunds();
    this.fundService.getCustomerRequestCompositions({ date: new Date() })
      .pipe(take(1))
      .subscribe(list => {
        this.compositionsByCode = (list || []).reduce((acc, c) => {
          acc[c.mutualFundCode] = c;
          return acc;
        }, {} as Record<number, any>);
      });
  }

  openSubscriptionModal(fund: MutualFundDetailsModel) {
    if (this.checkCustomerStepService.getCustomerStep()) {
      this.router.navigateByUrl('/').then(() => {
        if (this.layoutService.isTabletSizeOrSmaller) {
          this.router.navigate(['/mobile/user-info'], { queryParams: { updateSejam: true } });
        } else {
          this.router.navigate(['/profile'], { queryParams: { updateSejam: true } });
        }
      });
    } else {
      const mutualFundCode = fund?.seoRegisterNumber;
      const composition = this.compositionsByCode[mutualFundCode];
      const isAllowSubscription = fund?.isAllowSubscription;
      if (!composition?.subscriptionPermit || !isAllowSubscription) {
        this.toastService.show('در حال حاضر صندوق غیر فعال می‌باشد', { classname: 'bg-danger text-light' });
        return;
      }
      const modalRef = this.ngbModal.open(SubscriptionFundModalComponent, { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', backdrop: 'static' });
      modalRef.componentInstance.fundInfo = fund;
    }
  }

  getAttachment(fund: MutualFundDetailsModel, attachmentType: FundAttachmentTypeEnum): FundAttachment | undefined {
    return fund?.attachments?.find(a => a.categoryId === attachmentType);
  }
}

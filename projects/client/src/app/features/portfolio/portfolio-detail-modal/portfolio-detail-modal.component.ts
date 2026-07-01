import { CommonModule, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit, Signal, signal } from '@angular/core';
import { ToastService } from '@client/core/services/toast.service';
import { ProfileManagementService, MaskNumberDirective, FundAttachmentTypeEnum, FundAttachment, FundService } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssetPortfolioChartComponent } from '../asset-portfolio-chart/asset-portfolio-chart.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionFundModalComponent } from '@client/features/dashboard/subscription-fund-modal/subscription-fund-modal.component';
import { RedemptionFundModalComponent } from '@client/features/dashboard/redemption-fund-modal/redemption-fund-modal.component';
import { take } from 'rxjs';
import { environment } from 'projects/client/src/environments/environment';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';


@Component({
  selector: 'app-portfolio-detail-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, AssetPortfolioChartComponent, MaskNumberDirective, DecimalPipe,SvgViewerComponent],
  templateUrl: './portfolio-detail-modal.component.html',
  styleUrl: './portfolio-detail-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DecimalPipe
  ]
})
export class PortfolioDetailModalComponent implements OnInit {

  @Input() id;
  @Input() portfolioData: Signal<any>;
  apiUrl: string = environment.apiUrl
  isGuideSectionOpen = signal(false);
  activeModal = inject(NgbActiveModal);
  private compositionsByCode: Record<number, any> = {};
  constructor(
    private profileManagementService: ProfileManagementService,
    private toast: ToastService,
    private ngbModal: NgbModal,
    private fundService: FundService,
  ) {

  }
  ngOnInit(): void {
    const list = this.portfolioData()?.customerRequestCompositions || [];
    this.compositionsByCode = list.reduce((acc, c) => {
      acc[c.mutualFundCode] = c;
      return acc;
    }, {} as Record<number, any>);
  }
  reinvestMutualFund(mutualFund: any, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    mutualFund.customerEvidences.reinvest = isChecked ? 1 : 0;
    const command = {
      "mutualFundId": mutualFund?.customerRequestCompositions?.mutualFundId,
      "reinvest": mutualFund?.customerEvidences?.reinvest
    }
    this.profileManagementService.reinvestMutualFund(command)
      .subscribe((res: any) => {
        if (!res.isError) {
          this.toast.show(`سرمایه‌گذاری مجدد از محل تقسیم سود ${res.result === 1 ? 'فعال' : 'غیرفعال'} شد`, { classname: 'bg-info text-white' });

        }

      })

  }
  toggleGuide() {
    this.isGuideSectionOpen.update(value => !value);
  }

  get mutualFundDetail() {
    return this.portfolioData()?.allMutualFundDetail?.find(fund => fund.mutualFundId === this.id); 
  }

  openSubscriptionModal() {
    const mutualFundCode = this.mutualFundDetail?.seoRegisterNumber;
    const composition = this.compositionsByCode[mutualFundCode];
    const permitted = composition?.subscriptionPermit && this.mutualFundDetail?.isAllowSubscription;
    if (!permitted) {
      this.toast.show('در حال حاضر صندوق غیر فعال می‌باشد', { classname: 'bg-danger text-light' });
      return;
    }
    this.activeModal.close();
    const modalRef = this.ngbModal.open(SubscriptionFundModalComponent, { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', backdrop: 'static' });
    modalRef.componentInstance.fundInfo = this.mutualFundDetail;
  }

  openRedemptionModal() {
    const mutualFundCode = this.mutualFundDetail?.seoRegisterNumber;
    const composition = this.compositionsByCode[mutualFundCode];
    const permitted = composition?.redemptionPermit && this.mutualFundDetail?.isAllowRedemption;
    if (!permitted) {
      this.toast.show('در حال حاضر صندوق غیر فعال می‌باشد', { classname: 'bg-danger text-light' });
      return;
    }
    this.activeModal.close();
    const modalRef = this.ngbModal.open(RedemptionFundModalComponent, { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', backdrop: 'static' });
    modalRef.componentInstance.fundInfo = this.mutualFundDetail;
  }

  getLogo(): FundAttachment {
    return this.mutualFundDetail?.attachments?.find(a => a.categoryId === FundAttachmentTypeEnum.Logo);
  }
}

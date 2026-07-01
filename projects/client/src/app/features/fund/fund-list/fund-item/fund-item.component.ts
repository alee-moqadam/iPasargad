import { DecimalPipe, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SubscriptionFundModalComponent } from '@client/features/dashboard/subscription-fund-modal/subscription-fund-modal.component';
import { CheckCustomerStepService, FundAttachment, FundAttachmentTypeEnum, LayoutService, MutualFundDetailsModel, CustomerRequestCompositionModel } from '@client/shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '@client/core/services/toast.service';
import { environment } from 'projects/client/src/environments/environment';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fund-item',
  standalone: true,
  imports: [RouterLink, DecimalPipe, NgIf,SvgViewerComponent],
  templateUrl: './fund-item.component.html',
  styleUrl: './fund-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundItemComponent implements AfterViewInit {
  apiUrl: string = environment.apiUrl;
  fundDetail = input.required<MutualFundDetailsModel>();
  composition = input.required<CustomerRequestCompositionModel>();
  attachmentTypes = FundAttachmentTypeEnum;
  bgImage: string = '';

  constructor(
    private checkCustomerStepService: CheckCustomerStepService,
    private router: Router,
    private ngbModal: NgbModal,
    private layoutService: LayoutService,
    private toastService: ToastService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadBackgroundSvg();       
    }, 50);
  }

  openSubscriptionModal(fundInfo) {
    if (this.checkCustomerStepService.getCustomerStep()) {
      this.router.navigateByUrl('/').then(() => {
        if (this.layoutService.isTabletSizeOrSmaller) {
          this.router.navigate(['/mobile/user-info'], { queryParams: { updateSejam: true } });
        } else {
          this.router.navigate(['/profile'], { queryParams: { updateSejam: true } });
        }
      });
    } else {
      const isAllowSubscription = this.fundDetail()?.isAllowSubscription;
      const comp = this.composition();
      if (!comp?.subscriptionPermit || !isAllowSubscription) {
        this.toastService.show('در حال حاضر صندوق غیر فعال می‌باشد', { classname: 'bg-danger text-light' });
        return;
      }
      const modalRef = this.ngbModal.open(SubscriptionFundModalComponent, { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', backdrop: 'static' });
      modalRef.componentInstance.fundInfo = fundInfo;
    }
  }

  getAttachment(attachmentType: FundAttachmentTypeEnum): FundAttachment {
    return this.fundDetail()?.attachments?.find(a => a.categoryId === attachmentType);
  }

  encodeSvgToBase64(svgContent: string): string {
    return btoa(
      encodeURIComponent(svgContent).replace(
        /%([0-9A-F]{2})/g,
        (_, hex) => String.fromCharCode(parseInt(hex, 16))
      )
    );
  }

  loadBackgroundSvg() {
    
    const link :any = this.fundDetail()?.attachments?.find(a => a.categoryId === this.attachmentTypes.FundDetailsBg);
    
    if (!link) return;  
    const fullUrl = `${this.apiUrl}/${link?.downloadLink}`;
  
    this.http.get(fullUrl, { responseType: 'text' }).subscribe(svg => {
      const base64 = this.encodeSvgToBase64(svg);
      this.bgImage = `url("data:image/svg+xml;base64,${base64}")`;
        this.cdr.detectChanges();
    });
  }
}

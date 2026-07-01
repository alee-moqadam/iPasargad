import { DecimalPipe, JsonPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FundAttachment, FundAttachmentTypeEnum, FundService, LayoutService } from '@client/shared';
import { NgbActiveModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { GlobalEventService } from '@client/core/services/global-event.service';
import { environment } from 'projects/client/src/environments/environment';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';

@Component({
  selector: 'app-exchange-confirm',
  standalone: true,
  imports: [DecimalPipe, RouterLink, NgIf,SvgViewerComponent,NgbPopover],
  templateUrl: './exchange-confirm.component.html',
  styleUrl: './exchange-confirm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeConfirmComponent implements OnInit {

  @ViewChild('msgBox') msgBoxRef!: ElementRef<HTMLTextAreaElement>;
  apiUrl: string = environment.apiUrl;
  activeModal = inject(NgbActiveModal);
  fromFundDetail;
  toFundDetail;
  requestId;
  estimatedUnits;
  message: string = '';
  isPopoverOpen = false;
  isInPopover = false;

  constructor(
    private fundService: FundService, 
    private cdr: ChangeDetectorRef,
    private router: Router,
    private globalEventService: GlobalEventService,
    private layoutService: LayoutService,
  ) { }

  ngOnInit(): void {
    this.fundService.getSmartReceiptByRequestId(this.requestId).subscribe(
      (res: any) => {

        this.message = (res?.message || '').replace(/\r\n/g, '\n');
        this.cdr.detectChanges();

        //remove tag textarea from selected state
        setTimeout(() => {
          if (this.msgBoxRef?.nativeElement) {
            this.msgBoxRef.nativeElement.setSelectionRange(0, 0); // متن رو از حالت انتخاب در میاره
            this.msgBoxRef.nativeElement.blur(); // فوکوس رو بردار
            this.cdr.detectChanges();
          }
        });
      },
      (err) => {
        console.error('API Error:', err);
      }
    );
  }

  getLogoFromDetail(): FundAttachment {
    return this.fromFundDetail?.attachments?.find(a => a.categoryId === FundAttachmentTypeEnum.Logo);
  }
  
  getLogoToDetail(): FundAttachment {
    return this.toFundDetail?.attachments?.find(a => a.categoryId === FundAttachmentTypeEnum.Logo);
  }

  onDashboardClick(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/dashboard')) {
      this.globalEventService.emitReceiptConfirmationClosed();
    }
    this.activeModal.dismiss('dashboard-click');
  }

  onReportsClick(): void {
    this.globalEventService.emitReceiptConfirmationClosed();
    this.activeModal.dismiss('reports-click');
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    this.onModalDismiss();
  }

  onModalDismiss(): void {
    this.globalEventService.emitReceiptConfirmationClosed();
    this.activeModal.dismiss('esc-or-backdrop');
  }

    get isMobile(): boolean {
    return this.layoutService.isTabletSizeOrSmaller;
  }

  togglePopover(popover: any) {
    if (this.isPopoverOpen) {
      popover.close();
      this.isPopoverOpen = false;
    } else {
      popover.open();
      this.isPopoverOpen = true;
    }
  }

  onMouseEnter(popover: any) {
    popover.open();
    this.isPopoverOpen = true;
    this.isInPopover = true;
  }

  onMouseLeave(popover: any) {
    setTimeout(() => {
      const popoverEl = document.querySelector('.custom-popover');
      const isHovered = popoverEl?.matches(':hover');
      if (!isHovered) {
        popover.close();
        this.isPopoverOpen = false;
        this.isInPopover = false;
      }
    }, 200);
  }

}

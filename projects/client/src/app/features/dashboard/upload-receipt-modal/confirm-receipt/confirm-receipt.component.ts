import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FundAttachment, FundAttachmentTypeEnum, FundService } from '@client/shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalEventService } from '@client/core/services/global-event.service';
import { environment } from 'projects/client/src/environments/environment';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';

@Component({
  selector: 'app-confirm-receipt',
  standalone: true,
  imports: [DecimalPipe, RouterLink,SvgViewerComponent],
  templateUrl: './confirm-receipt.component.html',
  styleUrl: './confirm-receipt.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmReceiptComponent implements OnInit {

  @ViewChild('msgBox') msgBoxRef!: ElementRef<HTMLTextAreaElement>;
  apiUrl: string = environment.apiUrl;
  activeModal = inject(NgbActiveModal);
  fundDetail
  ticketNumber
  requestId
  receiptId
  amount
  attachmentTypes = FundAttachmentTypeEnum;

  message:string = '';

  constructor(
    private fundService: FundService, 
    private cdr: ChangeDetectorRef,
    private router: Router,
    private globalEventService: GlobalEventService
  ) {}

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

  onModalDismiss(): void {
    this.globalEventService.emitReceiptConfirmationClosed();
    this.activeModal.dismiss('esc-or-backdrop');
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    this.onModalDismiss();
  }

  getAttachment(fund: any, attachmentType: FundAttachmentTypeEnum): FundAttachment | undefined {
    return fund?.attachments?.find(a => a.categoryId === attachmentType);
  }

}

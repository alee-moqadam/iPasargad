import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FundService } from '@client/shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gift-confirmation-modal',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './gift-confirmation-modal.component.html',
  styleUrl: './gift-confirmation-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiftConfirmationModalComponent implements OnInit {
   @ViewChild('msgBox') msgBoxRef!: ElementRef<HTMLTextAreaElement>;

  giftCardInfo : any;
  activeModal = inject(NgbActiveModal);
  message:string = '';

  constructor(private fundService: FundService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

     this.fundService.getSmartReceiptByRequestId(this.giftCardInfo?.requestId).subscribe(
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

}

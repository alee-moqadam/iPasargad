import { DecimalPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FundAttachment, FundAttachmentTypeEnum, FundService, MutualFundDetailsModel } from '@client/shared';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';
import { environment } from 'projects/client/src/environments/environment';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-payment-return',
  templateUrl: './payment-return.component.html',
  styleUrls: ['./payment-return.component.scss'],
  standalone: true,
  imports: [RouterLink,NgIf,DecimalPipe,SvgViewerComponent ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentReturnComponent implements OnInit {

  @ViewChild('msgBox') msgBoxRef!: ElementRef<HTMLTextAreaElement>;
  apiUrl: string = environment.apiUrl;

  data: any
  paymentState: number;
  paymentStateName: string;
  paymentstateNotFound: string = 'نامعلوم';
  traceno: string;
  amount: number;
  paymentId: number;
  date:string;
  // volume;
  fundCode
  fundDetail =signal({});
  message:string = '';
  attachmentTypes = FundAttachmentTypeEnum;

  constructor(private route: ActivatedRoute, private fundService: FundService, private cdr: ChangeDetectorRef
  ) {
    //this.layoutService.setTheme(AppTheme.Light);
    this.route.queryParams.subscribe(params => {
      this.paymentStateName = params['paymentstate'] == 0 ? 'پرداخت با موفقیت انجام شد' : 'پرداخت ناموفق'
      this.paymentState = params['paymentstate'];
      this.traceno = params['traceno'];
      this.fundCode = params['mutualFundCode'];
      this.amount = params['amount'];
      this.paymentId = params['paymentId'];
      this.date = params['date']
    });
  }

  ngOnInit(): void {
    this.getMutualFundDetailByCode();
    this.getSmartReceiptByPaymentId();
  }

  getMutualFundDetailByCode() {
    this.fundService.getMutualFundDetailByCode(this.fundCode).pipe(
      switchMap(fund =>
        this.fundService.getNewFundAttachments(fund.mutualFundId).pipe(
          map(attachment => ({
            ...fund,
            attachment
          }))
        )
      )
    ).subscribe({
      next: fund => this.fundDetail.set(fund),
      error: err => {
        // console.error(err);
      }
    });

    
  }

  getSmartReceiptByPaymentId(){
    if(this.paymentState == 0){
      this.fundService.getSmartReceiptByPaymentId(this.paymentId).subscribe(
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

  getAttachment(fund: any, attachmentType: FundAttachmentTypeEnum): FundAttachment | undefined {
    return fund?.attachment?.result?.find(a => a.categoryId === attachmentType);
  }
}


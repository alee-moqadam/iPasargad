import { DecimalPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FundAttachment, FundAttachmentTypeEnum, FundService } from '@client/shared';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';
import { environment } from 'projects/client/src/environments/environment';

@Component({
  selector: 'app-apay-return',
  templateUrl: './apay-return.component.html',
  styleUrls: ['./apay-return.component.scss'],
  standalone: true,
  imports: [RouterLink, NgIf, DecimalPipe,SvgViewerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApayReturnComponent implements OnInit {

  @ViewChild('msgBox') msgBoxRef!: ElementRef<HTMLTextAreaElement>;
  apiUrl: string = environment.apiUrl;

  data: any
  paymentState: number;
  paymentStateName: string;
  paymentstateNotFound: string = 'نامعلوم';
  traceno: string;
  amount: number;
  paymentId: number;
  date: string;
  // volume;
  fundCode
  fundDetail = signal({});
  message: string = '';


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
    this.fundService.getMutualFundDetailByCode(this.fundCode).subscribe(fund => {
      this.fundDetail.set(fund);
      // this.volume = Math.floor(this.amount / this.fundDetail?.performance?.lastSubscriptionNav)
    })
  }

  getSmartReceiptByPaymentId() {
    if (this.paymentState == 0) {
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

  getLogo(): FundAttachment {
    return (this.fundDetail() as any)?.attachments?.find(a => a.categoryId === FundAttachmentTypeEnum.Logo);
  }
}

import { DecimalPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FundService } from '@client/shared';

@Component({
  selector: 'app-traditional-account-return',
  standalone: true,
  imports: [RouterLink,NgIf,DecimalPipe ],
  templateUrl: './traditional-account-return.component.html',
  styleUrl: './traditional-account-return.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TraditionalAccountReturnComponent {
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
  constructor(private route: ActivatedRoute) {
    //this.layoutService.setTheme(AppTheme.Light);
    this.route.queryParams.subscribe(params => {
      this.paymentStateName = params['status'] == 1 ? 'ارتباط با حساب سنتی با موفقیت انجام شد' : 'ارتباط با حساب سنتی ناموفق'
      this.paymentState = params['status'];
      // this.traceno = params['traceno'];
      // this.fundCode = params['mutualFundCode'];
      // this.amount = params['amount'];
      // this.paymentId = params['paymentId'];
      // this.date = params['date']
    });
  }

  ngOnInit(): void {
    // this.fundService.getMutualFundDetailByCode(this.fundCode).subscribe(fund => {
    //   this.fundDetail.set(fund);
    // })
  }
}

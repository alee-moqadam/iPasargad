import { ChangeDetectionStrategy, Component } from '@angular/core';
import {   Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-report-menus',
  standalone: true,
  imports: [RouterLink,FontAwesomeModule],
  templateUrl: './report-menus.component.html',
  styleUrl: './report-menus.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportMenusComponent  {
  readonly useMockViewData = true; // UI preview only. Turn off before production handoff.

  // UI preview mock data only. Do not use for production logic.
  readonly pendingReportEvents = [
    {
      title: 'واریز وجه',
      description: 'واریز ۱۲,۰۰۰,۰۰۰ ریالی در انتظار تأیید',
      status: 'در جریان',
      tone: 'deposit'
    },
    {
      title: 'برداشت',
      description: 'برداشت از صندوق هزاره سوم در حال پردازش',
      status: 'پیگیری',
      tone: 'redemption'
    },
    {
      title: 'سرمایه‌گذاری',
      description: 'درخواست سرمایه‌گذاری جدید ثبت شده است',
      status: 'ثبت‌شده',
      tone: 'subscription'
    }
  ];

  constructor(private router : Router) {

  }

  navigateToPage(pageRoute : string){
    this.router.navigate([`/reporting/${pageRoute}`])
  }

}

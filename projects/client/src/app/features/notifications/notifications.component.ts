import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, OnDestroy, OnInit, signal } from '@angular/core';
import { FundService, INotification, toGregorian, PersianDatetimePipe } from '@client/shared';
import { Subject } from 'rxjs';
import { FundAdvComponent } from '../fund/fund-adv/fund-adv.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NgFor, CommonModule, NgIf, FundAdvComponent, FontAwesomeModule,  PersianDatetimePipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent implements OnInit, OnDestroy {
  isPrivate = input<boolean>();

  interval;
  loading = signal<boolean>(false)
  notifications = signal<INotification[]>([]);
  $unsubscribe = new Subject()
  constructor(private fundService: FundService) {
  }
  ngOnDestroy(): void {
    this.$unsubscribe.next(true)
    this.$unsubscribe.complete()
  }

  ngOnInit(): void {
    this.getNotifications(this.isPrivate());

  }

  private getNotifications(isPrivate: boolean) {
    this.loading.set(true)
    this.fundService.getNotifications({
      reportFilter: {
        dateFilter: {
          startDate: toGregorian(new Date(new Date().setDate(new Date().getDate() - 365)), "YYYY-MM-DD"),
          endDate: toGregorian(new Date(), "YYYY-MM-DD"),
        },
        notificationType: 0,
        contactType: 0, // isPrivate ? 2 : 1,
        phrase: ''
      },
      optionalFilter: {
        take: 5,
        skip: 0,
        page: 0,
        value: '',
        sort: [
          {
            field: '',
            dir: ''
          }
        ]
      },
      branchId: 0
    }).subscribe((result: any) => {

      this.notifications.set([])
      this.loading.set(false);
      this.checkForUnseenMessage(result)
      let seenNotifIds = []
      // if (localStorage.getItem("seenNotifs")) {
      //   seenNotifIds = JSON.parse(localStorage.getItem("seenNotifs"));
      // }
      result.forEach(notif => {
        if (notif.notificationType == 2 && !notif.seen) {
          //پیام از نوع هشدار است و باید نمایش داده شود
          if (notif.contactType != 2) {
            //پیام همگانی یا صندوق است
            if (!seenNotifIds.includes(notif.notificationId)) {
              //پیام قبلا نمایش داده شده است به کاربر
              // this.seeNotification(notif)
            }
          } else {
            //پیام شخصی است و سرور میفهمه دیده شده یا نه
            // this.seeNotification(notif)
          }
        }

      });
      this.notifications.set(result);
    })
  }

  checkForUnseenMessage(result) {
    const condition1 = result.some(notif => !notif.seen && notif.contactType == 2);
    let seenNotifIds = []
    // if (localStorage.getItem("seenNotifs")) {
    //   seenNotifIds = JSON.parse(localStorage.getItem("seenNotifs"));
    // }
    const condition2 = result.some(notif => notif.contactType != 2 && !seenNotifIds.includes(notif.notificationId));

  }


}

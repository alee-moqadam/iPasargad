import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ChildActivationEnd, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastService } from '@client/core/services/toast.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { buffer, filter, interval, map, startWith, Subject, takeUntil } from 'rxjs';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FundListService } from '@client/core/services/fund-list.service';
import { HeaderComponent } from './header/header.component';
import { environment } from 'projects/client/src/environments/environment';
import { FundService, toGregorian, INotification, ConfirmModalComponent, CommunicationBoxComponent, LayoutService } from '@client/shared';

import { PermissionForWebPushComponent } from '@client/shared/components/permission-for-web-push/permission-for-web-push.component';
import { UserSettingsService } from '@client/core/services/user-settings.service';
import { SettingKeys } from '@client/shared/models/user-settings.model';
import { AllMutualFundsService } from '@client/shared/services/all-mutual-funds.service';
declare var Goftino: any;

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, BottomBarComponent, NgbToast, PermissionForWebPushComponent,
    FontAwesomeModule, RouterLink, HeaderComponent, CommunicationBoxComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturesComponent implements OnInit, AfterViewInit, OnDestroy {
  ngUnsubscribe$ = new Subject
  pinnedMenu = signal(false);
  notifications = [];
  appVersion = environment.VERSION;
  hasCheckedNotifications = false;

  @ViewChild('completeRegistration') completeRegistration: TemplateRef<HTMLInputElement>;

  constructor(private router: Router, private route: ActivatedRoute, private toastService: ToastService,
    fundListService: FundListService, private fundService: FundService, private modalService: NgbModal,
    private userSettingsService: UserSettingsService, private allMutualFundsService: AllMutualFundsService, private layoutService: LayoutService) {
    const routeEndEvent$ = this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd)
      );
    this.router.events
      .pipe(
        filter(e => e instanceof ChildActivationEnd && e.snapshot.component === this.route.component),
        buffer(routeEndEvent$),
        map(([ev]) => (ev as ChildActivationEnd).snapshot.firstChild.data),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(childRoute => {
        this.pinnedMenu.set(childRoute?.pinnedMenu);
      })
  }
  ngOnInit(): void {
    this.userSettingsService.get<boolean>(SettingKeys.FaNum).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((value: any) => {
      if (value.faNum) {
        document.body.classList.add('faNum');
      }
    })
    // this.fundService.getAllMutualFundsDetail().subscribe(fundList => {
    //   this.allMutualFundsService.setMutualFundInfo(fundList);
    // });
  }
  ngAfterViewInit(): void {
    if (Number(localStorage.getItem('step')) && Number(localStorage.getItem('step')) != 100) {
      this.toastService.show(this.completeRegistration, {
        classname: 'text-black',
        delay: 1000 * 60 * 10
      });
    }

    document?.getElementById('goftino-web')?.addEventListener('click', () => Goftino.toggle());

    // interval(300000).pipe(takeUntil(this.ngUnsubscribe$), startWith(0)).subscribe(() => {
    //   this.getNotifications();
    // });

    this.getNotifications(); // فقط یک‌بار اجرا در لاگین یا رفرش
  }

  openUpdateSejamModal() {
    // Navigate to a dummy route first, then back to the target route
    this.router.navigateByUrl('/').then(() => {
      if (this.layoutService.isTabletSizeOrSmaller) {
        this.router.navigate(['/mobile/user-info'], { queryParams: { updateSejam: true } });
      } else {
        this.router.navigate(['/profile'], { queryParams: { updateSejam: true } });
      }
    });
  }

  // private getNotifications() {
  //   // فقط یکبار در زمان لاگین یا رفرش اجرا شود
  //   if (this.hasCheckedNotifications) return;
  //   this.hasCheckedNotifications = true;

  //   const seenNotifIds = JSON.parse(localStorage.getItem("seenNotifs") || "[]");

  //   this.fundService.getNotifications({
  //     reportFilter: {
  //       dateFilter: {
  //         startDate: toGregorian(new Date(new Date().setDate(new Date().getDate() - 365)), "YYYY-MM-DD"),
  //         endDate: toGregorian(new Date(), "YYYY-MM-DD"),
  //       },
  //       notificationType: 0,
  //       contactType: 0,
  //       phrase: ''
  //     },
  //     optionalFilter: {
  //       take: 5,
  //       skip: 0,
  //       page: 0,
  //       value: '',
  //       sort: [{ field: '', dir: '' }]
  //     },
  //     branchId: 0
  //   }).subscribe((result: INotification[]) => {
  //     this.notifications = result;
  //     const newSeenIds = [...seenNotifIds];

  //     result.forEach(notif => {
  //       const alreadySeen = seenNotifIds.includes(notif.notificationId);

  //       if (notif.notificationType == 2) {
  //         // پیام هشدار
  //         if (notif.contactType != 2) {
  //           // پیام عمومی یا صندوقی: بررسی localStorage لازم است
  //           if (!alreadySeen) {
  //             this.seeNotification(notif);
  //             newSeenIds.push(notif.notificationId);
  //           }
  //         } else {
  //           // پیام شخصی: سرور مدیریت seen را انجام می‌دهد
  //           if (!notif.seen) {
  //             this.seeNotification(notif);
  //           }
  //         }
  //       } else {
  //         // پیام غیر هشدار: فقط یکبار نمایش داده شود
  //         if (!alreadySeen) {
  //           this.seeNotification(notif);
  //           newSeenIds.push(notif.notificationId);
  //         }
  //       }
  //     });

  //     localStorage.setItem("seenNotifs", JSON.stringify(newSeenIds));
  //   });
  // }

  private getNotifications() {
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
      this.notifications = result;
      let seenNotifIds = []
      // if (localStorage.getItem("seenNotifs")) {
      //   seenNotifIds = JSON.parse(localStorage.getItem("seenNotifs"));
      // }

      result.filter(res => seenNotifIds.indexOf(res.notificationId) == -1).forEach(notif => {
        if (notif.notificationType == 2 && !notif.seen) {
          //پیام از نوع هشدار است و باید نمایش داده شود
          if (notif.contactType != 2) {
            //پیام همگانی است یا صندوق است
            if (!seenNotifIds.includes(notif.notificationId)) {
              //پیام قبلا نمایش داده شده است به کاربر
              this.seeNotification(notif)
            }
          } else {
            //پیام شخصی است و سرور میفهمه دیده شده یا نه
            this.seeNotification(notif)
          }
        }

      });
    })
  }

  seeNotification(notification: INotification) {    
    const modalRef = this.modalService.open(ConfirmModalComponent, { windowClass: 'confirm-modal-dialog', backdrop: 'static' });
    modalRef.componentInstance.message = notification.text;
    modalRef.componentInstance.title = notification.subject;
    modalRef.componentInstance.createDate = notification.createDate;
    modalRef.componentInstance.notificationType = notification.notificationType;
    modalRef.componentInstance.isMessage = true;

    this.notifications = this.notifications.map(map => ({
      ...map,
      seen: map.notificationId === notification.notificationId ? true : map.seen
    }));
    let seenNotifIds = this.notifications.map(n => n.notificationId);
    // localStorage.setItem("seenNotifs", JSON.stringify(seenNotifIds))

    // modalRef.hidden.subscribe(res => {

    //   this.getNotifications()
    // })
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true)
    this.ngUnsubscribe$.complete()

  }

}

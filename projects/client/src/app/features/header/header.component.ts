import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { AuthService } from '@client/core/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ActivatedRoute, ChildActivationEnd, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { buffer, filter, map, Subject, takeUntil } from 'rxjs';
import { NgClass } from '@angular/common';
import { ConfirmModalComponent, ProfileManagementService, CustomerInfoModel } from '@client/shared';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
declare var Goftino: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, SidebarComponent, NgClass, RouterLinkActive, RouterLink, NgbTooltip],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit, OnDestroy , AfterViewInit {
  headerHeight = 70;
  pinnedMenu = signal(false);
  reportingListMenu = signal([]);
  ngUnsubscribe$ = new Subject;
  childRouteItem = signal(null);
  activeId = 1;
  customerInfo = signal<CustomerInfoModel>(null);

  constructor(private router: Router, private route: ActivatedRoute, 
    private modalService: NgbModal,
    private authService: AuthService,
    private profileManagementService: ProfileManagementService,) {
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
        this.childRouteItem.set(childRoute);
        if (childRoute?.reportMenu) {
          this.reportingListMenu.set(childRoute?.reportMenu);
        }
        this.pinnedMenu.set(childRoute?.pinnedMenu);
      })
  }
  ngOnInit(): void {
    this.customerInfo = this.profileManagementService.customerInfo
  }
  logout() {
    this.authService.logout()
  }

  logoutModal() {
    const modalRef = this.modalService.open(ConfirmModalComponent, { windowClass: 'confirm-modal-dialog' });
    modalRef.componentInstance.message = 'آیا می‌خواهید از حساب کاربری خود خارج شوید؟';
    modalRef.componentInstance.confirmed.subscribe((receivedEntry) => {
      this.authService.logout()
    })

  }



  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true)
    this.ngUnsubscribe$.complete()

  }

  ngAfterViewInit(): void {
    
    document
       .getElementById('goftino-toggle-header')
       ?.addEventListener('click', (d) => {
         Goftino.toggle();
       });
 
   }
}

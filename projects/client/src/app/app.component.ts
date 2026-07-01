import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgFor, ViewportScroller } from '@angular/common';
import { NgbDatepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { Subject, takeUntil, filter } from 'rxjs';
import { environment } from '../environments/environment';
import { FundService, ToastsComponent, SvgIconsRepoComponent, LayoutService } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastsComponent, NgFor, SvgIconsRepoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'سامانه آی‌پاسارگاد';
  lastChangesItem: string[] = [];
  @ViewChild('lastChangesModal') lastChangesModal: TemplateRef<any>;
  unsubscribe$ = new Subject();

  constructor(
    faConfig: FaConfig,
    library: FaIconLibrary,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private datepickerConfig: NgbDatepickerConfig,
    private modalService: NgbModal,
    private fundService: FundService,
    private updates: SwUpdate,
    private layoutService: LayoutService
  ) {
    library.addIconPacks(fas);
    this.datepickerConfig.firstDayOfWeek = 6;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });

    if (this.updates.isEnabled) {      
      
      this.updates.checkForUpdate().then(found => {
        console.log('Check for update result:', found);
      });

      this.updates.versionUpdates.subscribe(event => {
        console.log('versionUpdates EVENT:', event.type);
      });

      this.updates.versionUpdates
        .pipe(
          takeUntil(this.unsubscribe$),
          filter((event): event is VersionEvent => event.type === 'VERSION_READY')
        )
        .subscribe(() => {

          const showOnTime = environment.lastChanges.showOnTime;
          console.log("environment.lastChanges.showOnTime", environment.lastChanges.showOnTime);

          const nowTime = new Date().getTime();
          if (nowTime > showOnTime) {
            this.fetchChangelog();
            this.showLastChangesModal();
          } else {
            this.reloadApp();
          }
        });
    }
  }

  fetchChangelog() {
    this.fundService.getChangeLog().subscribe((data: any) => {
      this.lastChangesItem = data.result[0].changes; // Show the latest change
    })
  }

  @HostListener('window:resize')
  onResize() {
    this.layoutService.checkWindowSize();
  }

  // async reloadApp() {

  //   if ('serviceWorker' in navigator) {
  //     const registrations = await navigator.serviceWorker.getRegistrations();
  //     for (const reg of registrations) {
  //       await reg.unregister();
  //     }
  //   }  

  //   if ('caches' in window) {
  //     try {
  //       const cacheNames = await caches.keys();
  //       for (const cacheName of cacheNames) {
  //         await caches.delete(cacheName);
  //       }
  //     } catch (error) {
  //       console.error('Error clearing cache:', error);
  //     }
  //   }
  //   window.location.reload(); 
  // }


  async reloadApp() {

    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        console.log("cacheNames : " , window.caches);
        
        for (const cacheName of cacheNames) {
          await caches.delete(cacheName);
        }
      } catch (error) {
        console.error('Error clearing cache:', error);
      }
    }
    window.location.reload();
  }

  // showLastChangesModal() {
  //   this.modalService.open(this.lastChangesModal, {
  //     windowClass: 'rounded-2',
  //   });
  // }

  showLastChangesModal() {
    const modalRef = this.modalService.open(this.lastChangesModal, {
      windowClass: 'rounded-2',
      backdrop: true,
      backdropClass: 'update-backdrop',
      keyboard: false,
      centered: true
    });
    modalRef.dismissed.subscribe((reason) => {
      if (reason === 0) {
        this.reloadApp();
      }
    });
  }

 
  ngOnInit(): void {
    //
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null); // Emit null to indicate completion
    this.unsubscribe$.complete();
  }
}

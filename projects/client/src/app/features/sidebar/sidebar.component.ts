import { ChangeDetectionStrategy, Component, input, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@client/core/services/auth.service';
import { CustomerInfoModel, ProfileManagementService, MaskingNumberService } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'projects/client/src/environments/environment';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive, NgbTooltip],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, OnDestroy {
  appVersion = environment.VERSION;
  appVersionCode = environment.versionCode;
  private storageKey = 'isMasked'; // Key to use in localStorage
  isMasked = signal<boolean>(true);
  customerInfo = signal<CustomerInfoModel>(null);
  showToolsSubMenu = signal<boolean>(true);

  constructor(private profileManagementService: ProfileManagementService,
    private authService: AuthService,
    private maskingNumberService: MaskingNumberService) {
    this.isMasked.set(maskingNumberService.getMaskedState())
  }

  pinnedMenu = input.required<boolean>()

  ngOnInit(): void {
    this.profileManagementService.getCustomerInfo().subscribe(customerInfo => {
      this.customerInfo.set(customerInfo)

    })

    if (this.pinnedMenu()) {
      document.body.classList.add('fixed');
    } else {
      document.body.classList.remove('fixed');
    }
  }

  onToggleMenuStateClick(): void {
    if (document.body.classList.contains('fixed')) {
      document.body.classList.remove('fixed');
    } else {
      document.body.classList.add('fixed');
    }
  }

  // Toggle the masking state and store it in localStorage
  toggleMasking() {
    this.isMasked.set(!this.isMasked());
    this.maskingNumberService.toggleMasking()
  }

  logout() {

    this.authService.logout()
  }

  toggleToolsSubMenu() {
    this.showToolsSubMenu.set(!this.showToolsSubMenu());
  }

  ngOnDestroy(): void {
    this.customerInfo.set({
      personalInfo: null,
      contactInfo: null,
      bankAccounts: [],
      holders: [],
      registerInfo: null,
      partyServiceInfos: [],
      podSsoInfo: null
    })
  }

  // reloadApp() {
  //   window.location.href = window.location.href + '?t=' + new Date().getTime();


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

}

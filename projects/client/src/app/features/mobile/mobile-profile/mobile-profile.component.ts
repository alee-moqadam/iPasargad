import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal } from '@angular/core';
import { CustomerInfoModel, ProfileManagementService } from '@client/shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { AuthService } from '@client/core/services/auth.service';
import { StatesOfSejamModalComponent } from '@client/features/profile/states-of-sejam-modal/states-of-sejam-modal.component';

@Component({
  selector: 'app-mobile-profile',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './mobile-profile.component.html',
  styleUrl: './mobile-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileProfileComponent implements OnInit {
  customerInfo: WritableSignal<CustomerInfoModel>;
  constructor(
    private profileManagementService: ProfileManagementService,
    private ngbModal: NgbModal,
    private authService: AuthService,
  ) {
    this.customerInfo = profileManagementService.customerInfo;

  }

  ngOnInit(): void { }


  logout() {
    this.authService.logout()
  }

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

import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AnimatedBackgroundComponent } from './animated-background/animated-background.component';
import { environment } from '../../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommunicationBoxComponent } from '@client/shared';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    AnimatedBackgroundComponent,
    CommonModule,
    FontAwesomeModule,
    CommunicationBoxComponent,
    NgbTooltip
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  showInfoSection = signal<boolean>(true);
  isExpanded = signal<boolean>(false);
  appVersion = environment.VERSION;
  appVersionCode = environment.versionCode;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.firstChild?.firstChild?.data.subscribe(data => {
      this.showInfoSection.set(data.infoSection);
    });
  }

  toggleText() {
    this.isExpanded.set(!this.isExpanded())
  }
  
  async reloadApp() {

    
    // if ('serviceWorker' in navigator) {
    //   const registrations = await navigator.serviceWorker.getRegistrations();
    //   for (const reg of registrations) {
    //     await reg.unregister();
    //   }
    // }  


    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        console.log("cacheNames : ", window.caches);

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

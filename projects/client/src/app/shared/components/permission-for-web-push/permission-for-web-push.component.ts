import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { WebPushService } from '@client/core/services/web-push.service';

@Component({
  selector: 'app-permission-for-web-push',
  standalone: true,
  imports: [],
  templateUrl: './permission-for-web-push.component.html',
  styleUrl: './permission-for-web-push.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionForWebPushComponent implements OnInit {
  readonly VAPID_PUBLIC_KEY = "BPUElE05_HOdqNqJ7Lsn0qJF066mTG6lajCiVHQUuB-AaB3lR5fnMHtXI81yD1ox94C3bvEJtuH4dAXpE5nulIc";
  showDialog = signal(false);
  showHelp = signal(false);
  constructor(private swPush: SwPush,
    private webPushService: WebPushService
  ) {

  }

  ngOnInit(): void {
    console.log('Service Worker supported:', 'serviceWorker' in navigator);
    console.log('Push Manager supported:', 'PushManager' in window);

    if (this.swPush.isEnabled) {
      const showDialog = localStorage.getItem('showDialog');
      if (!showDialog || showDialog == 'true') {
        this.showDialog.set(true)
      }
    } else {
      console.error('Service workers are not enabled or supported.');
    }
  }

  subscribeToWebPush() {
    this.showHelp.set(true)
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.webPushService.addPushSubscriber(sub).subscribe(() => {
        this.notShowPermission()
      }))
      .catch(err => {
        this.notShowPermission()
        console.error("Could not subscribe to web push notifications", err)
      });
  }


  notShowPermission() {
    localStorage.setItem('showDialog', 'false');
    this.showDialog.set(false)
  }



}

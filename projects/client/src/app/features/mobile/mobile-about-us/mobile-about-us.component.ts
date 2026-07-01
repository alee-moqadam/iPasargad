import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from 'projects/client/src/environments/environment';

@Component({
  selector: 'app-mobile-about-us',
  standalone: true,
  imports: [],
  templateUrl: './mobile-about-us.component.html',
  styleUrl: './mobile-about-us.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileAboutUsComponent {
    appVersion = environment.VERSION;
    appVersionCode = environment.versionCode;
  

}

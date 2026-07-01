import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLocation, faPhone } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [FontAwesomeModule],
templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutUsComponent {
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faLocation=faLocation;

  constructor(title: Title) {
    // title.setTitle('آی‌‌‍پاسارگاد - درباره ما')
  }

}

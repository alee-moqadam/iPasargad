import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsComponent {

  constructor(title: Title) {
    // title.setTitle('آی‌‌‍پاسارگاد - تماس با ما')
  }
}

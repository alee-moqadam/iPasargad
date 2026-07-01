import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChangePasswordComponent } from '@client/features/settings/change-password/change-password.component';

@Component({
  selector: 'app-mobile-security',
  standalone: true,
  imports: [ChangePasswordComponent],
  templateUrl: './mobile-security.component.html',
  styleUrl: './mobile-security.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileSecurityComponent {

}

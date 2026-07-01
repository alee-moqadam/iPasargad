import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-bottom-bar',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomBarComponent {

}

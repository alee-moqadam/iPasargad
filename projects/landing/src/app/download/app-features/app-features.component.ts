import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-features',
  standalone: true,
  templateUrl: './app-features.component.html',
  styleUrl: './app-features.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFeaturesComponent {
}

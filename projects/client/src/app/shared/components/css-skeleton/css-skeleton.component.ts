import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-css-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './css-skeleton.component.html',
  styleUrl: './css-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssSkeletonComponent {

}

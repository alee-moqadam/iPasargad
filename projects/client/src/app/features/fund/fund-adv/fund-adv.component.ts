import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fund-adv',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './fund-adv.component.html',
  styleUrl: './fund-adv.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundAdvComponent {

}

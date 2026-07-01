import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { IdentityService, UserSignInHistoryModel } from '@client/shared';

@Component({
  selector: 'app-mobile-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-history.component.html',
  styleUrl: './mobile-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileHistoryComponent implements OnInit {
  history = signal<UserSignInHistoryModel[]>([]);
  constructor(
    private identityService: IdentityService
  ){

  }
  ngOnInit(): void {
    this.identityService.getUserSignInHistory().subscribe(res => {
      this.history.set(res);
    })
  }


}

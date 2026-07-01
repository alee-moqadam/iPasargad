import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AnimatedBackgroundComponent } from '@client/auth/animated-background/animated-background.component';
import { CustomerInfoModel, ProfileManagementService } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-quick-sejam-step2',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, AnimatedBackgroundComponent],
  templateUrl: './quick-sejam-step2.component.html',
  styleUrl: './quick-sejam-step2.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickSejamStep2Component implements OnInit {
  customerInfo = signal<CustomerInfoModel>(null);

  constructor(private profileManagementService: ProfileManagementService, private router: Router) {}

  ngOnInit(): void {
   this.profileManagementService.getCustomerInfo().subscribe(customer => {
    this.customerInfo.set(customer)
   })
  }

  finalizeSejamStatus(){
    localStorage.setItem('step', '100');
    this.router.navigate(['/dashboard']);
  }

}

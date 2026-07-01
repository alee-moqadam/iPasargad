import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AnimatedBackgroundComponent } from '@client/auth/animated-background/animated-background.component';
import { CustomerInfoModel, HolderModel, ProfileManagementService } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-quick-sejam-step2',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, AnimatedBackgroundComponent],
  templateUrl: './quick-sejam-step2-legal.component.html',
  styleUrl: './quick-sejam-step2-legal.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickSejamStep2LegalComponent implements OnInit {
  customerInfo = signal<CustomerInfoModel>(null);
  agent = signal<HolderModel>(null);
  ceo = signal<HolderModel>(null);

  constructor(private profileManagementService: ProfileManagementService, private router: Router) {}

  ngOnInit(): void {
   this.profileManagementService.getCustomerInfo().subscribe(customer => {
    this.customerInfo.set(customer)
    const agent=customer?.holders.filter(x=>x.positionType=='Agent')[0];
    this.agent.set(agent);
    const ceo=customer?.holders.filter(x=>x.positionType=='Ceo')[0];
    this.ceo.set(ceo);
   })
  }

  finalizeSejamStatus(){
    localStorage.setItem('step', '100');
    this.router.navigate(['/dashboard']);
  }

}

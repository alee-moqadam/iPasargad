import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { LoadingButtonComponent } from '../loading-button/loading-button.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@client/shared/shared.module';
import { NgClass } from '@angular/common';
import { ProfileManagementService } from '@client/shared/rest-services/profile-management/profile-management.service';
import { ToastService } from '@client/core/services/toast.service';

@Component({
  selector: 'app-reinvest-percent-modal',
  standalone: true,
  imports: [SharedModule, NgClass],
  templateUrl: './reinvest-percent-modal.component.html',
  styleUrl: './reinvest-percent-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReinvestPercentModalComponent implements OnInit{
  mutualFundId
  reinvestPercent
  activeModal = inject(NgbActiveModal);
  activePercent = signal<number>(100);
  submitting = signal(false);

  constructor(private profileManagementService: ProfileManagementService,
    private toast: ToastService,
  ) {


  }
  ngOnInit(): void {
    this.percentChange(this.reinvestPercent)
  }

  percentChange(chng) {
    this.activePercent.set(Number(chng))
  }


  reinvestMutualFund(event) {
    if (this.submitting()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.submitting.set(true);
    const command = {
      "mutualFundId": this.mutualFundId,
      "reinvest": this.activePercent()
    }
    this.profileManagementService.reinvestMutualFund(command)
      .subscribe((res: any) => {
        if (!res.isError) {
          if(this.activePercent() == 0){
            this.toast.show(`سرمایه‌گذاری مجدد از محل تقسیم سود غیرفعال شد`, { classname: 'bg-success text-white' });
          }else {
            this.toast.show(`سرمایه‌گذاری مجدد از محل تقسیم سود ${this.activePercent()} درصد ${res.result ? 'فعال' : 'غیرفعال'} شد`, { classname: 'bg-success text-white' });
          }
          this.activeModal.close({activePercent : this.activePercent() , action : 1});
        }
        this.submitting.set(false);

      },(err)=>{
        this.submitting.set(false);
      })

  }


  close() {
    // action 2 means closing the modal in dismiss action.
    this.activeModal.close({activePercent : this.activePercent() , action : 2});
  }
}

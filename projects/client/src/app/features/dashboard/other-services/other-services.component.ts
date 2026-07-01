import { ChangeDetectionStrategy, Component, WritableSignal } from '@angular/core';
import { ToastService } from '@client/core/services/toast.service';
import { UpdateDirectDebitComponent } from '@client/features/profile/update-directdebit/update-directdebit.component';
import { CustomerInfoModel, ProfileManagementService } from '@client/shared';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-other-services',
  templateUrl: './other-services.component.html',
  styleUrls: ['./other-services.component.scss'],
  standalone: true,
  imports: [FaIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtherServicesComponent {
  customerInfo: WritableSignal<CustomerInfoModel>;

  constructor(private profileManagementService: ProfileManagementService, private ngbModal: NgbModal, private toast: ToastService) {
    this.customerInfo = profileManagementService.customerInfo;
  }

  updateDirectDebit() {
    if (this.profileManagementService.isUserRegistrationComplete() !== null &&
      this.profileManagementService.isUserRegistrationComplete() === false
    ) {
      this.toast.show('مشتری عزیز، به منظور فعال‌سازی پرداخت مستقیم، ثبت نام خود را تکمیل کنید.', { classname: 'bg-danger text-white' });
      throw new Error('Customer registration is not complete');
    }

    if (this.customerInfo()?.podSsoInfo !== null && this.customerInfo()?.podSsoInfo.expired === false) {
      throw new Error("DirectDebit is already enabled!");
    }

    const modalRef = this.ngbModal.open(UpdateDirectDebitComponent, { modalDialogClass: 'modal-holder modal-dialog-centered', size: 'sm', backdrop: 'static' });
    modalRef.componentInstance.podSsoInfo = this.customerInfo()?.podSsoInfo;
  }
}

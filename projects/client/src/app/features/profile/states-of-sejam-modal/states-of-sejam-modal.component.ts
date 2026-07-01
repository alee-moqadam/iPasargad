import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, OnInit, signal } from '@angular/core';
import { IdentityService, ProfileManagementService, SharedModule } from '@client/shared';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { UpdateSejamModalComponent } from '../update-sejam-modal/update-sejam-modal.component';

@Component({
  selector: 'app-states-of-sejam-modal',
  standalone: true,
  imports: [NgIf, SharedModule, AsyncPipe],
  templateUrl: './states-of-sejam-modal.component.html',
  styleUrl: './states-of-sejam-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class StatesOfSejamModalComponent implements OnInit {

  sejamData;
  customerInfo;
  fundCode;
  userSejamStatus: number;
  sejamApiCalled$ = new BehaviorSubject(false);
  submitting = signal(false);

  constructor(private identityService: IdentityService, public activeModal: NgbActiveModal, 
    private ngbModal: NgbModal, private profileManagementService: ProfileManagementService) {

    this.customerInfo = profileManagementService.customerInfo;
    effect(() => {
      if (this.customerInfo()) {        
        this.getSejamStatus();
      }
    })
  }

  ngOnInit(): void {
    
  }

  onCounterValueChange(value: { time: string, count: number }) {
    if (value.count <= 0) {
      this.sejamApiCalled$.next(false);
    }
  }


  getSejamStatus() {

    if(this.profileManagementService.isSejamComplete){
      this.updateFromSejam();
      return
    }
    
    this.submitting.set(true);
    this.identityService.getSimpleSejamStatus()
    .subscribe({
      next: userSejamStatus => {
        this.userSejamStatus = userSejamStatus;
        this.sejamData = this.handleSejamStatus(userSejamStatus);
        this.submitting.set(false);
        
      },
      error: err => {
        this.submitting.set(false);
      }
    })
  }

  handleSejamStatus(code: number) {
    switch (code) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 9:
      case 10:
      case -3:
        return {
          message: "سرمایه‌گذار عزیز، مراحل ثبت‌نام شما در سامانه سجام تکمیل نشده است. لطفاً از طریق لینک زیر به سایت سجام مراجعه کرده و فرآیند ثبت‌نام خود را تکمیل کنید:",
          link: "https://profilesejam.csdiran.ir/session",
          linkDisplay: "sejam.ir",
          buttonTitle: "تکمیل فرآیند سجام"
        };

      case 5:
        return {
          message: "سرمایه‌گذار عزیز، مرحله نهایی احراز هویت شما در سامانه سجام انجام نشده است. لطفاً جهت مشاهده نحوه انجام احراز هویت و تکمیل ثبت‌نام خود، از طریق لینک زیر اقدام کنید:",
          link: "https://www.sejam.ir/fa/AU",
          linkDisplay: "https://www.sejam.ir/fa/AU",
          buttonTitle: "احراز هویت سجام"
        };

      case 7:
      case 8:
      case -1:
        return {
          message: "سرمایه‌گذار عزیز، وضعیت شما در سامانه سجام معتبر نمی‌باشد. لطفاً جهت کسب اطلاعات بیشتر و یا اصلاح وضعیت، از طریق لینک زیر به سامانه سجام مراجعه کنید:",
          link: "https://profilesejam.csdiran.ir/session",
          linkDisplay: "sejam.ir",
          buttonTitle: "مراجعه به سجام"
        };

      case -2:
        this.sejamApiCalled$.next(true);
        return {
          message: "سرمایه‌گذار عزیز، سامانه سجام در حال حاضر در دسترس نمی‌باشد. لطفاً پس از یک دقیقه مجدداً تلاش نمایید.",
          buttonTitle: "تلاش مجدد"
        };

      default:
        this.updateFromSejam();
        return null;
    }
  }


  updateFromSejam() {
    this.activeModal.dismiss()
    const modalRef = this.ngbModal.open(UpdateSejamModalComponent, { modalDialogClass: 'modal-holder modal-dialog-centered', size: 'md', backdrop: 'static' });
    modalRef.componentInstance.oldUser = this.customerInfo()?.registerInfo?.finalStatus == 100 ? true : false
    modalRef.componentInstance.fundCode = this.fundCode
  }


}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@client/core/services/toast.service';
import { StatesOfSejamModalComponent } from '@client/features/profile/states-of-sejam-modal/states-of-sejam-modal.component';
import { UpdateDirectDebitComponent } from '@client/features/profile/update-directdebit/update-directdebit.component';
import { CustomerInfoModel, LayoutService, ProfileManagementService } from '@client/shared';
import { BrokerFinalizeInfoModel } from '@client/shared/rest-services/fund/models/broker-finalize-info';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbAccordionModule, NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mobile-user-info',
  standalone: true,
  imports: [CommonModule , NgbAccordionModule, FontAwesomeModule,NgbPopover],
  templateUrl: './mobile-user-info.component.html',
  styleUrl: './mobile-user-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileUserInfoComponent implements OnInit {

  customerInfo: WritableSignal<CustomerInfoModel>;
  brokerFinalizeInfo = signal<BrokerFinalizeInfoModel>(null);

  isCollapsed1 = false;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isCollapsed4 = true;
  isCollapsed5 = true;

  isPopoverOpen = false;
  isInPopover = false;

  constructor(
    private profileManagementService: ProfileManagementService,
    private ngbModal: NgbModal,
     private route: ActivatedRoute,
     private toast: ToastService,
     private layoutService: LayoutService
  ) {
    this.customerInfo = profileManagementService.customerInfo;
  } 

  ngOnInit(): void { 
    this.getBrokerFinalizeInfo();
  }

  getBrokerFinalizeInfo() {
    this.profileManagementService.getBrokerFinalizeInfo().subscribe({
      next: (brokerFinalizeInfo :BrokerFinalizeInfoModel ) => {
        this.brokerFinalizeInfo.set(brokerFinalizeInfo);
      },
      error: (err) => {
        console.error('err:', err);
      }
    });
  }

  openStatesOfSejamModal(fundCode = null) {
    const modalRef = this.ngbModal.open(StatesOfSejamModalComponent, {
      modalDialogClass: 'modal-holder modal-dialog-centered',
      size: 'md',
      centered: true,
      backdrop: 'static',
      windowClass: 'test-modal'
    });
    modalRef.componentInstance.fundCode = fundCode;
  }


  ngAfterViewInit() {
    this.route.queryParamMap.subscribe(params => {
      const shouldOpenModal = params.get('activateDirectPayment');
      if (shouldOpenModal) {
        this.updateDirectDebit();
      }
      const shouldupdateSejam = params.get('updateSejam');
      const fundCode = params.get('fundCode');

      if (shouldupdateSejam) {
        this.openStatesOfSejamModal(fundCode);
      }
    });
  }


  updateDirectDebit() {
    if (this.profileManagementService.isUserRegistrationComplete() !== null &&
      this.profileManagementService.isUserRegistrationComplete() === false
    ) {
      this.toast.show('مشتری عزیز، به منظور فعال‌سازی پرداخت مستقیم، ثبت نام خود را تکمیل کنید.', { classname: 'bg-danger text-white' });
      throw new Error('Customer registration is not complete');
    }

    if (this.customerInfo()?.podSsoInfo !== null && this.customerInfo()?.podSsoInfo.expired === false) {
      this.toast.show('این سرویس برای شما فعال است.', { classname: 'bg-danger text-white' });
      throw new Error("DirectDebit is already enabled!");
    }

    const modalRef = this.ngbModal.open(UpdateDirectDebitComponent, { modalDialogClass: 'modal-holder modal-dialog-centered', size: 'sm', backdrop: 'static' });
    modalRef.componentInstance.podSsoInfo = this.customerInfo()?.podSsoInfo;
  }

    
  get isMobile(): boolean {
    return this.layoutService.isTabletSizeOrSmaller;
  }

  togglePopover(popover: any) {
    if (this.isPopoverOpen) {
      popover.close();
      this.isPopoverOpen = false;
    } else {
      popover.open();
      this.isPopoverOpen = true;
    }
  }

  onMouseEnter(popover: any) {
    popover.open();
    this.isPopoverOpen = true;
    this.isInPopover = true;
  }

  onMouseLeave(popover: any) {
    setTimeout(() => {
      const popoverEl = document.querySelector('.custom-popover');
      const isHovered = popoverEl?.matches(':hover');
      if (!isHovered) {
        popover.close();
        this.isPopoverOpen = false;
        this.isInPopover = false;
      }
    }, 200);
  }  

}

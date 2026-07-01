import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, WritableSignal, effect, computed, Signal, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '@client/core/services/auth.service';
import { CustomerInfoModel, LayoutService, ProfileManagementService } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbAccordionModule, NgbModal, NgbPopover, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { StatesOfSejamModalComponent } from './states-of-sejam-modal/states-of-sejam-modal.component';
import { UpdateDirectDebitComponent as UpdateDirectDebitComponent } from './update-directdebit/update-directdebit.component';
import { ToastService } from '@client/core/services/toast.service';
import { ConsultingGuideComponent } from '../dashboard/consulting-guide/consulting-guide.component';
import { HoldersSignatureModalComponent } from './holders-signature-modal/holders-signature-modal.component';
import { BrokerFinalizeInfoModel } from '@client/shared/rest-services/fund/models/broker-finalize-info';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgbAccordionModule, FontAwesomeModule, RouterLink, NgIf, JsonPipe, NgbTooltip, ConsultingGuideComponent,NgClass,NgbPopover],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements AfterViewInit, OnDestroy, OnInit {

  customerInfo: WritableSignal<CustomerInfoModel>;
  brokerFinalizeInfo = signal<BrokerFinalizeInfoModel>(null);
  
  isCollapsed1 = false;
  isCollapsed2 = false;
  isCollapsed3 = false;
  isCollapsed4 = false;
  isCollapsed5 = false;
    
  isPopoverOpen = false;
  isInPopover = false;

  hasRequiredHolders = computed(() => {
    const customerInfo = this.customerInfo();
    if (!customerInfo?.holders) {
      return false;
    }

    const holders = customerInfo.holders;
    const verifiedRealHolders = holders.filter(
      (h: any) => h.isHolderVerified && h.isRealPerson
    );

    const hasCeo = holders.some(h => h.positionType === 'Ceo');
    const hasBrokerAgent = holders.some((h: any) => h.isBrokerAgent);

    return verifiedRealHolders.length >= 2 && hasCeo && hasBrokerAgent;
  });

  displayHolders = computed(() => {
    const customerInfo = this.customerInfo();
    if (!customerInfo?.holders) {
      return [];
    }

    const holders = customerInfo.holders;
    const displayItems: any[] = [];

    holders.filter((h: any) => h.isCEO && h.positionType === 'Ceo').forEach((ceo, id) => {
      displayItems.push({
        ...ceo,
        uniqueId: ceo.personNationalId + '_CEO_' + id,
        displayType: 'CEO',
        displayPosition: 'Ceo'
      });
    });

    const brokerAgents = holders.filter((h: any) => h.isBrokerAgent);
    brokerAgents.forEach((agent, id) => {
      displayItems.push({
        ...agent,
        uniqueId: agent.personNationalId + '_BA_' + id,
        displayType: 'BrokerAgent',
        displayPosition: 'Agent'
      });
    });

    if (brokerAgents.length === 0) {
      holders
        .filter((h: any) => h.positionType === 'Agent')
        .forEach((agent, id) => {
          displayItems.push({
            ...agent,
            uniqueId: agent.personNationalId + '_AGENT_' + id,
            displayType: 'Agent',
            displayPosition: 'Agent'
          });
        });
    }

    return displayItems;
  });

  constructor(private profileManagementService: ProfileManagementService, private cdr: ChangeDetectorRef,
    private authService: AuthService, private ngbModal: NgbModal, private route: ActivatedRoute, private toast: ToastService,private layoutService:LayoutService) {

    this.customerInfo = profileManagementService.customerInfo;

    effect(() => {
      const info = this.customerInfo();
      if (info) {
        this.cdr.detectChanges();
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

  openHoldersSignatureModal(customerInfo?) {

    this.profileManagementService.updateCustomerInfoProfile().subscribe({
      next: (customerInfo) => {
        this.profileManagementService.customerInfo.set(customerInfo);
      },
      error: (err) => {
        console.error('err:', err);
      }
    });

    const modalRef = this.ngbModal.open(HoldersSignatureModalComponent, {
      modalDialogClass: 'modal-holder modal-dialog-centered', size: 'lg',
      centered: true,
      backdrop: 'static'
    });

    modalRef.componentInstance.customerInfo = this.customerInfo;
    modalRef.result.then(
      () => { },
      () => {
        this.profileManagementService.updateCustomerInfoProfile().subscribe({
          next: (customerInfo) => {
            this.profileManagementService.customerInfo.set(customerInfo);
          },
          error: (err) => {
            console.error('err:', err);
          }
        });
      },
    )
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

      const shouldHoldersSignature = params.get('holdersSignature');
      if (shouldHoldersSignature) {
        this.openHoldersSignatureModal(this.customerInfo);
      }

    });
  }


  logout() {
    this.authService.logout()
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

  ngOnInit() {

    if (!this.customerInfo() || !this.customerInfo()?.holders) {
      this.loadCustomerInfo();
    }

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

  loadCustomerInfo() {
    this.profileManagementService.updateCustomerInfoProfile().subscribe({
      next: (customerInfo) => {
        this.profileManagementService.customerInfo.set(customerInfo);
      },
      error: (err) => {
        console.error('err:', err);
      }
    });
  }

  openSejam() {
    window.open("https://profilesejam.csdiran.ir/session", '_blank')
  }

  openWepod() {
    window.open("https://web.wepod.ir/signup/mobile", '_blank')
  }

  ngOnDestroy(): void {
    this.ngbModal.dismissAll()
  }

  getPosition(positionType) {
    switch (positionType) {
      case "Ceo":
        return "مدیرعامل"
      case "Chairman":
        return "رئيس هیئت مدیره"
      case "Member":
        return "عضو هیئت مدیره"
      case "DeputyChairman":
        return "نائب رئیس هیئت‌مدیره"
      case "Agent":
        return "نماینده "

      default:
        return "ذينفعان شرکت"
    }
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

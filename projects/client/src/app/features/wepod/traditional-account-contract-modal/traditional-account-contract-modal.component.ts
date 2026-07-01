import { AsyncPipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '@client/core/services/toast.service';
import { CustomerInfoModel, getDurationEnumItemByDate, PodDirectDebitContractDurationEnum, PodDirectDebitContractDurationModel, PodDirectDebitLimitModel, PodAccountBalanceModel, PodService, ProfileManagementService, SharedModule } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { BehaviorSubject, combineLatest, finalize, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-traditional-account-contract-modal',
  standalone: true,
  templateUrl: './traditional-account-contract-modal.component.html',
  styleUrl: './traditional-account-contract-modal.component.scss',
  imports: [
    SharedModule,
    FontAwesomeModule,
    NgClass,
    NgIf,
    NgFor,
    DecimalPipe,
    NgbNavModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    AsyncPipe,
    NgSelectModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DecimalPipe,
    provideNgxMask(),
  ],
})

export class TraditionalAccountContractModalComponent implements OnInit {
  userContract: any = {};

  activeModal = inject(NgbActiveModal);
  submittingForm = signal(false);
  submitted = signal(false);
  isLoadingStaticDate = signal(false);
  contractDurations = signal<PodDirectDebitContractDurationModel[]>([]);
  directDebitLimits = signal<PodDirectDebitLimitModel[]>([]);
  sendingOTP = signal(false);
  hasOtpSent$ = new BehaviorSubject<boolean>(true);
  showCounter$ = new BehaviorSubject(false);
  otpSubmitted = signal(false);
  otp = '';
  disableOtpButton$ = combineLatest([this.hasOtpSent$, this.showCounter$])
    .pipe(map(([isOtpSend, showCounter]) => isOtpSend && showCounter));

  selectedContractDurationCode: PodDirectDebitContractDurationEnum;
  selectedDirectDebitLimitId: PodDirectDebitLimitModel;
  cardNumber = null;
  directDebitAgreement: boolean = false;

  constructor(private podService: PodService) {
  }

  ngOnInit(): void {
    this.sendOtp()
  }


  registerTraditionalContract(event) {
    if (this.submittingForm()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.submitted.set(true);
    if (this.otp == '' || !this.directDebitAgreement) {
      return;
    }
    this.submittingForm.set(true);

    this.podService.traditionalaccountconnectionrequest(this.otp).subscribe({
      next: (result) => {
        this.redirectToBankGateway(result.redirectUrl)
        //this.activeModal.close();
        this.submittingForm.set(false);
      },
      error: () => {
        this.submittingForm.set(false);
      }
    });

  }


  sendOtp() {

    this.sendingOTP.set(true);
    this.podService.sendOtp(true)
      .subscribe({
        next: (res) => {
          if (!res.isError) {
            this.sendingOTP.set(false);
            this.hasOtpSent$.next(true);
            this.showCounter$.next(true);
          }
        },
        error: () => {
          this.sendingOTP.set(false);

        }
      })
  }

  onCounterValueChange(value: { time: string, count: number }) {
    if (value.count <= 0) {
      this.hasOtpSent$.next(false);
      this.showCounter$.next(false);
    }
  }
  close() {
    this.activeModal.close();
  }

  redirectToBankGateway(gatewayUrl: string) {
    window.location.href = gatewayUrl;
  }

}

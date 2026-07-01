import { AsyncPipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '@client/core/services/toast.service';
import { PodService, SharedModule } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'update-token-pod-modal',
  templateUrl: './update-token-pod-modal.component.html',
  styleUrls: ['./update-token-pod-modal.component.scss'],
  standalone: true,
  imports: [SharedModule,
    FontAwesomeModule,
    NgClass,
    NgIf,
    NgFor,
    DecimalPipe,
    NgbNavModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DecimalPipe,
    provideNgxMask(),
  ],
})

export class UpdateTokenPodModalComponent {

  activeModal = inject(NgbActiveModal);
  submittingForm = signal(false);
  submitted = signal(false);
  cardNumber = '';

  otpDebit = '';
  otpDebitSubmitted = signal(false);
  hasOtpPodSent$ = new BehaviorSubject<boolean>(false);
  showCounterDebit$ = new BehaviorSubject<boolean>(false);

  submittingDebit = signal(false);
  sendingOtpPod = signal(false);

  disableOtpDebitButton$ = combineLatest([
    this.hasOtpPodSent$,
    this.showCounterDebit$
  ]).pipe(
    map(([hasOtpPodSent, showCounterDebit]) => hasOtpPodSent && showCounterDebit)
  );

  constructor(private podService: PodService, private toastService: ToastService) {
  }

  public get isCardNumberValid(): boolean {
    return !!this.cardNumber &&
      this.cardNumber.toString().length === 16 &&
      this.cardNumber.toString().split('')[0] !== '0';
  }

  sendOtpDebit() {
    if (this.sendingOtpPod() || this.showCounterDebit$.value) {
      return;
    }

    this.sendingOtpPod.set(true);

    this.podService.sendOtp(false).subscribe({
      next: (res: any) => {
        this.sendingOtpPod.set(false);
        if (!res?.isError) {
          this.hasOtpPodSent$.next(true);
          this.showCounterDebit$.next(true);
        }
      },
      error: () => {
        this.sendingOtpPod.set(false);
      }
    });
  }

  onCounterValueChangeDebit(value: { time: string, count: number }) {
    if (value.count <= 0) {
      this.hasOtpPodSent$.next(false);
      this.showCounterDebit$.next(false);
    }
  }

  verifyOtpDebit() {
    this.otpDebitSubmitted.set(true);

    if (!this.otpDebit) {
      return;
    }

    this.submittingDebit.set(true);

    this.podService.verifyOtp(this.otpDebit).subscribe({
      next: (res: any) => {
        this.submittingDebit.set(false);

        if (!res?.isError) {
          this.toastService.show('عملیات با موفقیت انجام شد.', { classname: 'bg-success text-light' });
          this.activeModal.close(true);
        }
      },
      error: () => {
        this.submittingDebit.set(false);
      }
    });
  }


  close() {
    this.activeModal.close(false);
  }

}

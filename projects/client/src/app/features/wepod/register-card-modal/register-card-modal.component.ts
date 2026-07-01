import { AsyncPipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PodService, SharedModule } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'register-card-modal',
  templateUrl: './register-card-modal.component.html',
  styleUrls: ['./register-card-modal.component.scss'],
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

export class RegisterCardModalComponent {

  activeModal = inject(NgbActiveModal);
  submittingForm = signal(false);
  submitted = signal(false);
  cardNumber = '';

  constructor(private podService: PodService) {
  }

  public get isCardNumberValid(): boolean{
    return !!this.cardNumber &&
            this.cardNumber.toString().length === 16 &&
            this.cardNumber.toString().split('')[0] !=='0';
  }

  registerCard(event) {
    if (this.submittingForm()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.submitted = signal(true);
    if (!this.cardNumber || !this.isCardNumberValid) {
      return
    }
    this.submittingForm.set(true);
    this.podService.registerCardNumber(this.cardNumber).subscribe({
      next: () => {
        this.activeModal.close(true);
        this.submittingForm.set(false);
      },
      error: () => {
        this.submittingForm.set(false);
      }
    });
  }

  close() {
    this.activeModal.close(false);
  }

}

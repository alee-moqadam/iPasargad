import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { PersianDatetimePipe } from '@client/shared/pipes';
import { toPersianDate } from '@client/shared/utilities/date-time';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone:true,
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  imports: [FontAwesomeModule,PersianDatetimePipe],

})
export class ConfirmModalComponent implements OnInit {
  @Input() public message;
  @Input() public title ="";
  @Input() public createDate ="";
  @Input() public notificationType;
  @Input() public isMessage =false;
  @Output() confirmed: EventEmitter<any> = new EventEmitter();
	activeModal = inject(NgbActiveModal);

  createDateJalali = '';

  constructor(private modalService: NgbModal,) { }

  ngOnInit(): void {
   this.createDateJalali = toPersianDate(this.createDate,'YYYY/MM/DD - HH:mm:ss').split('-')[0] 
  }

  closeModal() {
    this.activeModal.close()
  }

  confirm() {
    this.confirmed.emit(true);
    this.closeModal()
  }
}

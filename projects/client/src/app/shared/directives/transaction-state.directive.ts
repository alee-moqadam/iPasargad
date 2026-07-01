import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { TransactionStateEnum } from '../enums';

@Directive({
  selector: '[transactionState]',
})
export class TransactionStateDirective implements OnChanges {
  @Input('state') state: number;

  constructor(private el: ElementRef, private renderer2: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    switch (this.state) {
      case TransactionStateEnum.Draft:
      case TransactionStateEnum.Waiting:
        this.renderer2.addClass(this.el.nativeElement, 'badge bg-warning');
        break;

      case TransactionStateEnum.RejectedBySystem:
      case TransactionStateEnum.Cancel:
      case TransactionStateEnum.RejectedByManager:
      case TransactionStateEnum.Deleted:
        this.renderer2.addClass(this.el.nativeElement, 'badge bg-danger');
        break;

      case TransactionStateEnum.Confirm:
      case TransactionStateEnum.EvidenceConfirm:
        this.renderer2.addClass(this.el.nativeElement, 'badge bg-success');
        break;

      default:
        this.renderer2.addClass(this.el.nativeElement, 'badge bg-secondary');
        break;
    }
  }
}

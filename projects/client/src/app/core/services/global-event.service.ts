import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalEventService {
  private receiptConfirmationClosedSubject = new Subject<void>();

  /**
   * Emit a receipt confirmation event
   */
  emitReceiptConfirmationClosed(): void {
    this.receiptConfirmationClosedSubject.next();
  }

  /**
   * Listen for receipt confirmation events
   */
  onReceiptConfirmationClosed(): Observable<void> {
    return this.receiptConfirmationClosedSubject.asObservable();
  }
}

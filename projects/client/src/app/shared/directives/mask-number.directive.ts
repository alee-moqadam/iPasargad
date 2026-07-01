import { Directive, ElementRef, Input, Renderer2, HostListener, OnChanges, SimpleChanges, effect } from '@angular/core';
import { MaskingNumberService } from '../services/masking-number.service';
import { DecimalPipe } from '@angular/common';

@Directive({
  selector: '[maskNumber]',
  standalone: true
})
export class MaskNumberDirective implements OnChanges {

  @Input() maskNumber: string = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private maskingService: MaskingNumberService,
    private decimalPipe: DecimalPipe
  ) {
    effect(() => {
      this.maskingService.getMaskedState();
      this.updateView();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateView();
  }

  @HostListener('click') onToggleMasking() {
    this.maskingService.toggleMasking();
    this.updateView();
  }

  private updateView() {
    const isMasked = this.maskingService.getMaskedState();
    const displayValue = isMasked ? '×××××' : this.decimalPipe.transform(this.maskNumber);
    this.renderer.setProperty(this.el.nativeElement, 'textContent', displayValue);
  }
}

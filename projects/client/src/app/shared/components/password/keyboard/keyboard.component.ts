import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeyboardService } from './keyboard.service';
import { KeyboardKeyDirective } from './keyboard-key.directive';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [KeyboardKeyDirective],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss'
})
export class KeyboardComponent implements OnInit {
  @HostBinding('class.shown')
  public shown: boolean;

  private keyboardSubscription: Subscription;

  constructor(private el: ElementRef,  public keyboard: KeyboardService) {
  }

  ngOnInit() {
    this.keyboardSubscription = this.keyboard.keyboardRequested.subscribe(show => {
      if (show) {
        this.shown = true;
      }
      else {
        this.shown = false;
      }
    });
  }

  ngOnDestroy() {
    this.keyboardSubscription.unsubscribe();
  }

  onShift() {
    this.keyboard.shift = !this.keyboard.shift;
  }

  onAlt() {
    this.keyboard.alt = !this.keyboard.alt;
    this.keyboard.shift = false;
  }

  onBackspace() {
    this.keyboard.fireBackspacePressed();
  }

  onEnter() {
    this.keyboard.fireEnterPressed();
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('click', ['$event'])
  onMouseEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
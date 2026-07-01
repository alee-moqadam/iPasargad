import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeyboardService } from './keyboard.service';

@Directive({
  selector: '[appPasswordInput]',
  standalone: true
})
export class PasswordInputDirective implements OnInit {
  private keySubscription: Subscription;
  private backspaceSubscription: Subscription;
  private enterSubscription: Subscription;
  private measure: HTMLElement;

  constructor(private el: ElementRef, private keyboard: KeyboardService, private renderer: Renderer2) {
  }
  @Input() passwordInput;
  @Output() keyvalue= new EventEmitter();
  show = false;
  ngOnInit() {
    // TODO I'm sure there's an "Angular way" of doing this
    let thisStyle = window.getComputedStyle(this.el.nativeElement);
    this.measure = document.createElement("span");
    this.measure.style.position = "absolute";
    this.measure.style.right = "100%";
    this.measure.style.font = thisStyle.font;
    document.body.appendChild(this.measure);
    this.renderer.listen(this.passwordInput, 'focusout', (event) => {
      if (this.show) {
        this.hideKeyboard()
      }
    });
  }

  @HostListener("click")
  private click() {
    if (this.show) {
      this.hideKeyboard()
    } else {
      this.showKeyboard()
    }
  }
  showKeyboard() {
    this.keyboard.fireKeyboardRequested(true);
    this.subscribeToKeyboardEvents();
    this.show = true;
  }
  hideKeyboard() {
    this.keyboard.fireKeyboardRequested(false);
    this.unsubscribeFromKeyboardEvents();
    this.show = false
  }

  private subscribeToKeyboardEvents() {
    this.keySubscription = this.keyboard.keyPressed.subscribe(key =>
      this.onKey(key)
    );
    this.backspaceSubscription = this.keyboard.backspacePressed.subscribe(_ =>
      this.onBackspace()
    );
    this.enterSubscription = this.keyboard.enterPressed.subscribe(_ =>
      this.onEnter()
    );
  }

  private unsubscribeFromKeyboardEvents() {
    if (this.keySubscription) {
      this.keySubscription.unsubscribe();
      this.backspaceSubscription.unsubscribe();
      this.enterSubscription.unsubscribe();
    }
  }

  private onKey(key: string) {
    // TODO Refactor this into a single method with the code in onBackspace
    let element = this.passwordInput,
      start = element.selectionStart,
      end = element.selectionEnd;

    this.measure.textContent = element.value.substr(0, start) + key;
    element.value =
      element.value.substr(0, start) + key + element.value.substr(end);
    // element.focus();
    this.keyvalue.emit(element.value)
    
    element.selectionStart = element.selectionEnd = start + 1;

    this.updateScrollPosition();
  }

  private onBackspace() {
    let element = this.passwordInput,
      start = element.selectionStart,
      end = element.selectionEnd;

    if (start == 0) {
      return;
    }

    if (start == end) {
      start--;
    }

    this.measure.textContent = element.value.substr(0, start);
    element.value = element.value.substr(0, start) + element.value.substr(end);
    // element.focus();
    this.keyvalue.emit(element.value)
    element.selectionStart = element.selectionEnd = start;

    this.updateScrollPosition();
  }

  private updateScrollPosition() {
    let element = this.passwordInput;
    element.scrollLeft = this.measure.offsetWidth - (element.clientWidth - 10);
  }

  private onEnter() {
    this.hideKeyboard()
  }
}
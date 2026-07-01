import { DatePipe } from '@angular/common';
import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, Renderer2, SimpleChanges } from '@angular/core';
import { Subject, Subscription, timer } from 'rxjs';
import { finalize, switchMap, take, tap } from 'rxjs/operators';

interface ITime {
  minutes: number;
  seconds: number
}
@Directive({
  selector: '[counter]',
  providers: [
    DatePipe
  ],
})
export class CounterDirective implements OnChanges, OnDestroy {

  private _counterSource$ = new Subject<any>();
  private _subscription = Subscription.EMPTY;
  private element: HTMLElement;

  @Input() counter: ITime = {
    minutes: 1,
    seconds: 0
  };

  @Input() text = '';
  @Input() altText = '';
  @Input() interval: number = 1000;
  @Input() start: boolean = false;
  @Input() showCounter = true;
  @Output() value = new EventEmitter<{ count: number, time: string }>();

  constructor(private elementRef: ElementRef, private dateService: DatePipe) {

    this.element = this.elementRef.nativeElement;

    this._subscription = this._counterSource$.pipe(
      switchMap(({ interval, count, time }) => {
        let newTime = time;
        return timer(0, interval).pipe(
          take(count),
          tap(() => {
            newTime = new Date(newTime.getTime() - interval);
            const value = {
              count: --count,
              time: this.dateService.transform(newTime, 'mm:ss')
            };

            this.element.innerText = `${this.altText} ${this.showCounter ? value.time : ''}`;
            this.value.emit(value)
          }),
          finalize(() => {
            this.element.innerText = `${this.text}`;

          })
        )
      })
    ).subscribe();
  }

  private get count() {
    return this.counter.minutes * 60 + this.counter.seconds;
  }

  private get time() {
    return new Date(new Date().setMinutes(this.counter.minutes, this.counter.seconds, 0));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.start?.currentValue) {
      
      
      this._counterSource$.next({ time: this.time, count: this.count, interval: this.interval });
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}

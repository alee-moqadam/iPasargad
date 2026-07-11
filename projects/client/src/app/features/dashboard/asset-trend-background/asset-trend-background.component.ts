import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-asset-trend-background',
  standalone: true,
  templateUrl: './asset-trend-background.component.html',
  styleUrl: './asset-trend-background.component.scss'
})
export class AssetTrendBackgroundComponent implements AfterViewInit, OnDestroy {
  @Input() totalAssets = 0;

  readonly renderPath = signal(true);

  private intersectionObserver?: IntersectionObserver;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.replay();
        }
      });
    }, { threshold: 0.65 });

    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (window.matchMedia?.('(hover: hover)').matches) {
      this.replay();
    }
  }

  get trendPath(): string {
    return Number(this.totalAssets) > 0
      ? 'M 4 118 C 34 114, 48 100, 76 104 S 118 112, 146 88 S 192 74, 216 79 S 252 90, 280 58 S 326 39, 356 30'
      : 'M 4 108 C 32 107, 54 110, 82 109 S 128 106, 154 109 S 196 113, 224 110 S 270 107, 302 109 S 338 112, 356 110';
  }

  private replay(): void {
    this.renderPath.set(false);
    requestAnimationFrame(() => this.renderPath.set(true));
  }
}

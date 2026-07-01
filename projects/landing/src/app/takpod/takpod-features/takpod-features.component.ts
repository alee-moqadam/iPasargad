import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'app-takpod-features',
  standalone: true,
  imports: [],
  templateUrl: './takpod-features.component.html',
  styleUrl: './takpod-features.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TakpodFeaturesComponent {
  private isBrowser: boolean;
  @ViewChild('animatedBlock') block!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }


  ngAfterViewInit(): void {
    if (this.isBrowser && typeof IntersectionObserver !== 'undefined' && this.block?.nativeElement) {
      const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observerInstance.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      observer.observe(this.block.nativeElement);
    }
  }

}

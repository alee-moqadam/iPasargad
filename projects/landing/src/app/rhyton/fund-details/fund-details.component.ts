import {
  CommonModule,
  isPlatformBrowser,
  NgTemplateOutlet
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-fund-details',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent, NgTemplateOutlet],
  templateUrl: './fund-details.component.html',
  styleUrl: './fund-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FundDetailsComponent {
  @ViewChild('animatedBlock') block!: ElementRef;

  private isBrowser: boolean;

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

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
import { FundCompositionComponent } from '../fund-composition/fund-composition.component';

@Component({
  selector: 'app-takpod-details',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent, NgTemplateOutlet,FundCompositionComponent],
  templateUrl: './takpod-details.component.html',
  styleUrl: './takpod-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakpodDetailsComponent {
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

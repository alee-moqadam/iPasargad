import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface AuthLandingSlide {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-auth-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './auth-landing.component.html',
  styleUrl: './auth-landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLandingComponent implements OnInit, OnDestroy {
  readonly slides: AuthLandingSlide[] = [
    {
      icon: '#ico_box_plus_fill',
      title: 'سرمایه‌گذاری هوشمند',
      description: 'تمام صندوق‌های سرمایه‌گذاری را در یک محیط ساده، سریع و حرفه‌ای مدیریت کنید.'
    },
    {
      icon: '#ico_box_exhange_fill',
      title: 'معاملات آنلاین',
      description: 'خرید، فروش، صدور و ابطال صندوق‌ها تنها با چند لمس.'
    },
    {
      icon: '#ico_chart_bar_box',
      title: 'گزارش‌های کامل',
      description: 'وضعیت دارایی، بازدهی و عملکرد سرمایه‌گذاری خود را به صورت لحظه‌ای مشاهده کنید.'
    },
    {
      icon: '#ico_person_circle',
      title: 'امن و مطمئن',
      description: 'ورود ایمن، اطلاعات محافظت‌شده و تجربه‌ای قابل اعتماد برای مدیریت سرمایه.'
    }
  ];

  readonly activeSlide = signal(0);

  private autoplayTimer: ReturnType<typeof setInterval> | null = null;
  private pointerStartX: number | null = null;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  selectSlide(index: number): void {
    this.activeSlide.set(index);
    this.restartAutoplay();
  }

  onPointerDown(event: PointerEvent): void {
    this.pointerStartX = event.clientX;
    this.stopAutoplay();
  }

  onPointerUp(event: PointerEvent): void {
    this.handleSwipe(event.clientX);
    this.startAutoplay();
  }

  onPointerCancel(): void {
    this.pointerStartX = null;
    this.startAutoplay();
  }

  private handleSwipe(pointerEndX: number): void {
    if (this.pointerStartX === null) {
      return;
    }

    const swipeDistance = pointerEndX - this.pointerStartX;
    this.pointerStartX = null;

    if (Math.abs(swipeDistance) < 42) {
      return;
    }

    if (swipeDistance < 0) {
      this.showNextSlide();
      return;
    }

    this.showPreviousSlide();
  }

  private showNextSlide(): void {
    this.activeSlide.set((this.activeSlide() + 1) % this.slides.length);
  }

  private showPreviousSlide(): void {
    this.activeSlide.set((this.activeSlide() - 1 + this.slides.length) % this.slides.length);
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }

  private startAutoplay(): void {
    if (this.autoplayTimer !== null) {
      return;
    }

    this.autoplayTimer = setInterval(() => this.showNextSlide(), 4000);
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer === null) {
      return;
    }

    clearInterval(this.autoplayTimer);
    this.autoplayTimer = null;
  }
}

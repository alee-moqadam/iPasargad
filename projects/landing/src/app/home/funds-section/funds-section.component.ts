import { isPlatformBrowser, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-funds-section',
  standalone: true,
  imports: [FontAwesomeModule, RouterLinkActive, NgClass],
  templateUrl: './funds-section.component.html',
  styleUrl: './funds-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundsSectionComponent {

  private isBrowser: boolean;
  @ViewChild('animatedBlock') block!: ElementRef;
  @ViewChild('fundsSlider')
  fundsSlider?: ElementRef<HTMLDivElement>;

  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;



  funds: any[] = [
    {
      title: 'هزار سوم پاد',
      type: 'درآمد ثابت - صدور و ابطالی',
      description: 'سود ماهانه - سرمایه‌گذاری با حداقل ریسک',
      profit: '31%',
      profitLabel: 'سود سالانه معادل بانکی',
      image: '/images/home/Hezare_Sevom.webp',
      link: '/hezareh3-pod'
    },
    {
      title: 'پاسارگاد',
      type: 'درآمد ثابت - قابل معامله در بورس',
      description: 'سود مرکب سالانه - سود روزشمار',
      profit: '39%',
      profitLabel: 'سود موثر سالانه',
      image: '/images/home/ETF.webp',
      headerClass: 'blue',
      link: '/pasargadetf'
    },
    {
      title: 'ریتون',
      type: 'طلا - قابل معامله در بورس',
      description: 'بدون اجرت، کارمزد و مالیات - سرمایه‌گذاری امن',
      profit: '',
      profitLabel: 'بازدهی متناسب با رشد طلا و سکه',
      image: '/images/home/Ryton.webp',
      headerClass: 'gold',
      link: '/rhyton'
    },
    {
      title: 'تکپاد',
      type: 'سهامی - قابل معامله در بورس',
      description: 'بازدهی بیشتر از شاخص - سرمایه‌گذاری بلندمدت',
      profit: '',
      profitLabel: 'بازدهی متناسب با رشد بازار بورس',
      image: '/images/home/Takpod.webp',
      headerClass: 'purple',
      cardClass: 'ms-8',
      link: '/takpod'
    }
  ];



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



    if (!this.fundsSlider?.nativeElement) {
      return;
    }

    const slider = this.fundsSlider.nativeElement;

    slider.addEventListener('mousedown', () => {
      console.log('drag');
    });
    slider.addEventListener('mousedown', (e) => {
      this.isDown = true;
      slider.style.cursor = 'grabbing';

      this.startX = e.pageX - slider.offsetLeft;
      this.scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      this.isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
      this.isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {

      if (!this.isDown) return;

      e.preventDefault();

      const x = e.pageX - slider.offsetLeft;
      const walk = (x - this.startX) * 2;

      slider.scrollLeft = this.scrollLeft - walk;
    });
  }

}

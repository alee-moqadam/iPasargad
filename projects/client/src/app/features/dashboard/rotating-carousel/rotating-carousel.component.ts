import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, ElementRef, input, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaskNumberDirective, MaskingNumberService } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { register, SwiperContainer } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';


@Component({
  selector: 'app-rotating-carousel',
  standalone: true,
  imports: [FontAwesomeModule, MaskNumberDirective, RouterLink],
  templateUrl: './rotating-carousel.component.html',
  styleUrl: './rotating-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RotatingCarouselComponent {
  private readonly swiperContainer = viewChild.required<ElementRef<SwiperContainer>>('swiperContainer');
  totalNetValue = input.required<number>()
  isMasked = computed(() => {
    const _mask = this.maskingService.getMaskedState();
    return _mask
  });

  swiperElement
  swiperOptions: SwiperOptions = {
    effect: "coverflow",
    grabCursor: true,
    // freeMode: true,
    slidesPerView: 1.4,
    initialSlide: 2,
    allowTouchMove:false,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 2,
      stretch: 100,
      depth: 130,
      modifier: 3,
      slideShadows: false
    },
    navigation: {
      enabled: false,
    },
    keyboard: {
      enabled: true
    },
    mousewheel: {
      thresholdDelta: 70,
      enabled:false
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    // injectStyles: [
    //   `.swiper-button-next svg, .swiper-button-prev svg {width: 50% !important; color: #000}`
    // ],
    breakpoints:{
      800:{
        slidesPerView: 1.3,
      },
      400:{
        navigation: {
          enabled: false,
        },
        slidesPerView: 1.2,
      },
      100:{
        navigation: {
          enabled: false,
        },
        slidesPerView: 1,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: true
        },
      }
    }
  }

  constructor(private maskingService: MaskingNumberService,) {
    effect(() => {
      // Register Swiper web component
      register();
      this.swiperElement = this.swiperContainer().nativeElement;
      Object.assign(this.swiperElement, this.swiperOptions);
      this.swiperElement.initialize();
    });
  }

  toggleMask() {
    this.maskingService.toggleMasking();
  }

  // prev() {
  //   this.swiperContainer().nativeElement.swiper.slidePrev();
  // }

  // next() {
  //   this.swiperContainer().nativeElement.swiper.slideNext();
  // }
}
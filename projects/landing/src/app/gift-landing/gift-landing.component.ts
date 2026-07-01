import { ChangeDetectionStrategy, Component, Inject, PLATFORM_ID } from '@angular/core';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faEnvelope, faEnvelopesBulk, faLocation, faPhone } from '@fortawesome/free-solid-svg-icons';

import { CommonModule, DOCUMENT, isPlatformBrowser, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from '../shared/footer/footer.component';
import { ContactGadgetComponent } from '../shared/contact-gadget/contact-gadget.component';
import { ToastService } from '../shared/services/toast.service';
import { LinkingGadgetComponent } from '../shared/linking-gadget/linking-gadget.component';

declare var Goftino: any;

@Component({
  selector: 'app-gift-landing',
  standalone: true,
  imports: [RouterLink, NgClass, FaIconComponent, ContactUsComponent, AboutUsComponent,LinkingGadgetComponent,
    CommonModule, NgbTooltip, FontAwesomeModule, FooterComponent, ContactGadgetComponent],
  templateUrl: './gift-landing.component.html',
  styleUrl: './gift-landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiftLandingComponent {
  window;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faLocation = faLocation;
  faEnvelopesBulk = faEnvelopesBulk;
  faBell = faBell;
  private goftinoInitialized = false;
  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastService: ToastService,
  ) {
    this.hideGoftinoToggleMobile();
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAnimation();
      this.initializeGoftino();
    }
  }
  private startAnimation() {
    const interBubble = this.document.querySelector<HTMLDivElement>('.interactive');

    if (!interBubble) {
      console.error("Interactive element not found!");
      return;
    }

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    setTimeout(() => {
      function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;

        if (interBubble) {
          interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        }
        requestAnimationFrame(move);
      }

      move();
    }, 100);
  }


  faqs = [

    {
      ask: 'سود صندوق‌ سرمایه‌گذاری هزاره سوم پاد چه زمانی پرداخت می‌شود؟',
      question: 'سود ماهانه صندوق، اولین روز کاری بعد از پانزدهم هر ماه به حساب سرمایه‌گذاران واریز می‌شود.',
      collapsed: true

    },
    {
      ask: 'حداکثر سود تقسیمی به چه کسانی تعلق می‌گیرد؟',
      question: 'سرمایه‌گذارانی که در روز پایان هر دوره (15 ام هر ماه) دارای واحد در صندوق باشند، سود کامل (28%) را برای آن دوره دریافت می‌کنند.',
      collapsed: true
    },

    {
      ask: 'در صورت ابطال واحدهای سرمایه‌گذاری قبل از پایان دوره ، درصد سود تخصیص داده شده به این واحدها چقدر خواهد بود؟',
      question: 'در صورت ابطال واحدها قبل از پایان دوره، سرمایه‌گذار 26% سود برای آن دوره دریافت می‌کند.',
      collapsed: true

    },

    {
      ask: 'چگونه می‌توان از مبلغ سود هر دوره مطلع شویم؟',
      question: 'جزئیات اطلاعات مربوط به سود قطعی پرداختی هر دوره در وبسایت صندوق وجود دارد.',
      collapsed: true

    },

    {
      ask: 'نرخ بازدهی صندوق‌ سرمایه‌گذاری هزاره سوم پاد در دوره‌های قبلی چقدر بوده است؟',
      question: 'برای کسب اطلاع از جزئیات بازدهی صندوق طی ادوار مختلف، به تارنمای صندوق بخش لینک‏های مرتبط قسمت سودهای دوره ای مراجعه نمایید.',
      collapsed: true

    },
  ]

  copyToClipboard(value){
    return this.toastService.copyToClipboard(value)
  }

  private hideGoftinoToggleMobile(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const toggleMobile = this.document.getElementById('goftino-toggle-mobile');
    if (toggleMobile) {
      toggleMobile.classList.remove('goftino-ready');
    }
  }

  private showGoftinoToggleMobile(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const toggleMobile = this.document.getElementById('goftino-toggle-mobile');
    if (toggleMobile) {
      toggleMobile.classList.add('goftino-ready');
    }
  }

  private initializeGoftino(): void {
    if (!isPlatformBrowser(this.platformId) || this.goftinoInitialized) return;
    
    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    
    const goftinoId = "tMncRw";
    const scriptSrc = "https://www.goftino.com/widget/" + goftinoId;
    const localStorageKey = "goftino_" + goftinoId;
    const localStorageValue = localStorage.getItem(localStorageKey);
    
    script.src = localStorageValue ? scriptSrc + "?o=" + localStorageValue : scriptSrc;
    
    script.onload = () => {
      const setupGoftino = () => {
        if (typeof Goftino !== 'undefined') {
          Goftino.setWidget({
            hasIcon: false,
            marginBottom: 80,
            marginRight: 30,
            counter: '#unread_counter'
          });
          
          const goftinoToggle = this.document.getElementById('goftino-toggle');
          const goftinoToggleMobile = this.document.getElementById('goftino-toggle-mobile');

          goftinoToggle?.addEventListener('click', () => Goftino.toggle());
          goftinoToggleMobile?.addEventListener('click', () => Goftino.toggle());
          
          // Show the mobile toggle after Goftino is ready
          this.showGoftinoToggleMobile();
          
          this.goftinoInitialized = true;
        }
      };
      
      if (typeof Goftino !== 'undefined') {
        setupGoftino();
      } else {
        window.addEventListener('goftino_ready', setupGoftino);
      }
    };
    
    this.document.head.appendChild(script);
  }

}


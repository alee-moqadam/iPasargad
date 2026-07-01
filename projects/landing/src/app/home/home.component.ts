import { CommonModule, NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { NgbCarouselModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import {
  faEnvelope,
  faLocation,
  faPhone,
  faEnvelopesBulk,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import { FooterComponent } from '../shared/footer/footer.component';
import { ContactGadgetComponent } from '../shared/contact-gadget/contact-gadget.component';
import { ToastService } from '../shared/services/toast.service';
import { environment } from 'projects/client/src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { LinkingGadgetComponent } from '../shared/linking-gadget/linking-gadget.component';
import { HomeFeaturesComponent } from './home-features/home-features.component';
import { FundsSectionComponent } from './funds-section/funds-section.component';
import { AppFeaturesComponent } from './app-features/app-features.component';
import { RegistrationStepsComponent } from './registration-steps/registration-steps.component';
import { InvestAcademyComponent } from './invest-academy/invest-academy.component';
import { DownloadHomeComponent } from './download-home/download-home.component';
import { SocialComponent } from './app-social/app-social.component';

declare var Goftino: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    CommonModule,
    NgbTooltip,
    FontAwesomeModule,
    FaIconComponent,
    FooterComponent,
    ContactGadgetComponent,
    LinkingGadgetComponent,
    HomeFeaturesComponent,
    FundsSectionComponent,
    AppFeaturesComponent,
    RegistrationStepsComponent,
    InvestAcademyComponent,
    DownloadHomeComponent,
    SocialComponent,
    NgbCarouselModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('animatedBlock') blocks!: QueryList<ElementRef>;
  @ViewChild('counter') counter!: ElementRef<HTMLDivElement>;
  showFooterAndContact = signal(false);
  showLinkingGadget = signal(false);

  private animated = false;
  private scrollListener?: () => void;
  private goftinoInitialized = false;
  private goftinoReady = false;
  private hasScrolled = false;
  private lastScrollY = 0;
  private totalScrollDistance = 0;
  private readonly SCROLL_THRESHOLD = 100;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faLocation = faLocation;
  faEnvelopesBulk = faEnvelopesBulk;
  faBell = faBell;
  activeSection: string = '';
  bankDeposit = signal([]);
  apiUrl = environment.apiUrl

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastService: ToastService,
    private router: Router,
    public httpClient: HttpClient,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.hideGoftinoToggleMobile();
    this.getBankDeposit()
  }

  getBankDeposit() {
    this.httpClient.get(`${this.apiUrl}/shared/getallbankdepositbymutualfundid?mutualFundId=1`).pipe(
      map((res: any) => {
        return res.result;
      }))
      .subscribe((data) => {
        if (data) {
          this.bankDeposit.set(data)
        }
      });
  }

  private hideGoftinoToggleMobile(): void {
    if (isPlatformBrowser(this.platformId)) {
      const goftinoToggleMobile = this.document.getElementById('goftino-toggle-mobile');
      if (goftinoToggleMobile) {
        goftinoToggleMobile.classList.remove('goftino-ready');
      }
    }
  }

  private showGoftinoToggleMobile(): void {
    if (isPlatformBrowser(this.platformId)) {
      const goftinoToggleMobile = this.document.getElementById('goftino-toggle-mobile');
      if (goftinoToggleMobile) {
        goftinoToggleMobile.classList.add('goftino-ready');
      } else {
        console.warn('Could not find goftino-toggle-mobile element');
      }
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAnimation();
      this.setupScrollListener();
      this.observeAnimatedBlocks();

      const section = this.elementRef.nativeElement.querySelector('.aum-stats');

      const observer = new IntersectionObserver(
          (entries) => {
    
            if (entries[0].isIntersecting && !this.animated) {
              this.animated = true;
    
              this.startCounters();
    
              observer.disconnect();
            }
    
          },
          {
            threshold: 0.3
          }
      );

      observer.observe(section);

    }

  }

   private startCounters(): void {

    const counters =
      this.elementRef.nativeElement.querySelectorAll('.counter');

    counters.forEach((counter: HTMLElement) => {

      const target = Number(counter.dataset['target']);

      this.animateCounter(counter, target);
    });

    const billionCounters =
      this.elementRef.nativeElement.querySelectorAll('.counter-billion');

    billionCounters.forEach((counter: HTMLElement) => {

      const target = Number(counter.dataset['target']);

      this.animateCounter(counter, target);
    });
  }

  private animateCounter( element: HTMLElement, target: number ): void {

    if (!isPlatformBrowser(this.platformId)) return;
    
    const duration = 500;
    const startTime = performance.now();

    const update = (currentTime: number) => {

      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const value = Math.floor(
        target * this.easeOutCubic(progress)
      );

      element.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }

  private easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
  }


  private setupScrollListener(): void {
    this.scrollListener = () => {
      if (!this.hasScrolled) {
        const currentScrollY = window.scrollY;
        const scrollDelta = Math.abs(currentScrollY - this.lastScrollY);
        this.totalScrollDistance += scrollDelta;
        this.lastScrollY = currentScrollY;
        
        if (this.totalScrollDistance >= this.SCROLL_THRESHOLD) {
          this.hasScrolled = true;
          this.showFooterAndContact.set(true);
          this.showLinkingGadget.set(true);
          this.initializeGoftino();
        }
      }
    };
    
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private initializeGoftino(): void {
    if (!isPlatformBrowser(this.platformId) || this.goftinoInitialized) return;
    
    console.log('Initializing Goftino...');
    
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
          console.log('Goftino script loaded, setting up widget...');
          
          Goftino.setWidget({
            hasIcon: false,
            marginBottom: 80,
            marginRight: 30,
            counter: '#unread_counter'
          });
          
          this.showGoftinoToggleMobile();
          this.goftinoReady = true;
          
          this.setupGoftinoClickHandlers();
          
          this.goftinoInitialized = true;
          console.log('Goftino initialization complete');
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

  private setupGoftinoClickHandlers(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const goftinoToggle = this.document.getElementById('goftino-toggle');
    const goftinoToggleMobile = this.document.getElementById('goftino-toggle-mobile');

    goftinoToggle?.addEventListener('click', () => Goftino.toggle());
    goftinoToggleMobile?.addEventListener('click', () => Goftino.toggle());
  }

  private observeAnimatedBlocks(): void {
    if (!isPlatformBrowser(this.platformId)) return; // Add this check
    
    if ('IntersectionObserver' in window) {
      const blockObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('up-transition');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (this.blocks) {
        this.blocks.forEach((block) => blockObserver.observe(block.nativeElement));
      }
    } else {
      console.warn('IntersectionObserver is not supported in this environment.');
    }
  }

  private startAnimation() {
    const interBubble = this.document.querySelector<HTMLDivElement>('.interactive');

    if (!interBubble) {
      console.error('Interactive element not found!');
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
      question: 'سود صندوق‌ سرمایه‌گذاری هزاره سوم پاد چه زمانی پرداخت می‌شود؟',
      answer: 'سود ماهانه صندوق، روز شانزدهم هر ماه به حساب سرمایه‌گذاران واریز می‌شود.',
      collapsed: true,
    },
    {
      question: 'حداکثر سود تقسیمی به چه کسانی تعلق می‌گیرد؟',
      answer:
        'سرمایه‌گذارانی که در روز پایان هر دوره (15 ام هر ماه) دارای واحد در صندوق باشند، سود کامل (31%) را برای آن دوره دریافت می‌کنند.',
      collapsed: true,
    },
    {
      question: 'در صورت ابطال واحدهای سرمایه‌گذاری قبل از پایان دوره ، درصد سود تخصیص داده شده به این واحدها چقدر خواهد بود؟',
      answer: 'در صورت ابطال واحدها قبل از پایان دوره، سرمایه‌گذار 29% سود برای آن دوره دریافت می‌کند.',
      collapsed: true,
    },
    {
      question: 'چگونه می‌توان از مبلغ سود هر دوره مطلع شویم؟',
      answer: 'جزئیات اطلاعات مربوط به سود قطعی پرداختی هر دوره در وبسایت صندوق وجود دارد.',
      collapsed: true,
    },
    {
      question: 'نرخ بازدهی صندوق‌ سرمایه‌گذاری هزاره سوم پاد در دوره‌های قبلی چقدر بوده است؟',
      answer:
        'برای کسب اطلاع از جزئیات بازدهی صندوق طی ادوار مختلف، به تارنمای صندوق بخش لینک‏های مرتبط قسمت سودهای دوره ای مراجعه نمایید.',
      collapsed: true,
    },
  ];

  copyToClipboard(value: string): void {
    this.toastService.copyToClipboard(value);
  }

  onClick(elementId: string): void {
    this.activeSection = elementId;
    
    this.router.navigate([], { fragment: elementId }).then((res) => {
      setTimeout(() => {
        const element = this.document.getElementById(elementId);
        if (element != undefined) {
          element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }, 100);
    });
  }
}

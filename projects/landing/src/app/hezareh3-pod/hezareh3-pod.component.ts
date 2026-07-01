import { CommonModule, DOCUMENT, isPlatformBrowser, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Inject, OnDestroy, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faEnvelope, faEnvelopesBulk, faLocation, faPhone } from '@fortawesome/free-solid-svg-icons';
import { NgbCarouselModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, finalize } from 'rxjs';
import { ContactGadgetComponent } from '../shared/contact-gadget/contact-gadget.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ToastService } from '../shared/services/toast.service';
import { ProfitCalculatorComponent } from './profit-calculator/profit-calculator.component';
import { HezarehFeaturesComponent } from './hezareh-features/hezareh-features.component';
import { FundCompositionComponent } from "./fund-composition/fund-composition.component";
import { LinkingGadgetComponent } from '../shared/linking-gadget/linking-gadget.component';

declare var Goftino: any;

@Component({
  selector: 'app-hezareh3-pod',
  standalone: true,
  imports: [NgClass, FaIconComponent, NgbTooltip, NgbCarouselModule, ProfitCalculatorComponent,LinkingGadgetComponent,
    CommonModule, FontAwesomeModule, FooterComponent, ContactGadgetComponent, FormsModule, HezarehFeaturesComponent, FundCompositionComponent],
  templateUrl: './hezareh3-pod.component.html',
  styleUrl: './hezareh3-pod.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Hezareh3PodComponent implements AfterViewInit, OnDestroy {
  private httpClient = inject(HttpClient);
  window;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faLocation = faLocation;
  faEnvelopesBulk = faEnvelopesBulk;
  faBell = faBell;
  activeSection: string = '';
  investmentPeriod$ = new BehaviorSubject<number>(1);
  isShowChart$ = new BehaviorSubject<boolean>(false);
  formattedValue;
  mobileValue;
  isMobileLoading = signal(false);
  mobile;

  showFooterAndContact = signal(false);
  showLinkingGadget = signal(false);
  
  private scrollListener?: () => void;
  private goftinoInitialized = false;
  private hasScrolled = false;
  private lastScrollY = 0;
  private totalScrollDistance = 0;
  private readonly SCROLL_THRESHOLD = 100;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastService: ToastService,
    private router: Router,

  ) {
    setTimeout(() => this.hideGoftinoToggleMobile(), 100);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollListener();
    }
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
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
  }  private initializeGoftino(): void {
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

          this.showGoftinoToggleMobile();

          const goftinoToggle = this.document.getElementById('goftino-toggle');
          const goftinoToggleMobile = this.document.getElementById('goftino-toggle-mobile');

          goftinoToggle?.addEventListener('click', () => Goftino.toggle());
          goftinoToggleMobile?.addEventListener('click', () => Goftino.toggle());

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
      }
    }
  }


  faqs = [
    {
      question: 'سود صندوق‌ سرمایه‌گذاری هزاره سوم پاد چه زمانی پرداخت می‌شود؟',
      answer: 'سود ماهانه صندوق، اولین روز کاری بعد از پانزدهم هر ماه به حساب سرمایه‌گذاران واریز می‌شود.',
      collapsed: true
    },
    {
      question: 'حداکثر سود تقسیمی به چه کسانی تعلق می‌گیرد؟',
      answer: 'سرمایه‌گذارانی که در روز پایان هر دوره (15 ام هر ماه) دارای واحد در صندوق باشند، سود کامل (31%) را برای آن دوره دریافت می‌کنند.',
      collapsed: true
    },
    {
      question: 'در صورت ابطال واحدهای سرمایه‌گذاری قبل از پایان دوره ، درصد سود تخصیص داده شده به این واحدها چقدر خواهد بود؟',
      answer: 'در صورت ابطال واحدها قبل از پایان دوره، سرمایه‌گذار 29% سود برای آن دوره دریافت می‌کند.',
      collapsed: true
    },
    {
      question: 'چگونه می‌توان از مبلغ سود هر دوره مطلع شویم؟',
      answer: 'جزئیات اطلاعات مربوط به سود قطعی پرداختی هر دوره در وبسایت صندوق وجود دارد.',
      collapsed: true
    },
    {
      question: 'نرخ بازدهی صندوق‌ سرمایه‌گذاری هزاره سوم پاد در دوره‌های قبلی چقدر بوده است؟',
      answer: 'برای کسب اطلاع از جزئیات بازدهی صندوق طی ادوار مختلف، به تارنمای صندوق بخش لینک‌های مرتبط قسمت سودهای دوره ای مراجعه نمایید.',
      collapsed: true
    }
  ];


  changeInvestmentPeriod(period) {
    this.investmentPeriod$.next(period);
  }

  restrictPaste(event: ClipboardEvent): void {
    const pastedText = event.clipboardData?.getData('text') || '';
    const onlyDigits = pastedText.replace(/\D/g, ''); // فقط اعداد

    // اگر paste با 0 شروع شود یا فقط 0 باشد
    if (onlyDigits.startsWith('0') || onlyDigits === '0') {
      event.preventDefault();
      return;
    }

    // اگر حاوی کاراکتر غیرعددی باشد
    if (pastedText !== onlyDigits) {
      event.preventDefault();
    }
  }


  lastValidMobileValue;

  formatMobileNumber(value: string): void {
    const cleanedValue = value.replace(/[^0-9]/g, '');

    // اگر بیشتر از 11 رقم شد، ببر تا 11 رقم
    const limited = cleanedValue.slice(0, 11);

    // فقط شماره‌ای که با 09 شروع میشه و تا 11 رقمه معتبره
    if (!/^09\d{0,9}$/.test(limited)) {
      this.mobileValue = this.lastValidMobileValue;
      return;
    }

    this.lastValidMobileValue = limited;
    this.mobileValue = limited;
  }

  restrictMobileInput(event: KeyboardEvent): void {
    const key = event.key;
    const isCtrl = event.ctrlKey || event.metaKey;

    // کلیدهای مجاز: عددی، Backspace، Tab، Delete، Ctrl+V/C/X/A/Z
    if (
      ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(key) ||
      (isCtrl && ['a', 'c', 'v', 'x', 'z'].includes(key.toLowerCase()))
    ) {
      return;
    }

    // فقط اعداد مجاز هستند
    if (!/^[0-9]$/.test(key)) {
      event.preventDefault();
      return;
    }

    const input = event.target as HTMLInputElement;
    const digitsOnly = input.value.replace(/[^0-9]/g, '');

    // بررسی انتخاب متن
    const selectionLength = (input.selectionEnd || 0) - (input.selectionStart || 0);
    const newLength = digitsOnly.length - selectionLength + 1; // +1 برای کاراکتر جدید

    // حداکثر 11 رقم
    if (newLength > 11) {
      event.preventDefault();
    }
  }

  restrictMobilePaste(event: ClipboardEvent): void {
    event.preventDefault(); // همیشه از paste خام جلوگیری کن
    const pastedText = event.clipboardData?.getData('text') || '';
    const digitsOnly = pastedText.replace(/[^0-9]/g, '');

    if (/^09\d{9}$/.test(digitsOnly)) {
      this.mobileValue = digitsOnly;
      this.formatMobileNumber(digitsOnly); // فرمت کن
    }
  }

  onSaveLandingTicketClick() {
    if (this.isMobileLoading()) return;
    if (!this.mobileValue) {
      this.toastService.show('لطفاً شماره تلفن همراه خود را به صورت صحیح وارد کنید', { classname: 'bg-danger text-light', delay: 5000 });
      return;
    }
    this.isMobileLoading.set(true);
    const body = {
      fullName: "Hezareh3-pod Landing",
      nationalId: "Hezareh3-pod Landing",
      mobile: this.mobileValue,
      email: "Hezareh3-pod Landing",
      subject: "Hezareh3-pod Landing",
      code: 3,
      message: "Hezareh3-pod Landing"
    };
    this.httpClient.post('https://clientapi.ipasargad.ir/api/ticket/savelandingticket', body)
      .pipe(finalize(() => this.isMobileLoading.set(false)))
      .subscribe({
        next: () => {
          this.toastService.show('ثبت شماره با موفقیت انجام شد', { classname: 'bg-success text-light', delay: 5000 });
          this.mobileValue = '';
          this.lastValidMobileValue = '';
        }
      })
  }

}
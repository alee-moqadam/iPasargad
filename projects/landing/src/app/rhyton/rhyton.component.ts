import { CommonModule, DOCUMENT, isPlatformBrowser, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Inject, OnDestroy, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faEnvelope, faEnvelopesBulk, faLocation, faPhone } from '@fortawesome/free-solid-svg-icons';
import { NgbCarouselModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, finalize } from 'rxjs';
import { ContactGadgetComponent } from '../shared/contact-gadget/contact-gadget.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ToastService } from '../shared/services/toast.service';
import { FundDetailsComponent } from './fund-details/fund-details.component';
import { RhytonFeaturesComponent } from './rhyton-features/rhyton-features.component';
import { PersianNumberPipe } from '../shared/pipes/persian-number.pipe';
import { LinkingGadgetComponent } from '../shared/linking-gadget/linking-gadget.component';

declare var Goftino: any;

@Component({
  selector: 'app-rhyton',
  standalone: true,
  imports: [NgClass, FaIconComponent, NgbTooltip, NgbCarouselModule, FundDetailsComponent, PersianNumberPipe,LinkingGadgetComponent,
    CommonModule, FontAwesomeModule, FooterComponent, ContactGadgetComponent, FormsModule, RhytonFeaturesComponent],
  templateUrl: './rhyton.component.html',
  styleUrl: './rhyton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RhytonComponent implements AfterViewInit, OnDestroy {
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
  defaultBaseAmount: number = 100000000;
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


  faqs = [

    {
      question: 'نحوه خرید واحدهای صندوق طلای ریتون چگونه است؟',
      answer: 'برای خرید واحدهای صندوق طلای ریتون می‌توانید در سامانه آی‌پاسارگاد ثبت نام کرده و به راحتی مقدار مورد نظر خود از واحدهای صندوق را خریداری کنید. روش دوم خرید واحدهای صندوق طلای ریتون، مراجعه به پنل معاملاتی کارگزاری‌ها و جستجوی نماد «ریتون» است.',
      collapsed: true

    },
    {
      question: 'سود صندوق طلای ریتون چقدر است؟',
      answer: 'سرمایه‌گذاری در صندوق‌های طلا همانند خرید فیزیکی طلا سود ثابت و مشخصی ندارد. در صورت افزایش قیمت طلا و سکه، سرمایه‌گذار صندوق سود کسب می‌کند و با کاهش قیمت این دارایی‌ها از ارزش سرمایه کاربر کاسته می‌شود. سود کسب شده سرمایه‌گذاری از اختلاف قیمت خرید و قیمت فروش واحدهای صندوق قابل محاسبه است.',
      collapsed: true
    },
    {
      question: 'سود صندوق طلای ریتون کی واریز می‌شود؟',
      answer: 'صندوق طلای ریتون توزیع سود دوره‌ای ندارد و سود حاصل از سرمایه‌گذاری به طور مستقیم بر ارزش واحد صندوق و ارزش خالص دارایی آن تاثیر می‌گذارد. سرمایه‌گذار می‌تواند در زمان دلخواه و با قیمت موجود در بازار واحدهای خود را به فروش رسانده و سود خود را تثبیت کند.',
      collapsed: true

    },
    {
      question: 'ساعت معاملاتی صندوق ریتون به چه صورت است؟',
      answer: 'سرمایه‌گذاران می‌توانند در 7 روز هفته و 24 ساعت روز از طریق سامانه آی‌پاسارگاد در صندوق ریتون سرمایه‌گذاری کنند. همچنین سرمایه‌گذاران می‌توانند از شنبه تا چهارشنبه و از ساعت 12:00 تا 17:00 از طریق پنل معاملاتی کارگزاری‌ها، به معامله واحدهای صندوق طلای ریتون بپردازند.',
      collapsed: true

    },
    {
      question: 'فروش واحدهای صندوق ریتون به چه شکل انجام می‌شود؟',
      answer: 'برای فروش واحدهای صندوق ریتون از طریق آی‌پاسارگاد، پس از ورود به سامانه، روی گزینه برداشت کلیک کرده و صندوق ریتون را انتخاب کنید. با مشخص کردن تعداد واحدهای مورد نظر برای ابطال و تایید نهایی، واحدهای شما به فروش می‌رسند. همچنین، شما می‌توانید با مراجعه به پنل کارگزاری، مقدار مورد نظر خود از واحدهای صندوق ریتون را با قیمت بازار به فروش برسانید.',
      collapsed: true
    },
    {
      question: 'مبلغ حاصل از فروش واحدهای صندوق ریتون کی به حساب سرمایه‌گذار واریز می‌شود؟',
      answer: 'تسویه صندوق ریتون مشابه سایر صندوق‌های طلا در T+1 روز انجام می‌شود. بنابراین، مبلغ فروش در یک روز کاری بعد از فروش واحدهای صندوق ریتون به حساب سرمایه‌گذار واریز خواهد شد.',
      collapsed: true
    },
    
  ]


  onClick(elementId: string): void {
    this.activeSection = elementId;
    const element = document.getElementById(elementId);

    if (element != undefined) {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    };
  }

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
      fullName: "Rhyton Landing",
      nationalId: "Rhyton Landing",
      mobile: this.mobileValue,
      email: "Rhyton Landing",
      subject: "Rhyton Landing",
      code: 3,
      message: "Rhyton Landing"
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

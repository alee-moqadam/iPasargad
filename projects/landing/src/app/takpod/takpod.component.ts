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
import { PersianNumberPipe } from '../shared/pipes/persian-number.pipe';
import { TakpodDetailsComponent } from './takpod-details/takpod-details.component';
import { TakpodFeaturesComponent } from './takpod-features/takpod-features.component';
import { LinkingGadgetComponent } from '../shared/linking-gadget/linking-gadget.component';

declare var Goftino: any;

@Component({
  selector: 'app-takpod',
  standalone: true,
  imports: [NgClass, FaIconComponent, NgbTooltip, NgbCarouselModule, TakpodDetailsComponent, PersianNumberPipe,LinkingGadgetComponent,
    CommonModule, FontAwesomeModule, FooterComponent, ContactGadgetComponent, FormsModule, TakpodFeaturesComponent],
  templateUrl: './takpod.component.html',
  styleUrl: './takpod.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TakpodComponent implements AfterViewInit, OnDestroy {
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
      question: 'پیش نیاز سرمایه‌گذاری در صندوق تکپاد چیست؟',
      answer: 'برای شروع سرمایه‌گذاری در صندوق تکپاد سرمایه‌گذاران تنها به کد بورسی نیاز دارند. اگر تا به امروز کد بورسی خود را دریافت نکرده‌اید می‌توانید با مراجعه سامانه سجام (Sejam.ir) و ثبت اطلاعات هویتی به صورت کاملا غیرحضوری کد بورسی خود را دریافت کنید.',
      collapsed: true

    },
    {
      question: 'حداقل سرمایه مورد نیاز برای سرمایه‌گذاری در صندوق تکپاد چقدر است؟',
      answer: 'برای سرمایه‌گذاری در صندوق تکپاد از طریق پنل معاملاتی کارگزاری‌ها، حداقل باید مبلغ 500 هزار تومان از واحدهای صندوق را خریداری کنید اما سرمایه‌گذاری در این صندوق از طریق سامانه آی‌پاسارگاد با حداقل 100 هزار تومان نیز قابل انجام است.',
      collapsed: true
    },
    {
      question: 'سود صندوق تکپاد چقدر است؟',
      answer: 'صندوق تکپاد از نوع سهامی است و سود مشخصی ندارد. با سرمایه‌گذاری در این صندوق شما در سبدی از سهام ارزشمند بازار سرمایه‌گذاری می‌کنید. اگر قیمت سهام خریداری شده توسط صندوق افزایش یابد، ارزش واحدهای شما نیز افزایش پیدا کرده و شما سود می‌کنید و در صورتی که قیمت سهام کاهش یابد، ارزش واحدهای شما افت خواهد کرد.',
      collapsed: true
    },
    {
      question: 'تقسیم سود صندوق تکپاد به چه صورت است؟',
      answer: 'صندوق تکپاد تقسیم سود ندارد و در صورت افزایش قیمت سهام خریداری شده توسط صندوق، ارزش واحدهای صندوق افزایش پیدا کرده و ارزش دارایی‌های سرمایه‌گذاران رشد می‌کند. سرمایه‌گذاران در هر زمان دلخواه می‌توانند با فروش واحدهای صندوق سود و اصل سرمایه خود را برداشت بزنند.',
      collapsed: true
    },
    {
      question: 'فروش واحدهای صندوق تکپاد به چه صورت است؟',
      answer: 'سرمایه‌گذاران می‌توانند با مراجعه به پنل معاملاتی کارگزاری خود در روزها و ساعات کاری بورس واحدهای صندوق تکپاد را به قیمت بازار به فروش برسانند یا با مراجعه به حساب کاربری آی‌پاسارگاد خود در هر زمان دلخواه، واحدهای خود را به قیمت لحظه‌ای به فروش برسانند.',
      collapsed: true
    },
    {
      question: 'پس از فروش واحدهای تکپاد، مبلغ کی به حساب سرمایه‌گذار واریز می‌شود؟',
      answer: 'اگر درخواست برداشت وجه در روزهای کاری شنبه تا چهارشنبه قبل از ساعت 12:00 ثبت شود، یک روز کاری بعد و در صورت ثبت درخواست برداشت وجه بعد از ساعت 12:00، دو روز کاری بعد مبلغ به حساب بانکی سجامی سرمایه‌گذار واریز می‌شود.',
      collapsed: true
    }
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

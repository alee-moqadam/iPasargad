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
import { AppFeaturesComponent } from './app-features/app-features.component';
import { PersianNumberPipe } from '../shared/pipes/persian-number.pipe';

declare var Goftino: any;

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [NgClass, FaIconComponent, NgbCarouselModule, PersianNumberPipe,
    CommonModule, FontAwesomeModule, FooterComponent, ContactGadgetComponent, FormsModule, AppFeaturesComponent],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadComponent implements AfterViewInit, OnDestroy {
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
          this.initializeGoftino();
        }
      }
    };

    window.addEventListener('scroll', this.scrollListener, { passive: true });
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
      question: 'اپلیکیشن آی‌پاسارگاد را چگونه نصب کنم؟',
      answer: 'برای نصب نسخه اندروید، کافی است فایل نصب را از طریق گزینه‌های دانلود در همین صفحه دریافت کرده و پس از تأیید مجوزها، اپلیکیشن را نصب نمایید. کاربران آیفون نیز می‌توانند از نسخه تحت وب پیشرفته (PWA) استفاده کنند.',
      collapsed: true

    },
    {
      question: 'آیا آی‌پاسارگاد برای آیفون هم اپلیکیشن دارد؟',
      answer: 'نسخه اختصاصی آیفون در قالب اپلیکیشن تحت وب پیشرفته (PWA) ارائه شده است. پس از ورود به وب‌سایت آی‌پاسارگاد از طریق مرورگر Safari، می‌توانید با انتخاب گزینه «Add to Home Screen» آیکن اپلیکیشن را به صفحه اصلی گوشی خود اضافه کرده و مانند یک اپ بومی از آن استفاده کنید.',
      collapsed: true
    },
    {
      question: 'آیا استفاده از اپلیکیشن آی‌پاسارگاد امن است؟',
      answer: 'بله. آی‌پاسارگاد با بهره‌گیری از جدیدترین استانداردهای امنیتی، رمزنگاری اطلاعات و احراز هویت چندمرحله‌ای، امنیت سرمایه‌گذاران را در بالاترین سطح تضمین می‌کند. همچنین اطلاعات کاربران تنها از طریق درگاه‌های رسمی و امن تبادل می‌شود.',
      collapsed: true

    },
  ]

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
      fullName: "Pasargad Download Landing",
      nationalId: "Pasargad Download Landing",
      mobile: this.mobileValue,
      email: "Pasargad Download Landing",
      subject: "Pasargad Download Landing",
      code: 3,
      message: "Pasargad Download Landing"
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

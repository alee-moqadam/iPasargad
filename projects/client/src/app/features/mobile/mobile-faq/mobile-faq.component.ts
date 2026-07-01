import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mobile-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-faq.component.html',
  styleUrl: './mobile-faq.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileFaqComponent {
  faqs = [

    {
      question: 'سود صندوق‌ سرمایه‌گذاری هزاره سوم پاد چه زمانی پرداخت می‌شود؟',
      answer: 'سود ماهانه صندوق، اولین روز کاری بعد از پانزدهم هر ماه به حساب سرمایه‌گذاران واریز می‌شود.',
      collapsed: true

    },
    {
      question: 'حداکثر سود تقسیمی به چه کسانی تعلق می‌گیرد؟',
      answer: 'سرمایه‌گذارانی که در روز پایان هر دوره (15 ام هر ماه) دارای واحد در صندوق باشند، سود کامل (28%) را برای آن دوره دریافت می‌کنند.',
      collapsed: true
    },

    {
      question: 'در صورت ابطال واحدهای سرمایه‌گذاری قبل از پایان دوره ، درصد سود تخصیص داده شده به این واحدها چقدر خواهد بود؟',
      answer: 'در صورت ابطال واحدها قبل از پایان دوره، سرمایه‌گذار 26% سود برای آن دوره دریافت می‌کند.',
      collapsed: true

    },

    {
      question: 'چگونه می‌توان از مبلغ سود هر دوره مطلع شویم؟',
      answer: 'جزئیات اطلاعات مربوط به سود قطعی پرداختی هر دوره در وبسایت صندوق وجود دارد.',
      collapsed: true

    },

    {
      question: 'نرخ بازدهی صندوق‌ سرمایه‌گذاری هزاره سوم پاد در دوره‌های قبلی چقدر بوده است؟',
      answer: 'برای کسب اطلاع از جزئیات بازدهی صندوق طی ادوار مختلف، به تارنمای صندوق بخش لینک‏های مرتبط قسمت سودهای دوره ای مراجعه نمایید.',
      collapsed: true

    },





  ]

}

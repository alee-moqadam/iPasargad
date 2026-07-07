import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FundItemComponent } from './fund-item/fund-item.component';
import { FundListService } from '@client/core/services/fund-list.service';
import { Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MutualFundCarouselComponent } from '@client/shared/components/mutual-fund-carousel/mutual-fund-carousel.component';
import { FundService, CustomerRequestCompositionModel } from '@client/shared';

@Component({
  selector: 'app-fund-list',
  standalone: true,
  imports: [FundItemComponent, CommonModule, RouterLink, NgbCarouselModule, MutualFundCarouselComponent],
  templateUrl: './fund-list.component.html',
  styleUrl: './fund-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundListComponent implements OnInit {
  readonly useMockViewData = true; // UI preview only. Turn off before production handoff.

  // UI preview mock data only. Do not use for production logic.
  readonly mockFundList: any[] = [
    {
      seoRegisterNumber: 11168,
      symbol: 'هزاره سوم',
      title: 'صندوق درآمد ثابت صدور و ابطالی هزاره سوم پاد',
      fundTypeTitle: 'درآمد ثابت - صدور و ابطالی',
      fundType: 1,
      targetDescription: 'گزینه‌ای کم‌ریسک برای نگهداری سرمایه با درآمد باثبات.',
      riskRatio: 'کم',
      isAllowSubscription: true,
      performance: { effectiveYearlyPercent: 28.5, yearlyPercent: 27.8, lastSubscriptionNav: 1023400 },
      suitableFor: 'مناسب افرادی که ثبات، ریسک کم و نقدشوندگی قابل پیش‌بینی می‌خواهند.',
      settlementHint: 'تسویه معمولاً کوتاه‌مدت و مناسب مدیریت نقدینگی روزانه.',
      returnLabel: 'بازده موثر سالانه',
      returnValue: '۲۸.۵٪',
      categoryKey: 'fixed-income'
    },
    {
      seoRegisterNumber: 11355,
      symbol: 'پاسارگاد',
      title: 'صندوق درآمد ثابت قابل معامله پاسارگاد',
      fundTypeTitle: 'درآمد ثابت- قابل معامله',
      fundType: 1,
      targetDescription: 'گزینه‌ای کم‌ریسک برای نگهداری سرمایه با درآمد باثبات.',
      riskRatio: 'کم',
      isAllowSubscription: true,
      performance: { effectiveYearlyPercent: 27.9, yearlyPercent: 27.1, lastSubscriptionNav: 1018000 },
      suitableFor: 'مناسب افرادی که ثبات، ریسک کم و قابلیت معامله صندوق را هم‌زمان می‌خواهند.',
      settlementHint: 'تسویه متناسب با چرخه صندوق‌های قابل معامله انجام می‌شود.',
      returnLabel: 'بازده موثر سالانه',
      returnValue: '۲۷.۹٪',
      categoryKey: 'fixed-income'
    },
    {
      seoRegisterNumber: 11421,
      symbol: 'ریتون',
      title: 'صندوق طلای قابل معامله چندکالایی پاسارگاد',
      fundTypeTitle: 'طلا - قابل معامله',
      fundType: 5,
      targetDescription: 'سرمایه‌گذاری مبتنی بر طلا برای پوشش نوسان ارزش پول.',
      riskRatio: 'متوسط تا زیاد',
      isAllowSubscription: true,
      performance: { effectiveYearlyPercent: 0, yearlyPercent: 34.2, lastSubscriptionNav: 2460000 },
      suitableFor: 'مناسب افرادی که بخشی از سبد خود را در معرض بازار طلا قرار می‌دهند.',
      settlementHint: 'تسویه وابسته به چرخه صندوق و شرایط بازار طلا.',
      returnLabel: 'بازده یک‌ساله',
      returnValue: '۳۴.۲٪',
      categoryKey: 'commodity-fund'
    },
    {
      seoRegisterNumber: 11509,
      symbol: 'تکپاد',
      title: 'صندوق سهامی قابل معامله ارزش پرداز آریان',
      fundTypeTitle: 'سهامی - قابل معامله',
      fundType: 2,
      targetDescription: 'تمرکز بر سهام برای رشد سرمایه در افق زمانی بلندتر.',
      riskRatio: 'زیاد',
      isAllowSubscription: true,
      performance: { effectiveYearlyPercent: 0, yearlyPercent: 41.7, lastSubscriptionNav: 1885000 },
      suitableFor: 'مناسب سرمایه‌گذارانی که نوسان بازار سهام را برای بازده بالاتر می‌پذیرند.',
      settlementHint: 'تسویه و نقدشوندگی متناسب با مقررات صندوق سهامی.',
      returnLabel: 'بازده سالانه',
      returnValue: '۴۱.۷٪',
      categoryKey: 'stock-fund'
    }
  ];

  // UI preview mock data only. Do not use for production logic.
  readonly mockCompositionsByCode: Record<number, any> = {
    11168: {
      mutualFundCode: 11168,
      netValue: 245000000,
      remainVolume: 240,
      subscriptionPermit: true,
      redemptionPermit: true
    },
    11421: {
      mutualFundCode: 11421,
      netValue: 68000000,
      remainVolume: 52,
      subscriptionPermit: true,
      redemptionPermit: true
    }
  };

  readonly categoryChips = [
    { label: 'همه صندوق‌ها', value: null, link: '/fund-list' },
    { label: 'درآمد ثابت', value: 'fixed-income', link: '/fund-list/fixed-income' },
    { label: 'سهامی', value: 'stock-fund', link: '/fund-list/stock-fund' },
    { label: 'طلا', value: 'commodity-fund', link: '/fund-list/commodity-fund' },
    { label: 'مختلط', value: 'mixed-fund', link: '/fund-list/mixed-fund' }
  ];

  mutualFundList$: Observable<any>;
  fundType = signal(null);
  allMutualFundDetail = signal([])
  compositionsByCode = signal<Record<number, CustomerRequestCompositionModel>>({});

  constructor(private fundListService: FundListService, private route: ActivatedRoute, private fundService: FundService) {
    this.mutualFundList$ = this.fundListService.getAllMutualFunds();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.fundType.set(params.fundType)
    });

    this.mutualFundList$
      .subscribe((fundList: any) => {
        this.allMutualFundDetail.set(fundList);
      })

    this.fundService.getCustomerRequestCompositions({ date: new Date() })
      .pipe(take(1))
      .subscribe((list: CustomerRequestCompositionModel[]) => {
        const map: Record<number, CustomerRequestCompositionModel> = {};
        (list || []).forEach(c => { map[c.mutualFundCode] = c; });
        this.compositionsByCode.set(map);
      });
  }

  getDisplayFunds(): any[] {
    const funds = this.allMutualFundDetail();
    const source = funds?.length ? funds : (this.useMockViewData ? this.mockFundList : []);
    const filtered = this.fundType()
      ? source.filter((fund: any) => this.getFundCategoryKey(fund) === this.fundType())
      : source;

    return filtered.slice(0, 4);
  }

  getCompositionForFund(fund: any): CustomerRequestCompositionModel {
    const code = Number(fund?.seoRegisterNumber);
    return (this.compositionsByCode()[code] || this.mockCompositionsByCode[code] || {
      mutualFundCode: code,
      netValue: 0,
      remainVolume: 0,
      subscriptionPermit: true,
      redemptionPermit: true
    }) as CustomerRequestCompositionModel;
  }

  hasHolding(fund: any): boolean {
    return Number(this.getCompositionForFund(fund)?.netValue || 0) > 0;
  }

  getFundCategoryKey(fund: any): string {
    if (fund?.categoryKey) return fund.categoryKey;

    switch (fund?.fundType) {
      case 1:
        return 'fixed-income';
      case 2:
        return 'stock-fund';
      case 3:
        return 'mixed-fund';
      case 5:
        return 'commodity-fund';
      default:
        return 'fixed-income';
    }
  }

  getSuitableFor(fund: any): string {
    return fund?.suitableFor || fund?.targetDescription || 'مناسب سرمایه‌گذارانی که می‌خواهند متناسب با ریسک‌پذیری خود صندوق انتخاب کنند.';
  }

  getRiskLevel(fund: any): string {
    return fund?.riskRatio || (fund?.fundType === 1 ? 'کم' : fund?.fundType === 2 ? 'زیاد' : 'متوسط');
  }

  getReturnLabel(fund: any): string {
    return fund?.returnLabel || ([1, 5].includes(fund?.fundType) ? 'بازده موثر سالانه' : 'بازده سالانه');
  }

  getReturnValue(fund: any): string {
    if (fund?.returnValue) return fund.returnValue;

    const performance = fund?.performance || {};
    const value = [1, 5].includes(fund?.fundType)
      ? performance.effectiveYearlyPercent ?? performance.yearlyPercent
      : performance.yearlyPercent;

    return value != null ? `${value}%` : '-';
  }

  getSettlementHint(fund: any): string {
    return fund?.settlementHint || ([1, 5].includes(fund?.fundType)
      ? 'تسویه کوتاه‌مدت متناسب با مقررات صندوق.'
      : 'تسویه مطابق چرخه عملیاتی صندوق انجام می‌شود.');
  }

}

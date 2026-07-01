import { FundAttachmentTypeEnum } from "@client/shared/enums";

export interface MutualFundDetailsModel {
  about: About[];
  alerts: any[];
  allowRedemptionMessage: string;
  allowSubscriptionMessage: string;
  attachments: FundAttachment[];
  cachedDate: string;
  catalog: string;
  category: string;
  data?: any;
  dividendType: string;
  endTime: string;
  enTitle: string;
  fixedIncomeFundType: number;
  fundSize: number;
  fundSizeTitle: string;
  fundType: number;
  fundTypeTitle: string;
  hashTag: string;
  investmentManagers: any[];
  investmentMethod: string;
  investType: number;
  investTypeTitle: string;
  isAllowRedemption: boolean;
  isAllowSubscription: boolean;
  managers: any[];
  mutualFundId: number;
  performance: Performance;
  priority: number;
  prospectus: string;
  registerDate: string;
  registerDateJalali: string;
  registerNo: string;
  reinvest: number;
  riskRatio: string;
  seoRegisterNumber: number;
  startTime: string;
  statute: string;
  symbol: string;
  target: string;
  targetDescription: string;
  title: string;
  website: string;
}

export interface Performance {
  annualizedFiveYearReturn: number;
  annualizedMonthlyReturn: number;
  annualizedThreeYearReturn: number;
  annualizedYearlyReturn: number;
  cachedDate: string;
  dailyChange: number;
  date: string;
  effectiveYearlyPercent: number;
  fiveYearBeginPrice: number;
  fiveYearPercent: number;
  fiveYearPriceReturn: number;
  fiveYearProfit: number;
  fiveYearProfitReturn: number;
  fiveYearTotalReturn: number;
  lastCustomProfit: number;
  lastCustomProfitPercent: number;
  lastMonthlyPercent: number;
  lastNav: number;
  lastProfit: number;
  lastRedemptionNav: number;
  lastSubscriptionNav: number;
  lastUpdateDateJalali: string;
  minPrice: number;
  monthlyBeginPrice: number;
  monthlyPercent: number;
  monthlyPriceReturn: number;
  monthlyProfit: number;
  monthlyProfitReturn: number;
  monthlyTotalReturn: number;
  sixMonthPercent: number;
  tenYearPercent: number;
  threeMonthPercent: number;
  threeYearBeginPrice: number;
  threeYearPercent: number;
  threeYearPriceReturn: number;
  threeYearProfit: number;
  threeYearProfitReturn: number;
  threeYearTotalReturn: number;
  totalValue: number;
  yearlyBeginPrice: number;
  yearlyPercent: number;
  yearlyPriceReturn: number;
  yearlyProfit: number;
  yearlyProfitReturn: number;
  yearlyTotalReturn: number;
}

export interface FundAttachment {
  fileName: string;
  contentType: string;
  base64File: string;
  categoryId: FundAttachmentTypeEnum;
  categoryName: string;
  mutualFundId?: number;
  priority?: number;
}

export interface About {
  description: string;
  title: string;
  type: number;
  typeTitle: string;
}
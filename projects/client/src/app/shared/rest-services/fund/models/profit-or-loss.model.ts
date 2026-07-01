export interface ProfitOrLossModel {
      isin: string,
      remainVolume: number,
      buyAvgPrice: number,
      lastTradedPrice: number,
      prevClosePrice: number,
      totalPayedPrice: number,
      profitOrLoss: number,
      profitOrLossPercent: number,
      todayProfitOrLoss: number,
      todayProfitOrLossPercent: number
  }
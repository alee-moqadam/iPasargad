export interface LastMutualFundAssetModel {
    id: number;
    mutualFundId: number;
    stockValue: number;
    bondValue: number;
    cashValue: number;
    fiveBestStockValue: number;
    depositValue: number;
    netAssetValue: number;
    otherAsset: number;
    date: string;
    created: string;
    modified: string;
  }
export interface CustomerRequestCompositionModel {
    remainVolume: number;
    asset: number;
    guaranteeVolume: number;
    guaranteeAsset: number;
    partyId: number;
    netValue: number;
    totalProfit: number;
    mutualFundId: number;
    mutualFundTitle: string;
    mutualFundSymbol: string;
    mutualFundCode: number;
    symbol: string;
    percent: number;
    navDate: string;
    emissionDate: string;
    fundType: number;
    fundSize: number;
    fundTypeTitle: string;
    fundSizeTitle: string;
    nav: number;
    state: number;
    stateTitle: string;
    redemptionPermit: boolean;
    subscriptionPermit: boolean;
    reinvest: boolean;
  }
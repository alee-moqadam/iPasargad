export interface CustomerEvidenceModel {
    id: number;
    volume: number;
    remainVolume: number;
    gageVolume: number;
    state: number;
    redemptionPermit: boolean;
    subscriptionPermit: boolean;
    totalRedemptiomVolume: number;
    watingRedemptiomVolume: number;
    watingSubscriptionAmount: number;
    voidableVolume: number;
    emissionDate: string;
    emissionDateJalali?: any;
    partyId: number;
    reinvest: number;
    partyFullName: string;
    partyNationalId: string;
    penalty: number;
    evidenceNumber: string;
    mutualFundCode: string;
    mutualFundId: number;
    mutualFundSymbol?: any;
    mutualFundTitle: string;
}
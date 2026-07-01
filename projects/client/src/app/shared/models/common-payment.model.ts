import { CommonPaymentTypeEnum } from "../enums";

export interface CommonPaymentModel {
  amount: number;
  stateTitle: string; 
  type: CommonPaymentTypeEnum;
  date: string;
  dateJalali: string;
  bankName?: string;
  mutualFundSymbol?: string;
  accountNumber?: string;
  attachmentId?: string;
  traceNo?: string;
  gatewayTitle?: string;
}

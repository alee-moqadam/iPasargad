
export interface BankAccountModel {
  id: number;
  accountNumber: string;
  accountType: number;
  accountTypeTitle: string;
  iban: string;
  branchCode: string;
  bankTitle: string;
  branchName: string;
  brokerComment: string;
  isApproved: boolean;
  bankId: number;
  status: number;
  statusTitle: string;
  isDefault: boolean;
}

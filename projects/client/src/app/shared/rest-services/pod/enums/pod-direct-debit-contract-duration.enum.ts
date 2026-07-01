export enum PodDirectDebitContractDurationEnum {
  Unknown = -1,
  OneYear = 1,
  TwoYears = 2,
}

export const PodDirectDebitContractDurationMap: Record<PodDirectDebitContractDurationEnum, string> = {
  [PodDirectDebitContractDurationEnum.Unknown]: 'نامعلوم',
  [PodDirectDebitContractDurationEnum.OneYear]: 'یک ساله',
  [PodDirectDebitContractDurationEnum.TwoYears]: 'دو ساله',
};

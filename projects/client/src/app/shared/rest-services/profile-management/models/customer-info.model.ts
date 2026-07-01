import { BankAccountModel, ContactInfoModel, HolderModel, PartyServiceInfoModel, PersonalInfoModel, PodSsoInfoModel, RegisterInfoModel } from ".";

export interface CustomerInfoModel {
  personalInfo: PersonalInfoModel;
  contactInfo: ContactInfoModel;
  bankAccounts: BankAccountModel[];
  holders: HolderModel[];
  registerInfo: RegisterInfoModel;
  podSsoInfo: PodSsoInfoModel;
  partyServiceInfos: PartyServiceInfoModel[];
}


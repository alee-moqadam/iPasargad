
export interface HolderModel {
  partyId: number;
  nationalId: string;
  type: number;
  holderType: number;
  holderTypeTitle: string;
  positionType: string;
  startAt: string;
  endAt: string;
  startAtJalali: string;
  endAtJalali: string;
  isOwnerSignature: boolean;
  firstName: string;
  lastName: string;
  fullName: string;
  postalCode: string;
  address: string;
  percentageVotingRight: number;
  personNationalId: string;
  state: number;
  created: string;
  modified: string;
}

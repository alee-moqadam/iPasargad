export interface UserSignInHistoryModel {
    pamCode: string;
    userName: string;
    fullName: string;
    ip: string;
    date: string;
    dateJalali: string;
    expireDate: string;
    expireDateJalali: string;
    browser: string;
    type: number;
    typeDescription: string;
    referer: string;
    baseUrl: string;
}
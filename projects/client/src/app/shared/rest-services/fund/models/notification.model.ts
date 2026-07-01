export interface INotification {
    notificationId: number;
    text: string;
    notificationType: number;
    notificationTypeTitle: string;
    expirationDate: Date;
    createDate: Date;
    contactType: number;
    contactTypeTitle: string;
    creatorId: number;
    creatorName: string;
    subject: string;
    notificationUserId: number;
    seen: boolean;
    seenDateTime?: any;
}
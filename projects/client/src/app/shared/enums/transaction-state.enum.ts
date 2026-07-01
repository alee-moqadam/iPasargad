export enum TransactionStateEnum {
  //  [Description("پیش نویس")]
  Draft = 1,
  //[Description("در انتظار")]
  Waiting = 2,
  //[Description("تایید")]
  Confirm = 3,
  // [Description("رد سیستم")]
  RejectedBySystem = 4,
  //  [Description("رد مدیر")]
  RejectedByManager = 5,
  //  [Description("لغو")]
  Cancel = 7,
  //  [Description("تایید گواهی")]
  EvidenceConfirm = 8,
  //  [Description("در انتظار پرداخت")]
  PaymentInProgress = 9,
  //  [Description("حذف شده")]
  Deleted = 99,
  //  [Description("انتقال یافته")]
  Transferred = 100,
}
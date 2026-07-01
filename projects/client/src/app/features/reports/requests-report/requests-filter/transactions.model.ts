import { TransactionStateEnum, TransactionTypeEnum } from "@client/shared";

export const Filter = {
    reportFilter: {
      id: null,
      startDate: null,
      endDate: null,
      phrase: '',
      mutualFundCode: null,
      requestTransactionType: -1,
      requestTransactionState: -1,
    },
    optionalFilter: {
      take: 0,
      skip: 0,
      page: 0,
      value: '',
      sort: [
        {
          field: 'date',
          dir: 'desc',
        },
      ],
    },
    branchId: 0,
  };


export const TransactionType: { code: TransactionTypeEnum, title: string }[] = [
    {
        code: TransactionTypeEnum.All,
        title: 'همه',
    },
    {
        code: TransactionTypeEnum.EMISSION,
        title: 'صدور',
    },
    {
        code: TransactionTypeEnum.REVOKE,
        title: 'ابطال',
    },
];


export const TransactionState: { code: number, title: string }[] = [
    {
        code: TransactionStateEnum.Draft,
        title: 'پیش نویس',
    },
    {
        code: TransactionStateEnum.Waiting,
        title: 'در انتظار',
    },
    {
        code: TransactionStateEnum.Confirm,
        title: 'تایید',
    },
    {
        code: TransactionStateEnum.RejectedBySystem,
        title: 'رد سیستم',
    },
    {
        code: TransactionStateEnum.RejectedByManager,
        title: 'رد مدیر',
    },
    {
        code: TransactionStateEnum.Cancel,
        title: 'لغو',
    },
    {
        code: TransactionStateEnum.EvidenceConfirm,
        title: 'تایید گواهی',
    },
    {
        code: TransactionStateEnum.PaymentInProgress,
        title: 'در انتظار پرداخت',
    },
    {
        code: TransactionStateEnum.Deleted,
        title: 'حذف شده',
    },
    {
        code: TransactionStateEnum.Transferred,
        title: 'انتقال یافته',
    },
];
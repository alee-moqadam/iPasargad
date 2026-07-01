import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import moment from 'jalali-moment';
import { PodDirectDebitContractDurationEnum, PodDirectDebitContractDurationMap, PodDirectDebitContractDurationModel } from '../rest-services';
import { numberToWords } from '@persian-tools/persian-tools';
const months = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

export function timeNow(format: string = 'YYYY/MM/DD') {
  return moment().locale('fa').format(format);
}

export function toPersianDate(
  value: string | Date,
  format: string = 'jYYYY/jMM/jDD',
  withWeekDate?: boolean
): any {
  if (withWeekDate) {
    return moment(value, format).isValid()
      ? moment(new Date(value)).locale('fa').format('jYYYY/jMM/jDD   dddd')
      : null;
  }
  return moment(value, format).isValid()
    ? moment(new Date(value)).locale('fa').format(format)
    : null;
}

export function toShortPersianDate(value: string | Date, format: string = 'jYYYY/jMM/jDD'): any {
  if (!moment(value, format).isValid()) {
    return null;
  }
  let month = months[+moment(new Date(value)).locale('fa').format('jM') - 1];
  return moment(new Date(value)).locale('fa').format('dddd  jDD') + ' ' + month;
}

export function toGregorian(
  value: string | Date,
  format: string = 'YYYY-MM-DD'
): any {
  return moment(value, 'jYYYY-jMM-jDD').isValid()
    ? moment.from(value.toString(), 'fa').format(format)
    : null;
}

export function toLocalTime(value: string | Date, format: string = 'HH:MM') {
  return moment(value, format).isValid()
    ? moment(new Date(value)).locale('fa').format(format)
    : null;
}

export function toExactPersianDate(value: string | Date, format: string = 'jYYYY/jMM/jDD'): any {
  return moment(value, format).isValid()
    ? moment(new Date(value)).locale('fa').format('YYYY/MM/DD')
    : null;
}

export function getPersianMonthToString(value: string | Date, format: string = 'jYYYY/jMM/jDD'): any {
  const m = moment(value, format).isValid()
    ? moment(new Date(value)).locale('fa').format('M')
    : null;
  if (m) {
    return months[+m - 1];
  }
  return '';
}

export function normalDate(date?: Date): string {
  let mainDate: Date;
  mainDate = date;
  if (!date) {
    mainDate = new Date();
  }
  return (
    mainDate.getFullYear() +
    '-' +
    (mainDate.getMonth() + 1) +
    '-' +
    mainDate.getDate()
  );
}

export function fromNowDate(value: string | Date, format: string = 'jYYYY/jMM/jDD'): any {
  return moment(value, format).locale('fa').fromNow(true);
}

export function NgbDateToGregorian(date: NgbDate): Date {
  return new Date(`${date.year}-${date.month}-${date.day}`);
}

export function NgbDateToStringGregorian(date: NgbDate): string {
  return `${date.year}-${date.month}-${date.day}`;
}

export function GregorianToNgbPersianDate(date: Date): NgbDateStruct {
  return {
    year: Number(toPersianDate(date, 'jYYYY')),
    month: Number(toPersianDate(date, 'jMM')),
    day: Number(toPersianDate(date, 'jDD')),
  };
}

export function NgbDatePersianDateToGregorian(date: NgbDate): Date {
  return toGregorian(`${date.year}-${date.month}-${date.day}`);
}

export function getDurationEnumItemByDate(startDateStr: string, endDateStr: string): PodDirectDebitContractDurationModel {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();

  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);

  if (totalMonths >= 11 && totalMonths <= 13) {
    return { code: PodDirectDebitContractDurationEnum.OneYear, title: PodDirectDebitContractDurationMap[PodDirectDebitContractDurationEnum.OneYear] };
  } else if (totalMonths >= 23 && totalMonths <= 25) {
    return { code: PodDirectDebitContractDurationEnum.TwoYears, title: PodDirectDebitContractDurationMap[PodDirectDebitContractDurationEnum.TwoYears] };
  }

  return { code: PodDirectDebitContractDurationEnum.Unknown, title: PodDirectDebitContractDurationMap[PodDirectDebitContractDurationEnum.Unknown] };
}

export function getDayOfMonthJalaliStr(dayOfMonthJalali: number | undefined): string | undefined {

  if (!dayOfMonthJalali || isNaN(dayOfMonthJalali) || dayOfMonthJalali < 1 || dayOfMonthJalali > 31) {
    return undefined;
  } else {
    switch (dayOfMonthJalali) {
      case 3:
        return 'سوم';
      case 23:
        return 'بیست و سوم';
      case 30:
      case 31:
        return 'روز آخر';
      default:
        return numberToWords(dayOfMonthJalali) + 'م';
    }
  }
}

export function getSelectedDaysOfMonthStr(days: number[]): string {
  const lastDayStr = ' روز آخر ';
  if (days.length === 0) return '';
  if (days.length === 1) return `${days[0]} هر ماه`;
  days.sort((a,b) => a - b)
  if (days.length === 2) return `${days[0]} و ${days[1] === 31 ? lastDayStr : days[1]} هر ماه`;
  const allExceptLast = days.slice(0, -1).join(' - ');
  const last = days[days.length - 1];
  return `${allExceptLast}  و ${last === 31 ? lastDayStr : last } هر ماه`;
}


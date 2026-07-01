import { Convert } from "./convert";

export function cleanObject(object) {
  Object
    .entries(object)
    .forEach(([k, v]) => {
      if (v && typeof v === 'object') {
        cleanObject(v);
      }
      if (v && typeof v === 'object' && !Object.keys(v).length || v === null || v === undefined) {
        if (Array.isArray(object)) {
          object.splice(+k, 1);
        } else {
          delete object[k];
        }
      }
    });
  return object;
}



export function removeComma(value: any) {
  if (!value) return ''
  value = value.toString();
  const toEnglishNumber = Convert.toEnglishNumber(value);
  return numberOnly(toEnglishNumber);
}

export function commaSeparate(value: any) {
  if (value == null || undefined) {
    return 0;
  }

  return removeComma(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function numberOnly(value: any) {
  return value.replace(/[^۰-۹0-9.]/g, '');
}

export function isOnlyDigit(str: string) {
  return /\d/.test(str);
}
export function toEnglishNumber(persianNumber: number | string) {
  return persianNumber.toString().replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
}
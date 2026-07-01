import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { removeComma } from "../utilities/helpers";


export function amountMaxValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const amountValue=+removeComma(control.value)

    return amountValue > 2000000000 ? { maxValue: { value: control.value } } : null;
  };
}
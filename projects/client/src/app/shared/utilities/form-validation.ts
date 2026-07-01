import { AbstractControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minDateValidator(minDate: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = new Date(minDate);
    const currentDate = new Date(control.value);


    if (currentDate < date) {
      return {
        minDateError: true,
      };
    }
    return null;
  };
}

export function maxDateValidator(maxDate: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = new Date(maxDate);
    const currentDate = new Date(control.value);
    if (currentDate > date) {
      return {
        maxDateError: true
      };
    }
    return null;
  };
}

export function MustMatch(formGroup: UntypedFormGroup, _element: string, _matchingElement: string): ValidatorFn {
  return (): ValidationErrors | null => {
    const element = formGroup.get(_element);
    const matchingElement = formGroup.get(_matchingElement);
    if (!element || !matchingElement) {
      return null;
    }
    return (element.value && matchingElement.value && element.value !== matchingElement.value) ? { mustMatch: true } : (formGroup.errors ? formGroup.errors : null);
  };
}
export function AtleastOne(formGroup: UntypedFormGroup, _elementOne: string, _elementTwo: string): ValidatorFn {
  return (): ValidationErrors | null => {
    const elementOne = formGroup.get(_elementOne);
    const elementTwo = formGroup.get(_elementTwo);
    return ((elementOne.value && elementTwo.value) || (!elementOne.value && !elementTwo.value)) ? { atleastOne: true } : (formGroup.errors ? formGroup.errors : null);
  };
}

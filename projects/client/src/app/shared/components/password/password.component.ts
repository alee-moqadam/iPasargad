import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, input, } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PasswordInputDirective } from './keyboard/password-input.directive';
import { KeyboardService } from './keyboard/keyboard.service';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyboardKeyDirective } from './keyboard/keyboard-key.directive';
import { PasswordValidatorComponent } from "./password-validator/password-validator.component";
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FontAwesomeModule, PasswordInputDirective, KeyboardComponent, PasswordValidatorComponent, JsonPipe, NgClass],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
  providers: [
    KeyboardService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordComponent,
      multi: true
    }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordComponent implements ControlValueAccessor, Validator {
  isStrongPassword = false;
  formControlName = input()
  showPasswordObligations = input<boolean>(false);
  isInvalid = input<boolean>(false);
  _passValue = ''
  get passValue() {
    return this._passValue
  }
  set passValue(value) {
    this._passValue = value;
    this.onChange(value);
    this.onTouch();
  }

  constructor(private cdr: ChangeDetectorRef) {

  }

  onChange: any = (data: any) => { }

  onTouch: any = () => { }
  writeValue(obj: any): void {
    this.passValue = obj
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.showPasswordObligations()) return null;
    return this.isStrongPassword ? null : { strongPassword: false };
  }
  registerOnValidatorChange?(fn: () => void): void { }

  public detectChangeOnInput(): void {
    this.onChange(this.passValue);
  }

  changePasswordVisibility(input: HTMLInputElement) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  onValidationUpdate(isStrong) {
    this.isStrongPassword = isStrong;
    this.cdr.detectChanges()
  }
}
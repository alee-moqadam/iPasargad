import { ChangeDetectionStrategy, Component, input, OnChanges, output, OutputEmitterRef, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-password-validator',
  standalone: true,
  imports: [],
  templateUrl: './password-validator.component.html',
  styleUrl: './password-validator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordValidatorComponent implements OnChanges {

  passwordToCheck = input<string>();
  validateValue: OutputEmitterRef<boolean> = output();
  colorRed = '#0F0';
  colorGreen = '#F00';
  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;
  bar4: string;

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToCheck'].currentValue;
    this.bar0 = password?.length >= 8 ? this.colorRed : this.colorGreen
    this.bar1 = /[a-z]+/.test(password) ? this.colorRed : this.colorGreen
    this.bar2 = /[A-Z]/.test(password) ? this.colorRed : this.colorGreen
    this.bar3 = /\d/.test(password) ? this.colorRed : this.colorGreen
    this.bar4 = /\W/.test(password) ? this.colorRed : this.colorGreen
    if (password?.length >= 8
      && /[a-z]/.test(password)
      && /[A-Z]/.test(password)
      && /\d/.test(password)
      && /\W/.test(password)
    ) {
      this.validateValue.emit(true)
    } else {
      this.validateValue.emit(false)
    }
  }

}

import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss'],
  standalone: false
})
export class LoadingButtonComponent {

  @Input() disabled: boolean | null = false;
  @Input() isLoading: boolean | null = false;
  @Input() type: string = 'submit';
  @Input() cssClass: string = "";

  constructor() { }
}

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  _isTabletSizeOrSmaller: boolean = window.innerWidth <= 1024;
  get isTabletSizeOrSmaller(): boolean {
    return this._isTabletSizeOrSmaller;
  }
  set isTabletSizeOrSmaller(value: boolean) {
    this._isTabletSizeOrSmaller = value;
  }

  checkWindowSize() {
    this.isTabletSizeOrSmaller = window.innerWidth <= 1024;
  }
}
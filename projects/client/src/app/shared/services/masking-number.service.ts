import { Injectable, signal } from '@angular/core';
import { UserSettingsService } from '@client/core/services/user-settings.service';
import { SettingKeys } from '../models/user-settings.model';

@Injectable({
  providedIn: 'root'
})

export class MaskingNumberService {
  private storageKey = 'isMasked'; // Key to use in localStorage

  constructor(private userSettingsService: UserSettingsService) {
    // Check if the mask state exists in localStorage when the service is initialized
    //const  localStorage.getItem(this.storageKey);

    this.userSettingsService.get<boolean>(SettingKeys.ShowAmountMask).subscribe((value: any) => {
      const savedState = value?.showAmountMask
      if (savedState !== null) {
        this.isMasked.set(savedState);
      } else {
        this.isMasked.set(true); // Default state if nothing is saved
      }
    })

  }

  private isMasked = signal<boolean>(true);

  // Toggle the masking state and store it in localStorage
  toggleMasking() {
    this.isMasked.set(!this.isMasked());
    this.userSettingsService.set(SettingKeys.ShowAmountMask, this.isMasked())
    //localStorage.setItem(this.storageKey, JSON.stringify(this.isMasked()));
  }

  // Get the current masked state
  getMaskedState() {
    return this.isMasked();
  }
}
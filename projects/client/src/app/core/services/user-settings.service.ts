import { Injectable } from '@angular/core';
import { SettingKeys } from '@client/shared/models/user-settings.model';
import { IdentityService } from '@client/shared/rest-services/identity/identity.service';
import { BehaviorSubject, filter, firstValueFrom, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  private defaultValues: { [key in SettingKeys]: any } = {
    [SettingKeys.FaNum]: true,
    [SettingKeys.ShowAmountMask]: false,

  };

  private settings: { [key in SettingKeys]: any } = { ...this.defaultValues };
  private settingsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public settings$: Observable<any> = this.settingsSubject.asObservable();

  constructor(private identityService: IdentityService) {
    this.initializeSettings()
  }

  /**
   * Initializes the settings by fetching them from the API.
   */
  private initializeSettings(): void {
    this.fetchSettings().subscribe({
      next: (fetchedSettings: any) => {
        this.settings = { ...this.defaultValues, ...fetchedSettings.result };
        this.settingsSubject.next(this.settings);
      },
      error: (err) => {
        console.error('Failed to fetch settings from API. Using default settings.', err);
      },
    });
  }

  get<T>(key: SettingKeys): Observable<T> {
    return this.settings$.pipe(
      filter(settings => settings !== null),
      take(1),
      tap(settings => settings[key])
    );
  }

  set<T>(key: SettingKeys, value: T): void {

    this.settings[key] = value;
    this.saveAllSettings().subscribe({
      next: () => console.log('All settings saved successfully.'),
      error: (err) => console.error('Error saving settings:', err),
    });
  }



  /**
   * Fetches all settings from the API.
   * @returns An observable with the fetched settings.
   */
  fetchSettings() {
    return this.identityService.getUserSetting();
  }
  /**
 * Saves all settings to the API.
 * @returns An observable for the save operation.
 */
  saveAllSettings(): Observable<any> {
    console.log("saveAllSettings", this.settings);
    return this.identityService.updateUserSetting(this.settings);
  }

}

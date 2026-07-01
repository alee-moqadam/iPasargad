import { SlicePipe } from '@angular/common';
import { AfterViewChecked, ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { IdentityService, UserSignInHistoryModel } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { UserSettingsService } from '@client/core/services/user-settings.service';
import { SettingKeys } from '@client/shared/models/user-settings.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NgbAccordionModule, FontAwesomeModule, SlicePipe, ChangePasswordComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, AfterViewChecked {
  faNum = signal(true)
  history = signal<UserSignInHistoryModel[]>([])
  isCollapsed1 = false;
  isCollapsed2 = false;
  isCollapsed3 = false;
  isCollapsed4 = false;
  showLoginByBiometrics = signal(false);
  unsubscribe$ = new Subject();
  constructor(private identityService: IdentityService,

    private userSettingsService: UserSettingsService) {

  }

  ngAfterViewChecked(): void {
    console.log("check",
      window.PublicKeyCredential, PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable

    );

    if (window.PublicKeyCredential && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        .then(supported => {
          this.showLoginByBiometrics.set(true)
          console.log(supported ? "✅ Biometric authentication is supported" : "❌ Biometric authentication NOT supported");
        })
        .catch(err => console.error("Error checking WebAuthn support:", err));
    } else {
      console.log("❌ WebAuthn Platform Authenticator NOT supported");
    }

  }


  ngOnInit() {
    this.userSettingsService.get<boolean>(SettingKeys.FaNum).subscribe((value: any) => {
      this.faNum.set(value.faNum)
    })


    this.identityService.getUserSignInHistory().subscribe(res => {
      this.history.set(res);
    })
  }



  faNumChanges() {
    if (this.faNum()) {
      this.faNum.set(false)
      document.body.classList.remove('faNum');
      this.userSettingsService.set(SettingKeys.FaNum, false)

    } else {
      this.faNum.set(true)
      document.body.classList.add('faNum');
      this.userSettingsService.set(SettingKeys.FaNum, true)

    }
  }


  ngOnDestroy() {
    this.unsubscribe$.next(null); // Emit null to indicate completion
    this.unsubscribe$.complete();
  }



}

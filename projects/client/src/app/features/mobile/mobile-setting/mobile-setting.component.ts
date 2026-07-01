import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { IndexedDBService } from '@client/core/services/indexeddb.service';
import { ToastService } from '@client/core/services/toast.service';
import { UserSettingsService } from '@client/core/services/user-settings.service';
import { SettingKeys } from '@client/shared/models/user-settings.model';
import { IdentityService } from '@client/shared/rest-services/identity';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mobile-setting',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule, FontAwesomeModule],
  templateUrl: './mobile-setting.component.html',
  styleUrl: './mobile-setting.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileSettingComponent implements OnInit, AfterViewInit {

  faNum = signal(true)
  biometricId = signal(true)
  showLoginByBiometrics = signal(false)
  showLoading = signal(false)

  isCollapsed1 = false;
  isCollapsed2 = false;
  isCollapsed3 = false;

  constructor(private userSettingsService: UserSettingsService,
    private toastService: ToastService,
    private indexedDBService: IndexedDBService,
    private identityService: IdentityService,
    private cdr: ChangeDetectorRef,

  ) {
    this.checkBiometricStatus();
  }

  ngOnInit(): void {
    this.userSettingsService.get<boolean>(SettingKeys.FaNum).subscribe((value: any) => {
      this.faNum.set(value.faNum)
    })
  }

  // ngAfterViewChecked(): void {
  //   if (window.PublicKeyCredential) {
  //     this.showLoginByBiometrics.set(true)
  //   } else {
  //     this.showLoginByBiometrics.set(false)
  //   }
  // }

  ngAfterViewInit(): void {
    if (window.PublicKeyCredential) {
      this.checkisUserVerifyingPlatformAuthenticatorAvailable();
    } else {
      this.showLoginByBiometrics.set(false);
    }
  }

  async checkisUserVerifyingPlatformAuthenticatorAvailable() {
    try {
      const capabilities = await (PublicKeyCredential as any).getClientCapabilities();

      if (capabilities.userVerifyingPlatformAuthenticator) {
        this.showLoginByBiometrics.set(true);
      } else {
        this.showLoginByBiometrics.set(false);
      }
    } catch (error) {
      this.showLoginByBiometrics.set(false);
    }
  }

  async checkBiometricStatus(): Promise<void> {
    try {
      const storedData = await this.indexedDBService.getData('webauthn', 'userCredential');
      this.biometricId.set(!!storedData); // Update signal based on data existence
    } catch (error) {
      this.biometricId.set(false);
    }
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


  biometricRegister($event) {
    $event.preventDefault()

    if (this.biometricId()) {
      // If already registered, remove credential
      this.indexedDBService.deleteData('webauthn', 'userCredential').then(() => {
        this.biometricId.set(false);
      });
    } else {
      this.identityService.getRegistrationOptions().subscribe((options: any) => {

        const updatedOptions = this.convertWebAuthnOptions(options.result);

        // this.showLoading.set(true);
        navigator.credentials.create(updatedOptions).then((credential: any) => {
          this.showLoading.set(true);

          const attestationResponse = credential.response as AuthenticatorAttestationResponse;
          const changedcredential= {
            id: this.removeSpecialCharacters(credential.id),
            type: credential.type,
            response: {
              clientDataJSON: this.arrayBufferToBase64(attestationResponse.clientDataJSON),
              attestationObject: this.arrayBufferToBase64(attestationResponse.attestationObject),
            },
          };

          this.identityService.CompleteRegistration(changedcredential).subscribe({
            next: () => {

              //localStorage.setItem('cid',credential.id);
              const cr = JSON.stringify(credential.id);
              // Save credential ID to IndexedDB
              this.indexedDBService.saveData('webauthn', { id: 'userCredential', cr  }).then(() => {
                this.biometricId.set(true);
                this.showLoading.set(false);
                this.cdr.detectChanges();

                this.toastService.show('اثر انگشت با موفقیت ثبت شد.', {
                  classname: 'bg-success text-light',
                });
              }).catch(err => {
                this.showLoading.set(false);
                this.biometricId.set(false);
              });
            },
            error: (err) => {
              this.showLoading.set(false);
              this.biometricId.set(false);
            }
          });
        }).catch(err =>{
          console.error("Error in WebAuthn:", err);
          // this.showLoading.set(false);
        });
      });
    }

    this.cdr.detectChanges();

  }


  convertWebAuthnOptions(options: any): any {
    return {
      publicKey: {
        ...options, // Keep other publicKey properties unchanged
        challenge: this.base64UrlToArrayBuffer(options.challenge),
        // rp: {
        //   ...options.rp,
        //   id: "localhost"
        // },
        user: {
          ...options.user, // Keep other user properties unchanged
          id: new TextEncoder().encode(options.user.id) // Convert user.id to Uint8Array
        }
      }
    };
  }

  base64UrlToArrayBuffer(base64Url: string): ArrayBuffer {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let binaryString = atob(base64);
    let bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  removeSpecialCharacters(input: string): string {
    return input.replace(/[^a-zA-Z0-9]/g, '');
  }

}

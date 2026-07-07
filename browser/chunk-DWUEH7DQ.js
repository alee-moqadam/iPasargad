import {
  IndexedDBService,
  NgxMaskDirective,
  provideNgxMask
} from "./chunk-5OLRFJES.js";
import {
  ActivatedRoute,
  AsyncPipe,
  BehaviorSubject,
  ChangeDetectorRef,
  CheckboxControlValueAccessor,
  CommonModule,
  CommunicationBoxComponent,
  Convert,
  CounterDirective,
  DefaultValueAccessor,
  ElementRef,
  FaIconComponent,
  FontAwesomeModule,
  FormArrayName,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormGroupName,
  FundService,
  IdentityService,
  LoadingButtonComponent,
  Location,
  MaxLengthValidator,
  MinLengthValidator,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgSelectOption,
  NgbCalendar,
  NgbCalendarPersian,
  NgbDatePersianDateToGregorian,
  NgbDatepickerI18n,
  NgbDatepickerI18nPersian,
  NgbDatepickerModule,
  NgbInputDatepicker,
  NgbTooltip,
  PartyRegisterStatusEnum,
  PasswordComponent,
  PatternValidator,
  ProfileManagementService,
  ReactiveFormsModule,
  RequiredValidator,
  Router,
  RouterLink,
  RouterOutlet,
  SelectControlValueAccessor,
  SharedModule,
  ToastService,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
  combineLatest,
  environment,
  map,
  signal,
  switchMap,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpropertyInterpolate,
  ɵɵpropertyInterpolate1,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-OE4HGK62.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-N6ESDQJH.js";

// projects/client/src/app/auth/login/login.component.ts
var _c0 = ["password"];
var _c1 = (a0) => ({ "is-invalid": a0 });
var _c2 = (a0) => ({ nationalId: a0 });
function LoginComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275listener("click", function LoginComponent_Conditional_28_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.generateNewCaptcha());
    });
    \u0275\u0275element(1, "fa-icon", 27)(2, "img", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("height", "30px");
    \u0275\u0275property("src", ctx_r2.generatedCaptchaValue().captchaByteData, \u0275\u0275sanitizeUrl);
  }
}
function LoginComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "p", 29);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("* ", ctx_r2.loginMsg(), "");
  }
}
function LoginComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-loading-button", 30);
    \u0275\u0275listener("click", function LoginComponent_Conditional_35_Template_app_loading_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.biometricLogin());
    });
    \u0275\u0275text(1, " \u0648\u0631\u0648\u062F \u0628\u0627 \u0627\u062B\u0631 \u0627\u0646\u06AF\u0634\u062A ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("isLoading", ctx_r2.biometricSubmitting())("disabled", ctx_r2.biometricSubmitting())("type", "button");
  }
}
var _LoginComponent = class _LoginComponent {
  constructor(router, identityService, toastService, indexedDBService) {
    this.router = router;
    this.identityService = identityService;
    this.toastService = toastService;
    this.indexedDBService = indexedDBService;
    this.generatedCaptchaValue = signal({});
    this.loginMsg = signal(null);
    this.submitting = signal(false);
    this.biometricSubmitting = signal(false);
    this.isPasswordVisible = false;
    this.showLoginByBiometrics = signal(false);
  }
  // ngAfterViewChecked(): void {
  //   if (window.PublicKeyCredential) {
  //     this.showLoginByBiometrics.set(true);
  //   } else {
  //     this.showLoginByBiometrics.set(false);
  //   }
  // }
  // ngAfterViewInit(): void {
  //   if (window.PublicKeyCredential) {
  //     PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
  //       .then((available) => {
  //         this.showLoginByBiometrics.set(available);
  //       })
  //       .catch((err) => {
  //         console.log('err', err);
  //         this.showLoginByBiometrics.set(false);
  //       });
  //   } else {
  //     this.showLoginByBiometrics.set(false);
  //   }
  // }
  ngAfterViewInit() {
    if (window.PublicKeyCredential) {
      this.checkisUserVerifyingPlatformAuthenticatorAvailable();
    } else {
      this.showLoginByBiometrics.set(false);
    }
  }
  checkisUserVerifyingPlatformAuthenticatorAvailable() {
    return __async(this, null, function* () {
      try {
        const capabilities = yield PublicKeyCredential.getClientCapabilities();
        if (capabilities.userVerifyingPlatformAuthenticator) {
          this.showLoginByBiometrics.set(true);
        } else {
          this.showLoginByBiometrics.set(false);
        }
      } catch (error) {
        this.showLoginByBiometrics.set(false);
      }
    });
  }
  ngOnInit() {
    this.generateNewCaptcha();
    this.formGroup = new UntypedFormGroup({
      loginName: new UntypedFormControl("", [Validators.required]),
      password: new UntypedFormControl("", [Validators.required]),
      captcha: new UntypedFormControl("", [Validators.required])
    });
  }
  submit() {
    this.formGroup.controls.loginName.markAsTouched();
    if (this.formGroup.controls.loginName.invalid) {
      throw new Error("nationalId is required!");
    }
    if (this.isDevelopmentMockLogin()) {
      this.completeDevelopmentMockLogin();
      return;
    }
    if (this.formGroup.invalid) {
      this.loginMsg.set("\u0644\u0637\u0641\u0627\u064B \u0645\u0642\u0627\u062F\u06CC\u0631 \u0648\u0631\u0648\u062F\u06CC \u0631\u0627 \u0645\u062C\u062F\u062F \u0628\u0631\u0631\u0633\u06CC \u0641\u0631\u0645\u0627\u06CC\u06CC\u062F.");
      throw new Error("form invalid!");
    }
    this.submitting.set(true);
    this.identityService.login({
      loginName: Convert.toEnglishNumber(this.formGroup.get("loginName")?.value),
      password: this.formGroup.get("password")?.value,
      captcha: {
        hash: this.generatedCaptchaValue().hashedCaptcha,
        salt: this.generatedCaptchaValue().salt,
        value: Convert.toEnglishNumber(this.formGroup.get("captcha")?.value)
      }
    }).subscribe((res) => {
      this.submitting.set(false);
      if (!res.result.isSuccess) {
        this.toastService.show(res.result.errorMessage, {
          classname: "bg-danger text-light"
        });
        throw new Error(res.result.errorMessage);
      }
      localStorage.setItem("sejam-status", res.result.sejamStatus);
      localStorage.setItem("step", res.result.step);
      this.toastService.toasts = [];
      this.router.navigate(["/dashboard"]);
    }, (err) => {
      this.submitting.set(false);
      if (err) {
        this.formGroup.get("captcha").setValue("");
        this.generateNewCaptcha();
        return;
      }
    });
  }
  canSubmitLogin() {
    return !this.submitting() && (this.formGroup?.valid || this.isDevelopmentMockLogin());
  }
  isDevelopmentMockLogin() {
    if (environment.production)
      return false;
    const loginName = Convert.toEnglishNumber(this.formGroup?.get("loginName")?.value ?? "").trim();
    const password = this.formGroup?.get("password")?.value ?? "";
    return loginName === "1" && password === "1";
  }
  completeDevelopmentMockLogin() {
    localStorage.setItem("sejam-status", "100");
    localStorage.setItem("step", "100");
    localStorage.setItem("dev-mock-auth", "true");
    this.loginMsg.set(null);
    this.submitting.set(false);
    this.toastService.toasts = [];
    this.router.navigate(["/dashboard"]);
  }
  generateNewCaptcha() {
    this.identityService.getCaptcha().subscribe((result) => {
      this.generatedCaptchaValue.set(__spreadProps(__spreadValues({}, result.result), {
        captchaByteData: "data:image/jpg;base64," + result.result["captchaByteData"]
      }));
    });
  }
  changePasswordVisibility() {
    switch (this.password.nativeElement.type) {
      case "password":
        this.password.nativeElement.type = "text";
        this.isPasswordVisible = true;
        break;
      default:
        this.password.nativeElement.type = "password";
        this.isPasswordVisible = false;
        break;
    }
  }
  biometricLogin() {
    this.biometricSubmitting.set(true);
    this.indexedDBService.getData("webauthn", "userCredential").then((storedData) => {
      if (!storedData || !storedData.cr) {
        this.biometricSubmitting.set(false);
        this.toastService.show("\u0644\u0637\u0641\u0627 \u0627\u0628\u062A\u062F\u0627 \u0627\u0632 \u0628\u062E\u0634 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0627\u062B\u0631 \u0627\u0646\u06AF\u0634\u062A \u0631\u0627 \u062B\u0628\u062A \u0646\u0645\u0627\u06CC\u06CC\u062F.", {
          classname: "bg-danger text-light"
        });
        return;
      }
      const crendialId = JSON.parse(storedData.cr);
      this.identityService.getAuthenticationOptions().subscribe((res) => {
        const publicKeyOptions = {
          challenge: this.base64ToUint8Array(res.result.challenge),
          timeout: res.result.timeout || 6e4,
          userVerification: res.result.userVerification || "preferred",
          rpId: res.result.rpId,
          allowCredentials: [{
            type: "public-key",
            transports: ["internal"],
            id: this.base64ToUint8Array(crendialId)
          }]
        };
        navigator.credentials.get({ publicKey: publicKeyOptions }).then((credential) => __async(this, null, function* () {
          this.biometricSubmitting.set(false);
          const response = credential.response;
          const changedId = this.removeSpecialCharacters(crendialId);
          const payload = {
            authenticatorAttachment: credential.authenticatorAttachment,
            clientExtensionResults: credential.getClientExtensionResults?.() || {},
            id: changedId,
            type: credential.type,
            rawId: this.arrayBufferToBase64(credential.rawId),
            response: {
              clientDataJSON: this.arrayBufferToBase64(response.clientDataJSON),
              authenticatorData: this.arrayBufferToBase64(response.authenticatorData),
              signature: this.arrayBufferToBase64(response.signature)
            }
          };
          this.identityService.CompleteAuthentication(payload).subscribe({
            next: (res2) => {
              if (!res2.result.isSuccess) {
                this.toastService.show(res2.result.errorMessage, {
                  classname: "bg-danger text-light"
                });
                throw new Error(res2.result.errorMessage);
              }
              localStorage.setItem("sejam-status", res2.result?.sejamStatus);
              localStorage.setItem("step", res2.result?.step);
              this.toastService.toasts = [];
              this.router.navigate(["/dashboard"]);
            },
            error: (err) => {
              this.indexedDBService.deleteData("webauthn", "userCredential").then(() => {
                this.toastService.show("\u062E\u0637\u0627 \u062F\u0631 \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A \u0628\u0627 \u0627\u062B\u0631 \u0627\u0646\u06AF\u0634\u062A. \u0644\u0637\u0641\u0627 \u0645\u062C\u062F\u062F\u0627 \u062B\u0628\u062A \u0627\u062B\u0631 \u0627\u0646\u06AF\u0634\u062A \u0631\u0627 \u0627\u0646\u062C\u0627\u0645 \u062F\u0647\u06CC\u062F.", {
                  classname: "bg-danger text-light"
                });
              }).catch((deleteErr) => {
                console.error("Error deleting credential:", deleteErr);
              });
            }
          });
        })).catch((err) => {
          this.biometricSubmitting.set(false);
          this.toastService.show("\u062E\u0637\u0627 \u062F\u0631 \u0641\u0631\u0622\u06CC\u0646\u062F \u0627\u062B\u0631 \u0627\u0646\u06AF\u0634\u062A", {
            classname: "bg-danger text-light"
          });
        });
      });
    }).catch((err) => {
      this.biometricSubmitting.set(false);
      this.toastService.show("\u0644\u0637\u0641\u0627 \u0627\u0628\u062A\u062F\u0627 \u0627\u0632 \u0628\u062E\u0634 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0627\u062B\u0631 \u0627\u0646\u06AF\u0634\u062A \u0631\u0627 \u062B\u0628\u062A \u0646\u0645\u0627\u06CC\u06CC\u062F.", {
        classname: "bg-danger text-light"
      });
    });
  }
  base64ToUint8Array(base64url) {
    let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4 !== 0) {
      base64 += "=";
    }
    try {
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    } catch (e) {
      console.error("Base64 decode error:", e);
      throw new Error("Invalid base64url string");
    }
  }
  removeSpecialCharacters(input) {
    return input.replace(/[^a-zA-Z0-9]/g, "");
  }
  arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = String.fromCharCode.apply(null, Array.from(bytes));
    return btoa(binary);
  }
};
_LoginComponent.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(IdentityService), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(IndexedDBService));
};
_LoginComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], viewQuery: function LoginComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c0, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.password = _t.first);
  }
}, standalone: true, features: [\u0275\u0275ProvidersFeature([provideNgxMask()]), \u0275\u0275StandaloneFeature], decls: 42, vars: 27, consts: [["password", ""], ["dir", "rtl", 3, "ngSubmit", "formGroup"], [1, "card", "overflow-hidden"], [1, "card-body", "px-5"], [1, "text-center", "my-5"], [1, "form-group", "mb-4"], ["for", "loginName", 1, "form-label"], ["pattern", "[0-9]*", "mask", "9*", "inputmode", "decimal", "id", "loginName", "type", "text", "formControlName", "loginName", "required", "", 1, "form-control", 3, "ngClass"], [1, "small", "text-danger", "me-2", "mt-1", "invalid-feedback"], [1, "d-flex", "justify-content-between", "align-items-center"], ["for", "password", 1, "mb-0"], ["routerLink", "/auth/forget-password", 1, "btn-link", "btn", "outline-none", "text-decoration-none", "fw-bold", 3, "state"], [1, "input-group", 3, "ngClass"], ["id", "password", "formControlName", "password", 3, "showPasswordObligations", "isInvalid"], [1, "form-group", "mb-5"], ["for", "captcha", 1, "form-label"], ["pattern", "[0-9]*", "mask", "9*", "inputmode", "decimal", "type", "text", "maxlength", "4", "minlength", "4", "formControlName", "captcha", "id", "captcha", "required", "", 1, "form-control", "ltr", "text-end", 3, "ngClass"], [1, "input-group-text", "p-0", "captcha"], [1, "my-4"], [1, "d-flex", "flex-column", "mb-1"], ["cssClass", "btn btn-primary", 1, "w-100", "my-3", 3, "isLoading", "disabled", "type"], ["cssClass", "btn btn-secondary", 1, "w-100", "my-3", "d-lg-none", 3, "isLoading", "disabled", "type"], [1, "card-footer", "d-flex"], ["type", "button", "routerLink", "/auth/reg/step1", 1, "btn", "btn-green", "flex-fill", "fw-semibold", "text-white", "my-3", "mx-2", 3, "state"], [1, "opacity-75", "mx-1"], [1, "mx-1"], [1, "input-group-text", "p-0", "captcha", 3, "click"], ["icon", "sync", 1, "mx-2"], [1, "img-fluid", "ms-2", 3, "src"], [1, "text-danger", "text-center", "mb-0"], ["cssClass", "btn btn-secondary", 1, "w-100", "my-3", "d-lg-none", 3, "click", "isLoading", "disabled", "type"]], template: function LoginComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 1);
    \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.submit());
    });
    \u0275\u0275elementStart(1, "div", 2)(2, "div", 3)(3, "h2", 4);
    \u0275\u0275text(4, "\u0648\u0631\u0648\u062F \u0628\u0647 \u0633\u0627\u0645\u0627\u0646\u0647");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 5)(6, "label", 6);
    \u0275\u0275text(7, "\u06A9\u062F \u0645\u0644\u06CC/\u0634\u0646\u0627\u0633\u0647 \u0645\u0644\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 7);
    \u0275\u0275elementStart(9, "div", 8);
    \u0275\u0275text(10, "\u0644\u0637\u0641\u0627 \u06A9\u062F \u0645\u0644\u06CC \u0631\u0627 \u0648\u0627\u0631\u062F \u0646\u0645\u0627\u06CC\u06CC\u062F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "div", 9)(13, "label", 10);
    \u0275\u0275text(14, "\u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "a", 11);
    \u0275\u0275text(16, " \u0641\u0631\u0627\u0645\u0648\u0634\u06CC \u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631\u061F ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 5)(18, "div", 12);
    \u0275\u0275element(19, "app-password", 13, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 8);
    \u0275\u0275text(22, "\u0644\u0637\u0641\u0627 \u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631 \u0631\u0627 \u0648\u0627\u0631\u062F \u0646\u0645\u0627\u06CC\u06CC\u062F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 14)(24, "label", 15);
    \u0275\u0275text(25, "\u06A9\u062F \u0627\u0645\u0646\u06CC\u062A\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 12);
    \u0275\u0275element(27, "input", 16);
    \u0275\u0275template(28, LoginComponent_Conditional_28_Template, 3, 3, "span", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 8);
    \u0275\u0275text(30, "\u0644\u0637\u0641\u0627 \u06A9\u062F \u0627\u0645\u0646\u06CC\u062A\u06CC \u0631\u0627 \u0648\u0627\u0631\u062F \u0646\u0645\u0627\u06CC\u06CC\u062F");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(31, LoginComponent_Conditional_31_Template, 3, 1, "div", 18);
    \u0275\u0275elementStart(32, "div", 19)(33, "app-loading-button", 20);
    \u0275\u0275text(34, " \u0648\u0631\u0648\u062F ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(35, LoginComponent_Conditional_35_Template, 2, 3, "app-loading-button", 21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div", 22)(37, "button", 23)(38, "span", 24);
    \u0275\u0275text(39, "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0646\u062F\u0627\u0631\u06CC\u062F\u061F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "span", 25);
    \u0275\u0275text(41, "\u062B\u0628\u062A \u0646\u0627\u0645");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275property("formGroup", ctx.formGroup);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(15, _c1, !ctx.formGroup.controls.loginName.pristine && ctx.formGroup.controls.loginName.touched && !ctx.formGroup.controls.loginName.valid));
    \u0275\u0275advance(7);
    \u0275\u0275property("state", \u0275\u0275pureFunction1(17, _c2, ctx.formGroup.controls.loginName.value));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(19, _c1, !ctx.formGroup.controls.password.pristine && ctx.formGroup.controls.password.touched && !ctx.formGroup.controls.password.valid));
    \u0275\u0275advance();
    \u0275\u0275property("showPasswordObligations", false)("isInvalid", !ctx.formGroup.controls.password.pristine && !ctx.formGroup.controls.password.pristine && !ctx.formGroup.controls.password.valid);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(21, _c1, !ctx.formGroup.controls.captcha.pristine && ctx.formGroup.controls.captcha.touched && !ctx.formGroup.controls.captcha.valid));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(23, _c1, !ctx.formGroup.controls.captcha.pristine && ctx.formGroup.controls.captcha.touched && !ctx.formGroup.controls.captcha.valid));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.generatedCaptchaValue() ? 28 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.loginMsg() ? 31 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("isLoading", ctx.submitting())("disabled", !ctx.canSubmitLogin())("type", "submit");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.showLoginByBiometrics() ? 35 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("state", \u0275\u0275pureFunction1(25, _c2, ctx.formGroup.controls.loginName.value));
  }
}, dependencies: [
  ReactiveFormsModule,
  \u0275NgNoValidate,
  DefaultValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  RequiredValidator,
  MinLengthValidator,
  MaxLengthValidator,
  PatternValidator,
  FormGroupDirective,
  FormControlName,
  FontAwesomeModule,
  FaIconComponent,
  RouterLink,
  PasswordComponent,
  NgxMaskDirective,
  CommonModule,
  NgClass,
  SharedModule,
  LoadingButtonComponent
], encapsulation: 2, changeDetection: 0 });
var LoginComponent = _LoginComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent" });
})();

// projects/client/src/app/auth/register/quick-register/quick-register.component.ts
var _c02 = (a0) => ({ "is-invalid": a0 });
function QuickRegisterComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0644\u0637\u0641\u0627 \u06A9\u062F \u0645\u0644\u06CC \u0631\u0627 \u0648\u0627\u0631\u062F \u0646\u0645\u0627\u06CC\u06CC\u062F ");
  }
}
function QuickRegisterComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0644\u0637\u0641\u0627 \u0634\u0646\u0627\u0633\u0647 \u0634\u0631\u06A9\u062A \u0631\u0627 \u0648\u0627\u0631\u062F \u0646\u0645\u0627\u06CC\u06CC\u062F ");
  }
}
function QuickRegisterComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275listener("click", function QuickRegisterComponent_Conditional_32_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.generateNewCaptcha());
    });
    \u0275\u0275element(1, "fa-icon", 29)(2, "img", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("height", "30px");
    \u0275\u0275property("src", ctx_r1.generatedCaptchaValue().captchaByteData, \u0275\u0275sanitizeUrl);
  }
}
function QuickRegisterComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "p", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("* ", ctx_r1.errMsg(), "");
  }
}
var _QuickRegisterComponent = class _QuickRegisterComponent {
  constructor(router, identityService) {
    this.router = router;
    this.identityService = identityService;
    this.generatedCaptchaValue = signal({});
    this.errMsg = signal(null);
    this.isLegal = signal(false);
    this.submitting = signal(false);
    this.nationalId = this.router.getCurrentNavigation()?.extras?.state?.nationalId;
  }
  ngOnInit() {
    this.generateNewCaptcha();
    this.formGroup = new UntypedFormGroup({
      nationalId: new UntypedFormControl(this.nationalId, [Validators.required]),
      mobile: new UntypedFormControl("", [Validators.required, Validators.minLength(11)]),
      captcha: new UntypedFormControl("", [Validators.required])
    });
  }
  submit() {
    this.formGroup.controls.nationalId.markAsTouched();
    if (this.formGroup.controls.nationalId.invalid) {
      throw new Error("nationalId is required!");
    }
    if (this.formGroup.invalid) {
      this.errMsg.set("\u0644\u0637\u0641\u0627\u064B \u0645\u0642\u0627\u062F\u06CC\u0631 \u0648\u0631\u0648\u062F\u06CC \u0631\u0627 \u0645\u062C\u062F\u062F \u0628\u0631\u0631\u0633\u06CC \u0641\u0631\u0645\u0627\u06CC\u06CC\u062F.");
      throw new Error("form invalid!");
    }
    if (!this.isLegal()) {
      this.submitting.set(true);
      this.identityService.register({
        nationalId: Convert.toEnglishNumber(this.formGroup.get("nationalId")?.value),
        mobile: Convert.toEnglishNumber(this.formGroup.get("mobile")?.value),
        code: "",
        captcha: {
          hash: this.generatedCaptchaValue().hashedCaptcha,
          salt: this.generatedCaptchaValue().salt,
          value: Convert.toEnglishNumber(this.formGroup.get("captcha")?.value)
        }
      }).subscribe((result) => {
        this.submitting.set(false);
        this.router.navigate(["auth/reg/step2"], {
          state: {
            nationalId: this.formGroup.get("nationalId")?.value,
            mobile: this.formGroup.get("mobile")?.value,
            patyType: this.isLegal ? 2 : 1
          }
        });
      }, (err) => {
        this.submitting.set(false);
        if (err) {
          this.generateNewCaptcha();
          return;
        }
      });
    } else {
      this.submitting.set(true);
      this.identityService.LegalRegister({
        nationalId: Convert.toEnglishNumber(this.formGroup.get("nationalId")?.value),
        mobile: Convert.toEnglishNumber(this.formGroup.get("mobile")?.value),
        code: "",
        captcha: {
          hash: this.generatedCaptchaValue().hashedCaptcha,
          salt: this.generatedCaptchaValue().salt,
          value: Convert.toEnglishNumber(this.formGroup.get("captcha")?.value)
        }
      }).subscribe((result) => {
        this.submitting.set(false);
        this.router.navigate(["auth/reg/step2"], { state: {
          nationalId: this.formGroup.get("nationalId")?.value,
          mobile: this.formGroup.get("mobile")?.value,
          partyType: this.isLegal ? 2 : 1
        } });
      }, (err) => {
        this.submitting.set(false);
        if (err) {
          this.generateNewCaptcha();
          return;
        }
      });
    }
  }
  generateNewCaptcha() {
    this.identityService.getCaptcha().subscribe((result) => {
      this.generatedCaptchaValue.set(__spreadProps(__spreadValues({}, result.result), {
        captchaByteData: "data:image/jpg;base64," + result.result["captchaByteData"]
      }));
    });
  }
  setLegal(isLegal) {
    if (isLegal) {
      this.isLegal.set(true);
    } else {
      this.isLegal.set(false);
    }
  }
};
_QuickRegisterComponent.\u0275fac = function QuickRegisterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _QuickRegisterComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(IdentityService));
};
_QuickRegisterComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _QuickRegisterComponent, selectors: [["app-quick-register"]], standalone: true, features: [\u0275\u0275ProvidersFeature([provideNgxMask()]), \u0275\u0275StandaloneFeature], decls: 45, vars: 22, consts: [["dir", "rtl", 3, "ngSubmit", "formGroup"], [1, "card", "overflow-hidden"], [1, "card-body", "px-5"], ["href", "https://academy.ipasargad.ir/instruction-to-sign-up-in-ipasargad/", "target", "_blank"], ["src", "/images/signup-banner.webp", "alt", "\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u0648 \u0627\u06CC\u062C\u0627\u062F \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC", 1, "w-100", "rounded", "my-4"], [1, "w-100", "border-dashed", "rounded"], [1, "mx-4"], [1, "btn", "mx-0"], ["type", "radio", "name", "paymentType", "autocomplete", "off", 1, "form-check-input", "ms-1", 3, "change", "checked"], [1, "form-group", "my-4"], ["for", "nationalId", 1, "form-label"], ["pattern", "[0-9]*", "inputmode", "decimal", "mask", "9*", "id", "nationalId", "type", "text", "formControlName", "nationalId", 1, "form-control", "ltr", "text-end", 3, "ngClass"], [1, "small", "text-danger", "me-2", "mt-1", "invalid-feedback"], [1, "form-group", "mb-4"], ["for", "mobile", 1, "form-label"], ["mask", "00000000000", "id", "mobile", "type", "text", "formControlName", "mobile", "inputmode", "decimal", "placeholder", "0912******", 1, "form-control", "ltr", "text-end", 3, "ngClass"], [1, "form-group", "mb-5"], ["for", "captcha", 1, "form-label"], [1, "input-group", 3, "ngClass"], ["pattern", "[0-9]*", "inputmode", "decimal", "mask", "9*", "type", "text", "maxlength", "4", "minlength", "4", "formControlName", "captcha", "id", "captcha", "required", "", 1, "form-control", "ltr", "text-end", 3, "ngClass"], [1, "input-group-text", "p-0", "captcha"], [1, "my-4"], [1, "d-flex", "flex-column", "mb-4"], ["cssClass", "btn btn-primary", 1, "flex-fill", "m-2", 3, "isLoading", "disabled", "type"], [1, "card-footer", "d-flex"], ["type", "button", "routerLink", "/auth/login", 1, "btn", "btn-green", "flex-fill", "fw-semibold", "text-white", "my-3", "mx-2"], [1, "opacity-75", "mx-1"], [1, "mx-1"], [1, "input-group-text", "p-0", "captcha", 3, "click"], ["icon", "sync", 1, "mx-2"], [1, "img-fluid", "ms-2", 3, "src"], [1, "text-danger", "text-center", "mb-0"]], template: function QuickRegisterComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "form", 0);
    \u0275\u0275listener("ngSubmit", function QuickRegisterComponent_Template_form_ngSubmit_0_listener() {
      return ctx.submit();
    });
    \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "a", 3);
    \u0275\u0275element(4, "img", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 5)(6, "span", 6);
    \u0275\u0275text(7, "\u0646\u0648\u0639 \u06A9\u0627\u0631\u0628\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "label", 7)(9, "input", 8);
    \u0275\u0275listener("change", function QuickRegisterComponent_Template_input_change_9_listener() {
      return ctx.setLegal(false);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " \u062D\u0642\u06CC\u0642\u06CC ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "label", 7)(12, "input", 8);
    \u0275\u0275listener("change", function QuickRegisterComponent_Template_input_change_12_listener() {
      return ctx.setLegal(true);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " \u062D\u0642\u0648\u0642\u06CC ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 9)(15, "label", 10);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 11);
    \u0275\u0275elementStart(18, "div", 12);
    \u0275\u0275template(19, QuickRegisterComponent_Conditional_19_Template, 1, 0)(20, QuickRegisterComponent_Conditional_20_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 13)(22, "label", 14);
    \u0275\u0275text(23, "\u0634\u0645\u0627\u0631\u0647 \u062A\u0644\u0641\u0646 \u0647\u0645\u0631\u0627\u0647");
    \u0275\u0275elementEnd();
    \u0275\u0275element(24, "input", 15);
    \u0275\u0275elementStart(25, "div", 12);
    \u0275\u0275text(26, "\u0644\u0637\u0641\u0627 \u0634\u0645\u0627\u0631\u0647 \u062A\u0644\u0641\u0646 \u0647\u0645\u0631\u0627\u0647 \u0631\u0627 \u0648\u0627\u0631\u062F \u0646\u0645\u0627\u06CC\u06CC\u062F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 16)(28, "label", 17);
    \u0275\u0275text(29, "\u06A9\u062F \u0627\u0645\u0646\u06CC\u062A\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 18);
    \u0275\u0275element(31, "input", 19);
    \u0275\u0275template(32, QuickRegisterComponent_Conditional_32_Template, 3, 3, "span", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 12);
    \u0275\u0275text(34, "\u0644\u0637\u0641\u0627 \u06A9\u062F \u0627\u0645\u0646\u06CC\u062A\u06CC \u0631\u0627 \u0648\u0627\u0631\u062F \u0646\u0645\u0627\u06CC\u06CC\u062F");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(35, QuickRegisterComponent_Conditional_35_Template, 3, 1, "div", 21);
    \u0275\u0275elementStart(36, "div", 22)(37, "app-loading-button", 23);
    \u0275\u0275text(38, " \u062B\u0628\u062A\u200C\u0646\u0627\u0645 ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "div", 24)(40, "button", 25)(41, "span", 26);
    \u0275\u0275text(42, "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u062F\u0627\u0631\u06CC\u062F\u061F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "span", 27);
    \u0275\u0275text(44, "\u0648\u0631\u0648\u062F");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275property("formGroup", ctx.formGroup);
    \u0275\u0275advance(9);
    \u0275\u0275property("checked", !ctx.isLegal());
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", ctx.isLegal());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.isLegal() ? "\u0634\u0646\u0627\u0633\u0647 \u0634\u0631\u06A9\u062A" : "\u06A9\u062F \u0645\u0644\u06CC");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(14, _c02, !ctx.formGroup.controls.nationalId.pristine && ctx.formGroup.controls.nationalId.touched && !ctx.formGroup.controls.nationalId.valid));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.isLegal() ? 19 : 20);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(16, _c02, !ctx.formGroup.controls.mobile.pristine && ctx.formGroup.controls.mobile.touched && !ctx.formGroup.controls.mobile.valid));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(18, _c02, !ctx.formGroup.controls.captcha.pristine && ctx.formGroup.controls.captcha.touched && !ctx.formGroup.controls.captcha.valid));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(20, _c02, !ctx.formGroup.controls.captcha.pristine && ctx.formGroup.controls.captcha.touched && !ctx.formGroup.controls.captcha.valid));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.generatedCaptchaValue() ? 32 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.errMsg() ? 35 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("isLoading", ctx.submitting())("disabled", ctx.submitting() || ctx.formGroup.invalid)("type", "submit");
  }
}, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, FormGroupDirective, FormControlName, FontAwesomeModule, FaIconComponent, RouterLink, NgxMaskDirective, NgClass, SharedModule, LoadingButtonComponent], styles: ['/* projects/client/src/app/auth/register/quick-register/quick-register.component.scss */\n.bg-auth {\n  background: #eee url("./media/signup-bg.svg");\n  background-size: cover;\n  background-position: bottom;\n}\ninput[type=radio] {\n  border: solid 1px #ddd;\n}\n/*# sourceMappingURL=quick-register.component.css.map */\n'], encapsulation: 2, changeDetection: 0 });
var QuickRegisterComponent = _QuickRegisterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(QuickRegisterComponent, { className: "QuickRegisterComponent" });
})();

// projects/client/src/app/auth/register/quick-register-step2/quick-register-step2.component.ts
var _c03 = ["password"];
var _c12 = ["confirmNewPass"];
var _c22 = (a0) => ({ "is-invalid": a0 });
var _c3 = () => ({ seconds: 0, minutes: 2 });
function QuickRegisterStep2Component_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0648 \u062A\u06A9\u0631\u0627\u0631 \u0622\u0646 \u06CC\u06A9\u0633\u0627\u0646 \u0646\u06CC\u0633\u062A");
    \u0275\u0275elementEnd();
  }
}
function QuickRegisterStep2Component_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u0644\u0637\u0641\u0627 \u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0631\u0627 \u0648\u0627\u0631\u062F \u0646\u0645\u0627\u06CC\u06CC\u062F");
    \u0275\u0275elementEnd();
  }
}
function QuickRegisterStep2Component_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "p", 21);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("* ", ctx_r1.errorMessage(), "");
  }
}
var _QuickRegisterStep2Component = class _QuickRegisterStep2Component {
  constructor(router, identityService, location, toastService, fundService) {
    this.router = router;
    this.identityService = identityService;
    this.toastService = toastService;
    this.fundService = fundService;
    this.errorMessage = signal(null);
    this.isOtpSend$ = new BehaviorSubject(true);
    this.resendOTP$ = new BehaviorSubject(false);
    this.submitted = false;
    this.showCounter$ = new BehaviorSubject(true);
    this.state = { mobile: "", nationalId: "", partyType: 1 };
    this.isPasswordVisible = false;
    this.isPassword2Visible = false;
    this.submitting = signal(false);
    this.disableOtpButton$ = combineLatest([this.isOtpSend$, this.showCounter$]).pipe(map(([isOtpSend, showCounter]) => isOtpSend && showCounter));
    this.passwordMatchValidator = (form) => {
      if (form.get("newPassword")?.value !== form.get("confirmPassword")?.value) {
        return { passwordMismatch: true };
      }
      return null;
    };
    this.state = location.getState();
  }
  ngOnInit() {
    this.formGroup = new UntypedFormGroup({
      otp: new UntypedFormControl("", [Validators.required]),
      newPassword: new UntypedFormControl("", [Validators.required]),
      confirmPassword: new UntypedFormControl("", [Validators.required])
    }, this.passwordMatchValidator);
  }
  sendOtp() {
    const isOtpSend = this.isOtpSend$.getValue();
    if (isOtpSend) {
      this.showCounter$.next(true);
      return;
    }
    this.submitting.set(true);
    this.identityService.sendRegisterOtp({
      nationalId: this.state.nationalId
    }).subscribe((res) => {
      if (!res.isError) {
        this.submitting.set(false);
        this.resendOTP$.next(true);
        this.isOtpSend$.next(true);
        this.showCounter$.next(true);
      }
    }, () => {
      this.submitting.set(false);
    });
  }
  submit() {
    if (this.formGroup.invalid) {
      this.errorMessage.set("\u0644\u0637\u0641\u0627\u064B \u0645\u0642\u0627\u062F\u06CC\u0631 \u0648\u0631\u0648\u062F\u06CC \u0631\u0627 \u0645\u062C\u062F\u062F \u0628\u0631\u0631\u0633\u06CC \u0641\u0631\u0645\u0627\u06CC\u06CC\u062F.");
      throw new Error("form invalid!");
    }
    if (this.formGroup.get("newPassword")?.errors?.strongPassword == false) {
      this.errorMessage.set("\u0644\u0637\u0641\u0627\u064B \u0631\u0645\u0632\u0639\u0628\u0648\u0631 \u067E\u06CC\u0686\u06CC\u062F\u0647\u200C\u062A\u0631\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u0645\u0627\u06CC\u06CC\u062F.");
      throw new Error("form invalid!");
    }
    this.submitted = true;
    let form = this.formGroup.value;
    form.nationalId = Convert.toEnglishNumber(this.state.nationalId);
    form.otp = Convert.toEnglishNumber(form.otp);
    this.submitting.set(true);
    this.identityService.setPassword(form).pipe(switchMap((res) => {
      this.submitting.set(false);
      this.submitted = false;
      localStorage.setItem("ottoken", res.result.token);
      const message = "\u062B\u0628\u062A \u0646\u0627\u0645 \u062F\u0631 \u0633\u0627\u0645\u0627\u0646\u0647 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u0627\u0646\u062C\u0627\u0645 \u0634\u062F";
      this.toastService.show(message, { classname: "bg-success text-light", delay: 5e3 });
      localStorage.setItem("sejam-status", res.result.sejamStatus);
      localStorage.setItem("step", res.result.step);
      return this.fundService.getPartyRegisterStatus();
    })).subscribe((currentStep) => {
      if (currentStep < PartyRegisterStatusEnum.Completed) {
        if (this.state.partyType == 2) {
          this.router.navigate(["auth/reg/step3"], {
            state: {
              nationalId: this.state.nationalId,
              mobile: this.state.mobile
            },
            queryParams: { partyType: this.state.partyType }
          });
        } else {
          this.router.navigate(["auth/reg/step3"], {
            state: {
              nationalId: this.state.nationalId,
              mobile: this.state.mobile
            }
          });
        }
      } else if (currentStep == PartyRegisterStatusEnum.Completed) {
        this.router.navigate(["/dashboard"]);
      }
    }, (err) => {
      this.submitting.set(false);
      this.submitted = false;
      if (err && err.error) {
        this.f.otp.setValue(null);
        this.f.otp.updateValueAndValidity();
      }
    });
  }
  get f() {
    return this.formGroup.controls;
  }
  get confirmPassword() {
    return this.formGroup.get("confirmNewPass");
  }
  onCounterValueChange(value) {
    if (value.count <= 0) {
      this.isOtpSend$.next(false);
      this.showCounter$.next(false);
    }
  }
  changePasswordVisibility() {
    switch (this.password.nativeElement.type) {
      case "password":
        this.password.nativeElement.type = "text";
        this.isPasswordVisible = true;
        break;
      default:
        this.password.nativeElement.type = "password";
        this.isPasswordVisible = false;
        break;
    }
  }
  changePassword2Visibility() {
    switch (this.confirmNewPass.nativeElement.type) {
      case "password":
        this.confirmNewPass.nativeElement.type = "text";
        this.isPassword2Visible = true;
        break;
      default:
        this.confirmNewPass.nativeElement.type = "password";
        this.isPassword2Visible = false;
        break;
    }
  }
};
_QuickRegisterStep2Component.\u0275fac = function QuickRegisterStep2Component_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _QuickRegisterStep2Component)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(IdentityService), \u0275\u0275directiveInject(Location), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(FundService));
};
_QuickRegisterStep2Component.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _QuickRegisterStep2Component, selectors: [["app-quick-register-step2"]], viewQuery: function QuickRegisterStep2Component_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c03, 5);
    \u0275\u0275viewQuery(_c12, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.password = _t.first);
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.confirmNewPass = _t.first);
  }
}, standalone: true, features: [\u0275\u0275ProvidersFeature([provideNgxMask()]), \u0275\u0275StandaloneFeature], decls: 34, vars: 30, consts: [["password", ""], ["confirmPassword", ""], ["dir", "rtl", 3, "ngSubmit", "formGroup"], [1, "card", "overflow-hidden"], [1, "card-body", "px-5"], [1, "form-group", "my-4"], ["for", "newPassword"], ["id", "newPassword", "formControlName", "newPassword", 3, "showPasswordObligations"], [1, "form-group", "mb-3"], ["for", "confirmPassword", 1, "mb-0"], [1, "input-group", 3, "ngClass"], ["id", "confirmPassword", "formControlName", "confirmPassword", "required", "", 3, "isInvalid"], [1, "small", "text-danger", "me-2", "mt-1", "invalid-feedback"], [1, "form-group", "mb-4"], ["for", "otp", 1, "form-label"], ["pattern", "[0-9]*", "inputmode", "decimal", "name", "otp", "type", "text", "id", "otp", "formControlName", "otp", "required", "", 1, "form-control", "ltr", "text-end", 3, "ngClass"], ["type", "button", "text", "\u0627\u0631\u0633\u0627\u0644 \u06A9\u062F", "altText", "", 1, "input-group-text", "text-center", "cursor-pointer", 3, "click", "value", "counter", "start", "disabled", "showCounter"], [1, "my-4"], [1, "card-footer", "d-flex"], ["type", "button", "routerLink", "/auth/reg/step1", 1, "flex-fill", "btn", "btn-gray-150", "m-2", "text-black"], ["cssClass", "btn btn-primary", 1, "flex-fill", "m-2", 3, "isLoading", "disabled", "type"], [1, "text-danger", "text-center", "mb-0"]], template: function QuickRegisterStep2Component_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 2);
    \u0275\u0275listener("ngSubmit", function QuickRegisterStep2Component_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.submit());
    });
    \u0275\u0275elementStart(1, "div", 3)(2, "div", 4)(3, "div", 5)(4, "label", 6);
    \u0275\u0275text(5, "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "app-password", 7, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 8)(9, "label", 9);
    \u0275\u0275text(10, "\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 10);
    \u0275\u0275element(12, "app-password", 11, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 12);
    \u0275\u0275template(15, QuickRegisterStep2Component_Conditional_15_Template, 2, 0, "span")(16, QuickRegisterStep2Component_Conditional_16_Template, 2, 0, "span");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 13)(18, "label", 14);
    \u0275\u0275text(19, "\u06A9\u062F \u0627\u0631\u0633\u0627\u0644 \u0634\u062F\u0647 \u0628\u0647 \u0634\u0645\u0627\u0631\u0647 \u0631\u0627 \u0648\u0627\u0631\u062F \u0646\u0645\u0627\u06CC\u06CC\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 10);
    \u0275\u0275element(21, "input", 15);
    \u0275\u0275elementStart(22, "button", 16);
    \u0275\u0275pipe(23, "async");
    \u0275\u0275pipe(24, "async");
    \u0275\u0275pipe(25, "async");
    \u0275\u0275listener("click", function QuickRegisterStep2Component_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.sendOtp());
    })("value", function QuickRegisterStep2Component_Template_button_value_22_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onCounterValueChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 12);
    \u0275\u0275text(27, "\u0644\u0637\u0641\u0627 \u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u0646\u0645\u0627\u06CC\u06CC\u062F");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(28, QuickRegisterStep2Component_Conditional_28_Template, 3, 1, "div", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 18)(30, "button", 19);
    \u0275\u0275text(31, " \u0628\u0627\u0632\u06AF\u0634\u062A ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "app-loading-button", 20);
    \u0275\u0275text(33, " \u062A\u06A9\u0645\u06CC\u0644 \u062B\u0628\u062A\u200C\u0646\u0627\u0645 ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275property("formGroup", ctx.formGroup);
    \u0275\u0275advance(6);
    \u0275\u0275property("showPasswordObligations", true);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(23, _c22, !ctx.formGroup.controls.confirmPassword.pristine && ctx.formGroup.controls.confirmPassword.touched && (!ctx.formGroup.controls.confirmPassword.valid || (ctx.formGroup.errors == null ? null : ctx.formGroup.errors["passwordMismatch"]))));
    \u0275\u0275advance();
    \u0275\u0275property("isInvalid", !ctx.formGroup.controls.confirmPassword.pristine && ctx.formGroup.controls.confirmPassword.touched && (!ctx.formGroup.controls.confirmPassword.valid || (ctx.formGroup.errors == null ? null : ctx.formGroup.errors["passwordMismatch"])));
    \u0275\u0275advance(3);
    \u0275\u0275conditional((ctx.formGroup.errors == null ? null : ctx.formGroup.errors["passwordMismatch"]) ? 15 : 16);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(25, _c22, !ctx.formGroup.controls.otp.pristine && ctx.formGroup.controls.otp.touched && !ctx.formGroup.controls.otp.valid));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(27, _c22, !ctx.formGroup.controls.otp.pristine && ctx.formGroup.controls.otp.touched && !ctx.formGroup.controls.otp.valid));
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", "100px");
    \u0275\u0275property("counter", \u0275\u0275pureFunction0(29, _c3))("start", \u0275\u0275pipeBind1(23, 17, ctx.isOtpSend$))("disabled", \u0275\u0275pipeBind1(24, 19, ctx.disableOtpButton$))("showCounter", \u0275\u0275pipeBind1(25, 21, ctx.showCounter$));
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx.errorMessage() ? 28 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("isLoading", ctx.submitting())("disabled", ctx.submitting() || ctx.formGroup.invalid)("type", "submit");
  }
}, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, PatternValidator, FormGroupDirective, FormControlName, FontAwesomeModule, RouterLink, SharedModule, CounterDirective, LoadingButtonComponent, AsyncPipe, PasswordComponent, CommonModule, NgClass], styles: ['/* projects/client/src/app/auth/register/quick-register-step2/quick-register-step2.component.scss */\n.bg-auth {\n  background: #eee url("./media/signup-bg.svg");\n  background-size: cover;\n  background-position: bottom;\n}\n/*# sourceMappingURL=quick-register-step2.component.css.map */\n'], encapsulation: 2, changeDetection: 0 });
var QuickRegisterStep2Component = _QuickRegisterStep2Component;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(QuickRegisterStep2Component, { className: "QuickRegisterStep2Component" });
})();

// projects/client/src/app/auth/animated-background/animated-background.component.ts
function AnimatedBackgroundComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 2);
  }
  if (rf & 2) {
    const i_r1 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("background-color", ctx_r1.colorStyles[i_r1])("opacity", ctx_r1.opacityStyles[i_r1]);
  }
}
var _AnimatedBackgroundComponent = class _AnimatedBackgroundComponent {
  constructor(cdr) {
    this.cdr = cdr;
    this.squares = [];
    this.colors = ["#f9fcff", "#ebf5ff", "#f1f8ff", "#ffffff00", "#ffffff00", "#ffffff00"];
    this.colorStyles = [];
    this.opacityStyles = [];
    this.intervalIds = [];
    this.squares = Array.from({ length: 1e3 }, (_, i) => i + 1);
    this.colorStyles = Array(this.squares.length).fill("#ffffff00");
    this.opacityStyles = Array(this.squares.length).fill(1);
  }
  ngOnInit() {
    this.squares.forEach((_, index) => {
      this.opacityStyles[index] = this.calculateOpacity(index);
      const intervalId = setInterval(() => this.changeColor(index), this.getRandomInterval());
      this.intervalIds[index] = intervalId;
    });
  }
  ngOnDestroy() {
    this.intervalIds.forEach((intervalId) => clearInterval(intervalId));
  }
  changeColor(index) {
    const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.colorStyles[index] = randomColor;
    this.cdr.detectChanges();
  }
  getRandomInterval() {
    return Math.floor(Math.random() * 5e3) + 1e3;
  }
  calculateOpacity(index) {
    const maxOpacity = 1;
    const minOpacity = 0.5;
    const totalSquares = this.squares.length - 1;
    return maxOpacity - (maxOpacity - minOpacity) * index / totalSquares;
  }
};
_AnimatedBackgroundComponent.\u0275fac = function AnimatedBackgroundComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AnimatedBackgroundComponent)(\u0275\u0275directiveInject(ChangeDetectorRef));
};
_AnimatedBackgroundComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AnimatedBackgroundComponent, selectors: [["app-animated-background"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 1, consts: [[1, "animated-background"], ["class", "square", 3, "backgroundColor", "opacity", 4, "ngFor", "ngForOf"], [1, "square"]], template: function AnimatedBackgroundComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275template(1, AnimatedBackgroundComponent_div_1_Template, 1, 4, "div", 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx.squares);
  }
}, dependencies: [NgForOf], styles: ["\n\n.animated-background[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(42px, 1fr));\n  grid-auto-rows: 42px;\n  gap: 0;\n  background:\n    linear-gradient(\n      to bottom,\n      #f9fcff,\n      #ebf5ff);\n}\n.animated-background[_ngcontent-%COMP%]   .square[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  transition: background-color 2s ease-in-out, opacity 2s ease-in-out;\n}\n/*# sourceMappingURL=animated-background.component.css.map */"] });
var AnimatedBackgroundComponent = _AnimatedBackgroundComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AnimatedBackgroundComponent, { className: "AnimatedBackgroundComponent" });
})();

// projects/client/src/app/auth/auth.component.ts
function AuthComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" (", ctx_r0.appVersionCode, ") ");
  }
}
function AuthComponent_Conditional_9_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, " \u0644\u0637\u0641\u0627\u064B \u067E\u06CC\u0634 \u0627\u0632 \u0648\u0627\u0631\u062F \u06A9\u0631\u062F\u0646 \u0647\u0631\u06AF\u0648\u0646\u0647 \u0627\u0637\u0644\u0627\u0639\u0627\u062A\u060C \u0622\u062F\u0631\u0633 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647\u200C\u0634\u062F\u0647 \u062F\u0631 \u0646\u0648\u0627\u0631 \u0645\u0631\u0648\u0631\u06AF\u0631 \u062E\u0648\u062F \u0631\u0627 \u0628\u0627 \u0622\u062F\u0631\u0633 \u0631\u0633\u0645\u06CC \u0633\u0627\u0645\u0627\u0646\u0647 \u0645\u0637\u0627\u0628\u0642\u062A \u062F\u0647\u06CC\u062F. \u062F\u0631 \u0635\u0648\u0631\u062A \u0645\u0634\u0627\u0647\u062F\u0647 \u0647\u0631\u06AF\u0648\u0646\u0647 \u0645\u063A\u0627\u06CC\u0631\u062A\u060C \u0627\u0632 \u0627\u062F\u0627\u0645\u0647 \u0641\u0631\u0622\u06CC\u0646\u062F \u062E\u0648\u062F\u062F\u0627\u0631\u06CC \u0646\u0645\u0648\u062F\u0647 \u0648 \u0645\u0648\u0636\u0648\u0639 \u0631\u0627 \u0628\u0647 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0627\u0637\u0644\u0627\u0639 \u062F\u0647\u06CC\u062F. ");
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_9_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, " \u0628\u0631\u0627\u06CC \u062D\u0641\u0638 \u0627\u0645\u0646\u06CC\u062A \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u062E\u0648\u062F\u060C \u0627\u0632 \u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC \u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0648 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0628\u0627 \u062F\u06CC\u06AF\u0631\u0627\u0646 \u0627\u06A9\u06CC\u062F\u0627\u064B \u062E\u0648\u062F\u062F\u0627\u0631\u06CC \u06A9\u0646\u06CC\u062F. \u0647\u0645\u0686\u0646\u06CC\u0646\u060C \u067E\u0633 \u0627\u0632 \u067E\u0627\u06CC\u0627\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647\u060C \u062D\u062A\u0645\u0627\u064B \u0628\u0631 \u0631\u0648\u06CC \u06AF\u0632\u06CC\u0646\u0647 \xAB\u062E\u0631\u0648\u062C \u0627\u0632 \u0633\u0627\u0645\u0627\u0646\u0647\xBB \u06A9\u0644\u06CC\u06A9 \u0646\u0645\u0627\u06CC\u06CC\u062F. ");
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_9_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, " \u0644\u0637\u0641\u0627\u064B \u0628\u0631\u0627\u06CC \u0627\u0641\u0632\u0627\u06CC\u0634 \u0627\u0645\u0646\u06CC\u062A \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062E\u0648\u062F\u060C \u0627\u0632 \u0635\u0641\u062D\u0647 \u06A9\u0644\u06CC\u062F \u0645\u062C\u0627\u0632\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646\u06CC\u062F. ");
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "p", 7);
    \u0275\u0275text(3, " \u0633\u0627\u0645\u0627\u0646\u0647 \u0622\u06CC\u200C\u067E\u0627\u0633\u0627\u0631\u06AF\u0627\u062F \u0628\u0647 \u0645\u0646\u0638\u0648\u0631 \u0627\u0641\u0632\u0627\u06CC\u0634 \u0627\u0645\u0646\u06CC\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646\u060C \u0627\u0632 \u067E\u0631\u0648\u062A\u06A9\u0644 SSL \u0648 \u0622\u062F\u0631\u0633 \u0631\u0633\u0645\u06CC https://ipasargad.ir \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u06A9\u0646\u062F. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, AuthComponent_Conditional_9_p_4_Template, 2, 0, "p", 8)(5, AuthComponent_Conditional_9_p_5_Template, 2, 0, "p", 9)(6, AuthComponent_Conditional_9_p_6_Template, 2, 0, "p", 9);
    \u0275\u0275elementStart(7, "button", 10);
    \u0275\u0275listener("click", function AuthComponent_Conditional_9_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleText());
    });
    \u0275\u0275text(8);
    \u0275\u0275elementStart(9, "span", 11);
    \u0275\u0275element(10, "fa-icon", 12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 13)(12, "span", 14);
    \u0275\u0275text(13, "\xA9 \u062F\u0627\u062A\u06A9\u0633 1403");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "span", 15);
    \u0275\u0275elementStart(15, "span", 16);
    \u0275\u0275text(16, "\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "span", 15);
    \u0275\u0275elementStart(18, "span", 16);
    \u0275\u0275text(19, "\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "span", 15);
    \u0275\u0275elementStart(21, "span", 16);
    \u0275\u0275text(22, "\u0631\u0627\u0647\u0646\u0645\u0627");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !ctx_r0.isExpanded());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isExpanded());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isExpanded());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.isExpanded() ? "\u0628\u0633\u062A\u0646" : "\u0628\u06CC\u0634\u062A\u0631", " ");
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate("icon", !ctx_r0.isExpanded() ? "angle-down" : "angle-up");
  }
}
var _AuthComponent = class _AuthComponent {
  constructor(route) {
    this.route = route;
    this.showInfoSection = signal(true);
    this.isExpanded = signal(false);
    this.appVersion = environment.VERSION;
    this.appVersionCode = environment.versionCode;
  }
  ngOnInit() {
    this.route.firstChild?.firstChild?.data.subscribe((data) => {
      this.showInfoSection.set(data.infoSection);
    });
  }
  toggleText() {
    this.isExpanded.set(!this.isExpanded());
  }
  reloadApp() {
    return __async(this, null, function* () {
      if ("caches" in window) {
        try {
          const cacheNames = yield caches.keys();
          console.log("cacheNames : ", window.caches);
          for (const cacheName of cacheNames) {
            yield caches.delete(cacheName);
          }
        } catch (error) {
          console.error("Error clearing cache:", error);
        }
      }
      window.location.reload();
    });
  }
};
_AuthComponent.\u0275fac = function AuthComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuthComponent)(\u0275\u0275directiveInject(ActivatedRoute));
};
_AuthComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthComponent, selectors: [["app-auth"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 10, vars: 3, consts: [[1, "row", "g-0", "align-items-center", "justify-content-center", "vh-100", "position-relative", "z-1", "auth-bg"], [1, "mb-5", "mt-4", "text-center"], ["height", "100px", "src", "/images/Pcm_Logo_Rgb_V_Fa_W.svg", "alt", "IPasargad"], ["ngbTooltip", "\u0628\u0647 \u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0646\u0631\u0645\u200C\u0627\u0641\u0632\u0627\u0631", 1, "text-center", "mt-4", "cursor-pointer", 3, "click"], [1, "auth-container", "col-lg-12", "col-xl-12", "mb-auto"], [1, "col-lg-24", "mt-4", "text-justify"], [1, "content", "border-dashed", "rounded", "p-4", "small"], [1, "opacity-75", "mb-0"], ["class", "opacity-75 mb-0", 4, "ngIf"], ["class", "opacity-75", 4, "ngIf"], [1, "align-items-center", "btn", "btn-link", "d-flex", "fw-bold", "me-auto", "outline-none", "p-0", "text-decoration-none", 3, "click"], [1, "border", "border-2", "border-primary", "mx-1", "d-flex", "align-items-center", "justify-content-center", "rounded", 2, "width", "20px", "height", "20px", "scale", ".8"], [1, "mx-2", 3, "icon"], [1, "footer", "border-top", "border-2", "mt-4", "p-4", "d-flex", "align-items-center", "justify-content-around", "small", "opacity-75"], [1, ""], [1, "divider", "rounded", "bg-gray-500"], [1, "cursor-pointer"], [1, "opacity-75"]], template: function AuthComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
    \u0275\u0275element(2, "img", 2);
    \u0275\u0275elementStart(3, "div", 3);
    \u0275\u0275listener("click", function AuthComponent_Template_div_click_3_listener() {
      return ctx.reloadApp();
    });
    \u0275\u0275text(4);
    \u0275\u0275template(5, AuthComponent_Conditional_5_Template, 1, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 4);
    \u0275\u0275element(7, "router-outlet")(8, "app-communication-box");
    \u0275\u0275template(9, AuthComponent_Conditional_9_Template, 23, 5, "div", 5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u0646\u0633\u062E\u0647 ", ctx.appVersion, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.appVersionCode ? 5 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx.showInfoSection() !== false ? 9 : -1);
  }
}, dependencies: [
  RouterOutlet,
  CommonModule,
  NgIf,
  FontAwesomeModule,
  FaIconComponent,
  CommunicationBoxComponent,
  NgbTooltip
], styles: ["\n\n  .auth-container {\n  max-width: 430px;\n}\n  .content {\n  position: relative;\n  overflow: hidden;\n}\n  .content div {\n  direction: rtl;\n}\n  .divider {\n  display: block;\n  width: 0.25rem;\n  height: 0.25rem;\n}\n  .auth-bg {\n  background: url(/images/auth-bg.svg) no-repeat center center fixed;\n  background-size: 1100px;\n}\n/*# sourceMappingURL=auth.component.css.map */"], changeDetection: 0 });
var AuthComponent = _AuthComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthComponent, { className: "AuthComponent" });
})();

// projects/client/src/app/auth/register/quick-sejam-step1/quick-sejam-step1.component.ts
function QuickSejamStep1Component_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275listener("click", function QuickSejamStep1Component_Conditional_8_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.generateNewCaptcha());
    });
    \u0275\u0275element(1, "img", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("width", "95px");
    \u0275\u0275advance();
    \u0275\u0275styleProp("height", "36px");
    \u0275\u0275property("src", ctx_r1.generatedCaptchaValue().captchaByteData, \u0275\u0275sanitizeUrl);
  }
}
function QuickSejamStep1Component_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "p", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("* ", ctx_r1.errMsg(), "");
  }
}
function QuickSejamStep1Component_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "button", 16);
    \u0275\u0275listener("click", function QuickSejamStep1Component_Conditional_19_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.returnToStep1());
    });
    \u0275\u0275text(2, "\u0628\u0627\u0632\u06AF\u0634\u062A");
    \u0275\u0275elementEnd()();
  }
}
var _QuickSejamStep1Component = class _QuickSejamStep1Component {
  constructor(router, identityService, fundService, toast, route, location) {
    this.router = router;
    this.identityService = identityService;
    this.fundService = fundService;
    this.toast = toast;
    this.route = route;
    this.errMsg = signal(null);
    this.submitting = signal(false);
    this.generatedCaptchaValue = signal({});
    this.submitted = false;
    this.state = { mobile: "", nationalId: "" };
    this.partyType = 1;
    this.step = "step1";
    this.state = location.getState();
    this.route.queryParams.subscribe((params) => {
      this.partyType = params["partyType"];
    });
  }
  ngOnInit() {
    this.generateNewCaptcha();
    this.formGroup = new UntypedFormGroup({
      otp: new UntypedFormControl("", [Validators.required]),
      captcha: new UntypedFormControl("", [Validators.required])
    });
  }
  submit() {
    this.submitting.set(true);
    if (this.step == "step1") {
      if (this.formGroup.get("captcha").invalid) {
        this.errMsg.set("\u0644\u0637\u0641\u0627\u064B \u0645\u0642\u0627\u062F\u06CC\u0631 \u0648\u0631\u0648\u062F\u06CC \u0631\u0627 \u0645\u062C\u062F\u062F \u0628\u0631\u0631\u0633\u06CC \u0641\u0631\u0645\u0627\u06CC\u06CC\u062F.");
        this.submitting.set(false);
        return;
      }
      const captcha = {
        hash: this.generatedCaptchaValue()?.hashedCaptcha,
        salt: this.generatedCaptchaValue()?.salt,
        value: Convert.toEnglishNumber(this.formGroup.get("captcha")?.value)
      };
      this.identityService.sendSejamOtp(captcha).subscribe((res) => {
        this.submitting.set(false);
        this.step = "step2";
      }, (err) => {
        if (this.partyType == 2 && err?.error?.code == -1e3) {
          const message = "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0633\u062C\u0627\u0645 \u062F\u0631\u06CC\u0627\u0641\u062A \u0646\u0634\u062F. \u0644\u0637\u0641\u0627 \u0646\u0633\u0628\u062A \u0628\u0647 \u062B\u0628\u062A \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0634\u0631\u06A9\u062A \u062F\u0631 \u0633\u062C\u0627\u0645 \u0627\u0642\u062F\u0627\u0645 \u0641\u0631\u0645\u0627\u06CC\u06CC\u062F";
          this.toast.show(message, { classname: "bg-danger text-light", delay: 3e4 });
        }
        this.submitting.set(false);
        this.step = "step1";
        this.generateNewCaptcha();
      });
    } else {
      this.identityService.saveSejamProfile({ otp: this.formGroup.get("otp").value }).pipe(switchMap(() => {
        return this.fundService.saveCustomer();
      })).subscribe((customerData) => {
        this.submitting.set(false);
        const message = "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0633\u062C\u0627\u0645 \u0634\u0645\u0627 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u0628\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F";
        if (customerData.result.personalInfo.partyType == 2) {
          this.router.navigate(["/auth/reg/step4-legal"]);
        } else {
          this.router.navigate(["/auth/reg/step4"]);
        }
      }, (err) => {
        this.step = "step2";
        this.submitting.set(false);
      });
    }
  }
  generateNewCaptcha() {
    this.identityService.getCaptcha().subscribe((result) => {
      this.generatedCaptchaValue.set(__spreadProps(__spreadValues({}, result.result), {
        captchaByteData: "data:image/jpg;base64," + result.result["captchaByteData"]
      }));
    });
  }
  openPanel() {
    window.location.href = "/dashboard";
  }
  returnToStep1() {
    this.step = "step1";
    this.generateNewCaptcha();
    this.formGroup.get("otp")?.setValue("");
    this.formGroup.get("captcha")?.setValue("");
  }
};
_QuickSejamStep1Component.\u0275fac = function QuickSejamStep1Component_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _QuickSejamStep1Component)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(IdentityService), \u0275\u0275directiveInject(FundService), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Location));
};
_QuickSejamStep1Component.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _QuickSejamStep1Component, selectors: [["app-quick-sejam-step1"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 20, vars: 11, consts: [["dir", "rtl", 3, "ngSubmit", "formGroup"], [1, "card", "overflow-hidden"], [1, "card-body", "px-5"], ["for", "", 1, "form-text", "text-muted", "small"], [1, "input-group", "mb-3"], ["pattern", "[0-9]*", "inputmode", "decimal", "type", "text", "maxlength", "4", "minlength", "4", "formControlName", "captcha", "placeholder", "\u06A9\u062F \u06A9\u067E\u0686\u0627", 1, "form-control"], [1, "input-group-text", "p-0", "captcha", 3, "width"], [1, "form-group"], ["id", "otp", "type", "text", "formControlName", "otp", "pattern", "[0-9]*", "mask", "9*", "inputmode", "decimal", "maxlength", "5", "minlength", "5", 1, "form-control"], [1, "my-4"], [1, "d-flex", "flex", "mb-4"], ["type", "button", 1, "w-50", "btn", "btn-gray-150", "m-2", "text-black", 3, "click"], ["cssClass", "btn btn-primary", 1, "w-50", "my-2", 3, "isLoading", "disabled", "type"], [1, "input-group-text", "p-0", "captcha", 3, "click"], [1, "img-fluid", 3, "src"], [1, "text-danger", "text-center", "mb-0"], ["type", "button", 1, "w-100", "btn", "btn-gray-250", "m-2", "text-black", 3, "click"]], template: function QuickSejamStep1Component_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "form", 0);
    \u0275\u0275listener("ngSubmit", function QuickSejamStep1Component_Template_form_ngSubmit_0_listener() {
      return ctx.submit();
    });
    \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "div")(4, "label", 3);
    \u0275\u0275text(5, " \u0628\u0631\u0627\u06CC \u062F\u0631\u06CC\u0627\u0641\u062A \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0634\u0645\u0627 \u0627\u0632 \u0633\u0627\u0645\u0627\u0646\u0647 \u0633\u062C\u0627\u0645 \u0644\u0637\u0641\u0627 \u0645\u0642\u062F\u0627\u0631 \u0632\u06CC\u0631 \u0631\u0627 \u0648\u0627\u0631\u062F \u0646\u0645\u0627\u06CC\u06CC\u062F ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 4);
    \u0275\u0275element(7, "input", 5);
    \u0275\u0275template(8, QuickSejamStep1Component_Conditional_8_Template, 2, 5, "span", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 7)(10, "label", 3);
    \u0275\u0275text(11, " \u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F \u0628\u0647 \u0634\u0645\u0627\u0631\u0647 \u062B\u0628\u062A \u0634\u062F\u0647 \u062F\u0631 \u0633\u062C\u0627\u0645 \u0627\u0631\u0633\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, QuickSejamStep1Component_Conditional_13_Template, 3, 1, "div", 9);
    \u0275\u0275elementStart(14, "div", 10)(15, "button", 11);
    \u0275\u0275listener("click", function QuickSejamStep1Component_Template_button_click_15_listener() {
      return ctx.openPanel();
    });
    \u0275\u0275text(16, "\u0648\u0631\u0648\u062F \u0628\u0647 \u067E\u0646\u0644 \u06A9\u0627\u0631\u0628\u0631\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "app-loading-button", 12);
    \u0275\u0275text(18, " \u062F\u0631\u06CC\u0627\u0641\u062A \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0633\u062C\u0627\u0645 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(19, QuickSejamStep1Component_Conditional_19_Template, 3, 0, "div");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275property("formGroup", ctx.formGroup);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("display", ctx.step == "step1" ? "block" : "none");
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx.generatedCaptchaValue() ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275styleProp("display", ctx.step == "step2" ? "block" : "none");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx.errMsg() ? 13 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("isLoading", ctx.submitting())("disabled", ctx.submitting())("type", "submit");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.step == "step2" ? 19 : -1);
  }
}, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, MinLengthValidator, MaxLengthValidator, PatternValidator, FormGroupDirective, FormControlName, FontAwesomeModule, SharedModule, LoadingButtonComponent], styles: ['/* projects/client/src/app/auth/register/quick-sejam-step1/quick-sejam-step1.component.scss */\n.bg-auth {\n  background: #eee url("./media/signup-bg.svg");\n  background-size: cover;\n  background-position: bottom;\n}\n/*# sourceMappingURL=quick-sejam-step1.component.css.map */\n'], encapsulation: 2, changeDetection: 0 });
var QuickSejamStep1Component = _QuickSejamStep1Component;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(QuickSejamStep1Component, { className: "QuickSejamStep1Component" });
})();

// projects/client/src/app/auth/forget-password/forget-password.component.ts
var _c04 = (a0) => ({ "is-invalid": a0 });
function ForgetPasswordComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0648 \u062A\u06A9\u0631\u0627\u0631 \u0622\u0646 \u06CC\u06A9\u0633\u0627\u0646 \u0646\u06CC\u0633\u062A");
    \u0275\u0275elementEnd();
  }
}
function ForgetPasswordComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u0644\u0637\u0641\u0627 \u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0631\u0627 \u0648\u0627\u0631\u062F \u0646\u0645\u0627\u06CC\u06CC\u062F");
    \u0275\u0275elementEnd();
  }
}
function ForgetPasswordComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275listener("click", function ForgetPasswordComponent_Conditional_39_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.generateNewCaptcha());
    });
    \u0275\u0275element(1, "fa-icon", 30)(2, "img", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("height", "30px");
    \u0275\u0275property("src", ctx_r2.generatedCaptchaValue().captchaByteData, \u0275\u0275sanitizeUrl);
  }
}
function ForgetPasswordComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "p", 32);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("* ", ctx_r2.errorMessage(), "");
  }
}
function ForgetPasswordComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0627\u0631\u0633\u0627\u0644 \u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F ");
  }
}
function ForgetPasswordComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631 ");
  }
}
var _ForgetPasswordComponent = class _ForgetPasswordComponent {
  constructor(router, identityService, element, toast) {
    this.router = router;
    this.identityService = identityService;
    this.element = element;
    this.toast = toast;
    this.generatedCaptchaValue = signal({});
    this.errorMessage = signal(null);
    this.submitting = signal(false);
    this.step = signal("step1");
    this.isPasswordVisible = false;
    this.mainObj = {};
    this.abortController = null;
    this.passwordMatchValidator = (form) => {
      if (form.get("newPassword")?.value !== form.get("confirmPassword")?.value) {
        return { passwordMismatch: true };
      }
      return null;
    };
    this.nationalId = this.router.getCurrentNavigation()?.extras?.state?.nationalId;
  }
  get isBtnDisabled() {
    if (this.step() === "step1") {
      return this.formGroup.controls.nationalId.invalid || this.formGroup.controls.captcha.invalid;
    } else {
      return this.formGroup.controls.newPassword.invalid || this.formGroup.controls.confirmPassword.invalid || this.formGroup.controls.otp.invalid || this.formGroup.controls.captcha.invalid || this.formGroup.errors?.["passwordMismatch"];
    }
  }
  ngAfterViewInit() {
    this.autoFillOtpFromSMS();
  }
  ngOnInit() {
    this.generateNewCaptcha();
    this.formGroup = new UntypedFormGroup({
      nationalId: new UntypedFormControl(this.nationalId, [Validators.required]),
      newPassword: new UntypedFormControl("", [Validators.required]),
      confirmPassword: new UntypedFormControl("", [Validators.required]),
      otp: new UntypedFormControl("", [Validators.required]),
      captcha: new UntypedFormControl("", [Validators.required])
    }, this.passwordMatchValidator);
  }
  forgetPassword() {
    this.identityService.forgetPassword({
      nationalId: Convert.toEnglishNumber2(this.formGroup.get("nationalId")?.value),
      captcha: {
        hash: this.generatedCaptchaValue().hashedCaptcha,
        salt: this.generatedCaptchaValue().salt,
        value: Convert.toEnglishNumber2(this.formGroup.get("captcha")?.value)
      }
    }).subscribe({
      next: (res) => {
        this.submitting.set(false);
        if (res["isSuccess"] === false) {
          this.errorMessage.set(res.result.errorMessage);
          this.generateNewCaptcha();
          throw new Error(res.result.errorMessage);
        }
        this.step.set("step2");
        this.formGroup.get("captcha").setValue("");
        setTimeout(() => {
          const input = this.element.nativeElement.querySelector("#newPassword");
          if (input) {
            input.focus();
          }
        });
        this.generateNewCaptcha();
      },
      error: () => {
        this.submitting.set(false);
      }
    });
  }
  submit() {
    this.submitting.set(true);
    if (this.step() === "step1") {
      this.forgetPassword();
      return;
    }
    if (this.formGroup.get("newPassword")?.errors?.strongPassword == false) {
      this.errorMessage.set("\u0644\u0637\u0641\u0627\u064B \u0631\u0645\u0632\u0639\u0628\u0648\u0631 \u067E\u06CC\u0686\u06CC\u062F\u0647\u200C\u062A\u0631\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u0645\u0627\u06CC\u06CC\u062F.");
      throw new Error("form invalid!");
    }
    if (this.formGroup.invalid || this.formGroup.invalid) {
      this.errorMessage.set("\u0644\u0637\u0641\u0627\u064B \u0645\u0642\u0627\u062F\u06CC\u0631 \u0648\u0631\u0648\u062F\u06CC \u0631\u0627 \u0645\u062C\u062F\u062F \u0628\u0631\u0631\u0633\u06CC \u0641\u0631\u0645\u0627\u06CC\u06CC\u062F.");
      throw new Error("form invalid!");
    }
    const requestModel = __spreadProps(__spreadValues({}, this.formGroup.getRawValue()), {
      captcha: {
        hash: this.generatedCaptchaValue().hashedCaptcha,
        salt: this.generatedCaptchaValue().salt,
        value: Convert.toEnglishNumber2(this.formGroup.get("captcha")?.value)
      }
    });
    this.identityService.changePasswordWithOtp(requestModel).subscribe({
      next: (res) => {
        this.submitting.set(false);
        if (!!res && res.result.isSuccess === false) {
          this.errorMessage.set(res.result?.errorMessage);
          throw new Error(res.result?.errorMessage);
        }
        this.toast.show("\u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F", {
          classname: "bg-success text-light"
        });
        this.router.navigate(["/auth/login"]);
      },
      error: (err) => {
        this.submitting.set(false);
        if (err) {
          this.errorMessage.set(err?.error?.errorMessage);
          this.generateNewCaptcha();
        }
      }
    });
  }
  generateNewCaptcha() {
    this.identityService.getCaptcha().subscribe((result) => {
      this.generatedCaptchaValue.set(__spreadProps(__spreadValues({}, result.result), {
        captchaByteData: "data:image/jpg;base64," + result.result["captchaByteData"]
      }));
    });
  }
  preStep() {
    this.step.set("step1");
    this.errorMessage.set(null);
  }
  autoFillOtpFromSMS() {
    if ("OTPCredential" in window) {
      this.mainObj.isWebOtpSupported = true;
      const input = document.querySelector('input[autocomplete="one-time-code"]');
      if (!input)
        return;
      this.abortController = new AbortController();
      var reqObj = {
        otp: { transport: ["sms"] },
        signal: this.abortController.signal
      };
      navigator.credentials.get(reqObj).then((otp) => {
        if (otp) {
          if (otp && otp.code) {
            this.formGroup.get("otp").setValue(otp.code);
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    } else {
      this.mainObj.isWebOtpSupported = false;
      console.log("Web OTP API not supported, Please enter manually.");
    }
  }
  ngOnDestroy() {
    if (this.abortController) {
      this.abortController.abort("on destroy");
    }
  }
};
_ForgetPasswordComponent.\u0275fac = function ForgetPasswordComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ForgetPasswordComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(IdentityService), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ToastService));
};
_ForgetPasswordComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ForgetPasswordComponent, selectors: [["app-forget-password"]], standalone: true, features: [\u0275\u0275ProvidersFeature([provideNgxMask()]), \u0275\u0275StandaloneFeature], decls: 49, vars: 29, consts: [["password", ""], ["confirmPassword", ""], ["dir", "rtl", 3, "ngSubmit", "formGroup"], [1, "card", "overflow-hidden"], [1, "card-body", "px-5"], [1, "mb-3", "mt-2"], [1, "form-group", "my-4"], ["for", "nationalId", 1, "form-label"], ["pattern", "[0-9]*", "mask", "9*", "inputmode", "decimal", "id", "nationalId", "type", "text", "formControlName", "nationalId", 1, "form-control", "ltr", "text-end", 3, "ngClass"], [1, "small", "text-danger", "me-2", "mt-1", "invalid-feedback"], [1, "mb-5", "mt-2", "cursor-pointer", "d-flex", 3, "click"], ["icon", "angle-right", 1, "ms-2"], ["for", "newPassword"], ["id", "newPassword", "formControlName", "newPassword", 3, "showPasswordObligations"], [1, "form-group", "mb-3"], ["for", "confirmPassword", 1, "mb-0"], [1, "input-group", 3, "ngClass"], ["id", "confirmPassword", "formControlName", "confirmPassword", "required", "", 3, "isInvalid"], [1, "form-group", "mb-4"], ["for", "otp", 1, "form-label"], ["pattern", "[0-9]*", "mask", "9*", "inputmode", "decimal", "name", "otp", "type", "text", "id", "otp", "formControlName", "otp", "required", "", 1, "form-control", "ltr", "text-end", 3, "ngClass"], [1, "form-group", "mb-5"], ["for", "captcha", 1, "form-label"], ["pattern", "[0-9]*", "mask", "9*", "inputmode", "decimal", "type", "text", "maxlength", "4", "minlength", "4", "formControlName", "captcha", "id", "captcha", "required", "", 1, "form-control", "ltr", "text-end", 3, "ngClass"], [1, "input-group-text", "p-0", "captcha"], [1, "my-4"], [1, "card-footer", "d-flex"], ["routerLink", "/auth/login", 1, "flex-fill", "btn", "btn-gray-150", "m-2", "fw-semibold"], ["cssClass", "btn btn-primary", 1, "w-100", "m-2", 3, "isLoading", "disabled", "type"], [1, "input-group-text", "p-0", "captcha", 3, "click"], ["icon", "sync", 1, "mx-2"], [1, "img-fluid", "ms-2", 3, "src"], [1, "text-danger", "text-center", "mb-0"]], template: function ForgetPasswordComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 2);
    \u0275\u0275listener("ngSubmit", function ForgetPasswordComponent_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.submit());
    });
    \u0275\u0275elementStart(1, "div", 3)(2, "div", 4)(3, "div", 5)(4, "div", 6)(5, "label", 7);
    \u0275\u0275text(6, "\u06A9\u062F \u0645\u0644\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "input", 8);
    \u0275\u0275elementStart(8, "div", 9);
    \u0275\u0275text(9, "\u0644\u0637\u0641\u0627 \u06A9\u062F \u0645\u0644\u06CC \u0631\u0627 \u0648\u0627\u0631\u062F \u0646\u0645\u0627\u06CC\u06CC\u062F");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div")(11, "div", 10);
    \u0275\u0275listener("click", function ForgetPasswordComponent_Template_div_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.preStep());
    });
    \u0275\u0275element(12, "fa-icon", 11);
    \u0275\u0275text(13, "\u0627\u0635\u0644\u0627\u062D \u06A9\u062F \u0645\u0644\u06CC ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 6)(15, "label", 12);
    \u0275\u0275text(16, "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "app-password", 13, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 14)(20, "label", 15);
    \u0275\u0275text(21, "\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 16);
    \u0275\u0275element(23, "app-password", 17, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 9);
    \u0275\u0275template(26, ForgetPasswordComponent_Conditional_26_Template, 2, 0, "span")(27, ForgetPasswordComponent_Conditional_27_Template, 2, 0, "span");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 18)(29, "label", 19);
    \u0275\u0275text(30, "\u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "input", 20);
    \u0275\u0275elementStart(32, "div", 9);
    \u0275\u0275text(33, "\u0644\u0637\u0641\u0627 \u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u0646\u0645\u0627\u06CC\u06CC\u062F");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 21)(35, "label", 22);
    \u0275\u0275text(36, "\u06A9\u062F \u0627\u0645\u0646\u06CC\u062A\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 16);
    \u0275\u0275element(38, "input", 23);
    \u0275\u0275template(39, ForgetPasswordComponent_Conditional_39_Template, 3, 3, "span", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 9);
    \u0275\u0275text(41, "\u0644\u0637\u0641\u0627 \u06A9\u062F \u0627\u0645\u0646\u06CC\u062A\u06CC \u0631\u0627 \u0648\u0627\u0631\u062F \u0646\u0645\u0627\u06CC\u06CC\u062F");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(42, ForgetPasswordComponent_Conditional_42_Template, 3, 1, "div", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 26)(44, "a", 27);
    \u0275\u0275text(45, " \u0648\u0631\u0648\u062F ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "app-loading-button", 28);
    \u0275\u0275template(47, ForgetPasswordComponent_Conditional_47_Template, 1, 0)(48, ForgetPasswordComponent_Conditional_48_Template, 1, 0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275property("formGroup", ctx.formGroup);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("display", ctx.step() == "step1" ? "block" : "none");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(19, _c04, !ctx.formGroup.controls.nationalId.pristine && ctx.formGroup.controls.nationalId.touched && !ctx.formGroup.controls.nationalId.valid));
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("display", ctx.step() == "step2" ? "block" : "none");
    \u0275\u0275advance(7);
    \u0275\u0275property("showPasswordObligations", true);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(21, _c04, !ctx.formGroup.controls.confirmPassword.pristine && ctx.formGroup.controls.confirmPassword.touched && (!ctx.formGroup.controls.confirmPassword.valid || (ctx.formGroup.errors == null ? null : ctx.formGroup.errors["passwordMismatch"]))));
    \u0275\u0275advance();
    \u0275\u0275property("isInvalid", !ctx.formGroup.controls.confirmPassword.pristine && ctx.formGroup.controls.confirmPassword.touched && (!ctx.formGroup.controls.confirmPassword.valid || (ctx.formGroup.errors == null ? null : ctx.formGroup.errors["passwordMismatch"])));
    \u0275\u0275advance(3);
    \u0275\u0275conditional((ctx.formGroup.errors == null ? null : ctx.formGroup.errors["passwordMismatch"]) ? 26 : 27);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(23, _c04, !ctx.formGroup.controls.otp.pristine && ctx.formGroup.controls.otp.touched && !ctx.formGroup.controls.otp.valid));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(25, _c04, !ctx.formGroup.controls.captcha.pristine && ctx.formGroup.controls.captcha.touched && !ctx.formGroup.controls.captcha.valid));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(27, _c04, !ctx.formGroup.controls.captcha.pristine && ctx.formGroup.controls.captcha.touched && !ctx.formGroup.controls.captcha.valid));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.generatedCaptchaValue() ? 39 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.errorMessage() ? 42 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("isLoading", ctx.submitting())("disabled", ctx.isBtnDisabled)("type", "submit");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.step() === "step1" ? 47 : 48);
  }
}, dependencies: [SharedModule, LoadingButtonComponent, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, FormGroupDirective, FormControlName, FontAwesomeModule, FaIconComponent, RouterLink, PasswordComponent, NgxMaskDirective, NgClass], styles: ["/* projects/client/src/app/auth/forget-password/forget-password.component.scss */\n.bg-login {\n  height: 100vh;\n}\n/*# sourceMappingURL=forget-password.component.css.map */\n"], encapsulation: 2, changeDetection: 0 });
var ForgetPasswordComponent = _ForgetPasswordComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ForgetPasswordComponent, { className: "ForgetPasswordComponent" });
})();

// projects/client/src/app/auth/register/quick-sejam-step2/quick-sejam-step2.component.ts
var _QuickSejamStep2Component = class _QuickSejamStep2Component {
  constructor(profileManagementService, router) {
    this.profileManagementService = profileManagementService;
    this.router = router;
    this.customerInfo = signal(null);
  }
  ngOnInit() {
    this.profileManagementService.getCustomerInfo().subscribe((customer) => {
      this.customerInfo.set(customer);
    });
  }
  finalizeSejamStatus() {
    localStorage.setItem("step", "100");
    this.router.navigate(["/dashboard"]);
  }
};
_QuickSejamStep2Component.\u0275fac = function QuickSejamStep2Component_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _QuickSejamStep2Component)(\u0275\u0275directiveInject(ProfileManagementService), \u0275\u0275directiveInject(Router));
};
_QuickSejamStep2Component.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _QuickSejamStep2Component, selectors: [["app-quick-sejam-step2"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 110, vars: 20, consts: [[1, "row", "g-0", "align-items-center", "justify-content-center", "vh-100"], [1, "col-lg-12", "col-xl-12", "overflow-hidden"], [1, "card"], [1, "card-body", "row", "px-4"], ["height", "100px", "src", "/images/Pcm_Logo_Rgb_V_Fa_W.svg", "alt", "IPasargad", 1, "mb-3"], [1, "card-header", "mb-4", "p-3"], [1, "mb-0"], [1, "vh-50", "overflow-auto", "p-2"], [1, "row"], [1, "col-lg-12", "mb-3"], [1, "mb-2"], [1, "py-3", "px-2", "bg-gray-150", "custom-radius"], [1, "col-lg-12"], [1, "row", "align-items-end"], [1, "col-lg-24", "mb-3"], [1, "w-100", "text-start"], [1, "btn", "btn-success", "mt-5", "px-5", 3, "click"]], template: function QuickSejamStep2Component_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
    \u0275\u0275element(4, "img", 4);
    \u0275\u0275elementStart(5, "div", 5)(6, "h3", 6);
    \u0275\u0275text(7, "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0633\u062C\u0627\u0645");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 7)(9, "div", 8)(10, "div", 9)(11, "label", 10);
    \u0275\u0275text(12, "\u0646\u0627\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 11);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 9)(16, "label", 10);
    \u0275\u0275text(17, "\u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 11);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 9)(21, "label", 10);
    \u0275\u0275text(22, "\u0646\u0627\u0645 \u067E\u062F\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 11);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 9)(26, "label", 10);
    \u0275\u0275text(27, "\u062C\u0646\u0633\u06CC\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 11);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 9)(31, "label", 10);
    \u0275\u0275text(32, "\u06A9\u062F \u0645\u0644\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 11);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 12)(36, "div", 13)(37, "div", 9)(38, "label", 10);
    \u0275\u0275text(39, "\u0633\u0631\u06CC \u0634\u0646\u0627\u0633\u0646\u0627\u0645\u0647");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 11);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 9)(43, "div", 11);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(45, "div", 9)(46, "label", 10);
    \u0275\u0275text(47, "\u062A\u0627\u0631\u06CC\u062E \u062A\u0648\u0644\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 11);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 9)(51, "label", 10);
    \u0275\u0275text(52, "\u0645\u062D\u0644 \u062A\u0648\u0644\u062F/ \u0645\u062D\u0644 \u0635\u062F\u0648\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "div", 11);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(55, "div", 8)(56, "div", 9)(57, "label", 10);
    \u0275\u0275text(58, "\u062A\u0644\u0641\u0646 \u0647\u0645\u0631\u0627\u0647");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 11);
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 9)(62, "label", 10);
    \u0275\u0275text(63, "\u062A\u0644\u0641\u0646 \u062B\u0627\u0628\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "div", 11);
    \u0275\u0275text(65);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "div", 9)(67, "label", 10);
    \u0275\u0275text(68, "\u06A9\u062F\u067E\u0633\u062A\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "div", 11);
    \u0275\u0275text(70);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "div", 9)(72, "label", 10);
    \u0275\u0275text(73, "\u0627\u06CC\u0645\u06CC\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "div", 11);
    \u0275\u0275text(75);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div", 14)(77, "label", 10);
    \u0275\u0275text(78, "\u0622\u062F\u0631\u0633");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "div", 11);
    \u0275\u0275text(80);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(81, "div", 8)(82, "div", 9)(83, "label", 10);
    \u0275\u0275text(84, "\u0628\u0627\u0646\u06A9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "div", 11);
    \u0275\u0275text(86);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(87, "div", 9)(88, "label", 10);
    \u0275\u0275text(89, "\u0634\u0639\u0628\u0647");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "div", 11);
    \u0275\u0275text(91);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(92, "div", 9)(93, "label", 10);
    \u0275\u0275text(94, "\u06A9\u062F \u0634\u0639\u0628\u0647");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "div", 11);
    \u0275\u0275text(96);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(97, "div", 9)(98, "label", 10);
    \u0275\u0275text(99, "\u0634\u0645\u0627\u0631\u0647 \u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(100, "div", 11);
    \u0275\u0275text(101);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(102, "div", 9)(103, "label", 10);
    \u0275\u0275text(104, "\u0634\u0645\u0627\u0631\u0647 \u0634\u0628\u0627");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(105, "div", 11);
    \u0275\u0275text(106);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(107, "div", 15)(108, "a", 16);
    \u0275\u0275listener("click", function QuickSejamStep2Component_Template_a_click_108_listener() {
      return ctx.finalizeSejamStatus();
    });
    \u0275\u0275text(109, "\u062A\u0627\u06CC\u06CC\u062F \u0627\u0637\u0644\u0627\u0639\u0627\u062A");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    let tmp_0_0;
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    let tmp_12_0;
    let tmp_13_0;
    let tmp_14_0;
    let tmp_15_0;
    let tmp_16_0;
    let tmp_17_0;
    let tmp_18_0;
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1(" ", (tmp_0_0 = ctx.customerInfo()) == null ? null : tmp_0_0.personalInfo == null ? null : tmp_0_0.personalInfo.firstName, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_1_0 = ctx.customerInfo()) == null ? null : tmp_1_0.personalInfo == null ? null : tmp_1_0.personalInfo.lastName, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_2_0 = ctx.customerInfo()) == null ? null : tmp_2_0.personalInfo == null ? null : tmp_2_0.personalInfo.fatherName, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_3_0 = ctx.customerInfo()) == null ? null : tmp_3_0.personalInfo == null ? null : tmp_3_0.personalInfo.genderTitle, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_4_0 = ctx.customerInfo()) == null ? null : tmp_4_0.personalInfo == null ? null : tmp_4_0.personalInfo.nationalId, " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", (tmp_5_0 = ctx.customerInfo()) == null ? null : tmp_5_0.personalInfo == null ? null : tmp_5_0.personalInfo.identitySerialLongNumber, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (tmp_6_0 = ctx.customerInfo()) == null ? null : tmp_6_0.personalInfo == null ? null : tmp_6_0.personalInfo.identitySerialShortNumber, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_7_0 = ctx.customerInfo()) == null ? null : tmp_7_0.personalInfo == null ? null : tmp_7_0.personalInfo.birthDateJalali, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" ", (tmp_8_0 = ctx.customerInfo()) == null ? null : tmp_8_0.personalInfo == null ? null : tmp_8_0.personalInfo.birthPlace, "/", (tmp_8_0 = ctx.customerInfo()) == null ? null : tmp_8_0.personalInfo == null ? null : tmp_8_0.personalInfo.issuePlace, " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", (tmp_9_0 = ctx.customerInfo()) == null ? null : tmp_9_0.contactInfo == null ? null : tmp_9_0.contactInfo.phone, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_10_0 = ctx.customerInfo()) == null ? null : tmp_10_0.contactInfo == null ? null : tmp_10_0.contactInfo.mobile, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_11_0 = ctx.customerInfo()) == null ? null : tmp_11_0.contactInfo == null ? null : tmp_11_0.contactInfo.postalCode, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_12_0 = ctx.customerInfo()) == null ? null : tmp_12_0.contactInfo == null ? null : tmp_12_0.contactInfo.email, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_13_0 = ctx.customerInfo()) == null ? null : tmp_13_0.contactInfo == null ? null : tmp_13_0.contactInfo.address, " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", (tmp_14_0 = ctx.customerInfo()) == null ? null : tmp_14_0.bankAccounts[0] == null ? null : tmp_14_0.bankAccounts[0].bankTitle, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_15_0 = ctx.customerInfo()) == null ? null : tmp_15_0.bankAccounts[0] == null ? null : tmp_15_0.bankAccounts[0].branchName, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_16_0 = ctx.customerInfo()) == null ? null : tmp_16_0.bankAccounts[0] == null ? null : tmp_16_0.bankAccounts[0].branchCode, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_17_0 = ctx.customerInfo()) == null ? null : tmp_17_0.bankAccounts[0] == null ? null : tmp_17_0.bankAccounts[0].accountNumber, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_18_0 = ctx.customerInfo()) == null ? null : tmp_18_0.bankAccounts[0] == null ? null : tmp_18_0.bankAccounts[0].iban, " ");
  }
}, dependencies: [FontAwesomeModule], styles: ['/* projects/client/src/app/auth/register/quick-sejam-step2/quick-sejam-step2.component.scss */\n.bg-auth {\n  background: #eee url("./media/signup-bg.svg");\n  background-size: cover;\n  background-position: bottom;\n}\n.vh-50 {\n  height: 50vh;\n}\n::ng-deep .content {\n  position: relative;\n  direction: ltr;\n  overflow: auto;\n  height: 50%;\n  max-height: 300px;\n  -webkit-mask-image:\n    linear-gradient(\n      to bottom,\n      black 50%,\n      transparent 100%);\n  mask-image:\n    linear-gradient(\n      to bottom,\n      black 50%,\n      transparent 100%);\n  overflow-y: scroll;\n}\n::ng-deep .content div {\n  direction: rtl;\n}\n/*# sourceMappingURL=quick-sejam-step2.component.css.map */\n'], encapsulation: 2, changeDetection: 0 });
var QuickSejamStep2Component = _QuickSejamStep2Component;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(QuickSejamStep2Component, { className: "QuickSejamStep2Component" });
})();

// projects/client/src/app/auth/register/register-legal-form/register-legal-form.component.ts
function RegisterLegalFormComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0646\u0627\u0645 \u0634\u0631\u06A9\u062A \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0634\u0646\u0627\u0633\u0647 \u0645\u0644\u06CC \u0645\u0639\u062A\u0628\u0631 \u0646\u06CC\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0634\u0645\u0627\u0631\u0647 \u062B\u0628\u062A \u0645\u0639\u062A\u0628\u0631 \u0646\u06CC\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_option_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const province_r2 = ctx.$implicit;
    \u0275\u0275property("value", province_r2.codeId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(province_r2.title);
  }
}
function RegisterLegalFormComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0627\u0633\u062A\u0627\u0646 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_option_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const city_r3 = ctx.$implicit;
    \u0275\u0275property("value", city_r3.codeId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(city_r3.title);
  }
}
function RegisterLegalFormComponent_div_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0634\u0647\u0631 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u06A9\u062F \u0627\u0642\u062A\u0635\u0627\u062F\u06CC \u0645\u0639\u062A\u0628\u0631 \u0646\u06CC\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0645\u0648\u0628\u0627\u06CC\u0644 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u062A\u0644\u0641\u0646 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u067E\u0633\u062A \u0627\u0644\u06A9\u062A\u0631\u0648\u0646\u06CC\u06CC\u06A9\u06CC \u0645\u0639\u062A\u0628\u0631 \u0646\u06CC\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u06A9\u062F \u067E\u0633\u062A\u06CC \u0645\u0639\u062A\u0628\u0631 \u0646\u06CC\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_option_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const province_r5 = ctx.$implicit;
    \u0275\u0275property("value", province_r5.codeId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(province_r5.title);
  }
}
function RegisterLegalFormComponent_div_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0627\u0633\u062A\u0627\u0646 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_option_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const city_r6 = ctx.$implicit;
    \u0275\u0275property("value", city_r6.codeId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(city_r6.title);
  }
}
function RegisterLegalFormComponent_div_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0634\u0647\u0631 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0622\u062F\u0631\u0633 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_115_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0646\u0627\u0645 \u0645\u062F\u06CC\u0631\u0639\u0627\u0645\u0644 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_121_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC \u0645\u062F\u06CC\u0631\u0639\u0627\u0645\u0644 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_127_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u06A9\u062F \u0645\u0644\u06CC \u0645\u062F\u06CC\u0631\u0639\u0627\u0645\u0644 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_138_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0646\u0627\u0645 \u0646\u0645\u0627\u06CC\u0646\u062F\u0647 \u0634\u0631\u06A9\u062A \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_144_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC \u0646\u0645\u0627\u06CC\u0646\u062F\u0647 \u0634\u0631\u06A9\u062A \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_150_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u06A9\u062F \u0645\u0644\u06CC \u0646\u0645\u0627\u06CC\u0646\u062F\u0647 \u0634\u0631\u06A9\u062A \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_158_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0634\u0645\u0627\u0631\u0647 \u062D\u0633\u0627\u0628 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_158_option_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const accountType_r8 = ctx.$implicit;
    \u0275\u0275property("value", accountType_r8.code);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(accountType_r8.title);
  }
}
function RegisterLegalFormComponent_div_158_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0646\u0648\u0639 \u062D\u0633\u0627\u0628 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_158_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0634\u0645\u0627\u0631\u0647 \u0634\u0628\u0627 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_158_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u06A9\u062F \u0634\u0639\u0628\u0647 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_158_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0646\u0627\u0645 \u0634\u0639\u0628\u0647 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_158_option_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const bank_r9 = ctx.$implicit;
    \u0275\u0275property("value", bank_r9.codeId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(bank_r9.title);
  }
}
function RegisterLegalFormComponent_div_158_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 76);
    \u0275\u0275text(2, "\u0628\u0627\u0646\u06A9 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A.");
    \u0275\u0275elementEnd()();
  }
}
function RegisterLegalFormComponent_div_158_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 78)(1, "div", 49)(2, "div", 12)(3, "div", 13)(4, "label", 79);
    \u0275\u0275text(5, "\u0634\u0645\u0627\u0631\u0647 \u062D\u0633\u0627\u0628:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "input", 80);
    \u0275\u0275template(7, RegisterLegalFormComponent_div_158_div_7_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 12)(9, "div", 13)(10, "label", 79);
    \u0275\u0275text(11, "\u0646\u0648\u0639 \u062D\u0633\u0627\u0628:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "select", 81);
    \u0275\u0275template(13, RegisterLegalFormComponent_div_158_option_13_Template, 2, 2, "option", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, RegisterLegalFormComponent_div_158_div_14_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 12)(16, "div", 13)(17, "label", 79);
    \u0275\u0275text(18, "\u0634\u0645\u0627\u0631\u0647 \u0634\u0628\u0627:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "input", 82);
    \u0275\u0275template(20, RegisterLegalFormComponent_div_158_div_20_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 12)(22, "div", 13)(23, "label", 79);
    \u0275\u0275text(24, "\u06A9\u062F \u0634\u0639\u0628\u0647:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "input", 83);
    \u0275\u0275template(26, RegisterLegalFormComponent_div_158_div_26_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 12)(28, "div", 13)(29, "label", 79);
    \u0275\u0275text(30, "\u0646\u0627\u0645 \u0634\u0639\u0628\u0647:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "input", 84);
    \u0275\u0275template(32, RegisterLegalFormComponent_div_158_div_32_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 12)(34, "div", 13)(35, "label", 79);
    \u0275\u0275text(36, "\u0628\u0627\u0646\u06A9:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "select", 85);
    \u0275\u0275template(38, RegisterLegalFormComponent_div_158_option_38_Template, 2, 2, "option", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275template(39, RegisterLegalFormComponent_div_158_div_39_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 12)(41, "div", 13)(42, "label", 79);
    \u0275\u0275text(43, "\u062D\u0633\u0627\u0628 \u067E\u06CC\u0634 \u0641\u0631\u0636:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "input", 86);
    \u0275\u0275listener("change", function RegisterLegalFormComponent_div_158_Template_input_change_44_listener() {
      const i_r10 = \u0275\u0275restoreView(_r7).index;
      const ctx_r10 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r10.onDefaultChange(i_r10));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "div", 87)(46, "button", 88);
    \u0275\u0275listener("click", function RegisterLegalFormComponent_div_158_Template_button_click_46_listener() {
      const i_r10 = \u0275\u0275restoreView(_r7).index;
      const ctx_r10 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r10.removeBankAccount(i_r10));
    });
    \u0275\u0275text(47, "\u062D\u0630\u0641 \u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const bankAccount_r12 = ctx.$implicit;
    const i_r10 = ctx.index;
    const ctx_r10 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroupName", i_r10);
    \u0275\u0275advance(4);
    \u0275\u0275propertyInterpolate1("for", "accountNumber-", i_r10, "");
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate1("id", "accountNumber-", i_r10, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", bankAccount_r12.get("accountNumber").invalid && (bankAccount_r12.get("accountNumber").dirty || bankAccount_r12.get("accountNumber").touched));
    \u0275\u0275advance(3);
    \u0275\u0275propertyInterpolate1("for", "accountType-", i_r10, "");
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate1("id", "accountType-", i_r10, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r10.accountTypes());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", bankAccount_r12.get("accountType").invalid && (bankAccount_r12.get("accountType").dirty || bankAccount_r12.get("accountType").touched));
    \u0275\u0275advance(3);
    \u0275\u0275propertyInterpolate1("for", "iban-", i_r10, "");
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate1("id", "iban-", i_r10, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", bankAccount_r12.get("iban").invalid && (bankAccount_r12.get("iban").dirty || bankAccount_r12.get("iban").touched));
    \u0275\u0275advance(3);
    \u0275\u0275propertyInterpolate1("for", "branchCode-", i_r10, "");
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate1("id", "branchCode-", i_r10, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", bankAccount_r12.get("branchCode").invalid && (bankAccount_r12.get("branchCode").dirty || bankAccount_r12.get("branchCode").touched));
    \u0275\u0275advance(3);
    \u0275\u0275propertyInterpolate1("for", "branchName-", i_r10, "");
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate1("id", "branchName-", i_r10, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", bankAccount_r12.get("branchName").invalid && (bankAccount_r12.get("branchName").dirty || bankAccount_r12.get("branchName").touched));
    \u0275\u0275advance(3);
    \u0275\u0275propertyInterpolate1("for", "bankId-", i_r10, "");
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate1("id", "bankId-", i_r10, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r10.banks());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", bankAccount_r12.get("bankId").invalid && (bankAccount_r12.get("bankId").dirty || bankAccount_r12.get("bankId").touched));
    \u0275\u0275advance(3);
    \u0275\u0275propertyInterpolate1("for", "isDefault-", i_r10, "");
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate1("id", "isDefault-", i_r10, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r10.canDelete);
  }
}
var _RegisterLegalFormComponent = class _RegisterLegalFormComponent {
  constructor(fb, fundService, router, toastService, calendar) {
    this.fb = fb;
    this.fundService = fundService;
    this.router = router;
    this.toastService = toastService;
    this.calendar = calendar;
    this.customerInfo = signal(null);
    this.provinces = signal([]);
    this.cities = signal([]);
    this.banks = signal([]);
    this.contactCities = signal([]);
    this.accountTypes = signal([]);
    this.submited = signal(false);
    this.canDelete = false;
    this.maxPickerDate = calendar.getToday();
  }
  ngOnInit() {
    this.getProvinces().subscribe((provinces) => this.provinces.set(provinces));
    this.getBanks().subscribe((banks) => this.banks.set(banks));
    this.getAccountType().subscribe((accountTypes) => this.accountTypes.set(accountTypes));
    this.companyForm = this.fb.group({
      personalInfo: this.fb.group({
        companyName: ["", Validators.required],
        nationalId: ["", [Validators.required, Validators.pattern("[0-9]*")]],
        registerNumber: ["", [Validators.required, Validators.pattern("[0-9]*")]],
        registerProvince: ["", Validators.required],
        registerPlaceId: ["", Validators.required],
        registerationDate: ["", Validators.required],
        economicCode: ["", [Validators.required, Validators.pattern("[0-9]*")]]
      }),
      contactInfo: this.fb.group({
        mobile: ["", Validators.required],
        phone: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        postalCode: ["", Validators.required],
        // country: ['', Validators.required],
        cityId: ["", Validators.required],
        provinceId: ["", Validators.required],
        address: ["", Validators.required]
      }),
      bankAccounts: this.fb.array([this.createBankAccount()]),
      partyHolderInfo: this.fb.array([
        this.createPartyHolder({ type: "Manager", positionType: "Ceo" }),
        this.createPartyHolder({ type: "Agent", positionType: "Agent" })
      ])
    });
  }
  getProvinces() {
    return this.fundService.getallProvince();
  }
  getCities(provinceId) {
    return this.fundService.getcitiesbyCodeid(provinceId);
  }
  getBanks() {
    return this.fundService.getallbanknames();
  }
  getAccountType() {
    return this.fundService.getAccountType();
  }
  onProvinceChange() {
    const selectedProvince = this.companyForm.get("personalInfo.registerProvince").value;
    this.getCities(selectedProvince).subscribe((cities) => this.cities.set(cities));
  }
  onContractProvinceChange() {
    const selectedProvince = this.companyForm.get("contactInfo.provinceId").value;
    this.getCities(selectedProvince).subscribe((cities) => this.contactCities.set(cities));
  }
  createBankAccount() {
    return this.fb.group({
      accountNumber: ["", Validators.required],
      accountType: ["", Validators.required],
      iban: ["", Validators.required],
      branchCode: ["", Validators.required],
      branchName: ["", Validators.required],
      bankId: ["", Validators.required],
      isDefault: [false]
    });
  }
  addBankAccount() {
    this.bankAccounts.push(this.createBankAccount());
    this.canDelete = this.bankAccounts.length > 1;
  }
  removeBankAccount(index) {
    if (this.bankAccounts.length > 1) {
      this.bankAccounts.removeAt(index);
    }
    this.canDelete = this.bankAccounts.length > 1;
  }
  onDefaultChange(index) {
    this.bankAccounts.controls.forEach((control, i) => {
      if (i !== index) {
        control.get("isDefault").setValue(false);
      }
    });
  }
  createPartyHolder(data) {
    return this.fb.group({
      type: [data.type],
      holderType: [1],
      positionType: [data.positionType],
      isOwnerSignature: [true],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      // postalCode: ['', Validators.required],
      // address: ['', Validators.required],
      personNationalId: ["", Validators.required]
    });
  }
  get bankAccounts() {
    return this.companyForm.get("bankAccounts");
  }
  onSubmit() {
    this.submited.set(true);
    if (this.companyForm.valid) {
      const model = this.companyForm.value;
      model.personalInfo.registerDate = "" + NgbDatePersianDateToGregorian(model.personalInfo.registerationDate);
      console.log("Form Submitted", this.companyForm.value);
      this.fundService.saveManualLegalCustomer(model).subscribe((data) => {
        this.toastService.show("\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0634\u0631\u06A9\u062A \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062B\u0628\u062A \u0634\u062F \u0648 \u067E\u0633 \u0627\u0632 \u0628\u0631\u0631\u0633\u06CC \u062A\u0648\u0633\u0637 \u0627\u062F\u0645\u06CC\u0646 \u0627\u0645\u06A9\u0627\u0646 \u0635\u062F\u0648\u0631 \u0648 \u0627\u0628\u0637\u0627\u0644 \u0641\u0631\u0627\u0647\u0645 \u062E\u0648\u0627\u0647\u062F \u0634\u062F", { classname: "bg-success text-light", delay: 1e4 });
        this.router.navigate(["/dashboard"]);
      });
    } else {
      this.toastService.show("\u062E\u0637\u0627 \u062F\u0631 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0648\u0627\u0631\u062F \u0634\u062F\u0647. \u0644\u0637\u0641\u0627 \u0647\u0645\u0647 \u0645\u0642\u0627\u062F\u06CC\u0631 \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u0646\u0645\u0627\u06CC\u06CC\u062F", { classname: "bg-danger text-light", delay: 5e3 });
    }
  }
};
_RegisterLegalFormComponent.\u0275fac = function RegisterLegalFormComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RegisterLegalFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(FundService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(NgbCalendar));
};
_RegisterLegalFormComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterLegalFormComponent, selectors: [["app-register-legal-form"]], standalone: true, features: [\u0275\u0275ProvidersFeature([
  { provide: NgbCalendar, useClass: NgbCalendarPersian },
  { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
]), \u0275\u0275StandaloneFeature], decls: 165, vars: 28, consts: [["d1", "ngbDatepicker"], ["dir", "rtl", 3, "ngSubmit", "formGroup"], [1, "row", "g-0", "align-items-center", "justify-content-center", "vh-100"], [1, "col-lg-12", "col-xl-12", "overflow-hidden"], [1, "card"], [1, "card-body", "row", "px-4"], ["height", "100px", "src", "/images/Pcm_Logo_Rgb_V_Fa_W.svg", "alt", "IPasargad", 1, "mb-3"], [1, "card-header", "mb-4", "p-3"], [1, "mb-0"], [1, "vh-50", "overflow-auto"], ["formGroupName", "personalInfo", 1, "row"], [1, "col-24", "p-2", "bg-gray-150"], [1, "col-lg-8", "mb-3"], [1, "form-group", "mb-4"], ["for", "companyName", 1, "form-label"], ["id", "companyName", "type", "text", "formControlName", "companyName", 1, "form-control"], [4, "ngIf"], ["for", "nationalId", 1, "form-label"], ["id", "nationalId", "type", "text", "formControlName", "nationalId", 1, "form-control"], ["for", "registerNumber", 1, "form-label"], ["id", "registerNumber", "type", "text", "formControlName", "registerNumber", 1, "form-control"], ["for", "registerProvince", 1, "form-label"], ["formControlName", "registerProvince", 1, "form-control", 3, "change"], [3, "value", 4, "ngFor", "ngForOf"], ["for", "registerPlaceId", 1, "form-label"], ["formControlName", "registerPlaceId", 1, "form-control"], [1, "input-group"], [1, "input-group-text", "text-center", "cursor-pointer", 3, "click"], ["viewBox", "0 0 24 24", "width", "18px", "height", "18px", 1, "text-primary"], [0, "xlink", "href", "#ico_calendar"], ["placeholder", "\u062A\u0627\u0631\u06CC\u062E \u062B\u0628\u062A", "name", "dp2", "formControlName", "registerationDate", "ngbDatepicker", "", 1, "form-control", 3, "click", "maxDate"], ["for", "economicCode", 1, "form-label"], ["id", "economicCode", "type", "text", "formControlName", "economicCode", 1, "form-control"], ["formGroupName", "contactInfo", 1, "row"], ["for", "mobile", 1, "form-label"], ["id", "mobile", "type", "text", "formControlName", "mobile", 1, "form-control"], ["for", "phone", 1, "form-label"], ["id", "phone", "type", "text", "formControlName", "phone", 1, "form-control"], ["for", "email", 1, "form-label"], ["id", "email", "type", "email", "formControlName", "email", 1, "form-control"], ["for", "postalCode", 1, "form-label"], ["id", "postalCode", "type", "text", "formControlName", "postalCode", 1, "form-control"], ["for", "provinceId", 1, "form-label"], ["formControlName", "provinceId", 1, "form-control", 3, "change"], ["for", "cityId", 1, "form-label"], ["formControlName", "cityId", 1, "form-control"], [1, "col-lg-16", "mb-3"], ["for", "address", 1, "form-label"], ["id", "address", "type", "text", "formControlName", "address", 1, "form-control"], [1, "row"], ["formArrayName", "partyHolderInfo"], [1, "row", 3, "formGroupName"], ["for", "firstName-manager", 1, "form-label"], ["id", "firstName-manager", "type", "text", "formControlName", "firstName", 1, "form-control"], ["for", "lastName-manager", 1, "form-label"], ["id", "lastName-manager", "type", "text", "formControlName", "lastName", 1, "form-control"], ["for", "personNationalId-manager", 1, "form-label"], ["id", "personNationalId-manager", "type", "text", "formControlName", "personNationalId", 1, "form-control"], ["type", "hidden", "formControlName", "type", "value", "Manager"], ["type", "hidden", "formControlName", "holderType", "value", "1"], ["type", "hidden", "formControlName", "positionType", "value", "Ceo"], ["type", "hidden", "formControlName", "isOwnerSignature", "value", "true"], ["for", "firstName-agent", 1, "form-label"], ["id", "firstName-agent", "type", "text", "formControlName", "firstName", 1, "form-control"], ["for", "lastName-agent", 1, "form-label"], ["id", "lastName-agent", "type", "text", "formControlName", "lastName", 1, "form-control"], ["for", "personNationalId-agent", 1, "form-label"], ["id", "personNationalId-agent", "type", "text", "formControlName", "personNationalId", 1, "form-control"], ["type", "hidden", "formControlName", "type", "value", "Agent"], ["type", "hidden", "formControlName", "positionType", "value", "Agent"], ["formArrayName", "bankAccounts", 1, "row"], [3, "formGroupName", 4, "ngFor", "ngForOf"], [1, "col-24", "mb-3"], ["type", "button", 1, "btn", "btn-primary", "m-2", 3, "click"], [1, "w-100", "text-start"], ["type", "submit", 1, "btn", "btn-success", "mt-5", "px-5"], [1, "text-danger"], [3, "value"], [3, "formGroupName"], [1, "form-label", 3, "for"], ["type", "text", "formControlName", "accountNumber", 1, "form-control", 3, "id"], ["formControlName", "accountType", 1, "form-control", 3, "id"], ["type", "text", "formControlName", "iban", 1, "form-control", 3, "id"], ["type", "text", "formControlName", "branchCode", 1, "form-control", 3, "id"], ["type", "text", "formControlName", "branchName", 1, "form-control", 3, "id"], ["formControlName", "bankId", 1, "form-control", 3, "id"], ["type", "checkbox", "formControlName", "isDefault", 3, "change", "id"], [1, "col-4", "mb-3"], ["type", "button", 1, "btn", "btn-danger", 3, "click", "disabled"]], template: function RegisterLegalFormComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 1);
    \u0275\u0275listener("ngSubmit", function RegisterLegalFormComponent_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSubmit());
    });
    \u0275\u0275elementStart(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5);
    \u0275\u0275element(5, "img", 6);
    \u0275\u0275elementStart(6, "div", 7)(7, "h3", 8);
    \u0275\u0275text(8, "\u062B\u0628\u062A \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u06A9\u0627\u0631\u0628\u0631 \u062D\u0642\u0648\u0642\u06CC");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 9)(10, "div", 10)(11, "div", 11);
    \u0275\u0275text(12, " \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0647\u0648\u06CC\u062A\u06CC ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 12)(14, "div", 13)(15, "label", 14);
    \u0275\u0275text(16, "\u0646\u0627\u0645 \u0634\u0631\u06A9\u062A:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 15);
    \u0275\u0275template(18, RegisterLegalFormComponent_div_18_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 12)(20, "div", 13)(21, "label", 17);
    \u0275\u0275text(22, "\u0634\u0646\u0627\u0633\u0647 \u0645\u0644\u06CC:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "input", 18);
    \u0275\u0275template(24, RegisterLegalFormComponent_div_24_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 12)(26, "div", 13)(27, "label", 19);
    \u0275\u0275text(28, " \u0634\u0645\u0627\u0631\u0647 \u062B\u0628\u062A:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "input", 20);
    \u0275\u0275template(30, RegisterLegalFormComponent_div_30_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 12)(32, "div", 13)(33, "label", 21);
    \u0275\u0275text(34, "\u0627\u0633\u062A\u0627\u0646:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "select", 22);
    \u0275\u0275listener("change", function RegisterLegalFormComponent_Template_select_change_35_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onProvinceChange());
    });
    \u0275\u0275template(36, RegisterLegalFormComponent_option_36_Template, 2, 2, "option", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275template(37, RegisterLegalFormComponent_div_37_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 12)(39, "label", 24);
    \u0275\u0275text(40, "\u0634\u0647\u0631:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "select", 25);
    \u0275\u0275template(42, RegisterLegalFormComponent_option_42_Template, 2, 2, "option", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275template(43, RegisterLegalFormComponent_div_43_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 12)(45, "label");
    \u0275\u0275text(46, "\u062A\u0627\u0631\u06CC\u062E \u062B\u0628\u062A \u0634\u0631\u06A9\u062A:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 26)(48, "span", 27);
    \u0275\u0275listener("click", function RegisterLegalFormComponent_Template_span_click_48_listener() {
      \u0275\u0275restoreView(_r1);
      const d1_r4 = \u0275\u0275reference(52);
      return \u0275\u0275resetView(d1_r4.toggle());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(49, "svg", 28);
    \u0275\u0275element(50, "use", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(51, "input", 30, 0);
    \u0275\u0275listener("click", function RegisterLegalFormComponent_Template_input_click_51_listener() {
      \u0275\u0275restoreView(_r1);
      const d1_r4 = \u0275\u0275reference(52);
      return \u0275\u0275resetView(d1_r4.toggle());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "div", 12)(54, "div", 13)(55, "label", 31);
    \u0275\u0275text(56, " \u06A9\u062F \u0627\u0642\u062A\u0635\u0627\u062F\u06CC:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(57, "input", 32);
    \u0275\u0275template(58, RegisterLegalFormComponent_div_58_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "div", 33)(60, "div", 11);
    \u0275\u0275text(61, "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0627\u0631\u062A\u0628\u0627\u0637\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "div", 12)(63, "div", 13)(64, "label", 34);
    \u0275\u0275text(65, "\u0645\u0648\u0628\u0627\u06CC\u0644:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(66, "input", 35);
    \u0275\u0275template(67, RegisterLegalFormComponent_div_67_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "div", 12)(69, "div", 13)(70, "label", 36);
    \u0275\u0275text(71, "\u062A\u0644\u0641\u0646:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(72, "input", 37);
    \u0275\u0275template(73, RegisterLegalFormComponent_div_73_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(74, "div", 12)(75, "div", 13)(76, "label", 38);
    \u0275\u0275text(77, "\u067E\u0633\u062A \u0627\u0644\u06A9\u062A\u0631\u0648\u0646\u06CC\u06CC\u06A9\u06CC:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(78, "input", 39);
    \u0275\u0275template(79, RegisterLegalFormComponent_div_79_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(80, "div", 12)(81, "div", 13)(82, "label", 40);
    \u0275\u0275text(83, "\u06A9\u062F \u067E\u0633\u062A\u06CC:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(84, "input", 41);
    \u0275\u0275template(85, RegisterLegalFormComponent_div_85_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(86, "div", 12)(87, "div", 13)(88, "label", 42);
    \u0275\u0275text(89, "\u0627\u0633\u062A\u0627\u0646:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "select", 43);
    \u0275\u0275listener("change", function RegisterLegalFormComponent_Template_select_change_90_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onContractProvinceChange());
    });
    \u0275\u0275template(91, RegisterLegalFormComponent_option_91_Template, 2, 2, "option", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275template(92, RegisterLegalFormComponent_div_92_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(93, "div", 12)(94, "label", 44);
    \u0275\u0275text(95, "\u0634\u0647\u0631:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "select", 45);
    \u0275\u0275template(97, RegisterLegalFormComponent_option_97_Template, 2, 2, "option", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275template(98, RegisterLegalFormComponent_div_98_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(99, "div", 46)(100, "div", 13)(101, "label", 47);
    \u0275\u0275text(102, "\u0622\u062F\u0631\u0633:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(103, "input", 48);
    \u0275\u0275template(104, RegisterLegalFormComponent_div_104_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(105, "div", 49)(106, "div", 11);
    \u0275\u0275text(107, "\u0646\u0645\u0627\u06CC\u0646\u062F\u06AF\u0627\u0646 \u0634\u0631\u06A9\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(108, "div", 50)(109, "div", 51)(110, "div", 12)(111, "div", 13)(112, "label", 52);
    \u0275\u0275text(113, "\u0646\u0627\u0645 \u0645\u062F\u06CC\u0631\u0639\u0627\u0645\u0644:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(114, "input", 53);
    \u0275\u0275template(115, RegisterLegalFormComponent_div_115_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(116, "div", 12)(117, "div", 13)(118, "label", 54);
    \u0275\u0275text(119, "\u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC \u0645\u062F\u06CC\u0631\u0639\u0627\u0645\u0644:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(120, "input", 55);
    \u0275\u0275template(121, RegisterLegalFormComponent_div_121_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(122, "div", 12)(123, "div", 13)(124, "label", 56);
    \u0275\u0275text(125, "\u06A9\u062F \u0645\u0644\u06CC \u0645\u062F\u06CC\u0631\u0639\u0627\u0645\u0644:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(126, "input", 57);
    \u0275\u0275template(127, RegisterLegalFormComponent_div_127_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(128, "input", 58)(129, "input", 59)(130, "input", 60)(131, "input", 61);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(132, "div", 51)(133, "div", 12)(134, "div", 13)(135, "label", 62);
    \u0275\u0275text(136, "\u0646\u0627\u0645 \u0646\u0645\u0627\u06CC\u0646\u062F\u0647 \u0634\u0631\u06A9\u062A:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(137, "input", 63);
    \u0275\u0275template(138, RegisterLegalFormComponent_div_138_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(139, "div", 12)(140, "div", 13)(141, "label", 64);
    \u0275\u0275text(142, "\u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC \u0646\u0645\u0627\u06CC\u0646\u062F\u0647 \u0634\u0631\u06A9\u062A:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(143, "input", 65);
    \u0275\u0275template(144, RegisterLegalFormComponent_div_144_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(145, "div", 12)(146, "div", 13)(147, "label", 66);
    \u0275\u0275text(148, "\u06A9\u062F \u0645\u0644\u06CC \u0646\u0645\u0627\u06CC\u0646\u062F\u0647 \u0634\u0631\u06A9\u062A:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(149, "input", 67);
    \u0275\u0275template(150, RegisterLegalFormComponent_div_150_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(151, "input", 68)(152, "input", 59)(153, "input", 69)(154, "input", 61);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(155, "div", 70)(156, "div", 11);
    \u0275\u0275text(157, "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062D\u0633\u0627\u0628 \u0628\u0627\u0646\u06A9\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275template(158, RegisterLegalFormComponent_div_158_Template, 48, 38, "div", 71);
    \u0275\u0275elementStart(159, "div", 72)(160, "button", 73);
    \u0275\u0275listener("click", function RegisterLegalFormComponent_Template_button_click_160_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.addBankAccount());
    });
    \u0275\u0275text(161, "\u0627\u0641\u0632\u0648\u062F\u0646 \u062D\u0633\u0627\u0628 \u062C\u062F\u06CC\u062F");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(162, "div", 74)(163, "button", 75);
    \u0275\u0275text(164, "\u062B\u0628\u062A \u06A9\u0627\u0631\u0628\u0631");
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    \u0275\u0275property("formGroup", ctx.companyForm);
    \u0275\u0275advance(18);
    \u0275\u0275property("ngIf", ctx.companyForm.get("personalInfo.companyName").invalid && (ctx.submited() || ctx.companyForm.get("personalInfo.companyName").dirty || ctx.companyForm.get("personalInfo.companyName").touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.companyForm.get("personalInfo.nationalId").invalid && (ctx.submited() || ctx.companyForm.get("personalInfo.nationalId").dirty || ctx.companyForm.get("personalInfo.nationalId").touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.companyForm.get("personalInfo.registerNumber").invalid && (ctx.submited() || ctx.companyForm.get("personalInfo.registerNumber").dirty || ctx.companyForm.get("personalInfo.registerNumber").touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx.provinces());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.companyForm.get("personalInfo.registerProvince").invalid && (ctx.submited() || ctx.companyForm.get("personalInfo.registerProvince").dirty || ctx.companyForm.get("personalInfo.registerProvince").touched));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx.cities());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.companyForm.get("personalInfo.registerPlaceId").invalid && (ctx.submited() || ctx.companyForm.get("personalInfo.registerPlaceId").dirty || ctx.companyForm.get("personalInfo.registerPlaceId").touched));
    \u0275\u0275advance(8);
    \u0275\u0275property("maxDate", ctx.maxPickerDate);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx.companyForm.get("personalInfo.economicCode").invalid && (ctx.submited() || ctx.companyForm.get("personalInfo.economicCode").dirty || ctx.companyForm.get("personalInfo.economicCode").touched));
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx.companyForm.get("contactInfo.mobile").invalid && (ctx.submited() || ctx.companyForm.get("contactInfo.mobile").dirty || ctx.companyForm.get("contactInfo.mobile").touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.companyForm.get("contactInfo.phone").invalid && (ctx.submited() || ctx.companyForm.get("contactInfo.phone").dirty || ctx.companyForm.get("contactInfo.phone").touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.companyForm.get("contactInfo.email").invalid && (ctx.submited() || ctx.companyForm.get("contactInfo.email").dirty || ctx.companyForm.get("contactInfo.email").touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.companyForm.get("contactInfo.postalCode").invalid && (ctx.submited() || ctx.companyForm.get("contactInfo.postalCode").dirty || ctx.companyForm.get("contactInfo.postalCode").touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx.provinces());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.companyForm.get("contactInfo.provinceId").invalid && (ctx.submited() || ctx.companyForm.get("contactInfo.provinceId").dirty || ctx.companyForm.get("contactInfo.provinceId").touched));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx.contactCities());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.companyForm.get("contactInfo.cityId").invalid && (ctx.submited() || ctx.companyForm.get("contactInfo.cityId").dirty || ctx.companyForm.get("contactInfo.cityId").touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.companyForm.get("contactInfo.address").invalid && (ctx.submited() || ctx.companyForm.get("contactInfo.address").dirty || ctx.companyForm.get("contactInfo.address").touched));
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroupName", 0);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.companyForm.get("partyHolderInfo.0.firstName").invalid && (ctx.companyForm.get("partyHolderInfo.0.firstName").dirty || ctx.companyForm.get("partyHolderInfo.0.firstName").touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.companyForm.get("partyHolderInfo.0.lastName").invalid && (ctx.companyForm.get("partyHolderInfo.0.lastName").dirty || ctx.companyForm.get("partyHolderInfo.0.lastName").touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.companyForm.get("partyHolderInfo.0.personNationalId").invalid && (ctx.companyForm.get("partyHolderInfo.0.personNationalId").dirty || ctx.companyForm.get("partyHolderInfo.0.personNationalId").touched));
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroupName", 1);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.companyForm.get("partyHolderInfo.1.firstName").invalid && (ctx.companyForm.get("partyHolderInfo.1.firstName").dirty || ctx.companyForm.get("partyHolderInfo.1.firstName").touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.companyForm.get("partyHolderInfo.1.lastName").invalid && (ctx.companyForm.get("partyHolderInfo.1.lastName").dirty || ctx.companyForm.get("partyHolderInfo.1.lastName").touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.companyForm.get("partyHolderInfo.1.personNationalId").invalid && (ctx.companyForm.get("partyHolderInfo.1.personNationalId").dirty || ctx.companyForm.get("partyHolderInfo.1.personNationalId").touched));
    \u0275\u0275advance(8);
    \u0275\u0275property("ngForOf", ctx.bankAccounts.controls);
  }
}, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormGroupName, FormArrayName, NgIf, NgForOf, NgbDatepickerModule, NgbInputDatepicker], changeDetection: 0 });
var RegisterLegalFormComponent = _RegisterLegalFormComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterLegalFormComponent, { className: "RegisterLegalFormComponent" });
})();

// projects/client/src/app/auth/register/quick-sejam-step2-legal/quick-sejam-step2-legal.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function QuickSejamStep2LegalComponent_For_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 10)(2, "label", 11);
    \u0275\u0275text(3, "\u0628\u0627\u0646\u06A9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 12);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 10)(7, "label", 11);
    \u0275\u0275text(8, "\u0634\u0639\u0628\u0647");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 12);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 10)(12, "label", 11);
    \u0275\u0275text(13, "\u06A9\u062F \u0634\u0639\u0628\u0647");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 12);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 10)(17, "label", 11);
    \u0275\u0275text(18, "\u0634\u0645\u0627\u0631\u0647 \u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 12);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 10)(22, "label", 11);
    \u0275\u0275text(23, "\u0634\u0645\u0627\u0631\u0647 \u0634\u0628\u0627");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 12);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const bank_r1 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", bank_r1 == null ? null : bank_r1.bankTitle, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", bank_r1 == null ? null : bank_r1.branchName, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", bank_r1 == null ? null : bank_r1.branchCode, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", bank_r1 == null ? null : bank_r1.accountNumber, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", bank_r1 == null ? null : bank_r1.iban, " ");
  }
}
var _QuickSejamStep2LegalComponent = class _QuickSejamStep2LegalComponent {
  constructor(profileManagementService, router) {
    this.profileManagementService = profileManagementService;
    this.router = router;
    this.customerInfo = signal(null);
    this.agent = signal(null);
    this.ceo = signal(null);
  }
  ngOnInit() {
    this.profileManagementService.getCustomerInfo().subscribe((customer) => {
      this.customerInfo.set(customer);
      const agent = customer?.holders.filter((x) => x.positionType == "Agent")[0];
      this.agent.set(agent);
      const ceo = customer?.holders.filter((x) => x.positionType == "Ceo")[0];
      this.ceo.set(ceo);
    });
  }
  finalizeSejamStatus() {
    localStorage.setItem("step", "100");
    this.router.navigate(["/dashboard"]);
  }
};
_QuickSejamStep2LegalComponent.\u0275fac = function QuickSejamStep2LegalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _QuickSejamStep2LegalComponent)(\u0275\u0275directiveInject(ProfileManagementService), \u0275\u0275directiveInject(Router));
};
_QuickSejamStep2LegalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _QuickSejamStep2LegalComponent, selectors: [["app-quick-sejam-step2"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 99, vars: 15, consts: [[1, "row", "g-0", "align-items-center", "justify-content-center", "vh-100"], [1, "col-lg-12", "col-xl-12", "overflow-hidden"], [1, "card"], [1, "card-body", "row", "px-4"], ["height", "100px", "src", "/images/Pcm_Logo_Rgb_V_Fa_W.svg", "alt", "IPasargad", 1, "mb-3"], [1, "card-header", "mb-4", "p-3"], [1, "mb-0"], [1, "vh-50", "overflow-auto", "p-2"], [1, "row"], [1, "col-24", "bg-gray-200", "p-2", "m-2"], [1, "col-lg-12", "mb-3"], [1, "mb-2"], [1, "py-3", "px-2", "bg-gray-150", "custom-radius"], [1, "col-lg-24", "mb-3"], [1, "w-100", "text-start"], [1, "btn", "btn-success", "mt-5", "px-5", 3, "click"]], template: function QuickSejamStep2LegalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
    \u0275\u0275element(4, "img", 4);
    \u0275\u0275elementStart(5, "div", 5)(6, "h3", 6);
    \u0275\u0275text(7, "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0633\u062C\u0627\u0645");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 7)(9, "div", 8)(10, "div", 9);
    \u0275\u0275text(11, "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0647\u0648\u06CC\u062A\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 10)(13, "label", 11);
    \u0275\u0275text(14, "\u0646\u0627\u0645 \u0634\u0631\u06A9\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 12);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 10)(18, "label", 11);
    \u0275\u0275text(19, "\u0634\u0646\u0627\u0633\u0647 \u0645\u0644\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 12);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 10)(23, "label", 11);
    \u0275\u0275text(24, "\u0634\u0645\u0627\u0631\u0647 \u062B\u0628\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 12);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 10)(28, "label", 11);
    \u0275\u0275text(29, "\u062A\u0627\u0631\u06CC\u062E \u062A\u0627\u0633\u06CC\u0633");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 12);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 10)(33, "label", 11);
    \u0275\u0275text(34, "\u0645\u062D\u0644 \u062A\u0627\u0633\u06CC\u0633");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 12);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "div", 8)(38, "div", 9);
    \u0275\u0275text(39, "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0627\u0631\u062A\u0628\u0627\u0637\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 10)(41, "label", 11);
    \u0275\u0275text(42, "\u062A\u0644\u0641\u0646 \u0647\u0645\u0631\u0627\u0647");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 12);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 10)(46, "label", 11);
    \u0275\u0275text(47, "\u062A\u0644\u0641\u0646 \u062B\u0627\u0628\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 12);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 10)(51, "label", 11);
    \u0275\u0275text(52, "\u06A9\u062F\u067E\u0633\u062A\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "div", 12);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 10)(56, "label", 11);
    \u0275\u0275text(57, "\u0627\u06CC\u0645\u06CC\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "div", 12);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "div", 13)(61, "label", 11);
    \u0275\u0275text(62, "\u0622\u062F\u0631\u0633");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 12);
    \u0275\u0275text(64);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(65, "div", 8)(66, "div", 9);
    \u0275\u0275text(67, "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0646\u0645\u0627\u06CC\u0646\u062F\u0647");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "div", 10)(69, "label", 11);
    \u0275\u0275text(70, "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645\u200C\u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "div", 12);
    \u0275\u0275text(72);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "div", 10)(74, "label", 11);
    \u0275\u0275text(75, "\u06A9\u062F\u200C\u0645\u0644\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "div", 12);
    \u0275\u0275text(77);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(78, "div", 8)(79, "div", 9);
    \u0275\u0275text(80, "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0645\u062F\u06CC\u0631\u0639\u0627\u0645\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "div", 10)(82, "label", 11);
    \u0275\u0275text(83, "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645\u200C\u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "div", 12);
    \u0275\u0275text(85);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(86, "div", 10)(87, "label", 11);
    \u0275\u0275text(88, "\u06A9\u062F\u200C\u0645\u0644\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "div", 12);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(91, "div", 8)(92, "div", 9);
    \u0275\u0275text(93, "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0628\u0627\u0646\u06A9\u06CC");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(94, QuickSejamStep2LegalComponent_For_95_Template, 26, 5, "div", 8, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "div", 14)(97, "a", 15);
    \u0275\u0275listener("click", function QuickSejamStep2LegalComponent_Template_a_click_97_listener() {
      return ctx.finalizeSejamStatus();
    });
    \u0275\u0275text(98, "\u062A\u0627\u06CC\u06CC\u062F \u0627\u0637\u0644\u0627\u0639\u0627\u062A");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    let tmp_0_0;
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    let tmp_12_0;
    let tmp_13_0;
    let tmp_14_0;
    \u0275\u0275advance(16);
    \u0275\u0275textInterpolate1(" ", (tmp_0_0 = ctx.customerInfo()) == null ? null : tmp_0_0.personalInfo == null ? null : tmp_0_0.personalInfo.name, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_1_0 = ctx.customerInfo()) == null ? null : tmp_1_0.personalInfo == null ? null : tmp_1_0.personalInfo.nationalId, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_2_0 = ctx.customerInfo()) == null ? null : tmp_2_0.personalInfo == null ? null : tmp_2_0.personalInfo.identityCard, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_3_0 = ctx.customerInfo()) == null ? null : tmp_3_0.personalInfo == null ? null : tmp_3_0.personalInfo.birthDateJalali, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" ", (tmp_4_0 = ctx.customerInfo()) == null ? null : tmp_4_0.personalInfo == null ? null : tmp_4_0.personalInfo.birthPlace, "/", (tmp_4_0 = ctx.customerInfo()) == null ? null : tmp_4_0.personalInfo == null ? null : tmp_4_0.personalInfo.issuePlace, " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", (tmp_5_0 = ctx.customerInfo()) == null ? null : tmp_5_0.contactInfo == null ? null : tmp_5_0.contactInfo.mobile, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ((tmp_6_0 = ctx.customerInfo()) == null ? null : tmp_6_0.contactInfo == null ? null : tmp_6_0.contactInfo.phone) || "\xA0", " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_7_0 = ctx.customerInfo()) == null ? null : tmp_7_0.contactInfo == null ? null : tmp_7_0.contactInfo.postalCode, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_8_0 = ctx.customerInfo()) == null ? null : tmp_8_0.contactInfo == null ? null : tmp_8_0.contactInfo.email, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_9_0 = ctx.customerInfo()) == null ? null : tmp_9_0.contactInfo == null ? null : tmp_9_0.contactInfo.address, " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", (tmp_10_0 = ctx.agent()) == null ? null : tmp_10_0.fullName, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_11_0 = ctx.agent()) == null ? null : tmp_11_0.nationalId, " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", (tmp_12_0 = ctx.ceo()) == null ? null : tmp_12_0.fullName, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (tmp_13_0 = ctx.ceo()) == null ? null : tmp_13_0.nationalId, " ");
    \u0275\u0275advance(4);
    \u0275\u0275repeater((tmp_14_0 = ctx.customerInfo()) == null ? null : tmp_14_0.bankAccounts);
  }
}, dependencies: [FontAwesomeModule], styles: ['/* projects/client/src/app/auth/register/quick-sejam-step2-legal/quick-sejam-step2-legal.component.scss */\n.bg-auth {\n  background: #eee url("./media/signup-bg.svg");\n  background-size: cover;\n  background-position: bottom;\n}\n.vh-50 {\n  height: 50vh;\n}\n::ng-deep .content {\n  position: relative;\n  direction: ltr;\n  overflow: auto;\n  height: 50%;\n  max-height: 300px;\n  -webkit-mask-image:\n    linear-gradient(\n      to bottom,\n      black 50%,\n      transparent 100%);\n  mask-image:\n    linear-gradient(\n      to bottom,\n      black 50%,\n      transparent 100%);\n  overflow-y: scroll;\n}\n::ng-deep .content div {\n  direction: rtl;\n}\n/*# sourceMappingURL=quick-sejam-step2-legal.component.css.map */\n'], encapsulation: 2, changeDetection: 0 });
var QuickSejamStep2LegalComponent = _QuickSejamStep2LegalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(QuickSejamStep2LegalComponent, { className: "QuickSejamStep2LegalComponent" });
})();

// projects/client/src/app/auth/auth.routes.ts
var auth_routes = [
  {
    path: "reg",
    pathMatch: "full",
    redirectTo: "reg/step1"
  },
  {
    path: "reg/step4",
    component: QuickSejamStep2Component,
    data: { infoSection: false }
  },
  {
    path: "reg/step4-legal",
    component: QuickSejamStep2LegalComponent,
    data: { infoSection: false }
  },
  {
    path: "reg/legal-step",
    component: RegisterLegalFormComponent,
    data: { infoSection: false }
  },
  {
    path: "",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "forget-password", component: ForgetPasswordComponent },
      {
        path: "reg",
        children: [
          { path: "step1", component: QuickRegisterComponent },
          { path: "step2", component: QuickRegisterStep2Component },
          { path: "step3", component: QuickSejamStep1Component }
        ]
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "login"
      }
    ]
  }
];
export {
  auth_routes
};
//# sourceMappingURL=chunk-DWUEH7DQ.js.map

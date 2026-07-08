import {
  Filter,
  FundListService,
  NgOptionComponent,
  NgSelectComponent,
  NgSelectModule,
  NgxEchartsDirective,
  TransactionState,
  TransactionType,
  core_exports,
  provideEchartsCore
} from "./chunk-ZHG6NCW7.js";
import {
  SvgViewerComponent
} from "./chunk-D2PMPXNL.js";
import {
  ChangeDetectorRef,
  CommonPaymentTypeEnum,
  CssSkeletonComponent,
  DecimalPipe,
  DefaultValueAccessor,
  ExcelExportService,
  ExportService,
  FaIconComponent,
  FontAwesomeModule,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  FundAttachmentTypeEnum,
  FundService,
  NavigationEnd,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgModel,
  NgTemplateOutlet,
  NgbCalendar,
  NgbCalendarPersian,
  NgbDatePersianDateToGregorian,
  NgbDatepickerI18n,
  NgbDatepickerI18nPersian,
  NgbDatepickerModule,
  NgbInputDatepicker,
  NgbModal,
  NgbTooltip,
  PodService,
  ReactiveFormsModule,
  Renderer2,
  Router,
  RouterOutlet,
  SettingKeys,
  Subject,
  UntypedFormControl,
  UntypedFormGroup,
  UserSettingsService,
  Validators,
  environment,
  filter,
  finalize,
  forkJoin,
  map,
  signal,
  takeUntil,
  toPersianDate,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdeclareLet,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpropertyInterpolate1,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵpureFunction4,
  ɵɵreadContextLet,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstoreLet,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-OE4HGK62.js";
import {
  install10 as install2,
  install12 as install3,
  install17 as install4,
  install2 as install,
  install26 as install5,
  install28 as install6,
  install50 as install7,
  use
} from "./chunk-WBRG7DG7.js";
import "./chunk-N6ESDQJH.js";

// projects/client/src/app/features/reports/reports.component.ts
function ReportsComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "h5", 5);
    \u0275\u0275text(2, " \u0641\u06CC\u0644\u062A\u0631\u200C\u0647\u0627 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 6)(4, "div", 7)(5, "div", 8);
    \u0275\u0275listener("click", function ReportsComponent_Conditional_4_Template_div_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const filter_r2 = \u0275\u0275reference(10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFilter(filter_r2));
    });
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, " \u0641\u06CC\u0644\u062A\u0631 ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "fa-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 10, 0)(11, "router-outlet", 11);
    \u0275\u0275listener("activate", function ReportsComponent_Conditional_4_Template_router_outlet_activate_11_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onOutletLoaded($event));
    });
    \u0275\u0275elementEnd()()()()();
  }
}
var _ReportsComponent = class _ReportsComponent {
  constructor(fundService, fundListService, router) {
    this.fundService = fundService;
    this.fundListService = fundListService;
    this.router = router;
    this.hasFilter = signal(false);
    this.checkUrl(this.router.url);
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.checkUrl(event.urlAfterRedirects);
    });
  }
  ngOnInit() {
  }
  onOutletLoaded(component) {
    this.fundListService.getAllMutualFunds().subscribe((fundList) => {
      component.mutualFundList = fundList;
    });
  }
  showFilter(element) {
    element.classList.toggle("d-none");
  }
  checkUrl(url) {
    url === "/reporting/report-menus" ? this.hasFilter.set(true) : this.hasFilter.set(false);
  }
};
_ReportsComponent.\u0275fac = function ReportsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ReportsComponent)(\u0275\u0275directiveInject(FundService), \u0275\u0275directiveInject(FundListService), \u0275\u0275directiveInject(Router));
};
_ReportsComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportsComponent, selectors: [["app-reports"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 5, vars: 1, consts: [["filter", ""], [1, "row"], [1, "col-lg-16", "order-2", "px-4"], [1, "w-100"], [1, "col-lg-8", "order-lg-2", "mb-4"], [1, "d-none", "d-lg-block", "text-right", "text-secondary", "mb-4", 2, "color", "#919BA5", "position", "sticky", "top", "147px"], [1, "card", 2, "position", "sticky", "top", "178px"], [1, "card-body"], [1, "d-lg-none", "d-flex", "justify-content-between", "align-items-center", 3, "click"], ["icon", "caret-down", 1, "bg-gray-200", "rounded-circle", "more-button"], [1, "d-none", "d-lg-block"], ["name", "filter", 3, "activate"]], template: function ReportsComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3);
    \u0275\u0275element(3, "router-outlet");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, ReportsComponent_Conditional_4_Template, 12, 0, "div", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275conditional(!ctx.hasFilter() ? 4 : -1);
  }
}, dependencies: [RouterOutlet, FontAwesomeModule, FaIconComponent], styles: ["\n\n[_nghost-%COMP%]  .ng-select-container, \n[_nghost-%COMP%]  .ng-dropdown-panel {\n  border-radius: calc(var(--dtx-card-border-radius) / 2) !important;\n  background-color: var(--dtx-gray-150);\n  font-weight: bold;\n  overflow: hidden;\n}\n[_nghost-%COMP%]  .ng-placeholder {\n  font-size: 0.8rem;\n}\n[_nghost-%COMP%]  .more-button {\n  width: 42px;\n  height: 42px;\n  cursor: pointer;\n  display: inline-block;\n  align-content: center;\n  text-align: center;\n}\n/*# sourceMappingURL=reports.component.css.map */"], changeDetection: 0 });
var ReportsComponent = _ReportsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportsComponent, { className: "ReportsComponent" });
})();

// projects/client/src/app/features/reports/requests-report/requests-report.service.ts
var _RequestsReportService = class _RequestsReportService {
  constructor() {
    this.filter = new Subject();
    this.currentFilter = this.filter.asObservable();
  }
  setFilter(filter2) {
    this.filter.next(filter2);
  }
};
_RequestsReportService.\u0275fac = function RequestsReportService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RequestsReportService)();
};
_RequestsReportService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RequestsReportService, factory: _RequestsReportService.\u0275fac, providedIn: "root" });
var RequestsReportService = _RequestsReportService;

// projects/client/src/app/features/reports/requests-report/requests-report.component.ts
var _c0 = (a0, a1, a2, a3) => ({ "bg-gift": a0, "bg-primary-200": a1, "bg-subscription": a2, "bg-redemption": a3 });
var _c1 = (a0, a1, a2, a3) => ({ "text-info": a0, "text-primary": a1, "text-success": a2, "text-danger": a3 });
var _c2 = (a0, a1, a2) => ({ "badge-pish": a0, "badge-waiting": a1, "badge-confirm": a2 });
function RequestsReportComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 12)(2, "div", 13);
    \u0275\u0275element(3, "div", 14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275classProp("ltr", ctx_r0.fontFamily() !== "PeydaWebFaNum");
    \u0275\u0275property("options", ctx_r0.chartOption);
  }
}
function RequestsReportComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 8);
  }
}
function RequestsReportComponent_For_10_div_12_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1, " \u06A9\u0627\u0631\u062A \u0647\u062F\u06CC\u0647 ");
    \u0275\u0275elementContainerEnd();
  }
}
function RequestsReportComponent_For_10_div_12_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1, " \u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0633\u062A\u0642\u06CC\u0645 ");
    \u0275\u0275elementContainerEnd();
  }
}
function RequestsReportComponent_For_10_div_12_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1, " \u0633\u0631\u0645\u0627\u06CC\u0647\u200C\u06AF\u0630\u0627\u0631\u06CC ");
    \u0275\u0275elementContainerEnd();
  }
}
function RequestsReportComponent_For_10_div_12_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1, " \u062A\u0628\u062F\u06CC\u0644 ");
    \u0275\u0275elementContainerEnd();
  }
}
function RequestsReportComponent_For_10_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, RequestsReportComponent_For_10_div_12_ng_container_1_Template, 2, 0, "ng-container", 23)(2, RequestsReportComponent_For_10_div_12_ng_container_2_Template, 2, 0, "ng-container", 23)(3, RequestsReportComponent_For_10_div_12_ng_container_3_Template, 2, 0, "ng-container", 23)(4, RequestsReportComponent_For_10_div_12_ng_container_4_Template, 2, 0, "ng-container", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const request_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (request_r3 == null ? null : request_r3.settlementType) === 5);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (request_r3 == null ? null : request_r3.settlementType) === 6);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (request_r3 == null ? null : request_r3.settlementType) !== 5 && (request_r3 == null ? null : request_r3.settlementType) !== 6 && (request_r3 == null ? null : request_r3.settlementType) !== 3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (request_r3 == null ? null : request_r3.settlementType) === 3);
  }
}
function RequestsReportComponent_For_10_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, " \u0628\u0631\u062F\u0627\u0634\u062A ");
    \u0275\u0275elementEnd();
  }
}
function RequestsReportComponent_For_10_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, " \u062A\u0628\u062F\u06CC\u0644 ");
    \u0275\u0275elementEnd();
  }
}
function RequestsReportComponent_For_10_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0645\u0628\u0644\u063A ");
  }
}
function RequestsReportComponent_For_10_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062A\u0639\u062F\u0627\u062F ");
  }
}
function RequestsReportComponent_For_10_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const request_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, request_r3 == null ? null : request_r3.amount), " ");
  }
}
function RequestsReportComponent_For_10_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const request_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, request_r3 == null ? null : request_r3.volume), " ");
  }
}
function RequestsReportComponent_For_10_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0631\u06CC\u0627\u0644 ");
  }
}
function RequestsReportComponent_For_10_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0648\u0627\u062D\u062F ");
  }
}
function RequestsReportComponent_For_10_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062A\u0627\u0631\u06CC\u062E \u0627\u06CC\u062C\u0627\u062F ");
  }
}
function RequestsReportComponent_For_10_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062A\u0627\u0631\u06CC\u062E \u062A\u0627\u06CC\u06CC\u062F ");
  }
}
function RequestsReportComponent_For_10_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const request_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", request_r3 == null ? null : request_r3.emissionDateJalali, " ");
  }
}
function RequestsReportComponent_For_10_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const request_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", request_r3 == null ? null : request_r3.createdJalali, " ");
  }
}
function RequestsReportComponent_For_10_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const request_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, request_r3.volume), " ");
  }
}
function RequestsReportComponent_For_10_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const request_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, request_r3.evidenceVolume), " ");
  }
}
function RequestsReportComponent_For_10_div_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const request_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, request_r3.confirmedAmount), " ");
  }
}
function RequestsReportComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275declareLet(0);
    \u0275\u0275elementStart(1, "div", 9)(2, "div", 15)(3, "div", 16)(4, "div", 17)(5, "div", 18)(6, "div", 19);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 20);
    \u0275\u0275element(8, "use");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "h5", 21);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "h6", 22);
    \u0275\u0275template(12, RequestsReportComponent_For_10_div_12_Template, 5, 4, "div", 23)(13, RequestsReportComponent_For_10_div_13_Template, 2, 0, "div", 23)(14, RequestsReportComponent_For_10_div_14_Template, 2, 0, "div", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div")(16, "div", 24)(17, "span", 25);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 26);
    \u0275\u0275listener("click", function RequestsReportComponent_For_10_Template_span_click_19_listener() {
      \u0275\u0275restoreView(_r2);
      const index_r4 = \u0275\u0275readContextLet(0);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showMore(index_r4));
    });
    \u0275\u0275element(20, "fa-icon", 27);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(21, "div", 28)(22, "div", 29)(23, "div", 30)(24, "div", 31)(25, "h5", 32);
    \u0275\u0275text(26, " \u0635\u0646\u062F\u0648\u0642 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "h5", 33);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 34)(30, "h5", 35);
    \u0275\u0275template(31, RequestsReportComponent_For_10_Conditional_31_Template, 1, 0)(32, RequestsReportComponent_For_10_Conditional_32_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span", 36)(34, "h5", 33);
    \u0275\u0275template(35, RequestsReportComponent_For_10_Conditional_35_Template, 2, 3)(36, RequestsReportComponent_For_10_Conditional_36_Template, 2, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "h6", 37);
    \u0275\u0275template(38, RequestsReportComponent_For_10_Conditional_38_Template, 1, 0)(39, RequestsReportComponent_For_10_Conditional_39_Template, 1, 0);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(40, "div", 38)(41, "div", 31)(42, "h5", 39);
    \u0275\u0275template(43, RequestsReportComponent_For_10_Conditional_43_Template, 1, 0)(44, RequestsReportComponent_For_10_Conditional_44_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "h5", 33);
    \u0275\u0275template(46, RequestsReportComponent_For_10_Conditional_46_Template, 1, 1)(47, RequestsReportComponent_For_10_Conditional_47_Template, 1, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 40)(49, "span", 25);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span", 26);
    \u0275\u0275listener("click", function RequestsReportComponent_For_10_Template_span_click_51_listener() {
      \u0275\u0275restoreView(_r2);
      const index_r4 = \u0275\u0275readContextLet(0);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showMore(index_r4));
    });
    \u0275\u0275element(52, "fa-icon", 27);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "div", 41, 0)(55, "div", 42)(56, "div", 43)(57, "div", 44);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd();
    \u0275\u0275template(59, RequestsReportComponent_For_10_Conditional_59_Template, 3, 3, "div", 45)(60, RequestsReportComponent_For_10_Conditional_60_Template, 3, 3, "div", 46)(61, RequestsReportComponent_For_10_div_61_Template, 3, 3, "div", 47);
    \u0275\u0275elementEnd()()()()()()()();
  }
  if (rf & 2) {
    const request_r3 = ctx.$implicit;
    const $index_r5 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext();
    const index_r6 = \u0275\u0275storeLet($index_r5);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction4(27, _c0, (request_r3 == null ? null : request_r3.transactionType) === 2 && (request_r3 == null ? null : request_r3.settlementType) === 5, (request_r3 == null ? null : request_r3.transactionType) === 2 && (request_r3 == null ? null : request_r3.settlementType) === 6, (request_r3 == null ? null : request_r3.transactionType) === 2 && (request_r3 == null ? null : request_r3.settlementType) !== 5 && (request_r3 == null ? null : request_r3.settlementType) !== 6, (request_r3 == null ? null : request_r3.transactionType) === 3));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction4(32, _c1, (request_r3 == null ? null : request_r3.transactionType) === 2 && (request_r3 == null ? null : request_r3.settlementType) === 5, (request_r3 == null ? null : request_r3.transactionType) === 2 && (request_r3 == null ? null : request_r3.settlementType) === 6, (request_r3 == null ? null : request_r3.transactionType) === 2 && (request_r3 == null ? null : request_r3.settlementType) !== 5 && (request_r3 == null ? null : request_r3.settlementType) !== 6, (request_r3 == null ? null : request_r3.transactionType) === 3));
    \u0275\u0275advance();
    \u0275\u0275attribute("href", request_r3.transactionType === 2 && request_r3.settlementType === 5 ? "#ico_gift_stroke" : request_r3.transactionType === 2 && request_r3.settlementType === 6 ? "#ico_s_display_add" : request_r3.transactionType === 2 && request_r3.settlementType === 3 ? "#ico_circle_right" : request_r3.transactionType === 2 ? "#ico_s_box_plus" : request_r3.transactionType === 3 && request_r3.settlementType === 3 ? "#ico_circle_left" : "#ico_s_box_minus", null, "xlink");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction4(37, _c1, (request_r3 == null ? null : request_r3.transactionType) === 2 && (request_r3 == null ? null : request_r3.settlementType) === 5, (request_r3 == null ? null : request_r3.transactionType) === 2 && (request_r3 == null ? null : request_r3.settlementType) === 6, (request_r3 == null ? null : request_r3.transactionType) === 2 && (request_r3 == null ? null : request_r3.settlementType) !== 5 && (request_r3 == null ? null : request_r3.settlementType) !== 6, (request_r3 == null ? null : request_r3.transactionType) === 3));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", request_r3.transactionTypeTitle, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction4(42, _c1, (request_r3 == null ? null : request_r3.transactionType) === 2 && (request_r3 == null ? null : request_r3.settlementType) === 5, (request_r3 == null ? null : request_r3.transactionType) === 2 && (request_r3 == null ? null : request_r3.settlementType) === 6, (request_r3 == null ? null : request_r3.transactionType) === 2 && (request_r3 == null ? null : request_r3.settlementType) !== 5 && (request_r3 == null ? null : request_r3.settlementType) !== 6, (request_r3 == null ? null : request_r3.transactionType) === 3));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (request_r3 == null ? null : request_r3.transactionType) === 2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (request_r3 == null ? null : request_r3.transactionType) === 3 && (request_r3 == null ? null : request_r3.settlementType) !== 3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (request_r3 == null ? null : request_r3.transactionType) === 3 && (request_r3 == null ? null : request_r3.settlementType) === 3);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(47, _c2, request_r3.state === 1 || request_r3.state === 4 || request_r3.state === 5 || request_r3.state === 99 || request_r3.state === 3, request_r3.state === 2, request_r3.state === 8));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", request_r3 == null ? null : request_r3.stateTitle, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("icon", ctx_r0.showMoreStates[index_r6] ? "angle-up" : "angle-down");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", request_r3 == null ? null : request_r3.mutualFundSymbol, " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional((request_r3 == null ? null : request_r3.transactionType) === 2 ? 31 : 32);
    \u0275\u0275advance(4);
    \u0275\u0275conditional((request_r3 == null ? null : request_r3.transactionType) === 2 ? 35 : 36);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((request_r3 == null ? null : request_r3.transactionType) === 2 ? 38 : 39);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(request_r3.state !== 8 ? 43 : request_r3.state === 8 ? 44 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(request_r3.state === 8 ? 46 : request_r3.state !== 8 ? 47 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(51, _c2, request_r3.state === 1 || request_r3.state === 4 || request_r3.state === 5 || request_r3.state === 99 || request_r3.state === 3, request_r3.state === 2, request_r3.state === 8));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", request_r3 == null ? null : request_r3.stateTitle, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("icon", ctx_r0.showMoreStates[index_r6] ? "angle-up" : "angle-down");
    \u0275\u0275advance();
    \u0275\u0275classProp("d-none", !ctx_r0.showMoreStates[index_r6]);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", request_r3.ticketNumber || "-", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(request_r3.state != 8 ? 59 : 60);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !!request_r3.confirmedAmount);
  }
}
function RequestsReportComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 49);
    \u0275\u0275element(2, "div", 50);
    \u0275\u0275elementStart(3, "div", 51)(4, "div", 52)(5, "div", 53)(6, "div", 54)(7, "span");
    \u0275\u0275text(8, "\u0645\u062C\u0645\u0648\u0639 \u0648\u0627\u062D\u062F\u0647\u0627");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 54)(13, "span");
    \u0275\u0275text(14, "\u0645\u062C\u0645\u0648\u0639 \u0627\u0631\u0632\u0634");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "number");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275element(18, "div", 55);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(11, 2, ctx_r0.aggregationValues().totalAggrigatedValue2), " \u0648\u0627\u062D\u062F ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(17, 4, ctx_r0.aggregationValues().totalAggrigatedValue1), " \u0631\u06CC\u0627\u0644 ");
  }
}
function RequestsReportComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "img", 56);
    \u0275\u0275elementStart(2, "h5", 57);
    \u0275\u0275text(3, " \u0646\u062A\u06CC\u062C\u0647 \u0627\u06CC \u06CC\u0627\u0641\u062A \u0646\u0634\u062F! ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h6", 58);
    \u0275\u0275text(5, " \u0647\u0646\u0648\u0632 \u0647\u06CC\u0686 \u0627\u0637\u0644\u0627\u0639\u0627\u062A\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A. ");
    \u0275\u0275elementEnd()();
  }
}
function RequestsReportComponent_Conditional_13_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-css-skeleton");
  }
}
function RequestsReportComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, RequestsReportComponent_Conditional_13_For_1_Template, 1, 0, "app-css-skeleton", null, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r0.arrayLength());
  }
}
use([install3, install2, install, install5, install7, install4, install6]);
var _RequestsReportComponent = class _RequestsReportComponent {
  constructor(fundService, requestsReportService, exportService, excelExportService, userSettingsService) {
    this.fundService = fundService;
    this.requestsReportService = requestsReportService;
    this.exportService = exportService;
    this.excelExportService = excelExportService;
    this.userSettingsService = userSettingsService;
    this.requestList = signal([]);
    this.aggregationValues = signal(null);
    this.chartData = [];
    this.isLoading = signal(true);
    this.arrayLength = signal([...Array(3)]);
    this.ngUnsubscribe$ = new Subject();
    this.fontFamily = signal("PeydaWeb");
    this.showMoreStates = {};
  }
  ngOnInit() {
    this.requestsReportService.currentFilter.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((filter2) => {
      if (filter2) {
        this.getRequestsReport(filter2);
        this.filterReq = filter2;
      }
    });
    this.userSettingsService.get(SettingKeys.FaNum).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((value) => {
      if (value.faNum) {
        this.fontFamily.set(value.faNum ? "PeydaWebFaNum" : "PeydaWeb");
      }
    });
  }
  showMore(index) {
    this.showMoreStates[index] = !this.showMoreStates[index];
  }
  getRequestsReport(filter2) {
    this.fundService.getRequests(filter2).pipe(finalize(() => this.isLoading.set(false)), map((data) => {
      if (data && data.result) {
        data.result.forEach((r) => {
          r.createdJalali = r.createdJalali.slice(0, 10);
        });
      }
      return data;
    })).subscribe((result) => {
      if (result.result) {
        this.requestList.set(result.result);
        this.aggregationValues.set({ totalAggrigatedValue1: result.totalAggrigatedValue1, totalAggrigatedValue2: result.totalAggrigatedValue2 });
        if (this.chartData.length <= 0) {
          this.makeGraphData(result.result);
        }
      } else {
        this.isLoading.set(false);
      }
    });
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
  makeGraphData(data) {
    this.chartData = data.filter((item) => item.state === 8).slice(0, 9).map((item) => ({
      money: item.transactionType === 2 ? item.amount : -Math.abs(item.confirmedAmount),
      date: item.dateJalali ? item.dateJalali.split(" ")[0]?.split("/")[1] + "/" + item.dateJalali.split(" ")[0]?.split("/")[2] : ""
    })).reverse();
    this.makeReportChart();
  }
  makeReportChart() {
    const _self = this;
    let xValueAxis = this.chartData.map((item) => item.date);
    let yValueAxis = this.chartData.map((item) => item.money);
    this.chartOption = {
      grid: {
        right: _self.fontFamily() === "PeydaWebFaNum" ? 60 : 45,
        left: "0",
        bottom: "10%",
        top: "15%"
      },
      xAxis: {
        type: "category",
        data: xValueAxis,
        axisLabel: {
          fontFamily: _self.fontFamily(),
          fontSize: 13.6,
          color: "#6F52D4"
        }
      },
      yAxis: {
        type: "value",
        position: "right",
        splitNumber: 3,
        axisLabel: {
          textStyle: {
            fontFamily: _self.fontFamily()
          },
          formatter: (value) => {
            const isFaNum = _self.fontFamily() === "PeydaWebFaNum";
            if (value >= 1e6) {
              return `${Math.round(value / 1e6)} ${isFaNum ? "\u0645\u06CC\u0644\u06CC\u0648\u0646" : "M"}`;
            } else if (value >= 1e3) {
              return `${Math.round(value / 1e3)} ${isFaNum ? "\u0647\u0632\u0627\u0631" : "K"}`;
            } else if (value <= -1e6) {
              return `(${Math.round(value * -1 / 1e6)} ${isFaNum ? "\u0645\u06CC\u0644\u06CC\u0648\u0646" : "M"})`;
            } else if (value <= -1e3) {
              return `(${Math.round(value * -1 / 1e3)} ${isFaNum ? "\u0647\u0632\u0627\u0631" : "K"})`;
            }
            return Math.round(value).toString();
          }
        },
        name: "\u0631\u06CC\u0627\u0644",
        nameLocation: "end",
        nameTextStyle: {
          color: "6F52D4",
          fontSize: 11,
          fontWeight: "bold",
          fontFamily: _self.fontFamily(),
          align: "left",
          verticalAlign: "bottom",
          padding: [5, 0, 0, 8]
        },
        nameGap: 20
      },
      series: [
        {
          type: "bar",
          data: yValueAxis.map((value) => ({
            value,
            itemStyle: {
              color: value > 0 ? "#12b549" : "#ef5350"
            }
          })),
          barWidth: "30%"
        }
      ],
      tooltip: {
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        textStyle: {
          fontFamily: _self.fontFamily(),
          fontSize: 14
        },
        trigger: "axis",
        formatter: function(params) {
          return `<span style ='display:flex;align-items:center;flex-direction:column;padding : 5px; font-family: '${_self.fontFamily()}'>
          <bdi class="d-flex justify-content-start" dir="ltr">
           <span class="px-1">\u0631\u06CC\u0627\u0644</span>
           <span class="fw-bold ${params[0]?.data?.value < 0 ? "text-danger" : "text-success"}">${params[0]?.data?.value < 0 ? "(" : ""}${Math.abs(params[0]?.data?.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${params[0]?.data?.value < 0 ? ")" : ""}</span>
          </bdi>
          <span style='margin-top : 8px; font-family: '${_self.fontFamily()}'>${params[0]?.axisValueLabel}</span>
          </span>`;
        }
      }
    };
  }
  exportToExcel() {
    const columnMapping = {
      mutualFundSymbol: "\u0646\u0627\u0645 \u0635\u0646\u062F\u0648\u0642",
      emissionDateJalali: "\u062A\u0627\u0631\u06CC\u062E \u062A\u0627\u06CC\u06CC\u062F \u06AF\u0648\u0627\u0647\u06CC",
      transactionTypeTitle: "\u0646\u0648\u0639 \u062F\u0631\u062E\u0648\u0627\u0633\u062A",
      volume: "\u062A\u0639\u062F\u0627\u062F \u0648\u0627\u062D\u062F",
      amount: "\u0645\u0628\u0644\u063A",
      ticketNumber: "\u0634\u0645\u0627\u0631\u0647 \u067E\u06CC\u06AF\u06CC\u0631\u06CC"
    };
    this.excelExportService.exportToExcel(this.requestList(), columnMapping, "\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0647\u0627");
  }
  exportToPdf() {
    this.fundService.getRequestsPdf(this.filterReq).subscribe((res) => {
      const faTitle = `\u0644\u06CC\u0633\u062A \u062F\u0631\u062E\u0648\u0627\u0633\u062A\u200C\u0647\u0627-${toPersianDate(/* @__PURE__ */ new Date())}`;
      this.exportService.pdf(res, faTitle);
    });
  }
};
_RequestsReportComponent.\u0275fac = function RequestsReportComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RequestsReportComponent)(\u0275\u0275directiveInject(FundService), \u0275\u0275directiveInject(RequestsReportService), \u0275\u0275directiveInject(ExportService), \u0275\u0275directiveInject(ExcelExportService), \u0275\u0275directiveInject(UserSettingsService));
};
_RequestsReportComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RequestsReportComponent, selectors: [["app-requests-report"]], standalone: true, features: [\u0275\u0275ProvidersFeature([DecimalPipe, provideEchartsCore({ echarts: core_exports }), ExcelExportService]), \u0275\u0275StandaloneFeature], decls: 14, vars: 4, consts: [["more", ""], [1, "d-flex", "flex-column", "align-item-center", "mb-60"], [1, "d-flex", "align-items-center", "justify-content-between", "mb-4"], [1, "text-right", "text-secondary", "mb-0", 2, "color", "#919BA5"], [1, "d-flex"], ["icon", "file-pdf", "size", "lg", 1, "text-danger", "ms-2", "cursor-pointer", "border", "border-1", "p-2", "border-danger", 2, "border-radius", "5px", 3, "click"], ["icon", "file-excel", "size", "lg", 1, "text-success", "ms-2", "cursor-pointer", "border", "border-1", "p-2", "border-success", 2, "border-radius", "5px", 3, "click"], [1, "card", "mx-0", "mb-4"], ["src", "/images/empty-scenario/Group 19763.svg", "alt", "", 1, "img-fluid", "mb-4", 2, "height", "243px", "object-fit", "cover", "border-radius", "15px"], [1, "card", "mx-0", "mb-4", "overflow-hidden"], [1, "d-none", "d-lg-block", "button-action-container"], [1, "w-100", "d-flex", "align-items-center", "justify-content-center", "flex-column", "mt-5", "pt-5"], [1, "card-body", "p-5"], [1, "w-100", "h-100"], ["echarts", "", 2, "height", "243px", 3, "options"], [1, "card-body", "p-0"], [1, "row", "mx-0"], [1, "col-24", "col-md-4", "p-0", 3, "ngClass"], [1, "d-flex", "flex-md-column", "align-items-center", "justify-content-between", "justify-content-md-center", "h-100", "ps-4", "ps-md-0", "pe-2", "pe-md-0"], [1, "d-flex", "flex-md-column", "align-items-center", "justify-content-md-center", "p-1", "p-md-4", "h-100"], ["viewBox", "0 0 24 24", "width", "18px", "height", "18px", 1, "mx-1", 3, "ngClass"], [1, "font-weight-bold", "my-3", 3, "ngClass"], [1, "text-center", "mb-0", "mb-md-3", "px-2", "px-md-0", 3, "ngClass"], [4, "ngIf"], [1, "d-md-none", "d-flex", "align-items-center", "justify-content-between"], [1, "badge", 3, "ngClass"], [1, "bg-primary", "px-2", "py-1", "me-2", "cursor-pointer", 2, "border-radius", "5px", 3, "click"], [1, "text-white", 3, "icon"], [1, "col-24", "col-md-20", "p-4"], [1, "d-flex", "flex-column"], [1, "d-md-flex", "align-items-center", "justify-content-between"], [1, "d-flex", "flex-md-column", "justify-content-between", "justify-content-md-start"], [1, "text-secondary"], [1, "font-weight-bold"], [1, "d-flex", "flex-md-column", "justify-content-between", "justify-content-md-start", "align-items-end", "mt-4", "mt-md-0"], [1, "text-secondary", "text-left"], [1, "d-flex", "align-items-center"], [1, "me-2"], [1, "d-md-flex", "align-items-center", "justify-content-between", "mt-4", "mt-md-3"], [1, "text-secondary", "mb-3"], [1, "d-none", "d-md-flex", "align-items-center", "justify-content-between"], [1, "col-24", "mt-2"], [1, ""], [1, "row", "px-3", "py-2"], ["data-label", "\u0634\u0645\u0627\u0631\u0647 \u067E\u06CC\u06AF\u06CC\u0631\u06CC", "data-label-visible", "true", 1, "col-md-24", "my-2", "d-flex", "justify-content-between"], ["data-label", "\u0648\u0627\u062D\u062F (\u062A\u0642\u0631\u06CC\u0628\u06CC):", "data-label-visible", "true", 1, "col-md-24", "my-2", "d-flex", "justify-content-between"], ["data-label", "\u0648\u0627\u062D\u062F (\u0646\u0647\u0627\u06CC\u06CC):", "data-label-visible", "true", 1, "col-md-24", "my-2", "d-flex", "justify-content-between"], ["class", "col-md-24 my-2 d-flex justify-content-between", "data-label", "\u0645\u0628\u0644\u063A \u062A\u0627\u06CC\u06CC\u062F \u0634\u062F\u0647:", "data-label-visible", "true", 4, "ngIf"], ["data-label", "\u0645\u0628\u0644\u063A \u062A\u0627\u06CC\u06CC\u062F \u0634\u062F\u0647:", "data-label-visible", "true", 1, "col-md-24", "my-2", "d-flex", "justify-content-between"], [1, "container", "d-flex", "h-100", "w-100"], [1, "rightbar"], [1, "row", "w-100", "mx-0", "h-100"], [1, "col-md-16", "mx-0", "h-100", "d-flex"], [1, "w-100", "d-flex", "flex-column", "align-items-center", "justify-content-center", "me-4", "px-2", "bg-white"], [1, "w-100", "d-flex", "align-items-center", "justify-content-between"], [1, "col-md-8"], ["src", "/svg/badge-empty-asset.svg", "width", "96", 1, "img-fluid", "my-3"], [1, "my-2"], [2, "color", "#919BA5"]], template: function RequestsReportComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h5", 3);
    \u0275\u0275text(3, " \u0631\u0648\u0646\u062F \u0633\u0631\u0645\u0627\u06CC\u0647\u200C\u06AF\u0630\u0627\u0631\u06CC \u0648 \u0628\u0631\u062F\u0627\u0634\u062A ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 4)(5, "fa-icon", 5);
    \u0275\u0275listener("click", function RequestsReportComponent_Template_fa_icon_click_5_listener() {
      return ctx.exportToPdf();
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "fa-icon", 6);
    \u0275\u0275listener("click", function RequestsReportComponent_Template_fa_icon_click_6_listener() {
      return ctx.exportToExcel();
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(7, RequestsReportComponent_Conditional_7_Template, 4, 3, "div", 7)(8, RequestsReportComponent_Conditional_8_Template, 1, 0, "img", 8);
    \u0275\u0275repeaterCreate(9, RequestsReportComponent_For_10_Template, 62, 55, "div", 9, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275template(11, RequestsReportComponent_Conditional_11_Template, 19, 6, "div", 10)(12, RequestsReportComponent_Conditional_12_Template, 6, 0, "div", 11)(13, RequestsReportComponent_Conditional_13_Template, 2, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx.chartData.length > 0 ? 7 : 8);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx.requestList());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.requestList().length > 0 && !ctx.isLoading() ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.requestList().length === 0 && !ctx.isLoading() ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isLoading() ? 13 : -1);
  }
}, dependencies: [DecimalPipe, NgIf, FontAwesomeModule, FaIconComponent, NgClass, NgxEchartsDirective, CssSkeletonComponent], styles: ['\n\n[_nghost-%COMP%]   [data-label][_ngcontent-%COMP%]::before {\n  content: attr(data-label);\n  display: inline-block;\n  font-size: 0.75rem;\n  margin-left: 0.5rem;\n}\n[_nghost-%COMP%]   .icon-cell[_ngcontent-%COMP%] {\n  padding: 0;\n}\n@media (min-width: 1400px) {\n  [_nghost-%COMP%]   [data-label][_ngcontent-%COMP%]:not([data-label-visible=true])::before {\n    content: unset;\n  }\n  [_nghost-%COMP%]   .icon-cell[_ngcontent-%COMP%] {\n    width: 42px;\n    max-width: 42px;\n  }\n}\n[_nghost-%COMP%]   .card[_ngcontent-%COMP%] {\n  border-radius: 1rem !important;\n}\n[_nghost-%COMP%]   .subscription[_ngcontent-%COMP%], \n[_nghost-%COMP%]   .redemption[_ngcontent-%COMP%] {\n  overflow: hidden;\n}\n[_nghost-%COMP%]   .subscription[_ngcontent-%COMP%]::after, \n[_nghost-%COMP%]   .redemption[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 9px;\n  height: 100%;\n  border-radius: 0 var(--dtx-border-radius) var(--dtx-border-radius) 0;\n}\n[_nghost-%COMP%]   .subscription[_ngcontent-%COMP%]::after {\n  background:\n    repeating-linear-gradient(\n      45deg,\n      var(--dtx-green),\n      var(--dtx-green) 2px,\n      transparent 2px,\n      transparent 4px);\n}\n[_nghost-%COMP%]   .redemption[_ngcontent-%COMP%]::after {\n  background:\n    repeating-linear-gradient(\n      45deg,\n      var(--dtx-red),\n      var(--dtx-red) 2px,\n      transparent 2px,\n      transparent 4px);\n}\n[_nghost-%COMP%]   .badge[_ngcontent-%COMP%] {\n  padding: 6px 28px;\n  background-color: #fff;\n  border-radius: 5px;\n}\n[_nghost-%COMP%]   .badge-confirm[_ngcontent-%COMP%] {\n  color: rgba(18, 181, 73, 0.7);\n  border: 1.5px solid rgba(18, 181, 73, 0.7);\n}\n[_nghost-%COMP%]   .badge-waiting[_ngcontent-%COMP%] {\n  color: rgba(255, 153, 0, 0.7);\n  border: 1.5px solid rgba(255, 153, 0, 0.7);\n}\n[_nghost-%COMP%]   .badge-pish[_ngcontent-%COMP%] {\n  color: rgba(78, 98, 118, 0.7);\n  border: 1px solid rgba(78, 98, 118, 0.7);\n}\n[_nghost-%COMP%]   .bg-subscription[_ngcontent-%COMP%] {\n  background-color: rgba(18, 181, 73, 0.2);\n}\n[_nghost-%COMP%]   .bg-redemption[_ngcontent-%COMP%] {\n  background-color: rgba(220, 53, 69, 0.2);\n}\n[_nghost-%COMP%]   .bg-gift[_ngcontent-%COMP%] {\n  background-color: rgba(23, 162, 184, 0.2);\n}\n[_nghost-%COMP%]   .button-action-container[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  right: 0;\n  width: 100%;\n  height: 60px;\n  display: flex;\n  z-index: 1055;\n  background-color: #FFFFFF;\n}\n[_nghost-%COMP%]   .button-action-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  flex: 1;\n}\n@media (max-width: 767.98px) {\n  [_nghost-%COMP%]   .badge[_ngcontent-%COMP%] {\n    padding: 6px 28px;\n    background-color: unset !important;\n    border-radius: 5px;\n  }\n  [_nghost-%COMP%]   .badge-confirm[_ngcontent-%COMP%] {\n    color: rgba(18, 181, 73, 0.7);\n    border: 1.5px solid rgba(18, 181, 73, 0.7);\n  }\n  [_nghost-%COMP%]   .badge-waiting[_ngcontent-%COMP%] {\n    color: rgba(255, 153, 0, 0.7);\n    border: 1.5px solid rgba(255, 153, 0, 0.7);\n  }\n  [_nghost-%COMP%]   .badge-pish[_ngcontent-%COMP%] {\n    color: rgba(78, 98, 118, 0.7);\n    border: 1px solid rgba(78, 98, 118, 0.7);\n  }\n}\n/*# sourceMappingURL=requests-report.component.css.map */'], changeDetection: 0 });
var RequestsReportComponent = _RequestsReportComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RequestsReportComponent, { className: "RequestsReportComponent" });
})();

// projects/client/src/app/features/reports/requests-report/requests-filter/requests-filter.component.ts
function RequestsFilterComponent_ng_template_0_ng_option_5_app_svg_viewer_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-svg-viewer", 32);
  }
  if (rf & 2) {
    let tmp_10_0;
    const fund_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("svgUrl", ctx_r2.apiUrl + "/" + ((tmp_10_0 = ctx_r2.getLogo(fund_r4)) == null ? null : tmp_10_0.downloadLink));
  }
}
function RequestsFilterComponent_ng_template_0_ng_option_5_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 33);
  }
}
function RequestsFilterComponent_ng_template_0_ng_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ng-option", 28)(1, "div", 29);
    \u0275\u0275template(2, RequestsFilterComponent_ng_template_0_ng_option_5_app_svg_viewer_2_Template, 1, 1, "app-svg-viewer", 30)(3, RequestsFilterComponent_ng_template_0_ng_option_5_ng_template_3_Template, 1, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(5, "span", 31);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const fund_r4 = ctx.$implicit;
    const logoPlaceholder_r5 = \u0275\u0275reference(4);
    \u0275\u0275property("value", fund_r4.seoRegisterNumber);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", (fund_r4 == null ? null : fund_r4.attachments == null ? null : fund_r4.attachments.length) > 0)("ngIfElse", logoPlaceholder_r5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(fund_r4.symbol);
  }
}
function RequestsFilterComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 14);
    \u0275\u0275listener("submit", function RequestsFilterComponent_ng_template_0_Template_form_submit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.search());
    });
    \u0275\u0275elementStart(1, "div")(2, "label");
    \u0275\u0275text(3, "\u0635\u0646\u062F\u0648\u0642:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ng-select", 15);
    \u0275\u0275template(5, RequestsFilterComponent_ng_template_0_ng_option_5_Template, 7, 4, "ng-option", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "label");
    \u0275\u0275text(8, "\u0634\u0631\u0648\u0639 \u06AF\u0632\u0627\u0631\u0634 \u0627\u0632:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 17)(10, "span", 18);
    \u0275\u0275listener("click", function RequestsFilterComponent_ng_template_0_Template_span_click_10_listener() {
      \u0275\u0275restoreView(_r2);
      const d1_r6 = \u0275\u0275reference(14);
      return \u0275\u0275resetView(d1_r6.toggle());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 19);
    \u0275\u0275element(12, "use", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "input", 21, 2);
    \u0275\u0275listener("click", function RequestsFilterComponent_ng_template_0_Template_input_click_13_listener() {
      \u0275\u0275restoreView(_r2);
      const d1_r6 = \u0275\u0275reference(14);
      return \u0275\u0275resetView(d1_r6.toggle());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div")(16, "label");
    \u0275\u0275text(17, "\u067E\u0627\u06CC\u0627\u0646 \u06AF\u0632\u0627\u0631\u0634 \u062A\u0627:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 17)(19, "span", 18);
    \u0275\u0275listener("click", function RequestsFilterComponent_ng_template_0_Template_span_click_19_listener() {
      \u0275\u0275restoreView(_r2);
      const d2_r7 = \u0275\u0275reference(23);
      return \u0275\u0275resetView(d2_r7.toggle());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(20, "svg", 19);
    \u0275\u0275element(21, "use", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(22, "input", 22, 3);
    \u0275\u0275listener("click", function RequestsFilterComponent_ng_template_0_Template_input_click_22_listener() {
      \u0275\u0275restoreView(_r2);
      const d2_r7 = \u0275\u0275reference(23);
      return \u0275\u0275resetView(d2_r7.toggle());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div")(25, "label");
    \u0275\u0275text(26, "\u0635\u062F\u0648\u0631 \u06CC\u0627 \u0627\u0628\u0637\u0627\u0644: ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(27, "ng-select", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div")(29, "label");
    \u0275\u0275text(30, "\u0648\u0636\u0639\u06CC\u062A \u062F\u0631\u062E\u0648\u0627\u0633\u062A: ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "ng-select", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 25)(33, "button", 26);
    \u0275\u0275element(34, "fa-icon", 27);
    \u0275\u0275elementStart(35, "span");
    \u0275\u0275text(36, "\u062C\u0633\u062A\u062C\u0648");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r2.formGroup);
    \u0275\u0275advance();
    \u0275\u0275classProp("my-2", !ctx_r2.isExtraShortScreen);
    \u0275\u0275advance(3);
    \u0275\u0275property("searchable", false)("clearOnBackspace", true);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.mutualFundList);
    \u0275\u0275advance();
    \u0275\u0275classProp("hidden-row", ctx_r2.isExtraShortScreen)("my-2", !ctx_r2.isExtraShortScreen);
    \u0275\u0275advance(9);
    \u0275\u0275classProp("hidden-row", ctx_r2.isExtraShortScreen)("my-2", !ctx_r2.isExtraShortScreen);
    \u0275\u0275advance(9);
    \u0275\u0275classProp("hidden-row", ctx_r2.isShortScreen)("my-2", !ctx_r2.isExtraShortScreen);
    \u0275\u0275advance(3);
    \u0275\u0275property("searchable", false)("dropdownPosition", "top")("clearOnBackspace", true)("items", ctx_r2.transactionType);
    \u0275\u0275advance();
    \u0275\u0275classProp("hidden-row", ctx_r2.isShortScreen)("my-2", !ctx_r2.isExtraShortScreen);
    \u0275\u0275advance(3);
    \u0275\u0275property("searchable", false)("dropdownPosition", "top")("clearOnBackspace", true)("items", ctx_r2.transactionState);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.formGroup.invalid);
  }
}
function RequestsFilterComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 35);
    \u0275\u0275text(2, " \u0641\u06CC\u0644\u062A\u0631\u0647\u0627 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 36);
    \u0275\u0275elementContainer(4, 6);
    \u0275\u0275elementStart(5, "div", 37)(6, "button", 38);
    \u0275\u0275listener("click", function RequestsFilterComponent_ng_template_22_Template_button_click_6_listener() {
      const modal_r10 = \u0275\u0275restoreView(_r9).$implicit;
      return \u0275\u0275resetView(modal_r10.dismiss("Cross click"));
    });
    \u0275\u0275text(7, "\u0627\u0646\u0635\u0631\u0627\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 39);
    \u0275\u0275listener("click", function RequestsFilterComponent_ng_template_22_Template_button_click_8_listener() {
      const modal_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.applyChanges(ctx_r2.formGroup.value);
      return \u0275\u0275resetView(modal_r10.dismiss("Cross click"));
    });
    \u0275\u0275text(9, " \u0627\u0639\u0645\u0627\u0644 \u0641\u06CC\u0644\u062A\u0631 ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    const filtersForm_r11 = \u0275\u0275reference(1);
    \u0275\u0275advance();
    \u0275\u0275classProp("py-4", !ctx_r2.isExtraShortScreen);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("py-2", ctx_r2.isExtraShortScreen);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", filtersForm_r11);
    \u0275\u0275advance();
    \u0275\u0275classProp("my-4", ctx_r2.isExtraShortScreen)("pt-6", !ctx_r2.isExtraShortScreen);
  }
}
var _RequestsFilterComponent = class _RequestsFilterComponent {
  constructor(requestsReportService, calendar, ngbModal, renderer, cdr) {
    this.requestsReportService = requestsReportService;
    this.calendar = calendar;
    this.ngbModal = ngbModal;
    this.renderer = renderer;
    this.cdr = cdr;
    this.apiUrl = environment.apiUrl;
    this.isShortScreen = false;
    this.isExtraShortScreen = false;
    this.transactionType = TransactionType;
    this.transactionState = TransactionState;
    this.filter = Filter;
    this.mutualFundList = [];
    this.loading = false;
    this.page = 1;
    this.first = 0;
    this.row = 1e3;
    this.sortType = "desc";
    this.sortFiled = "date";
    this.closeResult = signal(null);
    this.threeYearsAgo = calendar.getPrev(calendar.getToday(), "y", 3);
    this.nextWeek = calendar.getNext(calendar.getToday(), "d", 7);
  }
  ngOnInit() {
    this.resizeListener = this.renderer.listen("window", "resize", () => this.checkScreenHeight());
    this.formGroup = new UntypedFormGroup({
      startDate: new UntypedFormControl(this.threeYearsAgo, [Validators.required]),
      endDate: new UntypedFormControl(this.nextWeek, [Validators.required]),
      mutualFundCode: new UntypedFormControl(null, []),
      transactionType: new UntypedFormControl(null, []),
      transactionNumber: new UntypedFormControl(null, []),
      volume: new UntypedFormControl(null, []),
      transactionState: new UntypedFormControl(null, [])
    });
    this.search();
    this.checkScreenHeight();
  }
  search() {
    let startDate = this.formGroup.get("startDate").value;
    let endDate = this.formGroup.get("endDate").value;
    this.page = 1;
    this.filter.optionalFilter.page = this.page;
    this.filter.optionalFilter.take = this.row;
    this.filter.optionalFilter.sort[0].dir = this.sortType;
    this.filter.optionalFilter.sort[0].field = this.sortFiled;
    this.filter.reportFilter.startDate = "" + NgbDatePersianDateToGregorian(startDate);
    this.filter.reportFilter.endDate = "" + NgbDatePersianDateToGregorian(endDate);
    this.filter.reportFilter.mutualFundCode = this.formGroup.get("mutualFundCode").value;
    this.filter.reportFilter.requestTransactionType = this.formGroup.get("transactionType")?.value ? this.formGroup.get("transactionType")?.value : -1;
    this.filter.reportFilter.requestTransactionState = this.formGroup.get("transactionState")?.value ? this.formGroup.get("transactionState")?.value : -1;
    this.filter.reportFilter.id = this.formGroup.get("transactionNumber")?.value ? this.formGroup.get("transactionNumber")?.value : null;
    this.requestsReportService.setFilter(this.filter);
  }
  openModal(content) {
    this.ngbModal.open(content, { modalDialogClass: "filter-modal modal-holder modal-dialog-centered", backdrop: "static" });
  }
  applyChanges(modalFormValues) {
    this.formGroup.patchValue({
      volume: modalFormValues.volume,
      transactionNumber: modalFormValues.transactionNumber,
      transactionType: modalFormValues.transactionType,
      startDate: modalFormValues.startDate,
      endDate: modalFormValues.endDate,
      mutualFundCode: modalFormValues.mutualFundCode
    });
    this.search();
  }
  ngOnDestroy() {
    if (this.resizeListener) {
      this.resizeListener();
    }
  }
  checkScreenHeight() {
    this.isShortScreen = window.innerHeight < 945;
    this.isExtraShortScreen = window.innerHeight < 690;
    this.cdr.detectChanges();
  }
  getLogo(mutualFund) {
    return mutualFund?.attachments?.find((a) => a.categoryId === FundAttachmentTypeEnum.Logo);
  }
};
_RequestsFilterComponent.\u0275fac = function RequestsFilterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RequestsFilterComponent)(\u0275\u0275directiveInject(RequestsReportService), \u0275\u0275directiveInject(NgbCalendar), \u0275\u0275directiveInject(NgbModal), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ChangeDetectorRef));
};
_RequestsFilterComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RequestsFilterComponent, selectors: [["app-requests-filter"]], standalone: true, features: [\u0275\u0275ProvidersFeature([
  { provide: NgbCalendar, useClass: NgbCalendarPersian },
  { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
]), \u0275\u0275StandaloneFeature], decls: 24, vars: 11, consts: [["filtersForm", ""], ["modalContent", ""], ["d1", "ngbDatepicker"], ["d2", "ngbDatepicker"], ["logoPlaceholder", ""], [1, "fixed-filters"], [3, "ngTemplateOutlet"], [1, "text-primary", "cursor-pointer", "mb-4", "py-3", "border-bottom-1", "border-dashed", "border-gray-275", "border-top-0", "border-start-0", "border-end-0", "text-center", "fw-bold", 3, "click"], [1, "d-flex", "align-items-center", "justify-content-between", "m-2"], [1, "w-50", 3, "ngModelChange", "change", "clearable", "dropdownPosition", "searchable", "ngModel"], ["value", "desc"], ["value", "asc"], ["value", "date"], ["value", "amount"], [1, "form-group", "row", "align-items-center", "col-24", "m-0", 3, "submit", "formGroup"], ["bindValue", "seoRegisterNumber", "placeholder", "\u0627\u0646\u062A\u062E\u0627\u0628 \u0635\u0646\u062F\u0648\u0642", "formControlName", "mutualFundCode", 3, "searchable", "clearOnBackspace"], [3, "value", 4, "ngFor", "ngForOf"], [1, "input-group"], [1, "input-group-text", "text-center", "cursor-pointer", 3, "click"], ["viewBox", "0 0 24 24", "width", "18px", "height", "18px", 1, "text-primary"], [0, "xlink", "href", "#ico_calendar"], ["placeholder", "\u062A\u0627\u0631\u06CC\u062E \u0634\u0631\u0648\u0639", "name", "dp2", "formControlName", "startDate", "ngbDatepicker", "", "ngbDatepicker", "", "container", "body", 1, "form-control", 3, "click"], ["placeholder", "\u062A\u0627\u0631\u06CC\u062E \u067E\u0627\u06CC\u0627\u0646", "name", "dp2", "formControlName", "endDate", "ngbDatepicker", "", "container", "body", 1, "form-control", 3, "click"], ["bindValue", "code", "bindLabel", "title", "placeholder", "\u0646\u0648\u0639 \u062F\u0631\u062E\u0648\u0627\u0633\u062A", "formControlName", "transactionType", 3, "searchable", "dropdownPosition", "clearOnBackspace", "items"], ["bindValue", "code", "bindLabel", "title", "placeholder", "\u0648\u0636\u0639\u06CC\u062A \u062F\u0631\u062E\u0648\u0627\u0633\u062A", "formControlName", "transactionState", 3, "searchable", "dropdownPosition", "clearOnBackspace", "items"], [1, "my-2", "btn-submit-row"], ["type", "submit", 1, "btn", "d-flex", "btn-primary", "align-items-center", "justify-content-center", "w-100", 3, "disabled"], ["icon", "search", 1, "mx-2"], [3, "value"], [1, "d-flex", "align-items-center", "justify-content-start"], ["style", "width: 20px;", 3, "svgUrl", 4, "ngIf", "ngIfElse"], [1, "mx-1"], [2, "width", "20px", 3, "svgUrl"], [1, "logo-loading-placeholder"], [1, "card", "overflow-hidden"], [1, "card-header", "bg-primary", "text-center", "text-white", "py-2"], [1, "card-body", "p-4"], [1, "border-0", "w-100", "d-flex"], [1, "btn", "w-50", "btn-cancel", "rounded-pill", "ms-1", 3, "click"], [1, "w-50", "btn", "btn-primary", "rounded-pill", "text-white", 3, "click"]], template: function RequestsFilterComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275template(0, RequestsFilterComponent_ng_template_0_Template, 37, 31, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(2, "div", 5);
    \u0275\u0275elementContainer(3, 6);
    \u0275\u0275elementStart(4, "div", 7);
    \u0275\u0275listener("click", function RequestsFilterComponent_Template_div_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const modalContent_r8 = \u0275\u0275reference(23);
      return \u0275\u0275resetView(ctx.openModal(modalContent_r8));
    });
    \u0275\u0275text(5, " \u062C\u0633\u062A\u062C\u0648\u06CC \u067E\u06CC\u0634\u0631\u0641\u062A\u0647");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 8)(7, "span");
    \u0275\u0275text(8, "\u0645\u0631\u062A\u0628\u200C\u0633\u0627\u0632\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "ng-select", 9);
    \u0275\u0275twoWayListener("ngModelChange", function RequestsFilterComponent_Template_ng_select_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.sortType, $event) || (ctx.sortType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function RequestsFilterComponent_Template_ng_select_change_9_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.search());
    });
    \u0275\u0275elementStart(10, "ng-option", 10);
    \u0275\u0275text(11, "\u0635\u0639\u0648\u062F\u06CC\u200C");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "ng-option", 11);
    \u0275\u0275text(13, "\u0646\u0632\u0648\u0644\u06CC");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 8)(15, "span");
    \u0275\u0275text(16, "\u0628\u0631\u0627\u0633\u0627\u0633");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "ng-select", 9);
    \u0275\u0275twoWayListener("ngModelChange", function RequestsFilterComponent_Template_ng_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.sortFiled, $event) || (ctx.sortFiled = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function RequestsFilterComponent_Template_ng_select_change_17_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.search());
    });
    \u0275\u0275elementStart(18, "ng-option", 12);
    \u0275\u0275text(19, "\u062A\u0627\u0631\u06CC\u062E \u062B\u0628\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "ng-option", 13);
    \u0275\u0275text(21, "\u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(22, RequestsFilterComponent_ng_template_22_Template, 10, 9, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
  }
  if (rf & 2) {
    const filtersForm_r11 = \u0275\u0275reference(1);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngTemplateOutlet", filtersForm_r11);
    \u0275\u0275advance();
    \u0275\u0275classProp("hidden-row", !ctx.isShortScreen);
    \u0275\u0275advance(5);
    \u0275\u0275property("clearable", false)("dropdownPosition", "top")("searchable", false);
    \u0275\u0275twoWayProperty("ngModel", ctx.sortType);
    \u0275\u0275advance(8);
    \u0275\u0275property("clearable", false)("dropdownPosition", "top")("searchable", false);
    \u0275\u0275twoWayProperty("ngModel", ctx.sortFiled);
  }
}, dependencies: [NgSelectModule, NgSelectComponent, NgOptionComponent, NgbDatepickerModule, NgbInputDatepicker, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, NgForOf, NgIf, FontAwesomeModule, FaIconComponent, FormsModule, NgModel, NgTemplateOutlet, SvgViewerComponent], styles: ["\n\n[_nghost-%COMP%] {\n  height: 100%;\n  display: block;\n  max-height: calc(100vh - 14.2rem);\n}\n.fixed-filters[_ngcontent-%COMP%]   .hidden-row[_ngcontent-%COMP%] {\n  display: none;\n}\n.logo-loading-placeholder[_ngcontent-%COMP%] {\n  width: 20px;\n  min-width: 20px;\n  height: 20px;\n  border-radius: 40%;\n  background:\n    linear-gradient(\n      90deg,\n      #f3f3f3 25%,\n      #e0e0e0 50%,\n      #f3f3f3 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.2s infinite linear;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n/*# sourceMappingURL=requests-filter.component.css.map */"], changeDetection: 0 });
var RequestsFilterComponent = _RequestsFilterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RequestsFilterComponent, { className: "RequestsFilterComponent" });
})();

// projects/client/src/app/features/reports/payment-report/payment-report.service.ts
var _PaymentReportService = class _PaymentReportService {
  constructor() {
    this.filter = new Subject();
    this.currentFilter = this.filter.asObservable();
  }
  setFilter(filter2) {
    this.filter.next(filter2);
  }
};
_PaymentReportService.\u0275fac = function PaymentReportService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PaymentReportService)();
};
_PaymentReportService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PaymentReportService, factory: _PaymentReportService.\u0275fac, providedIn: "root" });
var PaymentReportService = _PaymentReportService;

// projects/client/src/app/features/reports/payment-report/payment-report.component.ts
function PaymentReportComponent_Conditional_3_For_1_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "span", 37);
    \u0275\u0275listener("click", function PaymentReportComponent_Conditional_3_For_1_Conditional_17_Template_span_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275nextContext();
      const index_r2 = \u0275\u0275readContextLet(1);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.showMore(index_r2));
    });
    \u0275\u0275element(2, "fa-icon", 38);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const index_r2 = \u0275\u0275readContextLet(1);
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("icon", ctx_r2.showMoreStates[index_r2] ? "angle-up" : "angle-down");
  }
}
function PaymentReportComponent_Conditional_3_For_1_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 39)(2, "span", 40);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 37);
    \u0275\u0275listener("click", function PaymentReportComponent_Conditional_3_For_1_Conditional_52_Template_span_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      \u0275\u0275nextContext();
      const index_r2 = \u0275\u0275readContextLet(1);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.showMore(index_r2));
    });
    \u0275\u0275element(5, "fa-icon", 38);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const request_r5 = \u0275\u0275nextContext().$implicit;
    const index_r2 = \u0275\u0275readContextLet(1);
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (request_r5 == null ? null : request_r5.gatewayTitle) || (request_r5 == null ? null : request_r5.type), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("icon", ctx_r2.showMoreStates[index_r2] ? "angle-up" : "angle-down");
  }
}
function PaymentReportComponent_Conditional_3_For_1_Conditional_55_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43)(1, "span", 45);
    \u0275\u0275text(2, "\u0644\u06CC\u0646\u06A9 \u062F\u0627\u0646\u0644\u0648\u062F \u0641\u06CC\u0634");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "fa-icon", 46);
    \u0275\u0275elementEnd();
  }
}
function PaymentReportComponent_Conditional_3_For_1_Conditional_55_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 44)(1, "span", 47);
    \u0275\u0275text(2, "\u0644\u06CC\u0646\u06A9 \u062F\u0627\u0646\u0644\u0648\u062F \u0641\u06CC\u0634");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "fa-icon", 46);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const request_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275propertyInterpolate1("href", "https://clientapi.ipasargad.ir/api/profilemanagement/download/", request_r5 == null ? null : request_r5.attachmentId, "", \u0275\u0275sanitizeUrl);
  }
}
function PaymentReportComponent_Conditional_3_For_1_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 24)(2, "h5", 25);
    \u0275\u0275text(3, " \u0634\u0645\u0627\u0631\u0647 \u062D\u0633\u0627\u0628 \u0645\u0642\u0635\u062F \u0641\u06CC\u0634 \u0648\u0627\u0631\u06CC\u0632: ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h5", 41);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 27)(7, "h5", 25);
    \u0275\u0275text(8, " \u0646\u0627\u0645 \u0628\u0627\u0646\u06A9 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "h5", 41);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 30)(12, "div", 42);
    \u0275\u0275template(13, PaymentReportComponent_Conditional_3_For_1_Conditional_55_Conditional_13_Template, 4, 0, "span", 43)(14, PaymentReportComponent_Conditional_3_For_1_Conditional_55_Conditional_14_Template, 4, 2, "a", 44);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const request_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (request_r5 == null ? null : request_r5.accountNumber) || "--", " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", request_r5 == null ? null : request_r5.bankName, " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(!(request_r5 == null ? null : request_r5.attachmentId) ? 13 : 14);
  }
}
function PaymentReportComponent_Conditional_3_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275declareLet(0)(1);
    \u0275\u0275elementStart(2, "div", 6)(3, "div", 14)(4, "div", 15)(5, "div")(6, "div", 16)(7, "div", 17);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 18);
    \u0275\u0275element(9, "use");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "h5");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 19);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 18);
    \u0275\u0275element(14, "use");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(15, "h6", 20);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, PaymentReportComponent_Conditional_3_For_1_Conditional_17_Template, 3, 1, "div", 19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 21)(19, "div", 22)(20, "div", 23)(21, "div", 24)(22, "h5", 25);
    \u0275\u0275text(23, " \u0635\u0646\u062F\u0648\u0642 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "h5", 26);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 27)(27, "h5", 28);
    \u0275\u0275text(28, " \u0645\u0628\u0644\u063A ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "h5");
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "number");
    \u0275\u0275elementStart(32, "span", 29);
    \u0275\u0275text(33, " \u0631\u06CC\u0627\u0644 ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(34, "div", 30)(35, "div", 24)(36, "h5", 25);
    \u0275\u0275text(37, " \u062A\u0627\u0631\u06CC\u062E ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 31)(39, "h5", 32);
    \u0275\u0275text(40);
    \u0275\u0275elementStart(41, "span", 33);
    \u0275\u0275text(42, "/");
    \u0275\u0275elementEnd();
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(44, "div", 27)(45, "h5", 28);
    \u0275\u0275text(46, " \u06A9\u062F \u067E\u06CC\u06AF\u06CC\u0631\u06CC ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 31);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(48, "svg", 34);
    \u0275\u0275element(49, "use");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(50, "h5", 32);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(52, PaymentReportComponent_Conditional_3_For_1_Conditional_52_Template, 6, 2, "div", 35);
    \u0275\u0275elementStart(53, "div", 36, 0);
    \u0275\u0275template(55, PaymentReportComponent_Conditional_3_For_1_Conditional_55_Template, 15, 3);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const request_r5 = ctx.$implicit;
    const $index_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    const requestUiDetails_r7 = ctx_r2.getRequestUiDetails(request_r5);
    \u0275\u0275advance();
    const index_r8 = \u0275\u0275storeLet($index_r6);
    \u0275\u0275advance(4);
    \u0275\u0275classMapInterpolate1("col-24 col-md-4 p-0 ", requestUiDetails_r7.reqStatusBgClass, "");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(requestUiDetails_r7.reqStatusTextClass);
    \u0275\u0275advance();
    \u0275\u0275attribute("href", requestUiDetails_r7.reqStatusIcon === "circle-check" ? "#ico_s_box_accept" : requestUiDetails_r7.reqStatusIcon === "stopwatch" ? "#ico_s_box_more" : requestUiDetails_r7.reqStatusIcon === "circle-xmark" ? "#ico_s_box_multiplication" : "", null, "xlink");
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1(" ", requestUiDetails_r7.reqStatusTextClass, " text-nowrap my-3 my-md-2 me-1 me-md-0");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(request_r5.stateTitle);
    \u0275\u0275advance(3);
    \u0275\u0275attribute("href", requestUiDetails_r7.reqTypeIcon === "money-bill-wave" ? "#ico_s_bank_card" : "#ico_s_display_add", null, "xlink");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((request_r5 == null ? null : request_r5.gatewayTitle) || (request_r5 == null ? null : request_r5.type));
    \u0275\u0275advance();
    \u0275\u0275conditional((request_r5 == null ? null : request_r5.type) === ctx_r2.commonPaymentTypeEnum.Receipt ? 17 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", request_r5.mutualFundSymbol || "--", " ");
    \u0275\u0275advance(4);
    \u0275\u0275classMapInterpolate1("text-left ", requestUiDetails_r7.reqStatusTextClass, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(31, 28, request_r5.amount), " ");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1(" ", (request_r5.dateJalali == null ? null : request_r5.dateJalali.split(" ")[1]) || (request_r5.transferDateJalali == null ? null : request_r5.transferDateJalali.split(" ")[1]), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (request_r5.dateJalali == null ? null : request_r5.dateJalali.split(" ")[0]) || (request_r5.transferDateJalali == null ? null : request_r5.transferDateJalali.split(" ")[0]), " ");
    \u0275\u0275advance(6);
    \u0275\u0275attribute("href", requestUiDetails_r7.reqTypeIcon === "money-bill-wave" ? "#ico_s_bank_card" : "#ico_s_display_add", null, "xlink");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (request_r5 == null ? null : request_r5.traceNo) || "--", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional((request_r5 == null ? null : request_r5.type) === ctx_r2.commonPaymentTypeEnum.Receipt ? 52 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("d-none", !ctx_r2.showMoreStates[index_r8]);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((request_r5 == null ? null : request_r5.type) === ctx_r2.commonPaymentTypeEnum.Receipt ? 55 : -1);
  }
}
function PaymentReportComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, PaymentReportComponent_Conditional_3_For_1_Template, 56, 30, "div", 6, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(2, "div", 4)(3, "div", 7)(4, "div", 8);
    \u0275\u0275element(5, "div", 9);
    \u0275\u0275elementStart(6, "div", 10)(7, "div", 11)(8, "div", 12)(9, "span");
    \u0275\u0275text(10, "\u0645\u062C\u0645\u0648\u0639 \u06A9\u0644 \u0645\u0628\u0627\u0644\u063A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275element(14, "div", 13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.requestList());
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(13, 1, ctx_r2.aggregationValues().totalAggrigatedValue1), " \u0631\u06CC\u0627\u0644 ");
  }
}
function PaymentReportComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "img", 48);
    \u0275\u0275elementStart(2, "h5", 49);
    \u0275\u0275text(3, " \u0646\u062A\u06CC\u062C\u0647 \u0627\u06CC \u06CC\u0627\u0641\u062A \u0646\u0634\u062F! ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h6", 50);
    \u0275\u0275text(5, " \u0647\u0646\u0648\u0632 \u0647\u06CC\u0686 \u0627\u0637\u0644\u0627\u0639\u0627\u062A\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A. ");
    \u0275\u0275elementEnd()();
  }
}
function PaymentReportComponent_Conditional_5_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-css-skeleton");
  }
}
function PaymentReportComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, PaymentReportComponent_Conditional_5_For_1_Template, 1, 0, "app-css-skeleton", null, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.arrayLength());
  }
}
var _PaymentReportComponent = class _PaymentReportComponent {
  constructor(fundService, podService, paymentReportService, excelExportService, router) {
    this.fundService = fundService;
    this.podService = podService;
    this.paymentReportService = paymentReportService;
    this.excelExportService = excelExportService;
    this.router = router;
    this.requestList = signal([]);
    this.destroy$ = new Subject();
    this.isLoading = signal(true);
    this.arrayLength = signal([...Array(3)]);
    this.aggregationValues = signal(null);
    this.commonPaymentTypeEnum = CommonPaymentTypeEnum;
    this.showMoreStates = {};
  }
  ngOnInit() {
    this.paymentReportService.currentFilter.pipe(takeUntil(this.destroy$)).subscribe((filter2) => {
      if (filter2) {
        this.getData(filter2);
      }
    });
  }
  getData(filter2) {
    this.isLoading.set(true);
    forkJoin([
      this.fundService.getReceivesAndOnlinePayments(filter2.transfersFilter)
      // this.podService.getPodTransferList(filter.podTransfersFilter)
    ]).pipe(finalize(() => this.isLoading.set(false))).subscribe(([transactions]) => {
      this.aggregationValues.set({ totalAggrigatedValue1: transactions.totalAggrigatedValue1 });
      let sortType = filter2.transfersFilter.optionalFilter.sort[0].dir;
      let sortField = filter2.transfersFilter.optionalFilter.sort[0].field;
      let fullList = [...transactions.result];
      switch (true) {
        case (sortType == "desc" && sortField == "date"):
          fullList = fullList.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case (sortType == "asc" && sortField == "date"):
          fullList = fullList.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case (sortType == "asc" && sortField == "amount"):
          fullList = fullList.sort((a, b) => a.amount - b.amount);
          break;
        case (sortType == "desc" && sortField == "amount"):
          fullList = fullList.sort((a, b) => b.amount - a.amount);
          break;
        default:
          fullList = fullList.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
      }
      if (filter2.transfersFilter.reportFilter.state != -1) {
        const stateTitles = filter2.transfersFilter.reportFilter.state == 2 ? ["\u0646\u0627\u0645\u0648\u0641\u0642", "\u0631\u062F \u0634\u062F\u0647"] : ["\u0645\u0648\u0641\u0642"];
        fullList = fullList.filter((item) => stateTitles.includes(item.stateTitle));
      }
      this.requestList.set(fullList);
    });
  }
  showMore(index) {
    this.showMoreStates[index] = !this.showMoreStates[index];
  }
  getRequestUiDetails(request) {
    const stateIconMap = {
      "\u0645\u0648\u0641\u0642": "circle-check",
      "\u0631\u062F \u0634\u062F\u0647": "circle-xmark",
      "\u0646\u0627\u0645\u0648\u0641\u0642": "circle-xmark",
      "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC": "stopwatch",
      "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631": "stopwatch",
      "\u0646\u0627\u0645\u0634\u062E\u0635": "stopwatch",
      default: "stopwatch"
    };
    const stateBgClassMap = {
      "\u0645\u0648\u0641\u0642": "bg-success-200",
      "\u0631\u062F \u0634\u062F\u0647": "bg-danger-200",
      "\u0646\u0627\u0645\u0648\u0641\u0642": "bg-danger-200",
      "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC": "bg-primary-200",
      "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631": "bg-primary-200",
      "\u0646\u0627\u0645\u0634\u062E\u0635": "bg-primary-200",
      default: "bg-primary-200"
    };
    const stateTextClassMap = {
      "\u0645\u0648\u0641\u0642": "text-success",
      "\u0631\u062F \u0634\u062F\u0647": "text-danger",
      "\u0646\u0627\u0645\u0648\u0641\u0642": "text-danger",
      "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC": "text-primary",
      "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631": "bg-primary-200",
      "\u0646\u0627\u0645\u0634\u062E\u0635": "bg-primary-200",
      default: "text-primary"
    };
    return {
      reqTypeIcon: request.type === CommonPaymentTypeEnum.Receipt ? "money-bill-wave" : request.type === CommonPaymentTypeEnum.Online ? "desktop" : "credit-card",
      reqTypeTitle: request.type === CommonPaymentTypeEnum.Receipt ? "\u0641\u06CC\u0634 \u0648\u0627\u0631\u06CC\u0632\u06CC" : request.type === CommonPaymentTypeEnum.Online ? "\u062F\u0631\u06AF\u0627\u0647 \u0628\u0627\u0646\u06A9\u06CC" : "\u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0633\u062A\u0642\u06CC\u0645",
      reqStatusIcon: stateIconMap[request.stateTitle] || stateIconMap.default,
      reqStatusBgClass: stateBgClassMap[request.stateTitle] || stateBgClassMap.default,
      reqStatusTextClass: stateTextClassMap[request.stateTitle] || stateTextClassMap.default
    };
  }
  exportToExcel() {
    const columnMapping = {
      mutualFundSymbol: "\u0646\u0627\u0645 \u0635\u0646\u062F\u0648\u0642",
      amount: "\u0645\u0628\u0644\u063A",
      dateJalali: "\u062A\u0627\u0631\u06CC\u062E",
      traceNo: "\u06A9\u062F \u067E\u06CC\u06AF\u06CC\u0631\u06CC",
      gatewayTitle: "\u0646\u0648\u0639 \u0648\u0627\u0631\u06CC\u0632",
      accountNumber: "\u0634\u0645\u0627\u0631\u0647 \u062D\u0633\u0627\u0628 \u0645\u0642\u0635\u062F \u0641\u06CC\u0634",
      bankName: "\u0646\u0627\u0645 \u0628\u0627\u0646\u06A9"
    };
    this.excelExportService.exportToExcel(this.requestList(), columnMapping, "\u0648\u0627\u0631\u06CC\u0632\u0647\u0627");
  }
  ngOnDestroy() {
    this.destroy$.next(0);
    this.destroy$.complete();
  }
};
_PaymentReportComponent.\u0275fac = function PaymentReportComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PaymentReportComponent)(\u0275\u0275directiveInject(FundService), \u0275\u0275directiveInject(PodService), \u0275\u0275directiveInject(PaymentReportService), \u0275\u0275directiveInject(ExcelExportService), \u0275\u0275directiveInject(Router));
};
_PaymentReportComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentReportComponent, selectors: [["app-payment-report"]], standalone: true, features: [\u0275\u0275ProvidersFeature([ExcelExportService]), \u0275\u0275StandaloneFeature], decls: 6, vars: 3, consts: [["more", ""], [1, "d-flex", "flex-column", "align-item-center", "mb-60"], [1, "d-flex", "align-items-center", "justify-content-end", "mb-4"], ["icon", "file-excel", "size", "lg", 1, "text-success", "ms-2", "cursor-pointer", "border", "border-1", "p-2", "border-success", 2, "border-radius", "5px", 3, "click"], [1, "d-none", "d-lg-block", "button-action-container"], [1, "w-100", "d-flex", "align-items-center", "justify-content-center", "flex-column", "mt-5", "pt-5"], [1, "card", "mx-0", "mb-4", "overflow-hidden"], [1, "container", "h-100", "w-100"], [1, "row", "mx-0", "h-100"], [1, "col-md-5"], [1, "col-md-13", "h-100", "d-flex", "total-row"], [1, "w-100", "d-flex", "flex-column", "align-items-center", "justify-content-center", "w-100", "bg-white"], [1, "w-100", "px-4", "d-flex", "align-items-center", "justify-content-between"], [1, "col-md-6"], [1, "card-body", "p-0"], [1, "row", "mx-0"], [1, "d-flex", "flex-md-column", "align-items-center", "justify-content-between", "justify-content-md-center", "h-100", "ps-4", "ps-md-0", "pe-2", "pe-md-0"], [1, "d-flex", "flex-md-column", "align-items-center", "justify-content-md-center", "p-1", "p-md-4", "h-100"], ["viewBox", "0 0 24 24", "width", "18px", "height", "18px", 1, "mx-1"], [1, "d-md-none", "d-flex", "align-items-center", "justify-content-between"], [1, "my-3", "my-md-2"], [1, "col-24", "col-md-20", "p-4"], [1, "w-100", "d-flex", "align-items-center", "flex-column"], [1, "d-md-flex", "w-100", "align-items-center", "justify-content-between"], [1, "d-flex", "flex-md-column", "justify-content-between", "justify-content-md-start"], [1, "text-secondary"], [1, "font-weight-bold"], [1, "d-flex", "flex-md-column", "justify-content-between", "justify-content-md-start", "align-items-end", "mt-4", "mt-md-0"], [1, "text-secondary", "text-left"], [1, "text-secondary", "small", "me-1", "font-weight-bold"], [1, "d-md-flex", "w-100", "align-items-center", "justify-content-between", "mt-4", "mt-md-3"], [1, "d-flex"], [1, "text-center"], [1, "mx-1"], ["viewBox", "0 0 24 24", "width", "18px", "height", "18px", 1, "mx-1", "d-md-block", "d-none", "pb-1"], [1, "d-md-flex", "w-100", "align-items-center", "justify-content-end", "mt-4", "mt-md-3"], [1, "col-24", "mt-2"], [1, "bg-primary", "px-2", "py-1", "me-2", "cursor-pointer", 2, "border-radius", "5px", 3, "click"], [1, "text-white", 3, "icon"], [1, "d-none", "d-md-flex", "align-items-center", "justify-content-between"], [1, ""], [1, "text-left"], [1, "d-md-flex", "flex-md-column", "justify-content-between", "align-items-end", "mt-4", "mt-md-0"], ["ngbTooltip", "\u062A\u0635\u0648\u06CC\u0631\u06CC \u0622\u067E\u0644\u0648\u062F \u0646\u0634\u062F\u0647 \u0627\u0633\u062A", 1, "d-flex", "align-items-center", "text-center", "justify-content-center", "flex-column"], ["target", "_blank", "download", "", 1, "d-flex", "align-items-center", "text-center", "justify-content-center", 3, "href"], [1, "mb-3"], ["icon", "download", 1, ""], [1, "ms-2"], ["src", "/svg/badge-empty-asset.svg", "width", "96", 1, "img-fluid", "my-3"], [1, "my-2"], [2, "color", "#919BA5"]], template: function PaymentReportComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "fa-icon", 3);
    \u0275\u0275listener("click", function PaymentReportComponent_Template_fa_icon_click_2_listener() {
      return ctx.exportToExcel();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(3, PaymentReportComponent_Conditional_3_Template, 15, 3, "div", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, PaymentReportComponent_Conditional_4_Template, 6, 0, "div", 5)(5, PaymentReportComponent_Conditional_5_Template, 2, 0);
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.requestList().length > 0 && !ctx.isLoading() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.requestList().length === 0 && !ctx.isLoading() ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isLoading() ? 5 : -1);
  }
}, dependencies: [DecimalPipe, FontAwesomeModule, FaIconComponent, NgbTooltip, CssSkeletonComponent], styles: ["\n\n[_nghost-%COMP%]   .total-row[_ngcontent-%COMP%] {\n  padding-left: 28px;\n  margin: 0 -2px;\n}\n[_nghost-%COMP%]   [data-label][_ngcontent-%COMP%]::before {\n  content: attr(data-label);\n  display: inline-block;\n  font-size: 0.75rem;\n  margin-left: 0.5rem;\n}\n[_nghost-%COMP%]   .icon-cell[_ngcontent-%COMP%] {\n  padding: 0;\n}\n[_nghost-%COMP%]   .card[_ngcontent-%COMP%] {\n  border-radius: 1rem !important;\n}\n@media (min-width: 1400px) {\n  [_nghost-%COMP%]   [data-label][_ngcontent-%COMP%]:not([data-label-visible=true])::before {\n    content: unset;\n  }\n  [_nghost-%COMP%]   .icon-cell[_ngcontent-%COMP%] {\n    width: 42px;\n    max-width: 42px;\n  }\n}\n[_nghost-%COMP%]   .button-action-container[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  right: 0;\n  width: 100%;\n  height: 75px;\n  display: flex;\n  z-index: 1055;\n  background-color: #FFFFFF;\n}\n[_nghost-%COMP%]   .button-action-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  flex: 1;\n}\n/*# sourceMappingURL=payment-report.component.css.map */"], changeDetection: 0 });
var PaymentReportComponent = _PaymentReportComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentReportComponent, { className: "PaymentReportComponent" });
})();

// projects/client/src/app/features/reports/payment-report/payment-filter/payment-filter.component.ts
function PaymentFilterComponent_ng_option_5_app_svg_viewer_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-svg-viewer", 30);
  }
  if (rf & 2) {
    let tmp_7_0;
    const fund_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("svgUrl", ctx_r2.apiUrl + "/" + ((tmp_7_0 = ctx_r2.getLogo(fund_r2)) == null ? null : tmp_7_0.downloadLink));
  }
}
function PaymentFilterComponent_ng_option_5_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 31);
  }
}
function PaymentFilterComponent_ng_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ng-option", 26)(1, "div", 27);
    \u0275\u0275template(2, PaymentFilterComponent_ng_option_5_app_svg_viewer_2_Template, 1, 1, "app-svg-viewer", 28)(3, PaymentFilterComponent_ng_option_5_ng_template_3_Template, 1, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(5, "span", 29);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const fund_r2 = ctx.$implicit;
    const logoPlaceholder_r4 = \u0275\u0275reference(4);
    \u0275\u0275property("value", fund_r2.mutualFundId);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", (fund_r2 == null ? null : fund_r2.attachments == null ? null : fund_r2.attachments.length) > 0)("ngIfElse", logoPlaceholder_r4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(fund_r2.symbol);
  }
}
var _PaymentFilterComponent = class _PaymentFilterComponent {
  constructor(paymentReportService, calendar) {
    this.paymentReportService = paymentReportService;
    this.calendar = calendar;
    this.apiUrl = environment.apiUrl;
    this.mutualFundList = [];
    this.loading = false;
    this.page = 1;
    this.first = 0;
    this.row = 1e3;
    this.sortType = "desc";
    this.sortFiled = "date";
    this.filter = {
      transfersFilter: {
        reportFilter: {
          dateFilter: {
            startDate: "0",
            endDate: "0"
          },
          phrase: "",
          nationalId: "",
          mutualFundId: "",
          bankDepositId: 0,
          banKNameId: 0,
          gateway: 0,
          state: -1
        },
        optionalFilter: {
          take: this.row,
          skip: 0,
          page: 0,
          value: "",
          sort: [
            {
              field: "",
              dir: ""
            }
          ]
        },
        branchId: 0
      },
      podTransfersFilter: {
        amount: {
          fromAmount: null,
          toAmount: null
        },
        date: {
          startDate: "",
          endDate: ""
        },
        paymentReferenceNumber: void 0,
        offset: 0,
        pageSize: 1e4
      }
    };
    this.today = this.calendar.getToday();
    this.threeYearsAgo = calendar.getPrev(calendar.getToday(), "y", 3);
  }
  ngOnInit() {
    this.formGroup = new UntypedFormGroup({
      startDate: new UntypedFormControl(this.threeYearsAgo, [Validators.required]),
      endDate: new UntypedFormControl(this.today, [Validators.required]),
      mutualFundId: new UntypedFormControl(null, []),
      depositNumber: new UntypedFormControl(null, []),
      state: new UntypedFormControl("\u0647\u0645\u0647"),
      amount: new UntypedFormControl(null, []),
      receiptNumber: new UntypedFormControl(null, [])
    });
    this.search();
  }
  search() {
    let startDate = this.formGroup.get("startDate").value;
    let endDate = this.formGroup.get("endDate").value;
    this.page = 1;
    this.filter.transfersFilter.optionalFilter.page = this.page;
    this.filter.transfersFilter.optionalFilter.take = this.row;
    this.filter.transfersFilter.optionalFilter.sort[0].dir = this.sortType;
    this.filter.transfersFilter.optionalFilter.sort[0].field = this.sortFiled;
    this.filter.transfersFilter.reportFilter.dateFilter.startDate = "" + NgbDatePersianDateToGregorian(startDate);
    this.filter.transfersFilter.reportFilter.dateFilter.endDate = "" + NgbDatePersianDateToGregorian(endDate);
    this.filter.podTransfersFilter.date.startDate = "" + NgbDatePersianDateToGregorian(startDate);
    this.filter.podTransfersFilter.date.endDate = "" + NgbDatePersianDateToGregorian(endDate);
    this.filter.transfersFilter.reportFilter.mutualFundId = this.formGroup.get("mutualFundId").value;
    if (this.formGroup.get("state").value != "\u0647\u0645\u0647")
      this.filter.transfersFilter.reportFilter.state = this.formGroup.get("state").value;
    this.paymentReportService.setFilter(this.filter);
  }
  getLogo(mutualFund) {
    return mutualFund?.attachments?.find((a) => a.categoryId === FundAttachmentTypeEnum.Logo);
  }
};
_PaymentFilterComponent.\u0275fac = function PaymentFilterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PaymentFilterComponent)(\u0275\u0275directiveInject(PaymentReportService), \u0275\u0275directiveInject(NgbCalendar));
};
_PaymentFilterComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentFilterComponent, selectors: [["app-payment-filter"]], standalone: true, features: [\u0275\u0275ProvidersFeature([
  { provide: NgbCalendar, useClass: NgbCalendarPersian },
  { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
]), \u0275\u0275StandaloneFeature], decls: 55, vars: 15, consts: [["d1", "ngbDatepicker"], ["d2", "ngbDatepicker"], ["logoPlaceholder", ""], [1, "form-group", "row", "align-items-center", "col-24", "m-0", 3, "submit", "formGroup"], [1, "my-2"], ["bindValue", "mutualFundId", "placeholder", "\u0627\u0646\u062A\u062E\u0627\u0628 \u0635\u0646\u062F\u0648\u0642", "formControlName", "mutualFundId", 3, "searchable", "clearOnBackspace"], [3, "value", 4, "ngFor", "ngForOf"], [1, "input-group"], [1, "input-group-text", "text-center", "cursor-pointer", 3, "click"], ["viewBox", "0 0 24 24", "width", "18px", "height", "18px", 1, "text-primary"], [0, "xlink", "href", "#ico_calendar"], ["placeholder", "\u062A\u0627\u0631\u06CC\u062E \u0634\u0631\u0648\u0639", "name", "dp2", "formControlName", "startDate", "ngbDatepicker", "", 1, "form-control", 3, "click"], ["placeholder", "\u062A\u0627\u0631\u06CC\u062E \u067E\u0627\u06CC\u0627\u0646", "name", "dp2", "formControlName", "endDate", "ngbDatepicker", "", 1, "form-control", 3, "click"], ["formControlName", "state", 3, "clearable", "searchable"], ["value", "-1"], ["value", "1"], ["value", "2"], ["type", "submit", 1, "btn", "btn-primary", "d-flex", "align-items-center", "justify-content-center", "w-100", 3, "disabled"], ["icon", "search", 1, "mx-2"], [1, "d-flex", "align-items-center", "justify-content-between"], [1, "w-50", 3, "ngModelChange", "change", "clearable", "dropdownPosition", "searchable", "ngModel"], ["value", "desc"], ["value", "asc"], [1, "d-flex", "align-items-center", "justify-content-between", "mt-2"], ["value", "date"], ["value", "amount"], [3, "value"], [1, "d-flex", "align-items-center", "justify-content-start"], ["style", "width: 20px;", 3, "svgUrl", 4, "ngIf", "ngIfElse"], [1, "mx-1"], [2, "width", "20px", 3, "svgUrl"], [1, "logo-loading-placeholder"]], template: function PaymentFilterComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 3);
    \u0275\u0275listener("submit", function PaymentFilterComponent_Template_form_submit_0_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.search());
    });
    \u0275\u0275elementStart(1, "div", 4)(2, "label");
    \u0275\u0275text(3, "\u0635\u0646\u062F\u0648\u0642:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ng-select", 5);
    \u0275\u0275template(5, PaymentFilterComponent_ng_option_5_Template, 7, 4, "ng-option", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 4)(7, "label");
    \u0275\u0275text(8, "\u0634\u0631\u0648\u0639 \u06AF\u0632\u0627\u0631\u0634 \u0627\u0632:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 7)(10, "span", 8);
    \u0275\u0275listener("click", function PaymentFilterComponent_Template_span_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const d1_r5 = \u0275\u0275reference(14);
      return \u0275\u0275resetView(d1_r5.toggle());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 9);
    \u0275\u0275element(12, "use", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "input", 11, 0);
    \u0275\u0275listener("click", function PaymentFilterComponent_Template_input_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const d1_r5 = \u0275\u0275reference(14);
      return \u0275\u0275resetView(d1_r5.toggle());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 4)(16, "label");
    \u0275\u0275text(17, "\u067E\u0627\u06CC\u0627\u0646 \u06AF\u0632\u0627\u0631\u0634 \u062A\u0627:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 7)(19, "span", 8);
    \u0275\u0275listener("click", function PaymentFilterComponent_Template_span_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      const d2_r6 = \u0275\u0275reference(23);
      return \u0275\u0275resetView(d2_r6.toggle());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(20, "svg", 9);
    \u0275\u0275element(21, "use", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(22, "input", 12, 1);
    \u0275\u0275listener("click", function PaymentFilterComponent_Template_input_click_22_listener() {
      \u0275\u0275restoreView(_r1);
      const d2_r6 = \u0275\u0275reference(23);
      return \u0275\u0275resetView(d2_r6.toggle());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 4)(25, "label");
    \u0275\u0275text(26, "\u0648\u0636\u0639\u06CC\u062A \u0648\u0627\u0631\u06CC\u0632 \u0648\u062C\u0647:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "ng-select", 13)(28, "ng-option", 14);
    \u0275\u0275text(29, "\u0647\u0645\u0647");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "ng-option", 15);
    \u0275\u0275text(31, "\u0645\u0648\u0641\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "ng-option", 16);
    \u0275\u0275text(33, "\u0646\u0627\u0645\u0648\u0641\u0642");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 4)(35, "button", 17);
    \u0275\u0275element(36, "fa-icon", 18);
    \u0275\u0275elementStart(37, "span");
    \u0275\u0275text(38, "\u062C\u0633\u062A\u062C\u0648");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(39, "div", 19)(40, "span");
    \u0275\u0275text(41, "\u0645\u0631\u062A\u0628\u200C\u0633\u0627\u0632\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "ng-select", 20);
    \u0275\u0275twoWayListener("ngModelChange", function PaymentFilterComponent_Template_ng_select_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.sortType, $event) || (ctx.sortType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function PaymentFilterComponent_Template_ng_select_change_42_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.search());
    });
    \u0275\u0275elementStart(43, "ng-option", 21);
    \u0275\u0275text(44, "\u0635\u0639\u0648\u062F\u06CC\u200C");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "ng-option", 22);
    \u0275\u0275text(46, "\u0646\u0632\u0648\u0644\u06CC");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "div", 23)(48, "span");
    \u0275\u0275text(49, "\u0628\u0631\u0627\u0633\u0627\u0633");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "ng-select", 20);
    \u0275\u0275twoWayListener("ngModelChange", function PaymentFilterComponent_Template_ng_select_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.sortFiled, $event) || (ctx.sortFiled = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function PaymentFilterComponent_Template_ng_select_change_50_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.search());
    });
    \u0275\u0275elementStart(51, "ng-option", 24);
    \u0275\u0275text(52, "\u062A\u0627\u0631\u06CC\u062E \u062B\u0628\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "ng-option", 25);
    \u0275\u0275text(54, "\u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275property("formGroup", ctx.formGroup);
    \u0275\u0275advance(4);
    \u0275\u0275property("searchable", false)("clearOnBackspace", true);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx.mutualFundList);
    \u0275\u0275advance(22);
    \u0275\u0275property("clearable", false)("searchable", false);
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx.formGroup.invalid);
    \u0275\u0275advance(7);
    \u0275\u0275property("clearable", false)("dropdownPosition", "top")("searchable", false);
    \u0275\u0275twoWayProperty("ngModel", ctx.sortType);
    \u0275\u0275advance(8);
    \u0275\u0275property("clearable", false)("dropdownPosition", "top")("searchable", false);
    \u0275\u0275twoWayProperty("ngModel", ctx.sortFiled);
  }
}, dependencies: [NgSelectModule, NgSelectComponent, NgOptionComponent, NgbDatepickerModule, NgbInputDatepicker, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, NgForOf, NgIf, FontAwesomeModule, FaIconComponent, FormsModule, NgModel, SvgViewerComponent], styles: ["\n\n.logo-loading-placeholder[_ngcontent-%COMP%] {\n  width: 20px;\n  min-width: 20px;\n  height: 20px;\n  border-radius: 40%;\n  background:\n    linear-gradient(\n      90deg,\n      #f3f3f3 25%,\n      #e0e0e0 50%,\n      #f3f3f3 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.2s infinite linear;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n/*# sourceMappingURL=payment-filter.component.css.map */"], changeDetection: 0 });
var PaymentFilterComponent = _PaymentFilterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentFilterComponent, { className: "PaymentFilterComponent" });
})();

// projects/client/src/app/features/reports/accounting-report/accounting-report.service.ts
var _AccountingReportService = class _AccountingReportService {
  constructor() {
    this.filter = new Subject();
    this.currentFilter = this.filter.asObservable();
  }
  setFilter(filter2) {
    this.filter.next(filter2);
  }
};
_AccountingReportService.\u0275fac = function AccountingReportService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AccountingReportService)();
};
_AccountingReportService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AccountingReportService, factory: _AccountingReportService.\u0275fac, providedIn: "root" });
var AccountingReportService = _AccountingReportService;

// projects/client/src/app/features/reports/accounting-report/accounting-report.component.ts
var _c02 = (a0, a1) => ({ "bg-success-200": a0, "bg-danger-200": a1 });
var _c12 = (a0, a1) => ({ "text-success": a0, "text-danger": a1 });
var _c22 = (a0) => ({ "mobile-truncate": a0 });
function AccountingReportComponent_For_4_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0628\u0633\u062A\u0627\u0646\u06A9\u0627\u0631 ");
  }
}
function AccountingReportComponent_For_4_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0628\u062F\u0647\u06A9\u0627\u0631 ");
  }
}
function AccountingReportComponent_For_4_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const report_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, report_r4 == null ? null : report_r4.debit), " ");
  }
}
function AccountingReportComponent_For_4_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const report_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, report_r4 == null ? null : report_r4.credit), " ");
  }
}
function AccountingReportComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275declareLet(0);
    \u0275\u0275elementStart(1, "div", 3)(2, "div", 5)(3, "div", 6)(4, "div", 7)(5, "div", 8)(6, "h5", 9);
    \u0275\u0275template(7, AccountingReportComponent_For_4_Conditional_7_Template, 1, 0)(8, AccountingReportComponent_For_4_Conditional_8_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div")(10, "div", 10)(11, "span", 11);
    \u0275\u0275listener("click", function AccountingReportComponent_For_4_Template_span_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const index_r2 = \u0275\u0275readContextLet(0);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showMore(index_r2));
    });
    \u0275\u0275element(12, "fa-icon", 12);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(13, "div", 13)(14, "div", 14)(15, "div", 15)(16, "div", 16)(17, "h5", 17);
    \u0275\u0275text(18, " \u062A\u0627\u0631\u06CC\u062E ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "h5", 18);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 19)(22, "h5", 20);
    \u0275\u0275text(23, " \u0645\u0628\u0644\u063A ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "h5", 21);
    \u0275\u0275template(25, AccountingReportComponent_For_4_Conditional_25_Template, 2, 3)(26, AccountingReportComponent_For_4_Conditional_26_Template, 2, 3);
    \u0275\u0275elementStart(27, "span", 22);
    \u0275\u0275text(28, " \u0631\u06CC\u0627\u0644 ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(29, "div", 23)(30, "h5", 24);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    const report_r4 = ctx.$implicit;
    const $index_r5 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    const index_r6 = \u0275\u0275storeLet($index_r5);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(10, _c02, (report_r4 == null ? null : report_r4.debit) === 0, (report_r4 == null ? null : report_r4.debit) - (report_r4 == null ? null : report_r4.credit) > 0));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(13, _c12, (report_r4 == null ? null : report_r4.debit) === 0, (report_r4 == null ? null : report_r4.debit) - (report_r4 == null ? null : report_r4.credit) > 0));
    \u0275\u0275advance();
    \u0275\u0275conditional((report_r4 == null ? null : report_r4.debit) === 0 ? 7 : 8);
    \u0275\u0275advance(5);
    \u0275\u0275property("icon", ctx_r2.showMoreStates[index_r6] ? "angle-up" : "angle-down");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", report_r4.voucherDateJalali, " ");
    \u0275\u0275advance(5);
    \u0275\u0275conditional((report_r4 == null ? null : report_r4.debit) !== 0 ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((report_r4 == null ? null : report_r4.credit) !== 0 ? 26 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(16, _c22, !ctx_r2.showMoreStates[index_r6]));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", report_r4 == null ? null : report_r4.description, " ");
  }
}
function AccountingReportComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "img", 25);
    \u0275\u0275elementStart(2, "h5", 26);
    \u0275\u0275text(3, " \u0646\u062A\u06CC\u062C\u0647 \u0627\u06CC \u06CC\u0627\u0641\u062A \u0646\u0634\u062F! ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h6", 27);
    \u0275\u0275text(5, " \u0647\u0646\u0648\u0632 \u0647\u06CC\u0686 \u0627\u0637\u0644\u0627\u0639\u0627\u062A\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A. ");
    \u0275\u0275elementEnd()();
  }
}
function AccountingReportComponent_Conditional_6_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-css-skeleton");
  }
}
function AccountingReportComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, AccountingReportComponent_Conditional_6_For_1_Template, 1, 0, "app-css-skeleton", null, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.arrayLength());
  }
}
var _AccountingReportComponent = class _AccountingReportComponent {
  constructor(fundService, accountingReportService, excelExportService) {
    this.fundService = fundService;
    this.accountingReportService = accountingReportService;
    this.excelExportService = excelExportService;
    this.requestList = signal([]);
    this.$destroy = new Subject();
    this.isLoading = signal(true);
    this.arrayLength = signal([...Array(3)]);
    this.showMoreStates = {};
  }
  ngOnInit() {
    this.accountingReportService.currentFilter.pipe(takeUntil(this.$destroy)).subscribe((filter2) => {
      if (filter2) {
        this.getTurnoverReport(filter2);
      }
    });
  }
  getTurnoverReport(filter2) {
    this.fundService.getCustomerTurnover(filter2).pipe(finalize(() => this.isLoading.set(false))).subscribe((res) => {
      this.requestList.set(res);
    });
  }
  showMore(index, e) {
    this.showMoreStates[index] = !this.showMoreStates[index];
  }
  exportToExcel() {
    const columnMapping = {
      voucherDateJalali: "\u062A\u0627\u0631\u06CC\u062E",
      description: "\u062A\u0648\u0636\u06CC\u062D \u0633\u0646\u062F",
      debit: "\u0628\u062F\u0647\u06A9\u0627\u0631",
      credit: "\u0628\u0633\u062A\u0627\u0646\u06A9\u0627\u0631",
      balance: "\u0645\u0627\u0646\u062F\u0647"
    };
    this.excelExportService.exportToExcel(this.requestList(), columnMapping, "\u06AF\u0631\u062F\u0634 \u062D\u0633\u0627\u0628");
  }
  ngOnDestroy() {
    this.$destroy.next(0);
    this.$destroy.complete();
  }
};
_AccountingReportComponent.\u0275fac = function AccountingReportComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AccountingReportComponent)(\u0275\u0275directiveInject(FundService), \u0275\u0275directiveInject(AccountingReportService), \u0275\u0275directiveInject(ExcelExportService));
};
_AccountingReportComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccountingReportComponent, selectors: [["app-accounting-report"]], standalone: true, features: [\u0275\u0275ProvidersFeature([ExcelExportService]), \u0275\u0275StandaloneFeature], decls: 7, vars: 2, consts: [[1, "d-flex", "flex-column", "align-item-center"], [1, "d-flex", "align-items-center", "justify-content-end", "mb-4"], ["icon", "file-excel", "size", "lg", 1, "text-success", "ms-2", "cursor-pointer", "border", "border-1", "p-2", "border-success", 2, "border-radius", "5px", 3, "click"], [1, "card", "mx-0", "mb-4", "overflow-hidden"], [1, "w-100", "d-flex", "align-items-center", "justify-content-center", "flex-column", "mt-5", "pt-5"], [1, "card-body", "p-0"], [1, "row", "mx-0"], [1, "col-24", "col-md-4", "p-0", 3, "ngClass"], [1, "d-flex", "flex-md-column", "align-items-center", "justify-content-between", "justify-content-md-center", "p-1", "p-md-4", "h-100", "ps-4", "ps-md-0", "pe-4", "pe-md-0"], [1, "my-3", "my-md-0", 3, "ngClass"], [1, "d-md-none", "d-flex", "align-items-center", "justify-content-between"], [1, "bg-primary", "px-2", "py-1", "me-2", "cursor-pointer", 2, "border-radius", "5px", 3, "click"], [1, "text-white", 3, "icon"], [1, "col-24", "col-md-20", "p-4"], [1, "w-100", "d-flex", "align-items-center", "flex-column"], [1, "d-md-flex", "w-100", "align-items-center", "justify-content-between"], [1, "d-flex", "flex-md-column", "justify-content-between", "justify-content-md-start"], [1, "text-secondary", "mb-3"], [1, ""], [1, "d-flex", "flex-md-column", "justify-content-between", "justify-content-md-start", "align-items-end", "mt-4", "mt-md-0"], [1, "text-secondary", "text-left"], [1, "text-left"], [1, "text-secondary", "small", "me-1", "font-weight-bold"], [1, "d-flex", "w-100", "align-items-center", "mt-4"], [1, "text-right", "w-100", 3, "ngClass"], ["src", "/svg/badge-empty-asset.svg", "width", "96", 1, "img-fluid", "my-3"], [1, "my-2"], [2, "color", "#919BA5"]], template: function AccountingReportComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "fa-icon", 2);
    \u0275\u0275listener("click", function AccountingReportComponent_Template_fa_icon_click_2_listener() {
      return ctx.exportToExcel();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(3, AccountingReportComponent_For_4_Template, 32, 18, "div", 3, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, AccountingReportComponent_Conditional_5_Template, 6, 0, "div", 4)(6, AccountingReportComponent_Conditional_6_Template, 2, 0);
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx.requestList());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.requestList().length === 0 && !ctx.isLoading() ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isLoading() ? 6 : -1);
  }
}, dependencies: [DecimalPipe, FontAwesomeModule, FaIconComponent, CssSkeletonComponent, NgClass], styles: ["\n\n[_nghost-%COMP%]   [data-label][_ngcontent-%COMP%]::before {\n  content: attr(data-label);\n  display: inline-block;\n  font-size: 0.75rem;\n  margin-left: 0.5rem;\n}\n[_nghost-%COMP%]   .icon-cell[_ngcontent-%COMP%] {\n  padding: 0;\n}\n[_nghost-%COMP%]   .card[_ngcontent-%COMP%] {\n  border-radius: 1rem !important;\n}\n@media (min-width: 1400px) {\n  [_nghost-%COMP%]   [data-label][_ngcontent-%COMP%]:not([data-label-visible=true])::before {\n    content: unset;\n  }\n  [_nghost-%COMP%]   .icon-cell[_ngcontent-%COMP%] {\n    width: 42px;\n    max-width: 42px;\n  }\n}\n@media (max-width: 767.98px) {\n  [_nghost-%COMP%]   .mobile-truncate[_ngcontent-%COMP%] {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n}\n/*# sourceMappingURL=accounting-report.component.css.map */"], changeDetection: 0 });
var AccountingReportComponent = _AccountingReportComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccountingReportComponent, { className: "AccountingReportComponent" });
})();

// projects/client/src/app/features/reports/accounting-report/accounting-filter/accounting-filter.component.ts
function AccountingFilterComponent_ng_option_5_app_svg_viewer_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-svg-viewer", 19);
  }
  if (rf & 2) {
    let tmp_7_0;
    const fund_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("svgUrl", ctx_r2.apiUrl + "/" + ((tmp_7_0 = ctx_r2.getLogo(fund_r2)) == null ? null : tmp_7_0.downloadLink));
  }
}
function AccountingFilterComponent_ng_option_5_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 20);
  }
}
function AccountingFilterComponent_ng_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ng-option", 15)(1, "div", 16);
    \u0275\u0275template(2, AccountingFilterComponent_ng_option_5_app_svg_viewer_2_Template, 1, 1, "app-svg-viewer", 17)(3, AccountingFilterComponent_ng_option_5_ng_template_3_Template, 1, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(5, "span", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const fund_r2 = ctx.$implicit;
    const logoPlaceholder_r4 = \u0275\u0275reference(4);
    \u0275\u0275property("value", fund_r2.seoRegisterNumber);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", (fund_r2 == null ? null : fund_r2.attachments == null ? null : fund_r2.attachments.length) > 0)("ngIfElse", logoPlaceholder_r4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(fund_r2.symbol);
  }
}
var _AccountingFilterComponent = class _AccountingFilterComponent {
  set mutualFundList(val) {
    if (val) {
      this._mutualFundList = val.filter((x) => x.investType !== 2);
      if (this.formGroup) {
        this.formGroup.patchValue({ mutualFundCode: this._mutualFundList[0]?.seoRegisterNumber });
      }
    }
  }
  get mutualFundList() {
    return this._mutualFundList;
  }
  constructor(accountingReportService, calendar) {
    this.accountingReportService = accountingReportService;
    this.calendar = calendar;
    this._mutualFundList = [];
    this.apiUrl = environment.apiUrl;
    this.loading = false;
    this.page = 1;
    this.first = 0;
    this.row = 1e3;
    this.filter = {
      reportFilter: {
        dateFilter: {
          startDate: "0",
          endDate: "0"
        },
        phrase: "",
        nationalId: "",
        mutualFundCode: ""
        // mutualFundId: 0,
        // bankDepositId: 0,
        // banKNameId: 0,
        // gateway: 0,
        // state: 0,
      },
      optionalFilter: {
        take: this.row,
        skip: 0,
        page: 0,
        value: "",
        sort: [
          {
            field: "voucherDate",
            dir: "desc"
          }
        ]
      }
    };
    this.today = this.calendar.getToday();
    this.threeYearsAgo = calendar.getPrev(calendar.getToday(), "y", 3);
  }
  ngOnInit() {
    this.formGroup = new UntypedFormGroup({
      startDate: new UntypedFormControl(this.threeYearsAgo, [Validators.required]),
      endDate: new UntypedFormControl(this.today, [Validators.required]),
      mutualFundCode: new UntypedFormControl("11168", [Validators.required]),
      phrase: new UntypedFormControl(null, []),
      nationalId: new UntypedFormControl(null, [])
      // depositNumber: new UntypedFormControl(null, []),
      // paymentType: new UntypedFormControl(null, []),
      // amount: new UntypedFormControl(null, []),
      // receiptNumber: new UntypedFormControl(null, []),
    });
    this.search();
  }
  search() {
    let startDate = this.formGroup.get("startDate").value;
    let endDate = this.formGroup.get("endDate").value;
    this.page = 1;
    this.filter.optionalFilter.page = this.page;
    this.filter.optionalFilter.take = this.row;
    this.filter.reportFilter.dateFilter.startDate = "" + NgbDatePersianDateToGregorian(startDate);
    this.filter.reportFilter.dateFilter.endDate = "" + NgbDatePersianDateToGregorian(endDate);
    this.filter.reportFilter.mutualFundCode = this.formGroup.get("mutualFundCode").value;
    this.filter.reportFilter.phrase = this.formGroup.get("phrase").value ?? "";
    this.filter.reportFilter.nationalId = this.formGroup.get("nationalId").value ?? "";
    this.accountingReportService.setFilter(this.filter);
  }
  getLogo(mutualFund) {
    return mutualFund?.attachments?.find((a) => a.categoryId === FundAttachmentTypeEnum.Logo);
  }
};
_AccountingFilterComponent.\u0275fac = function AccountingFilterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AccountingFilterComponent)(\u0275\u0275directiveInject(AccountingReportService), \u0275\u0275directiveInject(NgbCalendar));
};
_AccountingFilterComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccountingFilterComponent, selectors: [["app-accounting-filter"]], standalone: true, features: [\u0275\u0275ProvidersFeature([
  { provide: NgbCalendar, useClass: NgbCalendarPersian },
  { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
]), \u0275\u0275StandaloneFeature], decls: 29, vars: 5, consts: [["d1", "ngbDatepicker"], ["d2", "ngbDatepicker"], ["logoPlaceholder", ""], [1, "form-group", "row", "align-items-center", "col-24", "m-0", 3, "submit", "formGroup"], [1, "my-2"], ["bindValue", "seoRegisterNumber", "placeholder", "\u0627\u0646\u062A\u062E\u0627\u0628 \u0635\u0646\u062F\u0648\u0642", "formControlName", "mutualFundCode", "bindLabel", "seoRegisterNumber", 3, "searchable", "clearOnBackspace"], [3, "value", 4, "ngFor", "ngForOf"], [1, "input-group"], [1, "input-group-text", "text-center", "cursor-pointer", 3, "click"], ["viewBox", "0 0 24 24", "width", "18px", "height", "18px", 1, "text-primary"], [0, "xlink", "href", "#ico_calendar"], ["placeholder", "\u062A\u0627\u0631\u06CC\u062E \u0634\u0631\u0648\u0639", "name", "dp2", "formControlName", "startDate", "ngbDatepicker", "", 1, "form-control", 3, "click"], ["placeholder", "\u062A\u0627\u0631\u06CC\u062E \u067E\u0627\u06CC\u0627\u0646", "name", "dp2", "formControlName", "endDate", "ngbDatepicker", "", 1, "form-control", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", "d-flex", "align-items-center", "justify-content-center", "w-100", 3, "disabled"], ["icon", "search", 1, "mx-2"], [3, "value"], [1, "d-flex", "align-items-center", "justify-content-start"], ["style", "width: 20px;", 3, "svgUrl", 4, "ngIf", "ngIfElse"], [1, "mx-1"], [2, "width", "20px", 3, "svgUrl"], [1, "logo-loading-placeholder"]], template: function AccountingFilterComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 3);
    \u0275\u0275listener("submit", function AccountingFilterComponent_Template_form_submit_0_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.search());
    });
    \u0275\u0275elementStart(1, "div", 4)(2, "label");
    \u0275\u0275text(3, "\u0635\u0646\u062F\u0648\u0642:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ng-select", 5);
    \u0275\u0275template(5, AccountingFilterComponent_ng_option_5_Template, 7, 4, "ng-option", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 4)(7, "label");
    \u0275\u0275text(8, "\u0634\u0631\u0648\u0639 \u06AF\u0632\u0627\u0631\u0634 \u0627\u0632:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 7)(10, "span", 8);
    \u0275\u0275listener("click", function AccountingFilterComponent_Template_span_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const d1_r5 = \u0275\u0275reference(14);
      return \u0275\u0275resetView(d1_r5.toggle());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 9);
    \u0275\u0275element(12, "use", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "input", 11, 0);
    \u0275\u0275listener("click", function AccountingFilterComponent_Template_input_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const d1_r5 = \u0275\u0275reference(14);
      return \u0275\u0275resetView(d1_r5.toggle());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 4)(16, "label");
    \u0275\u0275text(17, "\u067E\u0627\u06CC\u0627\u0646 \u06AF\u0632\u0627\u0631\u0634 \u062A\u0627:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 7)(19, "span", 8);
    \u0275\u0275listener("click", function AccountingFilterComponent_Template_span_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      const d2_r6 = \u0275\u0275reference(23);
      return \u0275\u0275resetView(d2_r6.toggle());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(20, "svg", 9);
    \u0275\u0275element(21, "use", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(22, "input", 12, 1);
    \u0275\u0275listener("click", function AccountingFilterComponent_Template_input_click_22_listener() {
      \u0275\u0275restoreView(_r1);
      const d2_r6 = \u0275\u0275reference(23);
      return \u0275\u0275resetView(d2_r6.toggle());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 4)(25, "button", 13);
    \u0275\u0275element(26, "fa-icon", 14);
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28, "\u062C\u0633\u062A\u062C\u0648");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275property("formGroup", ctx.formGroup);
    \u0275\u0275advance(4);
    \u0275\u0275property("searchable", false)("clearOnBackspace", true);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx.mutualFundList);
    \u0275\u0275advance(20);
    \u0275\u0275property("disabled", ctx.formGroup.invalid);
  }
}, dependencies: [NgSelectModule, NgSelectComponent, NgOptionComponent, NgbDatepickerModule, NgbInputDatepicker, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, NgForOf, FontAwesomeModule, FaIconComponent, NgIf, SvgViewerComponent], styles: ["\n\n.logo-loading-placeholder[_ngcontent-%COMP%] {\n  width: 20px;\n  min-width: 20px;\n  height: 20px;\n  border-radius: 40%;\n  background:\n    linear-gradient(\n      90deg,\n      #f3f3f3 25%,\n      #e0e0e0 50%,\n      #f3f3f3 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.2s infinite linear;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n/*# sourceMappingURL=accounting-filter.component.css.map */"], changeDetection: 0 });
var AccountingFilterComponent = _AccountingFilterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccountingFilterComponent, { className: "AccountingFilterComponent" });
})();

// projects/client/src/app/features/reports/dividend-report/dividend-report.service.ts
var _DividendReportService = class _DividendReportService {
  constructor() {
    this.filter = new Subject();
    this.currentFilter = this.filter.asObservable();
  }
  setFilter(filter2) {
    this.filter.next(filter2);
  }
};
_DividendReportService.\u0275fac = function DividendReportService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DividendReportService)();
};
_DividendReportService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DividendReportService, factory: _DividendReportService.\u0275fac, providedIn: "root" });
var DividendReportService = _DividendReportService;

// projects/client/src/app/features/reports/dividend-report/dividend-report.component.ts
function DividendReportComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 6)(2, "div", 7)(3, "div", 8)(4, "div", 9)(5, "div", 10);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 11);
    \u0275\u0275element(7, "use");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "h5", 12);
    \u0275\u0275text(9, "\u0633\u0648\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "h6", 13);
    \u0275\u0275text(11, "\u062A\u0642\u0633\u06CC\u0645\u06CC");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(12, "div", 14)(13, "div", 15)(14, "div", 16)(15, "div", 17)(16, "h5", 18);
    \u0275\u0275text(17, " \u0635\u0646\u062F\u0648\u0642 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "h5", 19);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 20)(21, "h5", 18);
    \u0275\u0275text(22, " \u0645\u0628\u0644\u063A ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "h5", 19);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "number");
    \u0275\u0275elementStart(26, "span", 21);
    \u0275\u0275text(27, " \u0631\u06CC\u0627\u0644 ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(28, "div", 22)(29, "div", 17)(30, "h5", 18);
    \u0275\u0275text(31, " \u062A\u0627\u0631\u06CC\u062E ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "h5", 19);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 20)(35, "h5", 18);
    \u0275\u0275text(36, " \u062A\u0639\u062F\u0627\u062F ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "h5", 19);
    \u0275\u0275text(38);
    \u0275\u0275pipe(39, "number");
    \u0275\u0275elementEnd()()()()()()()();
  }
  if (rf & 2) {
    const report_r1 = ctx.$implicit;
    \u0275\u0275advance(7);
    \u0275\u0275attribute("href", "#ico_s_box_percent", null, "xlink");
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1(" ", report_r1 == null ? null : report_r1.mutualFundSymbol, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(25, 5, report_r1 == null ? null : report_r1.profit), " ");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", report_r1.dateJalali, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(39, 7, report_r1 == null ? null : report_r1.profitUnit), " ");
  }
}
function DividendReportComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 23)(2, "div", 24);
    \u0275\u0275element(3, "div", 25);
    \u0275\u0275elementStart(4, "div", 26)(5, "div", 27)(6, "div", 28)(7, "span");
    \u0275\u0275text(8, "\u0645\u062C\u0645\u0648\u0639 \u0648\u0627\u062D\u062F\u0647\u0627");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 28)(13, "span");
    \u0275\u0275text(14, "\u0645\u062C\u0645\u0648\u0639 \u0627\u0631\u0632\u0634");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "number");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275element(18, "div", 29);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(11, 2, ctx_r1.aggregationValues().totalAggrigatedValue1), " \u0648\u0627\u062D\u062F ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(17, 4, ctx_r1.aggregationValues().totalAggrigatedValue4), " \u0631\u06CC\u0627\u0644 ");
  }
}
function DividendReportComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "img", 30);
    \u0275\u0275elementStart(2, "h5", 31);
    \u0275\u0275text(3, " \u0646\u062A\u06CC\u062C\u0647 \u0627\u06CC \u06CC\u0627\u0641\u062A \u0646\u0634\u062F! ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h6", 32);
    \u0275\u0275text(5, " \u0647\u0646\u0648\u0632 \u0647\u06CC\u0686 \u0627\u0637\u0644\u0627\u0639\u0627\u062A\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A. ");
    \u0275\u0275elementEnd()();
  }
}
function DividendReportComponent_Conditional_7_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-css-skeleton");
  }
}
function DividendReportComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DividendReportComponent_Conditional_7_For_1_Template, 1, 0, "app-css-skeleton", null, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.arrayLength());
  }
}
var _DividendReportComponent = class _DividendReportComponent {
  constructor(fundService, dividendReportService, excelExportService) {
    this.fundService = fundService;
    this.dividendReportService = dividendReportService;
    this.excelExportService = excelExportService;
    this.requestList = signal([]);
    this.$destory = new Subject();
    this.isLoading = signal(true);
    this.arrayLength = signal([...Array(3)]);
    this.aggregationValues = signal(null);
  }
  ngOnInit() {
    this.dividendReportService.currentFilter.pipe(takeUntil(this.$destory)).subscribe((filter2) => {
      if (filter2) {
        this.getDividendReport(filter2);
      }
    });
  }
  getDividendReport(filter2) {
    this.fundService.getFlatFundDividendCardexes(filter2).pipe(finalize(() => this.isLoading.set(false))).subscribe((res) => {
      if (res) {
        this.requestList.set(res.result);
        this.aggregationValues.set({ totalAggrigatedValue1: res.totalAggrigatedValue1, totalAggrigatedValue4: res.totalAggrigatedValue4 });
      } else {
        this.isLoading.set(false);
      }
    });
  }
  exportToExcel() {
    const columnMapping = {
      dateJalali: "\u062A\u0627\u0631\u06CC\u062E",
      mutualFundSymbol: "\u0635\u0646\u062F\u0648\u0642",
      profitUnit: "\u062A\u0639\u062F\u0627\u062F \u0648\u0627\u062D\u062F",
      profit: "\u0645\u0628\u0644\u063A \u0648\u0627\u0631\u06CC\u0632\u06CC"
    };
    this.excelExportService.exportToExcel(this.requestList(), columnMapping, "\u062A\u0642\u0633\u06CC\u0645 \u0633\u0648\u062F\u0647\u0627");
  }
  ngOnDestroy() {
    this.$destory.next(0);
    this.$destory.complete();
  }
};
_DividendReportComponent.\u0275fac = function DividendReportComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DividendReportComponent)(\u0275\u0275directiveInject(FundService), \u0275\u0275directiveInject(DividendReportService), \u0275\u0275directiveInject(ExcelExportService));
};
_DividendReportComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DividendReportComponent, selectors: [["app-dividend-report"]], standalone: true, features: [\u0275\u0275ProvidersFeature([ExcelExportService]), \u0275\u0275StandaloneFeature], decls: 8, vars: 3, consts: [[1, "d-flex", "flex-column", "align-item-center", "mb-60"], [1, "d-flex", "align-items-center", "justify-content-end", "mb-4"], ["icon", "file-excel", "size", "lg", 1, "text-success", "ms-2", "cursor-pointer", "border", "border-1", "p-2", "border-success", 2, "border-radius", "5px", 3, "click"], [1, "card", "mx-0", "mb-4", "overflow-hidden"], [1, "d-none", "d-lg-block", "button-action-container"], [1, "w-100", "d-flex", "align-items-center", "justify-content-center", "flex-column", "mt-5", "pt-5"], [1, "card-body", "p-0"], [1, "row", "mx-0"], [1, "col-24", "col-md-4", "p-0", "bg-warning-200"], [1, "d-flex", "flex-md-column", "align-items-center", "justify-content-between", "justify-content-md-center", "h-100", "ps-4", "ps-md-0", "pe-2", "pe-md-0"], [1, "d-flex", "flex-md-column", "align-items-center", "justify-content-md-center", "p-1", "p-md-4", "h-100"], ["viewBox", "0 0 24 24", "width", "18px", "height", "18px", 1, "mx-1", 2, "color", "#FF9900"], [1, "text-nowrap", "my-2", "my-md-3", "me-1", "me-md-0", "font-weight-bold", 2, "color", "#FF9900"], [1, "text-nowrap", "mb-0", "mb-md-3", "me-1", "me-md-0", 2, "color", "#ff9900cc"], [1, "col-24", "col-md-20", "p-4"], [1, "d-flex", "flex-column"], [1, "d-md-flex", "align-items-center", "justify-content-between"], [1, "d-flex", "flex-md-column", "justify-content-between", "justify-content-md-start"], [1, "text-secondary"], [1, "font-weight-bold"], [1, "d-flex", "flex-md-column", "justify-content-between", "justify-content-md-start", "align-items-end", "mt-4", "mt-md-0"], [1, "small", "mx-1"], [1, "d-md-flex", "align-items-center", "justify-content-between", "mt-4", "mt-md-3"], [1, "container", "h-100", "w-100"], [1, "row", "mx-0", "h-100"], [1, "col-md-5"], [1, "col-md-13", "mx-0", "h-100", "d-flex", "ps-5"], [1, "w-100", "d-flex", "flex-column", "align-items-center", "justify-content-center", "w-100"], [1, "w-100", "d-flex", "align-items-center", "justify-content-between"], [1, "col-md-6"], ["src", "/svg/badge-empty-asset.svg", "width", "96", 1, "img-fluid", "my-3"], [1, "my-2"], [2, "color", "#919BA5"]], template: function DividendReportComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "fa-icon", 2);
    \u0275\u0275listener("click", function DividendReportComponent_Template_fa_icon_click_2_listener() {
      return ctx.exportToExcel();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(3, DividendReportComponent_For_4_Template, 40, 9, "div", 3, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275template(5, DividendReportComponent_Conditional_5_Template, 19, 6, "div", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, DividendReportComponent_Conditional_6_Template, 6, 0, "div", 5)(7, DividendReportComponent_Conditional_7_Template, 2, 0);
  }
  if (rf & 2) {
    let tmp_1_0;
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx.requestList());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx.requestList() || ((tmp_1_0 = ctx.requestList()) == null ? null : tmp_1_0.length) > 0 && !ctx.isLoading() ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.requestList().length === 0 && !ctx.isLoading() ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isLoading() ? 7 : -1);
  }
}, dependencies: [DecimalPipe, FontAwesomeModule, FaIconComponent, CssSkeletonComponent], styles: ["\n\n[_nghost-%COMP%] {\n  height: 100%;\n}\n[_nghost-%COMP%]   [data-label][_ngcontent-%COMP%]::before {\n  content: attr(data-label);\n  display: inline-block;\n  font-size: 0.75rem;\n  margin-left: 0.5rem;\n}\n[_nghost-%COMP%]   .card[_ngcontent-%COMP%] {\n  border-radius: 1rem !important;\n}\n@media (min-width: 1400px) {\n  [_nghost-%COMP%]   [data-label][_ngcontent-%COMP%]:not([data-label-visible=true])::before {\n    content: unset;\n  }\n}\n[_nghost-%COMP%]   .button-action-container[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  right: 0;\n  width: 100%;\n  height: 75px;\n  background-color: #FFFFFF;\n  display: flex;\n  z-index: 1055;\n}\n[_nghost-%COMP%]   .button-action-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  flex: 1;\n}\n/*# sourceMappingURL=dividend-report.component.css.map */"], changeDetection: 0 });
var DividendReportComponent = _DividendReportComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DividendReportComponent, { className: "DividendReportComponent" });
})();

// projects/client/src/app/features/reports/dividend-report/dividend-filter/dividend-filter.component.ts
function DividendFilterComponent_ng_option_5_app_svg_viewer_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-svg-viewer", 19);
  }
  if (rf & 2) {
    let tmp_7_0;
    const fund_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("svgUrl", ctx_r2.apiUrl + "/" + ((tmp_7_0 = ctx_r2.getLogo(fund_r2)) == null ? null : tmp_7_0.downloadLink));
  }
}
function DividendFilterComponent_ng_option_5_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 20);
  }
}
function DividendFilterComponent_ng_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ng-option", 15)(1, "div", 16);
    \u0275\u0275template(2, DividendFilterComponent_ng_option_5_app_svg_viewer_2_Template, 1, 1, "app-svg-viewer", 17)(3, DividendFilterComponent_ng_option_5_ng_template_3_Template, 1, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(5, "span", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const fund_r2 = ctx.$implicit;
    const logoPlaceholder_r4 = \u0275\u0275reference(4);
    \u0275\u0275property("value", fund_r2.seoRegisterNumber);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", (fund_r2 == null ? null : fund_r2.attachments == null ? null : fund_r2.attachments.length) > 0)("ngIfElse", logoPlaceholder_r4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(fund_r2.symbol);
  }
}
var _DividendFilterComponent = class _DividendFilterComponent {
  set mutualFundList(val) {
    if (val) {
      this._mutualFundList = val.filter((x) => x.fixedIncomeFundType == 1);
      if (this.formGroup) {
        this.formGroup.patchValue({ mutualFundCode: this._mutualFundList[0].seoRegisterNumber });
      }
    }
  }
  get mutualFundList() {
    return this._mutualFundList;
  }
  constructor(dividendReportService, calendar) {
    this.dividendReportService = dividendReportService;
    this.calendar = calendar;
    this._mutualFundList = [];
    this.apiUrl = environment.apiUrl;
    this.loading = false;
    this.page = 1;
    this.first = 0;
    this.row = 1e3;
    this.filter = {
      reportFilter: {
        dateFilter: {
          startDate: "0",
          endDate: "0"
        },
        phrase: "",
        nationalId: "",
        mutualFundCode: "",
        mutualFundId: 0,
        partyId: 0
      },
      optionalFilter: {
        take: this.row,
        skip: 0,
        page: 0,
        value: "",
        sort: [
          {
            field: "",
            dir: ""
          }
        ]
      }
    };
    this.today = this.calendar.getToday();
    this.threeYearsAgo = calendar.getPrev(calendar.getToday(), "y", 3);
  }
  ngOnInit() {
    this.formGroup = new UntypedFormGroup({
      startDate: new UntypedFormControl(this.threeYearsAgo, [Validators.required]),
      endDate: new UntypedFormControl(this.today, [Validators.required]),
      mutualFundCode: new UntypedFormControl("11168", [Validators.required]),
      phrase: new UntypedFormControl(null, []),
      nationalId: new UntypedFormControl(null, []),
      mutualFundId: new UntypedFormControl(null, []),
      partyId: new UntypedFormControl(null, []),
      reinvest: new UntypedFormControl(null, [])
    });
    this.search();
  }
  search() {
    let startDate = this.formGroup.get("startDate").value;
    let endDate = this.formGroup.get("endDate").value;
    this.page = 1;
    this.filter.optionalFilter.page = this.page;
    this.filter.optionalFilter.take = this.row;
    this.filter.reportFilter.dateFilter.startDate = "" + NgbDatePersianDateToGregorian(startDate);
    this.filter.reportFilter.dateFilter.endDate = "" + NgbDatePersianDateToGregorian(endDate);
    this.filter.reportFilter.mutualFundCode = this.formGroup.get("mutualFundCode").value;
    this.filter.reportFilter.phrase = this.formGroup.get("phrase").value ?? "";
    this.filter.reportFilter.nationalId = this.formGroup.get("nationalId").value ?? "";
    this.filter.reportFilter.mutualFundId = this.formGroup.get("mutualFundId").value ?? 0;
    this.filter.reportFilter.partyId = this.formGroup.get("partyId").value ?? 0;
    this.dividendReportService.setFilter(this.filter);
  }
  getLogo(mutualFund) {
    return mutualFund?.attachments?.find((a) => a.categoryId === FundAttachmentTypeEnum.Logo);
  }
};
_DividendFilterComponent.\u0275fac = function DividendFilterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DividendFilterComponent)(\u0275\u0275directiveInject(DividendReportService), \u0275\u0275directiveInject(NgbCalendar));
};
_DividendFilterComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DividendFilterComponent, selectors: [["app-dividend-filter"]], standalone: true, features: [\u0275\u0275ProvidersFeature([
  { provide: NgbCalendar, useClass: NgbCalendarPersian },
  { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
]), \u0275\u0275StandaloneFeature], decls: 29, vars: 5, consts: [["d1", "ngbDatepicker"], ["d2", "ngbDatepicker"], ["logoPlaceholder", ""], [1, "form-group", "row", "align-items-center", "col-24", "m-0", 3, "submit", "formGroup"], [1, "my-2"], ["bindValue", "seoRegisterNumber", "placeholder", "\u0627\u0646\u062A\u062E\u0627\u0628 \u0635\u0646\u062F\u0648\u0642", "formControlName", "mutualFundCode", "bindLabel", "seoRegisterNumber", 3, "searchable", "clearOnBackspace"], [3, "value", 4, "ngFor", "ngForOf"], [1, "input-group"], [1, "input-group-text", "text-center", "cursor-pointer", 3, "click"], ["viewBox", "0 0 24 24", "width", "18px", "height", "18px", 1, "text-primary"], [0, "xlink", "href", "#ico_calendar"], ["placeholder", "\u062A\u0627\u0631\u06CC\u062E \u0634\u0631\u0648\u0639", "name", "dp2", "formControlName", "startDate", "ngbDatepicker", "", 1, "form-control", 3, "click"], ["placeholder", "\u062A\u0627\u0631\u06CC\u062E \u067E\u0627\u06CC\u0627\u0646", "name", "dp2", "formControlName", "endDate", "ngbDatepicker", "", 1, "form-control", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", "d-flex", "align-items-center", "justify-content-center", "w-100", 3, "disabled"], ["icon", "search", 1, "mx-2"], [3, "value"], [1, "d-flex", "align-items-center", "justify-content-start"], ["style", "width: 20px;", 3, "svgUrl", 4, "ngIf", "ngIfElse"], [1, "mx-1"], [2, "width", "20px", 3, "svgUrl"], [1, "logo-loading-placeholder"]], template: function DividendFilterComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 3);
    \u0275\u0275listener("submit", function DividendFilterComponent_Template_form_submit_0_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.search());
    });
    \u0275\u0275elementStart(1, "div", 4)(2, "label");
    \u0275\u0275text(3, "\u0635\u0646\u062F\u0648\u0642:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ng-select", 5);
    \u0275\u0275template(5, DividendFilterComponent_ng_option_5_Template, 7, 4, "ng-option", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 4)(7, "label");
    \u0275\u0275text(8, "\u0634\u0631\u0648\u0639 \u06AF\u0632\u0627\u0631\u0634 \u0627\u0632:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 7)(10, "span", 8);
    \u0275\u0275listener("click", function DividendFilterComponent_Template_span_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const d1_r5 = \u0275\u0275reference(14);
      return \u0275\u0275resetView(d1_r5.toggle());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 9);
    \u0275\u0275element(12, "use", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "input", 11, 0);
    \u0275\u0275listener("click", function DividendFilterComponent_Template_input_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const d1_r5 = \u0275\u0275reference(14);
      return \u0275\u0275resetView(d1_r5.toggle());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 4)(16, "label");
    \u0275\u0275text(17, "\u067E\u0627\u06CC\u0627\u0646 \u06AF\u0632\u0627\u0631\u0634 \u062A\u0627:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 7)(19, "span", 8);
    \u0275\u0275listener("click", function DividendFilterComponent_Template_span_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      const d2_r6 = \u0275\u0275reference(23);
      return \u0275\u0275resetView(d2_r6.toggle());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(20, "svg", 9);
    \u0275\u0275element(21, "use", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(22, "input", 12, 1);
    \u0275\u0275listener("click", function DividendFilterComponent_Template_input_click_22_listener() {
      \u0275\u0275restoreView(_r1);
      const d2_r6 = \u0275\u0275reference(23);
      return \u0275\u0275resetView(d2_r6.toggle());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 4)(25, "button", 13);
    \u0275\u0275element(26, "fa-icon", 14);
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28, "\u062C\u0633\u062A\u062C\u0648");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275property("formGroup", ctx.formGroup);
    \u0275\u0275advance(4);
    \u0275\u0275property("searchable", false)("clearOnBackspace", true);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx.mutualFundList);
    \u0275\u0275advance(20);
    \u0275\u0275property("disabled", ctx.formGroup.invalid);
  }
}, dependencies: [NgSelectModule, NgSelectComponent, NgOptionComponent, NgbDatepickerModule, NgbInputDatepicker, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, NgForOf, NgIf, FontAwesomeModule, FaIconComponent, SvgViewerComponent], styles: ["\n\n.logo-loading-placeholder[_ngcontent-%COMP%] {\n  width: 20px;\n  min-width: 20px;\n  height: 20px;\n  border-radius: 40%;\n  background:\n    linear-gradient(\n      90deg,\n      #f3f3f3 25%,\n      #e0e0e0 50%,\n      #f3f3f3 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.2s infinite linear;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n/*# sourceMappingURL=dividend-filter.component.css.map */"], changeDetection: 0 });
var DividendFilterComponent = _DividendFilterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DividendFilterComponent, { className: "DividendFilterComponent" });
})();

// projects/client/src/app/features/reports/report-menus/report-menus.component.ts
var _forTrack0 = ($index, $item) => $item.title;
function ReportMenusComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 12)(1, "div")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const event_r1 = ctx.$implicit;
    \u0275\u0275classMap("pending-report-card pending-report-card--" + event_r1.tone);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(event_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r1.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r1.status);
  }
}
var _ReportMenusComponent = class _ReportMenusComponent {
  constructor(router) {
    this.router = router;
    this.useMockViewData = true;
    this.pendingReportEvents = [
      {
        title: "\u0648\u0627\u0631\u06CC\u0632 \u0648\u062C\u0647",
        description: "\u0648\u0627\u0631\u06CC\u0632 \u06F1\u06F2,\u06F0\u06F0\u06F0,\u06F0\u06F0\u06F0 \u0631\u06CC\u0627\u0644\u06CC \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u062A\u0623\u06CC\u06CC\u062F",
        status: "\u062F\u0631 \u062C\u0631\u06CC\u0627\u0646",
        tone: "deposit"
      },
      {
        title: "\u0628\u0631\u062F\u0627\u0634\u062A",
        description: "\u0628\u0631\u062F\u0627\u0634\u062A \u0627\u0632 \u0635\u0646\u062F\u0648\u0642 \u0647\u0632\u0627\u0631\u0647 \u0633\u0648\u0645 \u062F\u0631 \u062D\u0627\u0644 \u067E\u0631\u062F\u0627\u0632\u0634",
        status: "\u067E\u06CC\u06AF\u06CC\u0631\u06CC",
        tone: "redemption"
      },
      {
        title: "\u0633\u0631\u0645\u0627\u06CC\u0647\u200C\u06AF\u0630\u0627\u0631\u06CC",
        description: "\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0633\u0631\u0645\u0627\u06CC\u0647\u200C\u06AF\u0630\u0627\u0631\u06CC \u062C\u062F\u06CC\u062F \u062B\u0628\u062A \u0634\u062F\u0647 \u0627\u0633\u062A",
        status: "\u062B\u0628\u062A\u200C\u0634\u062F\u0647",
        tone: "subscription"
      }
    ];
  }
  navigateToPage(pageRoute) {
    this.router.navigate([`/reporting/${pageRoute}`]);
  }
};
_ReportMenusComponent.\u0275fac = function ReportMenusComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ReportMenusComponent)(\u0275\u0275directiveInject(Router));
};
_ReportMenusComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportMenusComponent, selectors: [["app-report-menus"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 36, vars: 0, consts: [["dir", "rtl", 1, "reports-menu-shell"], ["aria-label", "\u062F\u0631\u062E\u0648\u0627\u0633\u062A\u200C\u0647\u0627\u06CC \u062F\u0631 \u062C\u0631\u06CC\u0627\u0646", 1, "pending-report-events"], [1, "pending-report-events__header"], ["type", "button", 1, "btn", "btn-outline-primary", "btn-sm", 3, "click"], [1, "pending-report-events__list"], [1, "pending-report-card", 3, "class"], ["aria-label", "\u0641\u0647\u0631\u0633\u062A \u06AF\u0632\u0627\u0631\u0634\u200C\u0647\u0627", 1, "report-card-grid"], [1, "report-menu-card", 3, "click"], ["icon", "credit-card", "size", "lg", 1, "report-menu-card__icon"], ["icon", "money-bill-1", "size", "lg", 1, "report-menu-card__icon"], ["icon", "receipt", "size", "lg", 1, "report-menu-card__icon"], ["icon", "circle-info", "size", "lg", 1, "report-menu-card__icon"], [1, "pending-report-card"]], template: function ReportMenusComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "main", 0)(1, "section", 1)(2, "div", 2)(3, "div")(4, "span");
    \u0275\u0275text(5, "\u062F\u0631\u062E\u0648\u0627\u0633\u062A\u200C\u0647\u0627\u06CC \u062F\u0631 \u062C\u0631\u06CC\u0627\u0646");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 3);
    \u0275\u0275listener("click", function ReportMenusComponent_Template_button_click_6_listener() {
      return ctx.navigateToPage("requests");
    });
    \u0275\u0275text(7, " \u0645\u0634\u0627\u0647\u062F\u0647 \u0647\u0645\u0647 \u062F\u0631\u062E\u0648\u0627\u0633\u062A\u200C\u0647\u0627 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 4);
    \u0275\u0275repeaterCreate(9, ReportMenusComponent_For_10_Template, 8, 5, "article", 5, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "section", 6)(12, "article", 7);
    \u0275\u0275listener("click", function ReportMenusComponent_Template_article_click_12_listener() {
      return ctx.navigateToPage("requests");
    });
    \u0275\u0275element(13, "fa-icon", 8);
    \u0275\u0275elementStart(14, "h2");
    \u0275\u0275text(15, "\u062F\u0631\u062E\u0648\u0627\u0633\u062A\u200C\u0647\u0627");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p");
    \u0275\u0275text(17, "\u062C\u0632\u0626\u06CC\u0627\u062A \u062A\u0631\u0627\u06A9\u0646\u0634\u200C\u0647\u0627\u06CC \u0645\u0627\u0644\u06CC \u0634\u0645\u0627 \u0628\u0647 \u0635\u0648\u0631\u062A \u062F\u0642\u06CC\u0642");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "article", 7);
    \u0275\u0275listener("click", function ReportMenusComponent_Template_article_click_18_listener() {
      return ctx.navigateToPage("payments");
    });
    \u0275\u0275element(19, "fa-icon", 9);
    \u0275\u0275elementStart(20, "h2");
    \u0275\u0275text(21, "\u0648\u0627\u0631\u06CC\u0632 \u0648\u062C\u0647");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p");
    \u0275\u0275text(23, "\u0648\u0636\u0639\u06CC\u062A \u0648 \u062C\u0632\u0626\u06CC\u0627\u062A \u0648\u0627\u0631\u06CC\u0632 \u0648\u062C\u0647");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "article", 7);
    \u0275\u0275listener("click", function ReportMenusComponent_Template_article_click_24_listener() {
      return ctx.navigateToPage("accounting");
    });
    \u0275\u0275element(25, "fa-icon", 10);
    \u0275\u0275elementStart(26, "h2");
    \u0275\u0275text(27, "\u062D\u0633\u0627\u0628\u062F\u0627\u0631\u06CC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p");
    \u0275\u0275text(29, "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062C\u0627\u0645\u0639 \u0645\u0627\u0644\u06CC \u0648 \u062E\u0644\u0627\u0635\u0647 \u062A\u0631\u0627\u06A9\u0646\u0634\u200C\u0647\u0627\u06CC \u0634\u0645\u0627");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "article", 7);
    \u0275\u0275listener("click", function ReportMenusComponent_Template_article_click_30_listener() {
      return ctx.navigateToPage("dividend");
    });
    \u0275\u0275element(31, "fa-icon", 11);
    \u0275\u0275elementStart(32, "h2");
    \u0275\u0275text(33, "\u062A\u0642\u0633\u06CC\u0645 \u0633\u0648\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "p");
    \u0275\u0275text(35, "\u062C\u0632\u0626\u06CC\u0627\u062A \u0648\u0627\u0631\u06CC\u0632 \u0633\u0648\u062F\u0647\u0627\u06CC \u062F\u0648\u0631\u0647\u200C\u0627\u06CC \u0635\u0646\u062F\u0648\u0642\u200C\u0647\u0627\u06CC \u0634\u0645\u0627");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx.pendingReportEvents);
  }
}, dependencies: [FontAwesomeModule, FaIconComponent], styles: ["\n\n.reports-menu-shell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 0.75rem 0.75rem 2rem;\n  color: #26323d;\n}\n.reports-menu-header[_ngcontent-%COMP%], \n.pending-report-events[_ngcontent-%COMP%], \n.report-menu-card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 255, 255, 0.58);\n  border-radius: 16px;\n  background:\n    radial-gradient(\n      circle at 14% 8%,\n      rgba(255, 255, 255, 0.88),\n      rgba(255, 255, 255, 0.2) 36%,\n      transparent 66%),\n    rgba(255, 255, 255, 0.76);\n  box-shadow: 0 8px 22px rgba(31, 41, 51, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.84);\n  backdrop-filter: blur(18px) saturate(160%);\n  -webkit-backdrop-filter: blur(18px) saturate(160%);\n}\n.reports-menu-header[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.reports-menu-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #6666ff;\n  font-size: 0.8rem;\n  font-weight: 850;\n}\n.reports-menu-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.reports-menu-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.reports-menu-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  font-size: 1.35rem;\n  font-weight: 900;\n}\n.reports-menu-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.45rem;\n  color: #66727d;\n  line-height: 1.8;\n}\n.pending-report-events[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.pending-report-events__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.85rem;\n}\n.pending-report-events__header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #6666ff;\n  font-size: 0.78rem;\n  font-weight: 850;\n}\n.pending-report-events__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.pending-report-events__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.pending-report-events__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  font-size: 1.05rem;\n  font-weight: 900;\n}\n.pending-report-events__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.35rem;\n  color: #66727d;\n  font-size: 0.86rem;\n  line-height: 1.8;\n}\n.pending-report-events__list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.65rem;\n}\n.pending-report-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.78rem;\n  border: 1px solid #e5eaee;\n  border-radius: 13px;\n  background: rgba(255, 255, 255, 0.72);\n}\n.pending-report-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.pending-report-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n.pending-report-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-top: 0.28rem;\n  color: #66727d;\n  font-size: 0.84rem;\n  line-height: 1.7;\n}\n.pending-report-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  border-radius: 999px;\n  padding: 0.32rem 0.58rem;\n  background: rgba(49, 81, 95, 0.08);\n  color: #31515f;\n  font-size: 0.74rem;\n  font-weight: 850;\n  white-space: nowrap;\n}\n.pending-report-card--deposit[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  background: rgba(255, 122, 26, 0.12);\n  color: #b85b00;\n}\n.pending-report-card--redemption[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  background: rgba(220, 72, 72, 0.1);\n  color: #c43d3d;\n}\n.pending-report-card--subscription[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  background: rgba(20, 140, 80, 0.1);\n  color: #148c50;\n}\n.report-card-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 0.85rem;\n}\n.report-menu-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n  min-height: 96px;\n  padding: 1rem;\n  cursor: pointer;\n  transition: transform 160ms ease, box-shadow 160ms ease;\n}\n.report-menu-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.99);\n}\n.report-menu-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.report-menu-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.report-menu-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 900;\n}\n.report-menu-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.35rem;\n  color: #66727d;\n  font-size: 0.84rem;\n  line-height: 1.7;\n}\n.report-menu-card__icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex: 0 0 42px;\n  border-radius: 14px;\n  color: #148c50;\n  background: rgba(20, 140, 80, 0.09);\n}\n@media (min-width: 768px) {\n  .reports-menu-shell[_ngcontent-%COMP%] {\n    padding: 1rem 1rem 2.5rem;\n  }\n  .pending-report-events__list[_ngcontent-%COMP%], \n   .report-card-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 520px) {\n  .pending-report-events__header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .pending-report-card[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=report-menus.component.css.map */"], changeDetection: 0 });
var ReportMenusComponent = _ReportMenusComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportMenusComponent, { className: "ReportMenusComponent" });
})();

// projects/client/src/app/features/reports/reports.routes.ts
var pageWidth = window.innerWidth;
var reports_routes = [
  {
    path: "",
    redirectTo: pageWidth >= 991 ? "/reporting/requests" : "/reporting/report-menus",
    pathMatch: "full"
  },
  {
    path: "",
    component: ReportsComponent,
    children: [
      { path: "report-menus", component: ReportMenusComponent },
      { path: "requests", children: [{ path: "", component: RequestsReportComponent }, { path: "", component: RequestsFilterComponent, outlet: "filter" }] },
      { path: "payments", children: [{ path: "", component: PaymentReportComponent }, { path: "", component: PaymentFilterComponent, outlet: "filter" }] },
      { path: "accounting", children: [{ path: "", component: AccountingReportComponent }, { path: "", component: AccountingFilterComponent, outlet: "filter" }] },
      { path: "dividend", children: [{ path: "", component: DividendReportComponent }, { path: "", component: DividendFilterComponent, outlet: "filter" }] }
    ]
  }
];
export {
  reports_routes
};
//# sourceMappingURL=chunk-F2V5NE4C.js.map

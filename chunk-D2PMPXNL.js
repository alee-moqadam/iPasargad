import {
  ChangeDetectorRef,
  DomSanitizer,
  HttpClient,
  NgIf,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-OE4HGK62.js";

// projects/client/src/app/shared/components/svg-viewer/svg-viewer.component.ts
function SvgViewerComponent_img_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", "data:image/svg+xml;base64," + ctx_r0.svgContent, \u0275\u0275sanitizeUrl);
  }
}
var _SvgViewerComponent = class _SvgViewerComponent {
  constructor(http, sanitizer, cdr) {
    this.http = http;
    this.sanitizer = sanitizer;
    this.cdr = cdr;
    this.svgUrl = "";
    this.reload = signal(0);
  }
  ngOnInit() {
    this.http.get(this.svgUrl, {
      responseType: "text",
      headers: {
        "Cache-Control": "public, max-age=31536000"
      }
    }).subscribe((res) => {
      this.svgContent = this.encodeSvgToBase64(res);
      this.cdr.detectChanges();
      this.reload.set(1);
      this.cdr.markForCheck();
    });
  }
  encodeSvgToBase64(svgContent) {
    return btoa(encodeURIComponent(svgContent).replace(/%([0-9A-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16))));
  }
};
_SvgViewerComponent.\u0275fac = function SvgViewerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SvgViewerComponent)(\u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(DomSanitizer), \u0275\u0275directiveInject(ChangeDetectorRef));
};
_SvgViewerComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SvgViewerComponent, selectors: [["app-svg-viewer"]], inputs: { svgUrl: "svgUrl" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 3, vars: 2, consts: [[2, "display", "none"], ["alt", "", "class", "w-100 cursor-pointer", "loading", "lazy", 3, "src", 4, "ngIf"], ["alt", "", "loading", "lazy", 1, "w-100", "cursor-pointer", 3, "src"]], template: function SvgViewerComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 0);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(2, SvgViewerComponent_img_2_Template, 1, 1, "img", 1);
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx.reload());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.svgContent);
  }
}, dependencies: [NgIf], encapsulation: 2 });
var SvgViewerComponent = _SvgViewerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SvgViewerComponent, { className: "SvgViewerComponent" });
})();

export {
  SvgViewerComponent
};
//# sourceMappingURL=chunk-D2PMPXNL.js.map

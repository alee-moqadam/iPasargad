// component.ts
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-svg-viewer',
    imports: [
     NgIf
    ],
    template: `
    <!-- <div class="" [innerHTML]="svgContent"></div> -->
     <!-- {{this.svgContent}} -->
    <span style="display: none;">{{reload()}}</span> 
    <img  *ngIf="svgContent"
          [src]="'data:image/svg+xml;base64,' + svgContent"
          alt=""
          class="w-100 cursor-pointer"
          loading="lazy" /> `,
    standalone: true,
})
export class SvgViewerComponent implements OnInit {
    svgContent!: SafeHtml;
    // svgUrl :string = ''
    @Input() svgUrl: string = '';
    reload = signal(0);
    constructor(private http: HttpClient,
        private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.http
            .get(this.svgUrl, {
                responseType: 'text',
                headers: {
                  'Cache-Control': 'public, max-age=31536000'
                }
            })
            .subscribe(res => {
                // console.log('res', res);
                this.svgContent = this.encodeSvgToBase64(res);
                this.cdr.detectChanges();
                this.reload.set(+1);
                this.cdr.markForCheck();

            });

    }

    encodeSvgToBase64(svgContent: string): string {
        return btoa(
            encodeURIComponent(svgContent).replace(
                /%([0-9A-F]{2})/g,
                (_, hex) => String.fromCharCode(parseInt(hex, 16))
            )
        );
    }
}
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ToastService } from '@client/core/services/toast.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [NgbToast, NgFor, NgIf, NgTemplateOutlet, FontAwesomeModule],
  templateUrl: './toasts.component.html',
  styles: [`
      :host {

        top: 100px !important;
          position: fixed;
          bottom: unset !important;
          left: 0 !important;
          margin: 0.5em;
          z-index: 1200;
          @media (min-width: 900px) {
            right: 50% !important;
            transform: translateX(50%);
          }
          @media (max-width: 900px) {
            right: 0 !important;
          }

      }
    `],
  host: { '[class.ngb-toasts]': 'true' }
})
export class ToastsComponent implements OnInit {

  constructor(
    public toastService: ToastService
  ) { }

  ngOnInit(): void { }

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

  closeToast(toast) {
    toast.show = false;
  }

}

import { Component, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAt, faBars, faCaretDown, faLocationDot, faMapLocationDot, faPhone, faTimes, faUser, faInfo, faCircleInfo, faGlobe, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ToastsComponent } from './shared/toasts/toasts.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FaIconComponent, NgIf, NgbTooltip, CommonModule, ToastsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showBg = signal(false);
  @HostListener("window:scroll", []) onWindowScroll() {
    // do some stuff here when the window is scrolled
    const verticalOffset = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;
    if (verticalOffset > 200) {
      this.showBg.set(true)
    } else {
      this.showBg.set(false)
    }
  }
  public showMobileMenu = false;

  activeSection: string = '';
  constructor(
    library: FaIconLibrary,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {



    library.addIcons(faUser, faCaretDown, faPhone, faAngleLeft, faLocationDot, faAt, faMapLocationDot, faBars, faTimes, faInfo, faCircleInfo, faGlobe ,faCircleLeft );
  }
  ngOnInit(): void {

  }

  toggleMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  redirectToPage(item) {
    switch (item) {
      case 1:
        window.open('https://app.ipasargad.ir/auth/login', '_blank');
        break;
      case 2:
        window.open('https://app.ipasargad.ir/auth/reg/step1', '_blank');
        break;
      default:
        break;
    }
  }

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }

  onClick(elementId: string): void {
    this.activeSection = elementId;
    this.router.navigate([], { fragment: elementId }).then(res => {
      const element = document.getElementById(elementId);

      if (element != undefined) {
        element.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        })
      };
    });
  }


}

import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FundListService } from '@client/core/services/fund-list.service';
import { FundService } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { filter } from 'rxjs';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsComponent implements OnInit {
  hasFilter = signal(false);


  constructor(private fundService: FundService, private fundListService: FundListService , private router : Router) {
    this.checkUrl(this.router.url);
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.checkUrl(event.urlAfterRedirects);
    });
   }
  ngOnInit(): void {
  }

  onOutletLoaded(component) {
    this.fundListService.getAllMutualFunds().subscribe((fundList) => {
      component.mutualFundList = fundList
    })
  }

  showFilter(element: HTMLElement) {
    element.classList.toggle('d-none');
  }
  checkUrl(url: string) {
    url === '/reporting/report-menus' ? this.hasFilter.set(true)  : this.hasFilter.set(false);
  }
}

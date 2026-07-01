import { ChangeDetectionStrategy, Component } from '@angular/core';
import {   Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-report-menus',
  standalone: true,
  imports: [RouterLink,FontAwesomeModule],
  templateUrl: './report-menus.component.html',
  styleUrl: './report-menus.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportMenusComponent  {
  constructor(private router : Router) {

  }

  navigateToPage(pageRoute : string){
    this.router.navigate([`/reporting/${pageRoute}`])
  }

}

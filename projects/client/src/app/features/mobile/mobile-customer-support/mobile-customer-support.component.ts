import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsultingGuideComponent } from '@client/features/dashboard/consulting-guide/consulting-guide.component';
declare var Goftino: any;
@Component({
  selector: 'app-mobile-customer-support',
  standalone: true,
  imports: [RouterLink, ConsultingGuideComponent],
  templateUrl: './mobile-customer-support.component.html',
  styleUrl: './mobile-customer-support.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileCustomerSupportComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {
    document?.body.classList.add('fixed');
  }

  ngAfterViewInit(): void {


    document
      .getElementById('goftino-mobile-profile')
      .addEventListener('click', (d) => {
        Goftino.toggle();
      });

  }

}

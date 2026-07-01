
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
declare var Goftino: any;
@Component({
  selector: 'app-communication-box',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './communication-box.component.html',
  styleUrl: './communication-box.component.scss',
})
export class CommunicationBoxComponent implements OnInit, AfterViewInit {
  constructor(
  ) {
    
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    document
      .getElementById(window.innerWidth <= 991 ? 'goftino-mobile' : 'goftino-web')?.addEventListener('click', (d) => {
        Goftino.toggle();
      });
  }

}

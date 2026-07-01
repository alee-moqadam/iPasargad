import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
declare var Goftino: any;

@Component({
  selector: 'app-consulting-guide',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './consulting-guide.component.html',
  styleUrl: './consulting-guide.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultingGuideComponent implements AfterViewInit {
  @Input() isInSupportPage: boolean = false;
  ngAfterViewInit(): void {

    document
      .getElementById('goftino-toggle-help')?.addEventListener('click', (d) => {
        Goftino.toggle();
      });
  }
}

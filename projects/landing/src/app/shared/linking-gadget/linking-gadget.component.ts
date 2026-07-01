import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/client/src/environments/environment.prod';
import { map } from 'rxjs';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-linking-gadget',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './linking-gadget.component.html',
  styleUrl: './linking-gadget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkingGadgetComponent implements OnInit {

  @Input() isShowAccountsInfo = true;
  showAccountsInfo = signal(true)
  apiUrl = environment.apiUrl
  bankDeposit = signal([]);

  constructor(private toastService: ToastService, public httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.showAccountsInfo.set(this.isShowAccountsInfo)
  }

  closeAccountData() {
    this.showAccountsInfo.set(false)

  }

  copyToClipboard(value) {
    return this.toastService.copyToClipboard(value)
  }

}

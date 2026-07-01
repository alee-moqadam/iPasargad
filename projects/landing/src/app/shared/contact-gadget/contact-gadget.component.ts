import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/client/src/environments/environment.prod';
import { map } from 'rxjs';

@Component({
  selector: 'app-contact-gadget',
  standalone: true,
  imports: [],
  templateUrl: './contact-gadget.component.html',
  styleUrl: './contact-gadget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactGadgetComponent implements OnInit {

  @Input() isShowAccountsInfo = true;
  showAccountsInfo = signal(true)
  apiUrl = environment.apiUrl
  bankDeposit = signal([]);

  constructor(private toastService: ToastService, public httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.showAccountsInfo.set(this.isShowAccountsInfo)
    this.getBankDeposit()
  }

  getBankDeposit() {
    this.httpClient.get(`${this.apiUrl}/shared/getallbankdepositbymutualfundid?mutualFundId=1`).pipe(
      map((res: any) => {
        return res.result;
      }))
      .subscribe((data) => {
        if (data) {
          this.bankDeposit.set(data)
        }
      });
  }

  closeAccountData() {
    this.showAccountsInfo.set(false)

  }

  copyToClipboard(value) {
    return this.toastService.copyToClipboard(value)
  }

}

import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FundListService } from '@client/core/services/fund-list.service';
import { ToastService } from '@client/core/services/toast.service';
import { PersianDatetimePipe, FundService, FundAttachment, FundAttachmentTypeEnum } from '@client/shared';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { environment } from 'projects/client/src/environments/environment';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ticketing',
  standalone: true,
  imports: [NgFor, CommonModule, NgIf, PersianDatetimePipe, FormsModule,ReactiveFormsModule, NgSelectModule,NgbTooltip,SvgViewerComponent],
  templateUrl: './ticketing.component.html',
  styleUrl: './ticketing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketingComponent implements OnInit, OnDestroy {
  apiUrl: string = environment.apiUrl

  loading = signal<boolean>(false)
  tickets = signal<any[]>([]);
  ticketTypes = signal<any[]>([]);
  $unsubscribe = new Subject()
  formGroup: FormGroup;
  selectedTicket = signal({code: 1, title: 'پیشنهادات'});
  mutualFundList = [];
  selectedFund: any;

  constructor(private fundService: FundService,private toastService: ToastService,private fundListService: FundListService) { }

  ngOnDestroy(): void {
    this.$unsubscribe.next(true)
    this.$unsubscribe.complete()
  }

  ngOnInit(): void {
    this.loadMutualFunds();
    this.gettickets();
    this.getTicketTypes();
    this.formGroup = new FormGroup({
      Subject: new FormControl(''),
      Code: new FormControl(1),
      Message: new FormControl('',Validators.required),
      MutualFundId: new FormControl(null,Validators.required),
    });
  }

  private loadMutualFunds(): void {
    this.fundListService.getAllMutualFunds()
      // .pipe(takeUntil(this.destroy$))
      .subscribe(fundList => {
        this.mutualFundList = fundList?.filter(x => !!x) ?? [];
        // this.readyToRender.set(true);
      });
  }

  private gettickets() {
    this.loading.set(true)
    this.fundService.getTickets().subscribe((result: any) => {
      this.loading.set(false);
      this.tickets.set(result.result);
    })
  }

  getTicketTypes() {
    this.fundService.getTicketTypes().subscribe((result: any) => {
      this.ticketTypes.set(result.result);
    })
  }

  submit() {
    this.formGroup.value.Subject = (this.selectedTicket().code === 100) ?  this.formGroup.value.Subject : '';
    this.fundService.saveTicket(this.formGroup.value).subscribe((result: any) => {

      this.toastService.show('نظر شما با موفقیت ثبت شد و به‌زودی پاسخ داده خواهد شد', {
        classname: 'bg-success text-light',
        delay: 10000
      });
      this.gettickets();
      this.formGroup.reset();
      this.selectedTicket.set(null)
    })

  }

  selectTicketType(val){
    this.selectedTicket.set(val);
  }

  onSelectedFundChanged(fund: any): void {
    this.selectedFund = fund;
  }

  getLogo(mutualFund): FundAttachment {        
    return mutualFund?.attachments?.find(a => a.categoryId === FundAttachmentTypeEnum.Logo);
  }

}

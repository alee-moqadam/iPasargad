import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RedemptionFundContentComponent } from './redemption-fund-content/redemption-fund-content.component';
import { FundAttachment, FundAttachmentTypeEnum, FundService, MutualFundDetailsModel, CustomerEvidenceModel, CssSkeletonComponent, CustomerRequestCompositionModel } from '@client/shared';
import { FundListService } from '@client/core/services/fund-list.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';
import { environment } from 'projects/client/src/environments/environment';

@Component({
  selector: 'redemption-fund-modal',
  templateUrl: './redemption-fund-modal.component.html',
  styleUrls: ['./redemption-fund-modal.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, NgFor, RedemptionFundContentComponent, CommonModule, CssSkeletonComponent,SvgViewerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedemptionFundModalComponent implements OnInit, OnDestroy {
  allMutualFundsList = signal<MutualFundDetailsModel[]>([]);
  selectedMutualFund = signal<MutualFundDetailsModel | null>(null);
  isMutualFundApplied = signal<boolean>(false);
  activeModal = inject(NgbActiveModal);
  @Input() fundInfo: MutualFundDetailsModel | null = null;
  customerEvidences = signal<CustomerEvidenceModel[]>([]);
  attachmentTypes = FundAttachmentTypeEnum;
  apiUrl: string = environment.apiUrl;

  isLoading = signal(true);
  arrayLength = signal([...Array(4)]);

  private destroy$ = new Subject<void>();

  constructor(
    private fundListService: FundListService,
    private fundService: FundService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading.set(true);
    combineLatest([
      this.fundListService.getAllMutualFunds(),
      this.fundService.getCustomerEvidences(),
      this.fundService.getCustomerRequestCompositions({ date: new Date() }),
    ]).pipe(takeUntil(this.destroy$))
    .subscribe(([funds, evidences,compositions]: [MutualFundDetailsModel[], CustomerEvidenceModel[], CustomerRequestCompositionModel[]]) => {
      this.customerEvidences.set(evidences);
      const merged = funds.map(fund => ({
        ...fund,
        customerEvidence: evidences.find(e => e.mutualFundCode == String(fund.seoRegisterNumber)),
        requestComposition: compositions.find(c => c.mutualFundId === fund.mutualFundId)
      }));
      this.allMutualFundsList.set(merged);
      this.isLoading.set(false);
    });
  }

  selectMutualFund(mutualFundInfo: MutualFundDetailsModel) {
    this.selectedMutualFund.set(mutualFundInfo);
    this.applyMutualFund();
  }

  applyMutualFund() {
    this.isMutualFundApplied.set(true);
  }

  close() {
    this.activeModal.close();
  }

  displayModalHeader(): string {
    if (!this.fundInfo) {
      if (!this.isMutualFundApplied()) {
        return ' انتخاب صندوق';
      }
      return ' درخواست برای ابطال صندوق' + ' ' + this.selectedMutualFund()?.symbol;
    }
    return ' درخواست برای ابطال صندوق' + ' ' + this.fundInfo?.symbol;
  }

  getAttachment(fund: MutualFundDetailsModel, attachmentType: FundAttachmentTypeEnum): FundAttachment | undefined {
    return fund?.attachments?.find(a => a.categoryId === attachmentType);
  }

  backToStep(){
    this.selectedMutualFund.set(null);
    this.isMutualFundApplied.set(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

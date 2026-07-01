import { FundInfoService, FundTypeEnum, MaskNumberDirective, FundService, ProfileManagementService, CheckCustomerStepService, FundAttachmentTypeEnum, FundAttachment } from '@client/shared';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { HistoricalNAVComponent } from '../historical-nav/historical-nav.component';
import { NgClass, NgIf, DecimalPipe, CommonModule } from '@angular/common';
import { AssetChartComponent } from '@client/features/dashboard/asset-chart/asset-chart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCollapseModule, NgbAccordionModule, NgbTooltip, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompositionChartComponent } from '../composition-chart/composition-chart.component';
import { IndustryChartComponent } from '../industry-chart/industry-chart.component';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ToastService } from '@client/core/services/toast.service';
import { ReinvestPercentModalComponent } from '@client/shared/components/reinvest-percent-modal/reinvest-percent-modal.component';
import { FundListService } from '@client/core/services/fund-list.service';
import { ConsultingGuideComponent } from '@client/features/dashboard/consulting-guide/consulting-guide.component';
import { environment } from 'projects/client/src/environments/environment';
import { SvgViewerComponent } from '@client/shared/components/svg-viewer/svg-viewer.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fund-detail',
  standalone: true,
  imports: [HistoricalNAVComponent, CompositionChartComponent, AssetChartComponent, MaskNumberDirective,ConsultingGuideComponent,SvgViewerComponent,
    IndustryChartComponent, FontAwesomeModule, NgClass, NgIf, NgbTooltip, DecimalPipe, NgbCollapseModule, NgbAccordionModule, CommonModule, FormsModule],
  templateUrl: './fund-detail.component.html',
  styleUrl: './fund-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DecimalPipe
  ]
})
export class FundDetailComponent implements OnInit, OnDestroy {
  apiUrl: string = environment.apiUrl;
  fundInfo = signal<any>({});
  isCollapsed1 = true;
  isCollapsed2 = false;
  isCollapsed3 = false;
  isCollapsed4 = false;
  sectors = signal([]);
  bankDeposit = signal([]);
  reinvestLabel = signal('');
  lastMutualFund$ = new BehaviorSubject(null);
  assetCompositionCheckbox = true;
  attachmentTypes = FundAttachmentTypeEnum;
  bestLimit = signal<any>(null);
  bgImage: string = '';

  private destroy$ = new Subject<void>();
  fundCode;
  constructor(
    private fundInfoService: FundInfoService,
    private fundListService: FundListService,
    private route: ActivatedRoute,
    private fundService: FundService,
    private profileManagementService: ProfileManagementService,
    private toast: ToastService,
    public checkCustomerStepService: CheckCustomerStepService,
    private ngbModal: NgbModal,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
  ) {
    this.fundCode = this.route.snapshot.paramMap.get('fundCode');
  }
  ngOnInit(): void {
    this.fundInfoService.getFundInfoData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data && data.mutualFundDetail) {
          this.fundInfo.set(data)
          this.getBankDeposit(data.mutualFundDetail.mutualFundId);
          this.subscribeToBestLimitUpdates(data.mutualFundDetail.mutualFundId);
          this.loadBackgroundSvg();
        }
      });
    this.getFundSector();
    this.getLastMutualFundAssetByCode();
  }

  getFundTypeClass(fundType: FundTypeEnum): string {
    switch (fundType) {

      case FundTypeEnum.FixedIncome: return 'bg-fixed-income';
      case FundTypeEnum.Stock: return 'bg-stock';
      case FundTypeEnum.Mixed: return 'bg-mixed';
      default: return '';
    }
  }

  getFundSector() {
    let colors = [
      '#0F4C2E',
      '#D13438',
      '#1A5276',
      '#FFB400',
      '#6C3483',
      '#C71585',
      '#8B4513',
      '#2C3E50'
    ];

    this.fundService.getFundSector(this.fundCode).subscribe(data => {
      const sortedData = data.sort((a, b) => b?.percent - a?.percent);
      sortedData.forEach((item: any, index: number) => {
        item.color = colors[index];
      });
      this.sectors.set(sortedData);
    });
  }
  getLastMutualFundAssetByCode() {
    this.fundService.getLastMutualFundAssetByCode(this.fundCode).subscribe((data: any) => {
      
      const allItems  = [      
        {
          name: data?.bond?.title,
          value: data?.bond?.value,
          color: '#66B0A1'
        }, 
        {
          name: data?.deposit?.title,
          value: data?.deposit?.value,
          color: '#F76D6A'
        }, 
        {
          name: data?.fiveBestStock?.title,
          value: data?.fiveBestStock?.value,
          color: '#5DA7C0'
        },        
        {
          name: data?.stock?.title,
          value: data?.stock?.value,
          color: '#9B59B6'
        },
        {
          name: data?.depositCertificate?.title +' '+'طلا',
          value: data?.depositCertificate?.value,
          color: '#0734fa93'
        },
        {
          name: data?.cash?.title,
          value: data?.cash?.value,
          color: '#ff000086'
        },
        {
          name: data?.netAsset?.title,
          value: data?.netAsset?.value,
          color: '#6af7e0ad'
        },
        {
          name: data?.other?.title,
          value: data?.other?.value,
          color: '#FFD54F'
        }, 
      ]

      // const _data = allItems.sort((a, b) => a.value - b.value);
      const _data = allItems;
      this.lastMutualFund$.next(_data);
    })
  }

  // reinvestMutualFund(mutualFund: any, event: Event) {
  //   const isChecked = (event.target as HTMLInputElement).checked;
  //   let reinvest = mutualFund.customerEvidence?.reinvest;
  //   reinvest = isChecked ? 1 : 0;
  //   const command = {
  //     "mutualFundId": mutualFund?.customerEvidence?.fundId,
  //     reinvest
  //   }
  //   this.profileManagementService.reinvestMutualFund(command)
  //     .subscribe((res: any) => {
  //       if (!res.isError) {
  //         this.toast.show(`سرمایه‌گذاری مجدد از محل تقسیم سود ${res.result === 1 ? 'فعال' : 'غیرفعال'} شد`, { classname: 'bg-info text-white' });

  //       }

  //     })

  // }

  getBankDeposit(mutualFundId) {
    this.fundService.getAllBankDepositByMutualFundId(mutualFundId)
      .subscribe((data) => {
        if (data) {
          this.bankDeposit.set(data)
        }
      });
  }

  subscribeToBestLimitUpdates(fundId: number) {
    // Subscribe to live updates from FundListService
    this.fundListService.getAllMutualFunds()
      .pipe(takeUntil(this.destroy$))
      .subscribe(funds => {
        const currentFund = funds.find(f => f.mutualFundId === fundId);
        if (currentFund && (currentFund as any).buyPrice && (currentFund as any).sellPrice) {
          this.bestLimit.set({
            buyPrice: (currentFund as any).buyPrice,
            sellPrice: (currentFund as any).sellPrice,
            lastUpdated: (currentFund as any).lastUpdated
          });
          this.cdr.markForCheck();
        }
      });

    // Fallback: Get initial bestLimit if not available from FundListService
    setTimeout(() => {
      if (!this.bestLimit()) {
        this.fundService.bestLimitByFundId(fundId)
          .subscribe({
            next: (v: any) => {
              this.bestLimit.set(v);
              this.cdr.markForCheck();
            }
          });
      }
    }, 1000);
  }

  copyToClipboard(text: string) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // Use the modern Clipboard API
      navigator.clipboard.writeText(text).then(() => {
        this.toast.show('متن کپی شد', {
          classname: 'bg-success text-light',
          delay: 1000
        });
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    } else {
      // Fallback for older browsers (including some Safari versions)
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed'; // Prevent scrolling to the bottom
      textarea.style.opacity = '0'; // Hide it from view
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        this.toast.show('متن کپی شد', {
          classname: 'bg-success text-light',
          delay: 1000
        });
      } catch (err) {
        console.error('Failed to copy text using fallback method: ', err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }



  openReinvestPercentModal(mutualFundDetail, $event) {
    $event.preventDefault()
    const modalRef = this.ngbModal.open(ReinvestPercentModalComponent,
      { modalDialogClass: 'modal-holder  modal-dialog-centered', size: 'md', backdrop: 'static' });
    modalRef.componentInstance.mutualFundId = mutualFundDetail?.mutualFundDetail?.mutualFundId;
    modalRef.componentInstance.reinvestPercent = mutualFundDetail?.customerEvidence?.reinvest;
    modalRef.result.then((result: { activePercent: number, action: number }) => {
      if (result?.action !== 2) {
        this.fundInfo.update((mutualFundDetail: any) => {
          mutualFundDetail.customerEvidence.reinvest = result?.activePercent
          return mutualFundDetail
        })
      } else return;
      this.cdr.detectChanges()
    })
  }

  getAttachment(attachmentType: FundAttachmentTypeEnum): FundAttachment {
    return this.fundInfo()?.mutualFundDetail?.attachments?.find(a => a.categoryId === attachmentType);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fundLinks = {
    1: {
      name: 'هزاره سوم پاد',
      url: 'https://academy.ipasargad.ir/what-is-hezareh3-pod-in-wepod'
    },
    2: {
      name: 'پاسارگاد',
      url: 'https://academy.ipasargad.ir/pasargad-fixed-income-fund'
    },
    3: {
      name: 'ریتون',
      url: 'https://academy.ipasargad.ir/what-is-rhyton-gold-fund'
    }
  };

  getFundInfo() {
    const id = this.fundInfo()?.mutualFundDetail?.mutualFundId;
    return this.fundLinks[id] || null;
  }


  encodeSvgToBase64(svgContent: string): string {
    return btoa(
      encodeURIComponent(svgContent).replace(
        /%([0-9A-F]{2})/g,
        (_, hex) => String.fromCharCode(parseInt(hex, 16))
      )
    );
  }

  loadBackgroundSvg() {
    const link :any = this.getAttachment(this.attachmentTypes.FundDetailsBg);
    
    if (!link) return;
  
    const fullUrl = `${this.apiUrl}/${link?.downloadLink}`;
  
    this.http.get(fullUrl, { responseType: 'text' }).subscribe(svg => {
      const base64 = this.encodeSvgToBase64(svg);
      this.bgImage = `url("data:image/svg+xml;base64,${base64}")`;
        this.cdr.detectChanges();
    });
  }

}

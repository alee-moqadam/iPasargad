import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FundItemComponent } from './fund-item/fund-item.component';
import { FundListService } from '@client/core/services/fund-list.service';
import { Observable, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MutualFundCarouselComponent } from '@client/shared/components/mutual-fund-carousel/mutual-fund-carousel.component';
import { FundService, CustomerRequestCompositionModel } from '@client/shared';

@Component({
  selector: 'app-fund-list',
  standalone: true,
  imports: [FundItemComponent, AsyncPipe, NgbCarouselModule, MutualFundCarouselComponent],
  templateUrl: './fund-list.component.html',
  styleUrl: './fund-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundListComponent implements OnInit {
  mutualFundList$: Observable<any>;
  fundType = signal(null);
  allMutualFundDetail = signal([])
  compositionsByCode = signal<Record<number, CustomerRequestCompositionModel>>({});

  constructor(private fundListService: FundListService, private route: ActivatedRoute, private fundService: FundService) {
    this.mutualFundList$ = this.fundListService.getAllMutualFunds();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.fundType.set(params.fundType)
    });

    this.mutualFundList$
      .subscribe((fundList: any) => {
        this.allMutualFundDetail.set(fundList);
      })

    this.fundService.getCustomerRequestCompositions({ date: new Date() })
      .pipe(take(1))
      .subscribe((list: CustomerRequestCompositionModel[]) => {
        const map: Record<number, CustomerRequestCompositionModel> = {};
        (list || []).forEach(c => { map[c.mutualFundCode] = c; });
        this.compositionsByCode.set(map);
      });
  }


}

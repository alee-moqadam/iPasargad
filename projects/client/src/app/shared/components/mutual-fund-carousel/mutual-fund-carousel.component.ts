import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FundListService } from '@client/core/services/fund-list.service';
import { FundAttachmentTypeEnum } from '@client/shared/enums';
import { FundAttachment } from '@client/shared/rest-services';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'projects/client/src/environments/environment';

@Component({
  selector: 'mutual-fund-carousel',
  standalone: true,
  imports: [NgbCarouselModule, NgFor, NgIf, RouterLink],
  templateUrl: './mutual-fund-carousel.component.html',
  styleUrl: './mutual-fund-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MutualFundCarouselComponent implements OnInit {
  apiUrl: string = environment.apiUrl;

  allMutualFundDetail = signal(null);

  constructor(
    private fundListService: FundListService,
  ) {

  }
  
  ngOnInit(): void {
    this.getAllNutualFundInfo();
  }

  // getAllNutualFundInfo() {
  //   this.fundListService.getAllMutualFunds()
  //     .subscribe({
  //       next: (v) => {
  //         this.allMutualFundDetail.set(v);
  //       }
  //     })
  // }

  getAllNutualFundInfo() {
    this.fundListService.getAllMutualFunds()
      .subscribe({
        next: (fundList) => {

          const sortedList = [...fundList].sort((a, b) => {
            const pA =
              this.getImage(a)?.priority ?? 999;

            const pB =
              this.getImage(b)?.priority ?? 999;

            return pA - pB;
          });

          this.allMutualFundDetail.set(sortedList);
        }
      });
  }

  getImage(fund): FundAttachment | undefined {
    return fund?.attachments?.find(
      a => a.categoryId === FundAttachmentTypeEnum.VerticalBanner
    );
  }

}

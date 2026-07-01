import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FundListService } from '@client/core/services/fund-list.service';
import { FundAttachment, FundAttachmentTypeEnum } from '@client/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from 'projects/client/src/environments/environment';

@Component({
  selector: 'app-more-tools',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, NgIf],
  templateUrl: './more-tools.component.html',
  styleUrl: './more-tools.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoreToolsComponent implements OnInit {
  allMutualFundDetail = signal([]);
  apiUrl: string = environment.apiUrl;

  constructor(
    private fundListService: FundListService,
  ) {


  }

  ngOnInit(): void {
    this.fundListService.getAllMutualFunds().subscribe(fundList => {
      this.allMutualFundDetail.set(fundList);
    });
  }

    getImage(fund): FundAttachment {
      return fund?.attachments?.find(a => a.categoryId === FundAttachmentTypeEnum.HorizontalBanner);
    }


}

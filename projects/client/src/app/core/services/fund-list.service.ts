import { Injectable, OnDestroy } from '@angular/core';
import { FundService, MutualFundDetailsModel } from '@client/shared';
import { BehaviorSubject, Observable, forkJoin, map, of, switchMap, timer, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';

interface BestLimit {
  buyPrice: number;
  sellPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class FundListService implements OnDestroy {
  private $mutualFunds = new BehaviorSubject<MutualFundDetailsModel[]>([]);
  private destroy$ = new Subject<void>();
  private readonly BEST_LIMIT_INTERVAL = 30000;
  constructor(private fundService: FundService) {
    this.fetchAllMutualFunds();
    this.startUpdateInterval();
  }

  getAllMutualFunds(): Observable<MutualFundDetailsModel[]> {
    return this.$mutualFunds.asObservable();
  }

  // private fetchAllMutualFunds(): void {
  //   this.fundService.getAllMutualFundsDetail()
  //     .pipe(
  //       switchMap(funds => {
  //         const fundsWithDetails$ = funds.map(fund =>
  //           fund.investType === 2
  //             ? this.getBestLimit(fund.mutualFundId).pipe(
  //                 map(limit => ({
  //                   ...fund,
  //                   buyPrice: limit?.buyPrice,
  //                   sellPrice: limit?.sellPrice
  //                 }))
  //               )
  //             : of(fund)
  //         );
  //         return forkJoin(fundsWithDetails$);
  //       })
  //     )
  //     .subscribe(fundsWithDetails => {
  //       this.$mutualFunds.next(fundsWithDetails);
  //       fundsWithDetails.forEach((fund, idx) => {
  //         this.getFundAttachments(fund).subscribe(fundWithAttachments => {
  //           const updatedFunds = [...this.$mutualFunds.value];
  //           updatedFunds[idx] = fundWithAttachments;
  //           this.$mutualFunds.next(updatedFunds);
  //         });
  //       });
  //     });
  // }

  private fetchAllMutualFunds(): void {
    this.fundService.getAllMutualFundsDetail().pipe(
  
      switchMap(funds => {
        const fundsWithDetails$ = funds.map(fund =>
          fund.investType === 2
            ? this.getBestLimit(fund.mutualFundId).pipe(
                map(limit => ({
                  ...fund,
                  buyPrice: limit?.buyPrice,
                  sellPrice: limit?.sellPrice
                }))
              )
            : of(fund)
        );
        return forkJoin(fundsWithDetails$);
      }),
  
      switchMap(fundsWithDetails => {
        this.$mutualFunds.next(fundsWithDetails);
        const fundIds = fundsWithDetails.map(f => f.mutualFundId);
  
        return this.getNewFundAttachmentAll(fundIds).pipe(
          map(attachments => {
            const attachmentMap = attachments.reduce((acc, item) => {
              if (!acc[item.mutualFundId]) {
                acc[item.mutualFundId] = [];
              }
              acc[item.mutualFundId].push(item);
              return acc;
            }, {} as Record<number, any[]>);
  
            return fundsWithDetails.map(fund => ({
              ...fund,
              attachments: attachmentMap[fund.mutualFundId] ?? []
            }));
          })
        );
      })
  
    ).subscribe(finalFunds => {
      this.$mutualFunds.next(finalFunds);
    });

    console.log('$mutualFunds', this.$mutualFunds);
    
  }


  private getBestLimit(fundId: number): Observable<BestLimit> {
    return this.fundService.bestLimitByFundId(fundId).pipe(
      map(result => ({
        sellPrice: result?.sellPrice,
        buyPrice: result?.buyPrice
      }))
    );
  }

  private getFundAttachments(fund: MutualFundDetailsModel): Observable<MutualFundDetailsModel> {
    return this.fundService.getFundAttachments(fund.mutualFundId).pipe(
      map((res: any) => ({
        ...fund,
        attachments: res?.result ?? [],
      }))
    );
  }

  private getFundAttachmentAll(fundIds: number[]): Observable<any[]> {    
    return this.fundService.getFundAttachmentAll(fundIds).pipe(
      map((res: any) => res?.result ?? [])
    );
  }
  
  private getNewFundAttachments(fund: MutualFundDetailsModel): Observable<MutualFundDetailsModel> {
    return this.fundService.getFundAttachments(fund.mutualFundId).pipe(
      map((res: any) => ({
        ...fund,
        attachments: res?.result ?? [],
      }))
    );
  }

  private getNewFundAttachmentAll(fundIds: number[]): Observable<any[]> {    
    return this.fundService.getNewFundAttachmentAll(fundIds).pipe(
      map((res: any) => res?.result ?? [])
    );
  }

  private startUpdateInterval(): void {
    timer(this.BEST_LIMIT_INTERVAL, this.BEST_LIMIT_INTERVAL)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateBestLimit();
      });

    // Fake data updates every 2 seconds for testing
    // timer(2000, 2000)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(() => {
    //     this.sendFakeDataUpdatesToTest();
    //   });
  }

  private updateBestLimit(): void {
    const currentFunds = this.$mutualFunds.value;
    const funds = currentFunds.filter(fund => fund.fundType === 5);
    
    if (funds.length === 0) {
      return;
    }

    const updatedFunds$ = funds.map(fund =>
      this.getBestLimit(fund.mutualFundId).pipe(
        map(limit => ({
          ...fund,
          buyPrice: limit?.buyPrice,
          sellPrice: limit?.sellPrice
        }))
      )
    );

    forkJoin(updatedFunds$).subscribe(updatedFundsType5 => {
      const allFunds = [...currentFunds];
      
      updatedFundsType5.forEach(updatedFund => {
        const index = allFunds.findIndex(f => f.mutualFundId === updatedFund.mutualFundId);
        if (index !== -1) {
          allFunds[index] = updatedFund;
        }
      });
      
      this.$mutualFunds.next(allFunds);
    });
  }

  private sendFakeDataUpdatesToTest(): void {
    const currentFunds = this.$mutualFunds.value;
    
    if (currentFunds.length === 0) {
      return;
    }

    const updatedFunds = currentFunds.map(fund => {
      if (fund.fundType === 5) {
        return {
          ...fund,
          buyPrice: (fund as any).buyPrice ? this.generateFakePrice((fund as any).buyPrice) : (fund as any).buyPrice,
          sellPrice: (fund as any).sellPrice ? this.generateFakePrice((fund as any).sellPrice) : (fund as any).sellPrice,
          lastUpdated: new Date().toISOString()
        };
      }
      return fund;
    });

    this.$mutualFunds.next(updatedFunds);
    const updatedCount = updatedFunds.filter(f => f.fundType === 5).length;
    console.log('🔄 FAKE DATA UPDATE - Timestamp:', new Date().toLocaleTimeString(), 
                'Updated fundType=5 count:', updatedCount);
  }

  private generateFakePrice(originalPrice: number): number {
    const changePercent = (Math.random() - 0.5) * 0.1;
    const newPrice = originalPrice * (1 + changePercent);
    return Math.round(newPrice * 100) / 100;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

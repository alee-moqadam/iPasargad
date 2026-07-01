export interface BestLimitRoot {
    result: BestLimit
    message: string
    isError: boolean
    bRuleCode: number
    totalRecords: number
    pageSize: number
    traceId: string
  }
  
  export interface BestLimit {
    sellPrice: number
    buyPrice: number
    lastUpdate: string
    lastUpdateJalali: string
  }
  
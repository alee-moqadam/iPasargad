import { Route } from "@angular/router";
import { ReportsComponent } from "./reports.component";
import { RequestsReportComponent } from "./requests-report/requests-report.component";
import { RequestsFilterComponent } from "./requests-report/requests-filter/requests-filter.component";
import { PaymentReportComponent } from "./payment-report/payment-report.component";
import { PaymentFilterComponent } from "./payment-report/payment-filter/payment-filter.component";
import { AccountingReportComponent } from "./accounting-report/accounting-report.component";
import { AccountingFilterComponent } from "./accounting-report/accounting-filter/accounting-filter.component";
import { DividendReportComponent } from "./dividend-report/dividend-report.component";
import { DividendFilterComponent } from "./dividend-report/dividend-filter/dividend-filter.component";
import { HostListener } from "@angular/core";
import { ReportMenusComponent } from './report-menus/report-menus.component';

const pageWidth = window.innerWidth;
export const reports_routes: Route[] = [
    {
        path: '',
        redirectTo: pageWidth >= 991 ? '/reporting/requests' : '/reporting/report-menus',
        pathMatch: 'full'
    },
    {
        path: '',
        component: ReportsComponent,
        children: [
            { path: 'report-menus', component: ReportMenusComponent },
            { path: 'requests', children: [{ path: '', component: RequestsReportComponent }, { path: '', component: RequestsFilterComponent, outlet: 'filter' }] },
            { path: 'payments', children: [{ path: '', component: PaymentReportComponent }, { path: '', component: PaymentFilterComponent, outlet: 'filter' }] },
            { path: 'accounting', children: [{ path: '', component: AccountingReportComponent }, { path: '', component: AccountingFilterComponent, outlet: 'filter' }] },
            { path: 'dividend', children: [{ path: '', component: DividendReportComponent }, { path: '', component: DividendFilterComponent, outlet: 'filter' }] },
        ],
    }

];

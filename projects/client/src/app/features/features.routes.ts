import { Route } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FeaturesComponent } from "./features.component";
import { FundListComponent } from "./fund/fund-list/fund-list.component";
import { FundComponent } from "./fund/fund.component";
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from "./notifications/notifications.component";
import { FundDetailComponent } from "./fund/fund-detail/fund-detail.component";
import { UserFundsComponent } from "./fund/user-funds/user-funds.component";
import { fundCodeResolver } from "@client/shared";
import { TicketingComponent } from "./ticketing/ticketing.component";
import { WepodComponent } from "./wepod/wepod.component";
import { GiftCardComponent } from "./gift-card/gift-card.component";
import { MoreToolsComponent } from "./mobile/more-tools/more-tools.component";

import { MobileAboutUsComponent } from "./mobile/mobile-about-us/mobile-about-us.component";
import { MobileProfileComponent } from "./mobile/mobile-profile/mobile-profile.component";
import { MobileSecurityComponent } from "./mobile/mobile-security/mobile-security.component";
import { MobileHistoryComponent } from "./mobile/mobile-history/mobile-history.component";
import { MobileCustomerSupportComponent } from "./mobile/mobile-customer-support/mobile-customer-support.component";
import { MobileFaqComponent } from "./mobile/mobile-faq/mobile-faq.component";
import { MobileUserInfoComponent } from "./mobile/mobile-user-info/mobile-user-info.component";
import { MobileSettingComponent } from "./mobile/mobile-setting/mobile-setting.component";

export const features_routes: Route[] = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        component: FeaturesComponent,
        children: [
            {
                path: 'dashboard', component: DashboardComponent, data: {
                    pinnedMenu: true
                }
            },
            {
                path: 'fund-list', component: FundListComponent, data: {
                    reportMenu: [
                        // { name: 'درآمدثابت', link: '/fund-list/fixed-income' },
                        // { name: 'سهامی', link: '/fund-list/stock-fund' },
                        // { name: 'مختلط', link: '/fund-list/mixed-fund' },
                        // { name: 'کالایی', link: 'fund-list/commodity-fund' },
                    ],
                    pinnedMenu: true
                }
            },
            {
                path: 'fund-list/:fundType', component: FundListComponent, data: {
                    reportMenu: [
                        { name: 'درآمدثابت', link: '/fund-list/fixed-income' },
                        { name: 'سهامی', link: '/fund-list/stock-fund' },
                        { name: 'مختلط', link: '/fund-list/mixed-fund' },
                        // { name: 'کالایی', link: 'fund-list/commodity-fund' },
                    ],
                    pinnedMenu: false
                }
            },
            {
                path: 'fund/:fundCode', component: FundComponent,
                resolve: {
                    fundCode: fundCodeResolver
                },
                data: {
                    reportMenu: [
                        { name: 'دارایی شما در این صندوق', link: 'fund/:fundCode/user-fund/:fundCode' },
                        { name: 'معرفی صندوق', link: 'fund/:fundCode/fund-detail/:fundCode' },
                    ],
                    pinnedMenu: true
                },
                children: [
                    { path: 'fund-detail/:fundCode', component: FundDetailComponent },
                    { path: 'user-fund/:fundCode', component: UserFundsComponent },
                ]
            },
            {
                path: 'portfolio', component: PortfolioComponent, data: {
 
                    pinnedMenu: true
                }
            },
            { path: 'profile', component: ProfileComponent, data: { pinnedMenu: true } },
            { path: 'wepod', component: WepodComponent, data: { pinnedMenu: true } },
            { path: 'gift-card', component: GiftCardComponent, data: { pinnedMenu: true } },
            { path: 'settings', component: SettingsComponent, data: { pinnedMenu: true } },
            { path: 'notifications', component: NotificationsComponent, data: { pinnedMenu: true } },
            { path: 'tickets', component: TicketingComponent, data: { pinnedMenu: true } },
            {
                path: 'reporting',
                loadChildren: () => import('./reports/reports.routes').then(m => m.reports_routes),
                data: {

                    reportMenu: [
                        { name: 'درخواست‌ها', link: '/reporting/requests' },
                        { name: 'واریز وجه', link: '/reporting/payments' },
                        { name: 'حسابداری', link: '/reporting/accounting' },
                        { name: 'تقسیم سود', link: '/reporting/dividend' },
                    ],
                    pinnedMenu: true
                }
            },
            {
                path: 'gift-card', component: GiftCardComponent, data: { pinnedMenu: true }
            },
            {
                path: 'mobile/more-tools', component: MoreToolsComponent
            },
            {
                path: 'mobile/profile', component: MobileProfileComponent
            },
            {
                path: 'mobile/about-us', component: MobileAboutUsComponent
            },
            {
                path:'mobile/mobile-security' , component:MobileSecurityComponent
            },
            {
                path:'mobile/history' , component:MobileHistoryComponent
            },
            {
                path:'customer-support',
                component:MobileCustomerSupportComponent
            },
            {
                path:'mobile/faq',
                component:MobileFaqComponent
            },
            {
                path:'mobile/user-info' , 
                component:MobileUserInfoComponent
            },
            {
                path:'mobile/setting',
                component:MobileSettingComponent
            }
        ],
    }

];

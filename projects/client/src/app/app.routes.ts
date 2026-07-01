import { Routes } from '@angular/router';
import { PaymentReturnComponent } from './features/payment-return/payment-return.component';
import { TraditionalAccountReturnComponent } from './features/traditional-account-return/traditional-account-return.component';
import { ApayReturnComponent } from './features/apay-return/apay-return.component';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.auth_routes)
    },
    {
        path: 'payment-return',
        component:PaymentReturnComponent
    },
    {
        path: 'apay-return',
        component:ApayReturnComponent
    }
    ,
    {
        path: 'traditional-account-return',
        component:TraditionalAccountReturnComponent
    },
    {
        path: '',
        loadChildren: () => import('./features/features.routes').then(m => m.features_routes)
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    }
];

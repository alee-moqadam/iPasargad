import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { QuickRegisterComponent } from "./register/quick-register/quick-register.component";
import { QuickRegisterStep2Component } from "./register/quick-register-step2/quick-register-step2.component";
import { AuthComponent } from "./auth.component";
import { QuickSejamStep1Component } from "./register/quick-sejam-step1/quick-sejam-step1.component";
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { QuickSejamStep2Component } from './register/quick-sejam-step2/quick-sejam-step2.component';
import { RegisterLegalFormComponent } from "./register/register-legal-form/register-legal-form.component";
import { QuickSejamStep2LegalComponent } from "./register/quick-sejam-step2-legal/quick-sejam-step2-legal.component";


export const auth_routes: Route[] = [
    {
        path: 'reg',
        pathMatch: 'full',
        redirectTo: 'reg/step1'
    },
    {
        path: 'reg/step4',
        component: QuickSejamStep2Component, data: { infoSection: false }
    },
    {
        path: 'reg/step4-legal',
        component: QuickSejamStep2LegalComponent, data: { infoSection: false }
    },
    {
        path: 'reg/legal-step',
        component: RegisterLegalFormComponent, data: { infoSection: false }
    },
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'forget-password', component: ForgetPasswordComponent },

            {
                path: 'reg',
                children: [
                    { path: 'step1', component: QuickRegisterComponent },
                    { path: 'step2', component: QuickRegisterStep2Component },
                    { path: 'step3', component: QuickSejamStep1Component },
                ]
            },
            {
                path: '', pathMatch: 'full',
                redirectTo: 'login'
            },
        ],
    },


];

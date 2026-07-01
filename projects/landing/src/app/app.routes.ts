import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'gift',
        loadComponent: () => import('./gift-landing/gift-landing.component').then(m => m.GiftLandingComponent)
    },
    {
        path: 'rhyton',
        loadComponent: () => import('./rhyton/rhyton.component').then(m => m.RhytonComponent)
    },
    {
        path: 'download',
        loadComponent: () => import('./download/download.component').then(m => m.DownloadComponent)
    },
    {
        path: 'pasargadetf',
        loadComponent: () => import('./etf/etf.component').then(m => m.EtfComponent)
    },
    {
        path: 'hezareh3-pod',
        loadComponent: () => import('./hezareh3-pod/hezareh3-pod.component').then(m => m.Hezareh3PodComponent)
    },
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'about-us',
        loadComponent: () => import('./about-us/about-us.component').then(m => m.AboutUsComponent)
    },
    {
        path: 'contact-us',
        loadComponent: () => import('./contact-us/contact-us.component').then(m => m.ContactUsComponent)
    },
    {
        path: 'takpod',
        loadComponent: () => import('./takpod/takpod.component').then(m => m.TakpodComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];

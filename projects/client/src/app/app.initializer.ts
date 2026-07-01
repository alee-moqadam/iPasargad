import { HttpBackend, HttpClient, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { APP_INITIALIZER, Provider } from '@angular/core';
import { map, catchError, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

interface XiinitialUrl {
    apiUrl: string;
}
const INITIALIZE_URL = environment.identityUrl + '/Account/IsAuthorized';
// const INITIALIZE_URL = environment.apiUrl + '/profilemanagement/getcustomerinfo';
const EXCLUSION_STRINGS = ['/reg/', '/forget-password','/payment-return','/apay-return','/traditional-account-return']; // Define paths to exclude from redirection
const AUTH_PATHS = ['/auth/login', '/auth/forget-password', '/auth/reg', '/auth/reg/step1', '/auth/reg/step2', '/auth/reg/step3', '/auth/reg/step4', '/auth/reg/step4-legal', '/auth/reg/legal-step']; // Define auth paths

export function appInitializer(http: HttpBackend, router: Router) {
    return () => {
        return http.handle(new HttpRequest('GET', INITIALIZE_URL, { withCredentials: true }))
            .pipe(
                map((response: HttpResponse<any>) => {
                    // Check if the user is logged in based on the response
                    if (response?.status === 200) {
                        const currentPath = window.location.href;                                
                        // Redirect to the dashboard if the user is authenticated
                        if (AUTH_PATHS.some((str) => currentPath.includes(str))) {
                            router.navigate(['/dashboard']);
                        }
                    }
                    if (response?.status === 401) {
                        // Redirect to login if the user is not authenticated
                        console.log('redirect to login');
                        router.navigate(['/auth/login']);
                    }
                }),
                catchError((error: any) => {
                    const currentPath = window.location.href;
                    console.error('Error loading initialUrl:', error);
                    // Redirect to login only if the current page is not excluded
                    if (!EXCLUSION_STRINGS.some((str) => currentPath.includes(str))) {
                        console.log('Redirecting to login due to error');
                        // Redirect to login in case of error
                        router.navigate(['/auth/login']);
                    }

                    return of(true); // Return an empty observable to handle the error gracefully
                })
            )
            .toPromise(); // Ensure the initializer waits for the completion
    };
}

export function provideAppInitializer(): Provider {
    return {
        provide: APP_INITIALIZER,
        useFactory: appInitializer,
        deps: [HttpBackend, Router],
        multi: true,
    };
}

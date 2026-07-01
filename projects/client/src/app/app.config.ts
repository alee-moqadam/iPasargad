import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpRequestInterceptor } from './core/interceptors/http-request.interceptor';
import { httpResponseInterceptor } from './core/interceptors/http-response.interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAppInitializer } from './app.initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpRequestInterceptor, httpErrorInterceptor, httpResponseInterceptor])), provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:10000'
    }),
  ]
};

import { ApplicationConfig } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import {
  NgHttpCachingConfig,
  NgHttpCachingModule,
  NgHttpCachingStrategy,
} from 'ng-http-caching';
import { routes } from './app.routes';
import { MatDialogModule } from '@angular/material/dialog';
import { errorInterceptor } from './interceptors/error.interceptor';

const ngHttpCachingConfig: NgHttpCachingConfig = {
  lifetime: 1000 * 60 * 10, // cache expire after 10 min,
  allowedMethod: ['GET', 'HEAD'],
  cacheStrategy: NgHttpCachingStrategy.ALLOW_ALL,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAnimations(),
    importProvidersFrom(
      NgHttpCachingModule.forRoot(ngHttpCachingConfig),
      MatDialogModule,
    ),
  ],
};

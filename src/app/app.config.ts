import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
     provideRouter(routes ,withViewTransitions()),
     provideClientHydration(),
     provideHttpClient(withFetch()),
     provideAnimations(),
     provideToastr(), 
     importProvidersFrom(NgxSpinnerModule)
     ]
};

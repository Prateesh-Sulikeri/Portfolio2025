import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'disabled',          // 🔴 stop Angular from auto-scrolling to #anchors
        scrollPositionRestoration: 'disabled' // 🔴 no auto restore
      })
    ),
    importProvidersFrom(HttpClientModule, FormsModule)
  ]
};

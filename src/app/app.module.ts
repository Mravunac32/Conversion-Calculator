import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MaterialModule } from './shared/material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatSidenavModule } from '@angular/material/sidenav';

export const BASE_HREF = new InjectionToken<string>('Base url for the backend');
export const API_KEY = new InjectionToken<string>('API Key for Abstract API');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: BASE_HREF, useValue: environment.baseHref },
    { provide: API_KEY, useValue: environment.apiKey }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Landingpage } from './landingpage/landingpage';
import { provideOAuthClient } from 'angular-oauth2-oidc';


@NgModule({
  declarations: [
    App,
    Landingpage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    provideOAuthClient()
  ],
  bootstrap: [App]
})
export class AppModule { }

import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Landingpage } from './landingpage/landingpage';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { ModalComponent } from './modal-component/modal-component';
import { DialogModule } from '@angular/cdk/dialog';
import { EditarLugarModalComponent } from './edit-modal-component/edit-modal-component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [App, Landingpage, EditarLugarModalComponent],
  imports: [BrowserModule, AppRoutingModule, ModalComponent, DialogModule, ReactiveFormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    provideOAuthClient(),
  ],
  bootstrap: [App],
})
export class AppModule {}

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
import { ConfirmationComponent } from './dialog/confirmation-component/confirmation-component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertComponent } from './dialog/alert-component/alert-component';

@NgModule({
  declarations: [App, Landingpage, EditarLugarModalComponent, ConfirmationComponent, AlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalComponent,
    DialogModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIcon,
    MatSnackBarModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    provideOAuthClient(),
  ],
  bootstrap: [App],
})
export class AppModule {}

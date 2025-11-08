import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Landingpage } from './landingpage/landingpage';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { ModalComponent } from './modals/modal-component/modal-component';
import { DialogModule } from '@angular/cdk/dialog';
import { EditarLugarModalComponent } from './modals/edit-modal-component/edit-modal-component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from './dialog/confirmation-component/confirmation-component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [App, Landingpage, EditarLugarModalComponent, ConfirmationComponent],
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

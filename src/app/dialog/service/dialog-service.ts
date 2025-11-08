import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationComponent } from '../confirmation-component/confirmation-component';
import { ConfirmationData } from '../confirmation-component/ConfirmationData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  confirmar(data: ConfirmationData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '400px',
      data,
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '150ms',
    });

    return dialogRef.afterClosed();
  }

  sucesso(mensagem: string, duracao: number = 3000): void {
    this.snackBar.open(mensagem, 'OK', {
      duration: duracao,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
  }

  erro(mensagem: string, duracao: number = 4000): void {
    this.snackBar.open(mensagem, 'OK', {
      duration: duracao,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  }

  aviso(mensagem: string, duracao: number = 3500): void {
    this.snackBar.open(mensagem, 'OK', {
      duration: duracao,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-warning']
    });
  }

  info(mensagem: string, duracao: number = 3000): void {
    this.snackBar.open(mensagem, 'OK', {
      duration: duracao,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-info']
    });
  }
}
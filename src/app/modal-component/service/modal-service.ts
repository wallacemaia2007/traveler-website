import { Injectable, inject } from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private dialog = inject(Dialog);

  abrir<T, R = any>(componente: ComponentType<T>, dados?: any, largura?: string): DialogRef<R> {
    return this.dialog.open<R, any>(componente, {
      data: dados,
      width: largura || '600px',
      panelClass: 'modal-overlay',
      disableClose: false,
      hasBackdrop: false, 
    });
  }

  fecharTodos(): void {
    this.dialog.closeAll();
  }
}

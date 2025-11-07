import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { LugarClass } from '../../lugares/lugarClass';
import { GaleriaService } from '../../galeria/service/galeria-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../dialog/confirmation-component/confirmation-component';
import { ConfirmationData } from '../../dialog/confirmation-component/ConfirmationData';
import { LugarService } from '../../lugares/service/lugar-service';

@Component({
  selector: 'app-modal-detalhes-lugar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-component.html',
  styleUrl: './modal-component.scss',
})
export class ModalComponent {
  lugar = inject<LugarClass>(DIALOG_DATA);
  private dialogRef = inject(DialogRef);
  galeriaService = inject(GaleriaService);

  constructor(private dialog: MatDialog, private lugarService: LugarService) {}

  getEstrelasHtml(): string {
    const avaliacao = this.lugar.avaliacao || 0;
    const estrelasPreenchidas = '★'.repeat(avaliacao);
    const estrelasVazias = '☆'.repeat(5 - avaliacao);
    return `<span class="text-yellow-500">${estrelasPreenchidas}</span><span class="text-gray-300">${estrelasVazias}</span>`;
  }

  getPopularidade(): string {
    const avaliacao = this.lugar.avaliacao || 0;
    if (avaliacao >= 4.5) return 'Muito Popular ';
    if (avaliacao >= 3.5) return 'Popular ';
    if (avaliacao >= 2.5) return 'Moderado ';
    return 'Em Crescimento ';
  }

  alterar(): void {
    this.dialogRef.close({ acao: 'alterar', lugar: this.lugar });
  }

  deletar(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '400px',
      data: {
        title: 'Excluir lugar',
        message: 'Tem certeza que deseja excluir este lugar?',
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
      } as ConfirmationData,
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '150ms',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.galeriaService.emitirDelecao(this.lugar);
        this.dialogRef.close({ acao: 'deletar', lugar: this.lugar });
      }
    });
  }

  fechar(): void {
    this.dialogRef.close();
  }

  fecharSeClicarFora(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.fechar();
    }
  }
}

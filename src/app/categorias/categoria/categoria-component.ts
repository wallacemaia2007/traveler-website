import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from './service/categoria-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../dialog/confirmation-component/confirmation-component';
import { ConfirmationData } from '../../dialog/confirmation-component/ConfirmationData';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '../../dialog/service/dialog-service';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrls: ['./categoria.scss'],
})
export class Categoria implements OnInit {
  camposForm: FormGroup;

  constructor(private service: CategoriaService, private dialog: MatDialog, private dialogService: DialogService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  salvarCategoria() {
    this.camposForm.markAllAsTouched();

    if (this.camposForm.valid) {
      this.service.listarTodos().subscribe({
        next: (categorias) => {
          const nome = this.camposForm.value.nome?.toLowerCase();
          if (categorias.some((cat) => cat.nome!.toLowerCase() === nome)) {
            this.dialogService.aviso('Categoria já existe!');
            return;
          }

          this.service.salvar(this.camposForm.value).subscribe({
            next: (categoria) => {
              this.dialogService.sucesso('Categoria salva com sucesso!');
              this.camposForm.reset();
            },
            error: (error) => this.dialogService.erro('Erro ao salvar a categoria: ' + error),
          });
        },
        error: (error) => this.dialogService.erro('Erro ao listar categorias: ' + error),
      });
    }
  }

  isCampoInvalido(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return (campo?.invalid && (campo?.touched || campo?.dirty)) || false;
  }

  resetarCampos() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Limpar campos',
        message: 'Deseja limpar os campos?',
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
      } as ConfirmationData,
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '150ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.camposForm.reset();
      }
    });
  }

}

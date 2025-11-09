import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaClass } from '../../categorias/categoriaClass';
import { CategoriaService } from '../../categorias/categoria/service/categoria-service';
import { LugarService } from '../service/lugar-service';
import { ConfirmationComponent } from '../../dialog/confirmation-component/confirmation-component';
import { ConfirmationData } from '../../dialog/confirmation-component/ConfirmationData';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '../../dialog/service/dialog-service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.html',
  styleUrl: './lugar.scss',
})
export class Lugar implements OnInit {
  camposForm: FormGroup;
  categorias: CategoriaClass[] = [];
  snack: MatSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.categoriaService.listarTodos().subscribe({
      next: (listarCategorias) => (this.categorias = listarCategorias),
    });
  }

  constructor(
    private categoriaService: CategoriaService,
    private service: LugarService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      imagemUrl: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required),
      notas: new FormControl('', Validators.required),
    });
  }

  salvar() {
    this.camposForm.markAllAsTouched();
    if (this.camposForm.valid) {
      this.service.listarTodos().subscribe({
        next: (lugares) => {
          const nome = this.camposForm.value.nome?.toLowerCase();
          if (lugares.some((lug) => lug.nome!.toLowerCase() === nome)) {
            this.dialogService.aviso('Lugar já existe!');
            return;
          }
          this.service.salvar(this.camposForm.value).subscribe({
            next: (lugar) => {
              this.dialogService.sucesso('Lugar salvo com sucesso!');
              this.camposForm.reset();
            },
            error: (error) => {
              this.dialogService.erro('Erro ao salvar o lugar: ' + error);
            },
          });
        },
        error: (error) => this.dialogService.erro('Erro ao listar lugares: ' + error),
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

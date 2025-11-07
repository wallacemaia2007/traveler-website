import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaClass } from '../../categorias/categoriaClass';
import { CategoriaService } from '../../categorias/categoria/service/categoria-service';
import { LugarService } from '../service/lugar-service';
import { ConfirmationComponent } from '../../dialog/confirmation-component/confirmation-component';
import { ConfirmationData } from '../../dialog/confirmation-component/ConfirmationData';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.html',
  styleUrl: './lugar.scss',
})
export class Lugar implements OnInit {
  camposForm: FormGroup;
  categorias: CategoriaClass[] = [];

  ngOnInit(): void {
    this.categoriaService.listarTodos().subscribe({
      next: (listarCategorias) => (this.categorias = listarCategorias),
    });
  }

  constructor(private categoriaService: CategoriaService, private service: LugarService, private dialog: MatDialog) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      imagemUrl: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required),
    });
  }

  salvar() {
    this.camposForm.markAllAsTouched();
    if (this.camposForm.valid) {
      this.service.salvar(this.camposForm.value).subscribe({
        next: (lugar) => {
          console.log('Lugar salvo com sucesso:', lugar);
          this.camposForm.reset();
        },
        error: (error) => console.error('Erro ao salvar o lugar:', error),
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

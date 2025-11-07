import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { LugarService } from '../../lugares/service/lugar-service';
import { LugarClass } from '../../lugares/lugarClass';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaClass } from '../../categorias/categoriaClass';
import { CategoriaService } from '../../categorias/categoria/service/categoria-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-lugar-modal',
  standalone: false,
  templateUrl: './edit-modal-component.html',
})
export class EditarLugarModalComponent implements OnInit {
  lugar: LugarClass;
  camposForm: FormGroup;
  categorias: CategoriaClass[] = [];

  constructor(
    private lugarService: LugarService,
    private categoriaService: CategoriaService,
    private dialogRef: DialogRef<{ acao: string; lugar: LugarClass }>,
    @Inject(DIALOG_DATA) public data: { lugar: LugarClass },
    private snack: MatSnackBar,
  ) {
    this.lugar = { ...data.lugar };
    this.camposForm = new FormGroup({
      nome: new FormControl(this.lugar.nome, Validators.required),
      categoria: new FormControl(this.lugar.categoria, Validators.required),
      localizacao: new FormControl(this.lugar.localizacao, Validators.required),
      imagemUrl: new FormControl(this.lugar.imagemUrl, Validators.required),
      avaliacao: new FormControl(this.lugar.avaliacao, Validators.required),
    });
  }

  ngOnInit(): void {
    this.categoriaService.listarTodos().subscribe({
      next: (listarCategorias) => (this.categorias = listarCategorias),
    });
  }

  salvarAlteracoes() {
    if (!this.lugar?.id) {
      this.mostrarMensagem('Lugar inválido para atualização.');
      return;
    }

    if (!this.camposForm.valid) {
      this.camposForm.markAllAsTouched();
      return;
    }

    const lugarAtualizado: LugarClass = {
      id: this.lugar.id,
      ...this.camposForm.value,
    };
    this.lugarService.atualizar(lugarAtualizado.id!, lugarAtualizado).subscribe({
      next: (response) => {
        this.mostrarMensagem('Lugar atualizado com sucesso!');
        this.dialogRef.close({ acao: 'atualizado', lugar: lugarAtualizado });
      },
      error: (error) => {
        this.mostrarMensagem('Erro ao atualizar o lugar: ' + error);
      },
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, 'Ok', { duration: 3000 });
  }
}

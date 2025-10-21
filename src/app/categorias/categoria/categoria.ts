import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss',
})
export class Categoria {
  camposForm: FormGroup;

  constructor() {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
    });
  }

  salvarCategoria() {
    this.camposForm.markAllAsTouched();

    if (this.camposForm.valid) {
      const novaCategoria = this.camposForm.value;
      console.log('Categoria salva:', novaCategoria);
    } else {
      console.log('Formulário inválido. Por favor, preencha todos os campos obrigatórios.');
    }
  }

  isCampoInvalido(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return (campo?.invalid && (campo?.touched || campo?.dirty)) || false;
  }
}

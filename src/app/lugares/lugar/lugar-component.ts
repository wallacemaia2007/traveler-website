import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaClass } from '../../categorias/categoriaClass';
import { CategoriaService } from '../../categorias/categoria/service/categoria-service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.html',
  styleUrl: './lugar.scss'
})
export class Lugar implements OnInit{

  camposForm: FormGroup;
  categorias: CategoriaClass[] = []; 

  ngOnInit(): void{
    this.categoriaService.listarTodos().subscribe({
      next: (listarCategorias) => this.categorias = listarCategorias
    })
  }

  constructor(private categoriaService: CategoriaService){
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      imagemUrl: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required),
    })
  }

  salvar(){
    console.log(" Lugar salvo!")
  }

}

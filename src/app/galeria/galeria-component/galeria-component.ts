import { Component, OnInit } from '@angular/core';
import { LugarService } from '../../lugares/service/lugar-service';
import { CategoriaService } from '../../categorias/categoria/service/categoria-service';
import { Categoria } from '../../categorias/categoria/categoria-component';
import { LugarClass } from '../../lugares/lugarClass';
import { CategoriaClass } from '../../categorias/categoriaClass';

@Component({
  selector: 'app-galeria-component',
  standalone: false,
  templateUrl: './galeria.html',
  styleUrl: './galeria.scss'
})
export class GaleriaComponent implements OnInit{

  lugares: LugarClass[] = [];
  categorias: CategoriaClass[] = [];

  constructor(
    private lugaresService: LugarService,
    private categoriasService: CategoriaService,
  ){}

  ngOnInit(): void {
    this.categoriasService.listarTodos().subscribe(categorias => this.categorias = categorias)
    this.lugaresService.listarTodos().subscribe(lugares => this.lugares = lugares)
      
  }

  getTotalEstrelas(lugar: LugarClass): string{
    return '&#9733'.repeat(lugar.avaliacao || 0) + '&#9734'.repeat(5 - (lugar.avaliacao || 0));
  }

}

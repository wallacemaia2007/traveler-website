import { Component, OnInit } from '@angular/core';
import { LugarService } from '../../lugares/service/lugar-service';
import { CategoriaService } from '../../categorias/categoria/service/categoria-service';
import { LugarClass } from '../../lugares/lugarClass';
import { CategoriaClass } from '../../categorias/categoriaClass';

@Component({
  selector: 'app-galeria-component',
  standalone: false,
  templateUrl: './galeria.html',
  styleUrl: './galeria.scss',
})
export class GaleriaComponent implements OnInit {
  lugares: LugarClass[] = [];
  lugaresFiltrados: LugarClass[] = [];
  categorias: CategoriaClass[] = [];

  filtroNome: string = '';
  filtroCategoria: string = '';

  constructor(private lugaresService: LugarService, private categoriasService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriasService.listarTodos().subscribe((categorias) => {
      this.categorias = categorias;
    });

    this.lugaresService.listarTodos().subscribe((lugares) => {
      this.lugares = lugares;
      this.lugaresFiltrados = lugares;
    });
  }

  aplicarFiltros(): void {
    this.lugaresFiltrados = this.lugares.filter((lugar) => {
      const correspondeNome =
        !this.filtroNome || lugar.nome?.toLowerCase().includes(this.filtroNome.toLowerCase());

      const correspondeCategoria =
        !this.filtroCategoria || lugar.categoria === this.filtroCategoria;

      return correspondeNome && correspondeCategoria;
    });
  }

  limparFiltros(): void {
    this.filtroNome = '';
    this.filtroCategoria = '';
    this.lugaresFiltrados = this.lugares;
  }

  getTotalEstrelas(lugar: LugarClass): string {
    const avaliacao = lugar.avaliacao || 0;
    return '&#9733;'.repeat(avaliacao) + '&#9734;'.repeat(5 - avaliacao);
  }
}

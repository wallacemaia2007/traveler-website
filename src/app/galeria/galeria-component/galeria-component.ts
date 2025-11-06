import { Component, OnInit, inject } from '@angular/core';
import { LugarService } from '../../lugares/service/lugar-service';
import { CategoriaService } from '../../categorias/categoria/service/categoria-service';
import { LugarClass } from '../../lugares/lugarClass';
import { CategoriaClass } from '../../categorias/categoriaClass';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal-service';
import { ModalComponent } from '../../modal-component/modal-component';
import { EditarLugarModalComponent } from '../../edit-modal-component/edit-modal-component';

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

  private lugaresService = inject(LugarService);
  private categoriasService = inject(CategoriaService);
  private router = inject(Router);
  private modalService = inject(ModalService);

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
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

  cadastrarLugar(): void {
    this.router.navigate(['/paginas/lugares']);
  }

  abrirDetalhes(lugar: LugarClass): void {
    const dialogRef = this.modalService.abrir(ModalComponent, lugar, '900px');

    dialogRef.closed.subscribe((resultado) => {
      if (resultado) {
        if (resultado.acao === 'alterar') {
          this.alterarLugar(resultado.lugar);
        } else if (resultado.acao === 'deletar') {
          this.deletarLugar(resultado.lugar);
        }
      }
    });
  }

  alterarLugar(lugar: LugarClass): void {
    const dialogRef = this.modalService.abrir(EditarLugarModalComponent, { lugar: lugar }, '900px');

    dialogRef.closed.subscribe((resultado) => {
      if (resultado && resultado.acao === 'atualizado') {
        this.carregarDados();
      }
    });
  }

  deletarLugar(lugar: LugarClass): void {
    this.lugaresService.deletar(lugar.id!).subscribe({
      next: () => {
        this.lugares = this.lugares.filter((l) => l.id !== lugar.id);
        this.aplicarFiltros();
      },
      error: (error) => console.error('Erro ao deletar o lugar:', error),
    });
  }
}

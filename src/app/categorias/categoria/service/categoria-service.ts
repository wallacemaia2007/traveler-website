import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  dataBasePath: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }


  salvar(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.dataBasePath + '/categorias', categoria);
  }

  listarTodos(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.dataBasePath + '/categorias');
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaClass } from '../../categoriaClass';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  dataBasePath: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }


  salvar(categoria: CategoriaClass): Observable<CategoriaClass> {
    return this.http.post<CategoriaClass>(this.dataBasePath + '/categorias', categoria);
  }

  listarTodos(): Observable<CategoriaClass[]>{
    return this.http.get<CategoriaClass[]>(this.dataBasePath + '/categorias');
  }
  
}

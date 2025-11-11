import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaClass } from '../../categoriaClass';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  dataBasePath: string = environment.apiUrl + '/categorias';

  constructor(private http: HttpClient) { }


  salvar(categoria: CategoriaClass): Observable<CategoriaClass> {
    return this.http.post<CategoriaClass>(this.dataBasePath, categoria);
  }

  listarTodos(): Observable<CategoriaClass[]>{
    return this.http.get<CategoriaClass[]>(this.dataBasePath);
  }
  
}

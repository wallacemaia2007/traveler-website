import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LugarClass } from '../lugarClass';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LugarService {

  dataBasePath: string = environment.apiUrl + '/lugares';

  constructor(private http: HttpClient) {}

  salvar(lugar: LugarClass): Observable<LugarClass> {
    return this.http.post<LugarClass>(this.dataBasePath , lugar);
  }

  listarTodos(): Observable<LugarClass[]> {
    return this.http.get<LugarClass[]>(this.dataBasePath);
  }

  atualizar(lugarId: string | number, lugar: LugarClass): Observable<LugarClass> {
    return this.http.put<LugarClass>(`${this.dataBasePath}/${lugarId}`, lugar);
  }

  deletar(lugarId: string | number): Observable<void> {
    return this.http.delete<void>(`${this.dataBasePath}/${lugarId}`);
  }
}

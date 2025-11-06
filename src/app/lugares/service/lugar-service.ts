import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LugarClass } from '../lugarClass';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LugarService {
  dataBasePath: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  salvar(lugar: LugarClass): Observable<LugarClass> {
    return this.http.post<LugarClass>(this.dataBasePath + '/lugares', lugar);
  }

  listarTodos(): Observable<LugarClass[]> {
    return this.http.get<LugarClass[]>(this.dataBasePath + '/lugares');
  }

  deletar(lugarId: number): Observable<void> {
    return this.http.delete<void>(`${this.dataBasePath}/lugares/${lugarId}`);
  }

  atualizar(lugarId: number ,lugar: LugarClass): Observable<LugarClass> {
    return this.http.put<LugarClass>(`${this.dataBasePath}/lugares/${lugarId}`, lugar);
  }
}

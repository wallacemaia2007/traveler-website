import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LugarClass } from '../../lugares/lugarClass';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {
  private deletarLugarSubject = new Subject<LugarClass>();

  deletarLugar$ = this.deletarLugarSubject.asObservable();

  emitirDelecao(lugar: LugarClass) {
    this.deletarLugarSubject.next(lugar);
  }
}

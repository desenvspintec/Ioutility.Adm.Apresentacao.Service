import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CnCarregandoService {

  private _carregamentos: string[] = [];
  private _carregamentosSubject: Subject<boolean> = new Subject()
  constructor() { }

  get carregandoStatus(): Observable<boolean> {
    return this._carregamentosSubject.asObservable();
  }

  abrir(descricao: string): void {
    this._carregamentos.push(descricao);
    this._carregamentosSubject.next(this._exibir());
  }

  fechar(): void {
    if (this._carregamentos.length > 0 )
      this._carregamentos.splice(this._carregamentos.length - 1, 1);

    this._carregamentosSubject.next(this._exibir());

  }
  private _exibir(): boolean {
    return this._carregamentos.length > 0;
  }
}

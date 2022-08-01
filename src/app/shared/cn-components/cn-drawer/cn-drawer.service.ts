import { CnDrawerModel } from './../model/cn-drawer-model';
import { Observable, Subject } from 'rxjs';
import { IDrawerComponent } from '../../interfaces/i-drawer-compoent';
import { CnFundoParaSobreposicaoService } from './../cn-fundo-para-sobreposicao/cn-fundo-para-sobreposicao.service';
import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CnDrawerService {

  private _exibir = false;
  private _component?: Type<IDrawerComponent>;
  private _observableNotificador: Subject<CnDrawerModel>
  constructor(private _fundoEscuroService: CnFundoParaSobreposicaoService) {
    this._observableNotificador = new Subject();
  }

  get exibir(): boolean {
    return this._exibir;
  }
  get component():  Type<IDrawerComponent> | undefined {
    return this._component;
  }
  get observable(): Observable<CnDrawerModel> {
    return this._observableNotificador.asObservable();
  }

  abrir(component: Type<IDrawerComponent>, model: any): void {
    this._exibir = true;
    this._component = component;
    this._fundoEscuroService.exibir();
    this._observableNotificador.next(new CnDrawerModel(component, model));
  }

  fechar(): void {
    this._exibir = false;
    this._fundoEscuroService.fechar();
  }


}

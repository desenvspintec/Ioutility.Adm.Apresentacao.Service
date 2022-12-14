import { IFormPesquisa } from './i-form-pesquisa';
import { Observable, Subject } from 'rxjs';

import { EntityBasica } from '../../models/entity-basica';
import { CnInputCvaModel } from '../control-value-accessor/models/cn-input-cva.model';

export const CONTROL_NAME_PESQUISA_RESET = 'pesquisaReset';

export enum ECnPesquisaTipoParametro {
  string,
  objeto
}
export class CnPesquisaModel {
  pesquisarDelegate?: (dadosPesquisa: any) => Observable<EntityBasica[]>;
  private readonly _acionarPesquisaNotificador: Subject<IFormPesquisa | undefined> = new Subject();
  public readonly controlsPesquisaInputCva: CnInputCvaModel[] = [];

  identificadorDeTelaParaPesquisasEmCache?: string;
  get tipoParametroDelegatePesquisa(): ECnPesquisaTipoParametro {
    const pesquisaApenasPorNome = this.controlsPesquisaInputCva.length === 2 && this.controlsPesquisaInputCva.some(control => control.name === 'nome');
    if (pesquisaApenasPorNome) return ECnPesquisaTipoParametro.string;

    return ECnPesquisaTipoParametro.objeto;
  }

  get aoSolicitarPesquisa(): Observable<IFormPesquisa | undefined> {
    return this._acionarPesquisaNotificador.asObservable();
  }


  private constructor(){
    this.controlsPesquisaInputCva.push(CnInputCvaModel.obterHidden(CONTROL_NAME_PESQUISA_RESET))
  }
  static ObterPesquisaModel(pesquisarDelegate: (dadosPesquisa: any) => Observable<EntityBasica[]>, controls?: CnInputCvaModel[], identificadorDeTelaParaPesquisasEmCache?: string): CnPesquisaModel {
    let model = new CnPesquisaModel();
    model.identificadorDeTelaParaPesquisasEmCache = identificadorDeTelaParaPesquisasEmCache;
    model.pesquisarDelegate = pesquisarDelegate;
    const haControlPreenchido = controls !== undefined;
    if (haControlPreenchido) {
      model.controlsPesquisaInputCva.push(...controls!);
    } else {
      model.controlsPesquisaInputCva.push(CnInputCvaModel.obterTextoSimples('nome', 'Pesquisar', false, 200, 0));
    }
    return model;

  }

  static cssIdNamePesquisa(): string { return 'pesquisa'; }



  pesquisar(objectPesquisa?: IFormPesquisa): void {
    this._pesquisar(objectPesquisa);
  }

  private _pesquisar(objectPesquisa?: IFormPesquisa, tentativa = 0): void {
    if (!this._acionarPesquisaNotificador.observed && tentativa < 20) {
      setTimeout(() => {
        this._pesquisar(objectPesquisa, tentativa++);
      }, 300);
      return;
    }
    this._acionarPesquisaNotificador.next(objectPesquisa);

  }
}

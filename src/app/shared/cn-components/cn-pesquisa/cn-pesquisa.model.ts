import { Observable, Subject } from 'rxjs';

import { EntityBasica } from '../../models/entity-basica';
import { CnInputCvaModel } from '../control-value-accessor/models/cn-input-cva.model';

export const CONTROL_NAME_PESQUISA_RESET = 'pesquisaReset';

export class CnPesquisaModel {
  pesquisarDelegate?: (dadosPesquisa: any) => Observable<EntityBasica[]>;
  private readonly _acionarPesquisaNotificador: Subject<any> = new Subject();
  public readonly controlsPesquisaInputCva: CnInputCvaModel[] = [];

  get aoSolicitarPesquisa(): Observable<any> {
    return this._acionarPesquisaNotificador.asObservable();
  }


  private constructor(){
    this.controlsPesquisaInputCva.push(CnInputCvaModel.obterHidden(CONTROL_NAME_PESQUISA_RESET))
  }
  static ObterPesquisaModel(pesquisarDelegate: (dadosPesquisa: any) => Observable<EntityBasica[]>, controls?: CnInputCvaModel[]): CnPesquisaModel {
    let model = new CnPesquisaModel();
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



  pesquisar(objectPesquisa?: any): void {
    this._pesquisar(objectPesquisa);
  }

  private _pesquisar(objectPesquisa: any, tentativa = 0): void {
    if (!this._acionarPesquisaNotificador.observed && tentativa < 20) {
      setTimeout(() => {
        this._pesquisar(objectPesquisa, tentativa++);
      }, 300);
      return;
    }
    this._acionarPesquisaNotificador.next(objectPesquisa);

  }
}

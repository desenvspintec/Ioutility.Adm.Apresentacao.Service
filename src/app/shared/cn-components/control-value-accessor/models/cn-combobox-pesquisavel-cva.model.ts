import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { EntityBasica } from 'src/app/shared/models/entity-basica';
import { CnControlValueAccessorModelBase } from '../../model/cn-control-value-accessor-model-base.model';

export class CnComboboxPesquisavelCvaModel extends CnControlValueAccessorModelBase {
  paiDependenteId: string = '';
  obterControlPaiDelegate?:  (parametro?: any) => FormControl;
  pesquisaEhPorPaiDependente = false;
  pesquisarPorNomeDelegate: (palavraChave: string) => Observable<EntityBasica[]> = (valor: string) => of([]);
  pesquisarPorNomeComPaiDependenteDelegate: (palavraChave: string, paiDependenteId: string) => Observable<EntityBasica[]> = (valor: string, valor2: string) => of([]);
  pesquisarPorIdDelegate: (palavraChave: string) => Observable<EntityBasica> = (valor: string) => of(new EntityBasica('',''));;

  private constructor(name: string, label: string, required: boolean, placeholder = '') {
    super(name, label, required, placeholder);
  }
  static obter(name: string, label: string, required: boolean,
               pesquisarPorNomeDelegate: (palavraChave: string) => Observable<EntityBasica[]>,
               pesquisarPorIdDelegate: (palavraChave: string) => Observable<EntityBasica>,
               placeholder = ''): CnComboboxPesquisavelCvaModel {
    let model = new CnComboboxPesquisavelCvaModel(name, label, required, placeholder);
    model.pesquisarPorNomeDelegate = pesquisarPorNomeDelegate;
    model.pesquisarPorIdDelegate = pesquisarPorIdDelegate;
    model.pesquisaEhPorPaiDependente = false;
    return model;
  }

  static obterComPaiDependencia(name: string, label: string, required: boolean, paiDependenteId: string,
                                pesquisarPorNomeComPaiDependenteDelegate: (palavraChave: string, paiDependenteId: string)
                                                                          => Observable<EntityBasica[]>,
                                pesquisarPorIdDelegate: (palavraChave: string) => Observable<EntityBasica>,
                                placeholder = ''): CnComboboxPesquisavelCvaModel {
    let model = new CnComboboxPesquisavelCvaModel(name, label, required, placeholder);
    model.pesquisarPorNomeComPaiDependenteDelegate = pesquisarPorNomeComPaiDependenteDelegate;
    model.pesquisarPorIdDelegate = pesquisarPorIdDelegate;
    model.pesquisaEhPorPaiDependente = true;
    model.paiDependenteId = paiDependenteId;
    return model;
  }
  static obterComPaiDependenciaControl(name: string, label: string, required: boolean, obterControlPaiDelegate: (parametro?: any) => FormControl,
    pesquisarPorNomeComPaiDependenteDelegate: (palavraChave: string, paiDependenteId: string)
                                              => Observable<EntityBasica[]>,
    pesquisarPorIdDelegate: (palavraChave: string) => Observable<EntityBasica>,
    placeholder = ''): CnComboboxPesquisavelCvaModel {
      let model = new CnComboboxPesquisavelCvaModel(name, label, required, placeholder);
      model.pesquisarPorNomeComPaiDependenteDelegate = pesquisarPorNomeComPaiDependenteDelegate;
      model.pesquisarPorIdDelegate = pesquisarPorIdDelegate;
      model.pesquisaEhPorPaiDependente = true;
      model.obterControlPaiDelegate = obterControlPaiDelegate;
    return model;
}
}

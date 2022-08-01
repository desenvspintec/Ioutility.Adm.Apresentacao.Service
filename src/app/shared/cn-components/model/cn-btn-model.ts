import { Observable, of } from 'rxjs';
import { EntityBasica } from 'src/app/shared/models/entity-basica';

import { Entity } from '../../models/entity';
import { CnFormBaseModel } from './cn-form-base-model';
import { CnFormInativarModel } from './cn-form-inativar-model';
import { CnGrupoCamposFormulario } from './cn-grupo-campos-formulario';

export class CnBtnModel {
  formModel: CnFormBaseModel | CnFormInativarModel;
  abreModal: boolean = false;
  link: string = '';
  abrirLinkEmNovaGuia: boolean = false;

  private constructor() {
    this.formModel = new CnFormInativarModel('', new EntityBasica('', ''), () => of(null));
  }

  private static _baseObterBtnModal(): CnBtnModel {
    let btn = new CnBtnModel();
    btn.abreModal = true;
    return btn;
  }

  private static _baseObterBtnComLink(link: string = '', abrirLinkEmNovaGuia: boolean = false): CnBtnModel {
    let btn = new CnBtnModel();
    btn.abreModal = false;
    btn.link = link;
    btn.abrirLinkEmNovaGuia = abrirLinkEmNovaGuia;
    return btn;
  }

  static obterBtnRegistrarPorLink(): CnBtnModel {
    let btn = CnBtnModel._baseObterBtnComLink();
    return btn;
  }
  static obterBtnAtualizarPorLink(): CnBtnModel {
    let btn = CnBtnModel._baseObterBtnComLink();
    return btn;
  }
  static obterBtnRegistrarModal(tituloTelaAbrirModal: string, observableSubmitDelegate: (entity: Entity) => Observable<any>
    , gruposCampos: CnGrupoCamposFormulario[],  tituloRegistrar?: string): CnBtnModel {
    let btn = CnBtnModel._baseObterBtnModal();
    btn.formModel = CnFormBaseModel.obterRegistrar('', tituloTelaAbrirModal, observableSubmitDelegate, gruposCampos,  tituloRegistrar);
    return btn;
  }
  static obterBtnAtualizarModal(tituloTelaAbrirModal: string, entityId: string
    , observableBuscarPorIdDelegate: (entityId: string) => Observable<Entity>
    , observableSubmitDelegate: (entity: Entity) => Observable<any>, gruposCampos: CnGrupoCamposFormulario[],  tituloAtualizar?: string): CnBtnModel {
    let btn = CnBtnModel._baseObterBtnModal();
    btn.formModel = CnFormBaseModel.obterAtualizar('', tituloTelaAbrirModal, entityId
      , observableBuscarPorIdDelegate, observableSubmitDelegate, gruposCampos,  tituloAtualizar);
    return btn;
  }
  static obterBtnInativarModal(tituloTelaAbrirModal: string, entityBasica: EntityBasica
    , observableSubmitDelegate: (entity: Entity) => Observable<any>): CnBtnModel {
    let btn = CnBtnModel._baseObterBtnModal();
    btn.formModel = new CnFormInativarModel(tituloTelaAbrirModal, entityBasica, observableSubmitDelegate);
    return btn;
  }
  // static obterBtnRegistrarComLink(link: string, abrirLinkEmNovaGuia: boolean): CnBtnModel {
  //   return this._baseObterBtnComLink(link, abrirLinkEmNovaGuia);
  // }


}

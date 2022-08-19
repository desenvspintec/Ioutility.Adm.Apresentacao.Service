import { RESPOSTA_PARA_ATUALIZAR_PESQUISA_AO_FECHAR_MODAL } from './../../constants/constantes';
import { IHttpErrorResponse } from './../../interfaces/i-http-error-response';
import { IFormCrudModel } from './../../interfaces/i-form-crud-model';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { EntityBasica } from 'src/app/shared/models/entity-basica';
import { Entity } from '../../models/entity';
import { IFormCrudModalBase } from '../../interfaces/i-form-crud-modal-base';
import { ToastrService } from 'ngx-toastr';
import { CnFormHelper } from '../../cn-helpers/cn-form-helper';
import { CnMensagemErroHelper } from '../../cn-helpers/cn-mensagem-erro-helper';

export class CnFormInativarModel implements IFormCrudModalBase<CnFormInativarModel>, IFormCrudModel {
  readonly titulo: string;
  readonly entityBasica: EntityBasica;
  private observableSubmitDelegate: (entity: Entity) => Observable<any>;
  referenciaModal?: MatDialogRef<any>;

  constructor(titulo: string, entityBasica: EntityBasica,  observableSubmitDelegate: (entity: Entity) => Observable<any>) {
    this.titulo = titulo;
    this.entityBasica = entityBasica;
    this.observableSubmitDelegate = observableSubmitDelegate;
  }

  definirModal(referenciaModal: MatDialogRef<any, any>): CnFormInativarModel {
    this.referenciaModal = referenciaModal;
    return this;
  }

  observableSubmeter(): Observable<any> {
    return this.observableSubmitDelegate(this.entityBasica);
  }
  onSubmitSuccess(toastrService: ToastrService, result?: any): void {
    CnFormHelper.notificarSucessoToastr(toastrService);
    this.referenciaModal?.close(RESPOSTA_PARA_ATUALIZAR_PESQUISA_AO_FECHAR_MODAL);
  }
  onSubmitError(error: IHttpErrorResponse, toastrService: ToastrService): string[] {
    CnFormHelper.notificarErroToastr(toastrService);
    console.log(error);
    return [new CnMensagemErroHelper().erroNaoTratado()];
  }

}

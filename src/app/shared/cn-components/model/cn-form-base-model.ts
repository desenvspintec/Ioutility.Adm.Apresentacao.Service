import { CnCrudModel } from 'src/app/shared/cn-components/model/cn-crud-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

import { CnMensagemErroHelper } from '../../cn-helpers/cn-mensagem-erro-helper';
import { ETipoOperacaoCrud } from '../../enums/e-tipo-operacao-crud';
import { IFormCrudModalBase } from '../../interfaces/i-form-crud-modal-base';
import { IFormCrudModel } from '../../interfaces/i-form-crud-model';
import { Entity } from '../../models/entity';
import { CnInputCvaModel } from '../control-value-accessor/models/cn-input-cva.model';
import { CnFormHelper } from './../../cn-helpers/cn-form-helper';
import { CnAppError, IHttpErrorResponse } from './../../interfaces/i-http-error-response';
import { CnControlValueAccessorModelBase } from './cn-control-value-accessor-model-base.model';
import { CnGrupoCamposFormulario } from './cn-grupo-campos-formulario';

export class CnFormBaseModel implements IFormCrudModalBase<CnFormBaseModel>, IFormCrudModel  {
  readonly titulo: string;
  readonly observableSubmitDelegate: (entity: Entity) => Observable<any>;
  readonly linkPosSubmit: string;
  private observableBuscarPorIdDelegate?: (entityId: string) => Observable<Entity>;
  private entityParaManipularId?: string;
  name: string;
  obterTituloFormulario?: CnCrudModel;
  gruposCampos: CnGrupoCamposFormulario[];
  tipoOperacaoCrud: ETipoOperacaoCrud;
  possuiModal = false;
  possuiSubmit = false;
  referenciaModal?: MatDialogRef<any>;
  private _formGroup?: FormGroup;
  get formJaEstaGerado(): boolean {
    return !(this.formGroup === undefined);
  }
  get formGroup(): FormGroup | undefined {
    return this._formGroup;
  };

  constructor(linkPosSubmit: string, name: string, titulo: string, observableSubmitDelegate: (entity: Entity) => Observable<any>
            , gruposCampos: CnGrupoCamposFormulario[], tipoOperacaoCrud: ETipoOperacaoCrud, possuiSubmit: boolean) {
    this.titulo = titulo;
    this.observableSubmitDelegate = observableSubmitDelegate;
    this.gruposCampos = gruposCampos;
    this.tipoOperacaoCrud = tipoOperacaoCrud;
    this.possuiSubmit = possuiSubmit;
    this.linkPosSubmit = linkPosSubmit;
    this.name = name;
  }

  setarFormGrouo(formGroup: FormGroup): void {
    this._formGroup = formGroup;
  }

  static obterRegistrar(linkPosSubmit: string, titulo: string, observableSubmitDelegate: (entity: Entity) => Observable<any>
                      , grupoCampos: CnGrupoCamposFormulario[], tituloRegistrar?: string, name: string = '',): CnFormBaseModel {
    return new CnFormBaseModel(linkPosSubmit, name, tituloRegistrar + titulo, observableSubmitDelegate, grupoCampos, ETipoOperacaoCrud.Registrar, true);
  }
  static obterAtualizar(linkPosSubmit: string, titulo: string, entityId: string, observableBuscarPorIdDelegate: (entityId: string) => Observable<Entity>
                      , observableSubmitDelegate: (entity: any) => Observable<any>, grupoCampos: CnGrupoCamposFormulario[], tituloAtualizar?: string, name: string = ''): CnFormBaseModel {
    let form = new CnFormBaseModel(linkPosSubmit, name, tituloAtualizar + titulo, observableSubmitDelegate, grupoCampos, ETipoOperacaoCrud.Atualizar, true);
    form.entityParaManipularId = entityId;
    form.observableBuscarPorIdDelegate = observableBuscarPorIdDelegate;
    return form;
  }

  static obterSemSubmit(titulo: string, grupoCampos: CnGrupoCamposFormulario[]): CnFormBaseModel {
    return new CnFormBaseModel('', '',titulo, (entity: Entity) => of(null), grupoCampos, ETipoOperacaoCrud.Subformulario, false);
  }
  definirModal(referenciaModal: MatDialogRef<any>): CnFormBaseModel {
    this.referenciaModal = referenciaModal;
    this.possuiModal = true;
    return this;
  }

  obterObservableBuscarPorId(): Observable<Entity> {
    return this.observableBuscarPorIdDelegate!!(this.entityParaManipularId as string);
  }

  onSubmitSuccess(toastrService: ToastrService, router?: Router, result?: any ): void {
    if (this.possuiModal)
      this.referenciaModal?.close(true);
    if (this.linkPosSubmit.length > 0)
      this.navegarParaIndex(router!);
    toastrService.success('Operação realizada com sucesso!', 'Tudo certo!', { progressBar: true});
  }

  navegarParaIndex(router: Router) {
    router.navigateByUrl(this.linkPosSubmit);
  }

  onSubmitError(error: IHttpErrorResponse, toastrService: ToastrService): string[] {
    toastrService.error('Não foi possivel realizar a operação', ': (', { progressBar: true});
    if (!this._ehErroTratadoPelaApi(error)) {
      // este console faz parte da regra de negocio, deixar ele aqui.
      console.log(error);
      return [new CnMensagemErroHelper().erroNaoTratado()];
    }
    return (error.error as CnAppError).errors;
  }

  obterTodosCampos(): CnInputCvaModel[] {
    return this.gruposCampos.flatMap(grupo => grupo.campos)
  }

  private _ehErroTratadoPelaApi(error: IHttpErrorResponse): boolean {
    return error.error.errorsDetails !== undefined;
  }

  gerarForm(formBuilder: FormBuilder): void {
    this._formGroup = formBuilder.group({});
    this.obterTodosCampos().forEach(campo => {
      this._addCnControlNoFormGroup(formBuilder, campo);
      if (campo.possuiDelegate) {
        campo.eventoAoCarregarFormulario!(this._formGroup!);
      }
    });
  }

  obterQuantidadeErros(): number {
    let controls = this.gruposCampos.flatMap(grupo => grupo.campos);
    controls = CnFormHelper.obterTodosInputsCvasEDependentes(controls);
    if (controls.some(control => control === undefined)) return 0;
    const controlsComErro = controls.filter(control => control.possuiErroValidacao);
    return controlsComErro.length;
  }
  private _addCnControlNoFormGroup(formBuilder: FormBuilder, cnControlValueAccessorModelBase: CnControlValueAccessorModelBase): void {
    this._formGroup!.addControl(cnControlValueAccessorModelBase.name, cnControlValueAccessorModelBase.gerarFormControl(formBuilder, cnControlValueAccessorModelBase.valorPadrao));
  }

  obterValorFormulario(): any {
    const controls = this.gruposCampos.flatMap(grupo => grupo.campos);
    let valorFormulario: any = {};
    controls.forEach(control => {
      valorFormulario[control.name] = control.obterValorFormControl();
    });

    return valorFormulario;
  }
}

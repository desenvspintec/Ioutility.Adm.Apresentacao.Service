import { Router } from '@angular/router';
import { IHttpErrorResponse } from './../../interfaces/i-http-error-response';
import { ToastrService } from 'ngx-toastr';
import { Entity } from './../../models/entity';
import { Directive, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ETipoOperacaoCrud } from '../../enums/e-tipo-operacao-crud';
import { FormHelperService } from './../../services/form-helper.service';
import { CnFormBaseComponent } from './cn-form-base-component';
import { CnFormBaseModel } from './cn-form-base-model';

@Directive()
export abstract class CnFormComSubmitBaseComponent extends CnFormBaseComponent {

  @Input() model?: CnFormBaseModel;
  carregandoDadosEdiacao = false;
  erroAoCarregarDadosEdicao = false;
  errosValidacao?: string[] = [];
  constructor(fb: FormBuilder, public formHelperService: FormHelperService, private toastrService: ToastrService, private rota: Router) {
    super(fb);
  }

  override ngOnInit() {
    if (this.model?.formJaEstaGerado ) {
      this.utilizarFormularioExterno = true;
      this.form = this.model.formGroup!;
    }
    super.ngOnInit();

    if (!this.model!.formJaEstaGerado)
      this.model!.setarFormGrouo(this.form);

    this.formHelperService.setarDadosDeInicializacao(this.model!, this.dependenciasValidas)
    if (this.model!!.tipoOperacaoCrud === ETipoOperacaoCrud.Atualizar) {
      this._setarValoresEdicaoNoForm();
    }
  }
  protected _setarValoresEdicaoNoForm() {
    this.carregandoDadosEdiacao = true;
    this.model!!.obterObservableBuscarPorId().subscribe(entity => {
      this.carregandoDadosEdiacao = false;
      this.form.patchValue(entity);
    },
    (error) => {
      this.erroAoCarregarDadosEdicao = true;
      this.carregandoDadosEdiacao = false; });
  }
  protected addControlsNoFormulario(): void {
    this.model!.obterTodosCampos().forEach(campo => {
      this.addCnControlNoForm(campo);
      if (campo.possuiDelegate) {
        campo.eventoAoCarregarFormulario!(this.form);
      }
    });
  }


  protected dependenciasValidas(): boolean {
    return true;
  }

  formValido(): boolean {
    if (!this.form.valid) return false;
    if (!this.dependenciasValidas()) return false;
    return true;
  }
  submeter(): void {
    if (!this.formValido()) return;

    this.errosValidacao = undefined;
    const entitySubmit = this.obterEntitySubmeter();
    const observable = this.model!.observableSubmitDelegate(entitySubmit);
    observable.subscribe({
      next:() => this.onSuccess(),
      error: erro => this.onError(erro)
    });
  }
  protected onSuccess(): void {
    this.model!.onSubmitSuccess(this.toastrService);
    if (this.model?.possuiModal) {
      this.model.referenciaModal?.close({executouAtualizacao: true});
      return;
    }
    this.model?.navegarParaIndex(this.rota)
  }
  protected onError(erro: IHttpErrorResponse): void {
    this.errosValidacao = this.model!.onSubmitError(erro, this.toastrService);
  }
  protected obterEntitySubmeter(): Entity {
    return this.form.value;
  }
  podeExibirForm(): boolean {
    if (this.erroAoCarregarDadosEdicao) return false;
    if (this.model!.tipoOperacaoCrud === ETipoOperacaoCrud.Registrar) return true;
    if (this.model!.tipoOperacaoCrud === ETipoOperacaoCrud.Subformulario) return true;
    if (this.model!.tipoOperacaoCrud === ETipoOperacaoCrud.Atualizar && !this.carregandoDadosEdiacao) return true;
    return false;
  }
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { CnFormHelper } from './../../../cn-helpers/cn-form-helper';
import { ANIMAR_ENTRADA } from './../../../constants/animacoes.constant';
import { CARACTER_SEPARADOR_ERRO_CAMPO_MSG_ERRO } from './../../../constants/forms-contante';
import { ROTA_PARAMETRO } from './../../../constants/routes-constant';
import { ETipoOperacaoCrud } from './../../../enums/e-tipo-operacao-crud';
import { IHttpErrorResponse } from './../../../interfaces/i-http-error-response';
import { Entity, IEntity } from './../../../models/entity';
import { FormHelperService } from './../../../services/form-helper.service';
import { CnCrudModel } from './../../model/cn-crud-model';
import { CnFormBaseModel } from './../../model/cn-form-base-model';

@Component({
  selector: 'app-cn-stepper-form',
  templateUrl: './cn-stepper-form.component.html',
  styleUrls: ['./cn-stepper-form.component.scss'],
  animations: ANIMAR_ENTRADA,
})
export class CnStepperFormComponent implements OnInit {
  @Input() model!: CnCrudModel;
  @ViewChild('stepper') stepper?: MatStepper;

  entityEdicao?: IEntity;

  readonly prefixoTituloPadrao = { atualizar: 'Editar', registrar: 'Novo ' };
  readonly formsModel: CnFormBaseModel[] = [];
  readonly entityEditarId?: string;

  prefixoTitulo!: string;
  posicaoStepper = 0;
  submetendo = false;
  jaHouveSubmit = false;
  constructor(
    public formHelperService: FormHelperService,
    activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toastrService: ToastrService
  ) {
    this.entityEditarId =
      activatedRoute.snapshot.params[ROTA_PARAMETRO.id.nomeParametro];
    this._definirPrefixoTitulo();
  }
  private _definirPrefixoTitulo() {
    if (this.modoRegistrar)
      this.prefixoTitulo = this.prefixoTituloPadrao.registrar;
    else this.prefixoTitulo = this.prefixoTituloPadrao.atualizar;
  }
  get modoEdicao(): boolean {
    if (this.entityEditarId) return true;
    return false;
  }
  get modoRegistrar(): boolean {
    return !this.modoEdicao;
  }
  get estaNaUltimaEtapa(): boolean {
    return this.posicaoStepper === this.model.stepperForm.stepperItens.length - 1;
  }
  get estaNaPrimeiraEtapa(): boolean {
      return this.posicaoStepper === 0
  }

  ngOnInit(): void {
    this._definirFormularios();
    if (this.modoEdicao)
      this.model.service.buscarPorId(this.entityEditarId!).subscribe({
        next: (entity) => this._setarValoresEdicao(entity),
      });

  }
  private _setarValoresEdicao(entity: Entity) {
    const entityAny = entity as any;
    for (let index = 0; index < this.formsModel.length; index++) {
      const estaNaPropriedadePrincipal = index === 0;
      const formModel = this.formsModel[index];
      const nomePropriedadeASerEditada = formModel.name;
      const valorSetarNoFormulario = estaNaPropriedadePrincipal ? entityAny : entityAny[nomePropriedadeASerEditada];

      const formControlsName = Object.keys(formModel.formGroup!.controls);
      formControlsName.forEach((formControlName) => {
        const propriedadeEhValueObject = this._formularioUtilizaApenasValueObject(formModel.formGroup?.value, formModel);
        const constrolCnCva = formModel.gruposCampos.flatMap(grupo => grupo.campos).find(campo => campo.name === formControlName);

        let valorFormControlName: any;
        if (propriedadeEhValueObject)
          valorFormControlName = entityAny[formControlName];
        else
          valorFormControlName = valorSetarNoFormulario[formControlName];

        const possuiValor = valorFormControlName != undefined;
        if (possuiValor)
          constrolCnCva?.setarValor(valorFormControlName);
          // formModel.formGroup!.controls[formControlName].setValue(valorFormControlName);
      });
    }
  }

  private _definirFormularios() {
    this.model.stepperForm.stepperItens.forEach((stepperItem) => {
      const formModel = new CnFormBaseModel(this.model.rotaIndex, stepperItem.name, stepperItem.titulo, this._obterDelegateSubmit(), stepperItem.gruposCampos, ETipoOperacaoCrud.Registrar, false);
      formModel.gerarForm(this._formBuilder);
      this.formsModel.push(formModel);
    });
  }
  private _obterDelegateSubmit(): (entity: Entity) => Observable<Entity> {

    if (this.modoRegistrar) {
      if (this.model.possuiRegistrarDelgatePersonalizado) {
        return this.model.registrarPersonalizadoDelegate!;
      }

      return this.model.service.registrar;
    }
    if (this.model.possuiAtualizarDelgatePersonalizado)
      return this.model.atualizarPersonalizadoDelegate!;
    return this.model.service.atualizar;
  }

  setarEtapa(stpper: any): void {
    this.posicaoStepper = stpper.selectedIndex;
  }

  textoSubsmit(): string {
    return this.estaNaUltimaEtapa ? 'Salvar' : 'Próximo';
  }
  textoCancelar(): string {
    return this.estaNaPrimeiraEtapa ? 'Cancelar' : 'Voltar';
  }

  voltar(): void {
    if (this.estaNaPrimeiraEtapa) this.model?.navegarParaIndex(this._router);
    this.stepper!.previous();
  }

  proximaEtapa(): void {

    if (this.submetendo) return;
    const form = this._obterFormAtual();
    if (!form.valid) {
      this.stepper!.next();
      return;
    };

    if (!this.estaNaUltimaEtapa) {
      this.stepper!.next();
      return
    };

    this._submeter();

  }

  private _submeter() {
    this.submetendo = true;
    let entitySubmit = this._obterDadosParaSubmeter();

    const observable = this._obterFormPrincipal().observableSubmitDelegate(entitySubmit);
    observable.subscribe({
      next: (result: any) => this._obterFormPrincipal().onSubmitSuccess(this._toastrService, this._router, result),
      error: (error: any) => this._onSubmitError(error),
    }).add(() => {
      this.submetendo = false;
      this.jaHouveSubmit = true;
    });
  }

  private _onSubmitError(error: IHttpErrorResponse): void {
    const errosGlobais =( error.error.errors as string[]).filter(erro => !erro.includes(CARACTER_SEPARADOR_ERRO_CAMPO_MSG_ERRO));
    const errosDeCampo =( error.error.errors as string[])
      .filter(erro => erro.includes(CARACTER_SEPARADOR_ERRO_CAMPO_MSG_ERRO))
      .map(erro => ({campo: erro.split(CARACTER_SEPARADOR_ERRO_CAMPO_MSG_ERRO)[0].toLowerCase(), mensagem: erro.split(CARACTER_SEPARADOR_ERRO_CAMPO_MSG_ERRO)[1], valor: erro.split(CARACTER_SEPARADOR_ERRO_CAMPO_MSG_ERRO)[2]}  ));

    let inputsCvasNoFormulario = this.model.stepperForm.stepperItens.flatMap(stepperItem => stepperItem.gruposCampos.flatMap(grupoCampo => grupoCampo.campos));
    inputsCvasNoFormulario = CnFormHelper.obterTodosInputsCvasEDependentes(inputsCvasNoFormulario);

    inputsCvasNoFormulario.forEach(input => input.removerErroValidacao());
    console.log(errosDeCampo);

    errosDeCampo.forEach(erro => {
      const inputCvaComErro = inputsCvasNoFormulario.find(input => input.name.toLowerCase() === erro.campo && input.valorApiEstaIgual(erro.valor));
      inputCvaComErro?.setarErroValidacao(erro.mensagem);
    });


    this._obterFormPrincipal().onSubmitError(error, this._toastrService);
  }

  private _obterDadosParaSubmeter(): IEntity {
    let entitySubmit = this._obterFormPrincipal().obterValorFormulario();

    const possuiMaisDeUmFormulario = this.formsModel.length > 1;
    if (possuiMaisDeUmFormulario)
      this._obterDadosDosSubformularios(entitySubmit);

    console.log(entitySubmit);
    return entitySubmit;
  }

  private _obterDadosDosSubformularios(entitySubmit: any) {
    for (let formModelIndex = 1; formModelIndex < this.formsModel.length; formModelIndex++) {
      const formModel = this.formsModel[formModelIndex];
      const valorFormulario = formModel.obterValorFormulario();
      const formularioUtilizaApenasValueObject = this._formularioUtilizaApenasValueObject(valorFormulario, formModel);
      if (formularioUtilizaApenasValueObject)
        entitySubmit[formModel.name] = valorFormulario[formModel.name];
      else
        entitySubmit[formModel.name] = valorFormulario;
    }
  }

  private _formularioUtilizaApenasValueObject(valorFormulario: any, formModel: CnFormBaseModel) {
    const quantidadeDeControlsNoFormulario = Object.keys(valorFormulario).length;
    const possuiApenasUmControl = quantidadeDeControlsNoFormulario === 1;
    const controlPossuiMesmoNomeDoForm = formModel.name === Object.keys(valorFormulario)[0];
    const formularioUtilizaApenasValueObject = possuiApenasUmControl && controlPossuiMesmoNomeDoForm;
    return formularioUtilizaApenasValueObject;
  }

  private _obterFormAtual(): FormGroup {
    return this.formsModel[this.posicaoStepper].formGroup!;
  }
  private _obterFormPrincipal(): CnFormBaseModel {
    return this.formsModel[0];
  }
}

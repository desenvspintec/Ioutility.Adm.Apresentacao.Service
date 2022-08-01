import { Directive, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder } from '@angular/forms';

import { CnHelper } from '../../cn-helpers/cn-helper';
import { CnControlValueAccessorModelBase } from './cn-control-value-accessor-model-base.model';
import { CnFormBaseComponent } from './cn-form-base-component';

@Directive()
export abstract class CnControlValueAccessorBaseConponent extends CnFormBaseComponent implements OnInit, ControlValueAccessor {
  @Input() model?: CnControlValueAccessorModelBase;
  @Input() logIdentificador: string = '';
  private valor: any;
  registrarQueUsuarioTocou?: (data: any) => void;
  estaHabilitado: boolean = true;
  private registrarMudancaDelegate?: (valor: any) => void;
  private _estagioDeTesteJasmine = false;

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
   }
  override ngOnInit(): void {
    try {
      if (this.logIdentificador) console.log('control value accessor: ' + this.logIdentificador);
      super.ngOnInit();
      this.definirComoExportarValor();
      this.model?.setFormGroup(this.form);
    } catch (error) {
      if (CnHelper.estaNuloVazioOuUndefined(this.model))
        throw new Error( `não foi passado os valores de configuração para o control value accessor ${this.constructor.name}. `
              + `Utilize o Input "model" para passar estas informações. Exception: ${error}`);
      else {
        throw error;
      }
    }
  }
  protected abstract definirComoExportarValor(): void;
  protected abstract adequarValorImportado(valor: any): void;

  ativarEsadoDeTesteJasmine(): void {
    this._estagioDeTesteJasmine = true;
  }
  estaEmEstadoDeTesteJasmine(): boolean {
    return this._estagioDeTesteJasmine;
  }
  setarValor(valor: any): void {
    this.valor = valor;

    if (this.registrarMudancaDelegate === undefined || this.estaEmEstadoDeTesteJasmine()) return;

    this.registrarMudancaDelegate(this.valor);
  }

  obterValor(): any {
    return this.valor;
  }
  writeValue(obj: any): void {
    this._importarValor(obj);
  }

  private _importarValor(valor: any): void {
    this.valor = valor;
    this.adequarValorImportado(valor);
  }

  registerOnChange(fn: any): void {
    this.registrarMudancaDelegate = fn;
  }
  registerOnTouched(fn: any): void {
    this.registrarQueUsuarioTocou = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.estaHabilitado = !isDisabled;
    if (this.estaHabilitado)
      this.form.enable();
    else
      this.form.disable();
  }
}

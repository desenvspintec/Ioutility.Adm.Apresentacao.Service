import { Directive, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { CnInputCvaModel } from '../control-value-accessor/models/cn-input-cva.model';
import { CnControlValueAccessorModelBase } from './cn-control-value-accessor-model-base.model';

@Directive()
export abstract class CnFormBaseComponent implements OnInit{
  form: FormGroup;
  protected utilizarFormularioExterno = false;

  constructor(protected _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({});
   }

  ngOnInit(): void {
    if (this.utilizarFormularioExterno) return;
    this.addControlsNoFormulario();
  }

  protected abstract addControlsNoFormulario(): void;

  protected addCnControlNoForm(cnControlValueAccessorModelBase: CnControlValueAccessorModelBase): void {
    this.form.addControl(cnControlValueAccessorModelBase.name, cnControlValueAccessorModelBase.gerarFormControl(this._formBuilder, cnControlValueAccessorModelBase.valorPadrao));
  }

  protected addCnInputControlNoForm(cnControlValueAccessorModelBase: CnInputCvaModel): void {
    this.addCnControlNoForm(cnControlValueAccessorModelBase);
  }

  protected addControlNoForm(name: string, control: FormControl): void {
    this.form.addControl(name, control);
  }
  protected addObjetoComCnsControlValueAccessorModelBases(controls: any): void {
    let propriedades = Object.keys(controls);
    propriedades.forEach(propriedade => this.addCnControlNoForm(controls[propriedade]));
  }

  obterName(campo: CnControlValueAccessorModelBase): string {
    return campo.name;
  }
}

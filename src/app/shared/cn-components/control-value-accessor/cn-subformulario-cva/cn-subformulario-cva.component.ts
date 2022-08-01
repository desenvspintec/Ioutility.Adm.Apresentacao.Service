import { CnHelper } from './../../../cn-helpers/cn-helper';
import { ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CnControlValueAccessorBaseConponent } from '../../model/cn-control-value-acessor-base-component.model';
import { CnFormBaseModel } from '../../model/cn-form-base-model';
import { CnSubformularioInputCva } from '../models/cn-subformulario-cva-model';

@Component({
  selector: 'app-cn-subformulario-cva',
  templateUrl: './cn-subformulario-cva.component.html',
  styleUrls: ['./cn-subformulario-cva.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CnSubformularioCvaComponent),
      multi: true,
    },
  ],
})
export class CnSubformularioCvaComponent extends CnControlValueAccessorBaseConponent implements OnInit {
  @Input() override model?: CnSubformularioInputCva;
  formModel?: CnFormBaseModel;
  formCarregado = false;
  valorInicial?: any;
  constructor(formBuilder: FormBuilder, private readonly changeDetectorRef: ChangeDetectorRef) {
    super(formBuilder);
  }


  override ngOnInit(): void {
    super.ngOnInit();
    this.formModel = CnFormBaseModel.obterSemSubmit(this.model!.label, this.model!.grupoCampos);
  }
  protected definirComoExportarValor(): void {
    this.form.valueChanges.subscribe((valorFormulario) => {

      if (this.form.valid) this.setarValor(valorFormulario);
      else this.setarValor('');

    });
  }
  protected adequarValorImportado(valor: any): void {
    if (!this.formCarregado)  {
      this.valorInicial = valor;
      return;
    }
    if (CnHelper.estaNuloVazioOuUndefined(valor)) return;
    this.form.patchValue(valor);
  }
  protected addControlsNoFormulario(): void {}

  resgataSubformularioFormulario(form: FormGroup) {

    this.form = form;
    this.definirComoExportarValor();
    this.formCarregado = true;
    this.adequarValorImportado(this.valorInicial);
  }


}

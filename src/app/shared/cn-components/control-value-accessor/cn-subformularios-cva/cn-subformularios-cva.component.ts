import { CnHelper } from './../../../cn-helpers/cn-helper';
import { Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

import { CnControlValueAccessorBaseConponent } from '../../model/cn-control-value-acessor-base-component.model';
import { CnFormBaseModel } from '../../model/cn-form-base-model';
import { CnSubformularioInputCva } from '../models/cn-subformulario-cva-model';
import { CnSubformulariosInputCva } from '../models/cn-subformularios-cva-model';

@Component({
  selector: 'app-cn-subformularios-cva',
  templateUrl: './cn-subformularios-cva.component.html',
  styleUrls: ['./cn-subformularios-cva.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CnSubformulariosCvaComponent),
      multi: true
    }
  ]
})
export class CnSubformulariosCvaComponent extends CnControlValueAccessorBaseConponent{

  @Input() override model?: CnSubformulariosInputCva;
  formModel?: CnFormBaseModel;
  formIdAtual = 0;
  formIds: number[] = [];
  readonly formControlNameBase = 'subformulario-';

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
   }

   override ngOnInit(): void {
    super.ngOnInit();
  }

  protected definirComoExportarValor(): void {
    this.form.valueChanges.subscribe(formValue => {
      if(this.form.valid)
        this._setarValorEmFormaDeLista(formValue);
      else this.setarValor(null);
    })
  }
  private _setarValorEmFormaDeLista(valorFormulario: any) {
    const lista: any[] = [];
    for(let propriedade in valorFormulario)
      lista.push(valorFormulario[propriedade]);
    if (this.model?.required && lista.length == 0)
      this.setarValor(null);
    else this.setarValor(lista);
  }
  protected adequarValorImportado(valor: any): void {
    console.log('------------------');
    console.log(this.model?.name);
    console.log(valor);
    this.resetar();
    try {
      if (!CnHelper.estaNuloVazioOuUndefined(valor))
        valor.forEach((element: any) => {
          this.addForm(element);
        });
    } catch (error) {
      console.log('------------ AVISO -----------------')
      console.log('não foi possivel importar o valor solicitado para a lista. valor:')
      console.log('valor:');
      console.log(valor);
      console.log('model');
      console.log(this.model);
      console.log('erro');
      console.log(error);
    }
  }
  protected addControlsNoFormulario(): void {
    // não houve necessidade de implementar este metodo;
    // sua responsabilidade foi transferida para o metodo addForm
  }

  obterSubformulario(formId: number): CnSubformularioInputCva {
    let subform = new CnSubformularioInputCva(this.formControlNameBase + formId, '',true, this.model!.grupoCampos, false);
    return subform;
  }

  addForm(valorPadrao: any = null): void {
    this.form.addControl(this.formControlNameBase + this.formIdAtual, this._formBuilder.control(valorPadrao, [Validators.required]));
    this.formIds.push(this.formIdAtual);
    this.formIdAtual++;
  }

  resetar(): void {
    this.formIds.forEach(formId => {
      this.remover(formId);
    });
  }

  remover(id: number): void {
    this.formIds = this.formIds.filter(fid => fid !== id);
    this.form.removeControl(this.formControlNameBase + id);

  }
  cssClassesBtnAdd(): string {
    return 'registrar' + this.model?.name;
  }
}

import { Component } from '@angular/core';
import { CnFormBaseComponent } from '../cn-form-base-component';
import { FormBuilder } from '@angular/forms';
import { CnInputCvaModel } from '../../control-value-accessor/models/cn-input-cva.model';

@Component({
  selector: 'app-test-cn-formulario-base',
  templateUrl: './test-cn-formulario-base.component.html'
})
export class TestCnFormularioBaseComponent extends CnFormBaseComponent {

  controls = {
    nome: CnInputCvaModel.obterTextoSimples('nome', 'Nome', true),
    email: CnInputCvaModel.obterTextoSimples('email', 'E-mail', true),
  };
  constructor(fb: FormBuilder) {
    super(fb);
   }


  addControlsNoFormulario(): void {
    this.addObjetoComCnsControlValueAccessorModelBases(this.controls);
  }
}

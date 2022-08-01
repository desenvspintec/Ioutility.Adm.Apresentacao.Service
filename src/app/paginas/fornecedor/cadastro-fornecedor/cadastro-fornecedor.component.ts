import { FornecedorService } from './../fornecedor.service';
import { CnStepperFormBaseComponent } from 'src/app/shared/cn-components/model/cn-stepper-form-base-component';
import { Component } from '@angular/core';

@Component({
  templateUrl: './cadastro-fornecedor.component.html'
})
export class CadastroFornecedorComponent extends CnStepperFormBaseComponent {

  constructor(service: FornecedorService) {
    super(service);
  }

}

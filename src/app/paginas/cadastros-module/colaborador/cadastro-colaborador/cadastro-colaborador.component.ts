import { Component } from '@angular/core';
import { CnStepperFormBaseComponent } from 'src/app/shared/cn-components/model/cn-stepper-form-base-component';
import { ColaboradorService } from '../colaborador.service';

@Component({
  templateUrl: './cadastro-colaborador.component.html',
})
export class CadastroColaboradorComponent extends CnStepperFormBaseComponent  {

  constructor(service: ColaboradorService) {
    super(service);
  }

}

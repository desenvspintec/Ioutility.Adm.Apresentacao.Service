import { Component } from '@angular/core';
import { CnStepperFormBaseComponent } from 'src/app/shared/cn-components/model/cn-stepper-form-base-component';

import { PacienteService } from './../../paciente.service';

@Component({
  templateUrl: './cadastro-completo-form.component.html'
})
export class CadastroCompletoFormComponent extends CnStepperFormBaseComponent  {

  constructor (service: PacienteService){
    super(service);
    service.definirModoCadastroCompleto();
  }
}

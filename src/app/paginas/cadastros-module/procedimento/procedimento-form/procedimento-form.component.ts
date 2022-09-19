import { Component } from '@angular/core';
import { CnStepperFormBaseComponent } from 'src/app/shared/cn-components/model/cn-stepper-form-base-component';

import { ProcedimentoService } from './../procedimento.service';

@Component({
  templateUrl: './procedimento-form.component.html'
})
export class ProcedimentoFormComponent extends CnStepperFormBaseComponent  {

  constructor(service: ProcedimentoService) {
    super(service);
  }
}

import { CnStepperFormBaseComponent } from 'src/app/shared/cn-components/model/cn-stepper-form-base-component';
import { TipoProcedimentoService } from './../tipo-procedimento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './tipo-procedimento-form.component.html'
})
export class TipoProcedimentoFormComponent extends CnStepperFormBaseComponent {

  constructor(service: TipoProcedimentoService) {
    super(service);
  }

}

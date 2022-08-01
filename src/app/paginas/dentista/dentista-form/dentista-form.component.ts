import { Component } from '@angular/core';
import { CnStepperFormBaseComponent } from 'src/app/shared/cn-components/model/cn-stepper-form-base-component';

import { DentistaService } from './../dentista.service';

@Component({
  templateUrl: './dentista-form.component.html'
})
export class DentistaFormComponent extends CnStepperFormBaseComponent {

  constructor(service: DentistaService) {
    super(service);
  }

}

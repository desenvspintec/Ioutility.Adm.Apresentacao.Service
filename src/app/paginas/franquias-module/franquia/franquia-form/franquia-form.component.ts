import { Component } from '@angular/core';
import { CnStepperFormBaseComponent } from 'src/app/shared/cn-components/model/cn-stepper-form-base-component';

import { FranquiaService } from '../franquia.service';

@Component({
  templateUrl: './franquia-form.component.html'
})
export class FranquiaFormComponent extends CnStepperFormBaseComponent {

  constructor(service: FranquiaService) {
    super(service);
  }

}

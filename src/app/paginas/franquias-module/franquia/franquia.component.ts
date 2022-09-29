import { Component } from '@angular/core';
import { CnCrudBaseComponent } from 'src/app/shared/cn-components/model/cn-crud-base-component';

import { FranquiaService } from './franquia.service';

@Component({
  templateUrl: './franquia.component.html'
})
export class FranquiaComponent extends CnCrudBaseComponent {

  constructor(service: FranquiaService) {
    super(service);
  }
}

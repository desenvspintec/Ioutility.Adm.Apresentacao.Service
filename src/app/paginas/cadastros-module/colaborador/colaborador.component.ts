import { Component } from '@angular/core';
import { CnCrudBaseComponent } from 'src/app/shared/cn-components/model/cn-crud-base-component';

import { ColaboradorService } from './colaborador.service';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html'
})
export class ColaboradorComponent extends CnCrudBaseComponent {

  constructor(service: ColaboradorService) {
    super(service);
  }
}

import { Component } from '@angular/core';
import { CnCrudBaseComponent } from 'src/app/shared/cn-components/model/cn-crud-base-component';

import { DentistaFeriasService } from './../dentista-ferias.service';

@Component({
  selector: 'app-dentista-ferias-form',
  templateUrl: './dentista-ferias-form.component.html',
})
export class DentistaFeriasFormComponent extends CnCrudBaseComponent {

  constructor(service: DentistaFeriasService) {
    super(service);
  }

}

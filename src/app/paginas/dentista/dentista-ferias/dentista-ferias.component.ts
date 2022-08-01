import { Component } from '@angular/core';
import { CnCrudBaseComponent } from 'src/app/shared/cn-components/model/cn-crud-base-component';

import { ROTA_COMPLEMENTO } from './../../../shared/constants/routes-constant';
import { DentistaFeriasService } from './dentista-ferias.service';

@Component({
  selector: 'app-dentista-ferias',
  templateUrl: './dentista-ferias.component.html',
})
export class DentistaFeriasComponent  extends CnCrudBaseComponent {

  constructor(service: DentistaFeriasService) {
    super(service);
    service.setarTela(ROTA_COMPLEMENTO.indexModulo)
  }

}

import { ROTA_COMPLEMENTO } from '../../../shared/constants/routes-constant';
import { IDrawerComponent } from '../../../shared/interfaces/i-drawer-compoent';
import { CnDrawerService } from '../../../shared/cn-components/cn-drawer/cn-drawer.service';
import { FranquiaService } from './franquia.service';
import { CnCrudBaseComponent } from 'src/app/shared/cn-components/model/cn-crud-base-component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-franquia',
  templateUrl: './franquia.component.html'
})
export class FranquiaComponent extends CnCrudBaseComponent implements IDrawerComponent {

  model2?: any;
  constructor(service: FranquiaService, private drawerService: CnDrawerService) {
    super(service);
    service.setarTela(ROTA_COMPLEMENTO.indexModulo)
  }

  aoIniciar(model: any): void {
    this.model2 = model;
  }
}

import { ROTA_COMPLEMENTO } from './../../../shared/constants/routes-constant';
import { IDrawerComponent } from '../../../shared/interfaces/i-drawer-compoent';
import { CnDrawerService } from './../../../shared/cn-components/cn-drawer/cn-drawer.service';
import { DentistaService } from './dentista.service';
import { CnCrudBaseComponent } from 'src/app/shared/cn-components/model/cn-crud-base-component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dentista',
  templateUrl: './dentista.component.html'
})
export class DentistaComponent extends CnCrudBaseComponent implements IDrawerComponent {

  model2?:any;
  constructor(service: DentistaService, private drawerService: CnDrawerService) {
    super(service);
    service.setarTela(ROTA_COMPLEMENTO.indexModulo)
  }

  aoIniciar(model: any): void {
    this.model2 = model;
  }
}

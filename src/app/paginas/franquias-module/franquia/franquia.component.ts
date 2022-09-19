import { CnCrudBaseComponent } from 'src/app/shared/cn-components/model/cn-crud-base-component';
import { FranquiaService } from './franquia.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './franquia.component.html'
})
export class FranquiaComponent extends CnCrudBaseComponent {

  constructor(service: FranquiaService) {
    super(service);
  }
}

import { CnCrudBaseComponent } from 'src/app/shared/cn-components/model/cn-crud-base-component';
import { ProcedimentoService } from './procedimento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './procedimento.component.html'
})
export class ProcedimentoComponent extends CnCrudBaseComponent {

  constructor(service: ProcedimentoService) {
    super(service);
  }
}

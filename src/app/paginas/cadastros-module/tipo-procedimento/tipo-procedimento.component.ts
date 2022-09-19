import { TipoProcedimentoService } from './tipo-procedimento.service';
import { CnCrudBaseComponent } from 'src/app/shared/cn-components/model/cn-crud-base-component';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './tipo-procedimento.component.html'
})
export class TipoProcedimentoComponent extends CnCrudBaseComponent {

  constructor(service: TipoProcedimentoService) {
    super(service)
   }


}

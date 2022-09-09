import { ProdutoService } from './produto.service';
import { CnCrudBaseComponent } from 'src/app/shared/cn-components/model/cn-crud-base-component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent extends CnCrudBaseComponent{

  constructor(service: ProdutoService) {
    super(service);
   }


}

import { DisplayNameService } from 'src/app/shared/services/display-name.service';
import { ProdutoBuilder } from './produto.builder';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CnCrudModel } from 'src/app/shared/cn-components/model/cn-crud-model';
import { IComponentService } from 'src/app/shared/interfaces/i-component-service';
import { EntityService } from 'src/app/shared/services/entity.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService  extends EntityService
  implements IComponentService {

  constructor(
    httpClient: HttpClient,
    private _displayNameService: DisplayNameService,
    ) {
    super(httpClient, 'produto')

   }


  gerarModelComponent(): CnCrudModel {
    return new ProdutoBuilder(this, this._displayNameService).gerarModelComponent();
  }
}

import { EntityBasica } from './../../../shared/models/entity-basica';
import { Observable } from 'rxjs';
import { DisplayNameService } from 'src/app/shared/services/display-name.service';
import { TipoFranquiaService } from './../tipo-franquia/tipo-franquia.service';
import { MatDialog } from '@angular/material/dialog';
import { FranquiaBuilder } from './franquia.builder';
import { EnderecoApi } from 'src/app/shared/constants/api.constant';
import { HttpClient } from '@angular/common/http';
import { IComponentService } from 'src/app/shared/interfaces/i-component-service';
import { EntityService } from 'src/app/shared/services/entity.service';
import { Injectable } from '@angular/core';
import { CnCrudModel } from 'src/app/shared/cn-components/model/cn-crud-model';

@Injectable({
  providedIn: 'root'
})
export class FranquiaService extends EntityService implements IComponentService {


  constructor(
    http: HttpClient,
    private _matDialog: MatDialog,
    private _tipoFranquiaService: TipoFranquiaService,
    private _displayNameService: DisplayNameService,
  ) {
    super(http, EnderecoApi.obterFranquiaApp(), 'franquia');
  }

  gerarModelComponent(): CnCrudModel {
    return new FranquiaBuilder(
      this, this._matDialog, this._tipoFranquiaService, this._displayNameService
    ).gerarModelComponent();
  }
  buscarAvancado = (params: any): Observable<EntityBasica[]> => {
    return this.httpClient.get<EntityBasica[]>(this.url, { params });
  }

}

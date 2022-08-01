import { MatDialog } from '@angular/material/dialog';
import { BancoService } from './../../shared/services/banco.service';
import { DisplayNameService } from './../../shared/services/display-name.service';
import { HttpClient } from '@angular/common/http';
import { IComponentService } from './../../shared/interfaces/i-component-service';
import { EntityService } from 'src/app/shared/services/entity.service';
import { Injectable } from '@angular/core';
import { CnCrudModel } from 'src/app/shared/cn-components/model/cn-crud-model';
import { ColaboradorBuilder } from './colaborador.builder';
import { Observable } from 'rxjs';
import { EntityBasica } from 'src/app/shared/models/entity-basica';
import { ColaboradorIIndicadoresDTO, ColaboradorStatus } from './colaborador.model';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService extends EntityService implements IComponentService {

  constructor(httpClient: HttpClient,
    private _displayNameService: DisplayNameService,
    private _bancoService: BancoService,
    private _matDialog: MatDialog) {
      super(httpClient, 'colaborador');
     }
  gerarModelComponent(): CnCrudModel {
    return new ColaboradorBuilder(this, this._bancoService, this._matDialog, this._displayNameService).gerarModelComponent();
  }
  buscarAvancado = (params: any): Observable<EntityBasica[]> => {
    return this.httpClient.get<EntityBasica[]>(this.url + 'avancado', {params});
  }

  buscarStatusPorId = (id: string):  Observable<ColaboradorStatus> => {
    return this.httpClient.get<ColaboradorStatus>(this.url + id + '/status');
  }
  atualizarStatus = (colaboradorStatus: ColaboradorStatus): Observable<any> => {
    return this.httpClient.put(this.url + colaboradorStatus.id + '/status', colaboradorStatus);
  }
  buscarIndicadores(): Observable<ColaboradorIIndicadoresDTO> {
    return this.httpClient.get<ColaboradorIIndicadoresDTO>(this.url + 'indicadores');
  }
}

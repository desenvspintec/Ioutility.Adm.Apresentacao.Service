import { EnderecoApi } from 'src/app/shared/constants/api.constant';
import { EntityBasica } from 'src/app/shared/models/entity-basica';
import { FornecedorStatus, IIndicadoresDTO, IIndicadoresCentroDeCustoDTO, FornecedorCentroDeCusto } from './fornecedor.models';
import { DisplayNameService } from './../../../shared/services/display-name.service';
import { HttpClient } from '@angular/common/http';
import { EntityService } from 'src/app/shared/services/entity.service';
import { Injectable } from '@angular/core';
import { IComponentService } from 'src/app/shared/interfaces/i-component-service';
import { CnCrudModel } from 'src/app/shared/cn-components/model/cn-crud-model';
import { Observable } from 'rxjs';
import { BancoService } from 'src/app/shared/services/banco.service';
import { MatDialog } from '@angular/material/dialog';
import { FornecedorBuilder } from './fornecedor.builder';


@Injectable({
  providedIn: 'root'
})
export class FornecedorService extends EntityService implements IComponentService {

  constructor(httpClient: HttpClient,
    private _displayNameService: DisplayNameService,
    private _bancoService: BancoService,
    private _matDialog: MatDialog,
  ) {
    super(httpClient, EnderecoApi.obterCadastroApp(), 'fornecedor');
  }
  gerarModelComponent(): CnCrudModel {
      return new FornecedorBuilder(this, this._bancoService, this._matDialog, this._displayNameService).gerarModelComponent();
  }

  buscarIndicadores(): Observable<IIndicadoresDTO> {
    return this.httpClient.get<IIndicadoresDTO>(this.url + 'indicadores');
  }
  buscarIndicadoresCentroDeCusto(): Observable<IIndicadoresCentroDeCustoDTO> {
    return this.httpClient.get<IIndicadoresCentroDeCustoDTO>(this.url + 'indicadores/centrodecusto')
  }
  buscarStatusPorId = (id: string): Observable<FornecedorStatus> => {
    return this.httpClient.get<FornecedorStatus>(this.url + id + '/status');
  }
  buscarCentroDeCustoPorId = (id: string): Observable<FornecedorCentroDeCusto> => {
    return this.httpClient.get<FornecedorCentroDeCusto>(this.url + id + '/centrodecusto');
  }
  buscarAvancado = (params: any): Observable<EntityBasica[]> => {
    return this.httpClient.get<EntityBasica[]>(this.url + 'avancado', { params });
  }
  atualizarStatus = (fornecedorStatus: FornecedorStatus): Observable<any> => {
    return this.httpClient.put(this.url + fornecedorStatus.id + '/status', fornecedorStatus);
  }

}

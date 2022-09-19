import { EnderecoApi } from 'src/app/shared/constants/api.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CnCrudModel } from 'src/app/shared/cn-components/model/cn-crud-model';
import { ROTA_COMPLEMENTO } from 'src/app/shared/constants/routes-constant';
import { EntityBasica } from 'src/app/shared/models/entity-basica';
import { DisplayNameService } from 'src/app/shared/services/display-name.service';
import { EntityService } from 'src/app/shared/services/entity.service';

import { DentistaFeriasIIndicadoresDTO, DentistaFeriasStatus } from '../dentista.model';
import { IComponentService } from './../../../../shared/interfaces/i-component-service';
import { BancoService } from './../../../../shared/services/banco.service';
import { DentistaService } from './../dentista.service';
import { DentistaFeriasBuilder } from './dentista-ferias.builder';

@Injectable({
  providedIn: 'root'
})
export class DentistaFeriasService extends EntityService implements IComponentService {

  constructor(
    httpClient: HttpClient,
    private _displayNameService: DisplayNameService,
    private _bancoService: BancoService,
    private _matDialog: MatDialog,
    private _dentistaService: DentistaService
  ) {
    super(httpClient, EnderecoApi.obterCadastroApp(), 'dentistaFerias');
  }
  telaDentistaFerias = ROTA_COMPLEMENTO.indexModulo;

  gerarModelComponent(): CnCrudModel {
      return new DentistaFeriasBuilder(this, this._matDialog, this._displayNameService, this._dentistaService).gerarModelComponent();

  }
  setarTela(tela: string): void {
    this.telaDentistaFerias = tela;
  }
  buscarAvancado = (params: any): Observable<EntityBasica[]> => {
    return this.httpClient.get<EntityBasica[]>(this.url + 'avancado', {params});
  }

  buscarStatusPorId = (id: string):  Observable<DentistaFeriasStatus> => {
    return this.httpClient.get<DentistaFeriasStatus>(this.url + id + '/status');
  }
  atualizarStatus = (feriasStatus: DentistaFeriasStatus): Observable<any> => {
    return this.httpClient.put(this.url + feriasStatus.id + '/status', feriasStatus);
  }
  buscarIndicadores(): Observable<DentistaFeriasIIndicadoresDTO> {
    return this.httpClient.get<DentistaFeriasIIndicadoresDTO>(this.url + 'indicadores');
  }

  get modoDentista(): string { return this.modoDentista; }
}

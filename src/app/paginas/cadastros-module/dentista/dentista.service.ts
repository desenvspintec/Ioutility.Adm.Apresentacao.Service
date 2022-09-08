import { CnDrawerService } from './../../../shared/cn-components/cn-drawer/cn-drawer.service';
import { CnPesquisaService } from './../../../shared/cn-components/cn-pesquisa/cn-pesquisa.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CnCrudModel } from 'src/app/shared/cn-components/model/cn-crud-model';
import { IComponentService } from 'src/app/shared/interfaces/i-component-service';
import { EntityBasica } from 'src/app/shared/models/entity-basica';
import { DisplayNameService } from 'src/app/shared/services/display-name.service';
import { EntityService } from 'src/app/shared/services/entity.service';

import { ROTA_COMPLEMENTO } from './../../../shared/constants/routes-constant';
import { BancoService } from './../../../shared/services/banco.service';
import { DentistaBuilder } from './dentista.builder';
import { DentistaIEmailDTO, DentistaIIndicadoresDTO, DentistaStatus } from './dentista.model';
import { PesquisaCache } from 'src/app/shared/cn-components/cn-pesquisa/pesquisa-cache';

@Injectable({
  providedIn: 'root',
})
export class DentistaService
  extends EntityService
  implements IComponentService
{
  private _cachePalavraChaveBusca: string = '';
  constructor(
    httpClient: HttpClient,
    private _displayNameService: DisplayNameService,
    private _bancoService: BancoService,
    private _matDialog: MatDialog,
    private _drawerService: CnDrawerService,
    ) {
    super(httpClient, 'dentista');
  }
  telaDentista = ROTA_COMPLEMENTO.indexModulo;
  get cachePalavraChaveBusca(): string { return this._cachePalavraChaveBusca}

  setarCachePalavraChaveBusca(cachePalavraChaveBusca: string): void { this._cachePalavraChaveBusca = cachePalavraChaveBusca;}

  gerarModelComponent(): CnCrudModel {
    return new DentistaBuilder(this,this._bancoService, this._matDialog, this._drawerService ,this._displayNameService).gerarModelComponent();
  }

  setarTela(tela: string): void {
    this.telaDentista = tela;
  }
  buscarAvancado = (params: any): Observable<EntityBasica[]> => {
    return this.httpClient.get<EntityBasica[]>(this.url + 'avancado', {params});
  }
  buscarStatusPorId = (id: string):  Observable<DentistaStatus> => {
    return this.httpClient.get<DentistaStatus>(this.url + id + '/status');
  }
  atualizarStatus = (dentistaStatus: DentistaStatus): Observable<any> => {
    return this.httpClient.put(this.url + dentistaStatus.id + '/status', dentistaStatus);
  }
  buscarIndicadores(): Observable<DentistaIIndicadoresDTO> {
    return this.httpClient.get<DentistaIIndicadoresDTO>(this.url + 'indicadores');
  }
  buscarEmail(id: string): Observable<DentistaIEmailDTO> {
    return this.httpClient.get<DentistaIEmailDTO>(this.url + id + '/email');
  }
  buscarFalta = (params: any): Observable<EntityBasica[]> => {
    return this.httpClient.get<EntityBasica[]>(this.url + 'faltas', {params});
  }
  buscarFolhaPagamento = (params: any): Observable<EntityBasica[]> => {
    return this.httpClient.get<EntityBasica[]>(this.url + 'folha-pagamento', {params});
  }

  get modoDentista(): string { return this.modoDentista; }


}

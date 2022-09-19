
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CnCrudModel } from 'src/app/shared/cn-components/model/cn-crud-model';
import { IComponentService } from 'src/app/shared/interfaces/i-component-service';
import { EntityBasica } from 'src/app/shared/models/entity-basica';
import { DisplayNameService } from 'src/app/shared/services/display-name.service';
import { EntityService } from 'src/app/shared/services/entity.service';
import { CnDrawerService } from '../../../shared/cn-components/cn-drawer/cn-drawer.service';
import { ROTA_COMPLEMENTO } from '../../../shared/constants/routes-constant';
import { BancoService } from '../../../shared/services/banco.service';
import { FranquiaBuilder } from './franquia.builder';
import { FranquiaStatus, FranquiaIIndicadoresDTO } from './franquia.model';

@Injectable({
  providedIn: 'root',
})
export class FranquiaService
  extends EntityService
  implements IComponentService {
  private _cachePalavraChaveBusca: string = '';
  constructor(
    httpClient: HttpClient,
    private _displayNameService: DisplayNameService,
    private _bancoService: BancoService,
    private _matDialog: MatDialog,
    private _drawerService: CnDrawerService,
  ) {
    super(httpClient, 'franquia');
  }
  telaFranquia = ROTA_COMPLEMENTO.indexModulo;
  get cachePalavraChaveBusca(): string { return this._cachePalavraChaveBusca }

  setarCachePalavraChaveBusca(cachePalavraChaveBusca: string): void { this._cachePalavraChaveBusca = cachePalavraChaveBusca; }

  gerarModelComponent(): CnCrudModel {
    return new FranquiaBuilder(this, this._bancoService, this._matDialog, this._drawerService, this._displayNameService).gerarModelComponent();
  }

  setarTela(tela: string): void {
    this.telaFranquia = tela;
  }
  buscarAvancado = (params: any): Observable<EntityBasica[]> => {
    return this.httpClient.get<EntityBasica[]>(this.urlFranquia + 'avancado', { params });
  }
  buscarStatusPorId = (id: string): Observable<FranquiaStatus> => {
    return this.httpClient.get<FranquiaStatus>(this.urlFranquia + id + '/status');
  }
  atualizarStatus = (franquiaStatus: FranquiaStatus): Observable<any> => {
    return this.httpClient.put(this.urlFranquia + franquiaStatus.id + '/status', franquiaStatus);
  }
  buscarIndicadores(): Observable<FranquiaIIndicadoresDTO> {
    return this.httpClient.get<FranquiaIIndicadoresDTO>(this.urlFranquia + 'indicadores');
  }
  get modoFranquia(): string { return this.modoFranquia; }


}

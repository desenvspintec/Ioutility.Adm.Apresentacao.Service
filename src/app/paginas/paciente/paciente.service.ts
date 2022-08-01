import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CnCrudModel } from 'src/app/shared/cn-components/model/cn-crud-model';
import { IComponentService } from 'src/app/shared/interfaces/i-component-service';
import { IEntity } from 'src/app/shared/models/entity';
import { BancoService } from 'src/app/shared/services/banco.service';
import { DisplayNameService } from 'src/app/shared/services/display-name.service';
import { EntityService } from 'src/app/shared/services/entity.service';

import { EntityBasica } from './../../shared/models/entity-basica';
import { PacienteBuilder } from './paciente.builder';
import { MODO_CADASTRO_PACIENTE } from './paciente.constant';
import { PacienteIIndicadoresDTO, PacienteStatus } from './paciente.models';

@Injectable({
  providedIn: 'root',
})
export class PacienteService
  extends EntityService
  implements IComponentService {

  constructor(
    httpClient: HttpClient,
    private _displayNameService: DisplayNameService,
    private _bancoService: BancoService,
    private _matDialog: MatDialog
  ) {
    super(httpClient, 'Paciente');
    this.definirModoPreCadastro();
  }
  gerarModelComponent(): CnCrudModel {
    return new PacienteBuilder(this, this._matDialog, this._displayNameService).gerarModelComponent();
  }

  _modoPaciente: string = MODO_CADASTRO_PACIENTE.preCadastro;

  buscarStatusPorId = (id: string): Observable<PacienteStatus> => {
    return this.httpClient.get<PacienteStatus>(this.url + id + '/status');
  }
  atualizarStatus = (pacienteStatus: PacienteStatus): Observable<any> => {
    return this.httpClient.put(this.url + pacienteStatus.id + '/status', pacienteStatus);
  }
  buscarIndicadores(): Observable<PacienteIIndicadoresDTO> {
    return this.httpClient.get<PacienteIIndicadoresDTO>(this.url + 'indicadores');
  }
  get estaEmModoPreCadastro(): boolean { return this._modoPaciente === MODO_CADASTRO_PACIENTE.preCadastro;}
  get estaEmModoCadastroCompleto(): boolean { return this._modoPaciente === MODO_CADASTRO_PACIENTE.cadastroCompleto;}
  get modoPaciente(): string { return this.modoPaciente; }

  definirModoPreCadastro(): void {
    this._modoPaciente = MODO_CADASTRO_PACIENTE.preCadastro;
  }

  definirModoCadastroCompleto(): void {
    this._modoPaciente = MODO_CADASTRO_PACIENTE.cadastroCompleto;
  }

  buscarAvancado = (params: any): Observable<EntityBasica[]> => {
    return this.httpClient.get<EntityBasica[]>(this.url + 'avancado', { params });
  }
  
  registrarPreCadastro = (entity: IEntity): Observable<any> => {
    return this.httpClient.post(this.url + 'preCadastro', entity);
  }
  atualizarPreCadastro = (entity: IEntity): Observable<any> => {
    return this.httpClient.put(this.url + `${entity.id}/preCadastro`, entity);
  }

}

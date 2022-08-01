import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityService } from 'src/app/shared/services/entity.service';

import { DentistaIContratoDTO } from '../../dentista.model';

@Injectable({
  providedIn: 'root'
})
export class ContratoService extends EntityService {

  constructor(
    httpClient: HttpClient,
    ) {
    super(httpClient, 'contrato');
  }

  buscarContrato = (): Observable<DentistaIContratoDTO> => {
    return this.httpClient.get<DentistaIContratoDTO>(this.url + 'avancado');
  }

  atualizarContrato = (contrato: DentistaIContratoDTO): Observable<any> => {
    return this.httpClient.put(this.url + contrato.id + '/texto-contrato', contrato);
  }

}

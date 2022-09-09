import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityService } from 'src/app/shared/services/entity.service';

import { DentistaIDistratoDTO } from '../../dentista.model';

@Injectable({
  providedIn: 'root'
})
export class DistratoService extends EntityService {

  constructor(
    httpClient: HttpClient,
    ) {
    super(httpClient, 'distrato');
  }

  buscarDistrato = (): Observable<DentistaIDistratoDTO> => {
    return this.httpClient.get<DentistaIDistratoDTO>(this.url + 'avancado');
  }

  atualizarDistrato = (distrato: DentistaIDistratoDTO): Observable<any> => {
    return this.httpClient.put(this.url + distrato.id + '/texto-distrato', distrato);
  }

}
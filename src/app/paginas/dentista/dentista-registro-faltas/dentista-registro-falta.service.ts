import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROTA_COMPLEMENTO } from 'src/app/shared/constants/routes-constant';
import { EntityBasica } from 'src/app/shared/models/entity-basica';
import { EntityService } from 'src/app/shared/services/entity.service';

@Injectable({
  providedIn: 'root'
})
export class DentistaRegistroFaltaService extends EntityService {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'registroFalta');
  }
  telaDentistaRegistroFalta = ROTA_COMPLEMENTO.indexModulo;

  setarTela(tela: string): void {
    this.telaDentistaRegistroFalta = tela;
  }

  buscarDataEmAnos(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'anos');
  }

  buscarDetalhesFaltaPorDentistaId = (entityId: string): Observable<EntityBasica[]> => {
    return this.httpClient.get<EntityBasica[]>(this.url + entityId + '/detalhesfalta');
  }
}

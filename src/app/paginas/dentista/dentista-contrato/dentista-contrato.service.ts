import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROTA_COMPLEMENTO } from 'src/app/shared/constants/routes-constant';
import { EntityBasica, IEntityBasica } from 'src/app/shared/models/entity-basica';
import { EntityService } from 'src/app/shared/services/entity.service';

@Injectable({
  providedIn: 'root'
})
export class DentistaContratoService extends EntityService {

  constructor(
    httpClient: HttpClient,
    ) {
    super(httpClient, 'dentistaContrato');
  }
  telaDentistaContrato = ROTA_COMPLEMENTO.indexModulo;

  setarTela(tela: string): void {
    this.telaDentistaContrato = tela;
  }

  buscarAvancado = (params: any): Observable<EntityBasica[]> => {
    return this.httpClient.get<EntityBasica[]>(this.url + 'avancado', {params});
  }

  get modoDentista(): string { return this.modoDentista; }

  buscarPorDentista = (dentistaId: string): Observable<IEntityBasica[]> => {
    return this.httpClient.get<IEntityBasica[]>(this.url + 'buscarPorDentista/' + dentistaId);
  }
}

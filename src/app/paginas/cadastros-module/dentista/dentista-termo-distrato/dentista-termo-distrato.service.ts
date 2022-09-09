import { Observable } from 'rxjs';
import { IEntityBasica } from 'src/app/shared/models/entity-basica';
import { ROTA_COMPLEMENTO } from 'src/app/shared/constants/routes-constant';
import { HttpClient } from '@angular/common/http';
import { EntityService } from 'src/app/shared/services/entity.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DentistaTermoDistratoService extends EntityService{

  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient, 'dentistaTermoDistrato');
  }
  telaDentistaTermoDistrato = ROTA_COMPLEMENTO.indexModulo;

  setarTela(tela: string): void {
    this.telaDentistaTermoDistrato = tela;
  }

  buscarPorDentista = (dentistaId: string): Observable<IEntityBasica[]> => {
    return this.httpClient.get<IEntityBasica[]>(this.url + 'buscarPorDentista/' + dentistaId);
  }

  get modoDentista(): string { return this.modoDentista; }
}

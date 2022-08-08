import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { EntityBasica } from './../models/entity-basica';
import { ICrudService } from './../interfaces/i-crud-service';
import { EnderecoApi } from '../constants/api.constant';
import { Entity } from '../models/entity';

export  class EntityService implements ICrudService {
protected readonly url: string;
  constructor(public httpClient: HttpClient, controllerUrl: string) {
    this.url = EnderecoApi.obterApp() + controllerUrl + '/';
  }
  buscarPorNome = (params: any): Observable<EntityBasica[]> => {
    return this.httpClient.get<EntityBasica[]>(this.url, {params});
  }
  buscarPorId = (entityId: string): Observable<Entity> => {
    return this.httpClient.get<EntityBasica>(this.url + entityId);
  }
  registrar = (entity: Entity): Observable<any> => {
    return this.httpClient.post<any>(this.url, entity);
  }
  atualizar = (entity: Entity): Observable<any> => {
    return this.httpClient.put<any>(this.url + entity.id, entity);
  }
  inativar = (entity: Entity): Observable<any> => {
    return this.httpClient.delete<any>(this.url + entity.id);
  }
}

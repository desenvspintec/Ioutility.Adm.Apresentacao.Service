import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Entity } from '../models/entity';
import { ICrudService } from './../interfaces/i-crud-service';
import { EntityBasica } from './../models/entity-basica';

export  class EntityService implements ICrudService {
protected readonly url: string;
  constructor(public httpClient: HttpClient, appGateway: string, controllerUrl: string) {
    this.url = appGateway + controllerUrl + '/';
  }
  buscarPorNome = (nome: string): Observable<EntityBasica[]> => {
    return this.httpClient.get<EntityBasica[]>(this.url, {params: {nome}});
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

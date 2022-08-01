import { Observable } from 'rxjs';

import { EntityBasica } from '../models/entity-basica';
import { Entity } from '../models/entity';

export interface ICrudService {
  buscarPorNome(nome: string): Observable<EntityBasica[]>;
  buscarPorId(id: string): Observable<Entity>;
  registrar(entity: Entity): Observable<Entity>;
  atualizar(entity: Entity): Observable<any>;
  inativar(entity: Entity): Observable<any>;
}

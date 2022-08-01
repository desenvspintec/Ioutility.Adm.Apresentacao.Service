import { ICrudService } from './i-crud-service';
import { EntityBasica } from '../models/entity-basica';
import { Observable } from 'rxjs';
export interface ICrudServiceTest extends ICrudService {
  obterFakeDb(): EntityBasica[];
  inicializarDb(db: any[]): void;

  registrarComErroTratado(valor: any): Observable<any>;
  registrarComErroNaoTratado(valor: any): Observable<any>;
  inativarComErroNaoTratado(valor: any): Observable<any>;
}

import { IHttpErrorResponse } from './../interfaces/i-http-error-response';
import { ICrudServiceTest } from './../interfaces/i-crud-service-test';
import { delay } from 'rxjs/operators';
import { EntityBasica } from 'src/app/shared/models/entity-basica';
import { Observable, of, throwError } from 'rxjs';
import { Entity } from 'src/app/shared/models/entity';

export class TesteCrudService implements ICrudServiceTest {

  bancoDadosFake: EntityBasica[] = [];
  constructor(db: any[] = DB_TEST) {
    this.inicializarDb(db);
   }

  static errorNaoTratadoFake(): IHttpErrorResponse {
    return {
            error: {},
            message: 'error fake',
            name: 'erro nao tratado',
            ok: false,
            status: 500,
            statusText: 'internal server error',
            url: 'urlInexistente'
          };
  }
  static errorTratadoFake(): IHttpErrorResponse {
    return {
            error: {
              errors: ['erro teste'],
              errorsDetails: [ {tipo: 'tipoTeste', notification: 'erro teste'} ]
            },
            message: 'error fake',
            name: 'erro nao tratado',
            ok: false,
            status: 500,
            statusText: 'internal server error',
            url: 'urlInexistente'
          };
  }
  obterFakeDb(): EntityBasica[] {
    return this.bancoDadosFake;
  }

  inicializarDb(db: any[]): void {
    // if (this.bancoDadosFake.length !== 0) return;
    const array: any[] = [];
    this.bancoDadosFake = array.concat(db);
  }
  buscarPorNome = (nome: string): Observable<EntityBasica[]> => {
    const dados = this.bancoDadosFake.filter(entity => entity.nome.includes(nome));
    return of(dados).pipe(delay(10));
  }
  buscarPorId = (entityId: string): Observable<any> => {
    const dados = this.bancoDadosFake.find(entity => entity.id === entityId);
    if (dados === undefined) return throwError(TesteCrudService.errorNaoTratadoFake());
    return of(dados);
  }
  registrar = (entity: Entity): Observable<Entity> => {
    this.bancoDadosFake.push(entity as EntityBasica);
    return of(entity).pipe(delay(10));
  }
  atualizar = (entity: Entity): Observable<any> => {
    this.bancoDadosFake = this.bancoDadosFake.filter(entityDb => entityDb.id !== entity.id);
    this.bancoDadosFake.push(entity as EntityBasica);
    return of(null).pipe(delay(10));
  }
  inativar = (entity: Entity): Observable<any> => {
    this.bancoDadosFake = this.bancoDadosFake.filter(entityDb => entityDb.id !== entity.id);
    return of(null).pipe(delay(10));
  }

  registrarComErroTratado(valor: any): Observable<any> {
    return throwError(TesteCrudService.errorTratadoFake()).pipe(delay(10));
  }
  registrarComErroNaoTratado(valor: any): Observable<any> {
    return throwError(TesteCrudService.errorNaoTratadoFake());
  }
  inativarComErroNaoTratado(valor: any): Observable<any> {
    return throwError(TesteCrudService.errorNaoTratadoFake());
  }
}
export const NOME_DB_TEST_YARROW = 'Yarrow';
export const NOME_DB_TEST_MATTIAS = 'Mattias';
export const NOME_DB_TEST_FREELANCER = 'Freelancer';

export const DB_TEST = [
  {id: '1', nome: NOME_DB_TEST_YARROW},
  {id: '2', nome: NOME_DB_TEST_MATTIAS},
  {id: '3', nome: NOME_DB_TEST_FREELANCER}
];

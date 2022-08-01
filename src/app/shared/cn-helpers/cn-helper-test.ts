import { ICrudServiceTest } from './../interfaces/i-crud-service-test';
import { DB_TEST } from './../services/teste-crud.service';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { EntityBasica } from '../models/entity-basica';
import { TesteCrudService } from '../services/teste-crud.service';
export class CnHelperTest {
  static setarElementoPorCss<T>(fixture: ComponentFixture<T>, elemento: string, valor: string): void {
    const inputElement = this.obterElementoHtml(fixture, elemento);
    inputElement.value = valor;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable();
  }
  static obterElementoHtml<T>(fixture: ComponentFixture<T>, elemento: string): any {
    return fixture.debugElement.query(By.css(elemento)).nativeElement;
  }

  static buscarEntitysBasicaCacheTest(nome: string, limiteResultado: number): Observable<EntityBasica[]> {
    const pesquisa = ENTITYS_BASICAS_TEST.filter(entity => entity.nome.includes(nome)).slice(0, limiteResultado);
    return of(pesquisa).pipe(delay(1));
  }
  static buscarEntitysBasicaComErroTest(nome: string, limiteResultado: number): Observable<EntityBasica[]> {
    return of(this.gerarErro()).pipe(delay(100));
  }
  private static gerarErro(): any {
    throw new Error('exception teste');
  }
  static buscarEntitysBasicaCacheComDependenteTest(nome: string
                                                 , limiteResultado: number
                                                 , paiDependenteId: string): Observable<EntityBasica[]> {
    const pesquisa = ENTITYS_BASICAS_DEPENDENTE_TEST
      .filter(entity => entity.nome.includes(nome) && entity.paiDependenteId === paiDependenteId).slice(0, limiteResultado);

    return of(pesquisa).pipe(delay(100));
  }
  static obterNovoTesteCrudService(): ICrudServiceTest {
    const service = new TesteCrudService();
    service.inicializarDb(DB_TEST);
    return service;
  }
}

export const ENTITYS_BASICAS_TEST: EntityBasica[] = DB_TEST;


class EntityBasicaDependente extends EntityBasica{
  constructor(id: string, nome: string, public paiDependenteId: string) {
    super(id, nome);
  }
}

export const ENTITYS_BASICAS_DEPENDENTE_TEST: EntityBasicaDependente[] = [
  {id: '1', nome: 'Yarrow', paiDependenteId: '10'}
  , {id: '2', nome: 'Mattias', paiDependenteId: '10'}
  , {id: '3', nome: 'Freelancer', paiDependenteId: '10'}
  , {id: '4', nome: 'Yarrow', paiDependenteId: '20'}
  , {id: '5', nome: 'Mattias', paiDependenteId: '20'}
  , {id: '6', nome: 'Freelancer', paiDependenteId: '20'}
];

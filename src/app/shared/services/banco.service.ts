import { IBancoApi } from './../models/i-banco-api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { EnderecoApi } from './../constants/api.constant';
import { IEntityBasica } from './../models/entity-basica';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  protected readonly url: string;

  constructor(private _httpClient: HttpClient) {
    this.url = EnderecoApi.obterApp() + 'banco/'
  }
  buscarPorNome = (nome: string): Observable<IEntityBasica[]> => {
    return this._httpClient.get<IBancoApi[]>(this.url, {params: {nome}}).pipe(
      map((bancosApi: IBancoApi[]) =>
        bancosApi.map(bancoApi => ({id: bancoApi.value, nome: bancoApi.labelValue}))
      )
    );
  }

  buscarPorId = (id: string): Observable<IEntityBasica> => {
    return this._httpClient.get<IBancoApi>(this.url + id).pipe(
      map((bancoApi: IBancoApi) => ({id: bancoApi.value, nome: bancoApi.labelValue}))
    );
  }
}

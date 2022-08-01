import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EntityBasica } from 'src/app/shared/models/entity-basica';

import { CnHelper } from './../../../cn-helpers/cn-helper';
import { LISTA_ENDERECO_UFS } from './endereco-constants';
import { EnderecoEstado } from './models';

@Injectable({
  providedIn: 'root'
})
export class CnCepService {

  private readonly caminhoJsonEstadosCidades = '/assets/json-constants/lista-estados-com-cidades.json';
  constructor(public _httpClient: HttpClient) {
  }

  private _obterUrl(cep: string): string {
    return `https://viacep.com.br/ws/${cep}/json/`;
  }

  buscarCep(cep: string): Observable<string> {
    return this._httpClient.get<string>(this._obterUrl(cep));
  }
  buscarEstadoPorNome(nomeEstado: string): Observable<EntityBasica[]> {
    const nomeEstadoPesquisavel = CnHelper.formatarParaBusca(nomeEstado);
    const estadosConsultados = LISTA_ENDERECO_UFS.filter(uf => uf.nomePesquisavel.includes(nomeEstadoPesquisavel));
    const estadosEntityBasic = estadosConsultados.map(uf => new EntityBasica(uf.sigla, uf.nome));
    return of(estadosEntityBasic);
  }

  buscarEstadoPorSigla(sigla: string): Observable<EntityBasica> {
    if (CnHelper.estaNuloVazioOuUndefined(sigla)) return of(new EntityBasica('', ''));

    const estadoConsultado = LISTA_ENDERECO_UFS.find(uf => uf.sigla.toLowerCase() === sigla.toLowerCase());
    const encontrouEstado = estadoConsultado !== undefined;
    if (!encontrouEstado) throw new Error(`não foi possivel encontrar um estado para a sigla ${sigla}. Verifique se a fonte de dados desta busca esta correta. Metodo buscarEstadoPorSigla em cepservice`);

    const estadoEntityBasic = new EntityBasica(estadoConsultado.sigla, estadoConsultado.nome);
    return of(estadoEntityBasic);
  }

  buscarCidadePorNome = (nomeCidade: string): Observable<EntityBasica> => {
    const nomeCidadePesquisavel = CnHelper.formatarParaBusca(nomeCidade);
    return this._httpClient.get<EnderecoEstado[]>(this.caminhoJsonEstadosCidades).pipe(
      switchMap((estados: EnderecoEstado[]) => {
        const cidade = estados!.find(estado => estado.cidades.some(cidade => CnHelper.formatarParaBusca(cidade) === nomeCidadePesquisavel))!
                          .cidades.find(cidade => CnHelper.formatarParaBusca(cidade) === nomeCidadePesquisavel);
        const cidadeEntityBasic = new EntityBasica(cidade!, cidade!);
        return of (cidadeEntityBasic);
      }));
  }

  buscarCidadePorNomeEEstado = (nomeCidade: string, siglaUf: string): Observable<EntityBasica[]> => {
    const nomeCidadePesquisavel = CnHelper.formatarParaBusca(nomeCidade);

    return this._httpClient.get<EnderecoEstado[]>(this.caminhoJsonEstadosCidades).pipe(
      switchMap((estados: EnderecoEstado[]) => {
        const estadoEncontrado = estados.find(estado => estado.sigla === siglaUf);
        if (estadoEncontrado === undefined)  this._addErroNaoEncontradoEstado();

        const cidades = estadoEncontrado!.cidades.filter(cidade => CnHelper.formatarParaBusca(cidade).includes(nomeCidadePesquisavel)).map(cidade => new EntityBasica(cidade, cidade));
        return of (cidades);
      }));
  }
  private _addErroNaoEncontradoEstado() {
    throw new Error('A Sigla do estado foi setada de forma inadequada, pois o metodo de buscar cidade não a encontrou, verifique se foi implementado corretamente um value changes para o UF e ele esta passando o valor correto');
  }

}

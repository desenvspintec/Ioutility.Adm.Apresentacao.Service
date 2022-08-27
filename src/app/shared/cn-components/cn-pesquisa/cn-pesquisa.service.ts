import { Injectable } from '@angular/core';
import { PesquisaCache } from './pesquisa-cache';

@Injectable({
  providedIn: 'root'
})
export class CnPesquisaService {

  private _palavrasEmCache: PesquisaCache[] = [];

  constructor() { }
  setarCache(pesquisaCache: PesquisaCache): void {
    let palavrasEmCacheExistente = this._palavrasEmCache.find(palavra => palavra.identificador === pesquisaCache.identificador);
    if (palavrasEmCacheExistente) {
       palavrasEmCacheExistente.palavraChave = pesquisaCache.palavraChave;
       return;
    }
    this._palavrasEmCache.push(pesquisaCache);
  }

  obterPalavraEmCache(identificador: string): string | undefined {
    const palavrasEmCacheExistente = this._palavrasEmCache.find(palavra => palavra.identificador === identificador);

    if (palavrasEmCacheExistente) return palavrasEmCacheExistente.palavraChave;
    return undefined;
  }


}

import { Type } from '@angular/core';
import { LoadChildrenCallback, Route, Router } from '@angular/router';

import { SEPARADOR_URL, ROTA_COMPLEMENTO } from './../constants/routes-constant';
import { StringHelper } from './cn-string-helper';

export class RouterHelper {
  private constructor() {}

  static formarRota(caminhos: string[], rotaIniciaNaRaizApp = false): string {
    let caminhoFinal = '';

    caminhos.forEach((caminho) => {
      caminhoFinal += caminho + SEPARADOR_URL;
    });

    caminhoFinal = StringHelper.removerUltimosCaracter(caminhoFinal);
    if (rotaIniciaNaRaizApp) caminhoFinal = '/' + caminhoFinal;
    return caminhoFinal;
  }

  static obterPathSimples(caminho: {em: string[], component: Type<any>}): Route {
    return { path: this.formarRota(caminho.em), component: caminho.component};
  }

  static obterPathParaModulo(caminhos: string[], loadChildren: LoadChildrenCallback): Route {
    return { path: this.formarRota(caminhos), loadChildren};
  }

  static obterPathRedirecionado(caminhos: {em: string[], irPara: string[]}): Route {
    return { path: this.formarRota(caminhos.em), redirectTo: this.formarRota(caminhos.irPara), pathMatch: 'full'};
  }

  static obterRotaRaizDoCrud(rotaCorrigir: string) {
    let rotaFinal = '';
    const urlLista = rotaCorrigir.split('/');

    for (let index = 0; index < urlLista.length - 1; index++) {
      const urlItem = urlLista[index];
      rotaFinal += urlItem+'/';
    }

    return StringHelper.removerUltimosCaracter(rotaFinal, 1);
  }
}

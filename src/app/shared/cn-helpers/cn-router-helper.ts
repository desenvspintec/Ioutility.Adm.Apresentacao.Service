import { Type } from '@angular/core';
import { LoadChildrenCallback, Route } from '@angular/router';

import { SEPARADOR_URL, ROTA_COMPLEMENTO } from './../constants/routes-constant';
import { StringHelper } from './cn-string-helper';

export class RouterHelper {
  private constructor() {}

  static formarRota(caminhos: string[]): string {
    let caminhoFinal = '';

    caminhos.forEach((caminho) => {
      if (caminho !== ROTA_COMPLEMENTO.indexModulo)
        caminhoFinal += caminho + SEPARADOR_URL;
    });

    caminhoFinal = StringHelper.removerUltimosCaracter(caminhoFinal);
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
}

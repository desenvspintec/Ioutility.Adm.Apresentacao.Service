import { Type } from '@angular/core';
import { IListagemCrudItemPeronsalizadoComponent } from '../cn-listagem-crud/cn-listagem-crud-item-peronsalizado/i-listagem-crud-item-peronsalizado-component';
import { ICrudService } from './../../interfaces/i-crud-service';
import { CnItemListagemExibicao } from './cn-item-listagem-exibicao';
import { CnListagemExibicaoBtnOpcao } from './cn-listagem-exibicao-btn-opcao';

export enum ETipoExibicaoListagem {
  TabelaPadrao,
  ComponentePersonalizado
}
export class CnListagemExibicaoModel {
  componenteExibicaoPersonalizado?: Type<IListagemCrudItemPeronsalizadoComponent>;

  constructor(public service: ICrudService,
     public btnsOpcao: CnListagemExibicaoBtnOpcao[], public parametrosParaDelegates: any,public itens: CnItemListagemExibicao[], public componenteSubListagemCrud?: any) { }

  get tipoExibicao(): ETipoExibicaoListagem {
    if (this.componenteExibicaoPersonalizado)
      return ETipoExibicaoListagem.ComponentePersonalizado;
    return ETipoExibicaoListagem.TabelaPadrao;
  }

  setarComponenteExibicaoPersonalizado(componente: any): void {
    this.componenteExibicaoPersonalizado = componente;
  }
}

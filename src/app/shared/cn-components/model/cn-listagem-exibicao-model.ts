import { ICrudService } from './../../interfaces/i-crud-service';
import { CnItemListagemExibicao } from './cn-item-listagem-exibicao';
import { CnListagemExibicaoBtnOpcao } from './cn-listagem-exibicao-btn-opcao';

export class CnListagemExibicaoModel {
  constructor(public service: ICrudService,
     public btnsOpcao: CnListagemExibicaoBtnOpcao[], public parametrosParaDelegates: any,public itens: CnItemListagemExibicao[], public componenteSubListagemCrud?: any) { }
}

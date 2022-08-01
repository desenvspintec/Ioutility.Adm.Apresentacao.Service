export class CnItemListagemExibicao {
  constructor(public propriedade: string, public label: string, public definirCssDelegate?: (itemListagem: any) => string){}
  get possuiDelegateParaDefinirCss() {
    return this.definirCssDelegate !== undefined;
  }
}



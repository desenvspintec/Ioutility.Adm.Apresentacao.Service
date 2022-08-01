
export class CnListagemExibicaoBtnOpcao {
  constructor(public label: string, public acaoDelegate: (id: string, params: any) => void, public icone?: string) { }
}

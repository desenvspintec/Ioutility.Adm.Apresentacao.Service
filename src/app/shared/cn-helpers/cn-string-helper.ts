export class StringHelper {
  private constructor(){}

  static removerUltimosCaracter(texto: string, quantidadeRemover?: number): string {
    if (!quantidadeRemover) quantidadeRemover = 1;

    const textoPossuiMenosCaracteries = !(texto.length >= quantidadeRemover);
    if (textoPossuiMenosCaracteries) return texto;

    const textoResultado = texto.substring(0, texto.length - quantidadeRemover);
    return textoResultado;
  }

  static converterListaEmString(lista: string[], separador = ',,'): string {
    let valor = '';
    lista.forEach(item => valor += item + separador);
    valor = StringHelper.removerUltimosCaracter(valor, separador.length);
    return valor;
  }
  static converterStringEmLista(valor: string, separador = ',,'): string[] {
    return valor.split(separador);
  }
}

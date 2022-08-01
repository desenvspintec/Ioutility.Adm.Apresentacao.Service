import { ETipoInput } from './../cn-components/control-value-accessor/models/cn-input-cva.model';
export class CnHelper {

  static consoleLogado = false;
  static estaNuloVazioOuUndefined(valor: any, modoDebug = false): boolean {
    const estaNulo = valor === null;
    const estaUndefined = valor === undefined;

    const listaVazia = valor === [] || valor?.length === 0;
    const objetoVazio = !estaUndefined && !estaNulo && Object.keys(valor).length === 0 && Object.assign(valor).length === 0;
    const textoVazio = valor === '';

    if (modoDebug)
    {
      console.log('----------------------------------------------------');
      console.log('valor: ');
      console.log(valor);
      console.log('valores ao utilizar metodo EstaNuloVazioOuUndefined:');
      console.log('estaNulo: ' + estaNulo);
      console.log('estaUndefined: ' + estaUndefined);
      console.log('listaVazia: ' + listaVazia);
      console.log('objetoVazio: ' + objetoVazio);
      console.log('textoVazio: ' + textoVazio);
      console.log('----------------------------------------------------');
      this.consoleLogado = true;
    }
    return estaNulo || estaUndefined || listaVazia || objetoVazio || textoVazio;
  }

  static formatarParaBusca(texto: string): string {
    return this.removerAcentos(texto).toLowerCase();
  }

  static removerAcentos(texto: string ): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }
  static converterValorApiParaValorFormControl(valorApi: string, valorControl: string, tipo: ETipoInput): any {
    if (tipo === ETipoInput.data, valorApi.length > 0) {
      const data = valorApi.split(' ')[0];
      const hora = valorApi.split(' ')[1];

      const dia = data.split('/')[0];
      const mes = data.split('/')[1];
      const ano = data.split('/')[2];

      valorApi = `${ano}-${mes}-${dia}`;

      const valorControlPossuiHora = !CnHelper.estaNuloVazioOuUndefined(valorControl.split('T')[1]);
      if (valorControlPossuiHora)
        valorApi += `T${hora}`;
    }

    return valorApi;
  }
}

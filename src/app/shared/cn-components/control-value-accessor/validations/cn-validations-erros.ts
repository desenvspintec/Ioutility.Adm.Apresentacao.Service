import { CnValidationErro } from './i-cn-validation-erro';
import { CnMensagemErroHelper } from './../../../cn-helpers/cn-mensagem-erro-helper';

// para criar validadores, basta implementar a regra de negocio aqui e na constante CN_VALIDATIONS

export class CnValidationsErros  {
  private readonly mensagemErro = new CnMensagemErroHelper();

  cpf = new CnValidationErro('cpfinvalido', this.mensagemErro.cpfInvalido());
  cnpj = new CnValidationErro('cnpjinvalido', this.mensagemErro.cnpjInvalido());
}

import { CnValidationsErros } from './cn-validations-erros';
import { DocumentosValidation } from './documentos.validation';

// para criar validadores, basta implementar a regra de negocio aqui e na classe CnValidationsErros

export const CN_VALIDATIONS = {
  mensagens: new CnValidationsErros(),
  documentos: {
    cpf: DocumentosValidation.ValidarCpf(),
    cnpj: DocumentosValidation.ValidarCpnj()
  }
}

import { CnFormHelper } from 'src/app/shared/cn-helpers/cn-form-helper';
import { CnValidationErro } from './i-cn-validation-erro';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CnValidationsErros } from './cn-validations-erros';

const VALIDATIONS_ERROS = new CnValidationsErros();

export class DocumentosValidation {
  static ValidarCpnj() {
    return (cnpjControl: AbstractControl): ValidationErrors | null => {
      const estaNulo = cnpjControl.hasError('required');
      if (estaNulo) return null;

      let cnpj = cnpjControl.value;
      if (DocumentosValidation._cnpjValidation(cnpj)) return null;
      return CnFormHelper.obterErroValidacao(VALIDATIONS_ERROS.cnpj);
    };
  }

  // codigo utilizado como base de:
  // https://gist.github.com/alexbruno/6623b5afa847f891de9cb6f704d86d02
  private static _cnpjValidation(value: string): boolean {
    if (!value) return false

    // Aceita receber o valor como string, número ou array com todos os dígitos
    const isString = typeof value === 'string'
    const validTypes = isString || Number.isInteger(value) || Array.isArray(value)

    // Elimina valor em formato inválido
    if (!validTypes) return false

    // Filtro inicial para entradas do tipo string
    if (isString) {
      // Limita ao máximo de 18 caracteres, para CNPJ formatado
      if (value.length > 18) return false

      // Teste Regex para veificar se é uma string apenas dígitos válida
      const digitsOnly = /^\d{14}$/.test(value)
      // Teste Regex para verificar se é uma string formatada válida
      const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value)

      // Se o formato é válido, usa um truque para seguir o fluxo da validação
      if (digitsOnly || validFormat) true
      // Se não, retorna inválido
      else return false
    }

    // Guarda um array com todos os dígitos do valor
    const match = value.toString().match(/\d/g)
    const numbers = Array.isArray(match) ? match.map(Number) : []

    // Valida a quantidade de dígitos
    if (numbers.length !== 14) return false

    // Elimina inválidos com todos os dígitos iguais
    const items = [...new Set(numbers)]
    if (items.length === 1) return false

    // Cálculo validador
    const calc = (x: any) => {
      const slice = numbers.slice(0, x)
      let factor = x - 7
      let sum = 0

      for (let i = x; i >= 1; i--) {
        const n = slice[x - i]
        sum += n * factor--
        if (factor < 2) factor = 9
      }

      const result = 11 - (sum % 11)

      return result > 9 ? 0 : result
    }

    // Separa os 2 últimos dígitos de verificadores
    const digits = numbers.slice(12)

    // Valida 1o. dígito verificador
    const digit0 = calc(12)
    if (digit0 !== digits[0]) return false

    // Valida 2o. dígito verificador
    const digit1 = calc(13)
    return digit1 === digits[1]
  }
  static ValidarCpf(): ValidatorFn {
    return (cpfControl: AbstractControl): ValidationErrors | null => {
      const estaNulo = cpfControl.hasError('required');
      if (estaNulo) {
        return null;
      }
      let cpf = cpfControl.value;
      if (DocumentosValidation._cpfEstaValido(cpf)) return null;
      return CnFormHelper.obterErroValidacao(VALIDATIONS_ERROS.cpf);
    };
  }

  private static _cpfEstaValido(cpf: string): boolean {
    cpf = cpf.replace(/[\s.-]*/gim, '');
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    ) {
      return false;
    }
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);

    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
  }
}

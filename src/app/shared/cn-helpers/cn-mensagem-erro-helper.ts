export class CnMensagemErroHelper  {
  cpfInvalido(): string { return 'CPF não esta valido'}
  cnpjInvalido(): string { return 'CNPJ não esta valido'}
  required(): string { return 'obrigatório'; }
  email(): string { return 'deve conter um e-mail válido'; }
  minLength(quantidade: number): string { return `deve conter no minimo ${quantidade} caracteres`; }
  maxLength(quantidade: number): string { return `deve conter no máximo ${quantidade} caracteres`; }

  erroNaoTratado(): string  {
    return 'Não foi possivel processar esta solicitação. Entre em contato com o suporte SGI. Mais informações estão presentes no console de log';
  }
}

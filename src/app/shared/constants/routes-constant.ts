export const ROTA_MODULO = {
  paciente: 'paciente'
  , config: 'config'
  , setor: 'setor'
  , fornecedor: 'fornecedor'
  , dentista: 'dentista'
  , colaborador: 'colaborador'
  , dentistaFerias: 'dentistaFerias'
  , dentistaContrato: 'dentistaContrato'
  , produto: 'produto'
  , franquia: 'franquia'
  , procedimento: 'procedimento'
  , tipoProcedimento: 'tipo-procedimento'
}
export const ROTA_COMPLEMENTO = {
  indexModulo: 'index',
  registrar: 'registrar',
  atualizar: 'atualizar',
  preCadastro: 'pre-cadastro',
  cadastroCompleto: 'cadastro-completo',
  folhaDePagamento: 'folha-de-pagamento',
  ferias: 'ferias',
  contrato: 'contrato',
  termoDistrato: 'termo-de-distrato',
  registroFalta: 'registro-de-faltas',
}
class RotaParametro {
  constructor(public nomeParametro: string) {}
  get valorParaRota(): string { return ':' +this.nomeParametro;}
}
export const ROTA_PARAMETRO = {
  id: new RotaParametro('id'),
}

export const SEPARADOR_URL = '/';

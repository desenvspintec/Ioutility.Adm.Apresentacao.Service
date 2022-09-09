import { IEntity } from 'src/app/shared/models/entity';
export enum EMesesDoAno {
  Janeiro = 1,
  Fevereiro = 2,
  Marco = 3,
  Abril = 4,
  Maio = 5,
  Junho = 6,
  Julho = 7,
  Agosto = 8,
  Setembro = 9,
  Outubro = 10,
  Novembro = 11,
  Dezembro = 12,
}

export enum ETipoStatusDentista {
  Ativo,
  Inativo,
  EmFerias
}

export enum ETipoStatusDentistaFerias {
  Programada,
  Cancelada,
  EmFerias,
  Realizada
}

export enum EChavePix {
  Cpf,
  Cnpj,
  Telefone
}
export enum EEspecialidade {
  clinicoGeral,
  ortodontia,
  endodontia,
  odontoPediatria,
  periodontia,
  implante,
  protese,
  dentistaEstetica,
  esteticaFacial,
}
export interface DentistaEspecialidade extends IEntity {
  dentistaId: string;
  especialidade: EEspecialidade;
}

export interface DentistaStatus extends IEntity {
  status: string
}
export interface DentistaFeriasStatus extends IEntity {
  status: string
}
export interface DentistaIIndicadoresDTO {
  ativos: number,
}
export interface DentistaIContratoDTO extends IEntity {
  textoContrato: string,
}

export interface DentistaIDistratoDTO extends IEntity {
  textoDistrato: string,
}

export interface DentistaFeriasIIndicadoresDTO {
  emFerias: number,
}

export interface DentistaIRegistroFaltasDataEmAnosDTO {
   anos: number,
}

export interface DentistaIFolhaPagamentoIndicadoresDTO {
  valorPagar: number,
  comparativoMesPassado: number
}

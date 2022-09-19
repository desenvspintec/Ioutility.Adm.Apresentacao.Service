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

export enum ETipoStatusFranquia {
  Ativo,
  Inativo,
  EmFerias
}

export enum ETipoStatusFranquiaFerias {
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
  franquiaEstetica,
  esteticaFacial,
}
export interface FranquiaEspecialidade extends IEntity {
  franquiaId: string;
  especialidade: EEspecialidade;
}

export interface FranquiaStatus extends IEntity {
  status: string
}
export interface FranquiaFeriasStatus extends IEntity {
  status: string
}
export interface FranquiaIIndicadoresDTO {
  ativos: number,
}
export interface FranquiaIContratoDTO extends IEntity {
  textoContrato: string,
}

export interface FranquiaIDistratoDTO extends IEntity {
  textoDistrato: string,
}

export interface FranquiaFeriasIIndicadoresDTO {
  emFerias: number,
}

export interface FranquiaIRegistroFaltasDataEmAnosDTO {
  anos: number,
}

export interface FranquiaIFolhaPagamentoIndicadoresDTO {
  valorPagar: number,
  comparativoMesPassado: number
}

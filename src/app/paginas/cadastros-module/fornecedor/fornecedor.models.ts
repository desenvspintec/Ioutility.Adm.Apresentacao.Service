import { IEntity } from 'src/app/shared/models/entity';
export enum ETipoChavePixFornecedor {
  CNPJ,
  Email,
  NumeroCelular,
  ChaveAleatoria
}

export enum ETipoStatusCadastroFornecedor {
  Ativo,
  Inativo,
}

export enum ECentroDeCustoFornecedor {
  AreaA,
  AreaB,
  AreaC,
  AreaD,
  AreaE,
}

export interface IIndicadoresCentroDeCustoDTO {
  areaA: number;
  areaB: number;
  areaC: number;
  areaD: number;
  areaE: number;
}
export interface IIndicadoresDTO {
  ativos: number;
  inativos: number;
}

export interface FornecedorStatus extends IEntity {
  status: string;
}

export interface FornecedorCentroDeCusto extends IEntity {
  centroDeCusto: string;
}

export enum EChavePix {
  Cpf,
  Cnpj,
  Telefone
}

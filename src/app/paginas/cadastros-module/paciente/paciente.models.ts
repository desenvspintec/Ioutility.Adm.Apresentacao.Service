import { IEntity } from './../../../shared/models/entity';
export enum ETipoDocumentoPessoaFisica {
  CertidaoNascimento,
  CPF,
}
export enum ETipoStatusCadastroPaciente {
  Pendente,
  Contratado,
  Cancelado
}
export interface PacienteIIndicadoresDTO {
  pendentes: number,
  contratados: number,
  cancelados: number,
}
export interface PacienteStatus extends IEntity {
  status: string
}

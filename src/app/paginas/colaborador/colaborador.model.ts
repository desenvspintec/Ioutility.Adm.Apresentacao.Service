import { IEntity } from "src/app/shared/models/entity";

export enum ETipoStatusColaborador {
    Ativo,
    Ferias,
    Inativo,
}

export interface ColaboradorStatus extends IEntity {
    status: string
}

export interface ColaboradorIIndicadoresDTO {
    ativos: number,
}
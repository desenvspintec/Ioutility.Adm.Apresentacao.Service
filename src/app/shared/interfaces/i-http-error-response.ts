import { IDomainNotificastion } from './i-domain-notification';

export interface IHttpErrorResponse {
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
  message: string;
  name: string;
  error: any | CnAppError;
}

export interface CnAppError {
  errors: string[];
  errorsDetails: IDomainNotificastion[];
  success: boolean;

}

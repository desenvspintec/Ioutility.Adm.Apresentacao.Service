import { IHttpErrorResponse } from './i-http-error-response';
import { ToastrService } from 'ngx-toastr';

export interface IFormCrudModel {
  onSubmitSuccess(toastrService: ToastrService, result?: any): void;
  onSubmitError(error: IHttpErrorResponse, toastrService: ToastrService): string[];
}

import { environment } from './../../../environments/environment';
export class EnderecoApi {
  static obterApiGeteway(): string {
    let apiGeteway = '';
    if (environment.production)
      apiGeteway = 'http://52.189.17.169/';
    else {
      apiGeteway = 'https://localhost:7232/';
    }
    return apiGeteway;
  }
}

import { environment } from './../../../environments/environment';
export class EnderecoApi {
  static obterApiGeteway(): string {
    let apiGeteway = '';
    if (environment.production)
      apiGeteway = 'http://52.189.17.169/';
    else {
      apiGeteway = 'http://localhost:5022/';
    }
    return apiGeteway;
  }
  static obterApp(): string {
    const app = 'cadastro/api/';
    return this.obterApiGeteway() + app;
  }
}

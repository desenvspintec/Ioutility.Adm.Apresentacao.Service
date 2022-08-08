import { environment } from './../../../environments/environment';
export class EnderecoApi {
  static obterApiGeteway(): string {
    let apiGeteway = '';
    if (environment.production)
      apiGeteway = 'http://localhost:5022/';
    else {
      apiGeteway = 'https://localhost:7232/';
    }
    return apiGeteway;
  }
  static obterApp(): string {
    const app = 'cadastro/api/';
    return this.obterApiGeteway() + app;
  }
}

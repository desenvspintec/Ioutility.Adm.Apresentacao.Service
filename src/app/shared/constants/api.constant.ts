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
  static obterCadastroApp(): string {
    const app = 'cadastro/api/';
    return this.obterApiGeteway() + app;
  }
  static obterFranquiaApp(): string {
    const app = 'franquia/api/';
    return 'http://localhost:5251/' + app;
  }
}

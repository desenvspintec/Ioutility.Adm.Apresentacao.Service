import { EnderecoApi } from './api.constant';
export interface IEnderecoApiServiceModel {
  upload: string
}

export class ApiServicesUrl {
  static get(incluirCaminhoApi = true): IEnderecoApiServiceModel {
    const caminhoComplementaParaApi = incluirCaminhoApi ? 'api/' : '';
    return {
      upload: EnderecoApi.obterApiGeteway() + 'storage/' + caminhoComplementaParaApi
    };
  }
}

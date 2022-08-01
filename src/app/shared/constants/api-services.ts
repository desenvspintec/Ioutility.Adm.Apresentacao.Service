// export interface IEnderecoApiServiceModel {
//   upload: string
// }

export interface EnderecoApiService {
  upload: string;
}

export class ApiServicesUrl {
  static get(incluirCaminhoApi = true): EnderecoApiService {
    const caminhoComplementaParaApi = incluirCaminhoApi ? 'api/' : '';
    return {
      upload: 'https://localhost:7041/' + caminhoComplementaParaApi
    };
  }
}

import { CnHelper } from "src/app/shared/cn-helpers/cn-helper";
import { CnControlValueAccessorModelBase } from "../../model/cn-control-value-accessor-model-base.model";

export interface EnderecoConsultadoViaCep {
	cep: string;
	logradouro: string;
	complemento: string;
	bairro: string;
	localidade: string;
	uf: string;
	ibge: string;
	gia: string;
	ddd: string;
	siafi: string;
}

export interface ErroEnderecoConsultadoViaCep {
	erro: boolean;
}

export class UF {
	constructor (public nome: string, public sigla: string){}

  get nomePesquisavel(): string {
    return CnHelper.formatarParaBusca(this.nome);
  }
}
export interface EnderecoEstado {
	sigla: string;
	nome: string;
	cidades: string[];
}

export class CnEnderecoCvaModel extends CnControlValueAccessorModelBase {
  constructor(name: string, label: string, required: boolean, public possuiCampoComprovante: boolean, placeholder = '') {
    super(name, label, required, placeholder);
  }

}

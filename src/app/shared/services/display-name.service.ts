import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { EnderecoApi } from '../constants/api.constant';
import { DisplayName } from '../models/display-name';
import { IDisplayNameItem } from '../models/display-name-item';

@Injectable({
  providedIn: 'root'
})
export class DisplayNameService {

  private readonly baseUrl = EnderecoApi.obterApiGeteway() + 'displayname';
  carregado = false;
  private displayNamesOriginal: DisplayName[] = [];
  public displayNames: DisplayName[] = [];
  itens?: IDisplayNameItem;
  private _aoCarregarDisplayNames: Subject<IDisplayNameItem>;
  get aoCarregarDisplayNames(): Observable<IDisplayNameItem> { return this._aoCarregarDisplayNames.asObservable(); }

  constructor(httpClient: HttpClient) {
    this._aoCarregarDisplayNames = new Subject();
    httpClient.get<DisplayName[]>(this.baseUrl).subscribe(result =>{
      this.displayNamesOriginal = result;
      this._addDisplayComPrimeiraLetraMinuscula();
      this.setarItens();
      this.carregado = true;
      setTimeout(() => {
        this._aoCarregarDisplayNames.next(this.itens!);

      }, 100);
    });
  }

  obterValorDisplayName(propriedade: string): string {
    var displayname = this.displayNames.find(dn => dn.nomePropriedade.toLowerCase() === propriedade.toLowerCase());
    if (displayname === undefined) return '';

    return displayname.valorDisplay;
  }

  obterDisplayName(propriedade: string): DisplayName {
    var displayname = this.displayNames.find(dn => dn.nomePropriedade.toLowerCase() === propriedade.toLowerCase());
    if (displayname === undefined) return  new DisplayName('', '');

    return displayname;
  }

  private _addDisplayComPrimeiraLetraMinuscula(): void {
    this.displayNamesOriginal.forEach(displayName => {
      try {
        const primeiroCaracter = displayName.nomePropriedade.substring(0, 1).toLowerCase();
        const restanteString =  displayName.nomePropriedade.length > 1 ? displayName.nomePropriedade.substring(1, displayName.nomePropriedade.length) : '';
        const nomePropriedadeNomeMinusculo = primeiroCaracter + restanteString;

        let displayNameCorreto = new DisplayName(nomePropriedadeNomeMinusculo, displayName.valorDisplay);
        this.displayNames.push(displayNameCorreto);
      }catch (erro) {
        console.log('Não foi possivel criar display name com letra minuscula. Display name:');
        console.log(displayName);
        console.log('erro');
        console.log(erro);
      }

    });
  }
  private setarItens(): void {
    this.itens = {
      nome: this.obterDisplayName('nome'),
      nomeCompleto: this.obterDisplayName('nome'),
      status: this.obterDisplayName('status'),
      pacienteStatus: this.obterDisplayName('pacienteStatus'),
      cpf: this.obterDisplayName('cpf'),
      cnpj: this.obterDisplayName('cnpj'),
      cro: this.obterDisplayName('cro'),
      nascimento: this.obterDisplayName('nascimento'),
      email: this.obterDisplayName('email'),
      telefone: this.obterDisplayName('telefone'),
      cep: this.obterDisplayName('cep'),
      bairro: this.obterDisplayName('bairro'),
      estado: this.obterDisplayName('estado'),
      numero: this.obterDisplayName('numero'),
      logradouro: this.obterDisplayName('logradouro'),
      uf: this.obterDisplayName('uf'),
      endereco: this.obterDisplayName('endereco'),
      bancoId: this.obterDisplayName('bancoId'),
      agencia: this.obterDisplayName('agencia'),
      conta: this.obterDisplayName('conta'),
      tipoChavePix: this.obterDisplayName('tipoChavePix'),
      chavePix: this.obterDisplayName('chavePix'),
      salarioBrutoMensal: this.obterDisplayName('salarioBrutoMensal'),
      diasQueAtende: this.obterDisplayName('diasQueAtende'),
      especialidades: this.obterDisplayName('especialidades'),
      anexoCpf: this.obterDisplayName('anexoCpf'),
      anexoCRO: this.obterDisplayName('anexoCRO'),
      razaoSocial: this.obterDisplayName('razaoSocial'),
      celularWhatsApp: this.obterDisplayName('celularWhatsApp'),
      dentistaStatus: this.obterDisplayName('dentistaStatus'),
      fornecedorStatus: this.obterDisplayName('fornecedorStatus'),
      centroDeCusto: this.obterDisplayName('centroDeCusto'),
      colaboradorStatus: this.obterDisplayName('colaboradorStatus'),
      unidade: this.obterDisplayName('unidade'),
      rg: this.obterDisplayName('rg'),
      anexoRg: this.obterDisplayName('anexoRg'),
      perfilDeAcesso: this.obterDisplayName('perfilDeAcesso'),
      quantidadeDias: this.obterDisplayName('quantidadeDias'),
      dataInicio: this.obterDisplayName('dataInicio'),
      dataFim: this.obterDisplayName('dataFim'),
      feriasStatus: this.obterDisplayName('feriasStatus'),
      contrato: this.obterDisplayName('textoContrato'),
      distrato: this.obterDisplayName('textoDistrato'),
      quantidadEmEstoque: this.obterDisplayName('quantidadeEstoque'),
      dataFalta: this.obterDisplayName('dataFalta'),
      horarioInicio: this.obterDisplayName('horarioInicio'),
      horarioFim: this.obterDisplayName('horarioFim'),
      ausenteDiaTodo: this.obterDisplayName('ausenteDiaTodo'),
      quantidadeFaltas: this.obterDisplayName('quantidadeFaltas'),
      unidadeQueAtende: this.obterDisplayName('unidadeQueAtende'),
      agenciaConta: this.obterDisplayName('agenciaConta'),
    };
  }
}

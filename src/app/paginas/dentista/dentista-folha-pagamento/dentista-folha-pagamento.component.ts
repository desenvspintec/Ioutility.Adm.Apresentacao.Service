import { CnListagemExibicaoModel } from 'src/app/shared/cn-components/model/cn-listagem-exibicao-model';
import { CnItemListagemExibicao } from 'src/app/shared/cn-components/model/cn-item-listagem-exibicao';
import { ANIMAR_ENTRADA } from 'src/app/shared/constants/animacoes.constant';
import { Component, OnInit } from '@angular/core';
import { CnSubmenu } from 'src/app/shared/cn-components/model/cn-submenu';
import { DisplayNameService } from 'src/app/shared/services/display-name.service';

import { ITENS_DENTISTA_SUBMENU } from '../dentista.constant';
import { CnPesquisaModel } from 'src/app/shared/cn-components/cn-pesquisa/cn-pesquisa.model';
import { IDisplayNameItem } from 'src/app/shared/models/display-name-item';
import { DentistaService } from '../dentista.service';
import { CONTROL_NAME_ID } from 'src/app/shared/constants/forms-contante';
import { CnInputCvaModel, OpcaoCombobox } from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { TAMANHO_RESPONSIVO_2, TAMANHO_RESPONSIVO_3 } from 'src/app/shared/constants/css-class-tamanhos';
import { EMesesDoAno } from '../dentista.model';
import { EntityBasica } from 'src/app/shared/models/entity-basica';
import { CnHelper } from 'src/app/shared/cn-helpers/cn-helper';
import { FolhaPagamentoPacientesComponent } from './folha-pagamento-pacientes/folha-pagamento-pacientes.component';

@Component({
  selector: 'app-dentista-folha-pagamento',
  templateUrl: './dentista-folha-pagamento.component.html',
  styleUrls: ['./dentista-folha-pagamento.component.scss'],
  animations: ANIMAR_ENTRADA
})
export class DentistaFolhaPagamentoComponent implements OnInit {
  private _tabelaAberta: boolean = true;
  formModelPesquisa: CnPesquisaModel;
  private _displayName: IDisplayNameItem;
  comboboxAnos?: OpcaoCombobox[];
  anosCarregados = false;
  entitysPesquisadas: EntityBasica[] = [];
  ocorreuErroAoPesquisar = false;
  modelListagemExibicao: CnListagemExibicaoModel;

  constructor(private _displayNameService: DisplayNameService
    , private _dentistaService: DentistaService) {;
    this._displayName = _displayNameService.itens!;
    this.formModelPesquisa = this._camposDePesquisa();
    this.modelListagemExibicao = new CnListagemExibicaoModel(this._dentistaService, [], "", this._gerarItensListagem(), FolhaPagamentoPacientesComponent);
  }
  ngOnInit(): void {
  }

  exibirTabela(): void {
    this._tabelaAberta = !this._tabelaAberta;
  }

  itensSubmenu(): CnSubmenu[] {
    return ITENS_DENTISTA_SUBMENU;
  }

  acionarPesquisa() {
    this.formModelPesquisa?.pesquisar();
  }

  setarEntitysPesquisadas(resultado: EntityBasica[]): void {
    this.ocorreuErroAoPesquisar = false;
    this.entitysPesquisadas = resultado;
  }

  setarErroAoPesquisa(): void {
    this.ocorreuErroAoPesquisar = true;
  }

  haEntitys(): boolean {
    const possuiEntitys = !CnHelper.estaNuloVazioOuUndefined(this.entitysPesquisadas);
    return possuiEntitys;
  }

  obterEntitys(): EntityBasica[] {
    return this.entitysPesquisadas;
  }

  private _gerarItensListagem = (): CnItemListagemExibicao[] => {
    return [
      new CnItemListagemExibicao(this._displayName.nome.nomePropriedade, this._displayName.nome.valorDisplay),
      new CnItemListagemExibicao(this._displayName.unidadeQueAtende.nomePropriedade, this._displayName.unidadeQueAtende.valorDisplay),
      new CnItemListagemExibicao(this._displayName.cro.nomePropriedade, this._displayName.cro.valorDisplay),
      new CnItemListagemExibicao(this._displayName.especialidades.nomePropriedadeTxt(), this._displayName.especialidades.valorDisplay),
      new CnItemListagemExibicao(this._displayName.salarioBrutoMensal.nomePropriedadeTxt(), this._displayName.salarioBrutoMensal.valorDisplay),
      new CnItemListagemExibicao('salarioLiquidoMensalTxt', 'Salário líquido a receber'),
      new CnItemListagemExibicao(this._displayName.cpf.nomePropriedadeTxt(), this._displayName.cpf.valorDisplay),
      new CnItemListagemExibicao(this._displayName.cnpj.nomePropriedadeTxt(), this._displayName.cnpj.valorDisplay),
      new CnItemListagemExibicao('bancoNome', this._displayName.bancoId.valorDisplay),
      new CnItemListagemExibicao(this._displayName.agenciaConta.nomePropriedade, this._displayName.agenciaConta.valorDisplay),
      new CnItemListagemExibicao(this._displayName.chavePix.nomePropriedadeTxt(), this._displayName.chavePix.valorDisplay),
    ]
  }

  private _camposDePesquisa(): CnPesquisaModel {
    return CnPesquisaModel.ObterPesquisaModel(this._dentistaService.buscarFolhaPagamento, [
      CnInputCvaModel.obterHiddenGuid(CONTROL_NAME_ID),
      CnInputCvaModel.obterTextoSimples(this._displayName.nome.nomePropriedade, 'Pesquisar', false, 200, 0).setarClassTamanho(TAMANHO_RESPONSIVO_3),
      CnInputCvaModel.obterCombobox('dataEmMeses', 'Mês', false, [{ id: '', nome: 'Todos' }, ...this.obterOpcoesCampoMesesDoAnoFolhaPagamento()]).setarClassTamanho(TAMANHO_RESPONSIVO_2),
      CnInputCvaModel.obterCombobox('dataEmAnos', 'Ano', false, this.comboboxAnos!).setarClassTamanho(TAMANHO_RESPONSIVO_2),
    ]);
  }

  obterOpcoesCampoMesesDoAnoFolhaPagamento(): OpcaoCombobox[] {
    return [
      new OpcaoCombobox(EMesesDoAno.Janeiro, 'Janeiro'),
      new OpcaoCombobox(EMesesDoAno.Fevereiro, 'Fevereiro'),
      new OpcaoCombobox(EMesesDoAno.Marco, 'Março'),
      new OpcaoCombobox(EMesesDoAno.Abril, 'Abril'),
      new OpcaoCombobox(EMesesDoAno.Maio, 'Maio'),
      new OpcaoCombobox(EMesesDoAno.Junho, 'Junho'),
      new OpcaoCombobox(EMesesDoAno.Julho, 'Julho'),
      new OpcaoCombobox(EMesesDoAno.Agosto, 'Agosto'),
      new OpcaoCombobox(EMesesDoAno.Setembro, 'Setembro'),
      new OpcaoCombobox(EMesesDoAno.Outubro, 'Outubro'),
      new OpcaoCombobox(EMesesDoAno.Novembro, 'Novembro'),
      new OpcaoCombobox(EMesesDoAno.Dezembro, 'Dezembro'),
    ];
  }
}

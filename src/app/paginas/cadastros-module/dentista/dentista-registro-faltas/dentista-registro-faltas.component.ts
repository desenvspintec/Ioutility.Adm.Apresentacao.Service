import { IDENTIFICADOR_DE_PESQUISA_DENTISTA } from './../dentista.constant';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CnPesquisaModel } from 'src/app/shared/cn-components/cn-pesquisa/cn-pesquisa.model';
import {
  CnInputCvaModel,
  OpcaoCombobox,
} from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { CnBtnModel } from 'src/app/shared/cn-components/model/cn-btn-model';
import { CnItemListagemExibicao } from 'src/app/shared/cn-components/model/cn-item-listagem-exibicao';
import { CnListagemExibicaoModel } from 'src/app/shared/cn-components/model/cn-listagem-exibicao-model';
import { CnSubmenu } from 'src/app/shared/cn-components/model/cn-submenu';
import { CnHelper } from 'src/app/shared/cn-helpers/cn-helper';
import { ANIMAR_ENTRADA } from 'src/app/shared/constants/animacoes.constant';
import { TAMANHO_RESPONSIVO_3 } from 'src/app/shared/constants/css-class-tamanhos';
import { IDisplayNameItem } from 'src/app/shared/models/display-name-item';
import { EntityBasica } from 'src/app/shared/models/entity-basica';
import { DisplayNameService } from 'src/app/shared/services/display-name.service';

import { ITENS_DENTISTA_SUBMENU } from '../dentista.constant';
import { TAMANHO_RESPONSIVO_2 } from './../../../../shared/constants/css-class-tamanhos';
import { CONTROL_NAME_ID } from './../../../../shared/constants/forms-contante';
import {
  DentistaIRegistroFaltasDataEmAnosDTO,
  EMesesDoAno,
} from './../dentista.model';
import { DentistaService } from './../dentista.service';
import { AdicionarFaltaFormComponent } from './adicionar-falta-form/adicionar-falta-form.component';
import { DentistaDetalhesFaltaComponent } from './dentista-detalhes-falta/dentista-detalhes-falta.component';
import { DentistaRegistroFaltaService } from './dentista-registro-falta.service';

@Component({
  selector: 'app-dentista-registro-faltas',
  templateUrl: './dentista-registro-faltas.component.html',
  styleUrls: ['./dentista-registro-faltas.component.scss'],
  animations: ANIMAR_ENTRADA,
})
export class DentistaRegistroFaltasComponent implements OnInit {
  formModelPesquisa: CnPesquisaModel;
  listaDeAnosCadastrados?: DentistaIRegistroFaltasDataEmAnosDTO;
  anosCarregados = false;
  modalFechou = new EventEmitter();
  btnEnviar: CnBtnModel;
  displayName: IDisplayNameItem;
  modelListagemExibicao: CnListagemExibicaoModel;
  entitysPesquisadas: EntityBasica[] = [];
  ocorreuErroAoPesquisar = false;
  private _tabelaAberta: boolean = true;

  constructor(
    private _matDialog: MatDialog,
    private _registroFaltaService: DentistaRegistroFaltaService,
    private _displayNameService: DisplayNameService,
    private _dentistaService: DentistaService
  ) {
    this.displayName = _displayNameService.itens!;
    this.btnEnviar = CnBtnModel.obterBtnRegistrarPorLink();
    this.formModelPesquisa = this._camposDePesquisa();
    this.modelListagemExibicao = new CnListagemExibicaoModel(
      this._dentistaService,
      [],
      '',
      this._gerarItensListagem(),
      DentistaDetalhesFaltaComponent
    );
  }
  ngOnInit(): void {
  }

  exibirTabela(): void {
    this._tabelaAberta = !this._tabelaAberta;
  }

  public get tabelaAberta(): boolean {
    return this._tabelaAberta;
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

  obterEntitys(): EntityBasica[] {
    return this.entitysPesquisadas;
  }

  haEntitys(): boolean {
    const possuiEntitys = !CnHelper.estaNuloVazioOuUndefined(
      this.entitysPesquisadas
    );
    return possuiEntitys;
  }

  setarErroAoPesquisa(): void {
    this.ocorreuErroAoPesquisar = true;
  }

  private _gerarItensListagem = (): CnItemListagemExibicao[] => {
    return [
      new CnItemListagemExibicao(this.displayName.nome.nomePropriedade, this.displayName.nome.valorDisplay),
      new CnItemListagemExibicao(this.displayName.unidadeQueAtende.nomePropriedade, this.displayName.unidadeQueAtende.valorDisplay),
      new CnItemListagemExibicao(this.displayName.quantidadeFaltas.nomePropriedade, this.displayName.quantidadeFaltas.valorDisplay),
    ];
  };

  private _camposDePesquisa(): CnPesquisaModel {
   return CnPesquisaModel.ObterPesquisaModel(
      this._dentistaService.buscarFalta,
      [
        CnInputCvaModel.obterHiddenGuid(CONTROL_NAME_ID),
        CnInputCvaModel.obterTextoSimples(
          this.displayName.nome.nomePropriedade,
          'Pesquisar',
          false,
          200,
          0
        ).setarClassTamanho(TAMANHO_RESPONSIVO_3),
        CnInputCvaModel.obterCombobox('dataEmMeses', 'Mês', false, [
          { id: '', nome: 'Todos' },
          ...this.obterOpcoesCampoMesesDoAnoRegistroFalta(),
        ]).setarClassTamanho(TAMANHO_RESPONSIVO_2),
        CnInputCvaModel.obterCombobox(
          'dataEmAnos',
          'Ano',
          false,
          this.obterOpcoesCampoAnoDoRegistroFalta()
        ).setarClassTamanho(TAMANHO_RESPONSIVO_2),
      ],
      IDENTIFICADOR_DE_PESQUISA_DENTISTA
    );
  }

  obterOpcoesCampoAnoDoRegistroFalta(): OpcaoCombobox[] {
    let comboboxAnos: OpcaoCombobox[] = [new OpcaoCombobox('', 'Todos')];
    this._registroFaltaService.buscarDataEmAnos().subscribe({
      next: (resultado) => {
        for (let index = 0; index < resultado.anosCadastrados.length; index++) {
          const ano = resultado.anosCadastrados[index];
          comboboxAnos.push(new OpcaoCombobox(ano, ano + ''));
        }
        this.anosCarregados = true;
        setTimeout(() => {
          this.anosCarregados = true;
        }, 100);
      },
    });
    return comboboxAnos;
  }

  obterOpcoesCampoMesesDoAnoRegistroFalta(): OpcaoCombobox[] {
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

  abrirModal() {
    const modalAberto = this._matDialog.open(AdicionarFaltaFormComponent, {
      maxHeight: '600px',
      minWidth: '150px',
      maxWidth: '1024px',
      data: {
        formModel: this.btnEnviar?.formModel,
      },
    });
    modalAberto.afterClosed().subscribe((finalizou) => {
      if (finalizou) {
        this.modalFechou.emit();
        location.reload();
      }
    });
  }
}

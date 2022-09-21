import { CnListagemPersonalizadaDirective } from './cn-listagem-personalizada.directive';
import { Component, HostListener, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { CnItemListagemExibicao } from '../model/cn-item-listagem-exibicao';
import { CnListagemExibicaoBtnOpcao } from '../model/cn-listagem-exibicao-btn-opcao';
import { ANIMAR_ENTRADA } from './../../constants/animacoes.constant';
import { CnListagemExibicaoModel, ETipoExibicaoListagem } from './../model/cn-listagem-exibicao-model';

@Component({
  selector: 'app-cn-listagem-crud',
  templateUrl: './cn-listagem-crud.component.html',
  styleUrls: ['./cn-listagem-crud.component.scss'],
  animations: ANIMAR_ENTRADA
})
export class CnListagemCrudComponent implements OnInit{

  @Input() model!: CnListagemExibicaoModel;
  @Input() itens: any[] = [];
  readonly classBtnAbrirMenu = 'class-abrir-menu-';
  readonly prefixoIdItemOpcao = 'opcao-listagem-';
  readonly prefixoIdBtnAbrirItemOpcao = 'btn-abrir-opcao-listagem-';
  readonly IdMenuFechado = 999;
  readonly IdTabelaFechada = 999;
  menuAberto = this.IdMenuFechado;
  readonly prefixoIdBtnAbrirMenuDetalhes = 'btn-abrir-menu-detalhes-listagem-';
  readonly classBtnAbrirDetalhes = 'class-abrir-detalhes-';
  readonly iconeBotaoTabelaFechada = 'add_circle_outline';
  readonly iconeBotaoTabelaAberta = 'remove_circle_outline';
  tabelaAberta = this.IdTabelaFechada;
  arrayEsp: any[] = [];


  ngOnInit(): void {
  }



  utilizaListagemPersonalizada(): boolean {
    return this.model.tipoExibicao === ETipoExibicaoListagem.ComponentePersonalizado;
  }

  utilizaListagemPadrao(): boolean {
    return this.model.tipoExibicao === ETipoExibicaoListagem.TabelaPadrao;
  }

  exibirIconeBotaoTabela(numeroTabela: number): boolean {
    return numeroTabela === this.tabelaAberta;
  }

  abrirTabela(numeroTabela: number): void {
    if(this.tabelaAberta === numeroTabela){
      this._fecharTabela();
    } else {
      this.tabelaAberta = numeroTabela;
    }
  }

  private _fecharTabela(): void{
    return this.abrirTabela(this.IdTabelaFechada);
  }

  podeExibirTabela(numeroTabela: number): boolean {
    return numeroTabela === this.tabelaAberta;
  }

  abrirMenu(chave: number): void {
    this.menuAberto = chave;
  }

  podeExibirMenu(chave: number): boolean {
    return this.menuAberto == chave;
  }

  // evento acionado ao clicar em qualquer parte do documento
  @HostListener('document:click', ['$event.target'])
  public onClick(target: any): void {
    if (!this._haMenuAberto()) return;

    const idElementoClicado = target.id;
    const classElementoClicado = target.className;

    const clicouNoPorprioMenu = this._idMenuAberto() === idElementoClicado;
    const clicouParaAbrirOutroMenu = classElementoClicado.includes(this._classMenuAberto());

    if (clicouNoPorprioMenu) return;
    if (clicouParaAbrirOutroMenu) return;

    this._fecharMenu();
  }

  private _fecharMenu(): void {
    this.abrirMenu(this.IdMenuFechado);
  }
  private _haMenuAberto(): boolean {
    const menuEstaAberto = this.menuAberto !== this.IdMenuFechado;
    return menuEstaAberto;
  }
  private _idMenuAberto(): string {
    return this._gerarItemOpcaoId(this.menuAberto);
  }

  private _classMenuAberto(): string {
    return this._gerarItemOpcaoClass(this.menuAberto);
  }
  private _gerarItemOpcaoClass(id: number): string {
    return  this.classBtnAbrirMenu + id;
  }

  private _gerarItemOpcaoId(id: any): string {
    return this.prefixoIdItemOpcao + id;
  }

  public executarAcaoBtnOpcao(entityId: string, opcao: CnListagemExibicaoBtnOpcao): void {
    opcao.acaoDelegate(entityId, this.model.parametrosParaDelegates);
  }
  obterCssClass(itemListagem: string, listagemExibicaoModel: CnItemListagemExibicao): string {
    if (!listagemExibicaoModel.possuiDelegateParaDefinirCss) return '';
    return listagemExibicaoModel.definirCssDelegate!(itemListagem);
  }
}

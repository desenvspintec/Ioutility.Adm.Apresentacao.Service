import { Component, OnInit } from '@angular/core';
import { CnHelper } from 'src/app/shared/cn-helpers/cn-helper';
import { EntityBasica } from 'src/app/shared/models/entity-basica';

import { CnItemListagemExibicao } from './../../../../shared/cn-components/model/cn-item-listagem-exibicao';
import { CnListagemExibicaoModel } from './../../../../shared/cn-components/model/cn-listagem-exibicao-model';
import { ISublistagemComponent } from './../../../../shared/interfaces/i-sublistagem-component';
import { IDisplayNameItem } from './../../../../shared/models/display-name-item';
import { DisplayNameService } from './../../../../shared/services/display-name.service';
import { DentistaRegistroFaltaService } from './../dentista-registro-falta.service';

@Component({
  selector: 'app-dentista-detalhes-falta',
  templateUrl: './dentista-detalhes-falta.component.html',
  styleUrls: ['./dentista-detalhes-falta.component.scss']
})
export class DentistaDetalhesFaltaComponent implements OnInit, ISublistagemComponent {

  modelDetalhesExibicao: CnListagemExibicaoModel;
  displayName: IDisplayNameItem;
  ocorreuErroAoPesquisar = false;
  inputEntitys: EntityBasica[] = [];
  entityId: string = '';
  mensagemDeAvisoSemResultados: string = "Esse dentista não possui faltas registradas";

  constructor( private _displayNameService: DisplayNameService
    , private _registroFaltaService: DentistaRegistroFaltaService) {
    this.displayName = _displayNameService.itens!;
    this.modelDetalhesExibicao = new CnListagemExibicaoModel(this._registroFaltaService, [], "", this._gerarItensListagem())
  }

  aoIniciar(): void {
    this._registroFaltaService.buscarDetalhesFaltaPorDentistaId(this.entityId).subscribe({
      next: (resultado: any) => {
        this.inputEntitys = resultado;
      }
    });
  }

  ngOnInit(): void {
  }

  obterEntitys(): EntityBasica[] {
    return this.inputEntitys;
  }

  haEntitys(): boolean {
    const possuiEntitys = !CnHelper.estaNuloVazioOuUndefined(this.inputEntitys);
    return possuiEntitys;
  }

  private _gerarItensListagem = (): CnItemListagemExibicao[] => {
    return [
      new CnItemListagemExibicao(this.displayName.dataFalta.nomePropriedadeTxt(), this.displayName.dataFalta.valorDisplay),
      new CnItemListagemExibicao(this.displayName.horarioInicio.nomePropriedadeTxt(), this.displayName.horarioInicio.valorDisplay),
      new CnItemListagemExibicao(this.displayName.horarioFim.nomePropriedadeTxt(), this.displayName.horarioFim.valorDisplay),
      new CnItemListagemExibicao(this.displayName.ausenteDiaTodo.nomePropriedadeTxt(), this.displayName.ausenteDiaTodo.valorDisplay),
    ]
  }

}

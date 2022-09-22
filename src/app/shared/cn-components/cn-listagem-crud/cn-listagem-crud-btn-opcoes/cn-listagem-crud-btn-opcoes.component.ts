import { CnListagemExibicaoModel } from 'src/app/shared/cn-components/model/cn-listagem-exibicao-model';
import { Entity } from './../../../models/entity';
import { Component, Input, OnInit } from '@angular/core';
import { CnListagemExibicaoBtnOpcao } from '../../model/cn-listagem-exibicao-btn-opcao';

@Component({
  selector: 'cn-listagem-crud-btn-opcoes',
  templateUrl: './cn-listagem-crud-btn-opcoes.component.html',
  styleUrls: ['./cn-listagem-crud-btn-opcoes.component.scss']
})
export class CnListagemCrudBtnOpcoesComponent implements OnInit {

  @Input() entity!: Entity
  @Input() model!: CnListagemExibicaoModel;
  @Input() posicao!: number;
  constructor() { }

  ngOnInit(): void {
  }

  public executarAcaoBtnOpcao(entityId: string, opcao: CnListagemExibicaoBtnOpcao): void {
    opcao.acaoDelegate(entityId, this.model.parametrosParaDelegates);
  }

  obterId(): string {
    return 'btn-listagem-opc-' + this.posicao;
  }
}

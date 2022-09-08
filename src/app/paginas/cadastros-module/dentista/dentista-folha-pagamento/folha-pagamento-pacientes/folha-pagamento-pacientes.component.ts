import { DentistaService } from './../../dentista.service';
import { CnListagemExibicaoModel } from 'src/app/shared/cn-components/model/cn-listagem-exibicao-model';
import { IDisplayNameItem } from 'src/app/shared/models/display-name-item';
import { DisplayNameService } from 'src/app/shared/services/display-name.service';
import { ISublistagemComponent } from './../../../../../shared/interfaces/i-sublistagem-component';
import { Component, OnInit } from '@angular/core';
import { EntityBasica } from 'src/app/shared/models/entity-basica';
import { CnHelper } from 'src/app/shared/cn-helpers/cn-helper';
import { CnItemListagemExibicao } from 'src/app/shared/cn-components/model/cn-item-listagem-exibicao';

@Component({
  selector: 'app-folha-pagamento-pacientes',
  templateUrl: './folha-pagamento-pacientes.component.html',
  styleUrls: ['./folha-pagamento-pacientes.component.scss']
})
export class FolhaPagamentoPacientesComponent implements OnInit, ISublistagemComponent {
  inputEntitys: EntityBasica[] = [];
  displayName: IDisplayNameItem;
  modelDetalhesProcedimento: CnListagemExibicaoModel;

  constructor(private _displayNameService: DisplayNameService
    , private _dentistaService: DentistaService) {
    this.displayName = _displayNameService.itens!;
    this.modelDetalhesProcedimento = new CnListagemExibicaoModel(this._dentistaService,  [], "", this._gerarItensListagem())
   }

  entityId: string = '';
  aoIniciar(): void {
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
      new CnItemListagemExibicao('', 'Paciente'),
      new CnItemListagemExibicao('', 'Procedimento'),
      new CnItemListagemExibicao('', 'Data'),
      new CnItemListagemExibicao('', 'Valor do procedimento'),
      new CnItemListagemExibicao('', 'Forma de pagamento'),
      new CnItemListagemExibicao('', '% ou Fixo'),
      new CnItemListagemExibicao('', 'Parcelamento'),
      new CnItemListagemExibicao('', 'Status'),
    ]
  }

}

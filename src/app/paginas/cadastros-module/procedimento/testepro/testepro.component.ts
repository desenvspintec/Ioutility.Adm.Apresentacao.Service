import { IEntity } from './../../../../shared/models/entity';
import { IListagemCrudItemPeronsalizadoComponent } from './../../../../shared/cn-components/cn-listagem-crud/cn-listagem-crud-item-peronsalizado/i-listagem-crud-item-peronsalizado-component';
import { Component, OnInit } from '@angular/core';
import { CnListagemExibicaoModel } from 'src/app/shared/cn-components/model/cn-listagem-exibicao-model';


interface TesteComponenteEntity extends IEntity {
  codProcedimento: string;
}

@Component({
  selector: 'app-testepro',
  templateUrl: './testepro.component.html',
  styleUrls: ['./testepro.component.scss']
})
export class TesteproComponent implements IListagemCrudItemPeronsalizadoComponent {

  procedimento!: TesteComponenteEntity;
  listagemModel!: CnListagemExibicaoModel;
  posicaoItemNaLista!: number;
  constructor() { }
  aoIniciar(listagemModel: CnListagemExibicaoModel, entity: IEntity, posicaoItemNaLista: number): void {
    this.procedimento = entity as TesteComponenteEntity;
    this.listagemModel = listagemModel;
    this.posicaoItemNaLista = posicaoItemNaLista
  }
}

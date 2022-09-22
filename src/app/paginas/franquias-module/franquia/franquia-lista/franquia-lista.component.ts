import { IEntity } from '../../../../shared/models/entity';
import { IListagemCrudItemPeronsalizadoComponent } from '../../../../shared/cn-components/cn-listagem-crud/cn-listagem-crud-item-peronsalizado/i-listagem-crud-item-peronsalizado-component';
import { Component, OnInit } from '@angular/core';
import { CnListagemExibicaoModel } from 'src/app/shared/cn-components/model/cn-listagem-exibicao-model';
import { EnderecoApi } from 'src/app/shared/constants/api.constant';
import { ApiServicesUrl } from 'src/app/shared/constants/api-services';


interface FranquiaListaEntity extends IEntity {
  codFranquia: string;
  nome: string;
  franquiaStatus: string;
  email: string;
  telefone: string;
  imagemFranquia: string;
}

@Component({
  selector: 'app-franquia-lista',
  templateUrl: './franquia-lista.component.html',
  styleUrls: ['./franquia-lista.component.scss']
})
export class FranquiaListaComponent implements IListagemCrudItemPeronsalizadoComponent {

  franquia!: FranquiaListaEntity;
  listagemModel!: CnListagemExibicaoModel;
  posicaoItemNaLista!: number;
  caminhoStorage = ApiServicesUrl.get(false).upload;
  constructor() { }
  aoIniciar(listagemModel: CnListagemExibicaoModel, entity: IEntity, posicaoItemNaLista: number): void {
    this.franquia = entity as FranquiaListaEntity;
    this.listagemModel = listagemModel;
    this.posicaoItemNaLista = posicaoItemNaLista
  }

  obterEnderecoImagem(franquia: FranquiaListaEntity): string {
    return this.caminhoStorage + franquia.imagemFranquia;
  }
}

import { IEntity } from 'src/app/shared/models/entity';
import { CnListagemExibicaoModel } from 'src/app/shared/cn-components/model/cn-listagem-exibicao-model';
export interface IListagemCrudItemPeronsalizadoComponent {
  aoIniciar(listagemModel: CnListagemExibicaoModel, entity: IEntity, posicaoItemNaLista: number): void;
}

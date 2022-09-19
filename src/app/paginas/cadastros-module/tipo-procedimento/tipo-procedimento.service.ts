import { MatDialog } from '@angular/material/dialog';
import { LINK_ROUTES } from 'src/app/shared/constants/link-routes-constant';
import { EnderecoApi } from 'src/app/shared/constants/api.constant';
import { HttpClient } from '@angular/common/http';
import { IComponentService } from 'src/app/shared/interfaces/i-component-service';
import { EntityService } from 'src/app/shared/services/entity.service';
import { Injectable } from '@angular/core';
import { CnCrudModel } from 'src/app/shared/cn-components/model/cn-crud-model';
import { CnPesquisaModel } from 'src/app/shared/cn-components/cn-pesquisa/cn-pesquisa.model';

@Injectable({
  providedIn: 'root'
})
export class TipoProcedimentoService extends EntityService implements IComponentService {

  constructor(http: HttpClient, private _dialog: MatDialog) {
    super(http, EnderecoApi.obterFranquiaApp(), 'tipoProcedimento');
  }
  gerarModelComponent(): CnCrudModel {
    return CnCrudModel.obterComCamposIdENome(LINK_ROUTES.franquia.tipoProcedimento.inicio, 'Tipo de Procedimento', CnPesquisaModel.ObterPesquisaModel(this.buscarPorNome), this, this._dialog)
  }
}

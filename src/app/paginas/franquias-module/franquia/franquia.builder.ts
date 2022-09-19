import { TAMANHO_RESPONSIVO_4 } from './../../../shared/constants/css-class-tamanhos';
import { TAMANHO_RESPONSIVO_2 } from 'src/app/shared/constants/css-class-tamanhos';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CnBaseDetalheModel } from 'src/app/shared/cn-components/cn-detalhes/models/cn-detalhe-model';
import { CnGrupoCampoDetalhe } from 'src/app/shared/cn-components/cn-detalhes/models/cn-grupo-campos-detalhe';
import { CnSessaoGrupoCamposDetalhe } from 'src/app/shared/cn-components/cn-detalhes/models/cn-sessao-grupo-campos-detalhe';
import { CnPesquisaModel } from 'src/app/shared/cn-components/cn-pesquisa/cn-pesquisa.model';
import {
  CnInputCvaModel,
  OpcaoCombobox,
} from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { CnCampoDetalhe } from 'src/app/shared/cn-components/model/cn-campo-detalhe';
import { CnCrudModel } from 'src/app/shared/cn-components/model/cn-crud-model';
import { CnGrupoCamposFormulario } from 'src/app/shared/cn-components/model/cn-grupo-campos-formulario';
import { CnStepperFormItemModel } from 'src/app/shared/cn-components/model/cn-stepper-form-item.model';
import { LINK_ROUTES } from 'src/app/shared/constants/link-routes-constant';
import { IDisplayNameItem } from 'src/app/shared/models/display-name-item';

import { CnItemListagemExibicao } from './../../../shared/cn-components/model/cn-item-listagem-exibicao';
import { CnStepperFormModel } from './../../../shared/cn-components/model/cn-stepper-form.model';
import { IEntityBasica } from './../../../shared/models/entity-basica';
import { DisplayNameService } from './../../../shared/services/display-name.service';

import { ETipoComissao, ETipoStatusFranquia } from './franquia.models';
import { FranquiaService } from './franquia.service';

export class FranquiaBuilder {


  _displayName!: IDisplayNameItem;
  constructor(
    private _service: FranquiaService,
    private _matDialog: MatDialog,
    displayNameService: DisplayNameService
  ) {
    this._displayName = displayNameService.itens!;

  }

  gerarModelComponent = (): CnCrudModel => {
    const model = new CnCrudModel(
      LINK_ROUTES.franquia.inicio,
      'Franquias',
      CnPesquisaModel.ObterPesquisaModel(this._service.buscarAvancado, [
        CnInputCvaModel.obterTextoSimples('chave', 'Pesquisar por codigo', false, undefined, 0)
          .setarClassTamanho(TAMANHO_RESPONSIVO_4),
        CnInputCvaModel.obterCombobox('status', this._displayName.franquiaStatus.valorDisplay, false, FranquiaBuilder.obterOpcoesStatus())
          .setarClassTamanho(TAMANHO_RESPONSIVO_2)
      ]),
      this._service,
      this.itensListagem(),
      this.gerarFormulario(),
      this.gerarDetalhes()
    )
    model.addBtnAtualizar();
    model.addBtnVerDetalhes();
    model.addBtnInativar(this._matDialog);
    return model;
  }
  private itensListagem(): CnItemListagemExibicao[] {
    return [
      new CnItemListagemExibicao(this._displayName.status.nomePropriedade, this._displayName.status.valorDisplay),
      new CnItemListagemExibicao(this._displayName.especialidade.nomePropriedade, this._displayName.especialidade.valorDisplay),
      new CnItemListagemExibicao(this._displayName.valorSugerido.nomePropriedade, this._displayName.valorSugerido.valorDisplay),
      new CnItemListagemExibicao(this._displayName.valorMinimo.nomePropriedade, this._displayName.valorMinimo.valorDisplay),
    ]
  }
  private gerarFormulario(): CnStepperFormModel {
    return new CnStepperFormModel([
      new CnStepperFormItemModel('', '', [
        new CnGrupoCamposFormulario('', [
        ]),
        new CnGrupoCamposFormulario('Valores', [
          CnInputCvaModel.obterApenasNumero(this._displayName.valorSugerido.nomePropriedade, this._displayName.valorSugerido.valorDisplay, true),
          CnInputCvaModel.obterApenasNumero(this._displayName.valorMinimo.nomePropriedade, this._displayName.valorMinimo.valorDisplay, true),
          CnInputCvaModel.obterApenasNumero(this._displayName.valorMaximo.nomePropriedade, this._displayName.valorMaximo.valorDisplay, true),
          CnInputCvaModel.obterApenasNumero(this._displayName.valorCustoAdicional.nomePropriedade, this._displayName.valorCustoAdicional.valorDisplay, true),
        ]),
        new CnGrupoCamposFormulario('Comissão', [
          CnInputCvaModel.obterCombobox(this._displayName.comissaoTipo.nomePropriedade, this._displayName.comissaoTipo.valorDisplay, true, FranquiaBuilder.obterOpcoesTipoComissao()),
          CnInputCvaModel.obterApenasNumero(this._displayName.comissaoValor.nomePropriedade, this._displayName.comissaoValor.valorDisplay, true),
        ])
      ])
    ])
  }
  static obterOpcoesTipoComissao(): OpcaoCombobox[] {
    return [
      new OpcaoCombobox(ETipoComissao.Fixo, "Fixo"),
      new OpcaoCombobox(ETipoComissao.Variavel, "Variavel"),
    ];
  }
  static obterOpcoesStatus(): OpcaoCombobox[] {
    return [
      new OpcaoCombobox(ETipoStatusFranquia.Ativo, "Ativo"),
      new OpcaoCombobox(ETipoStatusFranquia.Inativo, "Inativo"),
    ];
  }


  private gerarDetalhes(): CnBaseDetalheModel {
    return new CnBaseDetalheModel(
      this._service.buscarPorId,
      [
        new CnCampoDetalhe(this._displayName.status.nomePropriedade, this._displayName.status.valorDisplay)
      ],
      [
        new CnSessaoGrupoCamposDetalhe('', [
          new CnGrupoCampoDetalhe('', false, [
            new CnCampoDetalhe(this._displayName.especialidade.nomePropriedade, this._displayName.especialidade.valorDisplay),
          ]),
          new CnGrupoCampoDetalhe('Valores', false, [
            new CnCampoDetalhe(this._displayName.valorSugerido.nomePropriedade, this._displayName.valorSugerido.valorDisplay),
            new CnCampoDetalhe(this._displayName.valorMinimo.nomePropriedade, this._displayName.valorMinimo.valorDisplay),
            new CnCampoDetalhe(this._displayName.valorMaximo.nomePropriedade, this._displayName.valorMaximo.valorDisplay),
            new CnCampoDetalhe(this._displayName.valorCustoAdicional.nomePropriedade, this._displayName.valorCustoAdicional.valorDisplay),
          ])
        ])
      ]
    )
  }
}

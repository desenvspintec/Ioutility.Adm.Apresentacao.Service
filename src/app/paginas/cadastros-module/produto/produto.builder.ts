import { MatDialog } from '@angular/material/dialog';
import { CnBaseDetalheModel } from 'src/app/shared/cn-components/cn-detalhes/models/cn-detalhe-model';
import { CnGrupoCampoDetalhe } from 'src/app/shared/cn-components/cn-detalhes/models/cn-grupo-campos-detalhe';
import { CnSessaoGrupoCamposDetalhe } from 'src/app/shared/cn-components/cn-detalhes/models/cn-sessao-grupo-campos-detalhe';
import { CnPesquisaModel } from 'src/app/shared/cn-components/cn-pesquisa/cn-pesquisa.model';
import { CnInputCvaModel } from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { CnCampoDetalhe } from 'src/app/shared/cn-components/model/cn-campo-detalhe';
import { CnCrudModel } from 'src/app/shared/cn-components/model/cn-crud-model';
import { CnGrupoCamposFormulario } from 'src/app/shared/cn-components/model/cn-grupo-campos-formulario';
import { CnItemListagemExibicao } from 'src/app/shared/cn-components/model/cn-item-listagem-exibicao';
import { CnStepperFormItemModel } from 'src/app/shared/cn-components/model/cn-stepper-form-item.model';
import { CnStepperFormModel } from 'src/app/shared/cn-components/model/cn-stepper-form.model';
import { CnFormHelper } from 'src/app/shared/cn-helpers/cn-form-helper';
import { RouterHelper } from 'src/app/shared/cn-helpers/cn-router-helper';
import { CONTROL_NAME_ID } from 'src/app/shared/constants/forms-contante';
import { ROTA_MODULO } from 'src/app/shared/constants/routes-constant';
import { DisplayNameService } from 'src/app/shared/services/display-name.service';

import { FORM_TITULO_GENERICO } from './../../../shared/constants/forms-contante';
import { ROTA_COMPLEMENTO } from './../../../shared/constants/routes-constant';
import { IDisplayNameItem } from './../../../shared/models/display-name-item';
import { ProdutoService } from './produto.service';

export class ProdutoBuilder {
  _displayName!: IDisplayNameItem;
  constructor(
    private _service: ProdutoService,
    private _matDialog: MatDialog,
    displayNameService: DisplayNameService,
  ) {
    this._displayName = displayNameService.itens!;
  }

  gerarModelComponent = (): CnCrudModel => {
    const model = new CnCrudModel(
      this._gerarRotaIndex(),
      'Produtos de hoje',
      this._gerarPesquisa(),
      this._service,
      this._gerarListagemPaginaIndex(),
      this._gerarFormulario(),
      this._gerarDetalhes()
    )
    model.addBtnVerDetalhes();
    model.addBtnAtualizar();
    model.addBtnInativar(this._matDialog);

    return model;
  }
  private _gerarDetalhes(): CnBaseDetalheModel {
    return new CnBaseDetalheModel(
      this._service.buscarPorId,
      [ new CnCampoDetalhe(CONTROL_NAME_ID, 'ID') ],
      [
        new CnSessaoGrupoCamposDetalhe(FORM_TITULO_GENERICO, [
          CnGrupoCampoDetalhe.obterComoEntityUnica('Informa????es basicas', [
            new CnCampoDetalhe(this._displayName.nome.nomePropriedade, this._displayName.nome.valorDisplay),
            new CnCampoDetalhe(this._displayName.quantidadEmEstoque.nomePropriedade, this._displayName.quantidadEmEstoque.valorDisplay),

          ])
        ]),
        new CnSessaoGrupoCamposDetalhe('Endere??o', [
          CnGrupoCampoDetalhe.obterComoEntityUnica('Endere??o', [
            new CnCampoDetalhe('endereco.logradouro', 'Rua'),
            new CnCampoDetalhe('endereco.numero', 'N??mero'),
            new CnCampoDetalhe('endereco.bairro', 'Bairro'),
            new CnCampoDetalhe('endereco.cidade', 'Cidade'),
            new CnCampoDetalhe('endereco.estado', 'Estado'),
          ]),
        ])
      ]
    )

  }
  private _gerarFormulario(): CnStepperFormModel {
    return new CnStepperFormModel([
      new CnStepperFormItemModel('produto', FORM_TITULO_GENERICO, [
        new CnGrupoCamposFormulario('Informa????es basicas', [
          CnFormHelper.obterCampoId(),
          CnFormHelper.obterCampoNome(),
          CnInputCvaModel.obterUploadArquivoPorBotao('teste','Arquivo Teste', true),
          CnInputCvaModel.obterApenasNumero(
            this._displayName.quantidadEmEstoque.nomePropriedade,
            this._displayName.quantidadEmEstoque.valorDisplay,
            true),
        ])
      ]),
      new CnStepperFormItemModel('endereco', 'Endere??o do produto', [
        new CnGrupoCamposFormulario('', [
          CnInputCvaModel.obterEndereco(this._displayName.endereco.nomePropriedade, this._displayName.endereco.valorDisplay, true, false)

        ])
      ])
    ]);
  }

  private _gerarListagemPaginaIndex(): CnItemListagemExibicao[] {
    return [
      new CnItemListagemExibicao(this._displayName.nome.nomePropriedade, this._displayName.nome.valorDisplay),
      new CnItemListagemExibicao(this._displayName.quantidadEmEstoque.nomePropriedade, this._displayName.quantidadEmEstoque.valorDisplay)
    ];
  }

  private _gerarPesquisa(): CnPesquisaModel {
    return CnPesquisaModel.ObterPesquisaModel(this._service.buscarPorNome);
  }

  private _gerarRotaIndex(): string {
    return RouterHelper.formarRota([ROTA_MODULO.produto, ROTA_COMPLEMENTO.indexModulo]);
  }
}

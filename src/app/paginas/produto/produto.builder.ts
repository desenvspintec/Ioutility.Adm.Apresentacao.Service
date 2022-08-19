import { MatDialog } from '@angular/material/dialog';
import { CnGrupoCampoDetalhe } from 'src/app/shared/cn-components/cn-detalhes/models/cn-grupo-campos-detalhe';
import { CONTROL_NAME_ID } from 'src/app/shared/constants/forms-contante';
import { CnBaseDetalheModel } from 'src/app/shared/cn-components/cn-detalhes/models/cn-detalhe-model';
import { CnInputCvaModel } from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { CnStepperFormModel } from 'src/app/shared/cn-components/model/cn-stepper-form.model';
import { CnFormHelper } from 'src/app/shared/cn-helpers/cn-form-helper';
import { CnGrupoCamposFormulario } from 'src/app/shared/cn-components/model/cn-grupo-campos-formulario';
import { FORM_TITULO_GENERICO } from './../../shared/constants/forms-contante';
import { CnStepperFormItemModel } from 'src/app/shared/cn-components/model/cn-stepper-form-item.model';
import { ProdutoService } from './produto.service';
import { ROTA_COMPLEMENTO } from './../../shared/constants/routes-constant';
import { ROTA_MODULO } from 'src/app/shared/constants/routes-constant';
import { RouterHelper } from 'src/app/shared/cn-helpers/cn-router-helper';
import { CnCrudModel } from 'src/app/shared/cn-components/model/cn-crud-model';
import { DisplayNameService } from 'src/app/shared/services/display-name.service';
import { IDisplayNameItem } from './../../shared/models/display-name-item';
import { CnPesquisaModel } from 'src/app/shared/cn-components/cn-pesquisa/cn-pesquisa.model';
import { CnItemListagemExibicao } from 'src/app/shared/cn-components/model/cn-item-listagem-exibicao';
import { FormHelperService } from 'src/app/shared/services/form-helper.service';
import { CnSessaoGrupoCamposDetalhe } from 'src/app/shared/cn-components/cn-detalhes/models/cn-sessao-grupo-campos-detalhe';
import { CnCampoDetalhe } from 'src/app/shared/cn-components/model/cn-campo-detalhe';
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
          CnGrupoCampoDetalhe.obterComoEntityUnica('Informações basicas', [
            new CnCampoDetalhe(this._displayName.nome.nomePropriedade, this._displayName.nome.valorDisplay),
            new CnCampoDetalhe(this._displayName.quantidadEmEstoque.nomePropriedade, this._displayName.quantidadEmEstoque.valorDisplay),

          ])
        ]),
        new CnSessaoGrupoCamposDetalhe('Endereço', [
          CnGrupoCampoDetalhe.obterComoEntityUnica('Endereço', [
            new CnCampoDetalhe('endereco.logradouro', 'Rua'),
            new CnCampoDetalhe('endereco.numero', 'Número'),
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
        new CnGrupoCamposFormulario('Informações basicas', [
          CnFormHelper.obterCampoId(),
          CnFormHelper.obterCampoNome(),
          CnInputCvaModel.obterUploadArquivoPorBotao('teste','Arquivo Teste', true),
          CnInputCvaModel.obterApenasNumero(
            this._displayName.quantidadEmEstoque.nomePropriedade,
            this._displayName.quantidadEmEstoque.valorDisplay,
            true),
        ])
      ]),
      new CnStepperFormItemModel('endereco', 'Endereço do produto', [
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

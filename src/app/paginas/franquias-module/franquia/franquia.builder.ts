import { FormGroup } from '@angular/forms';
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
import { FORM_TITULO_GENERICO } from './../../../shared/constants/forms-contante';
import {
  CNPJ_MASK,
  CONTROL_NAME_ID,
  CONTROL_NAME_NOME,
  CPF_MASK,
  TELEFONE_CELULAR_MASK,
} from 'src/app/shared/constants/forms-contante';
import { CnFormHelper } from 'src/app/shared/cn-helpers/cn-form-helper';

import { CnItemListagemExibicao } from './../../../shared/cn-components/model/cn-item-listagem-exibicao';
import { CnStepperFormModel } from './../../../shared/cn-components/model/cn-stepper-form.model';
import { IEntityBasica } from './../../../shared/models/entity-basica';
import { DisplayNameService } from './../../../shared/services/display-name.service';

import { ETipoComissao, ETipoStatusFranquia, EChavePix, EConfiguracaoCartao } from './franquia.models';
import { FranquiaService } from './franquia.service';
import { BancoService } from './../../../shared/services/banco.service';
import { FranquiaListaComponent } from './franquia-lista/franquia-lista.component';

export class FranquiaBuilder {

  _displayName!: IDisplayNameItem;
  constructor(
    private _service: FranquiaService,
    private _bancoService: BancoService,
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
    model.modelListagemExibicao.componenteExibicaoPersonalizado = FranquiaListaComponent;
    model.addBtnAtualizar();
    model.addBtnVerDetalhes();
    model.addBtnInativar(this._matDialog);
    return model;
  }
  private itensListagem(): CnItemListagemExibicao[] {
    return [

      new CnItemListagemExibicao(this._displayName.codFranquia.nomePropriedade, this._displayName.codFranquia.valorDisplay),
      new CnItemListagemExibicao(this._displayName.franquiaStatus.nomePropriedadeTxt(), this._displayName.status.valorDisplay),
      new CnItemListagemExibicao(this._displayName.nome.nomePropriedade, this._displayName.nome.valorDisplay),
      new CnItemListagemExibicao(this._displayName.email.nomePropriedade, this._displayName.email.valorDisplay),
      new CnItemListagemExibicao(this._displayName.telefone.nomePropriedade, this._displayName.telefone.valorDisplay),
    ]
  }
  private gerarFormulario(): CnStepperFormModel {
    const stepperForm = new CnStepperFormModel([
      this._gerarDadosInformacoesGeraisEtapa1(),
      this._gerarEnderecoEtapa2(),
      this._gerarDadosBancariosEtapa3(),
      this._gerarBusinessPayEtapa4()
    ]);
    return stepperForm;
  }

  private _gerarDadosInformacoesGeraisEtapa1(): CnStepperFormItemModel {
    return new CnStepperFormItemModel('franquia', FORM_TITULO_GENERICO, [


      new CnGrupoCamposFormulario('Foto da Franquia', [
        CnInputCvaModel.obterHiddenGuid('id'),
        CnInputCvaModel.obterUploadArquivoPorBotao(this._displayName.imagemFranquia.nomePropriedade, this._displayName.imagemFranquia.valorDisplay, false),
        /*
        CnInputCvaModel.obterTextoSimples(
          this._displayName.codFranquia.nomePropriedade,
          this._displayName.codFranquia.valorDisplay, true)
          */
      ]),


      new CnGrupoCamposFormulario('Informações da Franquia', [
        CnInputCvaModel.obterTextoSimples(
          this._displayName.nome.nomePropriedade,
          this._displayName.nome.valorDisplay, true),

        CnInputCvaModel.obterTextoSimplesComMask(
          this._displayName.cnpj.nomePropriedade,
          this._displayName.cnpj.valorDisplay,
          true,
          CNPJ_MASK
        )
      ]),

      new CnGrupoCamposFormulario('Responsável Legal', [
        CnInputCvaModel.obterTextoSimples(
          this._displayName.responsavelLegal.nomePropriedade,
          this._displayName.responsavelLegal.valorDisplay, true),
        CnInputCvaModel.obterTextoSimples(
          this._displayName.email.nomePropriedade,
          this._displayName.email.valorDisplay, true),
        CnFormHelper.gerarCampoTelefone(),
        CnInputCvaModel.obterTextoSimplesComMask(
          this._displayName.celularWhatsApp.nomePropriedade,
          this._displayName.celularWhatsApp.valorDisplay,
          true,
          TELEFONE_CELULAR_MASK),

      ]),
    ]);
  }

  private _gerarEnderecoEtapa2(): CnStepperFormItemModel {
    return new CnStepperFormItemModel(this._displayName.endereco.nomePropriedade, this._displayName.endereco.valorDisplay, [
      new CnGrupoCamposFormulario(this._displayName.endereco.valorDisplay, [
        CnInputCvaModel.obterEndereco(this._displayName.endereco.nomePropriedade, this._displayName.endereco.valorDisplay, true, false)
      ])
    ])
  }

  private _gerarDadosBancariosEtapa3(): CnStepperFormItemModel {
    const campoChavePix = CnInputCvaModel.obterTextoSimples(this._displayName.chavePix.nomePropriedade, this._displayName.chavePix.valorDisplay, true);

    return new CnStepperFormItemModel('dadosBancarios', 'Dados bancários', [
      new CnGrupoCamposFormulario('Informações da conta bancária', [
        CnInputCvaModel.obterComboBoxPesquisavel(
          this._displayName.bancoId.nomePropriedade, this._displayName.bancoId.valorDisplay, true, this._bancoService.buscarPorNome, this._bancoService.buscarPorId),
        CnInputCvaModel.obterTextoSimples(
          this._displayName.agencia.nomePropriedade, this._displayName.agencia.valorDisplay, true
        ),
        CnInputCvaModel.obterTextoSimples(
          this._displayName.conta.nomePropriedade, this._displayName.conta.valorDisplay, true
        ),
      ]),
      new CnGrupoCamposFormulario('Pix', [
        CnInputCvaModel.obterCombobox(
          this._displayName.tipoChavePix.nomePropriedade, this._displayName.tipoChavePix.valorDisplay, true, FranquiaBuilder.obterOpcoesCampoTipoChavePix())
          .addEventoAoCarregarFormulario(this._definirMascaraChavePixPorTipoChave(campoChavePix)),
        campoChavePix,
      ]),
    ]);
  }

  private _gerarBusinessPayEtapa4(): CnStepperFormItemModel {
    return new CnStepperFormItemModel(this._displayName.businessPay.nomePropriedade, this._displayName.businessPay.valorDisplay, [
      new CnGrupoCamposFormulario(this._displayName.businessPay.valorDisplay, [
        CnInputCvaModel.obterApenasNumero(
          this._displayName.nrVendasMes.nomePropriedade, this._displayName.nrVendasMes.valorDisplay, true
        ),

        CnInputCvaModel.obterCombobox(this._displayName.configuracaoCartao.nomePropriedade, this._displayName.configuracaoCartao.valorDisplay, false, FranquiaBuilder.obterConfiguracoesCartao())
          .setarClassTamanho(TAMANHO_RESPONSIVO_4)
      ])
    ])
  }


  private _definirMascaraChavePixPorTipoChave(campoChavePix: CnInputCvaModel): (form: FormGroup) => void {
    return (form) => {
      const control = form.get(this._displayName.tipoChavePix.nomePropriedade);
      control!.valueChanges.subscribe({
        next: (valor: EChavePix) => {
          switch (valor) {
            case EChavePix.Cnpj:
              campoChavePix.setarMask(CNPJ_MASK)
              break;
            case EChavePix.Cpf:
              campoChavePix.setarMask(CPF_MASK)
              break;
            case EChavePix.Telefone:
              campoChavePix.setarMask(TELEFONE_CELULAR_MASK)
              break;
            default:
              campoChavePix.setarMask('')
              break;
          }
        }
      })
    }
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


  static obterOpcoesCampoTipoChavePix(): OpcaoCombobox[] {
    return [
      new OpcaoCombobox(EChavePix.Cpf, 'CPF'),
      new OpcaoCombobox(EChavePix.Cnpj, 'CNPJ'),
      new OpcaoCombobox(EChavePix.Telefone, 'Telefone'),
    ]
  }

  static obterConfiguracoesCartao(): OpcaoCombobox[] {
    return [
      new OpcaoCombobox('D+1', 'D+1'),
      new OpcaoCombobox('D+30', 'D+30')
    ]
  }

}

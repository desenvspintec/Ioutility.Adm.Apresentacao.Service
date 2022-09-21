import { TesteproComponent } from './testepro/testepro.component';
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
import { EEspecialidade } from './../dentista/dentista.model';
import { TipoProcedimentoService } from './../tipo-procedimento/tipo-procedimento.service';
import { ETipoComissao, ETipoStatusProcedimento } from './procedimento.models';
import { ProcedimentoService } from './procedimento.service';

export class ProcedimentoBuilder {


  _displayName!: IDisplayNameItem;
  constructor(
      private _service: ProcedimentoService,
      private _matDialog: MatDialog,
      private _tipoProcedimentoService: TipoProcedimentoService,
      displayNameService: DisplayNameService,

  ) {
      this._displayName = displayNameService.itens!;

  }

  gerarModelComponent = (): CnCrudModel => {
    const model = new CnCrudModel(
      LINK_ROUTES.franquia.procedimento.inicio,
      'Procedimentos',
      CnPesquisaModel.ObterPesquisaModel(this._service.buscarAvancado, [
        CnInputCvaModel.obterTextoSimples('chave', 'Pesquisar por codigo', false, undefined, 0)
          .setarClassTamanho(TAMANHO_RESPONSIVO_4),
        CnInputCvaModel.obterCombobox(this._displayName.especialidade.nomePropriedade, this._displayName.especialidade.valorDisplay, false, ProcedimentoBuilder.obterOpcoesEspecialidades())
          .setarClassTamanho(TAMANHO_RESPONSIVO_2),
        CnInputCvaModel.obterCombobox('status', this._displayName.procedimentoStatus.valorDisplay, false, ProcedimentoBuilder.obterOpcoesStatus())
          .setarClassTamanho(TAMANHO_RESPONSIVO_2),
        CnInputCvaModel.obterComboBoxPesquisavel(this._displayName.tipoProcedimentoId.nomePropriedade, this._displayName.tipoProcedimentoId.valorDisplay, false, this._tipoProcedimentoService.buscarPorNome, this._tipoProcedimentoService.buscarPorId as (palavraChave: string) => Observable<IEntityBasica>)
          .setarClassTamanho(TAMANHO_RESPONSIVO_2),
        CnInputCvaModel.obterCombobox('tipoComissao', this._displayName.comissaoTipo.valorDisplay, false, ProcedimentoBuilder.obterOpcoesTipoComissao())
          .setarClassTamanho(TAMANHO_RESPONSIVO_2)
      ]),
      this._service,
      this.itensListagem(),
      this.gerarFormulario(),
      this.gerarDetalhes()
    )
    model.modelListagemExibicao.componenteExibicaoPersonalizado = TesteproComponent;
    model.addBtnAtualizar();
    model.addBtnVerDetalhes();
    model.addBtnInativar(this._matDialog);
    return model;
  }
  private itensListagem(): CnItemListagemExibicao[] {
    return [
      new CnItemListagemExibicao(this._displayName.status.nomePropriedade, this._displayName.status.valorDisplay),
      new CnItemListagemExibicao(this._displayName.codProcedimento.nomePropriedade, this._displayName.codProcedimento.valorDisplay),
      new CnItemListagemExibicao(this._displayName.especialidade.nomePropriedade, this._displayName.especialidade.valorDisplay),
      new CnItemListagemExibicao(this._displayName.tipoProcedimento.nomePropriedade, this._displayName.tipoProcedimento.valorDisplay),
      new CnItemListagemExibicao(this._displayName.valorSugerido.nomePropriedade, this._displayName.valorSugerido.valorDisplay),
      new CnItemListagemExibicao(this._displayName.valorMinimo.nomePropriedade, this._displayName.valorMinimo.valorDisplay),
    ]
  }
  private gerarFormulario(): CnStepperFormModel {
    return new CnStepperFormModel([
      new CnStepperFormItemModel('', '', [
        new CnGrupoCamposFormulario('', [
          CnInputCvaModel.obterCombobox(this._displayName.especialidade.nomePropriedade, this._displayName.especialidade.valorDisplay, true, ProcedimentoBuilder.obterOpcoesEspecialidades()),
          CnInputCvaModel.obterComboBoxPesquisavel(this._displayName.tipoProcedimentoId.nomePropriedade, this._displayName.tipoProcedimentoId.valorDisplay, true, this._tipoProcedimentoService.buscarPorNome, this._tipoProcedimentoService.buscarPorId as (palavraChave: string) => Observable<IEntityBasica>)
        ]),
        new CnGrupoCamposFormulario('Valores', [
          CnInputCvaModel.obterApenasNumero(this._displayName.valorSugerido.nomePropriedade, this._displayName.valorSugerido.valorDisplay, true),
          CnInputCvaModel.obterApenasNumero(this._displayName.valorMinimo.nomePropriedade, this._displayName.valorMinimo.valorDisplay, true),
          CnInputCvaModel.obterApenasNumero(this._displayName.valorMaximo.nomePropriedade, this._displayName.valorMaximo.valorDisplay, true),
          CnInputCvaModel.obterApenasNumero(this._displayName.valorCustoAdicional.nomePropriedade, this._displayName.valorCustoAdicional.valorDisplay, true),
        ]),
        new CnGrupoCamposFormulario('Comissão', [
          CnInputCvaModel.obterCombobox(this._displayName.comissaoTipo.nomePropriedade, this._displayName.comissaoTipo.valorDisplay, true, ProcedimentoBuilder.obterOpcoesTipoComissao()),
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
      new OpcaoCombobox(ETipoStatusProcedimento.Ativo, "Ativo"),
      new OpcaoCombobox(ETipoStatusProcedimento.Inativo, "Inativo"),
    ];
  }

  static obterOpcoesEspecialidades(): OpcaoCombobox[] {
    return [
      new OpcaoCombobox(EEspecialidade.clinicoGeral, "Clinico Geral"),
      new OpcaoCombobox(EEspecialidade.ortodontia, "Ortodontia"),
      new OpcaoCombobox(EEspecialidade.endodontia, "Endodontia"),
      new OpcaoCombobox(EEspecialidade.odontoPediatria, "Odonto Pediatria"),
      new OpcaoCombobox(EEspecialidade.periodontia, "Periodontia"),
      new OpcaoCombobox(EEspecialidade.implante, "Implante"),
      new OpcaoCombobox(EEspecialidade.protese, "Prótese"),
      new OpcaoCombobox(EEspecialidade.dentistaEstetica, "Dentista Estética"),
      new OpcaoCombobox(EEspecialidade.esteticaFacial, "Estética Facial"),
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
            new CnCampoDetalhe(this._displayName.codProcedimento.nomePropriedade, this._displayName.codProcedimento.valorDisplay),
            new CnCampoDetalhe(this._displayName.especialidade.nomePropriedade, this._displayName.especialidade.valorDisplay),
            new CnCampoDetalhe(this._displayName.tipoProcedimento.nomePropriedade, this._displayName.tipoProcedimento.valorDisplay),
          ]),
          new CnGrupoCampoDetalhe('Valores', false, [
            new CnCampoDetalhe(this._displayName.valorSugerido.nomePropriedade, this._displayName.valorSugerido.valorDisplay),
            new CnCampoDetalhe(this._displayName.valorMinimo.nomePropriedade, this._displayName.valorMinimo.valorDisplay),
            new CnCampoDetalhe(this._displayName.valorMaximo.nomePropriedade, this._displayName.valorMaximo.valorDisplay),
            new CnCampoDetalhe(this._displayName.valorCustoAdicional.nomePropriedade, this._displayName.valorCustoAdicional.valorDisplay),
          ]),
          new CnGrupoCampoDetalhe('Comissão', false, [
            new CnCampoDetalhe(this._displayName.comissaoTipo.nomePropriedade, this._displayName.comissaoTipo.valorDisplay),
            new CnCampoDetalhe(this._displayName.comissaoValor.nomePropriedade, this._displayName.comissaoValor.valorDisplay),
          ])
        ])
      ]
    )
  }
}

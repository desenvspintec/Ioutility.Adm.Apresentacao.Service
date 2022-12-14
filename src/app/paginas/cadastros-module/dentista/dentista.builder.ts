import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CnGrupoCampoDetalhe } from 'src/app/shared/cn-components/cn-detalhes/models/cn-grupo-campos-detalhe';
import { CnSessaoGrupoCamposDetalhe } from 'src/app/shared/cn-components/cn-detalhes/models/cn-sessao-grupo-campos-detalhe';
import { CnInputCvaModel } from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { CnCampoDetalhe } from 'src/app/shared/cn-components/model/cn-campo-detalhe';
import { CnCrudModel } from 'src/app/shared/cn-components/model/cn-crud-model';
import { CnGrupoCamposFormulario } from 'src/app/shared/cn-components/model/cn-grupo-campos-formulario';
import { CnStepperFormItemModel } from 'src/app/shared/cn-components/model/cn-stepper-form-item.model';
import { CnFormHelper } from 'src/app/shared/cn-helpers/cn-form-helper';
import { LINK_ROUTES } from 'src/app/shared/constants/link-routes-constant';
import { DisplayNameService } from 'src/app/shared/services/display-name.service';

import { CnBaseDetalheModel } from './../../../shared/cn-components/cn-detalhes/models/cn-detalhe-model';
import { CnDrawerService } from './../../../shared/cn-components/cn-drawer/cn-drawer.service';
import { CnPesquisaModel } from './../../../shared/cn-components/cn-pesquisa/cn-pesquisa.model';
import { OpcaoCombobox } from './../../../shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import {
  ICnInputCvaValorImbutir,
} from './../../../shared/cn-components/control-value-accessor/models/i-cn-input-cva-valor-imbutir';
import {
  ICnInputCvaValorObtido,
} from './../../../shared/cn-components/control-value-accessor/models/i-cn-input-cva-valor-obtido';
import { CnItemListagemExibicao } from './../../../shared/cn-components/model/cn-item-listagem-exibicao';
import { CnStepperFormModel } from './../../../shared/cn-components/model/cn-stepper-form.model';
import { StringHelper } from './../../../shared/cn-helpers/cn-string-helper';
import { TAMANHO_RESPONSIVO_3 } from './../../../shared/constants/css-class-tamanhos';
import {
  CNPJ_MASK,
  CONTROL_NAME_ID,
  CPF_MASK,
  FORM_TITULO_GENERICO,
  TELEFONE_CELULAR_MASK,
} from './../../../shared/constants/forms-contante';
import { GUID_VAZIO } from './../../../shared/constants/valores-padroes';
import { IDisplayNameItem } from './../../../shared/models/display-name-item';
import { BancoService } from './../../../shared/services/banco.service';
import { DentistaAlterarStatusComponent } from './dentista-alterar-status/dentista-alterar-status.component';
import {
  DentistaContratoHistoricoComponent,
} from './dentista-contrato/dentista-contrato-historico/dentista-contrato-historico.component';
import {
  DentistaTermoDistratoHistoricoComponent,
} from './dentista-termo-distrato/dentista-termo-distrato-historico/dentista-termo-distrato-historico.component';
import { IDENTIFICADOR_DE_PESQUISA_DENTISTA, ITENS_DENTISTA_SUBMENU } from './dentista.constant';
import {
  DentistaEspecialidade,
  EChavePix,
  EEspecialidade,
  ETipoStatusDentista,
  ETipoStatusDentistaFerias,
} from './dentista.model';
import { DentistaService } from './dentista.service';

export class DentistaBuilder {

  _displayName!: IDisplayNameItem;
  constructor(
    private _service: DentistaService,
    private _bancoService: BancoService,
    private _matDialog: MatDialog,
    private _drawerService: CnDrawerService,
    _displayNameService: DisplayNameService,
  ) {
    this._displayName = _displayNameService.itens!;
  }

  gerarModelComponent = (): CnCrudModel => {

    const model = new CnCrudModel(
      this._gerarRotaIndex(),
      'Dentista',
      this._gerarPesquisa(),
      this._service,
      this._gerarItensListagem(),
      this._gerarFormulario(),
      this._gerarDetalhes(),
    );
    this._addBtnAlterarStatus(model);
    this._addBtnExibirContratos(model);
    this._addBtnExibirDistratos(model);
    model.addBtnVerDetalhes();
    model.addBtnAtualizar();
    model.addBtnInativar(this._matDialog);

    this._definirSubmenu(model);

    return model;
  }

  private _definirSubmenu(model: CnCrudModel) {
    model.setSubmenu(ITENS_DENTISTA_SUBMENU);
  }

  private _addBtnAlterarStatus(model: CnCrudModel) {
    model.addBtnNaListagemExibicao(
      'Alterar Status',
      (entityId, params) => {
        model.abrirModalDeFormularioPorBotao(
          this._matDialog,
          DentistaAlterarStatusComponent,
          { data: { entityId } }
        );
      },
      'autorenew'
    );
  }

  private _addBtnExibirDistratos(model: CnCrudModel) {
    model.addBtnNaListagemExibicao(
      'Distratos',
      (entityId, params) => {
        this._drawerService.abrir( DentistaTermoDistratoHistoricoComponent, {dentistaId: entityId}
        );
      },
      'lock_reset'
    );
  }

  private _addBtnExibirContratos(model: CnCrudModel) {
    model.addBtnNaListagemExibicao(
      'Contratos',
      (entityId, params) => {
        this._drawerService.abrir( DentistaContratoHistoricoComponent, {dentistaId: entityId}
        );
      },
      'lock_reset'
    );
  }


  private _gerarDetalhes(): CnBaseDetalheModel {
    return new CnBaseDetalheModel(
      this._service.buscarPorId,
      [new CnCampoDetalhe(CONTROL_NAME_ID, 'ID')],
      [
        new CnSessaoGrupoCamposDetalhe(FORM_TITULO_GENERICO, [
          CnGrupoCampoDetalhe.obterComoEntityUnica('Informa????es do dentista', [
            new CnCampoDetalhe(this._displayName.nomeCompleto.nomePropriedade, this._displayName.nomeCompleto.valorDisplay),
            new CnCampoDetalhe(this._displayName.nascimento.nomePropriedadeTxt(), this._displayName.nascimento.valorDisplay),
            new CnCampoDetalhe(this._displayName.cpf.nomePropriedade, this._displayName.cpf.valorDisplay),
            new CnCampoDetalhe(this._displayName.cnpj.nomePropriedade, this._displayName.cnpj.valorDisplay),
            new CnCampoDetalhe(this._displayName.cro.nomePropriedade, this._displayName.cro.valorDisplay),
          ]),
          CnGrupoCampoDetalhe.obterComoEntityUnica('Informa????es de contato', [
            new CnCampoDetalhe(this._displayName.email.nomePropriedade, this._displayName.email.valorDisplay),
            new CnCampoDetalhe(this._displayName.telefone.nomePropriedadeTxt(), this._displayName.telefone.valorDisplay),
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
        ]),
        new CnSessaoGrupoCamposDetalhe('Dados Banc??rios', [
          CnGrupoCampoDetalhe.obterComoEntityUnica('Dados Banc??rios', [
            new CnCampoDetalhe('dadosBancarios.bancoNome', 'Banco').setarClass('col-md-12'),
            new CnCampoDetalhe('dadosBancarios.agencia', 'Ag??ncia'),
            new CnCampoDetalhe('dadosBancarios.conta', 'Conta'),
            new CnCampoDetalhe('dadosBancarios.tipoChavePixTxt', 'Tipo de chave Pix'),
            new CnCampoDetalhe('dadosBancarios.chavePix', 'Chave Pix'),
            new CnCampoDetalhe('dadosBancarios.salarioBrutoMensal', 'Salario Bruto Mensal'),
            new CnCampoDetalhe('dadosBancarios.diasQueAtende', 'Dias que atende'),
          ]),
        ]),
        new CnSessaoGrupoCamposDetalhe('Informa????o de acesso', [
          CnGrupoCampoDetalhe.obterComoEntityUnica('Dados Banc??rios', [
            new CnCampoDetalhe('acesso.senha', 'Senha'),
            new CnCampoDetalhe('acesso.dentistaStatusTxt', 'Status'),
          ]),
        ]),

      ]);
  }
  private _gerarFormulario(): CnStepperFormModel {
    return new CnStepperFormModel([
      this._gerarInformacaoGeraisEtapa1(),
      this._gerarEnderecoEtapa2(),
      this._gerarDadosBancariosEtapa3(),
      this._gerarAcessoEtapa4(),
    ]);
  }

  private _gerarAcessoEtapa4(): CnStepperFormItemModel {
    return new CnStepperFormItemModel('acesso', 'Informa????es de acesso', [
      new CnGrupoCamposFormulario('', [
        CnFormHelper.obterCampoSenha(),
        CnInputCvaModel.obterCombobox(this._displayName.dentistaStatus.nomePropriedade, this._displayName.dentistaStatus.valorDisplay, true, DentistaBuilder.obterOpcoesCampoStatusDentista())
      ])
    ])
  }

  private _gerarInformacaoGeraisEtapa1(): CnStepperFormItemModel {
    return new CnStepperFormItemModel('dentista', FORM_TITULO_GENERICO, [
      new CnGrupoCamposFormulario('Informa????es do dentista', [
        CnFormHelper.obterCampoId(),
        CnFormHelper.obterCampoNomeCompleto(),
        CnInputCvaModel.obterData(this._displayName.nascimento.nomePropriedade, this._displayName.nascimento.valorDisplay, true),
        CnFormHelper.obterCampoCpf(this._displayName),
        CnFormHelper.obterCampoCnpj(this._displayName),
        CnInputCvaModel.obterUploadArquivoPorBotao(this._displayName.anexoCpf.nomePropriedade, this._displayName.anexoCpf.valorDisplay, true),
        CnInputCvaModel.obterApenasNumero(this._displayName.cro.nomePropriedade, this._displayName.cro.valorDisplay, true),
        CnInputCvaModel.obterComboboxMultiSelect(this._displayName.especialidades.nomePropriedade, this._displayName.especialidades.valorDisplay, true, DentistaBuilder.obterOpcoesEspecialidades())
          .setarMapeamentoDeValores(
            this._importarEspecialidade(),
            this._exportarEspecilidade()
          ),
        CnInputCvaModel.obterUploadArquivoPorBotao(this._displayName.anexoCRO.nomePropriedade, this._displayName.anexoCRO.valorDisplay, true),
      ]),
      new CnGrupoCamposFormulario('Informa????es de contato', [
        CnFormHelper.obterCampoEmail(this._displayName),
        CnFormHelper.gerarCampoTelefone(),

      ])
    ]);
  }
  private _exportarEspecilidade(): (valorControl: any) => ICnInputCvaValorObtido {
    return (valorControl: any[]): ICnInputCvaValorObtido => {
      const valorRetornar: DentistaEspecialidade[] = [];
      valorControl.forEach(valorEspecialidade => {
        valorRetornar.push({
          dentistaId: GUID_VAZIO,
          especialidade: valorEspecialidade,
          id: GUID_VAZIO
        });
      });
      return { valorControl: valorRetornar };
    };
  }

  private _importarEspecialidade(): (valorSetarNoControl: any) => ICnInputCvaValorImbutir {
    return (valorSetarNoControl: DentistaEspecialidade[]): ICnInputCvaValorImbutir => {
      return {
        valorImbutir: valorSetarNoControl.map(especilidade => especilidade.especialidade)
      };
    };
  }

  private _gerarEnderecoEtapa2(): CnStepperFormItemModel {
    return new CnStepperFormItemModel(this._displayName.endereco.nomePropriedade, this._displayName.endereco.valorDisplay, [
      new CnGrupoCamposFormulario(this._displayName.endereco.valorDisplay, [
        CnInputCvaModel.obterEndereco(this._displayName.endereco.nomePropriedade, this._displayName.endereco.valorDisplay, true, true)
      ])
    ])
  }

  private _gerarDadosBancariosEtapa3(): CnStepperFormItemModel {
    const campoChavePix = CnInputCvaModel.obterTextoSimples(this._displayName.chavePix.nomePropriedade, this._displayName.chavePix.valorDisplay, true);

    return new CnStepperFormItemModel('dadosBancarios', 'Dados banc??rios', [
      new CnGrupoCamposFormulario('Informa????es da conta bancaria', [
        CnInputCvaModel.obterComboBoxPesquisavel(this._displayName.bancoId.nomePropriedade, this._displayName.bancoId.valorDisplay, true, this._bancoService.buscarPorNome, this._bancoService.buscarPorId),
        CnInputCvaModel.obterTextoSimples(this._displayName.agencia.nomePropriedade, this._displayName.agencia.valorDisplay, true),
        CnInputCvaModel.obterTextoSimples(this._displayName.conta.nomePropriedade, this._displayName.conta.valorDisplay, true),
      ]),
      new CnGrupoCamposFormulario('Pix', [
        CnInputCvaModel.obterCombobox(this._displayName.tipoChavePix.nomePropriedade, this._displayName.tipoChavePix.valorDisplay, true, DentistaBuilder.obterOpcoesCampoTipoChavePix())
          .addEventoAoCarregarFormulario(this._definirMascarChavePixPorTipoChave(campoChavePix)),
        campoChavePix,
      ]),
      new CnGrupoCamposFormulario('Remunera????o', [
        CnInputCvaModel.obterTextoSimplesComMask(this._displayName.salarioBrutoMensal.nomePropriedade, this._displayName.salarioBrutoMensal.valorDisplay, true, '00.000,00'),
        CnInputCvaModel.obterComboboxMultiSelect(this._displayName.diasQueAtende.nomePropriedade, this._displayName.diasQueAtende.valorDisplay, true, this._opcoesDIasQueAtende())
          .setarMapeamentoDeValores(this._mapearEntradaStringParaLista(), this._mapearSaidaListaParaString())
      ])
    ]);
  }
  private _mapearEntradaStringParaLista(): (valorControl: any) => ICnInputCvaValorImbutir {
    return (valorControl) => {
      return { valorImbutir: StringHelper.converterStringEmLista(valorControl, '-') };
    };
  }

  private _mapearSaidaListaParaString(): (valorControl: any) => ICnInputCvaValorObtido {
    return (valorControl: string[]) => {
      return { valorControl: StringHelper.converterListaEmString(valorControl, '-') };
    };
  }

  private _opcoesDIasQueAtende(): OpcaoCombobox[] {
    return [
      new OpcaoCombobox('2', 'Segunda-Feira'),
      new OpcaoCombobox('3', 'Ter??a-Feira'),
      new OpcaoCombobox('4', 'Quarta-Feira'),
      new OpcaoCombobox('5', 'Quinta-Feira'),
      new OpcaoCombobox('6', 'Sexta-Feira'),
      new OpcaoCombobox('7', 'Sabado'),
      new OpcaoCombobox('1', 'Domingo'),
    ]
  }
  private _definirMascarChavePixPorTipoChave(campoChavePix: CnInputCvaModel): (form: FormGroup) => void {
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
      });
    }
  }
  private _gerarItensListagem = (): CnItemListagemExibicao[] => {
    return [
      new CnItemListagemExibicao(this._displayName.dentistaStatus.nomePropriedadeTxt(), this._displayName.dentistaStatus.valorDisplay, this._definirCssStatusListagem()),
      new CnItemListagemExibicao(this._displayName.nome.nomePropriedade, this._displayName.nome.valorDisplay),
      new CnItemListagemExibicao(this._displayName.cpf.nomePropriedade, this._displayName.cpf.valorDisplay),
      new CnItemListagemExibicao(this._displayName.email.nomePropriedade, this._displayName.email.valorDisplay),
      new CnItemListagemExibicao(this._displayName.telefone.nomePropriedadeTxt(), this._displayName.telefone.valorDisplay),
      new CnItemListagemExibicao(this._displayName.cro.nomePropriedade, this._displayName.cro.valorDisplay),
      new CnItemListagemExibicao(this._displayName.cnpj.nomePropriedadeTxt(), this._displayName.cnpj.valorDisplay)
    ]
  }

  private _definirCssStatusListagem(): ((itemListagem: any) => string) {
    return (entity: any) => {
      switch (entity.dentistaStatus) {
        case ETipoStatusDentista.EmFerias:
          return 'listagem-em-ferias-item';
        case ETipoStatusDentista.Ativo:
          return 'listagem-ativo-item';
        case ETipoStatusDentista.Inativo:
          return 'listagem-inativo-item';
        default:
          return 'erro-' + entity.dentistaStatus;
      }
    }
  }
  private _gerarPesquisa(): CnPesquisaModel {
    return CnPesquisaModel.ObterPesquisaModel(this._service.buscarAvancado, [
      CnInputCvaModel.obterTextoSimples('nome', 'Pesquisar', false, 200, 0).setarClassTamanho(TAMANHO_RESPONSIVO_3),
      CnInputCvaModel.obterCombobox('statusFiltro', this._displayName.dentistaStatus.valorDisplay, false, [{ id: '', nome: 'Todos' }, ...DentistaBuilder.obterOpcoesCampoStatusDentista()]).setarClassTamanho(TAMANHO_RESPONSIVO_3),
      CnInputCvaModel.obterCombobox(this._displayName.especialidade.nomePropriedade, this._displayName.especialidade.valorDisplay, false, [{ id: '', nome: 'Todos' }, ...DentistaBuilder.obterOpcoesEspecialidades()]).setarClassTamanho(TAMANHO_RESPONSIVO_3)
    ], IDENTIFICADOR_DE_PESQUISA_DENTISTA);
  }

  static obterOpcoesCampoStatusDentista(): OpcaoCombobox[] {
    return [
      new OpcaoCombobox(ETipoStatusDentista.Ativo, 'Ativo'),
      new OpcaoCombobox(ETipoStatusDentista.EmFerias, 'Em f??rias'),
      new OpcaoCombobox(ETipoStatusDentista.Inativo, 'Inativo'),
    ];
  }
  static obterOpcoesCampoStatusDentistaFerias(): OpcaoCombobox[] {
    return [
      new OpcaoCombobox(ETipoStatusDentistaFerias.Programada, 'Programada'),
      new OpcaoCombobox(ETipoStatusDentistaFerias.EmFerias, 'Em f??rias'),
      new OpcaoCombobox(ETipoStatusDentistaFerias.Cancelada, 'Cancelada'),
      new OpcaoCombobox(ETipoStatusDentistaFerias.Realizada, 'Realizada'),
    ];
  }
  static obterOpcoesCampoTipoChavePix(): OpcaoCombobox[] {
    return [
      new OpcaoCombobox(EChavePix.Cpf, 'CPF'),
      new OpcaoCombobox(EChavePix.Cnpj, 'CNPJ'),
      new OpcaoCombobox(EChavePix.Telefone, 'Telefone'),
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
      new OpcaoCombobox(EEspecialidade.protese, "Pr??tese"),
      new OpcaoCombobox(EEspecialidade.dentistaEstetica, "Dentista Est??tica"),
      new OpcaoCombobox(EEspecialidade.esteticaFacial, "Est??tica Facial"),
    ];
  }

  private _gerarRotaIndex(): string {
    return LINK_ROUTES.dentista.inicio;
  }
}

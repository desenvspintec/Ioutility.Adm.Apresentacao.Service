import { MatDialog } from '@angular/material/dialog';
import { CnSessaoGrupoCamposDetalhe } from 'src/app/shared/cn-components/cn-detalhes/models/cn-sessao-grupo-campos-detalhe';
import { CnCampoDetalhe } from 'src/app/shared/cn-components/model/cn-campo-detalhe';

import { CnBaseDetalheModel } from './../../shared/cn-components/cn-detalhes/models/cn-detalhe-model';
import { CnGrupoCampoDetalhe } from './../../shared/cn-components/cn-detalhes/models/cn-grupo-campos-detalhe';
import { CnPesquisaModel } from './../../shared/cn-components/cn-pesquisa/cn-pesquisa.model';
import {
  CnInputCvaModel,
  OpcaoCombobox,
} from './../../shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { CnCrudModel } from './../../shared/cn-components/model/cn-crud-model';
import { CnGrupoCamposFormulario } from './../../shared/cn-components/model/cn-grupo-campos-formulario';
import { CnItemListagemExibicao } from './../../shared/cn-components/model/cn-item-listagem-exibicao';
import { CnStepperFormItemModel } from './../../shared/cn-components/model/cn-stepper-form-item.model';
import { CnStepperFormModel } from './../../shared/cn-components/model/cn-stepper-form.model';
import { CnSubmenu } from './../../shared/cn-components/model/cn-submenu';
import { CnFormHelper, NOME_SESSAO_DETALHES_UNICA } from './../../shared/cn-helpers/cn-form-helper';
import { RouterHelper } from './../../shared/cn-helpers/cn-router-helper';
import { TAMANHO_RESPONSIVO_1, TAMANHO_RESPONSIVO_3 } from './../../shared/constants/css-class-tamanhos';
import {
  CONTROL_NAME_ID,
  CONTROL_NAME_NOME,
  CPF_MASK,
  TELEFONE_CELULAR_MASK,
} from './../../shared/constants/forms-contante';
import { ROTA_COMPLEMENTO, ROTA_MODULO } from './../../shared/constants/routes-constant';
import { IDisplayNameItem } from './../../shared/models/display-name-item';
import { DisplayNameService } from './../../shared/services/display-name.service';
import {
  PacienteAlterarStatusComponent,
} from './cadastro-completo/paciente-alterar-status/paciente-alterar-status.component';
import { MODO_CADASTRO_PACIENTE } from './paciente.constant';
import { ETipoDocumentoPessoaFisica, ETipoStatusCadastroPaciente } from './paciente.models';
import { PacienteService } from './paciente.service';

export class PacienteBuilder {
  private _displayName!: IDisplayNameItem;
  constructor(
    private _service: PacienteService,
    private _matDialog: MatDialog,
    _displayNameService: DisplayNameService,
  ) {
    this._displayName = _displayNameService.itens!;
  }
  gerarModelComponent(): CnCrudModel {
    const model = this._definirModel();
    model.setSubmenu([
      new CnSubmenu('/paciente/pre-cadastro', 'Pré cadastro'),
      new CnSubmenu('/paciente/cadastro-completo', 'Cadastro completo'),
    ]);
    model.addBtnVerDetalhes();
    model.addBtnAtualizar();
    model.addBtnInativar(this._matDialog);
    return model;
  }
  private _definirModel(): CnCrudModel {
    if (this._service.estaEmModoCadastroCompleto) {
      return this._definirModelCadastroCompleto();
    }
    if (this._service.estaEmModoPreCadastro) {
      return this._definirModelPreCadastro();
    }

    throw Error(
      `Erro ao gerar o tipo de model do paciente. Modelo definido: ${this._service._modoPaciente}. Modos disponiveis: '${MODO_CADASTRO_PACIENTE.cadastroCompleto} ' ou '${MODO_CADASTRO_PACIENTE.preCadastro}'`
    );
  }

  private _definirModelCadastroCompleto(): CnCrudModel {
    const rota = RouterHelper.formarRota([
      ROTA_MODULO.paciente,
      ROTA_COMPLEMENTO.cadastroCompleto,
    ]);
    const modelListagemExibicao = this._obterListagemExibicao();
    const stepperForm = this._gerarCampoFormularioCadastroCompleto();
    const camposDetalhes = this._obterCamposDetalhesCadastroCompleto();

    const model = new CnCrudModel(
      rota,
      'paciente (Completo)',
      this._gerarPesquisa(),
      this._service,
      modelListagemExibicao,
      stepperForm,
      camposDetalhes
    );

    this._addBtnAlterarStatus(model);
    return model;
  }
  private _gerarPesquisa(): CnPesquisaModel {
    return CnPesquisaModel.ObterPesquisaModel(this._service.buscarAvancado, [
      CnInputCvaModel.obterTextoSimples('nome', 'Pesquisar', false, 200, 0).setarClassTamanho(TAMANHO_RESPONSIVO_3),
      CnInputCvaModel.obterCombobox(this._displayName.pacienteStatus.nomePropriedade, this._displayName.pacienteStatus.valorDisplay, false, [{ id: '', nome: 'Todos' }, ...PacienteBuilder.obterOpcoesCampoStatusPaciente()]).setarClassTamanho(TAMANHO_RESPONSIVO_1)
    ]);
  }

  static obterOpcoesCampoStatusPaciente(): OpcaoCombobox[] {
    return [
      new OpcaoCombobox(ETipoStatusCadastroPaciente.Contratado, 'Contratado'),
      new OpcaoCombobox(ETipoStatusCadastroPaciente.Pendente, 'Pendente'),
      new OpcaoCombobox(ETipoStatusCadastroPaciente.Cancelado, 'Cancelado'),
    ];
  }

  private _obterCamposDetalhesCadastroCompleto(): CnBaseDetalheModel {
    return new CnBaseDetalheModel(
      this._service.buscarPorId,
      [new CnCampoDetalhe(CONTROL_NAME_ID, 'ID')],
      [
        new CnSessaoGrupoCamposDetalhe('informações gerais', [
          CnGrupoCampoDetalhe.obterComoEntityUnica('informações gerais', [
            new CnCampoDetalhe(CONTROL_NAME_NOME, 'Nome Completo'),
            new CnCampoDetalhe('cpf', 'CPF'),
            new CnCampoDetalhe('nascimentoTxt', 'Data de Nascimento'),
          ]),
          CnGrupoCampoDetalhe.obterComoEntityUnica('informações de contato', [
            new CnCampoDetalhe('telefone', 'Telefone'),
            new CnCampoDetalhe('email', 'E-mail'),
          ]),
        ]),
        new CnSessaoGrupoCamposDetalhe('Endereço', [
          CnGrupoCampoDetalhe.obterComoEntityUnica('Endereço', [
            new CnCampoDetalhe('endereco.logradouro', 'Rua'),
            new CnCampoDetalhe('endereco.numero', 'Número'),
            new CnCampoDetalhe('endereco.bairro', 'Bairro'),
            new CnCampoDetalhe('endereco.cidade', 'Cidade'),
            new CnCampoDetalhe('endereco.estado', 'Estado'),
          ]),
        ]),
        new CnSessaoGrupoCamposDetalhe('Vinculados', [
          CnGrupoCampoDetalhe.obterComoEntityLista('Vinculado', 'vinculados', [
            new CnCampoDetalhe('nome', 'nome'),
            new CnCampoDetalhe('nascimentoTxt', 'nascimento'),
            new CnCampoDetalhe('tipoDocumentoTxt', 'documento'),
            new CnCampoDetalhe('numeroDocumento', 'nº documento'),
            new CnCampoDetalhe('statusTxt', 'status'),
            new CnCampoDetalhe('nome', 'nome'),
          ]),
        ]),
      ]
    );
  }
  private _obterListagemExibicao(): CnItemListagemExibicao[] {
    return [
      new CnItemListagemExibicao(
        this._displayName.pacienteStatus.nomePropriedadeTxt(),
        this._displayName.pacienteStatus.valorDisplay,
        this._definirCssStatus()
      ),
      new CnItemListagemExibicao('nome', 'Nome Completo'),
      new CnItemListagemExibicao(
        this._displayName.cpf.nomePropriedadeTxt(),
        this._displayName.cpf.valorDisplay
      ),
      new CnItemListagemExibicao(
        this._displayName.email.nomePropriedade,
        this._displayName.email.valorDisplay
      ),
      new CnItemListagemExibicao(
        this._displayName.telefone.nomePropriedadeTxt(),
        this._displayName.telefone.valorDisplay
      ),
      new CnItemListagemExibicao(
        this._displayName.nascimento.nomePropriedadeTxt(),
        this._displayName.nascimento.valorDisplay
      ),
    ];
  }
  private _definirCssStatus(): ((itemListagem: any) => string) {
    return (entity: any) => {
      switch (entity.pacienteStatus) {
        case ETipoStatusCadastroPaciente.Pendente:
          return 'listagem-pendente-item';
        case ETipoStatusCadastroPaciente.Contratado:
          return 'listagem-contratado-item';
        case ETipoStatusCadastroPaciente.Cancelado:
          return 'listagem-cancelado-item';
        default:
          return 'erro-' + entity.pacienteStatus;
      }
    }
  }


  private _addBtnAlterarStatus(model: CnCrudModel) {
    model.addBtnNaListagemExibicao(
      'Alterar Status',
      (entityId, params) => {
        model.abrirModalDeFormularioPorBotao(
          this._matDialog,
          PacienteAlterarStatusComponent,
          { data: { entityId } }
        );
      },
      'autorenew'
    );
  }

  private _gerarCampoFormularioCadastroCompleto() {
    const camposInformacaoPaciente: CnInputCvaModel[] = [
      CnFormHelper.obterCampoId(),
      CnFormHelper.obterCampoNomeCompleto(),
      this._gerarCampoCpf(true),
      this._gerarCampoNascimento(),
    ];
    const camposContato: CnInputCvaModel[] = [
      CnInputCvaModel.obterEmail(
        this._displayName.email.nomePropriedade,
        this._displayName.email.valorDisplay,
        true
      ),
      this._gerarCampoTelefone(),
    ];
    const camposVinculados = [
      CnFormHelper.obterCampoNomeCompleto(),
      this._gerarCampoNascimento(),
      CnInputCvaModel.obterCombobox(
        'tipoDocumento',
        'Tipo de documento',
        true,
        [
          new OpcaoCombobox(ETipoDocumentoPessoaFisica.CPF, 'CPF'),
          new OpcaoCombobox(
            ETipoDocumentoPessoaFisica.CertidaoNascimento,
            'Certidão de Nascimento'
          ),
        ]
      ),
      CnInputCvaModel.obterApenasNumero(
        'numeroDocumento',
        'Número do documento',
        true
      ),
      this._gerarCampoTelefone(),
      CnFormHelper.obterCampoSenha(),
      CnInputCvaModel.obterCombobox('status', 'Status', true, [
        new OpcaoCombobox(ETipoStatusCadastroPaciente.Contratado, 'Contratado'),
        new OpcaoCombobox(ETipoStatusCadastroPaciente.Cancelado, 'Cancelado'),
      ]),
    ];

    const gruposCamposFormularioEtapa1: CnGrupoCamposFormulario[] = [
      new CnGrupoCamposFormulario(
        'Informações do paciente',
        camposInformacaoPaciente
      ),
      new CnGrupoCamposFormulario('Informações de contato', camposContato),
    ];
    const gruposCamposFormularioEtapa2: CnGrupoCamposFormulario[] = [
      new CnGrupoCamposFormulario('', [
        CnInputCvaModel.obterEndereco(this._displayName.endereco.nomePropriedade, this._displayName.endereco.valorDisplay, true, true)
      ]),
    ];
    const gruposCamposFormularioEtapa3: CnGrupoCamposFormulario[] = [
      new CnGrupoCamposFormulario('', [
        CnInputCvaModel.obterSubformularios(
          'vinculados',
          'Vinculados',
          true,
          false,
          false,
          [new CnGrupoCamposFormulario('', camposVinculados)]
        ),
      ]),
    ];
    const gruposCamposFormularioEtapa4: CnGrupoCamposFormulario[] = [
      new CnGrupoCamposFormulario('', [
        CnFormHelper.obterCampoSenha(),
        CnInputCvaModel.obterCombobox(
          this._displayName.pacienteStatus.nomePropriedade,
          this._displayName.pacienteStatus.valorDisplay,
          true,
          PacienteBuilder.obterOpcoesCampoStatusPaciente()
        ),
      ]),
    ];

    const stepperForm = new CnStepperFormModel([
      new CnStepperFormItemModel(
        'paciente',
        'Informações Gerais',
        gruposCamposFormularioEtapa1
      ),
      new CnStepperFormItemModel(
        'endereco',
        'Endereço',
        gruposCamposFormularioEtapa2
      ),
      new CnStepperFormItemModel(
        'vinculados',
        'Vinculados',
        gruposCamposFormularioEtapa3
      ),
      new CnStepperFormItemModel(
        'pacienteAcesso',
        'Informações de acesso',
        gruposCamposFormularioEtapa4
      ),
    ]);
    return stepperForm;
  }
  private _gerarCampoCpf(obrigatorio: boolean) {
    const campoCPF = CnInputCvaModel.obterTextoSimplesComMask(
      this._displayName.cpf.nomePropriedade,
      this._displayName.cpf.valorDisplay,
      obrigatorio,
      CPF_MASK
    )
    return campoCPF;
  }

  private _gerarCampoNascimento() {
    return CnInputCvaModel.obterData(
      this._displayName.nascimento.nomePropriedade,
      this._displayName.nascimento.valorDisplay,
      true
    );
  }

  private _gerarCampoTelefone(): CnInputCvaModel {
    const campoTelefone = CnInputCvaModel.obterTextoSimplesComMask(
      this._displayName.telefone.nomePropriedade,
      this._displayName.telefone.valorDisplay,
      true,
      TELEFONE_CELULAR_MASK
    );
    campoTelefone.addEventoAoCarregarFormulario(
      CnFormHelper.validacaoTelefoneDelegate(campoTelefone)
    );

    return campoTelefone;
  }

  private _definirModelPreCadastro(): CnCrudModel {
    const gruposCamposFormulario: CnGrupoCamposFormulario[] = this._gerarFormularioPreCadastro();
    const modelListagemExibicao = this._obterListagemExibicao();
    const camposDetalhes = this._obterCamposDetalhesPreCadastro()
    const rota = RouterHelper.formarRota([
      ROTA_MODULO.paciente,
      ROTA_COMPLEMENTO.preCadastro,
    ]);
    const model = new CnCrudModel(
      rota,
      'Paciente',
      this._gerarPesquisa(),
      this._service,
      modelListagemExibicao,
      CnStepperFormModel.obterStipperUnico(gruposCamposFormulario),
      camposDetalhes,
      this._service.registrarPreCadastro,
      this._service.atualizarPreCadastro
    );
    return model;
  }
  private _gerarFormularioPreCadastro() {
    const camposInformacaoPaciente: CnInputCvaModel[] = [
      CnFormHelper.obterCampoId(),
      CnFormHelper.obterCampoNomeCompleto(),
      this._gerarCampoCpf(false),
      this._gerarCampoNascimento(),
    ];
    const camposContato: CnInputCvaModel[] = [
      this._gerarCampoEmail(),
      this._gerarCampoTelefone(),
    ];
    const gruposCamposFormulario: CnGrupoCamposFormulario[] = [
      new CnGrupoCamposFormulario(
        'Informações do paciente',
        camposInformacaoPaciente
      ),
      new CnGrupoCamposFormulario('Informações de contato', camposContato),
    ];
    return gruposCamposFormulario;
  }

  private _gerarCampoEmail(): CnInputCvaModel {
    return CnInputCvaModel.obterEmail(
      this._displayName.email.nomePropriedade,
      this._displayName.email.valorDisplay,
      true
    );
  }


  private _obterCamposDetalhesPreCadastro(): CnBaseDetalheModel {
    return new CnBaseDetalheModel(
      this._service.buscarPorId,
      [new CnCampoDetalhe(CONTROL_NAME_ID, 'ID')],
      [
        new CnSessaoGrupoCamposDetalhe(NOME_SESSAO_DETALHES_UNICA, [
          new CnGrupoCampoDetalhe('informações gerais', false, [
            new CnCampoDetalhe(CONTROL_NAME_NOME, 'Nome Completo'),
            new CnCampoDetalhe('cpf', 'CPF'),
            new CnCampoDetalhe('nascimentoTxt', 'Data de Nascimento'),
          ]),
          new CnGrupoCampoDetalhe('informações de contato', false, [
            new CnCampoDetalhe('telefone', 'Telefone'),
            new CnCampoDetalhe('email', 'E-mail'),
          ]),
        ]),
      ]
    );
  }
}

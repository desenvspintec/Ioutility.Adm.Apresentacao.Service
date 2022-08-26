import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
import { CnItemListagemExibicao } from 'src/app/shared/cn-components/model/cn-item-listagem-exibicao';
import { CnStepperFormItemModel } from 'src/app/shared/cn-components/model/cn-stepper-form-item.model';
import { CnStepperFormModel } from 'src/app/shared/cn-components/model/cn-stepper-form.model';
import { CnFormHelper } from 'src/app/shared/cn-helpers/cn-form-helper';
import { RouterHelper } from 'src/app/shared/cn-helpers/cn-router-helper';
import { TAMANHO_RESPONSIVO_3 } from 'src/app/shared/constants/css-class-tamanhos';
import {
    CNPJ_MASK,
    CONTROL_NAME_ID,
    CONTROL_NAME_NOME,
    CPF_MASK,
    TELEFONE_CELULAR_MASK,
    TELEFONE_RESIDENCIAL_MASK,
} from 'src/app/shared/constants/forms-contante';
import { ROTA_MODULO } from 'src/app/shared/constants/routes-constant';

import { FORM_TITULO_GENERICO } from './../../shared/constants/forms-contante';
import { IDisplayNameItem } from './../../shared/models/display-name-item';
import { BancoService } from './../../shared/services/banco.service';
import { DisplayNameService } from './../../shared/services/display-name.service';
import {
    FornecedorAlterarStatusComponent,
} from './cadastro-fornecedor/fornecedor-alterar-status/fornecedor-alterar-status.component';
import { ECentroDeCustoFornecedor, EChavePix, ETipoStatusCadastroFornecedor } from './fornecedor.models';
import { FornecedorService } from './fornecedor.service';

export class FornecedorBuilder {
    private _displayName!: IDisplayNameItem;

    constructor(
        private _service: FornecedorService,
        private _bancoService: BancoService,
        private _matDialog: MatDialog,
        private _displayNameService: DisplayNameService,
    ) {
        this._displayName = _displayNameService.itens!;
    }

    gerarModelComponent(): CnCrudModel {
        const stepperForm = this._gerarCampoFormularioCadastroFornecedor();
        const modelListagemExibicao = this._obterListagemExibicao();
        const camposDetalhes = this._obterCamposDetalhesFornecedor();
        const rota = RouterHelper.formarRota([
            ROTA_MODULO.fornecedor
        ]);
        const model = new CnCrudModel(
            rota
            , 'Fornecedor'
            , this._gerarPesquisa()
            , this._service
            , modelListagemExibicao
            , stepperForm
            , camposDetalhes
        );
        this._addBtnAlterarStatus(model);
        model.addBtnVerDetalhes();
        model.addBtnAtualizar();
        model.addBtnInativar(this._matDialog);
        return model;
    }

    private _gerarPesquisa(): CnPesquisaModel {
        return CnPesquisaModel.ObterPesquisaModel(this._service.buscarAvancado, [
            CnInputCvaModel.obterTextoSimples('nome', 'Pesquisar', false, 200, 3).setarClassTamanho(TAMANHO_RESPONSIVO_3),
            CnInputCvaModel.obterCombobox('status', 'Status', false, [{ id: '', nome: 'Todos' }, ...FornecedorBuilder.obterOpcoesCampoStatusFornecedor()]).setarClassTamanho(TAMANHO_RESPONSIVO_3),
            CnInputCvaModel.obterCombobox(this._displayName.centroDeCusto.nomePropriedade, 'Centro de custo', false, [{ id: '', nome: 'Todos' }, ...this.obterOpcoesCentroDeCusto()]).setarClassTamanho(TAMANHO_RESPONSIVO_3),
        ]);
    }

    private _gerarCampoFormularioCadastroFornecedor() {

        const stepperForm = new CnStepperFormModel([
            this._gerarDadosInformacoesGeraisEtapa1(),
            this._gerarDadosBancariosEtapa2(),
        ]);
        return stepperForm;
    }

    private _gerarDadosInformacoesGeraisEtapa1(): CnStepperFormItemModel {
        return new CnStepperFormItemModel('fornecedor', FORM_TITULO_GENERICO, [
            new CnGrupoCamposFormulario('Informações do fornecedor', [
                CnInputCvaModel.obterHiddenGuid('id'),
                CnInputCvaModel.obterTextoSimples(
                    this._displayName.nome.nomePropriedade,
                    this._displayName.nome.valorDisplay, true),
                CnInputCvaModel.obterTextoSimples(
                    this._displayName.razaoSocial.nomePropriedade,
                    this._displayName.razaoSocial.valorDisplay, true),
                CnInputCvaModel.obterTextoSimplesComMask(
                    this._displayName.cnpj.nomePropriedade,
                    this._displayName.cnpj.valorDisplay,
                    true,
                    CNPJ_MASK
                ),
                CnInputCvaModel.obterCombobox(
                    this._displayName.centroDeCusto.nomePropriedade,
                    this._displayName.centroDeCusto.valorDisplay, false, this.obterOpcoesCentroDeCusto()),
            ]),
            new CnGrupoCamposFormulario('Informações de contato', [
                CnInputCvaModel.obterTextoSimples(
                    this._displayName.email.nomePropriedade, this._displayName.email.valorDisplay, true
                ),
                CnFormHelper.gerarCampoTelefone(),
                CnInputCvaModel.obterTextoSimplesComMask(
                    this._displayName.telefone.nomePropriedade,
                    this._displayName.telefone.valorDisplay,
                    true,
                    TELEFONE_RESIDENCIAL_MASK
                ),
                CnInputCvaModel.obterTextoSimplesComMask(
                    this._displayName.celularWhatsApp.nomePropriedade,
                    this._displayName.celularWhatsApp.valorDisplay,
                    false,
                    TELEFONE_CELULAR_MASK
                )
            ])
        ]);
    }

    private _gerarDadosBancariosEtapa2(): CnStepperFormItemModel {
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
                    this._displayName.tipoChavePix.nomePropriedade, this._displayName.tipoChavePix.valorDisplay, true, FornecedorBuilder.obterOpcoesCampoTipoChavePix())
                    .addEventoAoCarregarFormulario(this._definirMascaraChavePixPorTipoChave(campoChavePix)),
                campoChavePix,
            ]),
        ]);
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

    static obterOpcoesCampoTipoChavePix(): OpcaoCombobox[] {
        return [
            new OpcaoCombobox(EChavePix.Cpf, 'CPF'),
            new OpcaoCombobox(EChavePix.Cnpj, 'CNPJ'),
            new OpcaoCombobox(EChavePix.Telefone, 'Telefone'),
        ]
    }

    private _obterListagemExibicao(): CnItemListagemExibicao[] {
        return [
            new CnItemListagemExibicao(this._displayName.fornecedorStatus.nomePropriedadeTxt(), this._displayName.fornecedorStatus.valorDisplay, this._definirCssStatus()),
            new CnItemListagemExibicao('nome', 'Nome do Fornecedor'),
            new CnItemListagemExibicao(this._displayName.cnpj.nomePropriedadeTxt(), this._displayName.cnpj.valorDisplay),
            new CnItemListagemExibicao(this._displayName.razaoSocial.nomePropriedade, this._displayName.razaoSocial.valorDisplay),
            new CnItemListagemExibicao(this._displayName.email.nomePropriedade, this._displayName.email.valorDisplay),
            new CnItemListagemExibicao(this._displayName.telefone.nomePropriedadeTxt(), this._displayName.telefone.valorDisplay),
            new CnItemListagemExibicao(this._displayName.centroDeCusto.nomePropriedadeTxt(), this._displayName.centroDeCusto.valorDisplay)
        ];
    }

    private _definirCssStatus(): ((itemListagem: any) => string) {
        return (entity: any) => {
            switch (entity.fornecedorStatus) {
                case ETipoStatusCadastroFornecedor.Ativo:
                    return 'listagem-ativo-item';
                case ETipoStatusCadastroFornecedor.Inativo:
                    return 'listagem-inativo-item';
                default:
                    return 'erro-' + entity.fornecedorStatus;
            }
        }
    }

    private _obterCamposDetalhesFornecedor(): CnBaseDetalheModel {
        return new CnBaseDetalheModel(
            this._service.buscarPorId,
            [new CnCampoDetalhe(CONTROL_NAME_ID, 'ID')],
            [
                new CnSessaoGrupoCamposDetalhe('Informações do fornecedor', [
                    CnGrupoCampoDetalhe.obterComoEntityUnica('Informações do fornecedor', [
                        new CnCampoDetalhe(CONTROL_NAME_NOME, this._displayName.nome.valorDisplay,),
                        new CnCampoDetalhe(this._displayName.razaoSocial.nomePropriedade, this._displayName.razaoSocial.valorDisplay),
                        new CnCampoDetalhe(this._displayName.cnpj.nomePropriedade, this._displayName.cnpj.valorDisplay),
                    ]),
                    CnGrupoCampoDetalhe.obterComoEntityUnica('Informações de contato', [
                        new CnCampoDetalhe(this._displayName.email.nomePropriedade, this._displayName.email.valorDisplay),
                        new CnCampoDetalhe(this._displayName.telefone.nomePropriedade, this._displayName.telefone.valorDisplay),
                        new CnCampoDetalhe(this._displayName.celularWhatsApp.nomePropriedade, this._displayName.celularWhatsApp.valorDisplay),
                    ]),
                ]),
                new CnSessaoGrupoCamposDetalhe('Dados bancários', [
                    CnGrupoCampoDetalhe.obterComoEntityUnica('Dados Bancários', [
                        new CnCampoDetalhe('dadosBancarios.bancoNome', 'Banco').setarClass('col-md-12'),
                        new CnCampoDetalhe('dadosBancarios.agencia', 'Agência'),
                        new CnCampoDetalhe('dadosBancarios.tipoChavePixTxt', this._displayName.tipoChavePix.valorDisplay),
                        new CnCampoDetalhe('dadosBancarios.conta', this._displayName.conta.valorDisplay),
                        new CnCampoDetalhe('dadosBancarios.chavePix', this._displayName.chavePix.valorDisplay),
                    ])
                ])
            ])
            ;
    }

    private _addBtnAlterarStatus(model: CnCrudModel) {
        model.addBtnNaListagemExibicao(
            'Alterar Status',
            (entityId, params) => {
                model.abrirModalDeFormularioPorBotao(
                    this._matDialog,
                    FornecedorAlterarStatusComponent,
                    { data: { entityId } }
                );
            },
            'autorenew'
        );
    }

    static obterOpcoesCampoStatusFornecedor(): OpcaoCombobox[] {
        return [
            new OpcaoCombobox(ETipoStatusCadastroFornecedor.Ativo, 'Ativo'),
            new OpcaoCombobox(ETipoStatusCadastroFornecedor.Inativo, 'Inativo'),
        ];
    }

    obterOpcoesCentroDeCusto(): OpcaoCombobox[] {
        return [
            new OpcaoCombobox(ECentroDeCustoFornecedor.AreaA, 'Área A'),
            new OpcaoCombobox(ECentroDeCustoFornecedor.AreaB, 'Área B'),
            new OpcaoCombobox(ECentroDeCustoFornecedor.AreaC, 'Área C'),
            new OpcaoCombobox(ECentroDeCustoFornecedor.AreaD, 'Área D'),
            new OpcaoCombobox(ECentroDeCustoFornecedor.AreaE, 'Área E'),
        ]
    }
}

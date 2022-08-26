import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CnGrupoCampoDetalhe } from 'src/app/shared/cn-components/cn-detalhes/models/cn-grupo-campos-detalhe';
import { CnSessaoGrupoCamposDetalhe } from 'src/app/shared/cn-components/cn-detalhes/models/cn-sessao-grupo-campos-detalhe';
import {
    ICnInputCvaValorImbutir,
} from 'src/app/shared/cn-components/control-value-accessor/models/i-cn-input-cva-valor-imbutir';
import { CnCampoDetalhe } from 'src/app/shared/cn-components/model/cn-campo-detalhe';
import { CnGrupoCamposFormulario } from 'src/app/shared/cn-components/model/cn-grupo-campos-formulario';
import { CnStepperFormItemModel } from 'src/app/shared/cn-components/model/cn-stepper-form-item.model';
import { CnFormHelper } from 'src/app/shared/cn-helpers/cn-form-helper';
import { RouterHelper } from 'src/app/shared/cn-helpers/cn-router-helper';
import { StringHelper } from 'src/app/shared/cn-helpers/cn-string-helper';
import { TAMANHO_CENTRALIZADO_1, TAMANHO_UNICO_6 } from 'src/app/shared/constants/css-class-tamanhos';
import { IDisplayNameItem } from 'src/app/shared/models/display-name-item';
import { BancoService } from 'src/app/shared/services/banco.service';
import { DisplayNameService } from 'src/app/shared/services/display-name.service';

import { EChavePix } from '../fornecedor/fornecedor.models';
import { CnBaseDetalheModel } from './../../shared/cn-components/cn-detalhes/models/cn-detalhe-model';
import { CnPesquisaModel } from './../../shared/cn-components/cn-pesquisa/cn-pesquisa.model';
import {
    CnInputCvaModel,
    OpcaoCombobox,
} from './../../shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { CnCrudModel } from './../../shared/cn-components/model/cn-crud-model';
import { CnItemListagemExibicao } from './../../shared/cn-components/model/cn-item-listagem-exibicao';
import { CnStepperFormModel } from './../../shared/cn-components/model/cn-stepper-form.model';
import { TAMANHO_RESPONSIVO_3 } from './../../shared/constants/css-class-tamanhos';
import {
    CNPJ_MASK,
    CONTROL_NAME_ID,
    CPF_MASK,
    FORM_TITULO_GENERICO,
    TELEFONE_CELULAR_MASK,
} from './../../shared/constants/forms-contante';
import { ROTA_COMPLEMENTO, ROTA_MODULO } from './../../shared/constants/routes-constant';
import { ColaboradorAlterarStatusComponent } from './colaborador-alterar-status/colaborador-alterar-status.component';
import { ETipoStatusColaborador } from './colaborador.model';
import { ColaboradorService } from './colaborador.service';

export class ColaboradorBuilder {

    _displayName!: IDisplayNameItem;
    constructor(
        private _service: ColaboradorService,
        private _bancoService: BancoService,
        private _matDialog: MatDialog,
        private _displayNameService: DisplayNameService,
    ) {
        this._displayName = _displayNameService.itens!;
    }

    gerarModelComponent = (): CnCrudModel => {
        const model = new CnCrudModel(
            this._gerarRotaIndex(),
            'Colaborador',
            this._gerarPesquisa(),
            this._service,
            this._gerarItensListagem(),
            this._gerarFormulario(),
            this._gerarDetalhes(),
        );
        model.addBtnVerDetalhes();
        model.addBtnAtualizar();
        model.addBtnInativar(this._matDialog);
        this._addBtnAlterarStatus(model);
        return model;
    }

    private _gerarDetalhes(): CnBaseDetalheModel {
        return new CnBaseDetalheModel(
            this._service.buscarPorId,
            [new CnCampoDetalhe(CONTROL_NAME_ID, 'ID')],
            [
                new CnSessaoGrupoCamposDetalhe(FORM_TITULO_GENERICO, [
                    CnGrupoCampoDetalhe.obterComoEntityUnica('Informações do colaborador', [
                        new CnCampoDetalhe(this._displayName.nomeCompleto.nomePropriedade, this._displayName.nomeCompleto.valorDisplay),
                        new CnCampoDetalhe(this._displayName.nascimento.nomePropriedadeTxt(), this._displayName.nascimento.valorDisplay),
                        new CnCampoDetalhe(this._displayName.cpf.nomePropriedadeTxt(), this._displayName.cpf.valorDisplay),
                        new CnCampoDetalhe(this._displayName.rg.nomePropriedade, this._displayName.rg.valorDisplay),
                        new CnCampoDetalhe('pis', 'PIS'),
                    ]),
                    CnGrupoCampoDetalhe.obterComoEntityUnica('Informações de contato', [
                        new CnCampoDetalhe(this._displayName.email.nomePropriedade, this._displayName.email.valorDisplay),
                        new CnCampoDetalhe(this._displayName.telefone.nomePropriedadeTxt(), this._displayName.telefone.valorDisplay),
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
                ]),
                new CnSessaoGrupoCamposDetalhe('Dados bancários', [
                    CnGrupoCampoDetalhe.obterComoEntityUnica('Dados Bancários', [
                        new CnCampoDetalhe('dadosBancarios.bancoNome', 'Banco').setarClass('col-md-12'),
                        new CnCampoDetalhe('dadosBancarios.agencia', 'Agência'),
                        new CnCampoDetalhe('dadosBancarios.conta', 'Conta'),
                        new CnCampoDetalhe('dadosBancarios.tipoChavePixTxt', 'Tipo de chave Pix'),
                        new CnCampoDetalhe('dadosBancarios.chavePixTxt', 'Chave Pix'),
                        new CnCampoDetalhe('dadosBancarios.salarioBrutoMensalTxt', 'Salario Bruto Mensal')
                    ]),
                ]),
                new CnSessaoGrupoCamposDetalhe('Informações de acesso', [
                    CnGrupoCampoDetalhe.obterComoEntityUnica('Dados Bancários', [
                        new CnCampoDetalhe('acesso.senha', 'Senha'),
                        new CnCampoDetalhe('acesso.colaboradorStatusTxt', 'Status'),
                    ]),
                ]),
            ]
        )
    }

    private _gerarFormulario(): CnStepperFormModel {
        return new CnStepperFormModel([
              this._gerarInformacaoGeraisEtapa1(),
              this._gerarEnderecoEtapa2(),
            this._gerarDadosBancariosEtapa3(),
              this._gerarAcessoEtapa4(),
        ]);
    }

    private _gerarInformacaoGeraisEtapa1(): CnStepperFormItemModel {
        return new CnStepperFormItemModel('colaborador', FORM_TITULO_GENERICO, [
            new CnGrupoCamposFormulario('', [
                CnFormHelper.obterCampoId(),
                CnInputCvaModel.obterTextoSimples('pis', 'PIS', true),
            ]),
            new CnGrupoCamposFormulario('Informações do paciente', [
                CnFormHelper.obterCampoCpf(this._displayName),
                CnInputCvaModel.obterTextoSimples(this._displayName.rg.nomePropriedade, this._displayName.rg.valorDisplay, true),
                CnInputCvaModel.obterUploadArquivoPorBotao(this._displayName.anexoCpf.nomePropriedade, this._displayName.anexoCpf.valorDisplay, true).setarClassTamanho(TAMANHO_UNICO_6),
                CnInputCvaModel.obterUploadArquivoPorBotao(this._displayName.anexoRg.nomePropriedade, this._displayName.anexoRg.valorDisplay, true).setarClassTamanho(TAMANHO_UNICO_6),

                CnFormHelper.obterCampoNomeCompleto(),
                CnInputCvaModel.obterData(this._displayName.nascimento.nomePropriedade, this._displayName.nascimento.valorDisplay, true),
            ]),
            new CnGrupoCamposFormulario('Informações de contato', [
                CnInputCvaModel.obterEmail(this._displayName.email.nomePropriedade, this._displayName.email.valorDisplay, true),
<<<<<<< HEAD
                CnFormHelper.gerarCampoTelefone(),
=======
                CnInputCvaModel.obterTextoSimplesComMask(this._displayName.telefone.nomePropriedade, this._displayName.telefone.valorDisplay, true, TELEFONE_CELULAR_MASK),
>>>>>>> 06c46fac283d3cbe4a556d36765dd1d5979b5a81
            ]),
        ])
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

        return new CnStepperFormItemModel('dadosBancarios', 'Dados bancários', [
            new CnGrupoCamposFormulario('Informações da conta bancaria', [
                CnInputCvaModel.obterComboBoxPesquisavel(this._displayName.bancoId.nomePropriedade, this._displayName.bancoId.valorDisplay, true, this._bancoService.buscarPorNome, this._bancoService.buscarPorId),
                CnInputCvaModel.obterTextoSimples(this._displayName.agencia.nomePropriedade, this._displayName.agencia.valorDisplay, true),
                CnInputCvaModel.obterTextoSimples(this._displayName.conta.nomePropriedade, this._displayName.conta.valorDisplay, true),
            ]),
            new CnGrupoCamposFormulario('Pix', [
                CnInputCvaModel.obterCombobox(this._displayName.tipoChavePix.nomePropriedade, this._displayName.tipoChavePix.valorDisplay, true, ColaboradorBuilder.obterOpcoesCampoTipoChavePix())
                    .addEventoAoCarregarFormulario(this._definirMascarChavePixPorTipoChave(campoChavePix)),
                campoChavePix,
            ]),
            new CnGrupoCamposFormulario('Remuneração', [
                CnInputCvaModel.obterTextoSimplesComMask(this._displayName.salarioBrutoMensal.nomePropriedade, this._displayName.salarioBrutoMensal.valorDisplay, true, '0.000'),
            ])
        ]);
    }

    private _gerarAcessoEtapa4(): CnStepperFormItemModel {
        return new CnStepperFormItemModel('acesso', 'Informações de acesso', [
            new CnGrupoCamposFormulario('', [
                CnFormHelper.obterCampoSenha().setarClassTamanho(TAMANHO_CENTRALIZADO_1),
                CnInputCvaModel.obterCombobox(this._displayName.colaboradorStatus.nomePropriedade, this._displayName.colaboradorStatus.valorDisplay, true, ColaboradorBuilder.obterOpcaoPadraoAtivoCampoStatusColaborador()).setarClassTamanho(TAMANHO_CENTRALIZADO_1)
            ])
        ])
    }

    private _gerarItensListagem = (): CnItemListagemExibicao[] => {
        return [
            new CnItemListagemExibicao(this._displayName.colaboradorStatus.nomePropriedadeTxt(), this._displayName.colaboradorStatus.valorDisplay, this._definirCssStatusListagem()),
            new CnItemListagemExibicao(this._displayName.nome.nomePropriedade, this._displayName.nome.valorDisplay + ' do colaborador'),
            new CnItemListagemExibicao(this._displayName.cpf.nomePropriedadeTxt(), this._displayName.cpf.valorDisplay),
            new CnItemListagemExibicao(this._displayName.email.nomePropriedade, this._displayName.email.valorDisplay),
            new CnItemListagemExibicao(this._displayName.telefone.nomePropriedadeTxt(), this._displayName.telefone.valorDisplay),
            new CnItemListagemExibicao(this._displayName.nascimento.nomePropriedadeTxt(), this._displayName.nascimento.valorDisplay),
        ]
    }

    private _addBtnAlterarStatus(model: CnCrudModel) {
        model.addBtnNaListagemExibicao(
            'Alterar Status',
            (entityId, params) => {
                model.abrirModalDeFormularioPorBotao(
                    this._matDialog,
                    ColaboradorAlterarStatusComponent,
                    { data: { entityId } }
                );
            },
            'autorenew'
        );
    }

    private _definirCssStatusListagem(): ((itemListagem: any) => string) {
        return (entity: any) => {
            switch (entity.colaboradorStatus) {
                case ETipoStatusColaborador.Ferias:
                    return 'listagem-em-ferias-item';
                case ETipoStatusColaborador.Ativo:
                    return 'listagem-ativo-item';
                case ETipoStatusColaborador.Inativo:
                    return 'listagem-inativo-item';
                default:
                    return 'erro-' + entity.colaboradorStatus;
            }
        }
    }

    private _gerarRotaIndex(): string {
        return RouterHelper.formarRota([ROTA_MODULO.colaborador, ROTA_COMPLEMENTO.indexModulo]);
    }

    private _gerarPesquisa(): CnPesquisaModel {
        return CnPesquisaModel.ObterPesquisaModel(this._service.buscarAvancado, [
            CnInputCvaModel.obterTextoSimples('nome', 'Pesquisar', false, 200, 0).setarClassTamanho(TAMANHO_RESPONSIVO_3),
            CnInputCvaModel.obterCombobox(this._displayName.colaboradorStatus.nomePropriedade, this._displayName.colaboradorStatus.valorDisplay, false, [{ id: '', nome: 'Todos' }, ...ColaboradorBuilder.obterOpcoesCampoStatusColaborador()]).setarClassTamanho(TAMANHO_RESPONSIVO_3)
        ]);
    }

    static obterOpcoesCampoStatusColaborador(): OpcaoCombobox[] {
        return [
            new OpcaoCombobox(ETipoStatusColaborador.Ativo, 'Ativo'),
            new OpcaoCombobox(ETipoStatusColaborador.Ferias, 'Em férias'),
            new OpcaoCombobox(ETipoStatusColaborador.Inativo, 'Inativo'),
        ];
    }

    static obterOpcaoPadraoAtivoCampoStatusColaborador(): OpcaoCombobox[] {
        return [
            new OpcaoCombobox(ETipoStatusColaborador.Ativo, 'Ativo'),
        ];
    }

    static obterOpcoesCampoTipoChavePix(): OpcaoCombobox[] {
        return [
            new OpcaoCombobox(EChavePix.Cpf, 'CPF'),
            new OpcaoCombobox(EChavePix.Cnpj, 'CNPJ'),
            new OpcaoCombobox(EChavePix.Telefone, 'Telefone'),
        ];
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

    private _mapearEntradaStringParaLista(): (valorControl: any) => ICnInputCvaValorImbutir {
        return (valorControl) => {
            return { valorImbutir: StringHelper.converterStringEmLista(valorControl, '-') };
        };
    }
<<<<<<< HEAD
=======

>>>>>>> 06c46fac283d3cbe4a556d36765dd1d5979b5a81
}

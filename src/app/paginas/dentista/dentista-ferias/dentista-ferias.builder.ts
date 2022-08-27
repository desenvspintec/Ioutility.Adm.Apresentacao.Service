import { IDENTIFICADOR_DE_PESQUISA_DENTISTA } from './../dentista.constant';
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
import { CnItemListagemExibicao } from 'src/app/shared/cn-components/model/cn-item-listagem-exibicao';
import { CnStepperFormItemModel } from 'src/app/shared/cn-components/model/cn-stepper-form-item.model';
import { CnStepperFormModel } from 'src/app/shared/cn-components/model/cn-stepper-form.model';
import { CnFormHelper } from 'src/app/shared/cn-helpers/cn-form-helper';
import { RouterHelper } from 'src/app/shared/cn-helpers/cn-router-helper';
import { TAMANHO_RESPONSIVO_3 } from 'src/app/shared/constants/css-class-tamanhos';
import { CONTROL_NAME_ID, FORM_TITULO_GENERICO } from 'src/app/shared/constants/forms-contante';
import { ROTA_MODULO } from 'src/app/shared/constants/routes-constant';
import { IDisplayNameItem } from 'src/app/shared/models/display-name-item';
import { IEntityBasica } from 'src/app/shared/models/entity-basica';
import { DisplayNameService } from 'src/app/shared/services/display-name.service';

import { ITENS_DENTISTA_SUBMENU } from '../dentista.constant';
import { ETipoStatusDentistaFerias } from './../dentista.model';
import { DentistaService } from './../dentista.service';
import { DentistaFeriasService } from './dentista-ferias.service';
import { FeriasAlterarStatusComponent } from './ferias-alterar-status/ferias-alterar-status.component';

export class DentistaFeriasBuilder {

    _displayName!: IDisplayNameItem;
    constructor(
        private _service: DentistaFeriasService,
        private _matDialog: MatDialog,
        private _displayNameService: DisplayNameService,
        private _dentistaService: DentistaService
    ) {
        this._displayName = this._displayNameService.itens!;
    }

    gerarModelComponent = (): CnCrudModel => {
        const model = new CnCrudModel(
            this._gerarRotaFerias(),
            'Dentista',
            this._gerarPesquisaFerias(),
            this._service,
            this._gerarItensListagemFerias(),
            this._gerarFormularioFerias(),
            this._gerarDetalhes(),
        );
        model.setTipoFormularioParaModal();
        model.addBtnAtualizarModal(this._matDialog);
        this._addBtnAlterarStatus(model);
        model.addBtnInativar(this._matDialog);
        model.setarTitulosPersonalizados('Programar ', 'Editar ');

        this._definirSubmenu(model);

        return model;
    }

    private _definirSubmenu(model: CnCrudModel) {
        model.setSubmenu(ITENS_DENTISTA_SUBMENU);
    }

    private _gerarFormularioFerias(): CnStepperFormModel {
        return new CnStepperFormModel([
            this._gerarInformacaoProgramarFerias(),
        ])
    }

    private _gerarInformacaoProgramarFerias(): CnStepperFormItemModel {
        return new CnStepperFormItemModel('', 'Programar Ferias', [
            new CnGrupoCamposFormulario('Férias', [
                CnFormHelper.obterCampoId(),
                CnInputCvaModel.obterComboBoxPesquisavel('dentistaId', 'Dentista', true, this._dentistaService.buscarPorNome, this._dentistaService.buscarPorId as ((palavraChave: string) => Observable<IEntityBasica>)),
                CnInputCvaModel.obterApenasNumero(this._displayName.quantidadeDias.nomePropriedade, this._displayName.quantidadeDias.valorDisplay, true),
                CnInputCvaModel.obterData(this._displayName.dataInicio.nomePropriedade, this._displayName.dataInicio.valorDisplay, true),
                CnInputCvaModel.obterData(this._displayName.dataFim.nomePropriedade, 'Data de término', true),
            ])
        ])
    }

    private _gerarItensListagemFerias = (): CnItemListagemExibicao[] => {
        return [
            new CnItemListagemExibicao(this._displayName.feriasStatus.nomePropriedadeTxt(), this._displayName.feriasStatus.valorDisplay, this._definirCssStatusListagem()),
            new CnItemListagemExibicao(this._displayName.nome.nomePropriedade, this._displayName.nome.valorDisplay),
            new CnItemListagemExibicao(this._displayName.dataInicio.nomePropriedadeTxt(), this._displayName.dataInicio.valorDisplay),
            new CnItemListagemExibicao(this._displayName.dataFim.nomePropriedadeTxt(), this._displayName.dataFim.valorDisplay),
            new CnItemListagemExibicao(this._displayName.quantidadeDias.nomePropriedade, this._displayName.quantidadeDias.valorDisplay),
        ]
    }


    private _definirCssStatusListagem(): ((itemListagem: any) => string) {
        return (entity: any) => {
            switch (entity.feriasStatus) {
                case ETipoStatusDentistaFerias.EmFerias:
                    return 'listagem-em-ferias-item';
                case ETipoStatusDentistaFerias.Programada:
                    return 'listagem-programada-item';
                case ETipoStatusDentistaFerias.Cancelada:
                    return 'listagem-inativo-item';
                case ETipoStatusDentistaFerias.Realizada:
                    return 'listagem-ativo-item';
                default:
                    return 'erro-' + entity.feriasStatus;
            }
        }
    }

    private _addBtnAlterarStatus(model: CnCrudModel) {
        model.addBtnNaListagemExibicao(
            'Alterar Status',
            (entityId, params) => {
                model.abrirModalDeFormularioPorBotao(
                    this._matDialog,
                    FeriasAlterarStatusComponent,
                    { data: { entityId } }
                );
            },
            'autorenew'
        );
    }

    private _gerarPesquisaFerias(): CnPesquisaModel {
        return CnPesquisaModel.ObterPesquisaModel(this._service.buscarAvancado, [
            CnInputCvaModel.obterTextoSimples('nome', 'Pesquisar', false, 200, 0).setarClassTamanho(TAMANHO_RESPONSIVO_3),
            CnInputCvaModel.obterCombobox('feriasStatus', 'Status', false, [{ id: '', nome: 'Todos' }, ...DentistaFeriasBuilder.obterOpcoesCampoStatusDentistaFerias()]).setarClassTamanho(TAMANHO_RESPONSIVO_3)
        ], IDENTIFICADOR_DE_PESQUISA_DENTISTA);
    }

    private _gerarRotaFerias(): string {
        return RouterHelper.formarRota([ROTA_MODULO.dentistaFerias]);
    }

    private _gerarDetalhes(): CnBaseDetalheModel {
        return new CnBaseDetalheModel(
            this._service.buscarPorId,
            [new CnCampoDetalhe(CONTROL_NAME_ID, 'ID')],
            [
                new CnSessaoGrupoCamposDetalhe(FORM_TITULO_GENERICO, [
                    CnGrupoCampoDetalhe.obterComoEntityUnica('Informações do dentista', [
                        new CnCampoDetalhe(this._displayName.nomeCompleto.nomePropriedade, this._displayName.nomeCompleto.valorDisplay),
                        new CnCampoDetalhe(this._displayName.nascimento.nomePropriedadeTxt(), this._displayName.nascimento.valorDisplay),
                        new CnCampoDetalhe(this._displayName.cpf.nomePropriedade, this._displayName.cpf.valorDisplay),
                        new CnCampoDetalhe(this._displayName.cnpj.nomePropriedade, this._displayName.cnpj.valorDisplay),
                        new CnCampoDetalhe(this._displayName.cro.nomePropriedade, this._displayName.cro.valorDisplay),
                    ]),
                ]),
            ]);
    }

    static obterOpcoesCampoStatusDentistaFerias(): OpcaoCombobox[] {
        return [
            new OpcaoCombobox(ETipoStatusDentistaFerias.Programada, 'Programada'),
            new OpcaoCombobox(ETipoStatusDentistaFerias.EmFerias, 'Em férias'),
            new OpcaoCombobox(ETipoStatusDentistaFerias.Cancelada, 'Cancelada'),
        ];
    }
}

import { CONTROL_NAME_ID } from 'src/app/shared/constants/forms-contante';
import { Component, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CnInputCvaModel } from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { CnBtnModel } from 'src/app/shared/cn-components/model/cn-btn-model';
import { CnFormBaseComponent } from 'src/app/shared/cn-components/model/cn-form-base-component';
import { CnSubmenu } from 'src/app/shared/cn-components/model/cn-submenu';
import { ANIMAR_ENTRADA } from 'src/app/shared/constants/animacoes.constant';
import { IDisplayNameItem } from 'src/app/shared/models/display-name-item';

import { ITENS_DENTISTA_SUBMENU } from '../dentista.constant';
import { DisplayNameService } from './../../../../shared/services/display-name.service';
import { DentistaIContratoDTO } from './../dentista.model';
import { ContratoEmailFormComponent } from './contrato-email-form/contrato-email-form.component';
import { ContratoService } from './services-contratos/contrato.service';

@Component({
  selector: 'app-dentista-contrato',
  templateUrl: './dentista-contrato.component.html',
  styleUrls: ['./dentista-contrato.component.scss'],
  animations: ANIMAR_ENTRADA
})
export class DentistaContratoComponent extends CnFormBaseComponent {
  btnEnviar: CnBtnModel;
  botaoDeSalvarHabilitado: boolean = false;
  modalFechou = new EventEmitter();
  displayName!: IDisplayNameItem;
  dentistaIContratoDTO?: DentistaIContratoDTO;
  campoId: CnInputCvaModel;
  campoContrato: CnInputCvaModel;

  constructor(formBuilder: FormBuilder, private _matDialog: MatDialog, private _toastrService: ToastrService, private _contratoService: ContratoService, private _displayNameService: DisplayNameService) {
    super(formBuilder);
    this.displayName = _displayNameService.itens!;
    this.campoId = CnInputCvaModel.obterHiddenGuid(CONTROL_NAME_ID);
    this.campoContrato = CnInputCvaModel.obterTextoLongo(this.displayName.contrato.nomePropriedade, '', false, 100);
    this.btnEnviar = CnBtnModel.obterBtnRegistrarPorLink();
  }

  protected addControlsNoFormulario(): void {
    this.addCnInputControlNoForm(this.campoId);
    this.addCnInputControlNoForm(this.campoContrato);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.form.disable();
    this._contratoService.buscarContrato().subscribe({
      next: resultado => {
        if(resultado != null){
          this._setarValoresDosCampos(resultado);
        }
      }
    });
  }

  itensSubmenu(): CnSubmenu[] {
    return ITENS_DENTISTA_SUBMENU;
  }

  abrirModal() {
    const modalAberto = this._matDialog.open(ContratoEmailFormComponent, {
      maxHeight: '600px',
      minWidth: '150px',
      maxWidth: '1024px',
      data: {
        formModel: this.btnEnviar?.formModel,
      }
    });
    modalAberto.afterClosed().subscribe(finalizou => {
      if (finalizou)
        this.modalFechou.emit();
    });
  }

  habilitarBotaoDeSalvar() {
    if (!this.botaoDeSalvarHabilitado) {
      return this.botaoDeSalvarHabilitado = !this.botaoDeSalvarHabilitado;
    }
    return this.botaoDeSalvarHabilitado = !this.botaoDeSalvarHabilitado;
  }

  get mostrarBotaoDeSalvar() {
    return this.botaoDeSalvarHabilitado;
  }

  habilitarEdicao(): boolean {
    if (!this.botaoDeSalvarHabilitado) {
      return this.botaoDeSalvarHabilitado = !this.botaoDeSalvarHabilitado;
    }
    return this.botaoDeSalvarHabilitado;
  }

  editarDocumento() {
    this.habilitarEdicao();
    this.form.enable();
  }

  salvarDocumentoEditado() {
    this.habilitarBotaoDeSalvar();
    this._contratoService.atualizarContrato(this.form.value).subscribe(
      success => {
        this._toastrService.success("Operação realizada com sucesso", "Tudo certo!");
      }
    );
    this.form.disable();
  }

  private _setarValoresDosCampos(dentistaIContratoDTO: DentistaIContratoDTO) {
    this.campoId.setarValor(dentistaIContratoDTO.id);
    this.campoContrato.setarValor(dentistaIContratoDTO.textoContrato);
  }
}

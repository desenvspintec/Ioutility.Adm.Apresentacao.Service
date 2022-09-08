import { CONTROL_NAME_ID } from './../../../../shared/constants/forms-contante';
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
import { DisplayNameService } from 'src/app/shared/services/display-name.service';

import { DentistaIDistratoDTO } from '../dentista.model';
import { ITENS_DENTISTA_SUBMENU } from './../dentista.constant';
import { DistratoService } from './services.distratos/distrato.service';
import { TermoDistratoEmailFormComponent } from './termo-distrato-email-form/termo-distrato-email-form.component';

@Component({
  selector: 'app-dentista-termo-distrato',
  templateUrl: './dentista-termo-distrato.component.html',
  styleUrls: ['./dentista-termo-distrato.component.scss'],
  animations: ANIMAR_ENTRADA
})
export class DentistaTermoDistratoComponent extends CnFormBaseComponent {
  btnEnviar: CnBtnModel;
  botaoDeSalvarHabilitado: boolean = false;
  modalFechou = new EventEmitter();
  displayName!: IDisplayNameItem;
  dentistaIDistratoDTO?: DentistaIDistratoDTO;
  campoId: CnInputCvaModel;
  campoDistrato: CnInputCvaModel;

  constructor(formBuilder: FormBuilder
    , private _matDialog: MatDialog
    , private _toastrService: ToastrService
    , private _distratoService: DistratoService
    , displayNameService: DisplayNameService) {
    super(formBuilder);
    this.displayName = displayNameService.itens!;
    this.campoId = CnInputCvaModel.obterHiddenGuid(CONTROL_NAME_ID);
    this.campoDistrato = CnInputCvaModel.obterTextoLongo(this.displayName.distrato.nomePropriedade, '', false, 50);
    this.btnEnviar = CnBtnModel.obterBtnRegistrarPorLink();
  }

  protected addControlsNoFormulario(): void {
    this.addCnInputControlNoForm(this.campoId);
    this.addCnInputControlNoForm(this.campoDistrato);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.form.disable();
    this._distratoService.buscarDistrato().subscribe({
      next: resultado => {
        if (resultado != null) {
          this._setarValoresDosCampos(resultado);
        }
      }
    });
  }

  itensSubmenu(): CnSubmenu[] {
    return ITENS_DENTISTA_SUBMENU;
  }

  abrirModal() {
    const modalAberto = this._matDialog.open(TermoDistratoEmailFormComponent, {
      maxHeight: '600px',
      minWidth: '150px',
      maxWidth: '1024px',
      data: {
        formModel: this.btnEnviar?.formModel
      }
    });
    modalAberto.afterClosed().subscribe(finalizou => {
      if (finalizou)
        this.modalFechou.emit();
    });
  }

  habilitarBotaoDeSalvar() {
    if (!this.botaoDeSalvarHabilitado) { return this.botaoDeSalvarHabilitado = !this.botaoDeSalvarHabilitado; }
    return this.botaoDeSalvarHabilitado = !this.botaoDeSalvarHabilitado;
  }

  get mostrarBotaoDeSalvar() {
    return this.botaoDeSalvarHabilitado;
  }

  habilitarEdicao(): boolean {
    if (!this.botaoDeSalvarHabilitado)
      return this.botaoDeSalvarHabilitado = !this.botaoDeSalvarHabilitado;
    return this.botaoDeSalvarHabilitado;
  }

  editarDocumento() {
    this.habilitarEdicao();
    this.form.enable();
  }

  salvarDocumentoEditado() {
    this.habilitarBotaoDeSalvar();
    this._distratoService.atualizarDistrato(this.form.value).subscribe(
      success => {
        this._toastrService.success("Operação realizada com sucesso", "Tudo certo!");
      }
    );
    this.form.disable();
  }

  private _setarValoresDosCampos(dentistaIDistratoDTO: DentistaIDistratoDTO) {
    this.campoId.setarValor(dentistaIDistratoDTO.id);
    this.campoDistrato.setarValor(dentistaIDistratoDTO.textoDistrato);
  }
}

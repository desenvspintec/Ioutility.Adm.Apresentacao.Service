import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CnInputCvaModel } from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { CnGrupoCamposFormulario } from 'src/app/shared/cn-components/model/cn-grupo-campos-formulario';

import { DentistaService } from '../dentista.service';
import { CnFormBaseModel } from './../../../shared/cn-components/model/cn-form-base-model';
import { TAMANHO_UNICO_12 } from './../../../shared/constants/css-class-tamanhos';
import { DentistaBuilder } from './../dentista.builder';

@Component({
  templateUrl: './dentista-alterar-status.component.html',
})
export class DentistaAlterarStatusComponent implements OnInit {

  formModel: CnFormBaseModel;
  constructor(public dialogRef: MatDialogRef<DentistaAlterarStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, dentistaService: DentistaService) {
    this.formModel = CnFormBaseModel.obterAtualizar('', 'Atualizar Status', data.entityId, dentistaService.buscarStatusPorId, dentistaService.atualizarStatus, [
      new CnGrupoCamposFormulario('', [
        CnInputCvaModel.obterHiddenGuid('id'),
        CnInputCvaModel.obterCombobox('dentistaStatus', 'Selecione um novo status', true, DentistaBuilder.obterOpcoesCampoStatusDentista()).setarClassTamanho(TAMANHO_UNICO_12)
      ])
    ]);
    this.formModel.definirModal(dialogRef);
  }

  ngOnInit(): void {
  }

}

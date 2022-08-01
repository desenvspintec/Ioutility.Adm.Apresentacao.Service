import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CnInputCvaModel } from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';

import { DentistaFeriasService } from '../dentista-ferias.service';
import { CnFormBaseModel } from './../../../../shared/cn-components/model/cn-form-base-model';
import { CnGrupoCamposFormulario } from './../../../../shared/cn-components/model/cn-grupo-campos-formulario';
import { TAMANHO_UNICO_12 } from './../../../../shared/constants/css-class-tamanhos';
import { DentistaFeriasBuilder } from './../dentista-ferias.builder';

@Component({
  templateUrl: './ferias-alterar-status.component.html',
})
export class FeriasAlterarStatusComponent implements OnInit {

  formModel: CnFormBaseModel;
  constructor(public dialogRef: MatDialogRef<FeriasAlterarStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, feriasService: DentistaFeriasService) {
      this.formModel = CnFormBaseModel.obterAtualizar('', 'Atualizar Status', data.entityId, feriasService.buscarStatusPorId, feriasService.atualizarStatus, [
        new CnGrupoCamposFormulario('', [
          CnInputCvaModel.obterHiddenGuid('id'),
          CnInputCvaModel.obterCombobox('feriasStatus', 'Selecione um novo status', true, DentistaFeriasBuilder.obterOpcoesCampoStatusDentistaFerias()).setarClassTamanho(TAMANHO_UNICO_12)
        ])
      ]);
      this.formModel.definirModal(dialogRef);
     }

  ngOnInit(): void {
  }

}

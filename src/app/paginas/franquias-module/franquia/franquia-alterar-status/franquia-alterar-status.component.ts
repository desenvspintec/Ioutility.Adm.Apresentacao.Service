import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CnInputCvaModel } from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { CnGrupoCamposFormulario } from 'src/app/shared/cn-components/model/cn-grupo-campos-formulario';

import { FranquiaService } from '../franquia.service';
import { CnFormBaseModel } from '../../../../shared/cn-components/model/cn-form-base-model';
import { TAMANHO_UNICO_12 } from '../../../../shared/constants/css-class-tamanhos';
import { FranquiaBuilder } from '../franquia.builder';

@Component({
  templateUrl: './franquia-alterar-status.component.html',
})
export class FranquiaAlterarStatusComponent implements OnInit {

  formModel: CnFormBaseModel;
  constructor(public dialogRef: MatDialogRef<FranquiaAlterarStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, franquiaService: FranquiaService) {
    this.formModel = CnFormBaseModel.obterAtualizar('', 'Atualizar Status', data.entityId, franquiaService.buscarStatusPorId, franquiaService.atualizarStatus, [
      new CnGrupoCamposFormulario('', [
        CnInputCvaModel.obterHiddenGuid('id'),
        CnInputCvaModel.obterCombobox('franquiaStatus', 'Selecione um novo status', true, FranquiaBuilder.obterOpcoesCampoStatusFranquia()).setarClassTamanho(TAMANHO_UNICO_12)
      ])
    ]);
    this.formModel.definirModal(dialogRef);
  }

  ngOnInit(): void {
  }

}

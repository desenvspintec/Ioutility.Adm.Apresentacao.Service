import { TAMANHO_UNICO_12 } from './../../../../shared/constants/css-class-tamanhos';
import { ColaboradorBuilder } from './../colaborador.builder';
import { ColaboradorService } from './../colaborador.service';
import { CnFormBaseModel } from './../../../../shared/cn-components/model/cn-form-base-model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CnGrupoCamposFormulario } from 'src/app/shared/cn-components/model/cn-grupo-campos-formulario';
import { CnInputCvaModel } from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';

@Component({
  selector: 'app-colaborador-alterar-status',
  templateUrl: './colaborador-alterar-status.component.html'
})
export class ColaboradorAlterarStatusComponent implements OnInit {

  formModel: CnFormBaseModel;
  constructor(public dialogRef: MatDialogRef<ColaboradorAlterarStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, colaboradorService: ColaboradorService) {
    this.formModel = CnFormBaseModel.obterAtualizar('', 'Atualizar Status', data.entityId, colaboradorService.buscarStatusPorId, colaboradorService.atualizarStatus, [
      new CnGrupoCamposFormulario('', [
        CnInputCvaModel.obterHiddenGuid('id'),
        CnInputCvaModel.obterCombobox('colaboradorStatus', 'Selecione um novo status', true, ColaboradorBuilder.obterOpcoesCampoStatusColaborador()).setarClassTamanho(TAMANHO_UNICO_12)
      ])
    ]);
    this.formModel.definirModal(dialogRef);
  }

  ngOnInit(): void {
  }

}

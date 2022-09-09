import { TAMANHO_UNICO_12 } from './../../../../../shared/constants/css-class-tamanhos';
import { PacienteService } from './../../paciente.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CnFormBaseModel } from './../../../../../shared/cn-components/model/cn-form-base-model';
import { Component, OnInit, Inject } from '@angular/core';
import { CnGrupoCamposFormulario } from 'src/app/shared/cn-components/model/cn-grupo-campos-formulario';
import { CnInputCvaModel } from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { PacienteBuilder } from '../../paciente.builder';

@Component({
  templateUrl: './paciente-alterar-status.component.html',
  styleUrls: ['./paciente-alterar-status.component.scss']
})
export class PacienteAlterarStatusComponent implements OnInit {

  formModel: CnFormBaseModel;
  constructor(public dialogRef: MatDialogRef<PacienteAlterarStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, pacienteService: PacienteService) {
    this.formModel = CnFormBaseModel.obterAtualizar('', 'Atualizar Status', data.entityId, pacienteService.buscarStatusPorId, pacienteService.atualizarStatus, [
      new CnGrupoCamposFormulario('', [
        CnInputCvaModel.obterHiddenGuid('id'),
        CnInputCvaModel.obterCombobox('pacienteStatus', 'Selecione um novo status', true, PacienteBuilder.obterOpcoesCampoStatusPaciente()).setarClassTamanho(TAMANHO_UNICO_12)
      ])
    ]);
    this.formModel.definirModal(dialogRef);
  }

  ngOnInit(): void {
  }

}

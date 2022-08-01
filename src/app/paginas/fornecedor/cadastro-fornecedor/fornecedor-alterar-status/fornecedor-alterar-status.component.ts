import { FornecedorBuilder } from './../../fornecedor.builder';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { CnFormBaseModel } from 'src/app/shared/cn-components/model/cn-form-base-model';
import { FornecedorService } from '../../fornecedor.service';
import { CnGrupoCamposFormulario } from 'src/app/shared/cn-components/model/cn-grupo-campos-formulario';
import { CnInputCvaModel } from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { TAMANHO_UNICO_12 } from 'src/app/shared/constants/css-class-tamanhos';

@Component({
  selector: 'app-fornecedor-alterar-status',
  templateUrl: './fornecedor-alterar-status.component.html',
})
export class FornecedorAlterarStatusComponent implements OnInit {

  formModel: CnFormBaseModel;
  constructor(public dialogRef: MatDialogRef<FornecedorAlterarStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, fornecedorService: FornecedorService) {
      this.formModel = CnFormBaseModel.obterAtualizar('', 'Atualizar Status', data.entityId, fornecedorService.buscarStatusPorId, fornecedorService.atualizarStatus, [
        new CnGrupoCamposFormulario('', [
          CnInputCvaModel.obterHiddenGuid('id'),
          CnInputCvaModel.obterCombobox('fornecedorStatus', 'Selecione um novo status', false, FornecedorBuilder.obterOpcoesCampoStatusFornecedor()).setarClassTamanho(TAMANHO_UNICO_12)
        ])
      ]);
      this.formModel.definirModal(dialogRef);
     }

  ngOnInit(): void {
  }

}

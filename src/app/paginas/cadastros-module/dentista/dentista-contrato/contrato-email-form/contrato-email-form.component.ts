import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CnInputCvaModel } from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { CnFormBaseModel } from 'src/app/shared/cn-components/model/cn-form-base-model';
import { IEntityBasica } from 'src/app/shared/models/entity-basica';

import { CnGrupoCamposFormulario } from '../../../../../shared/cn-components/model/cn-grupo-campos-formulario';
import { ANIMAR_ENTRADA } from '../../../../../shared/constants/animacoes.constant';

import { DentistaService } from '../../dentista.service';
import { DentistaContratoService } from '../dentista-contrato.service';

@Component({
  selector: 'app-dentista-contrato-form',
  templateUrl: './contrato-email-form.component.html',
  animations: ANIMAR_ENTRADA
})
export class ContratoEmailFormComponent implements OnInit {

  formModel: CnFormBaseModel;
  constructor(public dialogRef: MatDialogRef<ContratoEmailFormComponent>,
    private _dentistaService: DentistaService,
    private _service: DentistaContratoService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    const campoEmailDentista = CnInputCvaModel.obterTextoSimples('dentistaEmail', 'E-mail', true);
    this.formModel = CnFormBaseModel.obterRegistrar('', 'Enviar contrato por e-mail', this._service.registrar, [
      new CnGrupoCamposFormulario('', [
        this.gerarCampoDentistaId(campoEmailDentista),
        campoEmailDentista,
        CnInputCvaModel.obterTextoLongo('observacoes', 'Observações', false),
      ])
    ], '', '');
    this.formModel.definirModal(dialogRef);
  }
  private gerarCampoDentistaId(campoEmailDentista: CnInputCvaModel): CnInputCvaModel {
    return CnInputCvaModel.obterComboBoxPesquisavel('dentistaId', 'Dentista', true, this._dentistaService.buscarPorNome, this._dentistaService.buscarPorId as ((palavraChave: string) => Observable<IEntityBasica>))
      .addEventoAoCarregarFormulario(this._setarEmailDoDentista(campoEmailDentista));
  }

  ngOnInit(): void {
  }

  private _setarEmailDoDentista(campoDentista: CnInputCvaModel): (form: FormGroup) => void {
    return (form) => {
      const control = form.get('dentistaId');
      control!.valueChanges.subscribe({
        next: (dentistaId: any) => {
          if (!dentistaId) return;
          this._dentistaService.buscarPorId(dentistaId).subscribe({
            next: (dentistaEmail: any) => {
               campoDentista.setarValor(dentistaEmail.email);
            }
          });
        }
      });
    }
  }
}

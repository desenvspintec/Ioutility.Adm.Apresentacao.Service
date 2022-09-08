import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CnInputCvaModel } from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { CnFormBaseModel } from 'src/app/shared/cn-components/model/cn-form-base-model';
import { CnGrupoCamposFormulario } from 'src/app/shared/cn-components/model/cn-grupo-campos-formulario';
import { ANIMAR_ENTRADA } from 'src/app/shared/constants/animacoes.constant';
import { IEntityBasica } from 'src/app/shared/models/entity-basica';

import { DentistaService } from '../../dentista.service';
import { DentistaTermoDistratoService } from '../dentista-termo-distrato.service';

@Component({
  selector: 'app-termo-distrato-email-form',
  templateUrl: './termo-distrato-email-form.component.html',
  animations: ANIMAR_ENTRADA
})
export class TermoDistratoEmailFormComponent implements OnInit {
  formModel: CnFormBaseModel;

  constructor(public dialogRef: MatDialogRef<TermoDistratoEmailFormComponent>,
    private _dentistaService: DentistaService,
    private _service: DentistaTermoDistratoService,
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
    return CnInputCvaModel.obterComboBoxPesquisavel('dentistaId', 'Dentista', true, this._dentistaService.buscarAvancado, this._dentistaService.buscarPorId as ((palavraChave: string) => Observable<IEntityBasica>))
      .addEventoAoCarregarFormulario(this._setarEmailDoDentista(campoEmailDentista));
  }

  private _setarEmailDoDentista(campoDentista: CnInputCvaModel): (form: FormGroup) => void {
    return (form) => {
      const control = form.get('dentistaId');
      control!.valueChanges.subscribe({
        next: (valor: any) => {
          if (!valor) return;
          this._dentistaService.buscarPorId(valor).subscribe({
            next: (email: any) => {
              return campoDentista.setarValor(email.email);
            }
          });
        }
      });
    }
  }
  ngOnInit(): void {
  }
}

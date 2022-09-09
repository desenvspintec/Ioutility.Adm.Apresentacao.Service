import { IDisplayNameItem } from 'src/app/shared/models/display-name-item';
import { DisplayNameService } from 'src/app/shared/services/display-name.service';
import { ANIMAR_ENTRADA } from 'src/app/shared/constants/animacoes.constant';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CnInputCvaModel } from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { CnFormBaseModel } from 'src/app/shared/cn-components/model/cn-form-base-model';
import { CnGrupoCamposFormulario } from 'src/app/shared/cn-components/model/cn-grupo-campos-formulario';
import { IEntityBasica } from 'src/app/shared/models/entity-basica';

import { DentistaService } from './../../dentista.service';
import { DentistaRegistroFaltaService } from './../dentista-registro-falta.service';

@Component({
  selector: 'app-adicionar-falta-form',
  templateUrl: './adicionar-falta-form.component.html',
  styleUrls: ['./adicionar-falta-form.component.scss'],
  animations: ANIMAR_ENTRADA
})
export class AdicionarFaltaFormComponent implements OnInit {

  formModel: CnFormBaseModel;
  displayName!: IDisplayNameItem; 
  constructor(public dialogRef: MatDialogRef<AdicionarFaltaFormComponent>,
    private _service: DentistaRegistroFaltaService,
    private _dentistaService: DentistaService,
    private _displayNameService: DisplayNameService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.displayName = this._displayNameService.itens!;
    this.formModel = CnFormBaseModel.obterRegistrar('', 'Falta', this._service.registrar, [
      new CnGrupoCamposFormulario('', [
        CnInputCvaModel.obterComboBoxPesquisavel('dentistaId', 'Dentista', true, this._dentistaService.buscarAvancado, this._dentistaService.buscarPorId as ((palavraChave: string) => Observable<IEntityBasica>)),
        CnInputCvaModel.obterData(this.displayName.dataFalta.nomePropriedade, this.displayName.dataFalta.valorDisplay, false),
        CnInputCvaModel.obterHora(this.displayName.horarioInicio.nomePropriedade, this.displayName.horarioInicio.valorDisplay, false),
        CnInputCvaModel.obterHora(this.displayName.horarioFim.nomePropriedade, this.displayName.horarioFim.valorDisplay, false),
        CnInputCvaModel.obterCheckbox(this.displayName.ausenteDiaTodo.nomePropriedade, this.displayName.ausenteDiaTodo.valorDisplay),
      ])
    ], '', '');
    this.formModel.definirModal(dialogRef);
   }

  ngOnInit(): void {
  }

}

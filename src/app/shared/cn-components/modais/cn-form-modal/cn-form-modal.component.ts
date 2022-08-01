import { CnFormInativarModel } from './../../model/cn-form-inativar-model';
import { Component, OnInit, Inject } from '@angular/core';
import { CnFormBaseModel } from '../../model/cn-form-base-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cn-form-modal',
  templateUrl: './cn-form-modal.component.html',
  styleUrls: ['./cn-form-modal.component.css']
})
export class CnFormModalComponent implements OnInit {

  model: CnFormBaseModel | CnFormInativarModel;
  constructor(public dialogRef: MatDialogRef<CnFormModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CnFormBaseModel) {
                this.model = this.data.definirModal(this.dialogRef);
              }

  ngOnInit(): void {
  }

  modoRegistrarOuAtualizar(): boolean {
    return this.model instanceof CnFormBaseModel;
  }
  modoInativar(): boolean {
    return this.model instanceof CnFormInativarModel
  }

  modelInativar(): CnFormInativarModel {
    return this.model as CnFormInativarModel;
  }
  formBaseModel(): CnFormBaseModel {
    return this.model as CnFormBaseModel;
  }
}

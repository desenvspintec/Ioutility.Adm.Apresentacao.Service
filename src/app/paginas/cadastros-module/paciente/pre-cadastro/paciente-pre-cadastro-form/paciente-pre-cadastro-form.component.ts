import { PacienteService } from './../../paciente.service';
import { Component, OnInit } from '@angular/core';
import { CnStepperFormBaseComponent } from 'src/app/shared/cn-components/model/cn-stepper-form-base-component';

@Component({
  selector: 'app-paciente-pre-cadastro-form',
  templateUrl: './paciente-pre-cadastro-form.component.html'
})
export class PacientePreCadastroFormComponent extends CnStepperFormBaseComponent implements OnInit {

  constructor (service: PacienteService){
    super(service);
  }


}

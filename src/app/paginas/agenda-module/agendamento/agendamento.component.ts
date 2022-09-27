import { Component, OnInit } from '@angular/core';
import { CnPesquisaModel } from 'src/app/shared/cn-components/cn-pesquisa/cn-pesquisa.model';
import { CnInputCvaModel } from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';
import { CnBtnModel } from 'src/app/shared/cn-components/model/cn-btn-model';
import { ANIMAR_ENTRADA } from 'src/app/shared/constants/animacoes.constant';
import { TAMANHO_RESPONSIVO_3 } from 'src/app/shared/constants/css-class-tamanhos';
import { CONTROL_NAME_ID } from 'src/app/shared/constants/forms-contante';
import { DentistaService } from '../../cadastros-module/dentista/dentista.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss'],
  animations: ANIMAR_ENTRADA,
})
export class AgendamentoComponent implements OnInit {
  btnRegistrar?: CnBtnModel;
  formModelPesquisa: CnPesquisaModel;

  constructor(private _dentistaService: DentistaService) {
    this.formModelPesquisa = this._camposDePesquisa();
  }

  private _camposDePesquisa(): CnPesquisaModel {
    return CnPesquisaModel.ObterPesquisaModel(
      this._dentistaService.buscarFalta,
      [
        CnInputCvaModel.obterHiddenGuid(CONTROL_NAME_ID),
        CnInputCvaModel.obterTextoSimples(
          'nome',
          'Pesquisar',
          false,
          200,
          0
        ).setarClassTamanho(TAMANHO_RESPONSIVO_3),
      ]
    );
  }

  ngOnInit(): void {
    this.verificaHora();
  }

  dentistas: any[] = [
    {
      nome: 'Sergio',
      paciente: 'Joao',
      horarioAtendimento: '09:00',
    },
    {
      nome: 'Maria',
      paciente: 'Larissa',
      horarioAtendimento: '10:00',
    },
    {
      nome: 'Albertina',
      paciente: 'Cleber',
      horarioAtendimento: '11:00',
    },
  ];

  horariosAtendimento: String[] = [
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
  ];

  verificaHora(): boolean {
    for (let i = 0; i <= this.horariosAtendimento.length; i++) {
      for (let atendimento of this.dentistas) {
        if (this.horariosAtendimento === atendimento.horarioAtendimento) {
          return true;
        }
      }
    }
    return false;
  }

  marcarHorario(verificaHora: boolean){
    if(verificaHora){
      return this.horariosAtendimento;
    }
    return null;
  }
}

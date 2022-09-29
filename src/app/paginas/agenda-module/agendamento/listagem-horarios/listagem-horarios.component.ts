import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listagem-horarios',
  templateUrl: './listagem-horarios.component.html',
  styleUrls: ['./listagem-horarios.component.scss'],
})
export class ListagemHorariosComponent implements OnInit {
  private _horaEstaValidaComZeroMinutos: boolean = false;
  private _horaEstaValidaComTrintaMinutos: boolean = false;
  private _detalhesDoAtendimentoComHoraDeZeroMinutos: string = '';
  private _detalhesDoAtendimentoComHoraDeTrintaMinutos: string = '';
  constructor(
  ) {
  }

  dentistas: Dentista[] = [
    {
      nome: 'Dr. Sergio',
      atendimentos: [
        {
          paciente: 'Joao',
          horarioInicioAtendimento: '09:00',
          horarioFimAtendimento: '10:30',
        },
        {
          paciente: 'Alfredo',
          horarioInicioAtendimento: '10:30',
          horarioFimAtendimento: '11:30',
        },
        {
          paciente: 'Mariana',
          horarioInicioAtendimento: '15:30',
          horarioFimAtendimento: '16:30',
        },
        {
          paciente: 'Rosana',
          horarioInicioAtendimento: '16:30',
          horarioFimAtendimento: '18:30',
        },
      ],
    },
    {
      nome: 'Dr. Marta',
      atendimentos: [
        {
          paciente: 'Joao',
          horarioInicioAtendimento: '03:00',
          horarioFimAtendimento: '03:30',
        },
        {
          paciente: 'Alfredo',
          horarioInicioAtendimento: '14:00',
          horarioFimAtendimento: '14:30',
        },
        {
          paciente: 'Mariana',
          horarioInicioAtendimento: '15:00',
          horarioFimAtendimento: '15:30',
        },
        {
          paciente: 'Rosana',
          horarioInicioAtendimento: '20:00',
          horarioFimAtendimento: '20:30',
        },
      ],
    },
    {
      nome: 'Dr. Regina',
      atendimentos: [
        {
          paciente: 'Joao',
          horarioInicioAtendimento: '07:00',
          horarioFimAtendimento: '07:30',
        },
        {
          paciente: 'Alfredo',
          horarioInicioAtendimento: '11:00',
          horarioFimAtendimento: '11:30',
        },
        {
          paciente: 'Mariana',
          horarioInicioAtendimento: '21:00',
          horarioFimAtendimento: '21:30',
        },
        {
          paciente: 'Rosana',
          horarioInicioAtendimento: '19:00',
          horarioFimAtendimento: '19:30',
        },
      ],
    },
    {
      nome: 'Dr. Albertonio',
      atendimentos: [
        {
          paciente: 'Joao',
          horarioInicioAtendimento: '09:00',
          horarioFimAtendimento: '09:30',
        },
        {
          paciente: 'Alfredo',
          horarioInicioAtendimento: '10:00',
          horarioFimAtendimento: '10:30',
        },
        {
          paciente: 'Mariana',
          horarioInicioAtendimento: '15:00',
          horarioFimAtendimento: '15:30',
        },
        {
          paciente: 'Rosana',
          horarioInicioAtendimento: '17:00',
          horarioFimAtendimento: '17:30',
        },
      ],
    },
  ];

  private _ehHoraComMinutosDiferenteDeZero(horario: any): boolean {
    return horario.substring(3, 5) !== '00' ? true : false;
  }

  trocaZeroMinutosPorTrintaMinutos(horario: any){
    return horario = horario.replace("00", "30");
  }

  get getInicioAtendimentoHoraComZeroMinutos(): string {
    return this._detalhesDoAtendimentoComHoraDeZeroMinutos;
  }
  get getInicioAtendimentoHoraComTrintaMinutos(): string {
    return this._detalhesDoAtendimentoComHoraDeTrintaMinutos;
  }

  get retornaSeHoraComZeroMinutosEstaValido(): boolean {
    return this._horaEstaValidaComZeroMinutos;
  }
  get retornaSeHoraComTrintaMinutosEstaValido(): boolean {
    return this._horaEstaValidaComTrintaMinutos;
  }

  verificaHoraDeInicioDoAtendimento(horario: any): string {
    for (let dentista of this.dentistas) {
      for (let atendimento of dentista.atendimentos) {
        if (this._ehHoraComMinutosDiferenteDeZero(atendimento.horarioInicioAtendimento)) {
          this._preencheOsCamposCorrespondentesAsHorasComOsMinutosPreenchidos(horario, atendimento);        
        }
        if(atendimento.horarioInicioAtendimento === horario) {
          this._horaEstaValidaComZeroMinutos = true;
          this._detalhesDoAtendimentoComHoraDeZeroMinutos = this._retornarCampoDeDetalhesDoAtendimento(atendimento);
          return atendimento.horarioInicioAtendimento;
        }
      }
    }
    return '';
  }

  private _preencheOsCamposCorrespondentesAsHorasComOsMinutosPreenchidos(horario: any, atendimento: Atendimento): string{
    if(atendimento.horarioInicioAtendimento === this.trocaZeroMinutosPorTrintaMinutos(horario)) {
      this._horaEstaValidaComTrintaMinutos = true;
      this._detalhesDoAtendimentoComHoraDeTrintaMinutos = this._retornarCampoDeDetalhesDoAtendimento(atendimento);
      return atendimento.horarioInicioAtendimento;
    }
    return ''
  }

  mostraHorarioDoDentistaApenasSeMarcadoNaListagem(
    dentista: any,
    dentistaHorario: string
  ): boolean {
    for (let atendimento of dentista.atendimentos) {
      if (atendimento.horarioInicioAtendimento === dentistaHorario) return true;
    }
    return false;
  }

  private _retornarCampoDeDetalhesDoAtendimento(atendimento: Atendimento){
    return `${atendimento.paciente} | ${atendimento.horarioInicioAtendimento} ${atendimento.horarioFimAtendimento}`
  }

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

  ngOnInit(): void {}
}

export interface Dentista {
  nome: string;
  atendimentos: Atendimento[];
}

export interface Atendimento {
  paciente: string;
  horarioInicioAtendimento: string;
  horarioFimAtendimento: string;
}
